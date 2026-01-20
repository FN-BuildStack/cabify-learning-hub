import { Heart, Shield, Target } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';

interface Screen2ValuesProps {
  onNext: () => void;
  onBack: () => void;
}

const values = [
  {
    icon: Heart,
    title: 'Empatía',
    description: 'Entendemos las necesidades de nuestros usuarios y actuamos con sensibilidad.',
    highlight: false,
  },
  {
    icon: Shield,
    title: 'Responsabilidad',
    description: 'Protegemos los datos personales y cumplimos con GDPR. Este es nuestro compromiso.',
    highlight: true,
  },
  {
    icon: Target,
    title: 'Focus',
    description: 'Nos enfocamos en resolver cada caso de manera eficiente y profesional.',
    highlight: false,
  },
];

export function Screen2Values({ onNext, onBack }: Screen2ValuesProps) {
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
          Nuestros Valores
        </h1>
        <p 
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.5
          }}
        >
          En Cabify, estos valores guían cada decisión que tomamos
        </p>
      </div>

      {/* Values Cards */}
      <div className="flex-1 space-y-4 mb-8">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <Card
              key={index}
              className={`border-0 ${
                value.highlight 
                  ? 'bg-[#EAE6F5] ring-2 ring-[#7145D6]' 
                  : 'bg-white'
              }`}
              style={{
                borderRadius: '24px',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div 
                    className={`p-3 rounded-2xl ${
                      value.highlight ? 'bg-[#7145D6]' : 'bg-[#F9F9F9]'
                    }`}
                  >
                    <Icon 
                      className={`size-6 ${
                        value.highlight ? 'text-white' : 'text-[#7145D6]'
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="mb-2"
                      style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: value.highlight ? '#7145D6' : '#333333',
                        lineHeight: 1.3
                      }}
                    >
                      {value.title}
                    </h3>
                    <p 
                      style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#333333',
                        lineHeight: 1.5
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
