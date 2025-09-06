import React from "react";
import {
  Box, Container, Typography, Stack, Button, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, InputLabel, FormControl, IconButton,
  Tabs, Tab
} from "@mui/material";
//import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
//import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
//import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Divider } from "@mui/material";
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

// Açık zemin: nötr gri sınırlar, mavi yok
const selectStyles = {
  color: '#1b1b1b',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
  '&.Mui-disabled': { color: '#888', backgroundColor: '#f5f5f5' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#DDDDDD' },
  '& .MuiSvgIcon-root': { color: '#9E9E9E' },
};

const labelStyles = {
  color: '#9E9E9E',
  '&.Mui-focused': { color: '#9E9E9E' },
};

// Koyu zemin: açık yazı ve açık/nötr gri sınırlar, mavi yok
const selectStylesDark = {
  color: '#fff',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#9E9E9E' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#BDBDBD' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E0E0E0' },
  '& .MuiSelect-select, & .MuiInputBase-input': { color: '#fff', WebkitTextFillColor: '#fff' },
  '& .MuiSvgIcon-root': { color: '#E0E0E0' },
  '&.Mui-disabled': { color: '#888', backgroundColor: '#1e1e1e' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
};

const labelStylesDark = {
  color: '#BDBDBD',
  '&.Mui-focused': { color: '#E0E0E0' },
};

// Koyu zemin TextField görünümü: açık yazı + nötr gri sınırlar (mavi yok)
const textFieldStylesDark = {
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#9E9E9E' },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#BDBDBD' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#E0E0E0' },
  '& .MuiInputBase-input': { color: '#fff', WebkitTextFillColor: '#fff' },
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
  '& .MuiInputBase-root.Mui-disabled': { backgroundColor: '#1e1e1e' },
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
        <PrimaryButton onClick={toggleMaterialMode}>
  {materialMode ? 'Hide Material' : 'Choose Material'}
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
  setSnackbar({ open: true, msg: "Copy failed (browser blocked clipboard)", color: "#E53935" });
}
        }} disabled={flatRows.length === 0}>Copy</PrimaryButton>

        {/* Export / Import */}
        <PrimaryButton onClick={exportTableToExcel} disabled={flatRows.length === 0}>Export</PrimaryButton>
       <input
  ref={importTableInputRef}
  type="file"
  hidden
  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
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
  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
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
          <Tab label="Hardware (Controller & IO)" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>


          {assignTab === 0 && (
            <Box>
              {/* Üst bar: System Filter + Bulk assign */}
              <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "stretch", md: "center" }} sx={{ mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
  <InputLabel sx={labelStyles}>System Filter</InputLabel>
  <Select
    label="System Filter"
    value={systemFilter}
    onChange={(e)=>setSystemFilter(String(e.target.value))}
    sx={selectStyles}
    MenuProps={{ PaperProps: { sx: { bgcolor: '#1e1e1e', color: '#fff' } } }}
  >
    <MenuItem value="">(All)</MenuItem>
    {distinctSystems.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
  </Select>
</FormControl>

                <Box sx={{ flexGrow: 1 }} />

                <FormControl size="small" sx={{ minWidth: 220 }}>
  <InputLabel sx={labelStyles}>Assign selected to</InputLabel>
  <Select
    label="Assign selected to"
    value={bulkPanelId}
    onChange={(e)=>setBulkPanelId(String(e.target.value))}
    sx={selectStyles}
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

{assignTab === 2 && (
  <HardwareTab
  flatRows={flatRows}
  assignments={assignments}
  projectKeyForStorage={projectKeyForStorage}
  labelStylesDark={labelStylesDark}
  selectStylesDark={selectStylesDark}
  setSnackbar={setSnackbar}
/>
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

// ================== HARDWARE TAB (DROP-IN) ==================
type HardwareTabProps = {
  flatRows: any[];
  assignments: AssignmentsMap;
  projectKeyForStorage: string;
  labelStylesDark: any;
  selectStylesDark: any;
  setSnackbar: (s: {open: boolean; msg: string; color?: string}) => void;
};

function HardwareTab({
  flatRows, assignments, projectKeyForStorage,
  labelStylesDark, selectStylesDark, setSnackbar
}: HardwareTabProps) {
  // ---- küçük yardımcılar
const isPLC = (m: ModuleRow) =>
  /plc|controller|cpu|station|automation/i.test(`${m.Family} ${m.Model}`);
  const isGateway = (m: ModuleRow) =>
    /gateway/i.test(m.Family || "") || !!String(m.GW_Proto || "");
  const hasIOCap = (m: ModuleRow) =>
    num(m.AI_cap,0)+num(m.AO_cap,0)+num(m.DI_cap,0)+num(m.DO_cap,0)+num(m.UI_cap,0) > 0;
  const isIOModule = (m: ModuleRow) =>
    /io/i.test(m.Family || "") || hasIOCap(m);

  const num = (v:any, d=0) => {
    const n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : d;
  };
  const yes = (v:any) => /^(yes|y|true|1|evet)$/i.test(String(v).trim());
  const effWidth = (m:any) => { const w = num(m.Width_mm,0); if (w>0) return w; const din=num(m.DIN_Modules,0); return din>0? din*17.5 : 120; };


  /* === ADD: ortak proto yardımcıları === */
const normProto = (s?: string) =>
  String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const PROTO_ALIASES: Record<string,string[]> = {
  bacnetip:   ["bacnetip","bacnet-ip","bacnet ip"],
  bacnetmstp: ["bacnetmstp","bacnet-mstp","bacnet mstp","mstp"],
  modbustcp:  ["modbustcp","modbus-tcp","modbus tcp","modbustcpip"],
  modbusrtu:  ["modbusrtu","modbus-rtu","modbus rtu","rtu"],
  mbus:       ["mbus","m-bus","m bus"]
};

const matchesProto = (value: string, wanted: string) => {
  const key = normProto(wanted);
  const aliases = PROTO_ALIASES[key] || [key];
  const v = normProto(value);
  return aliases.includes(v);
};


// Panelde atanmış satırlardan IO ve protokol toplamlarını çıkar (spare uygulanır)
function computeNeedsAndProtocols(pid: number, sparePct: number) {
  // Bu panele atanmış satırlar
  const rows = flatRows.filter(r => {
    const code = String(r.projectCode || "").trim();
    const asg = assignments[code];
    return asg?.panelId === pid;
  });

  // Güvenli toplama (alan adları: ai, ao, di, do, bacnetIp, bacnetMstp, modbusTcp, modbusRtu, mbus)
  const s = (k: "ai"|"ao"|"di"|"do"|"bacnetIp"|"bacnetMstp"|"modbusTcp"|"modbusRtu"|"mbus") =>
    rows.reduce((acc, r) => acc + num((r as any)[k], 0), 0);

  // IO ihtiyaçları (spare ile, yukarı yuvarlanır)
  const needs = {
    AI: Math.ceil(s("ai") * (1 + sparePct / 100)),
    AO: Math.ceil(s("ao") * (1 + sparePct / 100)),
    DI: Math.ceil(s("di") * (1 + sparePct / 100)),
    DO: Math.ceil(s("do") * (1 + sparePct / 100)),
  };

  // Protokol toplamları (sparesiz)
  const proto = {
    bacnetIp:   s("bacnetIp"),
    bacnetMstp: s("bacnetMstp"),
    modbusTcp:  s("modbusTcp"),
    modbusRtu:  s("modbusRtu"),
    mbus:       s("mbus"),
  };

  return { needs, proto };
}


  // ---- rowsByPanel: atanan satırlardan IO toplamlarını üret
  const rowsByPanel = React.useMemo(() => {
    const map = new Map<number, { panelName: string; io: {AI:number;AO:number;DI:number;DO:number} }>();
    const n = (x:any)=> Number.isFinite(x)? x : num(x,0);
    for (const r of flatRows) {
      const code = String(r.projectCode||"").trim();
      if (!code) continue;
      const asg = assignments[code];
      if (!asg) continue;
      if (!map.has(asg.panelId)) map.set(asg.panelId, { panelName: asg.panelName, io:{AI:0,AO:0,DI:0,DO:0} });
      const b = map.get(asg.panelId)!;
      b.io.AI += n(r.ai); b.io.AO += n(r.ao); b.io.DI += n(r.di); b.io.DO += n(r.do);
    }
    return map;
  }, [flatRows, assignments]);

  // ---- Module List yükleme / saklama
  type ModuleRow = {
    Brand:string; Family:string; Model:string; Description?:string;
    UnitPrice?:number; Currency?:string;
    AI_cap?:number; AO_cap?:number; DI_cap?:number; DO_cap?:number; UI_cap?:number;
    Supports_BACnet_IP?:string; Supports_BACnet_MSTP?:string; Supports_Modbus_TCP?:string; Supports_Modbus_RTU?:string; Supports_MBus?:string;
    GW_Proto?:string; GW_Device_Capacity?:number; GW_Ports?:number;
    PLC_Max_Slots?:number; PLC_Ethernet?:string; PLC_Redundant?:string; PLC_Webserver?:string;
    Width_mm?:number; Height_mm?:number; Depth_mm?:number; Weight_kg?:number; DIN_Modules?:number;
  };

  const MODULE_LIST_KEY = "moduleList:v1";
  const [moduleList, setModuleList] = React.useState<ModuleRow[]>([]);
  React.useEffect(()=>{ try{ const raw=localStorage.getItem(MODULE_LIST_KEY); if(raw) setModuleList(JSON.parse(raw)); }catch{} },[]);
  const persistModuleList = (arr:ModuleRow[]) => { try{ localStorage.setItem(MODULE_LIST_KEY, JSON.stringify(arr)); }catch{} };

  // sağlam dinamik import
  const loadXLSX = React.useCallback(async()=>{
    const mod:any = await import("xlsx");
    return mod?.default ?? mod;
  },[]);

  const moduleExcelRef = React.useRef<HTMLInputElement>(null);
  const onModuleExcel = async (file: File) => {
    try {
      const XLSX = await loadXLSX();
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array", cellDates: true, dense: true });
      const ws = wb.Sheets["Data"] || wb.Sheets[wb.SheetNames[0]];
      if (!ws) throw new Error("No 'Data' sheet");
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" }) as any[];
      const list: ModuleRow[] = rows.map(r => ({
        Brand: r["Brand"]??"", Family: r["Family"]??"", Model: r["Model"]??"", Description: r["Description"]??"",
        UnitPrice: num(r["UnitPrice"],0), Currency: r["Currency"]??"",
        AI_cap: num(r["AI_cap"] ?? r["AI"] ?? r["AI Channels"] ?? r["AI Ch"] ?? 0, 0),
AO_cap: num(r["AO_cap"] ?? r["AO"] ?? r["AO Channels"] ?? r["AO Ch"] ?? 0, 0),
DI_cap: num(r["DI_cap"] ?? r["DI"] ?? r["DI Channels"] ?? r["DI Ch"] ?? 0, 0),
DO_cap: num(r["DO_cap"] ?? r["DO"] ?? r["DO Channels"] ?? r["DO Ch"] ?? 0, 0),
UI_cap: num(
  r["UI_cap"] ?? r["UI"] ?? r["Universal"] ?? r["Universal IO"] ?? r["Universal_IO"] ?? r["U/I"] ?? 0,
  0
),
        Supports_BACnet_IP: r["Supports_BACnet_IP"]??"", Supports_BACnet_MSTP: r["Supports_BACnet_MSTP"]??"",
        Supports_Modbus_TCP: r["Supports_Modbus_TCP"]??"", Supports_Modbus_RTU: r["Supports_Modbus_RTU"]??"", Supports_MBus: r["Supports_MBus"]??"",
        GW_Proto: r["GW_Proto"]??"", GW_Device_Capacity: num(r["GW_Device_Capacity"],0), GW_Ports: num(r["GW_Ports"],0),
        PLC_Max_Slots: num(r["PLC_Max_Slots"], NaN), PLC_Ethernet: r["PLC_Ethernet"]??"", PLC_Redundant: r["PLC_Redundant"]??"", PLC_Webserver: r["PLC_Webserver"]??"",
        Width_mm: num(r["Width_mm"],0), Height_mm: num(r["Height_mm"],0), Depth_mm: num(r["Depth_mm"],0), Weight_kg: num(r["Weight_kg"],0), DIN_Modules: num(r["DIN_Modules"],0),
      }));
      setModuleList(list);
      persistModuleList(list);
      setSnackbar({ open:true, msg:`Module List loaded (${list.length})`, color:"#4CAF50" });
    } catch(e) {
      console.error("[Module Excel Import] Error:", e);
      setSnackbar({ open:true, msg:"Could not read Module List", color:"#E53935" });
    }
  };

  // ---- panel donanım kaydı
  type HardwarePick = {
    plc?: ModuleRow;
    modules: Array<{ item: ModuleRow; qty: number; uiAllocAI?: number; uiAllocDI?: number }>;
    gateways: Array<{ item: ModuleRow; qty: number }>;
    summary: { cost:number; width:number; slotsUsed:number; slotsLimit?:number };
  };
  const HARDWARE_KEY = `panelHardware:${projectKeyForStorage}`;
  const [hardware, setHardware] = React.useState<Record<number, HardwarePick>>({});
  React.useEffect(()=>{ try{ const raw=localStorage.getItem(HARDWARE_KEY); setHardware(raw? JSON.parse(raw): {});}catch{ setHardware({}); } },[HARDWARE_KEY]);
  const persistHardware = (next:Record<number,HardwarePick>) => { try{ localStorage.setItem(HARDWARE_KEY, JSON.stringify(next)); }catch{} };

  // ---- UI State
  const [panelId, setPanelId] = React.useState<number | ''>('');
  const [spare, setSpare] = React.useState<number>(10);
  const [objective, setObjective] = React.useState<"cost"|"width"|"balanced">("cost");
  const [uiPolicy, setUiPolicy] = React.useState<"AI_FIRST"|"DI_FIRST">("AI_FIRST");
  

    // ---- optimizer
  function pickBest(
    plcs: ModuleRow[],
    needs: { AI:number; AO:number; DI:number; DO:number },
    proto: { bacnetIp:number; bacnetMstp:number; modbusTcp:number; modbusRtu:number; mbus:number }
  ): HardwarePick | null {
    const ioMods = moduleList.filter(isIOModule);
    if (plcs.length === 0) return null;

    let best: HardwarePick | null = null;

    for (const plc of plcs) {
      // Gerekirse gateway ekle (PLC desteklemiyorsa ve gateway yoksa bu PLC elenir)
      const gw: Array<{ item: ModuleRow; qty: number }> = [];

// === gateway helper (self-contained, alias-tolerant) ===
const _normProto = (s?: string) =>
  String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const _PROTO_ALIASES: Record<string,string[]> = {
  bacnetip:   ["bacnetip","bacnet-ip","bacnet ip","bacnettcpip","bacnet"],
  bacnetmstp: ["bacnetmstp","bacnet-mstp","bacnet mstp","mstp"],
  modbustcp:  ["modbustcp","modbus-tcp","modbus tcp","modbustcpip","modbus"],
  modbusrtu:  ["modbusrtu","modbus-rtu","modbus rtu","rtu"],
  mbus:       ["mbus","m-bus","m bus"]
};

const _matchesProto = (value: string, wanted: string) => {
  const key = _normProto(wanted);
  const aliases = _PROTO_ALIASES[key] || [key];
  const v = _normProto(value);
  return aliases.includes(v);
};

const byProto = (name: string) =>
  moduleList.find(x => isGateway(x) && _matchesProto(String(x.GW_Proto || ""), name));

const gwCapacity = (g: ModuleRow) => {
  const capDev  = num(g.GW_Device_Capacity, 0);
  const capPort = num(g.GW_Ports, 0);
  return capDev > 0 ? capDev : (capPort > 0 ? capPort : 1);
};

let bad = false;
const needGW = (protoName: string, demand: number, plcFlag: keyof ModuleRow) => {
  if (demand <= 0) return;
  if (yes((plc as any)[plcFlag])) return; // PLC native destekliyor → gateway gerekmez
  const g = byProto(protoName);
  if (!g) { bad = true; return; }         // gateway yok → bu PLC elenir
  gw.push({ item: g, qty: Math.ceil(demand / gwCapacity(g)) });
};

needGW("BACnet IP",   proto.bacnetIp,   "Supports_BACnet_IP");
needGW("BACnet MSTP", proto.bacnetMstp, "Supports_BACnet_MSTP");
needGW("Modbus TCP",  proto.modbusTcp,  "Supports_Modbus_TCP");
needGW("Modbus RTU",  proto.modbusRtu,  "Supports_Modbus_RTU");
needGW("M-Bus",       proto.mbus,       "Supports_MBus");
if (bad) continue;


      // Dahili IO + UI tahsisi
      let remAI = Math.max(0, needs.AI - num(plc.AI_cap,0));
      let remAO = Math.max(0, needs.AO - num(plc.AO_cap,0));
      let remDI = Math.max(0, needs.DI - num(plc.DI_cap,0));
      let remDO = Math.max(0, needs.DO - num(plc.DO_cap,0));
      let plcUI = num(plc.UI_cap,0);

// UI kanallarını AI/DI/AO arasında paylaştır
const alloc = (want: "AI"|"DI"|"AO") => {
  if (plcUI <= 0) return;
  if (want === "AI") { const x = Math.min(plcUI, remAI); remAI -= x; plcUI -= x; return; }
  if (want === "DI") { const x = Math.min(plcUI, remDI); remDI -= x; plcUI -= x; return; }
  if (want === "AO") { const x = Math.min(plcUI, remAO); remAO -= x; plcUI -= x; return; }
};

if (uiPolicy === "AI_FIRST") {
  alloc("AI"); alloc("DI"); alloc("AO");
} else {
  alloc("DI"); alloc("AI"); alloc("AO");
}

      const modules: Array<{ item: ModuleRow; qty: number; uiAllocAI?: number; uiAllocDI?: number }> = [];
      let slotsUsed = 0;
      const maxSlotsNum = num(plc.PLC_Max_Slots, NaN);
      const slotsLimit = Number.isFinite(maxSlotsNum) && maxSlotsNum > 0 ? maxSlotsNum : undefined;

      // === REPLACE BEGIN ===
// Çoklu-karşılama bilinçli seçim: seçilen modül birden fazla ihtiyacı aynı anda düşürür
const choose = (kind: "AO"|"DO"|"AI"|"DI") => {
  const unitRemaining = () => ({ AO: remAO, DO: remDO, AI: remAI, DI: remDI }[kind]);
  let guard = 0;

  while (unitRemaining() > 0 && guard < 100) {
    // En az bir ihtiyaca katkı sağlayan adaylar
    const cands = ioMods.filter(m =>
      (num(m.AO_cap,0)>0 && remAO>0) ||
      (num(m.DO_cap,0)>0 && remDO>0) ||
      (num(m.AI_cap,0)>0 && remAI>0) ||
      (num(m.DI_cap,0)>0 && remDI>0) ||
      (num(m.UI_cap,0)>0 && (remAI>0 || remDI>0 || remAO>0))
    );
    if (cands.length === 0) break;

// === PREF: Siemens TXM kuralları (model bazlı ağırlık) ===
// kind: "AO" | "DO" | "AI" | "DI"
// a*: bu modül 1 adet alınınca karşıladığı miktarlar
// rem*: kalan ihtiyaçlar
const prefFactor = (
  m: ModuleRow,
  kind: "AO"|"DO"|"AI"|"DI",
  a: { aAI:number; aDI:number; aAO:number; aDO:number },
  rem: { AI:number; DI:number; AO:number; DO:number }
) => {
  let f = 1;
  const model = String(m.Model||"");
  const is8U   = /TXM1\.8U/i.test(model);
  const is8D   = /TXM1\.8D/i.test(model);
  const is16D  = /TXM1\.16D/i.test(model);
  const is6R   = /TXM1\.6R/i.test(model);
  const is4D3R = /TXM1\.4D3R/i.test(model);

  // AI/AO: önce TXM1.8U
  if ((kind==="AI" || kind==="AO") && is8U) f *= 0.85;

  // DO: önce TXM1.6R
  if (kind==="DO" && is6R) f *= 0.85;

  // DI: önce TXM1.8D / TXM1.16D (yüksek DI'da 16D daha mantıklı)
  if (kind==="DI") {
    if (rem.DI >= 9 && is16D)      f *= 0.80; // çok DI varsa 16D
    else if (is8D)                 f *= 0.85; // az DI'da 8D
  }

  // Kombine: 4DI+3DO varsa TXM1.4D3R’ye bonus (modül sayısını azaltır)
  if (is4D3R && rem.DI>=4 && rem.DO>=3) f *= 0.75;

  // 8U birden fazla ihtiyacı aynı anda düşürüyorsa ekstra teşvik
  if (is8U && ((a.aAI>0 && a.aDI>0) || (a.aAI>0 && a.aAO>0))) f *= 0.90;

  return f;
};



    const evalCand = (m: ModuleRow) => {
      // Bu modül 1 adet alındığında mevcut ihtiyaçları ne kadar düşürür?
      let aAI = Math.min(remAI, num(m.AI_cap,0));
      let aDI = Math.min(remDI, num(m.DI_cap,0));
      let aAO = Math.min(remAO, num(m.AO_cap,0));
      let aDO = Math.min(remDO, num(m.DO_cap,0));

      // UI tahsisi (AI/DI'ye, politika ve kalan ihtiyaca göre)
      let ui = num(m.UI_cap,0);
const applyUI = (want: "AI"|"DI"|"AO") => {
  if (ui <= 0) return;
  if (want === "AI") { const need = Math.max(0, remAI - aAI); const x = Math.min(need, ui); aAI += x; ui -= x; return; }
  if (want === "DI") { const need = Math.max(0, remDI - aDI); const x = Math.min(need, ui); aDI += x; ui -= x; return; }
  if (want === "AO") { const need = Math.max(0, remAO - aAO); const x = Math.min(need, ui); aAO += x; ui -= x; return; }
};

if (ui > 0) {
  if (uiPolicy === "AI_FIRST") {
    applyUI("AI"); applyUI("DI"); applyUI("AO");
  } else {
    applyUI("DI"); applyUI("AI"); applyUI("AO");
  }
}

      const primary = kind==="AO"?aAO:kind==="DO"?aDO:kind==="AI"?aAI:aDI;
      const others  = (aAI + aDI + aAO + aDO) - primary;

      // Çoklu karşılama teşviki: diğer kapsamalara da kredi ver
      const effUnits = primary + 0.6*others;

      const price = num(m.UnitPrice, 9999);
      const width = effWidth(m);
      const base  = (objective==="cost") ? price
                   : (objective==="width") ? width
                   : (0.6*price + 0.4*width);

      const factor = prefFactor(m, kind, {aAI, aDI, aAO, aDO}, {AI: remAI, DI: remDI, AO: remAO, DO: remDO});
      const score  = (base * factor) / Math.max(1, effUnits);

      // UI'dan gelen tahsisleri raporlamak için
      const uiAllocAI = Math.max(0, aAI - Math.min(remAI, num(m.AI_cap,0)));
      const uiAllocDI = Math.max(0, aDI - Math.min(remDI, num(m.DI_cap,0)));

      return { m, aAI, aDI, aAO, aDO, uiAllocAI, uiAllocDI, score };
    };

    const evaluated = cands.map(evalCand).filter(e => (e.aAI+e.aDI+e.aAO+e.aDO) > 0);
    if (evaluated.length === 0) break;

    evaluated.sort((a,b)=> a.score - b.score);
    const pickM = evaluated[0];

    modules.push({
      item: pickM.m,
      qty: 1,
      uiAllocAI: pickM.uiAllocAI,
      uiAllocDI: pickM.uiAllocDI
    });

    // Tüm ihtiyaçları aynı anda düşür
    remAI = Math.max(0, remAI - pickM.aAI);
    remAO = Math.max(0, remAO - pickM.aAO);
    remDI = Math.max(0, remDI - pickM.aDI);
    remDO = Math.max(0, remDO - pickM.aDO);

    slotsUsed += 1;
    if (slotsLimit && slotsUsed > slotsLimit) break;
    if (modules.length > 200) break;
    guard++;
  }
};

// Seçim sırası aynı kalıyor
choose("AO"); choose("DO"); choose("AI"); choose("DI");
// === REPLACE END ===


      if (remAI>0 || remAO>0 || remDI>0 || remDO>0) continue;
      if (slotsLimit && slotsUsed > slotsLimit) continue;

      let cost = num(plc.UnitPrice,0), width = effWidth(plc);
      for (const m of modules) { cost += num(m.item.UnitPrice,0)*m.qty; width += effWidth(m.item)*m.qty; }
      for (const g of gw)     { cost += num(g.item.UnitPrice,0)*g.qty;   width += effWidth(g.item)*g.qty; }

      const pick: HardwarePick = { plc, modules, gateways: gw, summary: { cost, width, slotsUsed, slotsLimit } };

      const better = (a:HardwarePick|null, b:HardwarePick) => {
        if (!a) return true;
        if (objective==="cost")  return b.summary.cost  < a.summary.cost;
        if (objective==="width") return b.summary.width < a.summary.width;
        const aScore = 0.6*a.summary.cost + 0.4*a.summary.width;
        const bScore = 0.6*b.summary.cost + 0.4*b.summary.width;
        return bScore < aScore;
      };
      if (better(best, pick)) best = pick;
    }

    return best;
  }

  


  const calculate = () => {
    if (panelId === '') return;
    if (moduleList.length === 0) {
      setSnackbar({ open:true, msg:"Load Module List first", color:"#E53935" });
      return;
    }

    const { needs, proto } = computeNeedsAndProtocols(panelId as number, spare);
    const plcs = moduleList.filter(isPLC);

// IO modülleri ve “var mı?” öniyeterlilik
const ioMods = moduleList.filter(isIOModule);
const have = {
  // AO: UI kanalları da AO’yu karşılayabiliyorsa kabul
  AO: ioMods.some(m => num(m.AO_cap,0)>0 || num(m.UI_cap,0)>0)
    || plcs.some(p => num(p.AO_cap,0)>0 || num(p.UI_cap,0)>0),

  // DO: UI kabul etmiyoruz
  DO: ioMods.some(m => num(m.DO_cap,0)>0)
    || plcs.some(p => num(p.DO_cap,0)>0),

  // AI/DI: UI kabul
  AI: ioMods.some(m => num(m.AI_cap,0)>0 || num(m.UI_cap,0)>0)
    || plcs.some(p => num(p.AI_cap,0)>0 || num(p.UI_cap,0)>0),

  DI: ioMods.some(m => num(m.DI_cap,0)>0 || num(m.UI_cap,0)>0)
    || plcs.some(p => num(p.DI_cap,0)>0 || num(p.UI_cap,0)>0),
};

// İhtiyaç var ama listede karşılığı yoksa erken çık
if (needs.AO>0 && !have.AO) { setSnackbar({open:true, msg:"Module List AO/UI ile karşılayamıyor.", color:"#E53935"}); return; }
if (needs.DO>0 && !have.DO) { setSnackbar({open:true, msg:"Module List'te DO modülü yok.",          color:"#E53935"}); return; }
if (needs.AI>0 && !have.AI) { setSnackbar({open:true, msg:"Module List AI/UI ile karşılayamıyor.",  color:"#E53935"}); return; }
if (needs.DI>0 && !have.DI) { setSnackbar({open:true, msg:"Module List DI/UI ile karşılayamıyor.",  color:"#E53935"}); return; }

// Protokoller: PLC native değilse uygun gateway var mı?
const gwExists = (name: string) =>
  moduleList.some(x => isGateway(x) && matchesProto(String(x.GW_Proto||""), name));

if (proto.modbusRtu>0 && !plcs.some(p=>yes((p as any).Supports_Modbus_RTU)) && !gwExists("modbus rtu")) {
  setSnackbar({open:true,msg:"Modbus RTU gerekiyor; uygun gateway yok.", color:"#E53935"}); return;
}
if (proto.modbusTcp>0 && !plcs.some(p=>yes((p as any).Supports_Modbus_TCP)) && !gwExists("modbus tcp")) {
  setSnackbar({open:true,msg:"Modbus TCP gerekiyor; uygun gateway yok.", color:"#E53935"}); return;
}
if (proto.bacnetIp>0 && !plcs.some(p=>yes((p as any).Supports_BACnet_IP)) && !gwExists("bacnet ip")) {
  setSnackbar({open:true,msg:"BACnet/IP gerekiyor; uygun gateway yok.", color:"#E53935"}); return;
}
if (proto.bacnetMstp>0 && !plcs.some(p=>yes((p as any).Supports_BACnet_MSTP)) && !gwExists("bacnet mstp")) {
  setSnackbar({open:true,msg:"BACnet MSTP gerekiyor; uygun gateway yok.", color:"#E53935"}); return;
}
if (proto.mbus>0 && !plcs.some(p=>yes((p as any).Supports_MBus)) && !gwExists("m-bus")) {
  setSnackbar({open:true,msg:"M-Bus gerekiyor; uygun gateway yok.", color:"#E53935"}); return;
}

    const res = pickBest(plcs, needs, proto);
    if (!res) {
      setSnackbar({ open:true, msg:"No feasible configuration", color:"#E53935" });
      return;
    }

    const next = { ...hardware, [panelId as number]: res };
    setHardware(next);
  };

  const save = () => {
    if (panelId==='') return;
    if (!hardware[panelId as number]) { setSnackbar({open:true, msg:"Nothing to save. Calculate first.", color:"#E53935"}); return; }
    persistHardware(hardware);
    setSnackbar({open:true, msg:"Hardware saved to panel", color:"#4CAF50"});
  };



  // ---- render
  return (
    <Box>
      {/* Üst satır: panel seç + module list yükle */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 240 }}>
  <InputLabel sx={labelStylesDark}>Select Panel</InputLabel>
  <Select
    label="Select Panel"
    value={panelId === '' ? '' : String(panelId)}
    onChange={(e)=> setPanelId(e.target.value ? Number(e.target.value) : '')}
    sx={selectStylesDark}
    MenuProps={{ PaperProps: { sx: { bgcolor: '#1e1e1e', color: '#fff' } } }}
  >
    <MenuItem value="">(Choose)</MenuItem>
    {Array.from(rowsByPanel.entries()).map(([pid, v]) => (
      <MenuItem key={pid} value={String(pid)}>
        {v.panelName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <input
          ref={moduleExcelRef}
          type="file"
          hidden
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          onChange={(e)=>{ const f=e.target.files?.[0]; if(f) onModuleExcel(f); (e.target as HTMLInputElement).value=""; }}
        />
        <ModernButton onClick={()=>moduleExcelRef.current?.click()}>
        Upload Excel
        </ModernButton>
      </Stack>

      {/* Parametreler */}
      <Box sx={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:2, mb:2 }}>
        <TextField
  label="Spare %"
  type="number"
  value={spare}
  onChange={(e)=> {
    const n = Math.round(Number(e.target.value));
    const clamped = Math.min(50, Math.max(0, isFinite(n) ? n : 0));
    setSpare(clamped);
  }}
  size="small"
  sx={{ gridColumn:'span 2', ...textFieldStylesDark }}
  InputProps={{ inputProps:{ step:1, min:0, max:50 } }}
  InputLabelProps={{ sx: { color: '#BDBDBD', '&.Mui-focused': { color: '#E0E0E0' } } }}
/>
        <FormControl size="small" sx={{ gridColumn:'span 3' }}>
  <InputLabel sx={labelStylesDark}>Objective</InputLabel>
  <Select
    label="Objective"
    value={objective}
    onChange={(e)=> setObjective(e.target.value as any)}
    sx={selectStylesDark}
    MenuProps={{ PaperProps: { sx: { bgcolor: '#1e1e1e', color: '#fff' } } }}
  >
    <MenuItem value="cost">Min Cost</MenuItem>
    <MenuItem value="width">Min Width</MenuItem>
    <MenuItem value="balanced">Balanced</MenuItem>
  </Select>
</FormControl>
        <FormControl size="small" sx={{ gridColumn:'span 3' }}>
  <InputLabel sx={labelStylesDark}>UI Allocation</InputLabel>
  <Select
    label="UI Allocation"
    value={uiPolicy}
    onChange={(e)=> setUiPolicy(e.target.value as any)}
    sx={selectStylesDark}
    MenuProps={{ PaperProps: { sx: { bgcolor: '#1e1e1e', color: '#fff' } } }}
  >
    <MenuItem value="AI_FIRST">UI → AI first</MenuItem>
    <MenuItem value="DI_FIRST">UI → DI first</MenuItem>
  </Select>
</FormControl>

        <Box sx={{ gridColumn:'span 12' }}>
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap:'wrap' }}>
    <Box sx={{ flexGrow:1 }} />
    <PrimaryButton onClick={calculate}>Calculate</PrimaryButton>
    <PrimaryButton onClick={save}>Save</PrimaryButton>
  </Stack>
</Box>
      </Box>

      {/* Sonuç */}
      <Box sx={{ border:"1px solid #eee", borderRadius:1, overflow:"hidden" }}>
        {panelId!=='' && hardware[panelId as number] ? (
          <Box sx={{ p:2, bgcolor:"#fff", color:"#333" }}>
            {(() => {
              const pick = hardware[panelId as number]!;
              return (
                <Stack spacing={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight:700 }}>Selected Controller</Typography>
                  <Box>
                    <strong>{pick.plc?.Brand} {pick.plc?.Model}</strong> — {pick.plc?.Description || "-"}
                    <Box sx={{ mt:0.5, fontSize:13, color:"#555" }}>
                      Cost: {pick.summary.cost.toFixed(2)} • Width: {pick.summary.width.toFixed(1)} mm
                      {pick.summary.slotsLimit ? ` • Slots: ${pick.summary.slotsUsed}/${pick.summary.slotsLimit}` : ` • Slots: ${pick.summary.slotsUsed}`}
                    </Box>
                  </Box>

                  <Divider />

                  <Typography variant="subtitle1" sx={{ fontWeight:700 }}>I/O Modules</Typography>
                  {pick.modules.length===0 ? <Typography variant="body2">—</Typography> : (
                    <Stack spacing={0.5}>
                      {pick.modules.map((x,i)=>(
                        <Box key={i}>
                          {x.qty} × <strong>{x.item.Brand} {x.item.Model}</strong>
                          {(x.uiAllocAI||x.uiAllocDI) ? <em style={{ color:"#666" }}> (UI→AI {x.uiAllocAI||0}, UI→DI {x.uiAllocDI||0})</em> : null}
                        </Box>
                      ))}
                    </Stack>
                  )}

                  <Typography variant="subtitle1" sx={{ fontWeight:700, mt:1 }}>Gateways</Typography>
                  {pick.gateways.length===0 ? <Typography variant="body2">—</Typography> : (
                    <Stack spacing={0.5}>
                      {pick.gateways.map((g,i)=>(
                        <Box key={i}>{g.qty} × <strong>{g.item.Brand} {g.item.Model}</strong> ({g.item.GW_Proto})</Box>
                      ))}
                    </Stack>
                  )}
                </Stack>
              );
            })()}
          </Box>
        ) : (
          <Box sx={{ p:2, bgcolor:"#fff", color:"#666" }}>Choose a panel and press <strong>Calculate</strong>.</Box>
        )}
      </Box>
    </Box>
  );
}
// ================== END HARDWARE TAB ==================

