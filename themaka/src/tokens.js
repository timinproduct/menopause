export const T = {
  cream: '#FAF3E7',
  creamWarm: '#F4E9D4',
  sand: '#E8D9BE',
  paper: '#FFFBF2',

  terracotta: '#C47553',
  terracottaDeep: '#A85A3D',
  terracottaSoft: '#E5A98A',
  clay: '#D48B67',

  sage: '#8FA37E',
  sageDeep: '#5F7558',
  sageSoft: '#BACAA8',

  ink: '#3D3328',
  inkSoft: '#6B5D4E',
  inkMuted: '#948472',

  honey: '#D4A574',
  plum: '#8A5E6B',

  serif: '"Libre Caslon Text", "Cormorant Garamond", Georgia, serif',
  sans: '"Work Sans", system-ui, -apple-system, sans-serif',

  radii: { sm: 8, md: 14, lg: 22, xl: 28, pill: 999 },
};

export const paperGrainUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
)}")`;
