/* Carga inicial de páginas con el contenido institucional. Uso: npm run seed (no duplica páginas existentes). */
import config from '@payload-config'
import { getPayload } from 'payload'

const text = (t: string, format = 0) => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })
const base = { direction: 'ltr', format: '', indent: 0, version: 1 }
const p = (...c: string[]) => ({ type: 'paragraph', children: c.map((t) => text(t)), textFormat: 0, ...base })
const bold = (t: string) => text(t, 1)
const pm = (...c: any[]) => ({ type: 'paragraph', children: c, textFormat: 0, ...base })
const h = (tag: 'h2' | 'h3', t: string) => ({ type: 'heading', tag, children: [text(t)], ...base })
const list = (items: string[], ordered = false) => ({
  type: 'list', listType: ordered ? 'number' : 'bullet', start: 1, tag: ordered ? 'ol' : 'ul',
  children: items.map((t, i) => ({ type: 'listitem', value: i + 1, children: [text(t)], ...base })), ...base,
})
const block = (blockType: string, fields: Record<string, unknown>) => ({
  type: 'block', fields: { id: Math.random().toString(36).slice(2, 12), blockName: '', blockType, ...fields }, format: '', version: 2,
})
const doc = (...children: any[]) => ({ root: { type: 'root', children, ...base } })

const pages = [
  {
    slug: 'nosotros', title: 'Nosotros', subtitle: 'Forjadores de un gran futuro: mentes curiosas y corazones compasivos.',
    metaDescription: 'Misión, visión y enfoque pedagógico constructivista de Exploradores del Saber en Valledupar.',
    content: doc(
      h('h2', 'Nuestra esencia'),
      p('Nutrimos mentes curiosas y corazones compasivos, combinando la excelencia académica con un profundo desarrollo humano, en un entorno seguro e inspirador.'),
      h('h2', 'Horizonte institucional'),
      p('Nuestro enfoque pedagógico es constructivista y se centra en el desarrollo integral de los niños en preescolar y primaria. Promovemos una educación activa donde el aprendizaje parte de:'),
      list(['La exploración del entorno', 'El juego y la creatividad', 'La vivencia directa con la naturaleza']),
      p('Formamos individuos sensibles, autónomos, críticos y comprometidos con el cuidado del mundo que los rodea.'),
      h('h2', 'Misión'),
      p('Formar niños y niñas autónomos, empáticos y cooperativos, capaces de construir su propio aprendizaje mediante la exploración, el juego y la experiencia.'),
      list(['Desarrollo integral: cognitivo, socioafectivo, psicomotor y espiritual.', 'Estrategias lúdicas, artísticas y de investigación.', 'Fortalecimiento de la creatividad, la comunicación y la responsabilidad consigo mismos y con su entorno.']),
      h('h2', 'Visión 2030'),
      p('Consolidarnos para el año 2030 como una institución reconocida por promover el aprendizaje significativo y el desarrollo integral en educación inicial y primaria.'),
      list(['Curiosidad, autonomía, creatividad y trabajo cooperativo como ejes de la construcción del conocimiento.', 'Fortalecer la empatía, el pensamiento crítico y el compromiso con el entorno.', 'Ambientes afectivos y seguros: aprender haciendo, reflexionando y compartiendo.', 'Preparar a los niños para los retos del siglo XXI con confianza y responsabilidad.']),
      block('button', { label: 'Conocer nuestros servicios', url: '/servicios', style: 'gold' }),
    ),
  },
  {
    slug: 'servicios', title: 'Servicios', subtitle: 'Escoge el servicio que mejor acompaña la etapa de tu hijo.',
    metaDescription: 'Educación preescolar (Párvulos, Pre-Jardín, Jardín y Transición) y refuerzo escolar en Valledupar.',
    content: doc(
      h('h2', 'Educación preescolar'),
      pm(text('Programa completo para la primera infancia: '), bold('Párvulos, Pre-Jardín, Jardín y Transición'), text('. Enfoque lúdico y constructivista orientado al desarrollo de habilidades motoras, sociales y cognitivas.')),
      h('h2', 'Apoyo y refuerzos'),
      p('Apoyo escolar personalizado para que cada estudiante alcance su máximo potencial. Ideal para nivelación o para avanzar en habilidades específicas.'),
      h('h3', 'Características destacadas'),
      list(['Desarrollo de pensamiento lógico y creatividad.', 'Horarios adaptados por edad.', 'Metodología centrada en el estudiante.', 'Refuerzos en materias clave (Matemáticas, Lenguaje).', 'Campamentos de verano (talleres y actividades lúdicas).', 'Sesiones personalizadas y seguimiento.']),
      block('callout', { tone: 'gold', title: 'Inscripciones abiertas', text: 'Agenda una visita guiada y conoce nuestro espacio.' }),
      block('button', { label: 'Ver requisitos de matrícula', url: '/requisitos', style: 'primary' }),
    ),
  },
  {
    slug: 'requisitos', title: 'Requisitos de matrícula', subtitle: 'Documentación que deben presentar padres, acudientes o representantes legales.',
    metaDescription: 'Documentos necesarios para matricular a tu hijo en Exploradores del Saber.',
    content: doc(
      h('h2', 'Documentación requerida'),
      list(['Copia legible del Registro Civil de Nacimiento o Permiso de Protección Temporal (PPT) del estudiante.', 'Copia ampliada al 150 % de la cédula de ciudadanía de los padres o acudientes.', 'Carné de vacunación actualizado.', 'Certificado de afiliación vigente al sistema de salud (ADRES).', 'Copia del carné de crecimiento y desarrollo (preescolar y primaria).', 'Fotografía digital reciente, fondo blanco, tamaño 3x4 cm.', 'Certificado médico de salud general del estudiante.', 'Informes psicopedagógicos o de apoyo profesional.', 'Carpeta tamaño oficio plastificada (de cartón), del color según el grado.'], true),
      h('h2', 'Color de la carpeta según el grado'),
      list(['Párvulo: azul', 'Pre-Jardín: roja', 'Jardín: amarilla', 'Transición: verde']),
      block('callout', { tone: 'info', title: '¿Cómo solicito un cupo?', text: '1) Contáctanos para agendar una visita guiada. 2) Entrevista con la dirección. 3) Entrega de documentación y matrícula.' }),
      block('button', { label: 'Agendar visita', url: '/contacto', style: 'gold' }),
    ),
  },
  {
    slug: 'faqs', title: 'Preguntas frecuentes', subtitle: 'Resolvemos las dudas más comunes de las familias.',
    metaDescription: 'Enfoque pedagógico, niveles, inglés, proceso de cupo y horarios de Exploradores del Saber.',
    content: doc(
      h('h2', 'Enfoque y programas académicos'),
      h('h3', '¿Cuál es el enfoque pedagógico principal?'),
      p('Constructivista: el estudiante está en el centro del aprendizaje. Se fomenta la curiosidad, el pensamiento crítico y la exploración activa, para formar solucionadores de problemas y no solo receptores de información.'),
      h('h3', '¿Qué niveles educativos ofrecen?'),
      p('Preescolar (Párvulos, Pre-Jardín, Jardín y Transición), refuerzo escolar y Básica Primaria (1° a 5°).'),
      h('h3', '¿Cómo integran el inglés?'),
      p('Con énfasis en inglés desde Preescolar mediante inmersión lúdica, desarrollando fluidez y uso del idioma en áreas como tecnología y ciencia.'),
      h('h2', 'Información práctica y logística'),
      h('h3', '¿Cómo es el proceso para solicitar un cupo?'),
      list(['Contactar para agendar una visita guiada.', 'Entrevista con la dirección.', 'Documentación y matrícula.'], true),
      h('h3', '¿Ofrecen refuerzos escolares o programas de vacaciones?'),
      p('Es un servicio que estamos organizando. Escríbenos para conocer la disponibilidad.'),
      h('h3', '¿Cuáles son los horarios de Preescolar? (lunes a viernes)'),
      list(['Párvulos y Pre-Jardín: 7:45 a.m. – 12:00 m.', 'Jardín y Transición: 7:15 a.m. – 12:15 p.m.']),
      block('button', { label: 'Escríbenos', url: '/contacto', style: 'primary' }),
    ),
  },
  {
    slug: 'contacto', title: 'Contacto', subtitle: 'Visítanos, escríbenos o llámanos. Con gusto te mostramos nuestro espacio.',
    metaDescription: 'Dirección, teléfono, correo y horarios de Exploradores del Saber en Valledupar.',
    content: doc(
      h('h2', 'Datos de contacto'),
      list(['Dirección: Urb. Casa Carmelo Etapa II, Manzana C Casa 1, Valledupar', 'Celular: 311 740 5949', 'Correo: exploradoresdelsaber@gmail.com']),
      h('h2', 'Horarios (lunes a viernes)'),
      list(['Párvulos y Pre-Jardín: 7:45 a.m. – 12:00 m.', 'Jardín y Transición: 7:15 a.m. – 12:15 p.m.']),
      block('button', { label: 'Escríbenos por correo', url: 'mailto:exploradoresdelsaber@gmail.com', style: 'gold' }),
    ),
  },
]

const payload = await getPayload({ config })

let created = 0
for (const page of pages) {
  const exists = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1, overrideAccess: true })
  if (exists.totalDocs) { console.log(`= ${page.slug} ya existe`); continue }
  await payload.create({ collection: 'pages', data: { ...page, _status: 'published' } as any })
  created++
  console.log(`+ ${page.slug}`)
}
// Solo en la primera carga: no pisar lo que el admin edite después
if (created) await payload.updateGlobal({ slug: 'site-settings', data: { email: 'exploradoresdelsaber@gmail.com', phone: '311 740 5949', enrollmentOpen: true } })
console.log('Listo.')
process.exit(0)
