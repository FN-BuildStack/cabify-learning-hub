import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { User } from 'lucide-react';

interface Screen4SimulationProps {
  onNext: () => void;
  onBack: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

const quickReplies = [
  {
    id: 1,
    text: 'Te envío el número del conductor ahora mismo',
    correct: false,
  },
  {
    id: 2,
    text: 'Entiendo la urgencia. Por políticas de privacidad no puedo compartir datos del conductor, pero te ayudaré a coordinar la entrega',
    correct: true,
  },
  {
    id: 3,
    text: 'Busca el número en tu historial de viajes',
    correct: false,
  },
];

export function Screen4Simulation({ onNext, onBack, onAnswer }: Screen4SimulationProps) {
  const [selectedReply, setSelectedReply] = useState<number | null>(null);

  const handleSelectReply = (replyId: number) => {
    setSelectedReply(replyId);
    const selected = quickReplies.find(r => r.id === replyId);
    if (selected) {
      // Wait a moment before showing feedback
      setTimeout(() => {
        onAnswer(selected.correct);
      }, 300);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8px)] bg-[#F9F9F9]">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-[#F0F0F0]">
        <h1 
          className="mb-1"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#7145D6',
            lineHeight: 1.3
          }}
        >
          Simulación
        </h1>
        <p 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          ¿Cómo responderías?
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* User Message */}
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-[#7145D6] p-2 rounded-full">
            <User className="size-5 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p 
              className="mb-1"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#333333'
              }}
            >
              Sofía
            </p>
            <div 
              className="bg-white p-4 rounded-3xl rounded-tl-sm"
              style={{
                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <p 
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#333333',
                  lineHeight: 1.5
                }}
              >
                ¡Hola! Olvidé mi cartera en el coche. Es urgente, necesito el número del conductor para llamarlo directamente.
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Context */}
        <div 
          className="bg-[#FFF9E6] border-l-4 border-[#FFA15A] p-4 rounded-r-2xl mb-6"
        >
          <p 
            className="mb-1"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#333333'
            }}
          >
            💡 Recuerda
          </p>
          <p 
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#666666',
              lineHeight: 1.5
            }}
          >
            Debes proteger la privacidad del conductor según GDPR, pero también ayudar al usuario.
          </p>
        </div>
      </div>

      {/* Quick Replies */}
      <div className="bg-white px-6 py-6 border-t border-[#F0F0F0]">
        <p 
          className="mb-4"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#666666'
          }}
        >
          Selecciona tu respuesta:
        </p>
        <div className="space-y-3">
          {quickReplies.map((reply) => (
            <button
              key={reply.id}
              onClick={() => handleSelectReply(reply.id)}
              disabled={selectedReply !== null}
              className={`w-full text-left p-4 rounded-full transition-all ${
                selectedReply === reply.id
                  ? 'bg-[#EAE6F5] border-2 border-[#7145D6]'
                  : 'bg-white border border-[#E0E0E0]'
              }`}
              style={{
                fontSize: '16px',
                fontWeight: selectedReply === reply.id ? 600 : 400,
                color: selectedReply === reply.id ? '#7145D6' : '#333333',
                lineHeight: 1.5,
                boxShadow: selectedReply === reply.id 
                  ? '0px 2px 8px rgba(113, 69, 214, 0.15)' 
                  : '0px 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {reply.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
