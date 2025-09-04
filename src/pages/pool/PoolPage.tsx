import React from "react";
import {
  Box, Container, Typography, Stack, Button, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, InputLabel, FormControl, Chip, IconButton
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";

// ========== TYPES ==========
type PoolItemPack = {
  id: number;
  system: string;     // "collector" / "ahu" / "fan" ...
  rows: any[];
  createdAt?: string;
  meta?: Record<string, any>;
};

type CatalogItem = {
  id: string;                 // sheetName#rowIndex
  sheet?: string;
  brand?: string;
  family?: string;
  measuring?: string;
  model?: string;
  category?: string;
  mounting?: string;
  name?: string;
  code?: string;
  raw?: Record<string, string>;
};

type RowSelectionMap = Record<string, CatalogItem[]>;

// ========== STYLES ==========
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

const normalize = (s: string) => (s ?? "").trim().toLowerCase();

// Payload içindeki ekleme sırasını korumak için:
function sortOriginal(a: any, b: any) {
  const ac = String(a.projectCode || "");
  const bc = String(b.projectCode || "");
  if (ac !== bc) return ac.localeCompare(bc);

  const ta = Number(a.__packCreatedAt || 0);
  const tb = Number(b.__packCreatedAt || 0);
  if (ta !== tb) return ta - tb;

  const oa = typeof a.order === "number" ? a.order : 0;
  const ob = typeof b.order === "number" ? b.order : 0;
  return oa - ob;
}

// Tekil satır anahtarı (localStorage eşlemesi için)
function buildRowKey(row: any, idx: number): string {
  const parts = [
    String(row.__key ?? ""),
    String(row.__system ?? ""),
    String(row.__packCreatedAt ?? ""),
    String(row.projectCode ?? ""),
    String(typeof row.order === "number" ? row.order : idx),
    String(row.point ?? "")
  ];
  return parts.join("|");
}

// Heuristik kolon çözümleyiciler (TR/EN)
const BRAND_KEYS = ["brand","marka","manufacturer","firma","make","vendor"];
const CATEGORY_KEYS = ["category","kategori","group","grup","type","tür","product_type","ürün_türü"];
const MOUNT_KEYS = ["mounting","montaj","mounting_type","montaj_tipi","tip","bağlantı"];
const NAME_KEYS = ["name","ürün","product","model","description","açıklama","malzeme","item"];
const CODE_KEYS = ["code","kod","sku","id","product_code","ürün_kodu","item_code"];
const FAMILY_KEYS = ["family","product_family","series","seri","seri_adı","family_name"];
const MEASURING_KEYS = ["measuring","measurement","measure","ölçüm","sensing","sensing_type"];
const MODEL_KEYS = ["model","model_no","model_code","model name","ürün_modeli"];

// ========== COMPONENT ==========
export default function PoolPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const projectFilter = (params.get("project") || "").trim();

  const [flatRows, setFlatRows] = React.useState<any[]>([]);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; msg: string; color?: string }>({
    open: false,
    msg: "",
    color: "#4CAF50",
  });

  // --- MATERIAL EKLERİ ---
  const [materialMode, setMaterialMode] = React.useState(false);
  const [selectorOpen, setSelectorOpen] = React.useState(false);
  const [selectorRowKey, setSelectorRowKey] = React.useState("");
  const [selectorRowInfo, setSelectorRowInfo] = React.useState<any>(null);

  const [catalog, setCatalog] = React.useState<CatalogItem[]>([]);
  const [brandFilter, setBrandFilter] = React.useState("");
  const [familyFilter, setFamilyFilter] = React.useState("");
  const [measuringFilter, setMeasuringFilter] = React.useState(""); // generic yok
  const [modelFilter, setModelFilter] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Üst filtre değişince sağdakileri sıfırla
  React.useEffect(() => { setFamilyFilter(""); setMeasuringFilter(""); setModelFilter(""); }, [brandFilter]);
  React.useEffect(() => { setMeasuringFilter(""); setModelFilter(""); }, [familyFilter]);
  React.useEffect(() => { setModelFilter(""); }, [measuringFilter]);

  // Satır bazlı malzeme eşlemesi
  const [materialsByRow, setMaterialsByRow] = React.useState<RowSelectionMap>({});

  // --- MATERIAL: Persist keys ---
  const MATERIALS_KEY = "materials:selections:v1";

  // Malzeme eşlemesini yükle
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(MATERIALS_KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && typeof obj === "object") setMaterialsByRow(obj);
      }
    } catch {}
  }, []);

  const persistMaterials = React.useCallback((map: RowSelectionMap) => {
    try {
      localStorage.setItem(MATERIALS_KEY, JSON.stringify(map));
    } catch {}
  }, []);

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
      const packCreatedAt = pack.createdAt ? Date.parse(pack.createdAt) : 0;

      (pack.rows || []).forEach((r: any, idx: number) => {
        rows.push({
          __key: key,
          __system: pack.system || "unknown",
          __packCreatedAt: packCreatedAt,
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
          order: typeof r.order === "number" ? r.order : idx,
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

    const allRows = keys.flatMap(k => flattenFromKey(k));

    let filtered = allRows;
    if (projectFilter) {
      const want = normalize(projectFilter);
      filtered = allRows.filter(r => normalize(String(r.projectCode || "")) === want);
    }

    if (projectFilter && filtered.length === 0) {
      const allSorted = [...allRows].sort(sortOriginal);
      setFlatRows(allSorted);
      setSnackbar({ open: true, msg: "Pool refreshed (all systems)", color: "#4CAF50" });
      return;
    }

    filtered.sort(sortOriginal);
    setFlatRows(filtered);
    setSnackbar({
      open: true,
      msg: projectFilter ? `Pool refreshed (filtered by "${projectFilter}")` : "Pool refreshed (all systems)",
      color: "#4CAF50"
    });
  }, [projectFilter]);

  // --- CATALOG: Excel yükleme/parçalama ---
  const onExcelFile = async (file: File) => {
    try {
      const XLSX: any = await import("xlsx"); // npm i xlsx
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const list: CatalogItem[] = [];

      for (const sheetName of wb.SheetNames) {
        const ws = wb.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(ws, { defval: "", raw: false }) as Record<string, string>[];

        const rows = json.map((row, i) => {
          const lowerMap: Record<string, string> = {};
          Object.keys(row).forEach(k => { lowerMap[k.toLowerCase().trim()] = row[k]; });

          const findVal = (cands: string[]) => {
            for (const c of cands) if (lowerMap[c] !== undefined) return String(lowerMap[c]).trim();
            return "";
          };

          const brand = findVal(BRAND_KEYS);
          const category = findVal(CATEGORY_KEYS);
          const family = findVal(FAMILY_KEYS) || category;
          const measuring = findVal(MEASURING_KEYS);
          const mounting = findVal(MOUNT_KEYS);
          const model = findVal(MODEL_KEYS);
          const code = findVal(CODE_KEYS);
          const name = findVal(NAME_KEYS) || model || code || "";

          const item: CatalogItem = {
            id: `${sheetName}#${i}`,
            sheet: sheetName,
            brand,
            family,
            measuring,
            model,
            category,
            mounting,
            name,
            code,
            raw: row as any
          };
          return item;
        });

        list.push(...rows);
      }

      setCatalog(list);
      setSnackbar({ open: true, msg: `Excel loaded (${list.length} items)`, color: "#4CAF50" });
    } catch (e) {
      setCatalog([]);
      setSnackbar({ open: true, msg: "Could not read Excel file", color: "#E53935" });
    }
  };

  // Katalogu filtrele
  const filteredCatalog = React.useMemo(() => {
    return catalog.filter(it => {
      if (brandFilter && normalize(it.brand || "") !== normalize(brandFilter)) return false;
      if (familyFilter && normalize(it.family || it.category || "") !== normalize(familyFilter)) return false;
      if (measuringFilter && normalize(it.measuring || "") !== normalize(measuringFilter)) return false;
      if (modelFilter && normalize(it.model || it.code || it.name || "") !== normalize(modelFilter)) return false;
      if (searchTerm) {
        const s = normalize(searchTerm);
        const blob = `${it.brand||""} ${it.family||it.category||""} ${it.measuring||""} ${it.model||""} ${it.mounting||""} ${it.name||""} ${it.code||""}`.toLowerCase();
        if (!blob.includes(s)) return false;
      }
      return true;
    });
  }, [catalog, brandFilter, familyFilter, measuringFilter, modelFilter, searchTerm]);

  // Distinct yardımcı + kademeli seçenek üretimi
  const distinct = (arr: string[]) =>
    Array.from(new Set(arr.map(x => (x || "").trim()).filter(Boolean))).sort((a,b) => a.localeCompare(b, "tr"));

  const scopedByBrand = React.useMemo(
    () => (brandFilter ? catalog.filter(it => normalize(it.brand || "") === normalize(brandFilter)) : catalog),
    [catalog, brandFilter]
  );
  const scopedByFamily = React.useMemo(
    () => (familyFilter ? scopedByBrand.filter(it => normalize(it.family || it.category || "") === normalize(familyFilter)) : scopedByBrand),
    [scopedByBrand, familyFilter]
  );
  const scopedByMeasuring = React.useMemo(
    () => (measuringFilter ? scopedByFamily.filter(it => normalize(it.measuring || "") === normalize(measuringFilter)) : scopedByFamily),
    [scopedByFamily, measuringFilter]
  );

  const distinctBrands = React.useMemo(() => distinct(catalog.map(c => c.brand || "")), [catalog]);
  const distinctFamilies = React.useMemo(() => distinct(scopedByBrand.map(c => c.family || c.category || "")), [scopedByBrand]);
  const distinctMeasurings = React.useMemo(() => distinct(scopedByFamily.map(c => c.measuring || "")), [scopedByFamily]);
  const distinctModels = React.useMemo(() => distinct(scopedByMeasuring.map(c => c.model || c.code || c.name || "")), [scopedByMeasuring]);

  // --- Satır tıklama: seçim penceresini aç ---
  const openSelectorFor = (row: any, idx: number) => {
    if (!materialMode) return;
    const key = buildRowKey(row, idx);
    setSelectorRowKey(key);
    setSelectorRowInfo(row);
    setSelectorOpen(true);
  };

  const closeSelector = () => {
    setSelectorOpen(false);
    setSelectorRowKey("");
    setSelectorRowInfo(null);
  };

  const toggleMaterialMode = () => {
    setMaterialMode(m => {
      const next = !m;
      setSnackbar({
        open: true,
        msg: next ? "Material column visible" : "Material column hidden",
        color: "#4CAF50"
      });
      return next;
    });
  };

  // Seçili ürünleri getir/kaydet
  const selectedForRow = (rowKey: string): CatalogItem[] => materialsByRow[rowKey] || [];

  const saveSelectionForRow = (rowKey: string, items: CatalogItem[]) => {
    const next: RowSelectionMap = { ...materialsByRow, [rowKey]: items };
    setMaterialsByRow(next);
    persistMaterials(next);
    setSnackbar({ open: true, msg: "Materials linked to row", color: "#4CAF50" });
  };

  // Material sütunu: seçili ürünlerin adlarını yaz
  const renderMaterialCell = React.useCallback((rowKey: string) => {
    const items = selectedForRow(rowKey);
    if (!items.length) return <em style={{ color: '#888' }}>—</em>;
    const label = (it: CatalogItem) => (it.name || it.code || it.model || it.brand || "item");
    const text = items.map(label).join(", ");
    return <span>{text}</span>;
  }, [materialsByRow]);

  // ========== RENDER ==========
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
                minWidth: materialMode ? "1320px" : "1200px",
                borderCollapse: "collapse",
                backgroundColor: "#ffffff",
                fontSize: "0.875rem",
                fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
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
                  ].map((h) => (
                    <th key={h} style={{ padding: "10px", textAlign: "left" }}>{h}</th>
                  ))}
                  {materialMode && (
                    <th style={{ padding: "10px", textAlign: "left" }}>Material</th>
                  )}
                  {[
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
                {flatRows.map((row, idx) => {
                  const rowKey = buildRowKey(row, idx);
                  return (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#f0f4f8",
                        cursor: materialMode ? "pointer" : "default"
                      }}
                      onClick={() => openSelectorFor(row, idx)}
                      title={materialMode ? "Click to select materials for this row" : ""}
                    >
                      <td style={{ padding: 8 }}>{row.__system ?? "collector"}</td>
                      <td style={{ padding: 8 }}>{row.projectCode}</td>
                      <td style={{ padding: 8 }}>{row.description}</td>
                      <td style={{ padding: 8 }}>{row.location}</td>
                      <td style={{ padding: 8 }}>{row.point}</td>

                      {materialMode && (
                        <td style={{ padding: 8 }}>
                          {renderMaterialCell(rowKey)}
                        </td>
                      )}

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
                  );
                })}
              </tbody>
            </table>
          )}
        </Box>
      </Container>

      {/* Alt buton barı */}
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <PrimaryButton onClick={toggleMaterialMode}>
          Choise Material ( Ürün seç )
        </PrimaryButton>
        <PrimaryButton onClick={loadPool}>Refresh</PrimaryButton>
        <PrimaryButton onClick={() => {
          Object.keys(localStorage).forEach((k) => {
            if (k.startsWith("pool:")) localStorage.removeItem(k);
          });
          setFlatRows([]);
          setSnackbar({ open: true, msg: "Entire pool cleared", color: "#4CAF50" });
        }}>Clear All Pool</PrimaryButton>
        <PrimaryButton onClick={async () => {
          try {
            await navigator.clipboard.writeText(JSON.stringify(flatRows, null, 2));
            setSnackbar({ open: true, msg: "Copied to clipboard", color: "#4CAF50" });
          } catch {
            setSnackbar({ open: true, msg: "Copy failed", color: "#4CAF50" });
          }
        }} disabled={flatRows.length === 0}>Copy</PrimaryButton>
        <PrimaryButton onClick={handleBack}>Back</PrimaryButton>
      </Box>

      {/* Material Selector Dialog */}
      <Dialog open={selectorOpen} onClose={closeSelector} fullWidth maxWidth="lg">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Select Material
          <IconButton onClick={closeSelector} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Filtreler + Excel yükleme */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            sx={{ mb: 2, flexWrap: 'wrap' }}
          >
            {/* ORDER: Brand -> Family -> Measuring -> Model -> Search -> Upload */}
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Brand</InputLabel>
              <Select label="Brand" value={brandFilter} onChange={(e) => setBrandFilter(String(e.target.value))}>
                <MenuItem value="">(All)</MenuItem>
                {distinctBrands.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Family</InputLabel>
              <Select label="Family" value={familyFilter} onChange={(e) => setFamilyFilter(String(e.target.value))}>
                <MenuItem value="">(All)</MenuItem>
                {distinctFamilies.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Measuring</InputLabel>
              <Select label="Measuring" value={measuringFilter} onChange={(e) => setMeasuringFilter(String(e.target.value))}>
                <MenuItem value="">(All)</MenuItem>
                {distinctMeasurings.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Model</InputLabel>
              <Select label="Model" value={modelFilter} onChange={(e) => setModelFilter(String(e.target.value))}>
                <MenuItem value="">(All)</MenuItem>
                {distinctModels.map(mo => <MenuItem key={mo} value={mo}>{mo}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField
              label="Search (brand, family, measuring, model, code...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 260 }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="outlined" component="label" sx={{ alignSelf: { xs: "stretch", md: "center" } }}>
              Upload Excel (.xlsx)
              <input type="file" hidden accept=".xlsx" onChange={(e) => { const f = e.target.files?.[0]; if (f) onExcelFile(f); }} />
            </Button>
          </Stack>

          {/* Katalog listesi */}
          <Box sx={{ border: "1px solid #eee", borderRadius: 1, overflow: "hidden" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
              color: "#333",
              backgroundColor: "#ffffff"
            }}>
              <thead>
                <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
                  {["Select","Brand","Family","Measuring","Model","Mounting","Code","Sheet"].map(h => (
                    <th key={h} style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #e0e0e0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCatalog.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: 12, color: "#777" }}>List is empty. Upload an Excel file or clear filters.</td></tr>
                ) : filteredCatalog.map((it, i) => {
                  const curr = selectedForRow(selectorRowKey);
                  const checked = !!curr.find(c => c.id === it.id);
                  return (
                    <tr key={it.id} style={{ backgroundColor: checked ? "#e3f2fd" : (i % 2 === 0 ? "#f9f9f9" : "#f0f4f8") }}>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const prev = selectedForRow(selectorRowKey);
                            let next: CatalogItem[];
                            if (e.target.checked) next = [...prev, it];
                            else next = prev.filter(x => x.id !== it.id);
                            saveSelectionForRow(selectorRowKey, next);
                          }}
                        />
                      </td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.brand || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.family || it.category || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.measuring || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.model || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.mounting || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.code || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.sheet || ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>

          {/* Seçili ürünler özeti */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Selected Items</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {selectedForRow(selectorRowKey).map((it) => (
                <Chip
                  key={`sel-${it.id}`}
                  size="small"
                  label={`${it.brand || ""} ${it.name || it.code || ""}`.trim() || it.id}
                  onDelete={() => {
                    const prev = selectedForRow(selectorRowKey);
                    const next = prev.filter(x => x.id !== it.id);
                    saveSelectionForRow(selectorRowKey, next);
                  }}
                />
              ))}
              {selectedForRow(selectorRowKey).length === 0 && (
                <Typography variant="body2" sx={{ color: "#777" }}>No selection yet.</Typography>
              )}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSelector}>Close</Button>
        </DialogActions>
      </Dialog>

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

// === Small inline component (moved bottom to keep file single) ===
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
