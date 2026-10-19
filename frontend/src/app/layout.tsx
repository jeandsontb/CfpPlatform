import './global.css';

export const metadata = {
  title: 'CFP Platform - Submissão de Palestras',
  description: 'Plataforma para envio de propostas de palestras no Call for Papers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
