'use client';
import { useState } from 'react';
import { X, Copy, ExternalLink, Link, Loader2 } from 'lucide-react';
import { SimulationData } from '@/types';

interface Props {
  simulation: SimulationData;
  onClose: () => void;
}

export function ShareModal({ simulation, onClose }: Props) {
  const [shareUrl, setShareUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateLink = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulation),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
      const { shareCode } = await res.json();
      const url = `${window.location.origin}/share/${shareCode}`;
      setShareUrl(url);
    } catch {
      setError('Erro ao gerar link. Verifique a configuração do MongoDB.');
    }
    setLoading(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = `Veja minha simulação da Copa do Mundo 2026! 🏆⚽`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Compartilhar Simulação</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!shareUrl ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Gere um link para compartilhar sua simulação com amigos.
              </p>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={generateLink}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Link size={18} />}
                {loading ? 'Gerando link...' : 'Gerar Link'}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none truncate"
                />
                <button onClick={copyLink} className="text-green-600 hover:text-green-700 flex-shrink-0">
                  <Copy size={18} />
                </button>
              </div>
              {copied && <p className="text-green-600 text-xs text-center">Link copiado!</p>}

              <div className="flex gap-3">
                <button
                  onClick={shareTwitter}
                  className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg transition-colors text-sm font-medium"
                >
                  <ExternalLink size={18} />
                  Twitter/X
                </button>
                <button
                  onClick={shareFacebook}
                  className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium gap-2"
                >
                  <ExternalLink size={18} />
                  Facebook
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
