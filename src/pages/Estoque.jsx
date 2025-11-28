import { useState } from "react";

function Estoque() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [epiSelecionado, setEpiSelecionado] = useState(null);

  const [epis, setEpis] = useState([
    {
      nome: "Capacete de Segurança",
      fabricante: "3M",
      quantidade: 120,
      validade: "2025-12",
      status: "OK"
    }
  ]);

  const [formNome, setFormNome] = useState("");
  const [formFabricante, setFormFabricante] = useState("");
  const [formQuantidade, setFormQuantidade] = useState("");
  const [formValidade, setFormValidade] = useState("");

  const episFiltrados = epis.filter((epi) =>
    epi.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirNovo() {
    setEpiSelecionado(null);
    setFormNome("");
    setFormFabricante("");
    setFormQuantidade("");
    setFormValidade("");
    setModalAberto(true);
  }

  function abrirEdicao(epi) {
    setEpiSelecionado(epi);
    setFormNome(epi.nome);
    setFormFabricante(epi.fabricante);
    setFormQuantidade(epi.quantidade);
    setFormValidade(epi.validade);
    setModalAberto(true);
  }

  function calcularStatus(qtd, validade) {
    if (qtd < 10) return "Crítico";
    if (qtd < 50) return "Baixo";
    return "OK";
  }

  function salvarEpi() {
    const novo = {
      nome: formNome,
      fabricante: formFabricante,
      quantidade: Number(formQuantidade),
      validade: formValidade,
      status: calcularStatus(formQuantidade, formValidade)
    };

    if (epiSelecionado) {
      setEpis((prev) =>
        prev.map((e) => (e === epiSelecionado ? novo : e))
      );
    } else {
      setEpis((prev) => [...prev, novo]);
    }

    setModalAberto(false);
  }

  function excluirEpi(epi) {
    setEpis((prev) =>
      prev.filter((e) => e !== epi)
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* CABEÇALHO */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Estoque de EPIs
        </h2>

        <button
          onClick={abrirNovo}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          ➕ Novo EPI
        </button>
      </div>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar EPI..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* TABELA */}
      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3">Item</th>
            <th className="p-3">Fabricante</th>
            <th className="p-3">Quantidade</th>
            <th className="p-3">Validade</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {episFiltrados.map((epi, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{epi.nome}</td>
              <td className="p-3">{epi.fabricante}</td>
              <td className="p-3">{epi.quantidade}</td>
              <td className="p-3">{epi.validade}</td>
              <td className={`p-3 font-bold
                ${epi.status === "OK" ? "text-green-600" :
                  epi.status === "Baixo" ? "text-yellow-600" :
                    "text-red-600"
                }`}
              >
                {epi.status}
              </td>
              <td className="p-3 flex gap-3">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => abrirEdicao(epi)}
                >
                  Editar
                </button>

                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => excluirEpi(epi)}
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
              {epiSelecionado ? "Editar EPI" : "Cadastrar EPI"}
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
              placeholder="Fabricante"
              value={formFabricante}
              onChange={(e) => setFormFabricante(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="number"
              placeholder="Quantidade"
              value={formQuantidade}
              onChange={(e) => setFormQuantidade(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="month"
              value={formValidade}
              onChange={(e) => setFormValidade(e.target.value)}
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
                onClick={salvarEpi}
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

export default Estoque;
