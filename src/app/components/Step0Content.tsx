import { Button } from '@/app/components/ui/button';
import { X, Download, FileText } from 'lucide-react'; 

interface Step0ContentProps {
  moduleId: string;
  onContinue: () => void;
  onClose: () => void;
}

const moduleContent: Record<string, any> = {
  welcome: {
    title: 'Bienvenida e Introducción a Cabify',
    contentType: 'video',
    src: '/video_1.mp4', 
    summary: 'En este módulo aprenderás los fundamentos de Cabify: nuestra misión de hacer que las ciudades sean mejores lugares para vivir, nuestra visión de transformar la movilidad urbana, y cómo tu rol como agente es fundamental para cumplir estos objetivos.',
  },
  culture: {
    title: 'Cultura Organizacional y Valores',
    contentType: 'pdf',
    src: '/document_1.pdf', // CORREGIDO: Usar / no \
    summary: 'Los valores de Cabify (Empatía, Responsabilidad y Focus) guían cada decisión que tomamos. En este contenido verás casos reales de cómo estos valores se traducen en acciones concretas que benefician a usuarios, conductores y la comunidad.',
  },
  structure: {
    title: 'Áreas Clave y Estructura',
    contentType: 'pdf',
    src: '/document_2.pdf', // CORREGIDO
    summary: 'Cabify está organizado en diferentes áreas especializadas: Soporte, Operaciones, Finanzas, Tecnología y más. Conocer esta estructura te permite derivar casos correctamente y trabajar de manera más eficiente con otros equipos.',
  },
  processes: {
    title: 'Procesos Operativos Básicos',
    contentType: 'video',
    src: '/video_2.mp4',
    summary: 'Los procesos operativos de Cabify están diseñados para garantizar seguridad, eficiencia y calidad. Aquí verás los protocolos esenciales que debes seguir en tu día a día, desde atención al cliente hasta resolución de incidencias.',
  },
  resources: {
    title: 'Recursos para tus funciones',
    contentType: 'pdf',
    src: '/document_4.pdf', // CORREGIDO
    summary: 'El portal interno de agentes contiene herramientas, documentación y recursos actualizados. En este módulo aprenderás a navegar el portal, encontrar información rápidamente y usar las herramientas disponibles para resolver casos de manera efectiva.',
  },
  quiz: {
    title: 'Evaluación Interactiva',
    contentType: 'pdf',
    src: '/document_5.pdf', // CORREGIDO
    summary: 'Este quiz integra todo lo aprendido en los módulos anteriores. Es tu oportunidad para demostrar que has internalizado los conceptos clave y estás preparado para aplicarlos en situaciones reales del día a día.',
  },
};

export function Step0Content({ moduleId, onContinue, onClose }: Step0ContentProps) {
  const content = moduleContent[moduleId] || moduleContent.culture;
  const isVideo = content.contentType === 'video';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
        <h1 
          style={{
            fontSize: 'clamp(18px, 3vw, 20px)',
            fontWeight: 600,
            color: '#7145D6',
            lineHeight: 1.3
          }}
        >
          {content.title}
        </h1>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X className="size-6 text-[#666666]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
        
        {/* LÓGICA DE VISUALIZACIÓN */}
        {isVideo ? (
          // === MODO VIDEO (Mantiene aspect-video horizontal) ===
          <div className="w-full aspect-video bg-black rounded-3xl mb-8 flex items-center justify-center border border-[#E5E7EB] overflow-hidden shadow-sm">
            <video 
              className="w-full h-full object-cover"
              controls
              src={content.src}
            >
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        ) : (
          // === MODO PDF (Altura vertical + Botón descarga) ===
          <div className="mb-8 space-y-4">
            {/* Barra de herramientas del PDF */}
            <div className="flex items-center justify-between bg-[#F0F0F5] p-4 rounded-2xl border border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <FileText className="size-5 text-[#7145D6]" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Documento PDF</span>
              </div>
              <a 
                href={content.src} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-[#7145D6] hover:bg-white px-4 py-2 rounded-full transition-all"
              >
                <Download className="size-4" />
                Descargar
              </a>
            </div>

            {/* Contenedor del PDF (Iframe) */}
            <div className="w-full bg-[#525659] rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-md relative">
              {/* 1. En Móvil (block md:hidden): Mostramos un placeholder bonito, NO el iframe, 
                     porque los iframes de PDF en móvil son terribles (no hacen scroll bien).
              */}
              <div className="block md:hidden p-8 text-center bg-[#F9F9F9]">
                <FileText className="size-16 text-[#CCCCCC] mx-auto mb-4" strokeWidth={1} />
                <p className="text-gray-600 mb-6">Para una mejor lectura en móvil, te recomendamos abrir el documento externamente.</p>
                <a 
                  href={content.src}
                  target="_blank"
                  rel="noopener noreferrer" 
                >
                  <Button className="bg-[#7145D6] hover:bg-[#5d37b8] text-white rounded-full w-full">
                    Abrir Documento
                  </Button>
                </a>
              </div>

              {/* 2. En Desktop (hidden md:block): Mostramos el iframe ALTO (h-[700px]) 
              */}
              <iframe 
                src={content.src}
                className="hidden md:block w-full h-[700px]" 
                title="Visor de Documento"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        )}

        {/* Summary Text */}
        <div 
          className="bg-[#F9F9F9] p-6 md:p-8 rounded-3xl mb-8 border border-[#E5E7EB]"
        >
          <h3 
            className="mb-4"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#333333',
              lineHeight: 1.4
            }}
          >
            Resumen del Módulo
          </h3>
          <p 
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#333333',
              lineHeight: 1.6
            }}
          >
            {content.summary}
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onContinue}
          className="w-full rounded-full py-6 md:py-7 text-white"
          style={{
            backgroundColor: '#7145D6',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0px 4px 12px rgba(113, 69, 214, 0.2)'
          }}
        >
          ir a la Práctica
        </Button>
      </div>
    </div>
  );
}