import { useState } from "react";

function Entregas() {
  const [modalAberto, setModalAberto] = useState(false);

  // SIMULAÇÃO (depois API)
  const funcionarios = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Santos" },
  ];

  const epis = [
    { id: 1, nome: "Capacete de Segurança", tamanhos: ["P", "M", "G"] },
    { id: 2, nome: "Luva de Raspa", tamanhos: ["P", "M", "G"] },
    { id: 3, nome: "Sapato de Segurança", tamanhos: ["40", "42", "44"] },
  ];

  const [entregas, setEntregas] = useState([]);

  // FORM ENTREGA
  const [funcionario, setFuncionario] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [assinatura, setAssinatura] = useState("");

  // ITENS
  const [itens, setItens] = useState([]);
  const [epi, setEpi] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  function abrirModal() {
    setFuncionario("");
    setDataEntrega("");
    setAssinatura("");
    setItens([]);
    setEpi("");
    setTamanho("");
    setQuantidade(1);
    setModalAberto(true);
  }

  function adicionarItem() {
    if (!epi || !tamanho || !quantidade) return;

    setItens((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        epi,
        tamanho,
        quantidade,
      },
    ]);

    setEpi("");
    setTamanho("");
    setQuantidade(1);
  }

  function removerItem(id) {
    setItens((prev) => prev.filter((i) => i.id !== id));
  }

  function salvarEntrega() {
    const novaEntrega = {
      id: crypto.randomUUID(),
      funcionario,
      dataEntrega,
      assinatura,
      itens,
    };

    setEntregas((prev) => [...prev, novaEntrega]);
    setModalAberto(false);
  }

  const epiSelecionado = epis.find((e) => e.id === Number(epi));

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-700">
          Entregas de EPIs
        </h2>

        <button
          onClick={abrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          ➕ Nova Entrega
        </button>
      </div>

      <table className="w-full border rounded-lg">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-2">Funcionário</th>
            <th className="p-2">Data</th>
            <th className="p-2">Itens</th>
          </tr>
        </thead>
        <tbody>
          {entregas.length === 0 && (
            <tr>
              <td colSpan="3" className="p-6 text-center text-gray-400">
                Nenhuma entrega registrada
              </td>
            </tr>
          )}

          {entregas.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">
                {funcionarios.find(f => f.id == e.funcionario)?.nome}
              </td>
              <td className="p-2">{e.dataEntrega}</td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {e.itens.map((i) => (
                    <li key={i.id}>
                      {epis.find(ep => ep.id == i.epi)?.nome} ({i.tamanho}) – {i.quantidade}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[520px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Nova Entrega
            </h2>

            <select className="w-full p-3 border mb-2" onChange={(e) => setFuncionario(e.target.value)}>
              <option value="">Funcionário</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>

            <input
              type="date"
              className="w-full p-3 border mb-2"
              onChange={(e) => setDataEntrega(e.target.value)}
            />

            <input
              className="w-full p-3 border mb-4"
              placeholder="Assinatura digital"
              onChange={(e) => setAssinatura(e.target.value)}
            />

            <hr className="my-4" />

            <h3 className="font-bold mb-2">Adicionar Item</h3>

            <select className="w-full p-3 border mb-2" onChange={(e) => setEpi(e.target.value)}>
              <option value="">EPI</option>
              {epis.map((e) => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>

            {epiSelecionado && (
              <select className="w-full p-3 border mb-2" onChange={(e) => setTamanho(e.target.value)}>
                <option value="">Tamanho</option>
                {epiSelecionado.tamanhos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            )}

            <input
              type="number"
              className="w-full p-3 border mb-2"
              placeholder="Quantidade"
              onChange={(e) => setQuantidade(e.target.value)}
            />

            <button
              onClick={adicionarItem}
              className="w-full bg-green-600 text-white p-2 rounded-lg font-bold mb-4"
            >
              ➕ Adicionar Item
            </button>

            {itens.length > 0 && (
              <ul className="mb-4">
                {itens.map((i) => (
                  <li key={i.id} className="flex justify-between text-sm mb-1">
                    <span>
                      {epis.find(ep => ep.id == i.epi)?.nome} ({i.tamanho}) – {i.quantidade}
                    </span>
                    <button
                      onClick={() => removerItem(i.id)}
                      className="text-red-600"
                    >
                      remover
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEntrega}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar Entrega
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Entregas;
