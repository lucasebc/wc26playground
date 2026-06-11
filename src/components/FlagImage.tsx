interface Props {
  code: string;
  name: string;
  size?: 'sm' | 'md';
}

export function FlagImage({ code, name, size = 'sm' }: Props) {
  const cls = size === 'sm' ? 'w-6 h-4' : 'w-8 h-6';
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={`Bandeira ${name}`}
      className={`${cls} object-cover rounded-sm flex-shrink-0`}
      loading="lazy"
    />
  );
}
