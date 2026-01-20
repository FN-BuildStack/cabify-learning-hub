import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { 
  Sparkles, 
  Heart, 
  Building2, 
  ClipboardList, 
  FolderOpen, 
  FileQuestion,
  CheckCircle2
} from 'lucide-react';
import { NavigationBar } from '@/app/components/NavigationBar';

interface DashboardProps {
  onSelectModule: (moduleId: string) => void;
}

const initialModules = [
  { 
    id: 'welcome', 
    title: 'Bienvenida e Introducción a Cabify', 
    icon: Sparkles,
    completed: false,
    duration: '10 min',
    description: 'Conoce la misión y visión de Cabify'
  },
  { 
    id: 'culture', 
    title: 'Cultura Organizacional y Valores', 
    icon: Heart,
    completed: true,
    duration: '15 min',
    description: 'Aprende nuestros valores fundamentales'
  },
  { 
    id: 'structure', 
    title: 'Áreas Clave y Estructura', 
    icon: Building2,
    completed: false,
    duration: '12 min',
    description: 'Entiende la organización interna'
  },
  { 
    id: 'processes', 
    title: 'Procesos Operativos Básicos', 
    icon: ClipboardList,
    completed: false,
    duration: '20 min',
    description: 'Domina los procedimientos esenciales'
  },
];

const weeklyModules = [
  { 
    id: 'resources', 
    title: 'Recursos para tus funciones', 
    icon: FolderOpen,
    completed: false,
    duration: '8 min',
    description: 'Accede a herramientas y documentación'
  },
  { 
    id: 'quiz', 
    title: 'Evaluación Interactiva (Quiz)', 
    icon: FileQuestion,
    completed: false,
    duration: '10 min',
    description: 'Demuestra tus conocimientos'
  },
];

export function Dashboard({ onSelectModule }: DashboardProps) {
  const completedModules = [...initialModules, ...weeklyModules].filter(m => m.completed).length;
  const totalModules = initialModules.length + weeklyModules.length;
  const overallProgress = (completedModules / totalModules) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <NavigationBar 
        overallProgress={overallProgress}
        completedModules={completedModules}
        totalModules={totalModules}
      />

      {/* Main Content */}
      <div className="mx-auto px-6 md:px-12 py-8 md:py-16" style={{ maxWidth: '1200px' }}>
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <h1 
            className="mb-3 md:mb-4"
            style={{
              fontSize: 'clamp(24px, 5vw, 40px)',
              fontWeight: 700,
              color: '#7145D6',
              lineHeight: 1.2
            }}
          >
            Hola, Agente
          </h1>
          <p 
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 400,
              color: '#666666',
              lineHeight: 1.5,
              maxWidth: '600px'
            }}
          >
            Bienvenido a tu portal de aprendizaje. Aquí encontrarás todo lo necesario para ser un excelente agente de Cabify.
          </p>
        </div>

        {/* Módulos Iniciales Section */}
        <div className="mb-12 md:mb-16">
          <h2 
            className="mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: 600,
              color: '#333333',
              lineHeight: 1.3
            }}
          >
            Módulos Iniciales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {initialModules.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className="cursor-pointer transition-all hover:shadow-xl border group"
                  style={{
                    borderRadius: '24px',
                    borderColor: '#F3F4F6',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Icon/Image at Top */}
                    <div className="mb-6">
                      <div 
                        className="p-4 rounded-2xl inline-flex transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: module.completed ? '#E6F7F2' : '#EAE6F5'
                        }}
                      >
                        <Icon 
                          className="size-8 md:size-10"
                          style={{
                            color: module.completed ? '#00CC96' : '#7145D6'
                          }}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Title and Tags in Middle */}
                    <div className="flex-1 mb-6">
                      <h3 
                        className="mb-3"
                        style={{
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#333333',
                          lineHeight: 1.4
                        }}
                      >
                        {module.title}
                      </h3>
                      <p 
                        className="mb-4"
                        style={{
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#666666',
                          lineHeight: 1.5
                        }}
                      >
                        {module.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span 
                          className="bg-[#F9F9F9] px-3 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#666666'
                          }}
                        >
                          ⏱ {module.duration}
                        </span>
                        {module.completed && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="size-4 text-[#00CC96]" strokeWidth={2} />
                            <span 
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#00CC96'
                              }}
                            >
                              Completado
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Button at Bottom */}
                    <Button
                      className="w-full rounded-full py-6 text-white"
                      style={{
                        backgroundColor: module.completed ? '#00CC96' : '#7145D6',
                        fontSize: '16px',
                        fontWeight: 600,
                        boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
                      }}
                    >
                      {module.completed ? 'Revisar' : 'Comenzar'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Módulos Semanales Section */}
        <div>
          <h2 
            className="mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: 600,
              color: '#333333',
              lineHeight: 1.3
            }}
          >
            Módulos Semanales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {weeklyModules.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className="cursor-pointer transition-all hover:shadow-xl border group"
                  style={{
                    borderRadius: '24px',
                    borderColor: '#F3F4F6',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Icon/Image at Top */}
                    <div className="mb-6">
                      <div 
                        className="p-4 rounded-2xl inline-flex transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: module.completed ? '#E6F7F2' : '#EAE6F5'
                        }}
                      >
                        <Icon 
                          className="size-8 md:size-10"
                          style={{
                            color: module.completed ? '#00CC96' : '#7145D6'
                          }}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Title and Tags in Middle */}
                    <div className="flex-1 mb-6">
                      <h3 
                        className="mb-3"
                        style={{
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#333333',
                          lineHeight: 1.4
                        }}
                      >
                        {module.title}
                      </h3>
                      <p 
                        className="mb-4"
                        style={{
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#666666',
                          lineHeight: 1.5
                        }}
                      >
                        {module.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span 
                          className="bg-[#F9F9F9] px-3 py-1 rounded-full"
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#666666'
                          }}
                        >
                          ⏱ {module.duration}
                        </span>
                        {module.completed && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="size-4 text-[#00CC96]" strokeWidth={2} />
                            <span 
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#00CC96'
                              }}
                            >
                              Completado
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Button at Bottom */}
                    <Button
                      className="w-full rounded-full py-6 text-white"
                      style={{
                        backgroundColor: module.completed ? '#00CC96' : '#7145D6',
                        fontSize: '16px',
                        fontWeight: 600,
                        boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
                      }}
                    >
                      {module.completed ? 'Revisar' : 'Comenzar'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
