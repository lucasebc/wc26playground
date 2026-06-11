'use client';

import { KnockoutMatch, Team } from '@/types';
import { FlagImage } from './FlagImage';

interface Props {
  matches: KnockoutMatch[];
  onWinner: (matchId: string, winner: Team) => void;
  readOnly?: boolean;
}

// ─── MatchCard ───────────────────────────────────────────────────────────────

function TeamBtn({
  team,
  isWinner,
  onClick,
}: {
  team: Team | null;
  isWinner: boolean;
  onClick?: () => void;
}) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 min-h-[28px] text-gray-400 dark:text-gray-500 text-xs italic">
        A definir
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`w-full flex items-center gap-1.5 px-2 py-1.5 min-h-[28px] text-xs text-left transition-colors
        ${isWinner
          ? 'bg-green-600 text-white font-bold'
          : onClick
          ? 'hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-gray-200 cursor-pointer'
          : 'text-gray-600 dark:text-gray-400 cursor-default'
        }`}
    >
      <FlagImage code={team.flagCode} name={team.name} />
      <span className="truncate font-medium leading-tight">{team.name}</span>
    </button>
  );
}

function MatchCard({
  match,
  onWinner,
  readOnly,
}: {
  match: KnockoutMatch;
  onWinner: (id: string, w: Team) => void;
  readOnly: boolean;
}) {
  const canSelect = !readOnly && match.teamA && match.teamB;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded overflow-hidden w-44">
      <TeamBtn
        team={match.teamA}
        isWinner={match.winner?.id === match.teamA?.id}
        onClick={canSelect && match.teamA ? () => onWinner(match.id, match.teamA!) : undefined}
      />
      <div className="h-px bg-gray-200 dark:bg-gray-700" />
      <TeamBtn
        team={match.teamB}
        isWinner={match.winner?.id === match.teamB?.id}
        onClick={canSelect && match.teamB ? () => onWinner(match.id, match.teamB!) : undefined}
      />
    </div>
  );
}

// ─── Connector lines ─────────────────────────────────────────────────────────

const LINE = '#6b7280';
const CARD_H = 60; // px — approximate rendered height of a MatchCard
const GAP_SM = 6;  // gap between cards within a pair

// Height of a "pair block" = 2 cards + gap between them
const PAIR_H = CARD_H * 2 + GAP_SM;

// Connector for left side: two arms from top/bottom of a pair, meeting in the middle
function ConnectorLeft({ pairCount, pairGap }: { pairCount: number; pairGap: number }) {
  const armH = PAIR_H / 2;
  return (
    <div className="flex flex-col" style={{ paddingTop: CARD_H / 2 }}>
      {Array.from({ length: pairCount }).map((_, i) => (
        <div
          key={i}
          className="flex items-center"
          style={{ marginTop: i > 0 ? pairGap : 0 }}
        >
          {/* Bracket arms */}
          <div className="flex flex-col">
            <div style={{ height: armH, width: 14, borderRight: `2px solid ${LINE}`, borderBottom: `2px solid ${LINE}`, borderBottomRightRadius: 4 }} />
            <div style={{ height: armH, width: 14, borderRight: `2px solid ${LINE}`, borderTop: `2px solid ${LINE}`, borderTopRightRadius: 4 }} />
          </div>
          {/* Horizontal to next column */}
          <div style={{ width: 14, height: 2, backgroundColor: LINE }} />
        </div>
      ))}
    </div>
  );
}

// Connector for right side (mirrored)
function ConnectorRight({ pairCount, pairGap }: { pairCount: number; pairGap: number }) {
  const armH = PAIR_H / 2;
  return (
    <div className="flex flex-col" style={{ paddingTop: CARD_H / 2 }}>
      {Array.from({ length: pairCount }).map((_, i) => (
        <div
          key={i}
          className="flex items-center"
          style={{ marginTop: i > 0 ? pairGap : 0 }}
        >
          <div style={{ width: 14, height: 2, backgroundColor: LINE }} />
          <div className="flex flex-col">
            <div style={{ height: armH, width: 14, borderLeft: `2px solid ${LINE}`, borderBottom: `2px solid ${LINE}`, borderBottomLeftRadius: 4 }} />
            <div style={{ height: armH, width: 14, borderLeft: `2px solid ${LINE}`, borderTop: `2px solid ${LINE}`, borderTopLeftRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Column label ─────────────────────────────────────────────────────────────

function ColLabel({ label, isFinal = false }: { label: string; isFinal?: boolean }) {
  return (
    <div
      className={`text-center text-xs font-bold mb-3 px-2 py-1 rounded whitespace-nowrap w-44 ${
        isFinal
          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}
    >
      {label}
    </div>
  );
}

// ─── Column of matches ────────────────────────────────────────────────────────

function MatchCol({
  label,
  matches,
  pairsCount,
  pairGap,
  paddingTop,
  onWinner,
  readOnly,
}: {
  label: string;
  matches: KnockoutMatch[];
  pairsCount: number;
  pairGap: number;
  paddingTop: number;
  onWinner: (id: string, w: Team) => void;
  readOnly: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <ColLabel label={label} />
      <div className="flex flex-col" style={{ paddingTop, gap: GAP_SM }}>
        {/* Render matches grouped in visual pairs with bigger gap between pairs */}
        {Array.from({ length: pairsCount }).map((_, pairIdx) => (
          <div
            key={pairIdx}
            className="flex flex-col"
            style={{ marginTop: pairIdx > 0 ? pairGap : 0 }}
          >
            {matches.slice(pairIdx * 2, pairIdx * 2 + 2).map(m => (
              <div key={m.id} style={{ marginTop: pairIdx > 0 || m === matches[pairIdx * 2] ? 0 : GAP_SM }}>
                <MatchCard match={m} onWinner={onWinner} readOnly={readOnly} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function KnockoutBracket({ matches, onWinner, readOnly = false }: Props) {
  const get = (round: KnockoutMatch['round'], positions: number[]) =>
    positions.map(p => matches.find(m => m.round === round && m.position === p)).filter(Boolean) as KnockoutMatch[];

  // Left half: lower positions
  const lR32 = get('R32', [0, 1, 2, 3, 4, 5, 6, 7]);
  const lR16 = get('R16', [0, 1, 2, 3]);
  const lQF  = get('QF',  [0, 1]);
  const lSF  = get('SF',  [0]);

  // Right half: higher positions (reversed so they mirror left)
  const rR32 = get('R32', [15, 14, 13, 12, 11, 10, 9, 8]);
  const rR16 = get('R16', [7, 6, 5, 4]);
  const rQF  = get('QF',  [3, 2]);
  const rSF  = get('SF',  [1]);

  const final    = matches.find(m => m.round === 'F');
  const champion = final?.winner;

  // Vertical padding-top for each column to visually center matches:
  // R32: 0, R16: CARD_H/2 + GAP_SM/2, QF: ...
  // Each step: half of (CARD_H + pairGap of previous)
  const PT_R32 = 0;
  const GAP_R32 = PAIR_H + 10;   // gap between R32 pairs (4 pairs)
  const PT_R16 = (PAIR_H + GAP_R32) / 2 - PAIR_H / 2;  // approx centering
  const GAP_R16 = GAP_R32 * 2 + PAIR_H;
  const PT_QF  = PT_R16 + (PAIR_H + GAP_R16) / 2 - PAIR_H / 2;
  const GAP_QF = 0;
  const PT_SF  = PT_QF + (PAIR_H + GAP_QF + CARD_H) / 2 - CARD_H / 2 + 20;
  const PT_FINAL = PT_SF + CARD_H / 2 - CARD_H / 2;

  return (
    <div className="overflow-x-auto pb-6">
      <div className="min-w-max">
        <h3 className="text-center text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          🏆 Mata-mata Copa 2026
        </h3>

        <div className="flex items-start">
          {/* ── LEFT HALF ── */}
          <div className="flex items-start">
            {/* R32 left */}
            <MatchCol
              label="Rodada de 32"
              matches={lR32}
              pairsCount={4}
              pairGap={10}
              paddingTop={PT_R32}
              onWinner={onWinner}
              readOnly={readOnly}
            />

            <ConnectorLeft pairCount={4} pairGap={GAP_R32} />

            {/* R16 left */}
            <MatchCol
              label="Oitavas"
              matches={lR16}
              pairsCount={2}
              pairGap={GAP_R16 - PAIR_H}
              paddingTop={PT_R16}
              onWinner={onWinner}
              readOnly={readOnly}
            />

            <ConnectorLeft pairCount={2} pairGap={GAP_R16} />

            {/* QF left */}
            <MatchCol
              label="Quartas"
              matches={lQF}
              pairsCount={1}
              pairGap={0}
              paddingTop={PT_QF}
              onWinner={onWinner}
              readOnly={readOnly}
            />

            <ConnectorLeft pairCount={1} pairGap={0} />

            {/* SF left */}
            <div className="flex flex-col items-center">
              <ColLabel label="Semifinal" />
              <div style={{ paddingTop: PT_SF }}>
                {lSF[0] && <MatchCard match={lSF[0]} onWinner={onWinner} readOnly={readOnly} />}
              </div>
            </div>

            {/* Connector SF → Final */}
            <div style={{ paddingTop: PT_SF + CARD_H / 2 - 1, display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 2, backgroundColor: LINE, marginTop: 0 }} />
            </div>
          </div>

          {/* ── FINAL (center) ── */}
          <div className="flex flex-col items-center" style={{ paddingTop: PT_FINAL }}>
            <ColLabel label="🏆 Final" isFinal />
            {final && <MatchCard match={final} onWinner={onWinner} readOnly={readOnly} />}
            {champion && (
              <div className="mt-4 text-center">
                <div className="text-3xl mb-1">🏆</div>
                <div className="flex justify-center mb-1">
                  <FlagImage code={champion.flagCode} name={champion.name} size="md" />
                </div>
                <div className="font-bold text-sm text-green-700 dark:text-green-400">{champion.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">Campeão</div>
              </div>
            )}
          </div>

          {/* ── RIGHT HALF (mirrored) ── */}
          <div className="flex items-start" style={{ flexDirection: 'row-reverse' }}>
            {/* R32 right */}
            <MatchCol
              label="Rodada de 32"
              matches={rR32}
              pairsCount={4}
              pairGap={10}
              paddingTop={PT_R32}
              onWinner={onWinner}
              readOnly={readOnly}
            />

            <ConnectorRight pairCount={4} pairGap={GAP_R32} />

            {/* R16 right */}
            <MatchCol
              label="Oitavas"
              matches={rR16}
              pairsCount={2}
              pairGap={GAP_R16 - PAIR_H}
              paddingTop={PT_R16}
              onWinner={onWinner}
              readOnly={readOnly}
            />

            <ConnectorRight pairCount={2} pairGap={GAP_R16} />

            {/* QF right */}
            <MatchCol
              label="Quartas"
              matches={rQF}
              pairsCount={1}
              pairGap={0}
              paddingTop={PT_QF}
              onWinner={onWinner}
              readOnly={readOnly}
            />

            <ConnectorRight pairCount={1} pairGap={0} />

            {/* SF right */}
            <div className="flex flex-col items-center">
              <ColLabel label="Semifinal" />
              <div style={{ paddingTop: PT_SF }}>
                {rSF[0] && <MatchCard match={rSF[0]} onWinner={onWinner} readOnly={readOnly} />}
              </div>
            </div>

            {/* Connector SF → Final (right side) */}
            <div style={{ paddingTop: PT_SF + CARD_H / 2 - 1, display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 2, backgroundColor: LINE, marginTop: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
