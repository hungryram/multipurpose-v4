import { Inter, Poppins } from 'next/font/google';
 
export const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--body-font'
});

export const headingFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--heading-font'
});
 
 