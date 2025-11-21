import { useState } from "react";

function App(){
  const [logado, setLogado] = useState(false);
  if(!logado){
    return <Login onLogin={() => setLogado(true)} />;
  }

  return <Dashboard onLogin={() => setLogado(false)}/>;
}

function Login({onLogin}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className= "bg-white p-12 rounded-2xl shadow-2xl w-[420px]">

        <div className="text-center mb-6">
          <div className="w-16 h16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              SGE
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
           Sistema de Gestão de EPIs
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Controle de Estoque e Distribuição de EPI
        </p>

        <div className="mb-6">
          <label className="block text-sm mb-2 font-medium text-gray-600">
            Usuário
          </label>
          <input type="text" placeholder="Digite seu usuário" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </input>
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-2 font-medium text-gray-600">
            Senha
          </label>
          <input type="password" placeholder="Digite sua senha" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </input>
        </div>

        <button onClick={onLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"> 
          Entrar
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          © 2025 - Sistema SGEPI
        </p>
      </div>
    </div>
  );
}

function Dashboard({onLogout}){
  const [secao, setSecao] = useState("dashboard")
  return(
    <div className="min-h-screen bg-gray-100">
      <header className="text-white bg-blue-900 px-8 py-4 flex shadow-lg justify-between items-center">
        <h1 className="text-xl font-bold">
          SGEPI - SISTEMA DE GESTÃO DE EPIs
        </h1>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Sair
        </button >
      </header>

      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
          <MenuBotao label="Dashboard" ativo = {secao === "dashboard"} onClick = {() => setSecao("dashboard")} />
          <MenuBotao label="Estoque" ativo = {secao === "estoque"} onClick = {() => setSecao("estoque")} />
          <MenuBotao label="Funcionários" ativo = {secao === "funcionarios"} onClick = {() => setSecao("funcionarios")} />
          <MenuBotao label="Entradas de EPIs" ativo = {secao === "entradas"} onClick = {() => setSecao("entradas")} />
          <MenuBotao label="Entregas de EPIs" ativo = {secao === "entregas"} onClick = {() => setSecao("entregas")} />
        </aside>

        <main className="flex-1 p-8">
          {secao === "dashboard" && <PaginaDashboard /> }
          {secao === "estoque" && <TituloSecao titulo = "Estoque"/> }
          {secao === "funcionarios" && <TituloSecao titulo = "Funcionários"/> }
          {secao === "entradas" && <TituloSecao titulo = "Entradas de EPIs"/> }
          {secao === "entregas" && <TituloSecao titulo = "Entregas de EPIs"/> }
        </main>
      </div>
    </div>
  );
}

function MenuBotao({label, ativo, onClick}){
  return(
    <button onClick={onClick} className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium ${ativo ? "bg-blue-100 text-blue-900" : "text-gray-700 hover:bg-gray-100"}`} >
      {label}
    </button>
  );
}

function PaginaDashboard(){
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card titulo = "EPIs em Estoque" valor = "125" cor = "text-blue-600"/>
        <Card titulo = "Entregas Hoje" valor = "8" cor = "text-green-600"/>
        <Card titulo = "Validades Próximas" valor = "3" cor = "text-red-600"/>
      </div>
    </div>
  );
}

function Card({titulo, valor, cor}){
  return(
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{titulo}</p>
      <p className={`text-3xl font-bold ${cor}`}>{valor}</p>
    </div>
  );
}

function TituloSecao({titulo}){
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700">
      {titulo}
      </h2>
      <p className="text-gray-500 mt-2">
        Em construção...
      </p>
    </div>
  );
}
   
export default App;
