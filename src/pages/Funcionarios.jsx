import { useState } from "react";

function Funcionarios() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [funcSelecionado, setFuncSelecionado] = useState(null);

  const [funcionarios, setFuncionarios] = useState([
    { nome: "João Silva", cargo: "Operador", setor: "Produção" },
    { nome: "Maria Santos", cargo: "Técnica de Segurança", setor: "Segurança" }
  ]);

  const [formNome, setFormNome] = useState("");
  const [formCargo, setFormCargo] = useState("");
  const [formSetor, setFormSetor] = useState("");

  const filtrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirNovo() {
    setFuncSelecionado(null);
    setFormNome("");
    setFormCargo("");
    setFormSetor("");
    setModalAberto(true);
  }

  function abrirEdicao(func) {
    setFuncSelecionado(func);
    setFormNome(func.nome);
    setFormCargo(func.cargo);
    setFormSetor(func.setor);
    setModalAberto(true);
  }

  function salvarFuncionario() {
    const novo = {
      nome: formNome,
      cargo: formCargo,
      setor: formSetor
    };

    if (funcSelecionado) {
      setFuncionarios((prev) =>
        prev.map((f) =>
          f === funcSelecionado ? novo : f
        )
      );
    } else {
      setFuncionarios((prev) => [...prev, novo]);
    }

    setModalAberto(false);
  }

  function excluirFuncionario(func) {
    setFuncionarios((prev) =>
      prev.filter((f) => f !== func)
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* CABEÇALHO */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Funcionários
        </h2>

        <button
          onClick={abrirNovo}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          ➕ Cadastrar Funcionário
        </button>
      </div>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar funcionário..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* TABELA */}
      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Cargo</th>
            <th className="p-3">Setor</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((func, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{func.nome}</td>
              <td className="p-3">{func.cargo}</td>
              <td className="p-3">{func.setor}</td>
              <td className="p-3 flex gap-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => abrirEdicao(func)}
                >
                  Editar
                </button>

                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => excluirFuncionario(func)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              {funcSelecionado ? "Editar Funcionário" : "Cadastrar Funcionário"}
            </h2>

            <input
              type="text"
              placeholder="Nome"
              value={formNome}
              onChange={(e) => setFormNome(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="text"
              placeholder="Cargo"
              value={formCargo}
              onChange={(e) => setFormCargo(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="text"
              placeholder="Setor"
              value={formSetor}
              onChange={(e) => setFormSetor(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={salvarFuncionario}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Salvar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Funcionarios;
