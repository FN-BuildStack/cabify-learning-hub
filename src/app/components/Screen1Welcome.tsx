import { Car } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Screen1WelcomeProps {
  onNext: () => void;
}

export function Screen1Welcome({ onNext }: Screen1WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8px)] px-6 py-8">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <div className="bg-[#7145D6] p-6 rounded-3xl">
          <Car className="size-16 text-white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h1 
        className="mb-4 text-center"
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#7145D6',
          lineHeight: 1.3
        }}
      >
        Protocolo de Objetos Perdidos
      </h1>

      {/* Time Tag */}
      <div className="mb-6 bg-[#EAE6F5] px-4 py-2 rounded-full">
        <span 
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#7145D6'
          }}
        >
          ⏱ 10 min
        </span>
      </div>

      {/* Description */}
      <p 
        className="text-center mb-12 max-w-md"
        style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#333333',
          lineHeight: 1.5
        }}
      >
        Aprende el protocolo esencial de Cabify para gestionar objetos perdidos de manera profesional y segura, protegiendo la privacidad de nuestros usuarios.
      </p>

      {/* CTA Button */}
      <Button
        onClick={onNext}
        className="rounded-full px-12 py-6 text-white"
        style={{
          backgroundColor: '#7145D6',
          fontSize: '16px',
          fontWeight: 600,
          boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
        }}
      >
        Comenzar
      </Button>
    </div>
  );
}
