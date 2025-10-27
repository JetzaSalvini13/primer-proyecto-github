export const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  
  export const services: { value: string; label: string }[] = [
    { value: 'Tattoo Personalizado', label: 'Tattoo Personalizado' },
    { value: 'Tattoo Black & Grey', label: 'Tattoo Black & Grey' },
    { value: 'Tattoo Color', label: 'Tattoo Color' },
    { value: 'Cover-up', label: 'Cover-up' },
    { value: 'Retoque', label: 'Retoque' },
    { value: 'Piercing', label: 'Piercing' },
  ];
  
  export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }