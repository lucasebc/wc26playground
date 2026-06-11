import Link from 'next/link';
import { Trophy, Users, GitBranch, Share2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="text-8xl">🏆</div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
          Copa do Mundo 2026
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Simule os grupos e o mata-mata da Copa do Mundo FIFA 2026 com 48 seleções
        </p>
        <Link
          href="/simulation"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <Trophy size={22} />
          Começar Simulação
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full mt-8">
        {[
          { icon: <Users size={32} />, title: '48 Seleções', desc: '12 grupos com 4 seleções cada' },
          { icon: <GitBranch size={32} />, title: 'Mata-mata Visual', desc: 'Bracket interativo do mata-mata' },
          { icon: <Share2 size={32} />, title: 'Compartilhe', desc: 'Compartilhe sua simulação nas redes' },
        ].map((f, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-green-600 dark:text-green-400 flex justify-center mb-3">{f.icon}</div>
            <h3 className="font-bold text-lg mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
