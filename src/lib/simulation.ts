import { Group, KnockoutMatch, Team, TeamStanding } from '@/types';

export function calculateStandings(group: Group): TeamStanding[] {
  const standings: Record<string, TeamStanding> = {};

  group.teams.forEach(team => {
    standings[team.id] = {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    };
  });

  group.matches.forEach(match => {
    if (!match.played || match.homeScore === null || match.awayScore === null) return;

    const home = standings[match.homeTeam.id];
    const away = standings[match.awayTeam.id];

    home.played++;
    away.played++;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.won++; home.points += 3;
      away.lost++;
    } else if (match.homeScore < match.awayScore) {
      away.won++; away.points += 3;
      home.lost++;
    } else {
      home.drawn++; home.points++;
      away.drawn++; away.points++;
    }
  });

  return Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
}

export function isGroupComplete(group: Group): boolean {
  return group.matches.every(m => m.played);
}

export function areAllGroupsComplete(groups: Group[]): boolean {
  return groups.every(isGroupComplete);
}

export function getBestThirdPlace(groups: Group[]): Team[] {
  const thirdPlaceTeams: TeamStanding[] = groups.map(g => {
    const standings = calculateStandings(g);
    return standings[2];
  });

  return thirdPlaceTeams
    .filter(Boolean)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.goalsFor - a.goalsAgainst;
      const gdB = b.goalsFor - b.goalsAgainst;
      if (gdB !== gdA) return gdB - gdA;
      return b.goalsFor - a.goalsFor;
    })
    .slice(0, 8)
    .map(s => s.team);
}

export function createKnockoutBracket(groups: Group[]): KnockoutMatch[] {
  const allAdvancing: Team[] = [];

  groups.forEach(g => {
    const standings = calculateStandings(g);
    allAdvancing.push(standings[0].team, standings[1].team);
  });

  const best8Third = getBestThirdPlace(groups);
  allAdvancing.push(...best8Third);

  const r32Matches: KnockoutMatch[] = [];
  for (let i = 0; i < 16; i++) {
    r32Matches.push({
      id: `R32-${i + 1}`,
      round: 'R32',
      position: i,
      teamA: allAdvancing[i * 2] || null,
      teamB: allAdvancing[i * 2 + 1] || null,
      winner: null,
    });
  }

  const r16Matches: KnockoutMatch[] = Array.from({ length: 8 }, (_, i) => ({
    id: `R16-${i + 1}`,
    round: 'R16' as const,
    position: i,
    teamA: null,
    teamB: null,
    winner: null,
  }));

  const qfMatches: KnockoutMatch[] = Array.from({ length: 4 }, (_, i) => ({
    id: `QF-${i + 1}`,
    round: 'QF' as const,
    position: i,
    teamA: null,
    teamB: null,
    winner: null,
  }));

  const sfMatches: KnockoutMatch[] = Array.from({ length: 2 }, (_, i) => ({
    id: `SF-${i + 1}`,
    round: 'SF' as const,
    position: i,
    teamA: null,
    teamB: null,
    winner: null,
  }));

  const final: KnockoutMatch = {
    id: 'F-1',
    round: 'F',
    position: 0,
    teamA: null,
    teamB: null,
    winner: null,
  };

  return [...r32Matches, ...r16Matches, ...qfMatches, ...sfMatches, final];
}

export function advanceWinner(
  matches: KnockoutMatch[],
  matchId: string,
  winner: Team
): KnockoutMatch[] {
  const updated = matches.map(m =>
    m.id === matchId ? { ...m, winner } : m
  );

  const matchIndex = matches.findIndex(m => m.id === matchId);
  const match = updated[matchIndex];

  const roundOrder: Array<KnockoutMatch['round']> = ['R32', 'R16', 'QF', 'SF', 'F'];
  const currentRoundIndex = roundOrder.indexOf(match.round);

  if (currentRoundIndex < roundOrder.length - 1) {
    const nextRound = roundOrder[currentRoundIndex + 1];
    const nextMatchPosition = Math.floor(match.position / 2);
    const slot = match.position % 2 === 0 ? 'teamA' : 'teamB';

    const nextMatchIndex = updated.findIndex(
      m => m.round === nextRound && m.position === nextMatchPosition
    );

    if (nextMatchIndex !== -1) {
      updated[nextMatchIndex] = {
        ...updated[nextMatchIndex],
        [slot]: winner,
      };
    }
  }

  return updated;
}
