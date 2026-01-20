import { useState } from 'react';
import { User } from 'lucide-react';

interface Step1SimulationProps {
  moduleId: string;
  onAnswer: (answer: any, isCorrect: boolean) => void;
}

// Different scenarios for each module
const scenarios: Record<string, any> = {
  welcome: {
    title: 'Primer contacto con un usuario',
    userMessage: '¡Hola! Es mi primer viaje con Cabify. ¿Cómo funciona el pago?',
    context: 'El usuario parece nervioso y necesita orientación básica.',
    options: [
      {
        id: 1,
        text: 'El pago es automático con tu tarjeta registrada. ¡Bienvenido a Cabify! ¿Tienes alguna otra duda?',
        correct: true,
      },
      {
        id: 2,
        text: 'Eso está en la app, revisa las FAQs.',
        correct: false,
      },
      {
        id: 3,
        text: 'Pagas en efectivo al conductor al final del viaje.',
        correct: false,
      },
    ],
  },
  culture: {
    title: 'Situación de privacidad de datos',
    userMessage: '¿Me puedes dar el número del conductor? Olvidé mi cartera en el coche.',
    context: 'Debes proteger la privacidad del conductor según GDPR.',
    options: [
      {
        id: 1,
        text: 'Te envío el número ahora mismo.',
        correct: false,
      },
      {
        id: 2,
        text: 'Entiendo la urgencia. Por políticas de privacidad no puedo compartir datos del conductor, pero yo coordinaré la entrega contigo.',
        correct: true,
      },
      {
        id: 3,
        text: 'Busca el número en tu historial de viajes.',
        correct: false,
      },
    ],
  },
  structure: {
    title: 'Derivación a área correcta',
    userMessage: 'Tengo un problema con un cobro duplicado en mi tarjeta.',
    context: 'Este caso requiere derivación al área de Finanzas.',
    options: [
      {
        id: 1,
        text: 'Te reembolso ahora mismo.',
        correct: false,
      },
      {
        id: 2,
        text: 'Voy a derivar tu caso al área de Finanzas que revisará tu situación. Te contactarán en las próximas 24h.',
        correct: true,
      },
      {
        id: 3,
        text: 'No puedo ayudarte con eso.',
        correct: false,
      },
    ],
  },
  processes: {
    title: 'Protocolo de seguridad',
    userMessage: 'El conductor está manejando de forma peligrosa. ¡Tengo miedo!',
    context: 'La seguridad del usuario es prioridad máxima.',
    options: [
      {
        id: 1,
        text: 'Hablaré con el conductor después del viaje.',
        correct: false,
      },
      {
        id: 2,
        text: 'Tu seguridad es lo más importante. Cancela el viaje inmediatamente y repórtalo. Te asignaremos otro conductor sin costo.',
        correct: true,
      },
      {
        id: 3,
        text: 'Dale una calificación baja al final del viaje.',
        correct: false,
      },
    ],
  },
  resources: {
    title: 'Uso de recursos internos',
    userMessage: '¿Dónde puedo encontrar información sobre promociones actuales?',
    context: 'Debes conocer dónde están los recursos disponibles.',
    options: [
      {
        id: 1,
        text: 'No tengo esa información.',
        correct: false,
      },
      {
        id: 2,
        text: 'Consulta el portal interno de Agentes > Sección Promociones. Ahí encontrarás todas las campañas vigentes.',
        correct: true,
      },
      {
        id: 3,
        text: 'Busca en Google.',
        correct: false,
      },
    ],
  },
  quiz: {
    title: 'Evaluación de conocimientos',
    userMessage: 'Necesito ayuda urgente, ¿qué haces primero?',
    context: 'Evalúa tu proceso de priorización.',
    options: [
      {
        id: 1,
        text: 'Le pido que espere mientras termino mi café.',
        correct: false,
      },
      {
        id: 2,
        text: 'Evalúo el nivel de urgencia y actúo según el protocolo establecido, priorizando seguridad.',
        correct: true,
      },
      {
        id: 3,
        text: 'Lo transfiero a otro agente.',
        correct: false,
      },
    ],
  },
};

export function Step1Simulation({ moduleId, onAnswer }: Step1SimulationProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const scenario = scenarios[moduleId] || scenarios.culture;

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
    const selected = scenario.options.find((opt: any) => opt.id === optionId);
    if (selected) {
      setTimeout(() => {
        onAnswer(selected, selected.correct);
      }, 300);
    }
  };

  return (
    <div className="flex flex-col h-full md:min-h-[calc(100vh-140px)]">
      {/* Header (Mobile Only) */}
      <div className="md:hidden bg-white px-6 py-4 border-b border-gray-100">
        <h2 
          className="mb-2"
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#7145D6',
            lineHeight: 1.3
          }}
        >
          Paso 1: Simulación
        </h2>
        <p 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          {scenario.title}
        </p>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block px-12 py-8 border-b border-[#E5E7EB]">
        <h2 
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#7145D6',
            lineHeight: 1.3
          }}
        >
          Paso 1: Simulación
        </h2>
        <p 
          className="mt-2"
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          {scenario.title}
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#F9F9F9] px-6 md:px-12 py-6 md:py-8 overflow-y-auto">
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
              Usuario
            </p>
            <div 
              className="bg-white p-4 md:p-5 rounded-3xl rounded-tl-sm"
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
                {scenario.userMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Context Box */}
        <div 
          className="bg-[#FFF9E6] border-l-4 border-[#FFA15A] p-4 md:p-5 rounded-r-2xl mb-6"
        >
          <p 
            className="mb-1"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#333333'
            }}
          >
            💡 Contexto
          </p>
          <p 
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#666666',
              lineHeight: 1.5
            }}
          >
            {scenario.context}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white px-6 md:px-12 py-6 md:py-8 border-t border-gray-100">
        <p 
          className="mb-4"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#666666'
          }}
        >
          ¿Cómo responderías?
        </p>
        <div className="space-y-3">
          {scenario.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 md:p-5 rounded-full transition-all ${
                selectedOption === option.id
                  ? 'bg-[#EAE6F5] border-2 border-[#7145D6]'
                  : 'bg-white border border-[#E0E0E0]'
              }`}
              style={{
                fontSize: '16px',
                fontWeight: selectedOption === option.id ? 600 : 400,
                color: selectedOption === option.id ? '#7145D6' : '#333333',
                lineHeight: 1.5,
                boxShadow: selectedOption === option.id 
                  ? '0px 2px 8px rgba(113, 69, 214, 0.15)' 
                  : '0px 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}