'use client';

import { useState, useEffect } from 'react';
import Logo from './components/logo';
import BookingForm from './components/bookingForm';
import AppointmentList from './components/appointmentList';
import type { Appointment } from '@/lib/types';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar turnos desde Supabase al montar el componente
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes_turnos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading appointments:', error);
        alert('Error al cargar los turnos');
        return;
      }

      if (data) {
        // Convertir los datos de Supabase al formato de Appointment
        const formattedAppointments: Appointment[] = data.map((turno) => ({
          id: turno.id?.toString() || '',
          name: turno.name,
          service: turno.service || '',
          date: turno.date,
          time: turno.time,
        }));
        setAppointments(formattedAppointments);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = async (appointment: Appointment) => {
    try {
      // Guardar en Supabase
      const { data, error } = await supabase
        .from('clientes_turnos')
        .insert([
          {
            name: appointment.name,
            service: appointment.service,
            date: appointment.date,
            time: appointment.time,
            status: 'active',
          },
        ])
        .select();

      if (error) {
        console.error('Error saving appointment:', error);
        alert('Error al guardar el turno');
        return;
      }

      if (data && data[0]) {
        // Convertir a formato Appointment
        const newAppointment: Appointment = {
          id: data[0].id.toString(),
          name: data[0].name,
          service: data[0].service || '',
          date: data[0].date,
          time: data[0].time,
        };
        
        // Actualizar estado local
        setAppointments([newAppointment, ...appointments]);
        alert('¡Turno reservado con éxito!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el turno');
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      // Eliminar de Supabase
      const { error } = await supabase
        .from('clientes_turnos')
        .delete()
        .eq('id', parseInt(id));

      if (error) {
        console.error('Error deleting appointment:', error);
        alert('Error al cancelar el turno');
        return;
      }

      // Actualizar estado local
      setAppointments(appointments.filter((apt) => apt.id !== id));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cancelar el turno');
    }
  };

  return (
    <>
      <Logo />
      
      {/* Dragon Corner Decorations */}
      <div className="fixed top-0 left-0 w-72 h-72 z-40 opacity-30">
        <img src="/images/dragon.jpg" alt="Dragon decoration" className="w-full h-full object-contain" />
      </div>
      <div className="fixed top-0 right-0 w-72 h-72 z-40 opacity-30">
        <img src="/images/dragon.jpg" alt="Dragon decoration" className="w-full h-full object-contain transform scale-x-[-1]" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 py-10 pt-36">
        {/* Header */}
        <header className="text-center mb-20 pb-8 border-b border-neutral-700">
          <h1 className="text-5xl font-light tracking-widest mb-4 text-white">
            RESERVA TU TATTOO
          </h1>
          <p className="text-neutral-400 text-sm tracking-[0.2em]">
            Agenda tu cita de forma rápida
          </p>
        </header>

        {/* Formulario */}
        <BookingForm onAddAppointment={handleAddAppointment} />

        {/* Lista de turnos */}
        <div className="mt-20">
          <div className="flex items-center mb-10 pb-4 border-b border-neutral-700">
            <h2 className="text-2xl font-light tracking-wider text-white uppercase">Turnos Agendados</h2>
          </div>
          {loading ? (
            <p className="text-center text-neutral-500 py-12 text-sm tracking-wider">
              Cargando turnos...
            </p>
          ) : (
            <AppointmentList
              appointments={appointments}
              onCancel={handleCancelAppointment}
            />
          )}
        </div>
      </div>
    </>
  );
}