import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clientes from './pages/Clientes'
import Prestamos from './pages/Prestamos'
import Montos from './pages/Montos'
import Topbar from './components/Topbar';

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/montos" element={<Montos />} />
        <Route path="*" element={ <div>404 NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
