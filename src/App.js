import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header"
import Estoque from "./pages/Estoque";
import Funcionários from "./pages/Funcionários";
import Entradas from "./pages/Entradas";
import Entregas from "./pages/Entregas";
import Devoluções from "./pages/Devoluções";

function App() {
  const [logado, setLogado] = useState(false);
  const [pagina, setPagina] = useState("Dashboard");

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  function renderizarPagina(){
    switch (pagina){
      case "Dashboard":
        return <Dashboard />;
      case "Estoque":
        return <Estoque />;
      case "Funcionários":
        return <Funcionários/>;
      case "Entradas":
        return <Entradas />;
      case "Entregas":
        return <Entregas />;
        case "Devoluções":
        return <Devoluções />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        paginaAtual={pagina} 
        setPagina={setPagina} 
        onLogout={() => setLogado(false)}
      />

      <main className="p-6">
        {renderizarPagina()}
      </main>
    </div>
  );
}

export default App;
