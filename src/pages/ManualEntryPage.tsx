import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Stack,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const ModernButton = styled(Button)({
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '0.8125rem',
  fontWeight: 500,
  textTransform: 'none',
  letterSpacing: '0.02em',
  transition: 'all 0.2s ease',
  border: '1px solid',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  }
});

const PrimaryButton = styled(ModernButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: '#1565c0',
    borderColor: 'transparent'
  }
});

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' }
};

export default function ManualEntryPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Tablo state
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  // Snackbar (Collector ile aynı yapı)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  // Wizard (popup) state
  const [openWizard, setOpenWizard] = useState(false);
  const [step, setStep] = useState(0);

  // Tek satır taslağı
  const [draft, setDraft] = useState({
    projectCode: '',
    description: '',
    location: '',
    point: '',
    ai: '',
    ao: '',
    di: '',
    do: '',
    modbusRtu: '',
    modbusTcp: '',
    bacnetMstp: '',
    bacnetIp: '',
    mbus: '',
  });

  const textFieldSx = {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  };

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  // Wizard adımları (sırayla sorulacak alanlar)
  const steps: { key: keyof typeof draft; label: string; type?: 'number' | 'text' }[] = [
    { key: 'projectCode', label: 'Project Code' },
    { key: 'description', label: 'Description' },
    { key: 'location', label: 'Located' },
    { key: 'point', label: 'Point Name' },
    { key: 'ai', label: 'AI', type: 'number' },
    { key: 'ao', label: 'AO', type: 'number' },
    { key: 'di', label: 'DI', type: 'number' },
    { key: 'do', label: 'DO', type: 'number' },
    { key: 'modbusRtu', label: 'Modbus RTU', type: 'number' },
    { key: 'modbusTcp', label: 'Modbus TCP IP', type: 'number' },
    { key: 'bacnetMstp', label: 'Bacnet MSTP', type: 'number' },
    { key: 'bacnetIp', label: 'Bacnet IP', type: 'number' },
    { key: 'mbus', label: 'Mbus', type: 'number' },
  ];

  const current = steps[step];

  const openManualWizard = () => {
    setDraft({
      projectCode: '',
      description: '',
      location: '',
      point: '',
      ai: '',
      ao: '',
      di: '',
      do: '',
      modbusRtu: '',
      modbusTcp: '',
      bacnetMstp: '',
      bacnetIp: '',
      mbus: '',
    });
    setStep(0);
    setOpenWizard(true);
  };

  const handleNext = () => {
    // Basit doğrulama: text alanları boş olmasın, number alanları boşsa 0 kabul edelim
    const val = draft[current.key];
    if (!current.type) {
      if (String(val).trim() === '') return; // boş text geçme
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleCancelWizard = () => {
    setOpenWizard(false);
  };

  const handleFinishAddRow = () => {
    // number dönüşümleri
    const toNum = (v: string) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };

    const row = {
      projectCode: draft.projectCode.trim(),
      description: draft.description.trim(),
      location: draft.location.trim(),
      point: draft.point.trim(),
      ai: toNum(draft.ai),
      ao: toNum(draft.ao),
      di: toNum(draft.di),
      do: toNum(draft.do),
      modbusRtu: toNum(draft.modbusRtu),
      modbusTcp: toNum(draft.modbusTcp),
      bacnetMstp: toNum(draft.bacnetMstp),
      bacnetIp: toNum(draft.bacnetIp),
      mbus: toNum(draft.mbus),
    };

    setTableRows(prev => [...prev, row]);
    setShowTable(true);
    setOpenWizard(false);
  };

  const handleAddPool = () => {
    if (!tableRows || tableRows.length === 0) {
      setSnackbarMsg('No rows to add. Please generate the table first.');
      setSnackbarOpen(true);
      return;
    }

    const codes = Array.from(
      new Set(
        tableRows
          .map((r: any) => (r.projectCode ?? '').trim())
          .filter((c: string) => c.length > 0)
      )
    );

    if (codes.length === 0) {
      setSnackbarMsg('Rows have no Project Code. Please fill and try again.');
      setSnackbarOpen(true);
      return;
    }
    if (codes.length > 1) {
      setSnackbarMsg(`Multiple Project Codes in table: ${codes.join(', ')}. Please keep a single Project Code.`);
      setSnackbarOpen(true);
      return;
    }

    const code = codes[0];
    const key = `pool:${code}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');

    const payload = {
      id: Date.now(),
      system: 'manualentry',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: {
        // manual entry için description/location satır bazlı olabilir; ekstra meta koymuyoruz
      }
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
    setSnackbarOpen(true);

    // İsteğe bağlı: tabloyu temizlemek istersen burayı aç
    // setTableRows([]);
    // setShowTable(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, #1A237E, #000000)', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Box sx={{ py: 2, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
          <Box component="span" sx={{ color: '#1976d2' }}>hava</Box>
          <Box component="span" sx={{ color: '#B0BEC5' }}>logic</Box>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500, color: '#1976d2' }}>{loggedInUser || 'User'}</Typography>
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />} onClick={handleLogout} sx={{ minWidth: '100px' }}>Logout</PrimaryButton>
        </Stack>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Left: Actions */}
        <Container maxWidth="sm" sx={{ py: 6, px: 2, maxWidth: '600px', ml: 4, mr: 2 }}>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', p: 4, width: '400px', maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Manual Entry</Typography>
            <Stack spacing={2}>
              <PrimaryButton sx={{ width: '100%' }} onClick={openManualWizard}>
                Start Manual Entry
              </PrimaryButton>

              <PrimaryButton
                sx={{ width: '100%' }}
                onClick={handleAddPool}
                disabled={tableRows.length === 0}
              >
                Add Pool
              </PrimaryButton>

              <PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>Back to Project Overview</PrimaryButton>
            </Stack>
          </Box>
        </Container>

        {/* Right: Table */}
        <Box sx={{
          flex: 1,
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          mr: 1,
          ml: 0,
          mt: 6,
          maxHeight: '85vh',
          overflowY: 'auto',
          color: 'white'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            {tableRows.length > 0 ? 'Manual Entry Output Table' : 'Manual Entry Output Table'}
          </Typography>

          {showTable && tableRows.length > 0 && (
            <table style={{
              minWidth: '1200px',
              borderCollapse: 'collapse',
              backgroundColor: '#ffffff',
              fontSize: '0.875rem',
              fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif'`,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e0e0e0',
              color: '#333'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                  {['Project Code', 'Description', 'Located', 'Point Name', 'AI', 'AO', 'DI', 'DO', 'Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP', 'Mbus'].map((header, i) => (
                    <th key={i} style={{ border: '1px solid #e0e0e0', padding: '10px', fontWeight: 500, fontSize: '0.85rem', textAlign: 'left' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f4f8', transition: 'background 0.3s', cursor: 'default' }}>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.projectCode}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.description}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.location}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.point}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.ai}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.ao}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.di}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.do}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.modbusRtu}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.modbusTcp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.bacnetMstp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.bacnetIp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.mbus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>
      </Box>

      {/* Wizard (Popup) */}
      <Dialog open={openWizard} onClose={handleCancelWizard} fullWidth maxWidth="sm">
        <DialogTitle>Manual Entry</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Step {step + 1} / {steps.length}
          </Typography>

          <TextField
            autoFocus
            fullWidth
            label={current.label}
            type={current.type === 'number' ? 'number' : 'text'}
            value={draft[current.key]}
            onChange={(e) => {
              const v = e.target.value;
              setDraft((d) => ({ ...d, [current.key]: v }));
            }}
            InputLabelProps={{ sx: labelStyles }}
            sx={textFieldSx}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
  <PrimaryButton onClick={handleCancelWizard}>Cancel</PrimaryButton>
  <PrimaryButton onClick={handleBackStep} disabled={step === 0}>Back</PrimaryButton>
  {step < steps.length - 1 ? (
    <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
  ) : (
    <PrimaryButton onClick={handleFinishAddRow}>Finish & Add Row</PrimaryButton>
  )}
</DialogActions>

      </Dialog>

      {/* Snackbar (CollectorPage ile aynı yeşil stil) */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontWeight: 500,
            padding: '10px 24px',
            minWidth: 'auto',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }
        }}
      />
    </Box>
  );
}
