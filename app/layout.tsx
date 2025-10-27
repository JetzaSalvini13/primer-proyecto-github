import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nicko Tattoo - Reserva tu turno',
  description: 'Sistema de turnos para estudios de tatuajes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
