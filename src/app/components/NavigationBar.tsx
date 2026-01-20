import { Car, User, Award } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';
import logoCabify from '/logo.svg';

interface NavigationBarProps {
  overallProgress: number;
  completedModules: number;
  totalModules: number;
}

export function NavigationBar({ overallProgress, completedModules, totalModules }: NavigationBarProps) {
  return (
    <nav className="w-full bg-white border-b border-[#E5E7EB]">
      <div className="mx-auto px-6 md:px-12 py-4" style={{ maxWidth: '1200px' }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logoCabify} // <--- Usa el nombre de la variable que importaste
              alt="Logo Cabify"
              className="h-5 w-auto"
              style={{
                display: 'inline-block',
                height: '24px',
                verticalAlign: 'middle'
              }}
            />
            <span 
              className="hidden md:inline text-[#666666]"
              style={{
                fontSize: '16px',
                fontWeight: 400
              }}
            >
              Learning Hub
            </span>
          </div>

          {/* Right Side - User Profile & Progress */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Progress Summary (Desktop Only) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex flex-col">
                <span 
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#666666',
                    lineHeight: 1.2
                  }}
                >
                  Progreso
                </span>
              </div>
              <div className="w-24">
                <Progress value={overallProgress} className="h-2" />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[#EAE6F5] p-2 rounded-full">
                <User className="size-5 text-[#7145D6]" strokeWidth={1.5} />
              </div>
              <span 
                className="hidden md:inline"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#333333'
                }}
              >
                Agente
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
