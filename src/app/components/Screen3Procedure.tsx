import { Inbox, CheckCircle2, Handshake } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Screen3ProcedureProps {
  onNext: () => void;
  onBack: () => void;
}

const steps = [
  {
    number: 1,
    icon: Inbox,
    title: 'Recibir',
    description: 'Registra la solicitud del usuario de forma amable y profesional.',
  },
  {
    number: 2,
    icon: CheckCircle2,
    title: 'Validar',
    description: 'Verifica la identidad del usuario sin compartir datos personales del conductor.',
  },
  {
    number: 3,
    icon: Handshake,
    title: 'Coordinar',
    description: 'Facilita el reencuentro protegiendo la privacidad de ambas partes.',
  },
];

export function Screen3Procedure({ onNext, onBack }: Screen3ProcedureProps) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8px)] px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="mb-3"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#7145D6',
            lineHeight: 1.3
          }}
        >
          Procedimiento Operativo
        </h1>
        <p 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          Sigue estos 3 pasos para cada caso
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 mb-8">
        <div className="relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-[22px] top-8 bottom-8 w-0.5 bg-[#EAE6F5]"
            style={{ height: 'calc(100% - 64px)' }}
          />

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative flex gap-4">
                  {/* Icon Circle */}
                  <div 
                    className="relative z-10 flex items-center justify-center bg-[#7145D6] rounded-full"
                    style={{
                      width: '48px',
                      height: '48px',
                      flexShrink: 0
                    }}
                  >
                    <Icon className="size-6 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Content Card */}
                  <div 
                    className="flex-1 bg-white p-6 rounded-3xl"
                    style={{
                      boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="bg-[#EAE6F5] px-3 py-1 rounded-full"
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#7145D6'
                        }}
                      >
                        Paso {step.number}
                      </span>
                    </div>
                    <h3 
                      className="mb-2"
                      style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#333333',
                        lineHeight: 1.3
                      }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#333333',
                        lineHeight: 1.5
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 rounded-full py-6"
          style={{
            borderColor: '#7145D6',
            color: '#7145D6',
            fontSize: '16px',
            fontWeight: 600,
            borderWidth: '2px'
          }}
        >
          Atrás
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 rounded-full py-6 text-white"
          style={{
            backgroundColor: '#7145D6',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
          }}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
