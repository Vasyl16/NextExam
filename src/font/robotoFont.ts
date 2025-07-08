import { Roboto } from 'next/font/google';

export const robotoFont = Roboto({
  subsets: ['cyrillic'],
  variable: '--font-roboto',
  weight: ['400', '500', '600', '700', '800', '900'],
});
