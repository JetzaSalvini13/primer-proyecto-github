interface TimeSlotProps {
    time: string;
    isSelected: boolean;
    onSelect: () => void;
  }
  
  export default function TimeSlot({ time, isSelected, onSelect }: TimeSlotProps) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`
          p-4 border text-sm transition-all font-light
          ${isSelected 
            ? 'bg-gold text-black border-gold' 
            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-gold hover:text-white'
          }
        `}
      >
        {time}
      </button>
    );
  }