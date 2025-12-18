import { useState } from "react";

function Devolucoes() {
  const [modalAberto, setModalAberto] = useState(false);
  const [devolucoes, setDevolucoes] = useState([]);

  // SIMULAÇÃO (depois vem da API)
  const funcionarios = [
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Maria Santos" },
  ];

  const epis = [
    { id: 1, nome: "Capacete de Segurança", tamanhos: ["P", "M", "G"] },
    { id: 2, nome: "Sapato de Segurança", tamanhos: ["40", "42", "44"] },
  ];

  const motivos = [
    "Numeração ou tamanho errado",
    "Substituição por Desgaste ou Dano",
    "Vencimento da validade ou do CA",
    "Mudança de Função ou Setor",
    "Demissão",
  ];

  const [formFuncionario, setFormFuncionario] = useState("");
  const [formEpi, setFormEpi] = useState("");
  const [formTamanho, setFormTamanho] = useState("");
  const [formQuantidade, setFormQuantidade] = useState(1);
  const [formMotivo, setFormMotivo] = useState("");
  const [formAssinatura, setFormAssinatura] = useState("");

  const [houveTroca, setHouveTroca] = useState(false);
  const [novoEpi, setNovoEpi] = useState("");
  const [novoTamanho, setNovoTamanho] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");

  function abrirModal() {
    setFormFuncionario("");
    setFormEpi("");
    setFormTamanho("");
    setFormQuantidade(1);
    setFormMotivo("");
    setFormAssinatura("");
    setHouveTroca(false);
    setNovoEpi("");
    setNovoTamanho("");
    setNovaQuantidade("");
    setModalAberto(true);
  }

  function salvarDevolucao() {
    const devolucao = {
      id: crypto.randomUUID(),
      funcionario: formFuncionario,
      epi: formEpi,
      tamanho: formTamanho,
      quantidade: formQuantidade,
      motivo: formMotivo,
      assinatura: formAssinatura,
      troca: houveTroca
        ? {
            novoEpi,
            novoTamanho,
            novaQuantidade,
          }
        : null,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    setDevolucoes((prev) => [...prev, devolucao]);
    setModalAberto(false);
  }

  const epiSelecionado = epis.find((e) => e.id === Number(formEpi));
  const epiNovoSelecionado = epis.find((e) => e.id === Number(novoEpi));

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">
          Devoluções de EPIs
        </h2>

        <button
          onClick={abrirModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          ➕ Nova Devolução
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-2">Funcionário</th>
            <th className="p-2">EPI</th>
            <th className="p-2">Qtd</th>
            <th className="p-2">Motivo</th>
            <th className="p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {devolucoes.map((d) => (
            <tr key={d.id} className="border-t">
              <td className="p-2">{d.funcionario}</td>
              <td className="p-2">{d.epi}</td>
              <td className="p-2">{d.quantidade}</td>
              <td className="p-2">{d.motivo}</td>
              <td className="p-2">{d.data}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[460px]">
            <h2 className="text-xl font-bold mb-4">Registrar Devolução</h2>

            <select className="w-full p-3 border mb-2" onChange={(e) => setFormFuncionario(e.target.value)}>
              <option value="">Funcionário</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>{f.nome}</option>
              ))}
            </select>

            <select className="w-full p-3 border mb-2" onChange={(e) => setFormEpi(e.target.value)}>
              <option value="">EPI</option>
              {epis.map((e) => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>

            {epiSelecionado && (
              <select className="w-full p-3 border mb-2" onChange={(e) => setFormTamanho(e.target.value)}>
                <option value="">Tamanho</option>
                {epiSelecionado.tamanhos.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            )}

            <input
              type="number"
              className="w-full p-3 border mb-2"
              placeholder="Quantidade devolvida"
              onChange={(e) => setFormQuantidade(e.target.value)}
            />

            <select className="w-full p-3 border mb-2" onChange={(e) => setFormMotivo(e.target.value)}>
              <option value="">Motivo</option>
              {motivos.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <input
              className="w-full p-3 border mb-2"
              placeholder="Assinatura digital"
              onChange={(e) => setFormAssinatura(e.target.value)}
            />

            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" onChange={(e) => setHouveTroca(e.target.checked)} />
              Houve troca de EPI?
            </label>

            {houveTroca && (
              <>
                <select className="w-full p-3 border mb-2" onChange={(e) => setNovoEpi(e.target.value)}>
                  <option value="">Novo EPI</option>
                  {epis.map((e) => (
                    <option key={e.id} value={e.id}>{e.nome}</option>
                  ))}
                </select>

                {epiNovoSelecionado && (
                  <select className="w-full p-3 border mb-2" onChange={(e) => setNovoTamanho(e.target.value)}>
                    <option value="">Novo Tamanho</option>
                    {epiNovoSelecionado.tamanhos.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                )}

                <input
                  type="number"
                  className="w-full p-3 border mb-2"
                  placeholder="Nova quantidade"
                  onChange={(e) => setNovaQuantidade(e.target.value)}
                />
              </>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={() => setModalAberto(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancelar
              </button>
              <button onClick={salvarDevolucao} className="bg-blue-600 text-white px-4 py-2 rounded">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Devolucoes;
