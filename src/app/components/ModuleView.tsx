import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Step0Content } from '@/app/components/Step0Content';
import { Step1Simulation } from '@/app/components/Step1Simulation';
import { Step2Question } from '@/app/components/Step2Question';
import { Step4Feedback } from '@/app/components/Step4Feedback';
import { ProgressBar } from '@/app/components/ProgressBar';

interface ModuleViewProps {
  moduleId: string;
  onBack: () => void;
}

const moduleInfo: Record<string, { title: string; context: string }> = {
  welcome: {
    title: 'Bienvenida e Introducción a Cabify',
    context: 'Como agente de Cabify, eres la primera línea de contacto con nuestros usuarios. Tu capacidad de transmitir confianza y claridad es fundamental para crear una experiencia positiva desde el primer momento.'
  },
  culture: {
    title: 'Cultura Organizacional y Valores',
    context: 'Los valores de Cabify (Empatía, Responsabilidad y Focus) no son solo palabras. Son la base de cada decisión que tomamos y cada interacción que tenemos con usuarios y conductores.'
  },
  structure: {
    title: 'Áreas Clave y Estructura',
    context: 'Cabify está organizado en áreas especializadas. Conocer la estructura te permite derivar casos correctamente y ofrecer soluciones más rápidas y profesionales.'
  },
  processes: {
    title: 'Procesos Operativos Básicos',
    context: 'Los procesos operativos están diseñados para garantizar seguridad, eficiencia y calidad en cada servicio. Seguir estos protocolos es esencial para mantener los estándares de Cabify.'
  },
  resources: {
    title: 'Recursos para tus funciones',
    context: 'El portal interno de agentes contiene toda la información, herramientas y recursos que necesitas para realizar tu trabajo de manera efectiva. Familiarízate con él.'
  },
  quiz: {
    title: 'Evaluación Interactiva',
    context: 'Esta evaluación te permite demostrar que has internalizado los conceptos clave y estás listo para aplicarlos en situaciones reales del día a día.'
  },
};

export function ModuleView({ moduleId, onBack }: ModuleViewProps) {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for content step
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState<any>(null);
  
  const totalSteps = 3; // Content + Simulation + Question
  const module = moduleInfo[moduleId] || moduleInfo.culture;

  const handleContentContinue = () => {
    setCurrentStep(1);
  };

  const handleSimulationAnswer = (answer: any, correct: boolean) => {
    setUserAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleQuestionAnswer = (answer: any, correct: boolean) => {
    setUserAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    if (isCorrect) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Module completed
        onBack();
      }
    }
  };

  // Step 0: Content - Don't show nav bar or progress
  if (currentStep === 0) {
    return (
      <Step0Content 
        moduleId={moduleId}
        onContinue={handleContentContinue}
        onClose={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E5E7EB]">
        <div className="mx-auto px-6 md:px-12 py-4" style={{ maxWidth: '1200px' }}>
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft 
              className="size-5 mr-2" 
              style={{ color: '#7145D6' }}
              strokeWidth={1.5}
            />
            <span style={{ color: '#7145D6', fontSize: '16px', fontWeight: 600 }}>
              Volver al Dashboard
            </span>
          </Button>
        </div>
      </div>

      {/* Progress Bar - Show steps 1 and 2 as steps 1 and 2 of 2 */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Content - Responsive Layout */}
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Mobile: Stacked Layout */}
        <div className="md:hidden">
          <div className="px-6 py-6">
            {/* Module Info */}
            <div className="mb-6">
              <h1 
                className="mb-3"
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#7145D6',
                  lineHeight: 1.3
                }}
              >
                {module.title}
              </h1>
              <p 
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#666666',
                  lineHeight: 1.5
                }}
              >
                {module.context}
              </p>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <Step1Simulation 
              moduleId={moduleId} 
              onAnswer={handleSimulationAnswer}
            />
          )}
          {currentStep === 2 && (
            <Step2Question 
              moduleId={moduleId} 
              onAnswer={handleQuestionAnswer}
            />
          )}
        </div>

        {/* Desktop: Split Screen Layout */}
        <div className="hidden md:grid md:grid-cols-[40%_60%] min-h-[calc(100vh-140px)]">
          {/* Left Column: Context & Scenario (40%) */}
          <div className="bg-[#F9F9F9] px-12 py-16 border-r border-[#E5E7EB]">
            <div className="sticky top-8">
              <h1 
                className="mb-4"
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#7145D6',
                  lineHeight: 1.3
                }}
              >
                {module.title}
              </h1>
              <p 
                className="mb-8"
                style={{
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#333333',
                  lineHeight: 1.6
                }}
              >
                {module.context}
              </p>

              {/* Progress Indicator */}
              <div 
                className="bg-white p-6 rounded-3xl border border-[#E5E7EB]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span 
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#666666'
                    }}
                  >
                    Progreso del Módulo
                  </span>
                  <span 
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#7145D6'
                    }}
                  >
                    {currentStep}/2
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`size-3 rounded-full ${currentStep >= 1 ? 'bg-[#7145D6]' : 'bg-[#E5E7EB]'}`}
                    />
                    <span 
                      style={{
                        fontSize: '14px',
                        fontWeight: currentStep === 1 ? 600 : 400,
                        color: currentStep >= 1 ? '#333333' : '#999999'
                      }}
                    >
                      Simulación
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className={`size-3 rounded-full ${currentStep >= 2 ? 'bg-[#7145D6]' : 'bg-[#E5E7EB]'}`}
                    />
                    <span 
                      style={{
                        fontSize: '14px',
                        fontWeight: currentStep === 2 ? 600 : 400,
                        color: currentStep >= 2 ? '#333333' : '#999999'
                      }}
                    >
                      Pregunta Interactiva
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Zone (60%) */}
          <div className="bg-white">
            {currentStep === 1 && (
              <Step1Simulation 
                moduleId={moduleId} 
                onAnswer={handleSimulationAnswer}
              />
            )}
            {currentStep === 2 && (
              <Step2Question 
                moduleId={moduleId} 
                onAnswer={handleQuestionAnswer}
              />
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <Step4Feedback 
          isCorrect={isCorrect}
          onClose={handleFeedbackClose}
          moduleId={moduleId}
          step={currentStep}
        />
      )}
    </div>
  );
}