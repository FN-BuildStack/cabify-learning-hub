import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Step4FeedbackProps {
  isCorrect: boolean;
  onClose: () => void;
  moduleId: string;
  step: number;
}

// Feedback messages for each module and step
const feedbackMessages: Record<string, any> = {
  welcome: {
    step1: {
      correct: '¡Excelente! Mostraste empatía y claridad, valores clave de Cabify. Un usuario bien informado es un usuario satisfecho.',
      incorrect: 'Los nuevos usuarios necesitan orientación clara y amigable. Evita respuestas cortas o redirecciones sin contexto.',
    },
    step2: {
      correct: 'Correcto. La empatía es fundamental en cada interacción, especialmente con nuevos usuarios.',
      incorrect: 'La velocidad es importante, pero la empatía y claridad son los valores que marcan la diferencia.',
    },
  },
  culture: {
    step1: {
      correct: '¡Perfecto! Protegiste la privacidad del conductor cumpliendo con GDPR y ofreciste una solución al usuario.',
      incorrect: 'Compartir datos personales viola las políticas de privacidad y pone en riesgo al conductor. Siempre actúa como intermediario.',
    },
    step2: {
      correct: 'Exacto. El cumplimiento de GDPR no es opcional, es nuestra responsabilidad legal y ética.',
      incorrect: 'La protección de datos es un requisito legal (GDPR) que garantiza la seguridad de todos.',
    },
  },
  structure: {
    step1: {
      correct: '¡Bien hecho! Derivaste correctamente al área especializada, asegurando una resolución profesional.',
      incorrect: 'Cada área tiene su especialidad. Derivar al equipo correcto garantiza una mejor solución.',
    },
    step2: {
      correct: 'Correcto. Finanzas gestiona todos los temas de facturación y cobros.',
      incorrect: 'Finanzas es el área especializada en resolver problemas de facturación y cobros.',
    },
  },
  processes: {
    step1: {
      correct: '¡Excelente decisión! La seguridad del usuario es siempre la prioridad máxima en Cabify.',
      incorrect: 'La seguridad nunca debe comprometerse. En situaciones de riesgo, actúa de inmediato.',
    },
    step2: {
      correct: 'Exacto. La seguridad del usuario siempre es primero, sin excepciones.',
      incorrect: 'Ante cualquier riesgo de seguridad, la prioridad es proteger al usuario inmediatamente.',
    },
  },
  resources: {
    step1: {
      correct: '¡Perfecto! Conocer dónde están los recursos te hace más eficiente y profesional.',
      incorrect: 'El portal interno de Agentes contiene toda la información actualizada que necesitas.',
    },
    step2: {
      correct: 'Correcto. El portal interno es tu fuente oficial de información.',
      incorrect: 'El portal interno de Agentes es la única fuente oficial y actualizada de políticas y recursos.',
    },
  },
  quiz: {
    step1: {
      correct: '¡Excelente! Aplicaste el protocolo correcto priorizando según el nivel de urgencia.',
      incorrect: 'Cada situación requiere evaluación. Prioriza según urgencia y aplica el protocolo establecido.',
    },
    step2: {
      correct: 'Correcto. Evaluar y priorizar según protocolo es clave para un servicio de calidad.',
      incorrect: 'La evaluación y priorización según protocolo aseguran respuestas efectivas y profesionales.',
    },
  },
};

export function Step4Feedback({ isCorrect, onClose, moduleId, step }: Step4FeedbackProps) {
  const moduleFeedback = feedbackMessages[moduleId] || feedbackMessages.culture;
  const stepKey = `step${step}`;
  const message = isCorrect 
    ? moduleFeedback[stepKey]?.correct 
    : moduleFeedback[stepKey]?.incorrect;

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
          {isCorrect ? '¡Correcto!' : 'Intenta de nuevo'}
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
          {message}
        </p>

        {/* Button */}
        <Button
          onClick={onClose}
          className="w-full rounded-full py-6 text-white"
          style={{
            backgroundColor: '#7145D6',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
          }}
        >
          {isCorrect ? 'Continuar' : 'Reintentar'}
        </Button>
      </div>
    </div>
  );
}
