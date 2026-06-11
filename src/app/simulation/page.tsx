'use client';
import { useState, useCallback } from 'react';
import { createInitialGroups } from '@/lib/groups';
import { areAllGroupsComplete, createKnockoutBracket, advanceWinner } from '@/lib/simulation';
import { Group, KnockoutMatch, SimulationData, Team } from '@/types';
import { GroupCard } from '@/components/GroupCard';
import { KnockoutBracket } from '@/components/KnockoutBracket';
import { ShareModal } from '@/components/ShareModal';
import { Trophy, RefreshCw, Share2, ArrowRight, Shuffle } from 'lucide-react';

type Stage = 'groups' | 'knockout';

export default function SimulationPage() {
  const [groups, setGroups] = useState<Group[]>(createInitialGroups);
  const [knockoutMatches, setKnockoutMatches] = useState<KnockoutMatch[]>([]);
  const [stage, setStage] = useState<Stage>('groups');
  const [showShareModal, setShowShareModal] = useState(false);

  const allGroupsComplete = areAllGroupsComplete(groups);

  const handleMatchChange = useCallback((
    groupId: string,
    matchId: string,
    homeScore: number | null,
    awayScore: number | null
  ) => {
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        matches: g.matches.map(m => {
          if (m.id !== matchId) return m;
          const played = homeScore !== null && awayScore !== null;
          return { ...m, homeScore, awayScore, played };
        }),
      };
    }));
  }, []);

  const handleFillRandom = () => {
    setGroups(prev => prev.map(g => ({
      ...g,
      matches: g.matches.map(m => {
        const h = Math.floor(Math.random() * 4);
        const a = Math.floor(Math.random() * 4);
        return { ...m, homeScore: h, awayScore: a, played: true };
      }),
    })));
  };

  const handleAdvanceToKnockout = () => {
    const bracket = createKnockoutBracket(groups);
    setKnockoutMatches(bracket);
    setStage('knockout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKnockoutWinner = useCallback((matchId: string, winner: Team) => {
    setKnockoutMatches(prev => advanceWinner(prev, matchId, winner));
  }, []);

  const handleReset = () => {
    setGroups(createInitialGroups());
    setKnockoutMatches([]);
    setStage('groups');
  };

  const isSimulationFinished = knockoutMatches.find(m => m.round === 'F')?.winner != null;

  const simulationData: SimulationData = {
    groups,
    knockout: knockoutMatches,
    groupsComplete: allGroupsComplete,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="text-yellow-500" size={32} />
            Simulacao Copa 2026
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {stage === 'groups' ? 'Fase de Grupos - Preencha os resultados' : 'Mata-mata - Selecione os vencedores'}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {stage === 'groups' && (
            <button
              onClick={handleFillRandom}
              title="Preenche todos os jogos com placares aleatorios para teste"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Shuffle size={18} />
              Preencher Aleatorio
            </button>
          )}
          {isSimulationFinished && (
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Share2 size={18} />
              Compartilhar
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <RefreshCw size={18} />
            Reiniciar
          </button>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {(['groups', 'knockout'] as Stage[]).map(s => {
          const canSwitch =
            s === 'groups' ||
            knockoutMatches.length > 0 ||
            (s === 'knockout' && allGroupsComplete);
          return (
            <button
              key={s}
              onClick={() => {
                if (s === 'groups') {
                  setStage(s);
                } else if (s === 'knockout') {
                  if (knockoutMatches.length === 0 && allGroupsComplete) {
                    const bracket = createKnockoutBracket(groups);
                    setKnockoutMatches(bracket);
                  }
                  if (knockoutMatches.length > 0 || allGroupsComplete) {
                    setStage(s);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              disabled={!canSwitch}
              title={s === 'knockout' && !allGroupsComplete && knockoutMatches.length === 0 ? 'Preencha todos os jogos dos grupos primeiro' : undefined}
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                stage === s
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : canSwitch
                  ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer'
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              {s === 'groups' ? 'Fase de Grupos' : 'Mata-mata'}
            </button>
          );
        })}
      </div>

      {stage === 'groups' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {groups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onMatchChange={handleMatchChange}
              />
            ))}
          </div>

          {allGroupsComplete && (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleAdvanceToKnockout}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
              >
                Avancar para o Mata-mata
                <ArrowRight size={22} />
              </button>
            </div>
          )}
        </>
      )}

      {stage === 'knockout' && knockoutMatches.length > 0 && (
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg px-4 py-3 text-sm text-yellow-800 dark:text-yellow-300">
            Clique em uma selecao para avanca-la para a proxima fase
          </div>
          <KnockoutBracket
            matches={knockoutMatches}
            onWinner={handleKnockoutWinner}
          />

          {isSimulationFinished && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
              >
                <Share2 size={22} />
                Compartilhar Simulacao
              </button>
            </div>
          )}
        </div>
      )}

      {showShareModal && (
        <ShareModal
          simulation={simulationData}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
