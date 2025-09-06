import React from "react";
import {
  Box, Container, Typography, Stack, Button, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, InputLabel, FormControl, Chip, IconButton,
  Tabs, Tab
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
  signal?: string;            // Signal Type (0-10V / 4-20mA vb.)
  raw?: Record<string, string>;
};

type RowSelectionMap = Record<string, CatalogItem[]>;

type SavedPanelRecord = {
  id: number;
  projectKey: string;
  createdAt: string;
  panel: {
    name?: string;
    description?: string;
    located?: string;
    supplyType?: string;
    voltage?: string;
    formType?: string;
    brand?: string;
    color?: string;
  };
};

type AssignmentsMap = Record<string, { panelId: number; panelName: string }>;

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

// Collector sayfasındaki mavi odak yerine gri tonlar (dialoglar beyaz zeminde)
const selectStyles = {
  color: '#1b1b1b',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  '&.Mui-disabled': { color: '#888', backgroundColor: '#f5f5f5' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#CCC' },
  svg: { color: '#90A4AE' }
};

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' }
};

const selectStylesDark = {
  color: '#fff',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#777' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90caf9' },
  // asıl kritik kısım: seçili değer yazısı
  '& .MuiSelect-select, & .MuiInputBase-input': { color: '#fff', WebkitTextFillColor: '#fff' },
  // ok ikonu
  '& .MuiSvgIcon-root': { color: '#fff' },
  // disabled görünümü
  '&.Mui-disabled': { color: '#888', backgroundColor: '#1e1e1e' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
};

const labelStylesDark = {
  color: '#B0BEC5',
  '&.Mui-focused': { color: '#E0E0E0' },
};

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
const SIGNAL_KEYS = ["signal type","signal","signaltype","sinyal","sinyal_tipi","signal_type"];

// ========== COMPONENT ==========
export default function PoolPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const projectFilter = (params.get("project") || "").trim();
  const projectKeyForStorage = projectFilter || "__all__";

  const [flatRows, setFlatRows] = React.useState<any[]>([]);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; msg: string; color?: string }>({
    open: false,
    msg: "",
    color: "#4CAF50",
  });

  // --- MATERIAL EKLERİ ---
  const [materialMode, setMaterialMode] = React.useState(false); // Choose Material toggle
  const [selectorOpen, setSelectorOpen] = React.useState(false);
  const [selectorRowKey, setSelectorRowKey] = React.useState("");
  const [selectorRowInfo, setSelectorRowInfo] = React.useState<any>(null);

  const [catalog, setCatalog] = React.useState<CatalogItem[]>([]);
  const [brandFilter, setBrandFilter] = React.useState("");
  const [familyFilter, setFamilyFilter] = React.useState("");
  const [measuringFilter, setMeasuringFilter] = React.useState("");
  const [signalFilter, setSignalFilter] = React.useState("");
  const [modelFilter, setModelFilter] = React.useState("");

  // Import için gizli input
  const importTableInputRef = React.useRef<HTMLInputElement>(null);

  // Üst filtre değişince sağdakileri sıfırla
  React.useEffect(() => { setFamilyFilter(""); setMeasuringFilter(""); setSignalFilter(""); setModelFilter(""); }, [brandFilter]);
  React.useEffect(() => { setMeasuringFilter(""); setSignalFilter(""); setModelFilter(""); }, [familyFilter]);
  React.useEffect(() => { setSignalFilter(""); setModelFilter(""); }, [measuringFilter]);
  React.useEffect(() => { setModelFilter(""); }, [signalFilter]);

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
          const signal = findVal(SIGNAL_KEYS);

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
            signal,
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

  // Filtrelenmiş katalog (tüm koşullar)
  const filteredCatalog = React.useMemo(() => {
    return catalog.filter(it => {
      if (brandFilter && normalize(it.brand || "") !== normalize(brandFilter)) return false;
      if (familyFilter && normalize(it.family || it.category || "") !== normalize(familyFilter)) return false;
      if (measuringFilter && normalize(it.measuring || "") !== normalize(measuringFilter)) return false;
      if (signalFilter && normalize(it.signal || "") !== normalize(signalFilter)) return false;
      if (modelFilter && normalize(it.model || it.code || it.name || "") !== normalize(modelFilter)) return false;
      return true;
    });
  }, [catalog, brandFilter, familyFilter, measuringFilter, signalFilter, modelFilter]);

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
  const scopedBySignal = React.useMemo(
    () => (signalFilter ? scopedByMeasuring.filter(it => normalize(it.signal || "") === normalize(signalFilter)) : scopedByMeasuring),
    [scopedByMeasuring, signalFilter]
  );

  const distinctBrands = React.useMemo(() => distinct(catalog.map(c => c.brand || "")), [catalog]);
  const distinctFamilies = React.useMemo(() => distinct(scopedByBrand.map(c => c.family || c.category || "")), [scopedByBrand]);
  const distinctMeasurings = React.useMemo(() => distinct(scopedByFamily.map(c => c.measuring || "")), [scopedByFamily]);
  const distinctSignals = React.useMemo(() => distinct(scopedByMeasuring.map(c => c.signal || "")), [scopedByMeasuring]);
  const distinctModels = React.useMemo(() => distinct(scopedBySignal.map(c => c.model || c.code || c.name || "")), [scopedBySignal]);

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

  // Material sütunu: seçili ürün adlarını virgül ile yaz
  const renderMaterialCell = React.useCallback((rowKey: string) => {
    const items = selectedForRow(rowKey);
    if (!items.length) return <em style={{ color: '#888' }}>—</em>;
    const label = (it: CatalogItem) => (it.name || it.code || it.model || it.brand || "item");
    return <span>{items.map(label).join(", ")}</span>;
  }, [materialsByRow]);

  const labelOf = (it: CatalogItem) => (it.name || it.code || it.model || it.brand || "item");

  const exportTableToExcel = async () => {
    try {
      const XLSX: any = await import("xlsx");
      const data = flatRows.map((row, idx) => {
        const rowKey = buildRowKey(row, idx);
        const items = (materialsByRow[rowKey] || []);
        return {
          System: row.__system ?? "",
          ProjectCode: row.projectCode ?? "",
          Description: row.description ?? "",
          Located: row.location ?? "",
          Point: row.point ?? "",
          // SADECE okunabilir liste kalsın:
          MaterialNames: items.map(labelOf).join("; "),
          AI: row.ai ?? 0,
          AO: row.ao ?? 0,
          DI: row.di ?? 0,
          DO: row.do ?? 0,
          ModbusRTU: row.modbusRtu ?? 0,
          ModbusTCP: row.modbusTcp ?? 0,
          BacnetMSTP: row.bacnetMstp ?? 0,
          BacnetIP: row.bacnetIp ?? 0,
          Mbus: row.mbus ?? 0,
        };
      });
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Pool");

      const d = new Date();
      const pad = (n:number)=>String(n).padStart(2,'0');
      const fname = `PoolExport_${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}.xlsx`;
      XLSX.writeFile(wb, fname);
      setSnackbar({ open: true, msg: "Exported Excel", color: "#4CAF50" });
    } catch {
      setSnackbar({ open: true, msg: "Export failed", color: "#E53935" });
    }
  };

  const onImportTableFile = async (file: File) => {
    try {
      const XLSX: any = await import("xlsx");
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { defval: "", raw: false }) as Record<string, any>[];
      const lc = (k:string) => k.toLowerCase().replace(/\s+/g, "");

      const rows: any[] = [];
      const matMap: RowSelectionMap = {};

      json.forEach((r, i) => {
        const m: Record<string, any> = {};
        Object.keys(r).forEach(k => { m[lc(k)] = r[k]; });

        const row: any = {
          __key: "import",
          __system: m["system"] || "",
          __packCreatedAt: Date.now(),
          projectCode: m["projectcode"] ?? m["project"] ?? "",
          description: m["description"] || "",
          location: m["location"] || "",
          point: m["point"] || "",
          ai: Number(m["ai"]||0), ao: Number(m["ao"]||0),
          di: Number(m["di"]||0), do: Number(m["do"]||0),
          modbusRtu: Number(m["modbusrtu"]||0), modbusTcp: Number(m["modbustcp"]||0),
          bacnetMstp: Number(m["bacnetmstp"]||0), bacnetIp: Number(m["bacnetip"]||0),
          mbus: Number(m["mbus"]||0),
          order: i,
        };
        rows.push(row);
      });

      rows.sort(sortOriginal);
      setFlatRows(rows);
      setMaterialsByRow(matMap);
      persistMaterials(matMap);
      setMaterialMode(true);
      setSnackbar({ open: true, msg: `Imported ${rows.length} rows`, color: "#4CAF50" });
    } catch {
      setSnackbar({ open: true, msg: "Import failed", color: "#E53935" });
    }
  };

  // ======== ASSIGNMENTS DIALOG (Assign Rows to Panels) ========
  const [assignOpen, setAssignOpen] = React.useState(false);
  const [assignTab, setAssignTab] = React.useState(0); // 0: Assignments, 1: Panels
  const [panels, setPanels] = React.useState<SavedPanelRecord[]>([]);
  const [assignments, setAssignments] = React.useState<AssignmentsMap>({});
  const [selectedCodes, setSelectedCodes] = React.useState<string[]>([]);
  const [bulkPanelId, setBulkPanelId] = React.useState<string>("");
  const [systemFilter, setSystemFilter] = React.useState<string>("");

  const ASSIGN_KEY = `assignments:${projectKeyForStorage}`;

  const loadPanels = React.useCallback(() => {
    // Proje belirtilmişse yalnız o projenin panellerini yükle; değilse tümünü
    const want = (projectFilter || "").trim();
    const keys = Object.keys(localStorage).filter(k => k.startsWith("panels:"));
    const targetKeys = want ? keys.filter(k => k === `panels:${want}`) : keys;

    const list: SavedPanelRecord[] = [];
    for (const k of targetKeys) {
      try {
        const arr = JSON.parse(localStorage.getItem(k) || "[]");
        if (Array.isArray(arr)) {
          for (const rec of arr) {
            if (rec && typeof rec === "object" && rec.panel) list.push(rec as SavedPanelRecord);
          }
        }
      } catch {}
    }
    // Tarihe göre artan
    list.sort((a, b) => (Date.parse(a.createdAt) || 0) - (Date.parse(b.createdAt) || 0));
    setPanels(list);
  }, [projectFilter]);

  const loadAssignments = React.useCallback(() => {
    try {
      const raw = localStorage.getItem(ASSIGN_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      if (obj && typeof obj === "object") setAssignments(obj as AssignmentsMap);
      else setAssignments({});
    } catch {
      setAssignments({});
    }
  }, [ASSIGN_KEY]);

  const persistAssignments = React.useCallback((next: AssignmentsMap) => {
    try {
      localStorage.setItem(ASSIGN_KEY, JSON.stringify(next));
    } catch {}
  }, [ASSIGN_KEY]);

  const openAssignDialog = () => {
    setAssignTab(0);
    setSelectedCodes([]);
    setBulkPanelId("");
    loadPanels();
    loadAssignments();
    setAssignOpen(true);
  };
  const closeAssignDialog = () => setAssignOpen(false);

  // Project Code -> { count, systems }
  const codeGroups = React.useMemo(() => {
    const map = new Map<string, { count: number; systems: Set<string> }>();
    for (const r of flatRows) {
      const code = String(r.projectCode || "").trim();
      if (!code) continue;
      const s = String(r.__system || "unknown").trim();
      if (!map.has(code)) map.set(code, { count: 0, systems: new Set<string>() });
      const entry = map.get(code)!;
      entry.count += 1;
      entry.systems.add(s);
    }
    // filtre uygula
    const result = Array.from(map.entries())
      .map(([code, v]) => ({ code, count: v.count, systems: Array.from(v.systems).sort() }))
      .sort((a, b) => a.code.localeCompare(b.code, "tr"));
    return result.filter(g => !systemFilter || g.systems.includes(systemFilter));
  }, [flatRows, systemFilter]);

  const distinctSystems = React.useMemo(() => {
    const set = new Set<string>();
    for (const r of flatRows) set.add(String(r.__system || "unknown").trim());
    return Array.from(set).sort((a,b)=>a.localeCompare(b,"tr"));
  }, [flatRows]);

  const handleToggleCode = (code: string, checked: boolean) => {
    setSelectedCodes(prev => {
      const s = new Set(prev);
      if (checked) s.add(code); else s.delete(code);
      return Array.from(s);
    });
  };

  const handleAssignSingle = (code: string, panelIdStr: string) => {
    const idNum = Number(panelIdStr);
    if (!Number.isFinite(idNum)) {
      // clear
      const next = { ...assignments };
      delete next[code];
      setAssignments(next);
      persistAssignments(next);
      setSnackbar({ open: true, msg: `Cleared assignment for ${code}`, color: "#4CAF50" });
      return;
    }
    const p = panels.find(x => x.id === idNum);
    if (!p) return;
    const next = { ...assignments, [code]: { panelId: p.id, panelName: p.panel.name || `#${p.id}` } };
    setAssignments(next);
    persistAssignments(next);
    setSnackbar({ open: true, msg: `Assigned ${code} → ${p.panel.name || `#${p.id}`}`, color: "#4CAF50" });
  };

  const handleClearSingle = (code: string) => {
    const next = { ...assignments };
    delete next[code];
    setAssignments(next);
    persistAssignments(next);
    setSnackbar({ open: true, msg: `Cleared assignment for ${code}`, color: "#4CAF50" });
  };

  const handleBulkApply = () => {
    const idNum = Number(bulkPanelId);
    if (!Number.isFinite(idNum) || selectedCodes.length === 0) return;
    const p = panels.find(x => x.id === idNum);
    if (!p) return;
    const next = { ...assignments };
    for (const code of selectedCodes) {
      next[code] = { panelId: p.id, panelName: p.panel.name || `#${p.id}` };
    }
    setAssignments(next);
    persistAssignments(next);
    setSnackbar({ open: true, msg: `Assigned ${selectedCodes.length} code(s) → ${p.panel.name || `#${p.id}`}`, color: "#4CAF50" });
  };

  const deletePanel = (id: number, projectKey: string) => {
    const key = `panels:${projectKey}`;
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    const next = Array.isArray(arr) ? arr.filter((r: any) => r?.id !== id) : [];
    localStorage.setItem(key, JSON.stringify(next));
    setSnackbar({ open: true, msg: "Panel deleted", color: "#4CAF50" });
    loadPanels();
  };

  // Material dialog içi Upload Excel (Catalog) için ref
  const dialogExcelInputRef = React.useRef<HTMLInputElement>(null);

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
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "flex-end", gap: 2, flexWrap: "wrap" }}>
        <PrimaryButton onClick={toggleMaterialMode}>Choise Material</PrimaryButton>
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

        {/* Export / Import */}
        <PrimaryButton onClick={exportTableToExcel} disabled={flatRows.length === 0}>Export</PrimaryButton>
        <input
          ref={importTableInputRef}
          type="file"
          hidden
          accept=".xlsx"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImportTableFile(f);
            (e.target as HTMLInputElement).value = "";
          }}
        />
        <PrimaryButton onClick={() => importTableInputRef.current?.click()}>Import</PrimaryButton>

        {/* Assign Wizard (with Panels tab) */}
        <PrimaryButton onClick={openAssignDialog}>Assign to Panel</PrimaryButton>

        <PrimaryButton onClick={handleBack}>Back</PrimaryButton>
      </Box>

      {/* Material Selector Dialog */}
      <Dialog open={selectorOpen} onClose={closeSelector} fullWidth maxWidth="lg">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Select Material
          <IconButton onClick={closeSelector} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Filtreler */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            sx={{ mb: 2, flexWrap: 'wrap' }}
          >
            {/* ORDER: Brand -> Family -> Measuring -> Signal -> Model */}
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={labelStyles}>Brand</InputLabel>
              <Select
                label="Brand"
                value={brandFilter}
                onChange={(e) => setBrandFilter(String(e.target.value))}
                sx={selectStyles}
              >
                <MenuItem value="">(All)</MenuItem>
                {distinctBrands.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={labelStyles}>Family</InputLabel>
              <Select
                label="Family"
                value={familyFilter}
                onChange={(e) => setFamilyFilter(String(e.target.value))}
                sx={selectStyles}
              >
                <MenuItem value="">(All)</MenuItem>
                {distinctFamilies.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={labelStyles}>Measuring</InputLabel>
              <Select
                label="Measuring"
                value={measuringFilter}
                onChange={(e) => setMeasuringFilter(String(e.target.value))}
                sx={selectStyles}
              >
                <MenuItem value="">(All)</MenuItem>
                {distinctMeasurings.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={labelStyles}>Signal Type</InputLabel>
              <Select
                label="Signal Type"
                value={signalFilter}
                onChange={(e) => setSignalFilter(String(e.target.value))}
                sx={selectStyles}
              >
                <MenuItem value="">(All)</MenuItem>
                {distinctSignals.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={labelStyles}>Model</InputLabel>
              <Select
                label="Model"
                value={modelFilter}
                onChange={(e) => setModelFilter(String(e.target.value))}
                sx={selectStyles}
              >
                <MenuItem value="">(All)</MenuItem>
                {distinctModels.map(mo => <MenuItem key={mo} value={mo}>{mo}</MenuItem>)}
              </Select>
            </FormControl>
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
                  {["Select","Brand","Family","Measuring","Signal Type","Model","Mounting"].map(h => (
                    <th key={h} style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #e0e0e0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCatalog.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: 12, color: "#777" }}>List is empty. Upload an Excel file or clear filters.</td></tr>
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
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.signal || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.model || "—"}</td>
                      <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{it.mounting || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </DialogContent>

        {/* Dialog alt butonlar: Upload Excel & Close */}
        <DialogActions sx={{ px: 3, py: 2, gap: 1.5 }}>
          {/* Hidden file input for Catalog upload */}
          <input
            ref={dialogExcelInputRef}
            type="file"
            hidden
            accept=".xlsx"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onExcelFile(f);
              (e.target as HTMLInputElement).value = "";
            }}
          />
          <ModernButton onClick={() => dialogExcelInputRef.current?.click()}>
            Upload Excel
          </ModernButton>
          <PrimaryButton onClick={closeSelector}>Close</PrimaryButton>
        </DialogActions>
      </Dialog>

      {/* Assignments Wizard (Tabs: Assignments / Panels) */}
      <Dialog open={assignOpen} onClose={closeAssignDialog} fullWidth maxWidth="lg">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Assign to Panel {projectFilter ? `– ${projectFilter}` : ""}
          <IconButton onClick={closeAssignDialog} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Tabs value={assignTab} onChange={(_, v) => setAssignTab(v)} sx={{ mb: 2 }}>
          <Tab label="Assignments" sx={{ textTransform: 'none', fontWeight: 600 }} />
          <Tab label="Panels" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>


          {assignTab === 0 && (
            <Box>
              {/* Üst bar: System Filter + Bulk assign */}
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }} sx={{ mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
  <InputLabel sx={labelStylesDark}>System Filter</InputLabel>
  <Select
    label="System Filter"
    value={systemFilter}
    onChange={(e)=>setSystemFilter(String(e.target.value))}
    sx={selectStylesDark}
    MenuProps={{ PaperProps: { sx: { bgcolor: '#1e1e1e', color: '#fff' } } }}
  >
    <MenuItem value="">(All)</MenuItem>
    {distinctSystems.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
  </Select>
</FormControl>

                <Box sx={{ flexGrow: 1 }} />

                <FormControl size="small" sx={{ minWidth: 220 }}>
  <InputLabel sx={labelStylesDark}>Assign selected to</InputLabel>
  <Select
    label="Assign selected to"
    value={bulkPanelId}
    onChange={(e)=>setBulkPanelId(String(e.target.value))}
    sx={selectStylesDark}
    MenuProps={{ PaperProps: { sx: { bgcolor: '#1e1e1e', color: '#fff' } } }}
  >
    <MenuItem value="">(Choose Panel)</MenuItem>
    {panels.map(p => (
      <MenuItem key={p.id} value={String(p.id)}>{p.panel.name || `#${p.id}`}</MenuItem>
    ))}
  </Select>
</FormControl>
                <PrimaryButton onClick={handleBulkApply} disabled={selectedCodes.length === 0 || !bulkPanelId}>
                  Apply
                </PrimaryButton>
              </Stack>

              {panels.length === 0 && (
                <Box sx={{ mb: 2, p: 1.5, border: "1px dashed #B0BEC5", borderRadius: 1, bgcolor: "#fafafa", color: "#333" }}>
                  No panels found. Use the <strong>Panels</strong> tab to create panels in Project page and return here.
                </Box>
              )}

              {/* Project Code grouped table */}
              <Box sx={{ border: "1px solid #eee", borderRadius: 1, overflow: "hidden" }}>
                <table
                  style={{
                    width: "100%", borderCollapse: "collapse", fontSize: 13,
                    fontFamily: "'Segoe UI','Roboto','Helvetica','Arial',sans-serif",
                    color: "#333", backgroundColor: "#fff"
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
                      {["Select","Project Code","Systems","Points","Assigned Panel","Actions"].map(h => (
                        <th key={h} style={{ padding: 8, textAlign: "left", borderBottom: "1px solid #e0e0e0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {codeGroups.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 12, color: "#777" }}>
                          No project codes found. Use <strong>Refresh</strong> or add systems to Pool.
                        </td>
                      </tr>
                    ) : codeGroups.map((g, i) => {
                      const assigned = assignments[g.code];
                      const assignedIdStr = assigned ? String(assigned.panelId) : "";
                      return (
                        <tr key={g.code} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#f0f4f8" }}>
                          <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>
                            <input
                              type="checkbox"
                              checked={selectedCodes.includes(g.code)}
                              onChange={(e)=>handleToggleCode(g.code, e.target.checked)}
                            />
                          </td>
                          <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0", fontWeight: 600 }}>{g.code}</td>
                          <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{g.systems.join(", ")}</td>
                          <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{g.count}</td>
                          <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                              <Select
                                value={assignedIdStr}
                                onChange={(e)=>handleAssignSingle(g.code, String(e.target.value))}
                                displayEmpty
                                sx={selectStyles}
                              >
                                <MenuItem value="">{assigned ? "(Clears assignment)" : "(None)"}</MenuItem>
                                {panels.map(p => (
                                  <MenuItem key={p.id} value={String(p.id)}>
                                    {p.panel.name || `#${p.id}`}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>
                            <PrimaryButton onClick={()=>handleClearSingle(g.code)}>
                              Clear
                            </PrimaryButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

          {assignTab === 1 && (
            <Box>
              {/* Panels list (same style) */}
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
                      {["Panel Name","Located","Supply Type","Voltage","Form Type","Brand","Color","Actions"].map(h => (
                        <th key={h} style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #e0e0e0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {panels.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ padding: 12, color: "#777" }}>
                          No panels found. Use Project → Create Panel to add.
                        </td>
                      </tr>
                    ) : panels.map((p, i) => (
                      <tr key={p.id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#f0f4f8" }}>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.name || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.located || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.supplyType || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.voltage || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.formType || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.brand || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>{p.panel.color || "—"}</td>
                        <td style={{ padding: 6, borderBottom: "1px solid #f0f0f0" }}>
                          <PrimaryButton onClick={() => deletePanel(p.id, p.projectKey)}>
                            Delete
                          </PrimaryButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <PrimaryButton onClick={closeAssignDialog}>Close</PrimaryButton>
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
