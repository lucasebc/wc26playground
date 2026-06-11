export interface Team {
  id: string;
  name: string;
  flagCode: string; // ISO alpha-2 lowercase, e.g. 'br', 'ar'; subdivisions like 'gb-eng' ok
  confederation: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  played: boolean;
  round: 1 | 2 | 3;    // matchday
  date: string;          // e.g. "13 jun"
  time: string;          // Brazil time, e.g. "19h00"
  venue: string;         // e.g. "MetLife Stadium, East Rutherford"
  broadcast: string;     // e.g. "Globo / SporTV"
}

export interface Group {
  id: string; // A through L
  teams: Team[];
  matches: Match[];
}

export interface TeamStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface KnockoutMatch {
  id: string;
  round: 'R32' | 'R16' | 'QF' | 'SF' | 'F';
  position: number;
  teamA: Team | null;
  teamB: Team | null;
  winner: Team | null;
}

export interface SimulationData {
  groups: Group[];
  knockout: KnockoutMatch[];
  groupsComplete: boolean;
  shareCode?: string;
}
