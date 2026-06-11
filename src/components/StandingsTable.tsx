import { TeamStanding } from '@/types';
import { FlagImage } from './FlagImage';

interface Props {
  standings: TeamStanding[];
  qualifiedCount?: number;
}

export function StandingsTable({ standings, qualifiedCount = 2 }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase">
            <th className="text-left py-1 pl-1 w-8">#</th>
            <th className="text-left py-1">Seleção</th>
            <th className="text-center py-1 w-8">J</th>
            <th className="text-center py-1 w-8">V</th>
            <th className="text-center py-1 w-8">E</th>
            <th className="text-center py-1 w-8">D</th>
            <th className="text-center py-1 w-8">GP</th>
            <th className="text-center py-1 w-8">GC</th>
            <th className="text-center py-1 w-8">SG</th>
            <th className="text-center py-1 w-8 font-bold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => {
            const isQualified = i < qualifiedCount;
            const isThird = i === 2;
            return (
              <tr
                key={s.team.id}
                className={`border-t border-gray-100 dark:border-gray-700 ${
                  isQualified ? 'bg-green-50 dark:bg-green-900/20' :
                  isThird ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                }`}
              >
                <td className="py-1.5 pl-1 text-gray-500 dark:text-gray-400">{i + 1}</td>
                <td className="py-1.5">
                  <span className="flex items-center gap-1.5">
                    <FlagImage code={s.team.flagCode} name={s.team.name} />
                    <span className="font-medium">{s.team.name}</span>
                  </span>
                </td>
                <td className="text-center py-1.5">{s.played}</td>
                <td className="text-center py-1.5">{s.won}</td>
                <td className="text-center py-1.5">{s.drawn}</td>
                <td className="text-center py-1.5">{s.lost}</td>
                <td className="text-center py-1.5">{s.goalsFor}</td>
                <td className="text-center py-1.5">{s.goalsAgainst}</td>
                <td className="text-center py-1.5">{s.goalsFor - s.goalsAgainst}</td>
                <td className="text-center py-1.5 font-bold">{s.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
