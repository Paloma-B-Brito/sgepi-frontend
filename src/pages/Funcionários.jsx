import { useState } from "react";

// gera matrícula com exatamente 7 números
function gerarMatricula() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

function Funcionarios() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [funcSelecionado, setFuncSelecionado] = useState(null);

  // SIMULAÇÃO (depois vem da API)
  const departamentos = [
    { id: 1, nome: "Produção" },
    { id: 2, nome: "Segurança" },
    { id: 3, nome: "Administrativo" },
  ];

  const funcoes = [
    { id: 1, nome: "Operador", idDepartamento: 1 },
    { id: 2, nome: "Supervisor", idDepartamento: 1 },
    { id: 3, nome: "Técnico de Segurança", idDepartamento: 2 },
    { id: 4, nome: "Analista", idDepartamento: 3 },
  ];

  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "João Silva",
      matricula: "4839201",
      departamento: departamentos[0],
      funcao: funcoes[0],
    },
    {
      id: 2,
      nome: "Maria Santos",
      matricula: "7391046",
      departamento: departamentos[1],
      funcao: funcoes[2],
    },
  ]);

  // FORM
  const [formNome, setFormNome] = useState("");
  const [formDepartamento, setFormDepartamento] = useState("");
  const [formFuncao, setFormFuncao] = useState("");

  const filtrados = funcionarios.filter((f) =>
    f.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirNovo() {
    setFuncSelecionado(null);
    setFormNome("");
    setFormDepartamento("");
    setFormFuncao("");
    setModalAberto(true);
  }

  function abrirEdicao(func) {
    setFuncSelecionado(func);
    setFormNome(func.nome);
    setFormDepartamento(func.departamento.id);
    setFormFuncao(func.funcao.id);
    setModalAberto(true);
  }

  function salvarFuncionario() {
    const departamentoSelecionado = departamentos.find(
      (d) => d.id === Number(formDepartamento)
    );

    const funcaoSelecionada = funcoes.find(
      (f) => f.id === Number(formFuncao)
    );

    if (!formNome || !departamentoSelecionado || !funcaoSelecionada) return;

    if (funcSelecionado) {
      setFuncionarios((prev) =>
        prev.map((f) =>
          f.id === funcSelecionado.id
            ? {
                ...f,
                nome: formNome,
                departamento: departamentoSelecionado,
                funcao: funcaoSelecionada,
              }
            : f
        )
      );
    } else {
      setFuncionarios((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          nome: formNome,
          matricula: gerarMatricula(), // 7 dígitos numéricos
          departamento: departamentoSelecionado,
          funcao: funcaoSelecionada,
        },
      ]);
    }

    setModalAberto(false);
  }

  function excluirFuncionario(func) {
    setFuncionarios((prev) =>
      prev.filter((f) => f.id !== func.id)
    );
  }

  const funcoesDisponiveis = funcoes.filter(
    (f) => f.idDepartamento === Number(formDepartamento)
  );

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
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3">Matrícula</th>
            <th className="p-3">Nome</th>
            <th className="p-3">Departamento</th>
            <th className="p-3">Função</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((func) => (
            <tr key={func.id} className="border-t">
              <td className="p-3">{func.matricula}</td>
              <td className="p-3">{func.nome}</td>
              <td className="p-3">{func.departamento.nome}</td>
              <td className="p-3">{func.funcao.nome}</td>
              <td className="p-3">
                <div className="flex justify-center gap-3">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[420px]">

            <h2 className="text-xl font-bold mb-4">
              {funcSelecionado ? "Editar Funcionário" : "Cadastrar Funcionário"}
            </h2>

            <input
              className="w-full p-3 border rounded-lg mb-3"
              placeholder="Nome"
              value={formNome}
              onChange={(e) => setFormNome(e.target.value)}
            />

            {funcSelecionado && (
              <input
                className="w-full p-3 border rounded-lg mb-3 bg-gray-100"
                value={funcSelecionado.matricula}
                disabled
              />
            )}

            <select
              className="w-full p-3 border rounded-lg mb-3"
              value={formDepartamento}
              onChange={(e) => {
                setFormDepartamento(e.target.value);
                setFormFuncao("");
              }}
            >
              <option value="">Departamento</option>
              {departamentos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome}
                </option>
              ))}
            </select>

            <select
              className="w-full p-3 border rounded-lg mb-4"
              value={formFuncao}
              onChange={(e) => setFormFuncao(e.target.value)}
              disabled={!formDepartamento}
            >
              <option value="">Função</option>
              {funcoesDisponiveis.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </select>

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
