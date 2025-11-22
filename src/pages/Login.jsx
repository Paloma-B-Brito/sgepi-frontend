function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="bg-white p-12 rounded-2xl shadow-2xl w-[420px]">

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            SGE
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Sistema de Gestão de EPIs
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Controle de Estoque e Distribuição de EPI
        </p>

        <div className="mb-6 mt-6">
          <label className="block text-sm mb-2 font-medium text-gray-600">
            Usuário
          </label>
          <input
            type="text"
            placeholder="Digite seu usuário"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-2 font-medium text-gray-600">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Entrar
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          © 2025 - Sistema SGEPI
        </p>
      </div>
    </div>
  );
}

export default Login;
