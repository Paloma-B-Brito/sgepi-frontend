import { useState } from "react";

function ModalEntrega({ onClose }) {
  const [itens, setItens] = useState([
    { nome: "", quantidade: "" }
  ]);

  function adicionarItem() {
    setItens([...itens, { nome: "", quantidade: "" }]);
  }

  function atualizarItem(index, campo, valor) {
    const novos = [...itens];
    novos[index][campo] = valor;
    setItens(novos);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Entrega de EPI
        </h2>

        <input
          type="text"
          placeholder="Nome do Funcionário"
          className="w-full p-3 border rounded-lg mb-4"
        />

        {itens.map((item, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Nome do EPI"
              value={item.nome}
              onChange={(e) => atualizarItem(index, "nome", e.target.value)}
              className="flex-1 p-2 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Qtd"
              value={item.quantidade}
              onChange={(e) => atualizarItem(index, "quantidade", e.target.value)}
              className="w-24 p-2 border rounded-lg"
            />
          </div>
        ))}

        <button
          onClick={adicionarItem}
          className="text-blue-600 font-medium mb-4"
        >
          ➕ Adicionar mais um EPI
        </button>

        <div className="flex gap-2 mb-3">
          <input
            type="date"
            className="flex-1 p-2 border rounded-lg"
          />
          <input
            type="time"
            className="flex-1 p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">
            Assinatura do Funcionário:
          </p>
          <div className="border h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            Área de assinatura
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
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
  );
}

export default ModalEntrega;
