import { useState } from "react";

function ModalBaixaEpi({ onClose }) {
  // SIMULAÇÃO (depois vem da API)
  const epis = [
    { id: 1, nome: "Capacete de Segurança", tamanhos: ["M", "G"] },
    { id: 2, nome: "Luva de Proteção", tamanhos: ["P", "M", "G"] },
    { id: 3, nome: "Sapato de Segurança", tamanhos: ["40", "42", "44"] },
  ];

  const motivosBaixa = [
    "Vencimento",
    "Dano",
    "Perda",
    "Descarte",
    "Ajuste de Inventário",
  ];

  // FORM
  const [epi, setEpi] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [motivo, setMotivo] = useState("");
  const [dataBaixa, setDataBaixa] = useState("");
  const [observacao, setObservacao] = useState("");

  const epiSelecionado = epis.find((e) => e.id === Number(epi));

  function salvarBaixa() {
    const baixa = {
      id_epi: Number(epi),
      tamanho,
      quantidade: Number(quantidade),
      motivo,
      data_baixa: dataBaixa,
      observacao,
    };

    console.log("Baixa de EPI:", baixa);

    // futuramente:
    // fetch("/baixas", { method: "POST", body: JSON.stringify(baixa) })

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[480px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Registrar Baixa de EPI
        </h2>

        <select
          className="w-full p-3 border rounded-lg mb-3"
          value={epi}
          onChange={(e) => {
            setEpi(e.target.value);
            setTamanho("");
          }}
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
            className="w-full p-3 border rounded-lg mb-3"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
          >
            <option value="">Tamanho</option>
            {epiSelecionado.tamanhos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}

        <input
          type="number"
          min="1"
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <select
          className="w-full p-3 border rounded-lg mb-3"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        >
          <option value="">Motivo da Baixa</option>
          {motivosBaixa.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full p-3 border rounded-lg mb-3"
          value={dataBaixa}
          onChange={(e) => setDataBaixa(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Observação (opcional)"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={salvarBaixa}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
          >
            Confirmar Baixa
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalBaixaEpi;
