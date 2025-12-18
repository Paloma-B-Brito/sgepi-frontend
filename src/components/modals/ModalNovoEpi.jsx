import { useState } from "react";

function ModalNovoEpi({ onClose }) {
  // SIMULAÇÃO (depois vem da API)
  const tiposProtecao = [
    { id: 1, nome: "Proteção da Cabeça e Face" },
    { id: 2, nome: "Proteção das Mãos e Braços" },
    { id: 3, nome: "Proteção dos Pés e Pernas" },
    { id: 4, nome: "Proteção do Corpo" },
  ];

  const tamanhosDisponiveis = [
    { id: 1, nome: "P" },
    { id: 2, nome: "M" },
    { id: 3, nome: "G" },
    { id: 4, nome: "GG" },
    { id: 5, nome: "G1" },
    { id: 6, nome: "G2" },
    { id: 7, nome: "G3" },
    { id: 8, nome: "G4" },
    { id: 9, nome: "35-36" },
    { id: 10, nome: "36-37" },
    { id: 11, nome: "38-39" },
    { id: 12, nome: "40-41" },
    { id: 13, nome: "41-42" },
    { id: 14, nome: "42-43" },
    { id: 15, nome: "43-44" },
    { id: 16, nome: "45-46" },
    { id: 17, nome: "47-48" },
    { id: 18, nome: "50-51" },
    { id: 19, nome: "51-52" },
    { id: 20, nome: "53-54" },
  ];

  // FORM
  const [nome, setNome] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [ca, setCa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidadeCa, setDataValidadeCa] = useState("");
  const [protecao, setProtecao] = useState("");
  const [alertaMinimo, setAlertaMinimo] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

  function salvarEpi() {
    const epi = {
      nome,
      fabricante,
      ca,
      descricao,
      data_validade_ca: dataValidadeCa,
      id_protecao: Number(protecao),
      alerta_minimo: alertaMinimo,
      tamanho: tamanhoSelecionado,
    };

    console.log("EPI para enviar à API:", epi);

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[520px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Cadastrar Novo EPI
        </h2>

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Nome do EPI"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Fabricante"
          value={fabricante}
          onChange={(e) => setFabricante(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="CA (Certificado de Aprovação)"
          value={ca}
          onChange={(e) => setCa(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Descrição do EPI"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label className="text-sm font-medium text-gray-600">
          Validade do CA
        </label>
        <input
          type="date"
          className="w-full p-3 border rounded-lg mb-3"
          value={dataValidadeCa}
          onChange={(e) => setDataValidadeCa(e.target.value)}
        />

        <select
          className="w-full p-3 border rounded-lg mb-3"
          value={protecao}
          onChange={(e) => setProtecao(e.target.value)}
        >
          <option value="">Tipo de Proteção</option>
          {tiposProtecao.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Tamanho (selecione apenas um)
          </p>

          <div className="flex flex-wrap gap-2">
            {tamanhosDisponiveis.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTamanhoSelecionado(t.nome)}
                className={`px-3 py-1 rounded-lg border ${
                  tamanhoSelecionado === t.nome
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {t.nome}
              </button>
            ))}
          </div>
        </div>

        <input
          type="number"
          min="1"
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Alerta mínimo de estoque"
          value={alertaMinimo}
          onChange={(e) => setAlertaMinimo(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={salvarEpi}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold"
          >
            Salvar EPI
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNovoEpi;
