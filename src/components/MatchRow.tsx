'use client';
import { Match } from '@/types';
import { FlagImage } from './FlagImage';
import { MapPin, Tv, Clock } from 'lucide-react';

interface Props {
  match: Match;
  onChange: (matchId: string, homeScore: number | null, awayScore: number | null) => void;
}

export function MatchRow({ match, onChange }: Props) {
  const handleScore = (side: 'home' | 'away', val: string) => {
    const parsed = val === '' ? null : parseInt(val, 10);
    if (parsed !== null && (isNaN(parsed) || parsed < 0)) return;
    const newHome = side === 'home' ? parsed : match.homeScore;
    const newAway = side === 'away' ? parsed : match.awayScore;
    onChange(match.id, newHome, newAway);
  };

  return (
    <div className="py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      {/* Match metadata */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-1.5 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300">
          <Clock size={11} />
          {match.date} · {match.time}
        </span>
        <span className="flex items-center gap-1 truncate">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{match.venue}</span>
        </span>
        <span className="flex items-center gap-1">
          <Tv size={11} />
          {match.broadcast}
        </span>
      </div>

      {/* Score row */}
      <div className="flex items-center gap-2">
        {/* Home team */}
        <span className="flex items-center gap-1.5 flex-1 justify-end text-sm font-medium">
          <span className="hidden sm:inline truncate text-right">{match.homeTeam.name}</span>
          <FlagImage code={match.homeTeam.flagCode} name={match.homeTeam.name} />
        </span>

        {/* Score inputs */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={0}
            max={20}
            value={match.homeScore ?? ''}
            onChange={e => handleScore('home', e.target.value)}
            className="w-10 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="-"
          />
          <span className="text-gray-400 text-xs">×</span>
          <input
            type="number"
            min={0}
            max={20}
            value={match.awayScore ?? ''}
            onChange={e => handleScore('away', e.target.value)}
            className="w-10 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="-"
          />
        </div>

        {/* Away team */}
        <span className="flex items-center gap-1.5 flex-1 text-sm font-medium">
          <FlagImage code={match.awayTeam.flagCode} name={match.awayTeam.name} />
          <span className="hidden sm:inline truncate">{match.awayTeam.name}</span>
        </span>
      </div>
    </div>
  );
}
