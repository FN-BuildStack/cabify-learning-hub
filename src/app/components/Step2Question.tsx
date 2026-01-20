import { useState } from 'react';

interface Step2QuestionProps {
  moduleId: string;
  onAnswer: (answer: any, isCorrect: boolean) => void;
}

// Different questions for each module
const questions: Record<string, any> = {
  welcome: {
    question: '¿Cuál es el valor más importante al dar la bienvenida a un nuevo usuario?',
    options: [
      { id: 1, text: 'Ser rápido', correct: false },
      { id: 2, text: 'Ser empático y claro', correct: true },
      { id: 3, text: 'Enviar muchos enlaces', correct: false },
    ],
  },
  culture: {
    question: '¿Por qué es importante proteger los datos personales de los conductores?',
    options: [
      { id: 1, text: 'Por cumplimiento legal (GDPR) y seguridad', correct: true },
      { id: 2, text: 'Porque los conductores lo piden', correct: false },
      { id: 3, text: 'Para evitar quejas', correct: false },
    ],
  },
  structure: {
    question: '¿Qué área se encarga de resolver problemas de facturación?',
    options: [
      { id: 1, text: 'Soporte Técnico', correct: false },
      { id: 2, text: 'Finanzas', correct: true },
      { id: 3, text: 'Recursos Humanos', correct: false },
    ],
  },
  processes: {
    question: '¿Qué es lo primero en una situación de seguridad del usuario?',
    options: [
      { id: 1, text: 'Completar el viaje', correct: false },
      { id: 2, text: 'Proteger al usuario inmediatamente', correct: true },
      { id: 3, text: 'Investigar al conductor', correct: false },
    ],
  },
  resources: {
    question: '¿Dónde deben buscar los agentes información sobre políticas internas?',
    options: [
      { id: 1, text: 'En internet', correct: false },
      { id: 2, text: 'En el portal interno de Agentes', correct: true },
      { id: 3, text: 'Preguntando a compañeros', correct: false },
    ],
  },
  quiz: {
    question: '¿Cuál es el protocolo correcto ante una solicitud urgente?',
    options: [
      { id: 1, text: 'Derivar inmediatamente', correct: false },
      { id: 2, text: 'Evaluar la urgencia y actuar según protocolo', correct: true },
      { id: 3, text: 'Responder lo más rápido posible sin pensar', correct: false },
    ],
  },
};

export function Step2Question({ moduleId, onAnswer }: Step2QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const question = questions[moduleId] || questions.culture;

  const handleSelectOption = (optionId: number) => {
    setSelectedOption(optionId);
    const selected = question.options.find((opt: any) => opt.id === optionId);
    if (selected) {
      setTimeout(() => {
        onAnswer(selected, selected.correct);
      }, 300);
    }
  };

  return (
    <div className="h-full md:min-h-[calc(100vh-140px)] px-6 md:px-12 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 
          className="mb-2"
          style={{
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: 600,
            color: '#7145D6',
            lineHeight: 1.3
          }}
        >
          Paso 2: Pregunta Interactiva
        </h2>
        <p 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          Refuerza lo aprendido
        </p>
      </div>

      {/* Question Card */}
      <div 
        className="bg-white p-6 md:p-8 rounded-3xl mb-6 border border-[#E5E7EB]"
      >
        <p 
          className="mb-6 md:mb-8"
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#333333',
            lineHeight: 1.5
          }}
        >
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-3 md:space-y-4">
          {question.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 md:p-5 rounded-full transition-all ${
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
    </div>
  );
}