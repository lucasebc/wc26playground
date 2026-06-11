'use client';
import { KnockoutMatch, Team } from '@/types';
import { FlagImage } from './FlagImage';

interface Props {
  match: KnockoutMatch;
  onWinner: (matchId: string, winner: Team) => void;
  readOnly?: boolean;
}

function TeamSlot({ team, isWinner, onClick }: { team: Team | null; isWinner: boolean; onClick?: () => void }) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 min-h-[30px] text-gray-400 dark:text-gray-600 text-xs italic">
        <span>A definir</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`w-full flex items-center gap-2 px-2 py-1.5 min-h-[30px] text-xs text-left transition-all
        ${isWinner
          ? 'bg-green-600 dark:bg-green-700 text-white font-bold'
          : onClick
          ? 'hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-gray-200 cursor-pointer'
          : 'text-gray-500 dark:text-gray-400 cursor-default'
        }`}
    >
      <FlagImage code={team.flagCode} name={team.name} />
      <span className="truncate font-medium">{team.name}</span>
    </button>
  );
}

export function BracketMatch({ match, onWinner, readOnly = false }: Props) {
  const canSelect = !readOnly && match.teamA && match.teamB;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded overflow-hidden shadow-sm min-w-[172px]">
      <TeamSlot
        team={match.teamA}
        isWinner={match.winner?.id === match.teamA?.id}
        onClick={canSelect && match.teamA ? () => onWinner(match.id, match.teamA!) : undefined}
      />
      <div className="border-t border-gray-200 dark:border-gray-700" />
      <TeamSlot
        team={match.teamB}
        isWinner={match.winner?.id === match.teamB?.id}
        onClick={canSelect && match.teamB ? () => onWinner(match.id, match.teamB!) : undefined}
      />
    </div>
  );
}
