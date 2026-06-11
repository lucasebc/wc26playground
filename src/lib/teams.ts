import { Team } from '@/types';

export const TEAMS: Team[] = [
  // CONMEBOL (6)
  { id: 'arg', name: 'Argentina',   flagCode: 'ar', confederation: 'CONMEBOL' },
  { id: 'bra', name: 'Brasil',      flagCode: 'br', confederation: 'CONMEBOL' },
  { id: 'col', name: 'Colômbia',    flagCode: 'co', confederation: 'CONMEBOL' },
  { id: 'uru', name: 'Uruguai',     flagCode: 'uy', confederation: 'CONMEBOL' },
  { id: 'ecu', name: 'Equador',     flagCode: 'ec', confederation: 'CONMEBOL' },
  { id: 'par', name: 'Paraguai',    flagCode: 'py', confederation: 'CONMEBOL' },

  // UEFA (16)
  { id: 'ger', name: 'Alemanha',           flagCode: 'de',     confederation: 'UEFA' },
  { id: 'fra', name: 'França',             flagCode: 'fr',     confederation: 'UEFA' },
  { id: 'esp', name: 'Espanha',            flagCode: 'es',     confederation: 'UEFA' },
  { id: 'eng', name: 'Inglaterra',         flagCode: 'gb-eng', confederation: 'UEFA' },
  { id: 'por', name: 'Portugal',           flagCode: 'pt',     confederation: 'UEFA' },
  { id: 'ned', name: 'Holanda',            flagCode: 'nl',     confederation: 'UEFA' },
  { id: 'bel', name: 'Bélgica',            flagCode: 'be',     confederation: 'UEFA' },
  { id: 'cro', name: 'Croácia',            flagCode: 'hr',     confederation: 'UEFA' },
  { id: 'sui', name: 'Suíça',              flagCode: 'ch',     confederation: 'UEFA' },
  { id: 'aut', name: 'Áustria',            flagCode: 'at',     confederation: 'UEFA' },
  { id: 'sco', name: 'Escócia',            flagCode: 'gb-sct', confederation: 'UEFA' },
  { id: 'nor', name: 'Noruega',            flagCode: 'no',     confederation: 'UEFA' },
  { id: 'bih', name: 'Bósnia-Herzegovina', flagCode: 'ba',     confederation: 'UEFA' },
  { id: 'cze', name: 'República Tcheca',   flagCode: 'cz',     confederation: 'UEFA' },
  { id: 'swe', name: 'Suécia',             flagCode: 'se',     confederation: 'UEFA' },
  { id: 'tur', name: 'Turquia',            flagCode: 'tr',     confederation: 'UEFA' },

  // CAF (10)
  { id: 'mar', name: 'Marrocos',    flagCode: 'ma', confederation: 'CAF' },
  { id: 'sen', name: 'Senegal',     flagCode: 'sn', confederation: 'CAF' },
  { id: 'egy', name: 'Egito',       flagCode: 'eg', confederation: 'CAF' },
  { id: 'alg', name: 'Argélia',     flagCode: 'dz', confederation: 'CAF' },
  { id: 'tun', name: 'Tunísia',     flagCode: 'tn', confederation: 'CAF' },
  { id: 'cod', name: 'DR Congo',    flagCode: 'cd', confederation: 'CAF' },
  { id: 'rsa', name: 'África do Sul', flagCode: 'za', confederation: 'CAF' },
  { id: 'civ', name: 'Costa do Marfim', flagCode: 'ci', confederation: 'CAF' },
  { id: 'gha', name: 'Gana',        flagCode: 'gh', confederation: 'CAF' },
  { id: 'cpv', name: 'Cabo Verde',  flagCode: 'cv', confederation: 'CAF' },

  // AFC (9)
  { id: 'jpn', name: 'Japão',           flagCode: 'jp', confederation: 'AFC' },
  { id: 'kor', name: 'Coreia do Sul',   flagCode: 'kr', confederation: 'AFC' },
  { id: 'ksa', name: 'Arábia Saudita',  flagCode: 'sa', confederation: 'AFC' },
  { id: 'irn', name: 'Irã',             flagCode: 'ir', confederation: 'AFC' },
  { id: 'aus', name: 'Austrália',       flagCode: 'au', confederation: 'AFC' },
  { id: 'irq', name: 'Iraque',          flagCode: 'iq', confederation: 'AFC' },
  { id: 'jor', name: 'Jordânia',        flagCode: 'jo', confederation: 'AFC' },
  { id: 'qat', name: 'Catar',           flagCode: 'qa', confederation: 'AFC' },
  { id: 'uzb', name: 'Uzbequistão',     flagCode: 'uz', confederation: 'AFC' },

  // CONCACAF (6) — 3 hosts + 3 qualifiers
  { id: 'usa', name: 'EUA',      flagCode: 'us', confederation: 'CONCACAF' },
  { id: 'can', name: 'Canadá',   flagCode: 'ca', confederation: 'CONCACAF' },
  { id: 'mex', name: 'México',   flagCode: 'mx', confederation: 'CONCACAF' },
  { id: 'pan', name: 'Panamá',   flagCode: 'pa', confederation: 'CONCACAF' },
  { id: 'hai', name: 'Haiti',    flagCode: 'ht', confederation: 'CONCACAF' },
  { id: 'cur', name: 'Curaçao',  flagCode: 'cw', confederation: 'CONCACAF' },

  // OFC (1)
  { id: 'nzl', name: 'Nova Zelândia', flagCode: 'nz', confederation: 'OFC' },
];
