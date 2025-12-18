import { useState } from "react";

function Estoque() {
  const [busca, setBusca] = useState("");
  const [filtrar, setFiltrar] = useState(false);
  const [verTudo, setVerTudo] = useState(false);

  const [epis, setEpis] = useState([
    {
      id: "CAP-001",
      nome: "Capacete de Segurança",
      tamanhoAtual: "M",
      variacoes: {
        P: { quantidade: 8, fabricante: "3M", validade: "2024-10" },
        M: { quantidade: 120, fabricante: "3M", validade: "2025-12" },
        G: { quantidade: 15, fabricante: "MSA", validade: "2024-06" },
      },
    },
    {
      id: "SAP-002",
      nome: "Sapato de Segurança",
      tamanhoAtual: "42",
      variacoes: {
        "40": { quantidade: 5, fabricante: "Bracol", validade: "2024-08" },
        "42": { quantidade: 35, fabricante: "Bracol", validade: "2025-05" },
        "44": { quantidade: 12, fabricante: "Marluvas", validade: "2024-11" },
      },
    },
    {
      id: "LUV-003",
      nome: "Luva de Proteção",
      tamanhoAtual: "M",
      variacoes: {
        P: { quantidade: 50, fabricante: "Danny", validade: "2026-01" },
        M: { quantidade: 18, fabricante: "Danny", validade: "2025-09" },
        G: { quantidade: 6, fabricante: "Volk", validade: "2024-12" },
      },
    },
    {
      id: "OCU-004",
      nome: "Óculos de Proteção",
      tamanhoAtual: "Único",
      variacoes: {
        Único: {
          quantidade: 22,
          fabricante: "Kalipso",
          validade: "2026-03",
        },
      },
    },
    {
      id: "PRO-005",
      nome: "Protetor Auricular",
      tamanhoAtual: "Único",
      variacoes: {
        Único: {
          quantidade: 9,
          fabricante: "3M",
          validade: "2024-07",
        },
      },
    },
  ]);

  function calcularStatus(qtd) {
    if (qtd < 10) return "Crítico";
    if (qtd < 20) return "Baixo";
    return "OK";
  }

  const listaExibida = verTudo
    ? [...epis].sort((a, b) => a.nome.localeCompare(b.nome))
    : epis.filter((epi) => {
        if (!filtrar) return true;
        const termo = busca.toLowerCase();
        return (
          epi.nome.toLowerCase().includes(termo) ||
          epi.tamanhoAtual.toLowerCase().includes(termo)
        );
      });

  function trocarTamanho(epiId, novoTamanho) {
    setEpis((prev) =>
      prev.map((epi) =>
        epi.id === epiId ? { ...epi, tamanhoAtual: novoTamanho } : epi
      )
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
          onClick={() => {
            setVerTudo(true);
            setBusca("");
            setFiltrar(false);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700"
        >
          Ver tabela completa
        </button>
      </div>

      {/* BUSCA + FILTRO */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por nome ou tamanho..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="flex-1 p-3 border rounded-lg"
        />

        <button
          onClick={() => {
            setFiltrar(true);
            setVerTudo(false);
          }}
          className="bg-blue-600 text-white px-4 rounded-lg font-bold"
        >
          Filtrar
        </button>
      </div>

      {/* TABELA */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-center">Tamanho</th>
            <th className="p-3 text-left">Fabricante</th>
            <th className="p-3 text-center">Quantidade</th>
            <th className="p-3 text-center">Validade</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {listaExibida.map((epi) => {
            const dados = epi.variacoes[epi.tamanhoAtual];
            const status = calcularStatus(dados.quantidade);

            return (
              <tr key={epi.id} className="border-t">
                <td className="p-3">{epi.nome}</td>

                <td className="p-3 text-center">
                  <select
                    value={epi.tamanhoAtual}
                    onChange={(e) =>
                      trocarTamanho(epi.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    {Object.keys(epi.variacoes).map((tam) => (
                      <option key={tam} value={tam}>
                        {tam}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3">{dados.fabricante}</td>
                <td className="p-3 text-center">{dados.quantidade}</td>
                <td className="p-3 text-center">{dados.validade}</td>

                <td
                  className={`p-3 text-center font-bold ${
                    status === "OK"
                      ? "text-green-600"
                      : status === "Baixo"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Estoque;
