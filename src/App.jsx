import "./App.css";
import { Routes, Route } from 'react-router-dom'
import LayoutPrincipal from "./components/LayoutPrincipal"
import PaginaInicio from './pages/PaginaInicio'
import PaginaHabitos from './pages/PaginaHabitos'
import PaginaDetalhes from './pages/PaginaDetalhes'
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada'

function App() {
  return (
    <div className="AplicationReact" style={{ width: '100%' }}>
      <Routes>
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/habitos" element={<PaginaHabitos />} />
          <Route path="/habito/:id" element={<PaginaDetalhes />} />
        </Route>
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
    </div>
  )
}

export default App;
