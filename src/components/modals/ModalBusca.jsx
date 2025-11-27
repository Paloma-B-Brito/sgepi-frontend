import { useState } from "react";

function ModalBusca({ onClose }) {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);

  function buscar() {
    // Simulação de busca
    const bancoFake = [
      { nome: "Capacete de Segurança", ca: "12345", fabricante: "3M" },
      { nome: "Luva de Raspa", ca: "67890", fabricante: "Delta Plus" },
      { nome: "Máscara PFF2", ca: "54321", fabricante: "AirSafe" }
    ];

    const filtrados = bancoFake.filter(item =>
      item.nome.toLowerCase().includes(termo.toLowerCase()) ||
      item.ca.includes(termo)
    );

    setResultados(filtrados);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Buscar CA / EPI
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Digite nome do EPI ou número do CA"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />

          <button
            onClick={buscar}
            className="bg-yellow-500 text-white px-4 rounded-lg font-bold hover:bg-yellow-600"
          >
            Buscar
          </button>
        </div>

        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <div className="space-y-3">
            {resultados.map((item, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg text-sm"
              >
                <p><strong>Nome:</strong> {item.nome}</p>
                <p><strong>CA:</strong> {item.ca}</p>
                <p><strong>Fabricante:</strong> {item.fabricante}</p>
              </div>
            ))}
          </div>
        )}

        {resultados.length === 0 && termo && (
          <p className="text-sm text-gray-500">
            Nenhum resultado encontrado.
          </p>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalBusca;
