import { useState } from "react";

function Entradas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState("");

  const [entradas, setEntradas] = useState([
    {
      data: "12/06/2025",
      hora: "09:30",
      responsavel: "Maria Santos",
      itens: "Capacete (20), Luvas (50)"
    }
  ]);

  const [historico, setHistorico] = useState([
    {
      responsavel: "Maria Santos",
      item: "Capacete",
      quantidade: 20,
      data: "12/06/2025",
      hora: "09:30"
    }
  ]);

  // FORMULÁRIO
  const [formResponsavel, setFormResponsavel] = useState("");
  const [formItens, setFormItens] = useState("");
  const [formData, setFormData] = useState("");
  const [formHora, setFormHora] = useState("");

  const historicoFiltrado = historico.filter((h) =>
    h.responsavel.toLowerCase().includes(filtro.toLowerCase())
  );

  function abrirModal() {
    setFormResponsavel("");
    setFormItens("");
    setFormData("");
    setFormHora("");
    setModalAberto(true);
  }

  function salvarEntrada() {
    const novaEntrada = {
      data: formData,
      hora: formHora,
      responsavel: formResponsavel,
      itens: formItens
    };

    setEntradas((prev) => [...prev, novaEntrada]);

    const novoHistorico = {
      responsavel: formResponsavel,
      item: formItens,
      quantidade: 1,
      data: formData,
      hora: formHora
    };

    setHistorico((prev) => [...prev, novoHistorico]);

    setModalAberto(false);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* TÍTULO */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-gray-700">
          Entradas de EPIs
        </h2>

        <button
          onClick={abrirModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700"
        >
          ➕ Nova Entrada
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Registro e histórico de entradas de EPIs
      </p>

      {/* TABELA */}
      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3">Data</th>
            <th className="p-3">Hora</th>
            <th className="p-3">Responsável</th>
            <th className="p-3">Itens</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((entrada, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{entrada.data}</td>
              <td className="p-3">{entrada.hora}</td>
              <td className="p-3">{entrada.responsavel}</td>
              <td className="p-3">{entrada.itens}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* HISTÓRICO */}
      <div className="bg-gray-50 p-5 rounded-xl border">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          📜 Histórico de Entradas
        </h3>

        <input
          type="text"
          placeholder="Filtrar por responsável..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <div className="space-y-3 text-sm">
          {historicoFiltrado.map((h, index) => (
            <div
              key={index}
              className="border-l-4 border-green-600 pl-4 py-2 bg-white rounded"
            >
              <p className="text-gray-800 font-medium">
                {h.responsavel} registrou entrada de {h.item}
              </p>
              <p className="text-gray-500">
                {h.data} às {h.hora}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[450px]">

            <h2 className="text-xl font-bold mb-4">
              Nova Entrada
            </h2>

            <input
              type="text"
              placeholder="Responsável"
              value={formResponsavel}
              onChange={(e) => setFormResponsavel(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="text"
              placeholder="Itens (ex: Capacete 10, Luva 20)"
              value={formItens}
              onChange={(e) => setFormItens(e.target.value)}
              className="w-full p-3 border rounded-lg mb-3"
            />

            <div className="flex gap-2 mb-4">
              <input
                type="date"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="time"
                value={formHora}
                onChange={(e) => setFormHora(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={salvarEntrada}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
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
