import { Group, Match, Team } from '@/types';
import { TEAMS } from './teams';

function t(id: string): Team {
  const team = TEAMS.find(x => x.id === id);
  if (!team) throw new Error(`Team not found: ${id}`);
  return team;
}

function m(
  groupId: string,
  home: Team,
  away: Team,
  round: 1 | 2 | 3,
  date: string,
  time: string,
  venue: string,
  broadcast: string,
): Match {
  return {
    id: `${groupId}-${home.id}-${away.id}`,
    homeTeam: home,
    awayTeam: away,
    homeScore: null,
    awayScore: null,
    played: false,
    round,
    date,
    time,
    venue,
    broadcast,
  };
}

// Helper: Brazil (BRT = UTC-3) conversion notes
// EDT (UTC-4) → BRT: local + 1h   CDT (UTC-5) → BRT: local + 2h
// MDT (UTC-6) → BRT: local + 3h   PDT (UTC-7) → BRT: local + 4h

export function createInitialGroups(): Group[] {
  // ── GROUP A ──────────────────────────────────────────────────────────────
  // Mexico (co-host) · South Africa · South Korea · Czech Republic
  const mex = t('mex'), rsa = t('rsa'), kor = t('kor'), cze = t('cze');
  const groupA: Group = {
    id: 'A',
    teams: [mex, rsa, kor, cze],
    matches: [
      m('A', mex, rsa, 1, '11 jun', '20h00', 'Estádio Azteca, Cidade do México', 'SporTV / CazéTV'),
      m('A', kor, cze, 1, '11 jun', '23h00', 'Estádio Akron, Guadalajara',        'SporTV / CazéTV'),
      m('A', mex, kor, 2, '15 jun', '19h00', 'Estádio BBVA, Monterrey',           'SporTV / CazéTV'),
      m('A', rsa, cze, 2, '15 jun', '22h00', 'Estádio Azteca, Cidade do México',  'SporTV / CazéTV'),
      m('A', mex, cze, 3, '19 jun', '22h00', 'Estádio Akron, Guadalajara',        'SporTV / CazéTV'),
      m('A', rsa, kor, 3, '19 jun', '22h00', 'Estádio BBVA, Monterrey',           'SporTV / CazéTV'),
    ],
  };

  // ── GROUP B ──────────────────────────────────────────────────────────────
  // Canada (co-host) · Bosnia-Herzegovina · Qatar · Switzerland
  const can = t('can'), bih = t('bih'), qat = t('qat'), sui = t('sui');
  const groupB: Group = {
    id: 'B',
    teams: [can, bih, qat, sui],
    matches: [
      m('B', can, bih, 1, '12 jun', '19h00', 'BMO Field, Toronto',              'SporTV / CazéTV'),
      m('B', qat, sui, 1, '12 jun', '22h00', 'MetLife Stadium, East Rutherford', 'SporTV / CazéTV'),
      m('B', can, qat, 2, '16 jun', '19h00', 'BMO Field, Toronto',              'SporTV / CazéTV'),
      m('B', bih, sui, 2, '16 jun', '22h00', 'MetLife Stadium, East Rutherford', 'SporTV / CazéTV'),
      m('B', can, sui, 3, '20 jun', '22h00', 'BC Place, Vancouver',             'SporTV / CazéTV'),
      m('B', bih, qat, 3, '20 jun', '22h00', 'Gillette Stadium, Boston',        'SporTV / CazéTV'),
    ],
  };

  // ── GROUP C ──────────────────────────────────────────────────────────────
  // Brazil · Morocco · Haiti · Scotland
  const bra = t('bra'), mar = t('mar'), hai = t('hai'), sco = t('sco');
  const groupC: Group = {
    id: 'C',
    teams: [bra, mar, hai, sco],
    matches: [
      m('C', bra, mar, 1, '13 jun', '19h00', 'MetLife Stadium, East Rutherford',       'Globo / SporTV'),
      m('C', hai, sco, 1, '13 jun', '22h00', 'Hard Rock Stadium, Miami',               'SporTV / CazéTV'),
      m('C', bra, hai, 2, '17 jun', '16h00', 'Mercedes-Benz Stadium, Atlanta',         'Globo / SporTV'),
      m('C', mar, sco, 2, '17 jun', '19h00', 'Lincoln Financial Field, Filadélfia',    'SporTV / CazéTV'),
      m('C', bra, sco, 3, '21 jun', '22h00', 'MetLife Stadium, East Rutherford',       'Globo / SporTV'),
      m('C', mar, hai, 3, '21 jun', '22h00', 'Hard Rock Stadium, Miami',               'SporTV / CazéTV'),
    ],
  };

  // ── GROUP D ──────────────────────────────────────────────────────────────
  // USA (co-host) · Paraguay · Australia · Turkey
  const usa = t('usa'), par = t('par'), aus = t('aus'), tur = t('tur');
  const groupD: Group = {
    id: 'D',
    teams: [usa, par, aus, tur],
    matches: [
      m('D', usa, par, 1, '12 jun', '22h00', 'AT&T Stadium, Arlington',          'SporTV / CazéTV'),
      m('D', aus, tur, 1, '12 jun', '19h00', 'Arrowhead Stadium, Kansas City',   'SporTV / CazéTV'),
      m('D', usa, aus, 2, '16 jun', '22h00', 'SoFi Stadium, Los Angeles',        'SporTV / CazéTV'),
      m('D', par, tur, 2, '16 jun', '19h00', 'AT&T Stadium, Arlington',          'SporTV / CazéTV'),
      m('D', usa, tur, 3, '21 jun', '22h00', 'Arrowhead Stadium, Kansas City',   'SporTV / CazéTV'),
      m('D', par, aus, 3, '21 jun', '22h00', 'SoFi Stadium, Los Angeles',        'SporTV / CazéTV'),
    ],
  };

  // ── GROUP E ──────────────────────────────────────────────────────────────
  // Germany · Curaçao · Ivory Coast · Ecuador
  const ger = t('ger'), cur = t('cur'), civ = t('civ'), ecu = t('ecu');
  const groupE: Group = {
    id: 'E',
    teams: [ger, cur, civ, ecu],
    matches: [
      m('E', ger, cur, 1, '14 jun', '19h00', 'Mercedes-Benz Stadium, Atlanta',  'SporTV / CazéTV'),
      m('E', civ, ecu, 1, '14 jun', '22h00', 'Rose Bowl, Pasadena',             'SporTV / CazéTV'),
      m('E', ger, civ, 2, '18 jun', '19h00', 'AT&T Stadium, Arlington',         'SporTV / CazéTV'),
      m('E', cur, ecu, 2, '18 jun', '22h00', 'Mercedes-Benz Stadium, Atlanta',  'SporTV / CazéTV'),
      m('E', ger, ecu, 3, '22 jun', '22h00', 'Rose Bowl, Pasadena',             'SporTV / CazéTV'),
      m('E', cur, civ, 3, '22 jun', '22h00', 'AT&T Stadium, Arlington',         'SporTV / CazéTV'),
    ],
  };

  // ── GROUP F ──────────────────────────────────────────────────────────────
  // Netherlands · Japan · Sweden · Tunisia
  const ned = t('ned'), jpn = t('jpn'), swe = t('swe'), tun = t('tun');
  const groupF: Group = {
    id: 'F',
    teams: [ned, jpn, swe, tun],
    matches: [
      m('F', ned, jpn, 1, '14 jun', '16h00', 'Lumen Field, Seattle',        'SporTV / CazéTV'),
      m('F', swe, tun, 1, '14 jun', '19h00', 'Levi\'s Stadium, Santa Clara', 'SporTV / CazéTV'),
      m('F', ned, swe, 2, '18 jun', '16h00', 'BC Place, Vancouver',          'SporTV / CazéTV'),
      m('F', jpn, tun, 2, '18 jun', '19h00', 'Lumen Field, Seattle',         'SporTV / CazéTV'),
      m('F', ned, tun, 3, '22 jun', '22h00', 'Levi\'s Stadium, Santa Clara', 'SporTV / CazéTV'),
      m('F', jpn, swe, 3, '22 jun', '22h00', 'BC Place, Vancouver',          'SporTV / CazéTV'),
    ],
  };

  // ── GROUP G ──────────────────────────────────────────────────────────────
  // Belgium · Egypt · Iran · New Zealand
  // All matches at SoFi (LA), Lumen Field (Seattle) and BC Place (Vancouver)
  const bel = t('bel'), egy = t('egy'), irn = t('irn'), nzl = t('nzl');
  const groupG: Group = {
    id: 'G',
    teams: [bel, egy, irn, nzl],
    matches: [
      m('G', bel, egy, 1, '15 jun', '20h00', 'SoFi Stadium, Los Angeles',  'SporTV / CazéTV'),
      m('G', irn, nzl, 1, '15 jun', '17h00', 'Lumen Field, Seattle',        'SporTV / CazéTV'),
      m('G', bel, irn, 2, '19 jun', '20h00', 'BC Place, Vancouver',         'SporTV / CazéTV'),
      m('G', egy, nzl, 2, '19 jun', '17h00', 'SoFi Stadium, Los Angeles',   'SporTV / CazéTV'),
      m('G', bel, nzl, 3, '23 jun', '22h00', 'Lumen Field, Seattle',        'SporTV / CazéTV'),
      m('G', egy, irn, 3, '23 jun', '22h00', 'BC Place, Vancouver',         'SporTV / CazéTV'),
    ],
  };

  // ── GROUP H ──────────────────────────────────────────────────────────────
  // Spain · Cape Verde · Saudi Arabia · Uruguay
  const esp = t('esp'), cpv = t('cpv'), ksa = t('ksa'), uru = t('uru');
  const groupH: Group = {
    id: 'H',
    teams: [esp, cpv, ksa, uru],
    matches: [
      m('H', esp, cpv, 1, '15 jun', '16h00', 'Hard Rock Stadium, Miami',           'SporTV / CazéTV'),
      m('H', ksa, uru, 1, '15 jun', '19h00', 'MetLife Stadium, East Rutherford',   'SporTV / CazéTV'),
      m('H', esp, ksa, 2, '19 jun', '16h00', 'Lincoln Financial Field, Filadélfia','SporTV / CazéTV'),
      m('H', cpv, uru, 2, '19 jun', '19h00', 'Hard Rock Stadium, Miami',           'SporTV / CazéTV'),
      m('H', esp, uru, 3, '23 jun', '22h00', 'MetLife Stadium, East Rutherford',   'SporTV / CazéTV'),
      m('H', cpv, ksa, 3, '23 jun', '22h00', 'Lincoln Financial Field, Filadélfia','SporTV / CazéTV'),
    ],
  };

  // ── GROUP I ──────────────────────────────────────────────────────────────
  // France · Senegal · Iraq · Norway
  const fra = t('fra'), sen = t('sen'), irq = t('irq'), nor = t('nor');
  const groupI: Group = {
    id: 'I',
    teams: [fra, sen, irq, nor],
    matches: [
      m('I', fra, sen, 1, '16 jun', '16h00', 'MetLife Stadium, East Rutherford',   'SporTV / CazéTV'),
      m('I', irq, nor, 1, '16 jun', '19h00', 'Gillette Stadium, Boston',           'SporTV / CazéTV'),
      m('I', fra, irq, 2, '20 jun', '16h00', 'Lincoln Financial Field, Filadélfia','SporTV / CazéTV'),
      m('I', sen, nor, 2, '20 jun', '19h00', 'MetLife Stadium, East Rutherford',   'SporTV / CazéTV'),
      m('I', fra, nor, 3, '24 jun', '22h00', 'Gillette Stadium, Boston',           'SporTV / CazéTV'),
      m('I', sen, irq, 3, '24 jun', '22h00', 'Lincoln Financial Field, Filadélfia','SporTV / CazéTV'),
    ],
  };

  // ── GROUP J ──────────────────────────────────────────────────────────────
  // Argentina (title holders) · Algeria · Austria · Jordan
  const arg = t('arg'), alg = t('alg'), aut = t('aut'), jor = t('jor');
  const groupJ: Group = {
    id: 'J',
    teams: [arg, alg, aut, jor],
    matches: [
      m('J', arg, alg, 1, '16 jun', '19h00', 'MetLife Stadium, East Rutherford', 'SporTV / CazéTV'),
      m('J', aut, jor, 1, '16 jun', '22h00', 'AT&T Stadium, Arlington',          'SporTV / CazéTV'),
      m('J', arg, aut, 2, '20 jun', '19h00', 'Arrowhead Stadium, Kansas City',   'SporTV / CazéTV'),
      m('J', alg, jor, 2, '20 jun', '22h00', 'MetLife Stadium, East Rutherford', 'SporTV / CazéTV'),
      m('J', arg, jor, 3, '24 jun', '22h00', 'AT&T Stadium, Arlington',          'SporTV / CazéTV'),
      m('J', alg, aut, 3, '24 jun', '22h00', 'Arrowhead Stadium, Kansas City',   'SporTV / CazéTV'),
    ],
  };

  // ── GROUP K ──────────────────────────────────────────────────────────────
  // Portugal · DR Congo · Uzbekistan · Colombia
  const por = t('por'), cod = t('cod'), uzb = t('uzb'), col = t('col');
  const groupK: Group = {
    id: 'K',
    teams: [por, cod, uzb, col],
    matches: [
      m('K', por, cod, 1, '17 jun', '16h00', 'Mercedes-Benz Stadium, Atlanta', 'SporTV / CazéTV'),
      m('K', uzb, col, 1, '17 jun', '19h00', 'Levi\'s Stadium, Santa Clara',   'SporTV / CazéTV'),
      m('K', por, uzb, 2, '21 jun', '16h00', 'AT&T Stadium, Arlington',        'SporTV / CazéTV'),
      m('K', cod, col, 2, '21 jun', '19h00', 'Mercedes-Benz Stadium, Atlanta', 'SporTV / CazéTV'),
      m('K', por, col, 3, '25 jun', '22h00', 'Levi\'s Stadium, Santa Clara',   'SporTV / CazéTV'),
      m('K', cod, uzb, 3, '25 jun', '22h00', 'AT&T Stadium, Arlington',        'SporTV / CazéTV'),
    ],
  };

  // ── GROUP L ──────────────────────────────────────────────────────────────
  // England · Croatia · Ghana · Panama
  const eng = t('eng'), cro = t('cro'), gha = t('gha'), pan = t('pan');
  const groupL: Group = {
    id: 'L',
    teams: [eng, cro, gha, pan],
    matches: [
      m('L', eng, cro, 1, '17 jun', '16h00', 'Lincoln Financial Field, Filadélfia', 'SporTV / CazéTV'),
      m('L', gha, pan, 1, '17 jun', '19h00', 'Gillette Stadium, Boston',            'SporTV / CazéTV'),
      m('L', eng, gha, 2, '21 jun', '16h00', 'AT&T Stadium, Arlington',             'SporTV / CazéTV'),
      m('L', cro, pan, 2, '21 jun', '19h00', 'Lincoln Financial Field, Filadélfia', 'SporTV / CazéTV'),
      m('L', eng, pan, 3, '25 jun', '22h00', 'Gillette Stadium, Boston',            'SporTV / CazéTV'),
      m('L', cro, gha, 3, '25 jun', '22h00', 'AT&T Stadium, Arlington',             'SporTV / CazéTV'),
    ],
  };

  return [groupA, groupB, groupC, groupD, groupE, groupF, groupG, groupH, groupI, groupJ, groupK, groupL];
}
