import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { CheckCircle2, XCircle, Award } from 'lucide-react';

interface Screen6QuizProps {
  onComplete: () => void;
  onBack: () => void;
}

const quizQuestion = {
  question: '¿Cuál es la acción correcta cuando un usuario solicita información personal de un conductor?',
  options: [
    {
      id: 1,
      text: 'Proporcionar el número de teléfono si el caso es urgente',
      correct: false,
      feedback: 'Nunca debes compartir datos personales, sin importar la urgencia del caso.'
    },
    {
      id: 2,
      text: 'Actuar como intermediario y coordinar la solución sin compartir datos',
      correct: true,
      feedback: 'Correcto. Siempre protege la privacidad de ambas partes mientras facilitas la solución.'
    },
    {
      id: 3,
      text: 'Ignorar la solicitud por políticas de privacidad',
      correct: false,
      feedback: 'Debes ayudar al usuario, pero sin comprometer la privacidad del conductor.'
    }
  ]
};

export function Screen6Quiz({ onComplete, onBack }: Screen6QuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setShowResult(true);
    }
  };

  const selectedAnswer = quizQuestion.options.find(opt => opt.id === selectedOption);
  const isCorrect = selectedAnswer?.correct || false;

  if (showResult && isCorrect) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8px)] px-6 py-8">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="bg-[#E6F7F2] p-6 rounded-full">
            <Award className="size-20 text-[#00CC96]" strokeWidth={1.5} />
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
          ¡Felicidades!
        </h1>

        {/* Message */}
        <p 
          className="text-center mb-8 max-w-md"
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#333333',
            lineHeight: 1.5
          }}
        >
          Has completado el módulo de Protocolo de Objetos Perdidos. Ahora estás preparado para aplicar estos conocimientos en situaciones reales.
        </p>

        {/* Certificate Card */}
        <div 
          className="bg-white p-6 rounded-3xl mb-8 w-full max-w-md"
          style={{
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <div className="text-center">
            <p 
              className="mb-2"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#666666'
              }}
            >
              Certificado obtenido
            </p>
            <p 
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#7145D6'
              }}
            >
              Protocolo de Objetos Perdidos
            </p>
            <p 
              className="mt-2"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#666666'
              }}
            >
              Duración: 10 minutos
            </p>
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={onComplete}
          className="rounded-full px-12 py-6 text-white"
          style={{
            backgroundColor: '#7145D6',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
          }}
        >
          Finalizar
        </Button>
      </div>
    );
  }

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
          Evaluación Final
        </h1>
        <p 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          Demuestra lo que has aprendido
        </p>
      </div>

      {/* Question */}
      <div 
        className="bg-white p-6 rounded-3xl mb-6"
        style={{
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <p 
          className="mb-6"
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#333333',
            lineHeight: 1.5
          }}
        >
          {quizQuestion.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {quizQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-full transition-all ${
                selectedOption === option.id
                  ? 'bg-[#EAE6F5] border-2 border-[#7145D6]'
                  : 'bg-[#F9F9F9] border border-[#E0E0E0]'
              }`}
              style={{
                fontSize: '16px',
                fontWeight: selectedOption === option.id ? 600 : 400,
                color: selectedOption === option.id ? '#7145D6' : '#333333',
                lineHeight: 1.5
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {showResult && selectedAnswer && (
        <div 
          className={`p-4 rounded-2xl mb-6 border-l-4 ${
            isCorrect 
              ? 'bg-[#E6F7F2] border-[#00CC96]' 
              : 'bg-[#FFE8E5] border-[#EF553B]'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="size-6 text-[#00CC96] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            ) : (
              <XCircle className="size-6 text-[#EF553B] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            )}
            <p 
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#333333',
                lineHeight: 1.5
              }}
            >
              {selectedAnswer.feedback}
            </p>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

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
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="flex-1 rounded-full py-6 text-white disabled:opacity-50"
            style={{
              backgroundColor: '#7145D6',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
            }}
          >
            Enviar
          </Button>
        ) : !isCorrect ? (
          <Button
            onClick={() => {
              setSelectedOption(null);
              setShowResult(false);
            }}
            className="flex-1 rounded-full py-6 text-white"
            style={{
              backgroundColor: '#7145D6',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
            }}
          >
            Reintentar
          </Button>
        ) : null}
      </div>
    </div>
  );
}
