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
      h('h2', 'Visión 2035'),
      p('Exploradores del Saber proyecta consolidarse para el año 2035 como una institución reconocida por promover el aprendizaje significativo y el desarrollo integral de los niños y niñas en la educación inicial y primaria.'),
      p('Será un espacio donde la curiosidad, la autonomía, la creatividad y el trabajo cooperativo orienten la construcción del conocimiento, fortaleciendo en cada estudiante la empatía, el pensamiento crítico y el compromiso con su entorno.'),
      p('A través de ambientes afectivos y seguros, formaremos niños y niñas capaces de aprender haciendo, reflexionando y compartiendo, preparados para enfrentar con confianza y responsabilidad los retos del siglo XXI.'),
      block('button', { label: 'Conocer nuestros servicios', url: '/servicios', style: 'gold' }),
    ),
  },
  {
    slug: 'servicios', title: 'Servicios', subtitle: 'Escoge el servicio que mejor acompaña la etapa de tu hijo.',
    metaDescription: 'Educación preescolar (Párvulos, Pre-Jardín, Jardín y Transición) en Valledupar.',
    content: doc(
      h('h2', 'Educación preescolar'),
      pm(text('Programa completo para la primera infancia: '), bold('Párvulos, Pre-Jardín, Jardín y Transición'), text('. Enfoque lúdico y constructivista orientado al desarrollo de habilidades motoras, sociales y cognitivas.')),
      h('h3', 'Características destacadas'),
      list(['Desarrollo de pensamiento lógico y creatividad.', 'Horarios adaptados por edad.', 'Metodología centrada en el estudiante.', 'Campamentos de verano (talleres y actividades lúdicas).']),
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
      block('folderColors', { items: [
        { grade: 'Párvulo', folder: 'azul' }, { grade: 'Pre-Jardín', folder: 'roja' },
        { grade: 'Jardín', folder: 'amarilla' }, { grade: 'Transición', folder: 'verde' },
      ] }),
      block('callout', { tone: 'info', title: '¿Cómo solicito un cupo?', text: '1) Contáctanos para agendar una visita guiada. 2) Entrevista con la dirección. 3) Entrega de documentación y matrícula.' }),
      block('button', { label: 'Agendar visita', url: '/contacto', style: 'gold' }),
    ),
  },
  {
    slug: 'faqs', title: 'Preguntas frecuentes', subtitle: 'Resolvemos las dudas más comunes de las familias.',
    metaDescription: 'Enfoque pedagógico, niveles, inglés, proceso de cupo y horarios de Exploradores del Saber.',
    content: doc(
      h('h2', 'Enfoque y programas académicos'),
      block('accordion', { items: [
        { question: '¿Cuál es el enfoque pedagógico principal?', answer: 'Constructivista: el estudiante está en el centro del aprendizaje. Se fomenta la curiosidad, el pensamiento crítico y la exploración activa, para formar solucionadores de problemas y no solo receptores de información.' },
        { question: '¿Qué niveles educativos ofrecen?', answer: 'Preescolar (Párvulos, Pre-Jardín, Jardín y Transición). La Básica Primaria (1° a 5°) estará disponible próximamente.' },
        { question: '¿Cómo integran el inglés?', answer: 'Con énfasis en inglés desde Preescolar mediante inmersión lúdica, desarrollando fluidez y uso del idioma en áreas como tecnología y ciencia.' },
      ] }),
      h('h2', 'Información práctica y logística'),
      block('accordion', { items: [
        { question: '¿Cómo es el proceso para solicitar un cupo?', answer: '1) Contactar para agendar una visita guiada.\n2) Entrevista con la dirección.\n3) Documentación y matrícula.' },
        { question: '¿Cuáles son los datos de contacto y la ubicación?', answer: 'Correo: exploradoresdelsaber@gmail.com\nCelular: 311 740 5949\nDirección: Urb. Casa Carmelo Etapa II, Manzana C Casa 1, Valledupar.' },
        { question: '¿Cuáles son los horarios de Preescolar? (lunes a viernes)', answer: 'Párvulos y Pre-Jardín: 7:45 a.m. – 12:00 m.\nJardín y Transición: 7:15 a.m. – 12:15 p.m.' },
      ] }),
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
if (!(await payload.count({ collection: 'posts' })).totalDocs) {
  await payload.create({
    collection: 'posts',
    data: {
      title: 'Inscripciones abiertas en Exploradores del Saber',
      excerpt: 'Conoce nuestros niveles de preescolar y cómo solicitar un cupo para tu hijo.',
      category: 'familias',
      publishedAt: new Date().toISOString(),
      _status: 'published',
      content: doc(
        p('En Exploradores del Saber formamos niños curiosos, autónomos y comprometidos con el cuidado del mundo que los rodea, a través de la exploración, el juego y la experiencia.'),
        h('h2', 'Nuestros servicios'),
        list(['Educación preescolar: Párvulos, Pre-Jardín, Jardín y Transición.', 'Básica Primaria (1° a 5°): próximamente.']),
        block('callout', { tone: 'gold', title: '¿Cómo solicitar un cupo?', text: 'Agenda una visita guiada, conversa con la dirección y presenta la documentación de matrícula.' }),
        block('button', { label: 'Ver requisitos de matrícula', url: '/requisitos', style: 'primary' }),
      ),
    } as any,
  })
  console.log('+ entrada de bienvenida')
}
if (!(await payload.count({ collection: 'levels' })).totalDocs) {
  const hl = (...t: string[]) => t.map((text) => ({ text }))
  const pre = [
    { title: 'Párvulos', badge: '01', subtitle: 'Primeros pasos', summary: 'Ambiente seguro y estimulante donde los niños aprenden a través del juego, las artes y la exploración sensorial.', highlights: hl('Exploración sensorial', 'Juego y artes', 'Ambiente seguro y estimulante'), schedule: 'Lunes a viernes · 7:45 a.m. – 12:00 m.', folder: 'azul' },
    { title: 'Pre-Jardín', badge: '02', subtitle: 'Explorar y crear', summary: 'Seguimos aprendiendo a través del juego, las artes y la exploración, fortaleciendo habilidades motoras, sociales y cognitivas.', highlights: hl('Habilidades motoras y sociales', 'Enfoque lúdico y constructivista', 'Creatividad y expresión'), schedule: 'Lunes a viernes · 7:45 a.m. – 12:00 m.', folder: 'roja' },
    { title: 'Jardín', badge: '03', subtitle: 'Bases para crecer', summary: 'Formación integral que fortalece las bases académicas y sociales, preparando a grandes ciudadanos.', highlights: hl('Pensamiento lógico y creatividad', 'Metodología centrada en el estudiante', 'Inglés con inmersión lúdica'), schedule: 'Lunes a viernes · 7:15 a.m. – 12:15 p.m.', folder: 'amarilla' },
    { title: 'Transición', badge: '04', subtitle: 'Hacia la primaria', summary: 'Consolidamos las bases académicas y sociales para dar el paso a la primaria con confianza y autonomía.', highlights: hl('Formación integral', 'Pensamiento crítico y autonomía', 'Inglés con inmersión lúdica'), schedule: 'Lunes a viernes · 7:15 a.m. – 12:15 p.m.', folder: 'verde' },
  ]
  const prim = [{
    title: 'Básica Primaria', badge: '1° – 5°', subtitle: 'Próximamente',
    summary: 'Estamos preparando este nivel con el mismo enfoque constructivista. Muy pronto compartiremos toda la información.',
    highlights: [],
  }]
  let n = 0
  for (const l of pre) await payload.create({ collection: 'levels', data: { ...l, stage: 'preescolar', order: ++n, active: true } as any })
  for (const l of prim) await payload.create({ collection: 'levels', data: { ...l, stage: 'primaria', order: ++n, active: true } as any })
  console.log('+ niveles (preescolar y primaria)')
}
const gal = await payload.findGlobal({ slug: 'gallery' })
if (!gal.items?.length) {
  await payload.updateGlobal({
    slug: 'gallery',
    data: {
      show: true, eyebrow: 'Galería', title: 'Momentos que inspiran',
      intro: 'Un recorrido por la forma en que exploramos, jugamos y aprendemos cada día.', layout: 'mosaic',
      items: [
        { caption: 'Ciencia en el aula', detail: 'Experimentos para preguntar, observar y descubrir.' },
        { caption: 'Hora de lectura', detail: 'Historias que despiertan la imaginación.' },
        { caption: 'Aprender en la naturaleza', detail: 'El entorno como primer salón de clases.' },
        { caption: 'Creatividad y arte', detail: 'Color, forma y expresión libre.' },
        { caption: 'Juego y construcción', detail: 'Armar, probar y trabajar en equipo.' },
        { caption: 'Exploración', detail: 'Curiosidad que nos lleva más lejos.' },
      ],
    } as any,
  })
  console.log('+ galería (imágenes de demostración)')
}
const hasTestimonials = (await payload.count({ collection: 'testimonials' })).totalDocs
if (!hasTestimonials) {
  for (const t of [
    { name: 'Verónica Maestre', role: 'Madre de familia', text: 'Está muy contenta con el resultado; su hijo ha mejorado su rendimiento académico de una forma increíble.' },
    { name: 'Pedro Gutierrez', role: 'Padre de familia', text: 'Recomienda la escuela; el personal está muy preparado y la atención a su hija ha sido excelente.' },
    { name: 'Patricia López', role: 'Madre de familia', text: 'Gracias a Exploradores del Saber su hijo avanzó muy rápido en las áreas donde tenía dificultad; los recomienda.' },
  ]) await payload.create({ collection: 'testimonials', data: t })
  console.log('+ testimonios')
}
// Solo en la primera carga: no pisar lo que el admin edite después
if (created) await payload.updateGlobal({ slug: 'site-settings', data: { email: 'exploradoresdelsaber@gmail.com', phone: '311 740 5949', enrollmentOpen: true } })
console.log('Listo.')
process.exit(0)
