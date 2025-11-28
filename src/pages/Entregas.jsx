import { useState } from "react";

function Entregas() {
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState("");

  const entregas = [
    {
      funcionario: "João Silva",
      epi: "Capacete de Segurança",
      quantidade: 1,
      data: "12/06/2025",
      hora: "10:20"
    },
    {
      funcionario: "Maria Santos",
      epi: "Luva de Raspa",
      quantidade: 2,
      data: "10/06/2025",
      hora: "14:40"
    }
  ];

  const historico = [
    {
      funcionario: "João Silva",
      item: "Capacete",
      quantidade: 1,
      data: "12/06/2025",
      hora: "10:20"
    },
    {
      funcionario: "Maria Santos",
      item: "Luva",
      quantidade: 2,
      data: "10/06/2025",
      hora: "14:40"
    },
    {
      funcionario: "Carlos Lima",
      item: "Máscara",
      quantidade: 3,
      data: "09/06/2025",
      hora: "09:10"
    }
  ];

  const historicoFiltrado = historico.filter((h) =>
    h.funcionario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* TÍTULO */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-2xl font-bold text-gray-700">
          Entregas de EPI
        </h2>

        <button
          onClick={() => setModalAberto(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          ➕ Nova Entrega
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Registro e histórico de EPIs entregues aos colaboradores
      </p>

      {/* TABELA PRINCIPAL */}
      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3">Funcionário</th>
            <th className="p-3">EPI</th>
            <th className="p-3">Quantidade</th>
            <th className="p-3">Data</th>
            <th className="p-3">Hora</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{entrega.funcionario}</td>
              <td className="p-3">{entrega.epi}</td>
              <td className="p-3">{entrega.quantidade}</td>
              <td className="p-3">{entrega.data}</td>
              <td className="p-3">{entrega.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* HISTÓRICO */}
      <div className="bg-gray-50 p-5 rounded-xl border">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          📜 Histórico de Entregas
        </h3>

        <input
          type="text"
          placeholder="Filtrar por nome do funcionário..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <div className="space-y-3 text-sm">
          {historicoFiltrado.map((h, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-600 pl-4 py-2 bg-white rounded"
            >
              <p className="text-gray-800 font-medium">
                {h.funcionario} recebeu {h.quantidade} {h.item}
              </p>
              <p className="text-gray-500">
                {h.data} às {h.hora}
              </p>
            </div>
          ))}

          {historicoFiltrado.length === 0 && (
            <p className="text-gray-500 text-sm">
              Nenhum histórico encontrado.
            </p>
          )}
        </div>
      </div>

      {/* MODAL NOVA ENTREGA */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[450px]">

            <h2 className="text-xl font-bold mb-4">
              Registrar Nova Entrega
            </h2>

            <input
              type="text"
              placeholder="Nome do Funcionário"
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="text"
              placeholder="Nome do EPI"
              className="w-full p-3 border rounded-lg mb-3"
            />

            <input
              type="number"
              placeholder="Quantidade"
              className="w-full p-3 border rounded-lg mb-3"
            />

            <div className="flex gap-2 mb-4">
              <input
                type="date"
                className="flex-1 p-2 border rounded-lg"
              />
              <input
                type="time"
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

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
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
