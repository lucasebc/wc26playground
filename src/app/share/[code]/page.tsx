import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import { SimulationModel } from '@/models/Simulation';
import { KnockoutBracket } from '@/components/KnockoutBracket';
import { StandingsTable } from '@/components/StandingsTable';
import { FlagImage } from '@/components/FlagImage';
import { calculateStandings } from '@/lib/simulation';
import { SimulationData } from '@/types';
import { Trophy } from 'lucide-react';

interface Props {
  params: { code: string };
}

async function getSimulation(code: string): Promise<SimulationData | null> {
  try {
    await connectToDatabase();
    const sim = await SimulationModel.findOne({ shareCode: code });
    return sim?.data || null;
  } catch {
    return null;
  }
}

export default async function SharePage({ params }: Props) {
  const simulation = await getSimulation(params.code);
  if (!simulation) notFound();

  const champion = simulation.knockout.find((m) => m.round === 'F')?.winner;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Trophy className="text-yellow-500" size={32} />
          Simulação Copa 2026
        </h1>
        {champion && (
          <div className="text-xl flex items-center justify-center gap-2">
            🏆 Campeão:
            <FlagImage code={champion.flagCode} name={champion.name} size="md" />
            <strong>{champion.name}</strong>
          </div>
        )}
      </div>

      {/* Groups summary */}
      {simulation.groups.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Fase de Grupos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {simulation.groups.map(group => (
              <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-green-700 dark:bg-green-800 px-4 py-2">
                  <h3 className="text-white font-bold">Grupo {group.id}</h3>
                </div>
                <div className="px-3 py-2">
                  <StandingsTable standings={calculateStandings(group)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knockout */}
      {simulation.knockout.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Mata-mata</h2>
          <KnockoutBracket
            matches={simulation.knockout}
            onWinner={() => {}}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
