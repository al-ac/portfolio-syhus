export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-4">Alfredo Alves da Cunha</h1>
        <p className="text-xl text-green-400">Analista de Tecnologia | RPA & Automação</p>
      </div>

      <div className="mt-10 border border-gray-700 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">Sobre este Projeto</h2>
        <p className="mb-4">
          Esta página foi desenvolvida utilizando <strong>Next.js</strong> e deployada automaticamente via <strong>Vercel</strong> conectada ao <strong>GitHub</strong>.
        </p>
        <p>Demonstração prática de CI/CD para a vaga na <strong>Syhus</strong>.</p>
      </div>

      <div className="mt-8 flex gap-4">
        <a href="https://linkedin.com/in/alfredoalvescunha" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">LinkedIn</a>
        <a href="https://github.com/al-ac" className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"> GitHub</a>
      </div>
    </main>
  );
}