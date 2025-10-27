'use client';

import { useState } from 'react';
import TimeSlot from './timeSlot';
import { timeSlots, services, generateId } from '@/lib/utils';
import type { Appointment } from '@/lib/types';

interface BookingFormProps {
  onAddAppointment: (appointment: Appointment) => void;
}

export default function BookingForm({ onAddAppointment }: BookingFormProps) {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTime) {
      alert('Por favor selecciona un horario');
      return;
    }

    const newAppointment: Appointment = {
      id: generateId(),
      name,
      service,
      date,
      time: selectedTime,
    };

    onAddAppointment(newAppointment);
    
    // Reset form
    setName('');
    setService('');
    setDate('');
    setSelectedTime('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-neutral-900 p-10 border border-neutral-800">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nombre */}
        <div>
          <label className="block mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            required
            className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white
                     placeholder-neutral-500
                     focus:outline-none focus:border-gold transition-all"
          />
        </div>

        {/* Servicio */}
        <div>
          <label className="block mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">
            Servicio
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white
                     focus:outline-none focus:border-gold transition-all"
          >
            <option value="" className="bg-neutral-950">Seleccionar servicio</option>
            {services.map((s) => (
              <option key={s.value} value={s.value} className="bg-neutral-950">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">
            Fecha
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            required
            className="w-full p-4 bg-neutral-950 border border-neutral-800 text-white
                     focus:outline-none focus:border-gold transition-all"
          />
        </div>

        {/* Horarios */}
        <div>
          <label className="block mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">
            Horario
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {timeSlots.map((time) => (
              <TimeSlot
                key={time}
                time={time}
                isSelected={selectedTime === time}
                onSelect={() => setSelectedTime(time)}
              />
            ))}
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full p-4 bg-[#2D3748] text-white uppercase font-bold rounded-lg
                   hover:bg-[#374A5C] transition-all duration-300"
        >
          Reservar Turno
        </button>
      </form>
    </div>
  );
}