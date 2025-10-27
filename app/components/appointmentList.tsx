'use client';

import type { Appointment } from '@/lib/types';

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

export default function AppointmentList({ appointments, onCancel }: AppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-12 text-sm tracking-wider">
        No hay turnos agendados
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((apt) => (
        <div
          key={apt.id}
          className="bg-neutral-900 p-6 border border-neutral-800
                   flex justify-between items-center
                   hover:border-neutral-700 transition-all"
        >
          <div>
            <h3 className="font-light text-lg mb-2 text-white">{apt.name}</h3>
            <p className="text-sm text-neutral-400 uppercase tracking-wide">
              {apt.service} - {apt.date} a las {apt.time}
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('¿Estás seguro de cancelar este turno?')) {
                onCancel(apt.id);
              }
            }}
            className="px-6 py-2.5 border border-neutral-700 text-neutral-400
                     hover:border-gold hover:text-gold transition-all text-sm uppercase tracking-wide"
          >
            Cancelar
          </button>
        </div>
      ))}
    </div>
  );
}