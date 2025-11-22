import Card from "../components/Card";

function Dashboard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* TABELA */}
            <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                    Estoque Atual de EPIs
                </h2>

                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="p-2">Item</th>
                            <th className="p-2">Fabricante</th>
                            <th className="p-2">Quantidade</th>
                            <th className="p-2">Validade</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Capacete de Segurança</td>
                            <td className="p-2">3M</td>
                            <td className="p-2">43.294</td>
                            <td className="p-2">12/2025</td>
                            <td className="p-2 text-green-600 font-bold">OK</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* LADO DIREITO */}
            <div className="space-y-6">

                {/* ALERTAS */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                        ⚠️ ALERTAS IMPORTANTES
                    </h2>

                    <ul className="text-sm space-y-2 font-medium">
                        <li className="text-red-600">
                            ❗ MÁSCARA PFF2: Vencimento Próximo (11/2025)
                        </li>
                        <li className="text-yellow-600">
                            ⚠️ CINTO DE SEGURANÇA: Quantidade Baixa (10)
                        </li>
                        <li className="text-purple-600">
                            🧤 LUVAS RASPADAS: 20 pares devolvidos
                        </li>
                        <li className="text-red-600">
                            ❗ CAPACETE: Não há mais no estoque
                        </li>
                    </ul>
                </div>

                {/* AÇÕES RÁPIDAS */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-gray-800 mb-4 text-lg">
                        AÇÕES RÁPIDAS
                    </h2>

                    <div className="space-y-3">
                        <button className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition">
                            ➕ Registrar Nova Entrada
                        </button>

                        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
                            ✋ Realizar Entrega / Baixa
                        </button>

                        <button className="w-full bg-yellow-500 text-white p-3 rounded-lg font-bold hover:bg-yellow-600 transition">
                            🔍 Buscar CA / EPI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
