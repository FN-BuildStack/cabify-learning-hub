import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Screen5FeedbackProps {
  isCorrect: boolean;
  onNext: () => void;
}

export function Screen5Feedback({ isCorrect, onNext }: Screen5FeedbackProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div 
        className="bg-white p-8 rounded-3xl max-w-md w-full"
        style={{
          boxShadow: '0px 8px 24px rgba(0,0,0,0.15)'
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {isCorrect ? (
            <div className="bg-[#E6F7F2] p-4 rounded-full">
              <CheckCircle2 
                className="size-16 text-[#00CC96]" 
                strokeWidth={1.5}
              />
            </div>
          ) : (
            <div className="bg-[#FFE8E5] p-4 rounded-full">
              <XCircle 
                className="size-16 text-[#EF553B]" 
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 
          className="text-center mb-4"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: isCorrect ? '#00CC96' : '#EF553B',
            lineHeight: 1.3
          }}
        >
          {isCorrect ? '¡Correcto!' : '¡Ups! Intenta de nuevo'}
        </h2>

        {/* Message */}
        <p 
          className="text-center mb-8"
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#333333',
            lineHeight: 1.5
          }}
        >
          {isCorrect 
            ? 'Protegiste los datos del conductor cumpliendo con GDPR, y al mismo tiempo ofreciste una solución al usuario. ¡Excelente trabajo!'
            : 'Compartir datos personales del conductor viola las políticas de privacidad (GDPR) y pone en riesgo su seguridad. Siempre debes actuar como intermediario.'
          }
        </p>

        {/* Button */}
        <Button
          onClick={onNext}
          className="w-full rounded-full py-6 text-white"
          style={{
            backgroundColor: '#7145D6',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
