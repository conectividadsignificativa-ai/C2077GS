/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Choice {
  id: string;
  text: string;
  nextSceneId?: string;
  impact?: {
    techSovereignty: number;
    socialConnectivity: number;
    innovation: number;
  };
  headline?: string;
  consequence?: string;
}

export interface Scene {
  id: string;
  title: string;
  narrative: string;
  voice: string;
  background: string;
  choices: Choice[];
  isFinalLevel1?: boolean;
}

export const LEVEL_1_SCENES: Scene[] = [
  {
    id: 'role-selection',
    title: 'Asignación de Rol',
    narrative: 'Bogotá, 2077. La niebla digital cubre los cerros orientales. Eres parte de la maquinaria que mantiene vivo el pulso del país. ¿Desde dónde observas el horizonte?',
    voice: 'Tu rol define cómo ves el futuro... pero no lo determina.',
    background: 'modern-office',
    choices: [
      {
        id: 'tech-leader',
        text: 'Líder de Innovación (Coworking)',
        nextSceneId: 'shock-exposure',
        impact: { innovation: 2, techSovereignty: 1, socialConnectivity: 0 }
      },
      {
        id: 'public-srv',
        text: 'Servidor Público (Oficina Institucional)',
        nextSceneId: 'shock-exposure',
        impact: { innovation: 0, techSovereignty: 2, socialConnectivity: 1 }
      },
      {
        id: 'rural-pioneer',
        text: 'Pionero Rural (Zona Conectada)',
        nextSceneId: 'shock-exposure',
        impact: { innovation: 1, techSovereignty: 0, socialConnectivity: 2 }
      },
      {
        id: 'hacktivist',
        text: 'Hacktivista Urbano (Distrito Zero)',
        nextSceneId: 'shock-exposure',
        impact: { innovation: 2, techSovereignty: -1, socialConnectivity: 2 }
      }
    ]
  },
  {
    id: 'shock-exposure',
    title: 'Exposición al Shock',
    narrative: 'Las pantallas parpadean. El sistema de transporte masivo se detiene. Un mensaje anónimo aparece en cada dispositivo: "La autonomía es una ilusión". El país está bajo un ataque de automatización forzada desde nodos externos.',
    voice: 'Esto ya está pasando. No es futuro. Es presente.',
    background: 'digital-chaos',
    choices: [
      {
        id: 'hack-analysis',
        text: 'Analizar el origen del hackeo',
        nextSceneId: 'negotiation-phase',
        impact: { innovation: 2, techSovereignty: 1, socialConnectivity: -1 }
      },
      {
        id: 'system-reboot',
        text: 'Intentar un reinicio manual de nodos locales',
        nextSceneId: 'call-to-action',
        impact: { innovation: 1, techSovereignty: 2, socialConnectivity: 0 }
      },
      {
        id: 'infiltrate',
        text: 'Infiltrar el flujo de datos: Seguir el rastro a la fuente',
        nextSceneId: 'negotiation-phase',
        impact: { innovation: 3, techSovereignty: 0, socialConnectivity: 1 }
      }
    ]
  },
  {
    id: 'negotiation-phase',
    title: 'Fase de Negociación',
    narrative: 'Has detectado una interfaz de comunicación abierta por el atacante. Es una IA de "Soberanía Corporativa" extranjera. Ofrecen reestablecer el sistema a cambio de los datos genéticos de la población rural.',
    voice: 'Toda tecnología tiene un precio. ¿Cuál estás dispuesto a pagar?',
    background: 'digital-chaos',
    choices: [
      {
        id: 'refuse-negotiate',
        text: 'Rechazar: No negociamos con algoritmos extractivos',
        nextSceneId: 'call-to-action',
        impact: { techSovereignty: 3, socialConnectivity: 1, innovation: -1 }
      },
      {
        id: 'counter-offer',
        text: 'Contraoferta: Ofrecer acceso a datos industriales no críticos',
        nextSceneId: 'call-to-action',
        impact: { techSovereignty: 1, socialConnectivity: 1, innovation: 2 }
      }
    ]
  },
  {
    id: 'call-to-action',
    title: 'Llamado a la Acción',
    narrative: 'El flujo de datos se congela. El tiempo parece detenerse mientras el país espera una respuesta. El pánico se extiende por las redes sociales, pero tú tienes la llave de una de las salidas.',
    voice: 'Tu decisión no es individual. Es parte de algo más grande.',
    background: 'semi-frozen',
    choices: [
      {
        id: 'collaborate',
        text: 'Colaborar: Abrir protocolos para defensa colectiva',
        nextSceneId: 'consequence',
        impact: { socialConnectivity: 3, innovation: 1, techSovereignty: 1 }
      },
      {
        id: 'protect',
        text: 'Protegerse: Blindar solo los activos críticos',
        nextSceneId: 'consequence',
        impact: { socialConnectivity: -2, innovation: 0, techSovereignty: 3 }
      },
      {
        id: 'do-nothing',
        text: 'No hacer nada: Dejar que el sistema se autorregule',
        nextSceneId: 'consequence',
        impact: { socialConnectivity: -3, innovation: -1, techSovereignty: -1 }
      },
      {
        id: 'mediate',
        text: 'Mediar: Usar la red ciudadana para un reinicio distribuido',
        nextSceneId: 'consequence',
        impact: { socialConnectivity: 4, innovation: 2, techSovereignty: 2 }
      }
    ]
  },
  {
    id: 'consequence',
    title: 'Consecuencia',
    narrative: 'El aire se aclara, pero el paisaje ha cambiado para siempre. Las huellas de tus actos están grabadas en los terminales de cada ciudadano.',
    voice: 'Esto ya pasó. La pregunta es... ¿cuándo dejamos de actuar?',
    background: 'consequence-view',
    isFinalLevel1: true,
    choices: [
      {
        id: 'to-level-2',
        text: 'Continuar hacia el futuro...',
        headline: 'Colombia Reporta Avance Histórico en Autonomía Digital',
        consequence: 'Lograste equilibrar la defensa con la apertura. El país ahora lidera la soberanía de datos en la región.'
      }
    ]
  }
];

export const SKILL_SPHERES = [
  { id: 's1', label: 'Soberanía Digital', color: 'text-blue-400' },
  { id: 's2', label: 'Conectividad Rural', color: 'text-green-400' },
  { id: 's3', label: 'IA Ética', color: 'text-purple-400' },
  { id: 's4', label: 'Ciberseguridad Ciudadana', color: 'text-red-400' },
  { id: 's5', label: 'Inclusión Algorítmica', color: 'text-yellow-400' },
  { id: 's6', label: 'Transparencia de Datos', color: 'text-cyan-400' },
  { id: 's7', label: 'Justicia Algorítmica', color: 'text-orange-400' },
  { id: 's8', label: 'Ecodigitalismo', color: 'text-emerald-400' }
];

export const REAL_HEADLINES = [
  "Ciberataques en Colombia aumentaron un 400% en el último año.",
  "La brecha digital en zonas rurales de Colombia sigue siendo del 30%.",
  "Colombia lanza la primera hoja de ruta nacional para la Inteligencia Artificial.",
  "El 70% de las empresas colombianas han sufrido incidentes de seguridad digital."
];
