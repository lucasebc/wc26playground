"use client";

import { KnockoutMatch, Team } from "@/types";
import { FlagImage } from "./FlagImage";

// â”€â”€â”€ Layout constants (all in px) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MH: exact height of one match card (set via inline style so it's always correct)
const MH = 72;
// BASE: vertical space allocated per R32 slot = MH + gap between consecutive cards
const BASE = 88;
// CONN: width of each SVG connector column
const CONN = 28;
// CARD_W: width of each match card
const CARD_W = 182;
// Total bracket height covering 8 BASE slots
const BH = 8 * BASE; // 704 px

// â”€â”€â”€ Position helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// paddingTop for round r (0 = R32, 1 = R16, 2 = QF, 3 = SF)
const pt = (r: number) => (BASE * (Math.pow(2, r) - 1)) / 2;
// gap (flex gap) between consecutive cards in round r
const gap = (r: number) => BASE * Math.pow(2, r) - MH;
// y-center of the i-th match in round r
const cy = (r: number, i: number) => pt(r) + i * BASE * Math.pow(2, r) + MH / 2;

// â”€â”€â”€ TeamBtn â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TeamBtn({ team, isWinner, onClick }: { team: Team | null; isWinner: boolean; onClick?: () => void }) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-3 py-2.5 text-gray-400 dark:text-gray-600 text-xs italic">
        A definir
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs text-left transition-colors
        ${
          isWinner
            ? "bg-green-600 text-white font-bold"
            : onClick
            ? "hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-gray-200 cursor-pointer"
            : "text-gray-600 dark:text-gray-400 cursor-default"
        }`}
    >
      <FlagImage code={team.flagCode} name={team.name} />
      <span className="truncate font-medium">{team.name}</span>
    </button>
  );
}

// â”€â”€â”€ MatchCard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MatchCard({
  match,
  onWinner,
  readOnly,
}: {
  match: KnockoutMatch;
  onWinner: (id: string, w: Team) => void;
  readOnly: boolean;
}) {
  const can = !readOnly && !!match.teamA && !!match.teamB;
  return (
    <div
      style={{ width: CARD_W, height: MH, flexShrink: 0 }}
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden flex flex-col"
    >
      <div className="flex-1">
        <TeamBtn
          team={match.teamA}
          isWinner={match.winner?.id === match.teamA?.id}
          onClick={can ? () => onWinner(match.id, match.teamA!) : undefined}
        />
      </div>
      <div className="h-px bg-gray-200 dark:bg-gray-600" />
      <div className="flex-1">
        <TeamBtn
          team={match.teamB}
          isWinner={match.winner?.id === match.teamB?.id}
          onClick={can ? () => onWinner(match.id, match.teamB!) : undefined}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ SVG Connector â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// fromRound r: pairs are from round r (outer), output goes to round r+1 (inner)
// side 'left': outer is on the LEFT, inner on the RIGHT (stubs from left â†’ right)
// side 'right': outer is on the RIGHT, inner on the LEFT (stubs from right â†’ left)
function Connector({ fromRound: r, nPairs, side }: { fromRound: number; nPairs: number; side: "left" | "right" }) {
  const stroke = "currentColor";
  const paths: string[] = [];
  const mid = CONN / 2;

  for (let i = 0; i < nPairs; i++) {
    const y1 = cy(r, 2 * i);
    const y2 = cy(r, 2 * i + 1);
    const ym = (y1 + y2) / 2;

    if (side === "left") {
      // Stubs come from x=0 (left, outer round), output goes to x=CONN (right, inner round)
      paths.push(`M 0 ${y1} H ${mid}`);
      paths.push(`M ${mid} ${y1} V ${y2}`);
      paths.push(`M 0 ${y2} H ${mid}`);
      paths.push(`M ${mid} ${ym} H ${CONN}`);
    } else {
      // Stubs come from x=CONN (right, outer round), output goes to x=0 (left, inner round)
      paths.push(`M ${CONN} ${y1} H ${mid}`);
      paths.push(`M ${mid} ${y1} V ${y2}`);
      paths.push(`M ${CONN} ${y2} H ${mid}`);
      paths.push(`M ${mid} ${ym} H 0`);
    }
  }

  return (
    <svg
      width={CONN}
      height={BH + MH}
      className="flex-shrink-0 text-gray-400 dark:text-gray-500"
      style={{ overflow: "visible" }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth={2} fill="none" />
      ))}
    </svg>
  );
}

// Horizontal stub connecting SF to Final (just a flat line at the SF match center)
function HStub({ side }: { side: "left" | "right" }) {
  const y = cy(3, 0);
  const d = side === "left" ? `M 0 ${y} H ${CONN}` : `M ${CONN} ${y} H 0`;
  return (
    <svg
      width={CONN}
      height={BH + MH}
      className="flex-shrink-0 text-gray-400 dark:text-gray-500"
      style={{ overflow: "visible" }}
    >
      <path d={d} stroke="currentColor" strokeWidth={2} fill="none" />
    </svg>
  );
}

// â”€â”€â”€ RoundColumn â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function RoundCol({
  label,
  matches,
  roundIdx,
  onWinner,
  readOnly,
  isFinal = false,
}: {
  label: string;
  matches: KnockoutMatch[];
  roundIdx: number;
  onWinner: (id: string, w: Team) => void;
  readOnly: boolean;
  isFinal?: boolean;
}) {
  return (
    <div className="flex flex-col flex-shrink-0" style={{ width: CARD_W }}>
      <div
        className={`text-center text-xs font-bold mb-3 py-1.5 px-2 rounded whitespace-nowrap ${
          isFinal
            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        }`}
      >
        {label}
      </div>
      <div className="flex flex-col" style={{ paddingTop: pt(roundIdx), gap: gap(roundIdx) }}>
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} onWinner={onWinner} readOnly={readOnly} />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Props {
  matches: KnockoutMatch[];
  onWinner: (matchId: string, winner: Team) => void;
  readOnly?: boolean;
}

export function KnockoutBracket({ matches, onWinner, readOnly = false }: Props) {
  const get = (round: KnockoutMatch["round"], positions: number[]) =>
    positions.map((p) => matches.find((m) => m.round === round && m.position === p)).filter(Boolean) as KnockoutMatch[];

  // Left half (positions 0â€“7 in R32, progressing inward)
  const lR32 = get("R32", [0, 1, 2, 3, 4, 5, 6, 7]);
  const lR16 = get("R16", [0, 1, 2, 3]);
  const lQF = get("QF", [0, 1]);
  const lSF = get("SF", [0]);

  // Right half (positions 8â€“15 in R32, reversed so they mirror left visually)
  const rR32 = get("R32", [15, 14, 13, 12, 11, 10, 9, 8]);
  const rR16 = get("R16", [7, 6, 5, 4]);
  const rQF = get("QF", [3, 2]);
  const rSF = get("SF", [1]);

  const final = matches.find((m) => m.round === "F");
  const champion = final?.winner;

  return (
    <div className="overflow-x-auto pb-6">
      <div className="inline-block">
        <h3 className="text-center text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">
          ðŸ† Mata-mata â€” Copa do Mundo 2026
        </h3>

        <div className="flex items-start">
          {/* â”€â”€ LEFT HALF â”€â”€ */}
          <RoundCol label="Rodada de 32" matches={lR32} roundIdx={0} onWinner={onWinner} readOnly={readOnly} />
          <Connector fromRound={0} nPairs={4} side="left" />
          <RoundCol label="Oitavas de Final" matches={lR16} roundIdx={1} onWinner={onWinner} readOnly={readOnly} />
          <Connector fromRound={1} nPairs={2} side="left" />
          <RoundCol label="Quartas de Final" matches={lQF} roundIdx={2} onWinner={onWinner} readOnly={readOnly} />
          <Connector fromRound={2} nPairs={1} side="left" />
          <RoundCol label="Semifinal" matches={lSF} roundIdx={3} onWinner={onWinner} readOnly={readOnly} />
          <HStub side="left" />

          {/* â”€â”€ FINAL (center) â”€â”€ */}
          <div className="flex flex-col flex-shrink-0" style={{ width: CARD_W }}>
            <div className="text-center text-xs font-bold mb-3 py-1.5 px-2 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
              ðŸ† Final
            </div>
            <div style={{ paddingTop: pt(3) }}>
              {final && <MatchCard match={final} onWinner={onWinner} readOnly={readOnly} />}
              {champion && (
                <div className="mt-5 text-center">
                  <div className="text-4xl mb-2">ðŸ†</div>
                  <div className="flex justify-center mb-1">
                    <FlagImage code={champion.flagCode} name={champion.name} size="md" />
                  </div>
                  <div className="font-bold text-base text-green-700 dark:text-green-400">{champion.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">CampeÃ£o Mundial 2026</div>
                </div>
              )}
            </div>
          </div>

          {/* â”€â”€ RIGHT HALF (layout is rightâ†’left: SF | QF | R16 | R32) â”€â”€ */}
          <HStub side="right" />
          <RoundCol label="Semifinal" matches={rSF} roundIdx={3} onWinner={onWinner} readOnly={readOnly} />
          <Connector fromRound={2} nPairs={1} side="right" />
          <RoundCol label="Quartas de Final" matches={rQF} roundIdx={2} onWinner={onWinner} readOnly={readOnly} />
          <Connector fromRound={1} nPairs={2} side="right" />
          <RoundCol label="Oitavas de Final" matches={rR16} roundIdx={1} onWinner={onWinner} readOnly={readOnly} />
          <Connector fromRound={0} nPairs={4} side="right" />
          <RoundCol label="Rodada de 32" matches={rR32} roundIdx={0} onWinner={onWinner} readOnly={readOnly} />
        </div>
      </div>
    </div>
  );
}

