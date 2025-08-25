import React from "react";
import { Box, Container, Typography, Stack, Button, Snackbar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";

type PoolItemPack = {
  id: number;
  system: string;     // "collector" / "ahu" / "fan" ...
  rows: any[];
  createdAt?: string;
  meta?: Record<string, any>;
};

const ModernButton = styled(Button)({
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '0.8125rem',
  fontWeight: 500,
  textTransform: 'none',
  letterSpacing: '0.02em',
  transition: 'all 0.2s ease',
  border: '1px solid',
  '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }
});

const PrimaryButton = styled(ModernButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  borderColor: 'transparent',
  '&:hover': { backgroundColor: '#1565c0', borderColor: 'transparent' }
});

const normalize = (s: string) => s.trim().toLowerCase();

function StatPill({ label, value }: { label: string; value: number | string }) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: '4px',
        backgroundColor: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.18)',
        color: '#fff',
        fontSize: '0.8rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box component="span" sx={{ opacity: 0.85 }}>{label}:</Box>
      <Box component="strong" sx={{ fontWeight: 700 }}>{value}</Box>
    </Box>
  );
}

export default function PoolPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // ?project paramı VARSA yalnızca Refresh'e basıldığında filtre için kullanılır
  const projectFilter = (params.get("project") || "").trim();

  const [flatRows, setFlatRows] = React.useState<any[]>([]);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; msg: string; color?: string }>({
    open: false,
    msg: "",
    color: "#4CAF50",
  });

  // ÖZET: AI/AO/DI/DO + field totals
  const totals = React.useMemo(() => {
    const n = (v: any) => {
      const num = typeof v === "number" ? v : parseFloat(v);
      return Number.isFinite(num) ? num : 0;
    };
    const sum = (k:
      | "ai" | "ao" | "di" | "do"
      | "modbusRtu" | "modbusTcp"
      | "bacnetMstp" | "bacnetIp"
      | "mbus"
    ) => flatRows.reduce((acc, r) => acc + n(r[k]), 0);

    return {
      rows: flatRows.length,
      ai: sum("ai"),
      ao: sum("ao"),
      di: sum("di"),
      do: sum("do"),
      modbusRtu: sum("modbusRtu"),
      modbusTcp: sum("modbusTcp"),
      bacnetMstp: sum("bacnetMstp"),
      bacnetIp: sum("bacnetIp"),
      mbus: sum("mbus"),
    };
  }, [flatRows]);

  const handleLogout = () => navigate("/");
  const handleBack = () => navigate("/projects");

  const flattenFromKey = (key: string): any[] => {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    let packs: PoolItemPack[] = [];
    try {
      packs = JSON.parse(raw) || [];
    } catch {
      return [];
    }
    const rows: any[] = [];
    packs.forEach((pack) => {
      (pack.rows || []).forEach((r: any) => {
        rows.push({
          __key: key,
          __system: pack.system || "unknown",
          projectCode: r.projectCode,
          description: r.description,
          location: r.location,
          point: r.point,
          ai: r.ai, ao: r.ao, di: r.di, do: r.do,
          modbusRtu: r.modbusRtu,
          modbusTcp: r.modbusTcp,
          bacnetMstp: r.bacnetMstp,
          bacnetIp: r.bacnetIp,
          mbus: r.mbus,
        });
      });
    });
    return rows;
  };

  const loadPool = React.useCallback(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("pool:"));

    if (keys.length === 0) {
      setFlatRows([]);
      setSnackbar({ open: true, msg: "Pool is empty", color: "#4CAF50" });
      return;
    }

    // Tüm anahtarları birleştir
    const allRows = keys.flatMap(k => flattenFromKey(k));

    // Parametre varsa case-insensitive + trim filtre uygula; boşsa hepsini göster
    let filtered = allRows;
    if (projectFilter) {
      const want = normalize(projectFilter);
      filtered = allRows.filter(r => normalize(String(r.projectCode || "")) === want);
    }

    // Eşleşme yoksa ALL'a düş (kırmızı yok, hep yeşil/info)
    if (projectFilter && filtered.length === 0) {
      const allSorted = [...allRows].sort((a, b) => {
        const ac = String(a.projectCode || "");
        const bc = String(b.projectCode || "");
        if (ac !== bc) return ac.localeCompare(bc);
        return String(a.point || "").localeCompare(String(b.point || ""));
      });
      setFlatRows(allSorted);
      setSnackbar({ open: true, msg: "Pool refreshed (all systems)", color: "#4CAF50" });
      return;
    }

    // Sıra: ProjectCode → Point
    filtered.sort((a, b) => {
      const ac = String(a.projectCode || "");
      const bc = String(b.projectCode || "");
      if (ac !== bc) return ac.localeCompare(bc);
      return String(a.point || "").localeCompare(String(b.point || ""));
    });

    setFlatRows(filtered);
    setSnackbar({
      open: true,
      msg: projectFilter ? `Pool refreshed (filtered by "${projectFilter}")` : "Pool refreshed (all systems)",
      color: "#4CAF50"
    });
  }, [projectFilter]);

  // OTOMATİK YÜKLEME YOK — sadece Refresh ile yüklenecek

  const clearPool = () => {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("pool:")) localStorage.removeItem(k);
    });
    setFlatRows([]);
    setSnackbar({ open: true, msg: "Entire pool cleared", color: "#4CAF50" });
  };

  const copyPool = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(flatRows, null, 2));
      setSnackbar({ open: true, msg: "Copied to clipboard", color: "#4CAF50" });
    } catch {
      setSnackbar({ open: true, msg: "Copy failed", color: "#4CAF50" });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "radial-gradient(circle at top right, #1A237E, #000000)", color: "#FFFFFF", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Box sx={{ py: 2, px: 4, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <Typography variant="body1" sx={{ fontWeight: "normal", fontSize: "1.1rem" }}>
          <Box component="span" sx={{ color: "#1976d2" }}>hava</Box>
          <Box component="span" sx={{ color: "#B0BEC5" }}>logic</Box>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: "1rem" }} />} onClick={handleLogout} sx={{ minWidth: "100px" }}>
            Logout
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Başlık + özet istatistikler */}
      <Container sx={{ flex: 1, py: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Pool {projectFilter ? `– ${projectFilter}` : "– All Systems"}
          </Typography>

          <Stack direction="row" spacing={1.2} flexWrap="wrap">
            <StatPill label="Rows" value={totals.rows} />
            <StatPill label="AI" value={totals.ai} />
            <StatPill label="AO" value={totals.ao} />
            <StatPill label="DI" value={totals.di} />
            <StatPill label="DO" value={totals.do} />
            <StatPill label="Modbus RTU" value={totals.modbusRtu} />
            <StatPill label="Modbus TCP/IP" value={totals.modbusTcp} />
            <StatPill label="Bacnet MSTP" value={totals.bacnetMstp} />
            <StatPill label="Bacnet IP" value={totals.bacnetIp} />
            <StatPill label="Mbus" value={totals.mbus} />
          </Stack>
        </Stack>

        {/* Tablo alanı */}
        <Box sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", p: 2, minHeight: "70vh", overflow: "auto" }}>
          {flatRows.length === 0 ? (
            <Box sx={{ height: "100%", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Click <strong>Refresh</strong> to load data.
              </Typography>
            </Box>
          ) : (
            <table
              style={{
                width: "100%",
                minWidth: "1200px",
                borderCollapse: "collapse",
                backgroundColor: "#ffffff",
                fontSize: "0.875rem",
                fontFamily: `'Segoe UI','Roboto','Helvetica','Arial',sans-serif'`,
                borderRadius: "12px",
                overflow: "hidden",
                color: "#333",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
                  {[
                    "System",
                    "Project Code",
                    "Description",
                    "Located",
                    "Point Name",
                    "AI",
                    "AO",
                    "DI",
                    "DO",
                    "Modbus RTU",
                    "Modbus TCP IP",
                    "Bacnet MSTP",
                    "Bacnet IP",
                    "Mbus",
                  ].map((h) => (
                    <th key={h} style={{ padding: "10px", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flatRows.map((row, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#f0f4f8" }}>
                    <td style={{ padding: 8 }}>{row.__system ?? "collector"}</td>
                    <td style={{ padding: 8 }}>{row.projectCode}</td>
                    <td style={{ padding: 8 }}>{row.description}</td>
                    <td style={{ padding: 8 }}>{row.location}</td>
                    <td style={{ padding: 8 }}>{row.point}</td>
                    <td style={{ padding: 8 }}>{row.ai}</td>
                    <td style={{ padding: 8 }}>{row.ao}</td>
                    <td style={{ padding: 8 }}>{row.di}</td>
                    <td style={{ padding: 8 }}>{row.do}</td>
                    <td style={{ padding: 8 }}>{row.modbusRtu}</td>
                    <td style={{ padding: 8 }}>{row.modbusTcp}</td>
                    <td style={{ padding: 8 }}>{row.bacnetMstp}</td>
                    <td style={{ padding: 8 }}>{row.bacnetIp}</td>
                    <td style={{ padding: 8 }}>{row.mbus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>
      </Container>

      {/* Alt buton barı */}
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <PrimaryButton onClick={loadPool}>Refresh</PrimaryButton>
        <PrimaryButton onClick={clearPool}>Clear All Pool</PrimaryButton>
        <PrimaryButton onClick={copyPool} disabled={flatRows.length === 0}>Copy</PrimaryButton>
        <PrimaryButton onClick={handleBack}>Back</PrimaryButton>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2200}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        message={snackbar.msg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbar.color || "#4CAF50",
            color: "#fff",
            fontWeight: 500,
            padding: "10px 24px",
            minWidth: "auto",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          },
        }}
      />
    </Box>
  );
}
