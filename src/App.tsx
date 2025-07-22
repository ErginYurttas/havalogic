import { ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { darkTheme } from './theme'
import Home from './pages/Home'
import Project from './pages/Project' // Matches your Project.tsx filename

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/projects" element={<Project />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App