import { useState } from "react";

function Entradas() {
  const [modalAberto, setModalAberto] = useState(false);

  // SIMULAÇÃO (depois vem da API)
  const usuarios = [
    { id: 1, nome: "Maria Santos" },
    { id: 2, nome: "João Silva" },
  ];

  const epis = [
    { id: 1, nome: "Capacete de Segurança", tamanhos: ["P", "M", "G"] },
    { id: 2, nome: "Luva de Proteção", tamanhos: ["P", "M", "G"] },
    { id: 3, nome: "Sapato de Segurança", tamanhos: ["40", "42", "44"] },
  ];

  const [entradas, setEntradas] = useState([]);

  // FORM
  const [responsavel, setResponsavel] = useState("");
  const [epi, setEpi] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [dataEntrada, setDataEntrada] = useState("");
  const [lote, setLote] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");

  function abrirModal() {
    setResponsavel("");
    setEpi("");
    setTamanho("");
    setQuantidade(1);
    setDataEntrada("");
    setLote("");
    setFornecedor("");
    setValorUnitario("");
    setModalAberto(true);
  }

  function salvarEntrada() {
    const novaEntrada = {
      id: crypto.randomUUID(),
      responsavel,
      epi,
      tamanho,
      quantidade,
      dataEntrada,
      fornecedor,
      lote,
      valorUnitario,
    };

    setEntradas((prev) => [...prev, novaEntrada]);
    setModalAberto(false);
  }

  const epiSelecionado = epis.find(
    (e) => e.id === Number(epi)
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-700">
          Entradas de EPIs
        </h2>

        <button
          onClick={abrirModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          ➕ Nova Entrada
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Registro de entradas no estoque
      </p>

      <table className="w-full border rounded-lg">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-2">Data</th>
            <th className="p-2">Responsável</th>
            <th className="p-2">EPI</th>
            <th className="p-2">Tam.</th>
            <th className="p-2">Qtd</th>
            <th className="p-2">Fornecedor</th>
          </tr>
        </thead>

        <tbody>
          {entradas.length === 0 && (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-400">
                Nenhuma entrada registrada
              </td>
            </tr>
          )}

          {entradas.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">{e.dataEntrada}</td>
              <td className="p-2">
                {usuarios.find(
                  (u) => u.id === Number(e.responsavel)
                )?.nome}
              </td>
              <td className="p-2">
                {epis.find(
                  (ep) => ep.id === Number(e.epi)
                )?.nome}
              </td>
              <td className="p-2 text-center">{e.tamanho}</td>
              <td className="p-2 text-center">{e.quantidade}</td>
              <td className="p-2">{e.fornecedor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              Nova Entrada de EPI
            </h2>

            <select
              className="w-full p-3 border mb-2"
              onChange={(e) => setResponsavel(e.target.value)}
            >
              <option value="">Responsável</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>

            <select
              className="w-full p-3 border mb-2"
              onChange={(e) => setEpi(e.target.value)}
            >
              <option value="">EPI</option>
              {epis.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nome}
                </option>
              ))}
            </select>

            {epiSelecionado && (
              <select
                className="w-full p-3 border mb-2"
                onChange={(e) => setTamanho(e.target.value)}
              >
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
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />

            <input
              type="date"
              className="w-full p-3 border mb-2"
              onChange={(e) => setDataEntrada(e.target.value)}
            />

            <input
              className="w-full p-3 border mb-2"
              placeholder="Fornecedor"
              onChange={(e) => setFornecedor(e.target.value)}
            />

            <input
              className="w-full p-3 border mb-2"
              placeholder="Lote"
              onChange={(e) => setLote(e.target.value)}
            />

            <input
              type="number"
              step="0.01"
              className="w-full p-3 border mb-4"
              placeholder="Valor unitário"
              onChange={(e) => setValorUnitario(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={salvarEntrada}
                className="bg-green-600 text-white px-4 py-2 rounded"
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

export default Entradas;
