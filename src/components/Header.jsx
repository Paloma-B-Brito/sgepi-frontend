function Header ({paginaAtual, setPagina, onLogout}){
    function Botao({label}){
        const ativo = paginaAtual === label;

        return(
            <button onClick={() => setPagina(label)} className={`px-4 py-2 rounded-lg font-medium transition ${ativo ? "bg-white text-blue-900 shadow-sm" : "text-white-900  hover:bg-blue-800"}`}>
                {label}
            </button>
        );
    }

    return(
        <header className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-bold">
                SGEPI
            </h1>

            <div className="flex gap-2">
                <Botao label="Dashboard"/>
                <Botao label="Estoque"/>
                <Botao label="Funcionarios"/>
                <Botao label="Entradas"/>
                <Botao label="Entregas"/>
            </div>

            <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium">
                Sair
            </button>
        </header>
    );
}

export default Header;