export interface Appointment {
    id: string;
    name: string;
    service: string;
    date: string;
    time: string;
  }
  
  export interface Service {
    value: string;
    label: string;
  }

export interface TurnoDatabase {
  id?: number;
  name: string;
  service: string;
  date: string;
  time: string;
  created_at?: string;
  status?: string;
}