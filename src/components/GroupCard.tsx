'use client';
import { Group } from '@/types';
import { MatchRow } from './MatchRow';
import { StandingsTable } from './StandingsTable';
import { calculateStandings } from '@/lib/simulation';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FlagImage } from './FlagImage';

interface Props {
  group: Group;
  onMatchChange: (groupId: string, matchId: string, homeScore: number | null, awayScore: number | null) => void;
}

export function GroupCard({ group, onMatchChange }: Props) {
  const [showMatches, setShowMatches] = useState(true);
  const [activeRound, setActiveRound] = useState<1 | 2 | 3>(1);
  const standings = calculateStandings(group);

  const roundMatches = group.matches.filter(m => m.round === activeRound);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-green-700 dark:bg-green-800 px-4 py-2 flex items-center justify-between">
        <h3 className="text-white font-bold text-lg">Grupo {group.id}</h3>
        <div className="flex items-center gap-1">
          {group.teams.map(t => (
            <FlagImage key={t.id} code={t.flagCode} name={t.name} />
          ))}
        </div>
      </div>

      {/* Standings */}
      <div className="px-3 pt-2 pb-1">
        <StandingsTable standings={standings} />
      </div>

      {/* Matches toggle */}
      <div className="border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setShowMatches(!showMatches)}
          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span className="font-medium">Partidas</span>
          {showMatches ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showMatches && (
          <div className="pb-3">
            {/* Round tabs */}
            <div className="flex px-4 gap-1 mb-2">
              {([1, 2, 3] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRound(r)}
                  className={`flex-1 text-xs py-1 rounded font-medium transition-colors ${
                    activeRound === r
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Rodada {r}
                </button>
              ))}
            </div>

            <div className="px-4">
              {roundMatches.map(match => (
                <MatchRow
                  key={match.id}
                  match={match}
                  onChange={(matchId, home, away) => onMatchChange(group.id, matchId, home, away)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
