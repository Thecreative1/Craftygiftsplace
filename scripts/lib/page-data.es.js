const { buildLocalePages } = require("./page-data-builder");

const definition = {
  code: "es",
  eyebrows: {
    collection: "Colección",
    intent: "Guía de regalo",
    contact: "Contacto"
  },
  routes: {
    home: "/es/index.html",
    coasters: "/es/pages/posavasos-de-madera.html",
    bookmarks: "/es/pages/marcapaginas-de-madera.html",
    gifts: "/es/pages/regalos-de-madera.html",
    contact: "/es/pages/contacto.html",
    cat: "/es/pages/regalos-para-amantes-de-los-gatos.html",
    reader: "/es/pages/regalos-para-lectores.html",
    housewarming: "/es/pages/regalos-para-casa-nueva.html",
    personalization: "/es/pages/personalizacion.html"
  },
  labels: {
    home: "Inicio",
    coasters: "Posavasos de madera",
    bookmarks: "Marcapáginas de madera",
    gifts: "Regalos de madera",
    contact: "Contacto",
    cat: "Regalos para amantes de los gatos",
    reader: "Regalos para lectores",
    housewarming: "Regalos para casa nueva"
  },
  pages: {
    coasters: {
      title: "Posavasos de madera hechos a mano con grabados celestiales, naturales y más marcados | Craftygiftsplace",
      metaDescription: "Explora posavasos de madera hechos a mano con grabados celestiales, naturales, vikingos y otros diseños con personalidad para mesas, estanterías y regalos bien pensados.",
      h1: "Posavasos de madera hechos a mano con grabados celestiales, naturales y más marcados",
      intro: "Explora la selección de posavasos en un solo lugar. Esta página se mantiene centrada en el tipo de producto para que resulte fácil comparar sets grabados muy buscados para mesas de centro, escritorios y estanterías sin mezclar guías de regalo más amplias. Aquí conviven diseños celestiales y naturales más calmados con opciones más fuertes, como temas vikingos, espirituales o pensados para una zona de ocio.",
      primaryCtaLabel: "Ver posavasos en Etsy",
      secondaryCtaLabel: "Ver la selección de posavasos",
      linkCloud: [
        { label: "Regalos para amantes de los gatos", targetKey: "cat" },
        { label: "Regalos para casa nueva", targetKey: "housewarming" },
        { label: "Todos los estilos de posavasos", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Comprar con confianza",
        quote: "\"Estos posavasos son preciosos. Se ven resistentes y muy bien hechos.\"",
        attribution: "Andrew · Reseña de Etsy",
        text: "Los posavasos funcionan muy bien para una casa nueva o para un regalo cotidiano porque son útiles, cálidos y fáciles de integrar en cualquier hogar.",
        links: [
          { label: "Ver regalos para amantes de los gatos", targetKey: "cat" },
          { label: "Ver regalos para casa nueva", targetKey: "housewarming" },
          { label: "Explorar marcapáginas de madera", targetKey: "bookmarks" },
          { label: "Cómo funciona la personalización", targetKey: "personalization" }
        ]
      },
      featuredSummaries: [
        "Un set superventas que aporta un detalle cálido de madera a mesas de centro, estanterías y regalos para casa nueva.",
        "Un diseño celestial para mesas de tarde, interiores acogedores y compradores que buscan una pieza con personalidad clara.",
        "Un set grabado con fuerza para decoración nórdica, salas de ocio y regalos con un tema más marcado.",
        "Un set espiritual más sereno para rincones de té, estanterías y casas donde los detalles de mesa con significado encajan bien."
      ],
      featuredWhy: [
        "Reúne los temas de posavasos más buscados en una sola vista clara.",
        "Permite comparar sets más tranquilos y diseños con más presencia.",
        "Sigue guiando hacia ideas para gatos, casa nueva o regalos de madera cuando el interés ya es más concreto."
      ],
      catalogIntro: "Una selección de posavasos que reúne sets muy vendidos, regalos cálidos para el hogar y grabados con más personalidad.",
      faq: [
        { question: "¿Estos posavasos sirven para un regalo de casa nueva?", answer: "Sí. Muchos diseños encajan de forma natural en regalos para una casa nueva, porque son prácticos, decorativos y fáciles de usar desde el primer día." },
        { question: "¿Aquí también hay posavasos con temas más potentes?", answer: "Sí. Además de los diseños más serenos, esta página reúne sets vikingos, espirituales, gaming o alternativos con una presencia visual más fuerte." },
        { question: "¿Se pueden descubrir otras colecciones desde aquí?", answer: "Sí. Esta página enlaza directamente con marcapáginas, regalos de madera y guías para lectores o casa nueva." }
      ],
      relatedLinks: [
        { label: "Regalos para amantes de los gatos", targetKey: "cat", description: "Posavasos con temática felina y algunas piezas decorativas de madera reunidas para este público." },
        { label: "Regalos para casa nueva", targetKey: "housewarming", description: "Piezas útiles de madera para mesas de centro, estanterías y regalos para un nuevo hogar." },
        { label: "Marcapáginas de madera", targetKey: "bookmarks", description: "Deja los regalos para el hogar y pasa a ideas pensadas para lectores." }
      ],
      ctaPanel: {
        title: "¿Listo para comparar posavasos en Etsy?",
        text: "Abre Etsy para ver precios, detalles completos y reseñas de compradores.",
        label: "Abrir posavasos en Etsy"
      }
    },
    bookmarks: {
      title: "Marcapáginas de madera hechos a mano para estanterías de fantasía y lecturas tranquilas | Craftygiftsplace",
      metaDescription: "Descubre marcapáginas de madera hechos a mano para estanterías de fantasía, regalos para lectores y momentos de lectura tranquilos con mucho carácter.",
      h1: "Marcapáginas de madera hechos a mano para estanterías de fantasía y lecturas tranquilas",
      intro: "Esta página mantiene la colección de marcapáginas centrada en el producto. Así resulta más fácil comparar marcapáginas de madera para estanterías de fantasía, montones de libros y ratos de lectura tranquila, sin mezclarlo con guías de regalo más amplias.",
      primaryCtaLabel: "Ver marcapáginas en Etsy",
      secondaryCtaLabel: "Ver la selección de marcapáginas",
      linkCloud: [
        { label: "Regalos para lectores", targetKey: "reader" },
        { label: "Regalos de madera", targetKey: "gifts" },
        { label: "Todos los marcapáginas", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Comprar con confianza",
        quote: "\"El detalle es increíble, está muy bien hecho y se nota duradero. Un marcapáginas precioso.\"",
        attribution: "Comprador de marcapáginas · Reseña de Etsy",
        text: "Los marcapáginas son fáciles de regalar, ocupan poco y se sienten más personales que un simple extra dentro de un libro.",
        links: [
          { label: "Ver regalos para lectores", targetKey: "reader" },
          { label: "Ver regalos de madera", targetKey: "gifts" },
          { label: "Descubrir posavasos", targetKey: "coasters" },
          { label: "Cómo funciona la personalización", targetKey: "personalization" }
        ]
      },
      featuredSummaries: [
        "Un marcapáginas de fantasía muy visual para lectores que disfrutan de detalles potentes en una estantería o en un diario de lectura.",
        "Una opción más serena para quien busca un regalo para lector con un aire más clásico.",
        "Un set que reúne marcapáginas, colgador de puerta y posavasos cuando el tema debe sentirse coherente desde el principio.",
        "Un marcapáginas más clásico para lectores que prefieren un regalo sereno con detalle artesanal."
      ],
      featuredWhy: [
        "Mantiene el foco en marcapáginas y detalles relacionados con la lectura.",
        "Permite comparar rápido estilos de fantasía, clásicos y personalizados.",
        "Lleva a la página de regalos para lectores cuando el comprador necesita una idea más amplia."
      ],
      catalogIntro: "Una selección de marcapáginas pensada para lectores, estanterías de fantasía y momentos de lectura tranquilos.",
      faq: [
        { question: "¿Estos marcapáginas son sobre todo para lectores de fantasía?", answer: "Muchos encajan especialmente bien en estanterías de fantasía y lecturas con ambiente, aunque también hay opciones más sobrias para gustos clásicos." },
        { question: "¿Existe una página más amplia de regalos para lectores?", answer: "Sí. La página de regalos para lectores reúne marcapáginas, sets a juego y algunas piezas pequeñas de madera para rincones de lectura." },
        { question: "¿Puedo descubrir otros tipos de regalo desde aquí?", answer: "Sí. Esta colección enlaza directamente con regalos de madera, posavasos y las principales guías de regalo." }
      ],
      relatedLinks: [
        { label: "Regalos para lectores", targetKey: "reader", description: "Marcapáginas, sets de fantasía y pequeñas piezas para rincones de lectura reunidos en una sola página." },
        { label: "Regalos de madera", targetKey: "gifts", description: "Colgadores de puerta, portavelas y recuerdos para ir más allá del marcapáginas." },
        { label: "Posavasos de madera", targetKey: "coasters", description: "Regalos de madera más orientados al hogar, a la mesa de centro y a una casa nueva." }
      ],
      ctaPanel: {
        title: "¿Listo para ver marcapáginas en Etsy?",
        text: "Abre Etsy para comparar diseños, acabados, reseñas y detalles de personalización.",
        label: "Abrir marcapáginas en Etsy"
      }
    },
    gifts: {
      title: "Regalos de madera hechos a mano para rincones de lectura, estanterías y momentos especiales | Craftygiftsplace",
      metaDescription: "Explora regalos de madera hechos a mano, como portavelas, colgadores de puerta y recuerdos personalizados para estanterías, entradas y momentos especiales.",
      h1: "Regalos de madera hechos a mano para rincones de lectura, estanterías y momentos especiales",
      intro: "Esta colección reúne los regalos de madera que no son ni posavasos ni marcapáginas. Ayuda a comparar portavelas, colgadores de puerta, recuerdos personalizados y otras piezas decorativas en un espacio más tranquilo.",
      primaryCtaLabel: "Ver regalos de madera en Etsy",
      secondaryCtaLabel: "Ver la selección de regalos de madera",
      linkCloud: [
        { label: "Regalos para lectores", targetKey: "reader" },
        { label: "Regalos para casa nueva", targetKey: "housewarming" },
        { label: "Todos los regalos de madera", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Comprar con confianza",
        quote: "\"Gran calidad, tal como se describe, y una atención muy amable y clara.\"",
        attribution: "Caroline · Reseña de Etsy",
        text: "Esta colección ayuda cuando el comprador quiere algo más decorativo o personal que un regalo centrado solo en la mesa o en la lectura.",
        links: [
          { label: "Ver regalos para lectores", targetKey: "reader" },
          { label: "Ver regalos para casa nueva", targetKey: "housewarming" },
          { label: "Ver la página de contacto", targetKey: "contact" },
          { label: "Cómo funciona la personalización", targetKey: "personalization" }
        ]
      },
      featuredSummaries: [
        "Un pequeño portavelas cálido para estanterías, consolas y rincones de lectura.",
        "Un colgador de puerta más personal cuando el regalo debe verse nada más entrar.",
        "Un recuerdo personalizado que encaja bien en bodas, aniversarios y momentos que merece la pena conservar.",
        "Un quemador de incienso para estanterías y rincones tranquilos cuando el regalo de madera debe sentirse sereno, decorativo y un poco distinto."
      ],
      featuredWhy: [
        "Reúne las piezas de madera más decorativas y personalizadas.",
        "Permite comparar regalos para casa, entrada y recuerdos en un solo espacio.",
        "Lleva con facilidad a páginas para lectores, gatos o casa nueva cuando la intención cambia."
      ],
      catalogIntro: "Una selección de regalos de madera para estanterías, entradas, rincones de lectura y recuerdos que merece la pena guardar.",
      faq: [
        { question: "¿Qué se encuentra en esta colección?", answer: "Aquí hay portavelas, colgadores de puerta, recuerdos personalizados y otras piezas de madera que no encajan en posavasos o marcapáginas." },
        { question: "¿Estos regalos sirven también para casa nueva?", answer: "Sí. Varias piezas funcionan muy bien en estanterías, entradas y rincones acogedores de una casa nueva." },
        { question: "¿Se puede seguir navegando a otras colecciones desde aquí?", answer: "Sí. Esta página enlaza con posavasos, marcapáginas y las principales guías de regalo." }
      ],
      relatedLinks: [
        { label: "Regalos para lectores", targetKey: "reader", description: "Ideas pensadas para libros, rincones de lectura y algunos sets pequeños a juego." },
        { label: "Regalos para casa nueva", targetKey: "housewarming", description: "Piezas de madera útiles y decorativas para nuevas casas y apartamentos." },
        { label: "Contacto", targetKey: "contact", description: "Pasa por Etsy si quieres preguntar por personalización o por un regalo concreto." }
      ],
      ctaPanel: {
        title: "¿Listo para ver más regalos de madera en Etsy?",
        text: "Abre Etsy para comparar fichas, precios, reseñas y opciones de personalización.",
        label: "Abrir regalos de madera en Etsy"
      }
    },
    contact: {
      title: "Contacta con Craftygiftsplace para regalos de madera personalizados | Craftygiftsplace",
      metaDescription: "Contacta con Craftygiftsplace en Etsy para preguntas sobre personalización, ayuda para elegir un regalo o comparar posavasos, marcapáginas y decoración de madera.",
      h1: "¿Tienes una pregunta o quieres personalización?",
      intro: "Para un pedido, una personalización o una pregunta sobre un artículo concreto, Etsy sigue siendo el mejor punto de contacto. Esta página simplemente muestra el siguiente paso más claro y algunas entradas fáciles a las colecciones principales.",
      primaryCtaLabel: "Escribirnos en Etsy",
      secondaryCtaLabel: "Leer reseñas de Etsy",
      infoCards: [
        { title: "Pequeño taller de madera hecho a mano", text: "Craftygiftsplace se centra en regalos de madera grabados que se sienten cálidos, útiles y personales. La selección presentada aquí se mantiene cerca de lectores, amantes de los gatos, hogares acogedores y algunos recuerdos personalizados." },
        { title: "Materiales y acabado", items: ["La madera se elige por su grabado limpio, su veta visible y un acabado naturalmente cálido.", "Muchos sets de posavasos usan base de corcho cuando así aparece en la ficha de Etsy.", "Cada pieza se revisa después del grabado para mantener un acabado limpio, cálido y agradable para regalar."] },
        { title: "Cómo funciona el proceso", text: "Las ideas suelen empezar con un tema, un nombre o un pequeño texto, y después pasan por grabado, acabado a mano y una revisión final antes de aparecer en Etsy." },
        { title: "Qué se puede preguntar", items: ["Personalización con nombre, fecha o mensaje corto.", "Ayuda para elegir entre posavasos, marcapáginas y otros regalos de madera.", "Consejos para un regalo de casa nueva, para lectores o para una ocasión importante."] },
        { title: "Por qué Etsy es el mejor punto de contacto", text: "Etsy reúne pedidos, plazos de entrega, notas de personalización, protección al comprador y mensajes en un solo lugar." },
        { title: "Buenos puntos para empezar", text: "Si alguien aún está decidiendo, lo mejor es empezar por los posavasos de madera, los marcapáginas de madera o una de las guías de regalo." }
      ],
      sidebar: {
        title: "Comprar con confianza",
        quote: "\"Ha sido un placer tratar con esta tienda... volveré a comprar.\"",
        attribution: "Clare · Reseña de Etsy",
        text: "La página de contacto se mantiene sencilla: escribe por Etsy para una duda sobre el pedido, o explora primero una colección si quieres comparar estilos.",
        links: [
          { label: "Posavasos de madera", targetKey: "coasters" },
          { label: "Regalos para lectores", targetKey: "reader" },
          { label: "Regalos para casa nueva", targetKey: "housewarming" }
        ]
      },
      faq: [
        { question: "¿Los pedidos se hacen en esta web?", answer: "No. Los pedidos y los mensajes se gestionan en Etsy, donde están la ficha del producto, la entrega y las opciones de personalización en un mismo lugar." },
        { question: "¿Puedo pedir personalización antes de comprar?", answer: "Sí. La mensajería de Etsy es el mejor lugar para preguntar por un nombre, una fecha o un pequeño texto antes del pedido." },
        { question: "¿Puedo ver las colecciones antes de escribir?", answer: "Sí. Las principales colecciones y guías de regalo siguen enlazadas desde esta página para comparar primero con calma." }
      ],
      ctaPanel: {
        title: "¿Listo para escribir o navegar en Etsy?",
        text: "Abre la tienda en Etsy para enviar un mensaje, leer reseñas o seguir explorando fichas que encajen con tu idea de regalo.",
        label: "Abrir Craftygiftsplace en Etsy"
      }
    },
    cat: {
      title: "Regalos de madera para amantes de los gatos, hogares acogedores e ideas de Etsy bien pensadas | Craftygiftsplace",
      metaDescription: "Descubre regalos de madera para amantes de los gatos, con posavasos felinos y decoración cálida para estanterías, mesas de centro e ideas que llevan a Etsy.",
      h1: "Regalos de madera para amantes de los gatos, estanterías y mesas de centro",
      intro: "Esta página es para quien ya sabe que quiere un regalo para un amante de los gatos. Reúne los mejores aciertos felinos en un solo sitio: posavasos para mesas de centro, diseños de gato con un toque más celestial y una pieza decorativa pequeña para estanterías o rincones de lectura.",
      primaryCtaLabel: "Ver regalos de gatos en Etsy",
      secondaryCtaLabel: "Ir a las ideas para amantes de los gatos",
      linkCloud: [
        { label: "Posavasos de madera", targetKey: "coasters" },
        { label: "Regalos para casa nueva", targetKey: "housewarming" },
        { label: "Todos los regalos de gatos", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Por qué funciona esta página",
        quote: "\"Estos posavasos son preciosos. Se ven resistentes y muy bien hechos.\"",
        attribution: "Andrew · Reseña de Etsy",
        text: "Las piezas con tema de gatos ya eran populares dentro de la tienda. Esta página las reúne para compararlas sin saltar entre categorías.",
        links: [
          { label: "Ver posavasos de madera", targetKey: "coasters" },
          { label: "Ver regalos para casa nueva", targetKey: "housewarming" },
          { label: "Ver resultados de gatos en Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Un favorito con tema felino que sigue siendo decorativo y práctico para salón, escritorio o cumpleaños.",
        "Una opción más lunar para alguien a quien le gustan los gatos y un ambiente más celestial en la mesa de centro.",
        "Una pieza decorativa pequeña pensada para estanterías, mesillas y rincones de lectura más suaves.",
        "Un set de posavasos con gatos más sencillo para quien busca un regalo práctico con un tema felino claro."
      ],
      featuredWhy: [
        "Mantiene los regalos con tema de gatos en una selección tranquila y fácil de recorrer.",
        "Combina sets útiles con una pieza decorativa más suave.",
        "Encaja bien cuando el regalo debe sentirse acogedor, útil y claramente felino."
      ],
      catalogIntro: "Los mejores aciertos con tema de gatos para hogares acogedores, estanterías y regalos alrededor de una mesa de centro.",
      faq: [
        { question: "¿Todos estos regalos para amantes de los gatos son posavasos?", answer: "No. La página reúne sets de posavasos con tema felino y una pequeña pieza decorativa de madera para elegir entre regalo práctico o más visual." },
        { question: "¿Estas ideas también sirven para casa nueva?", answer: "Sí. Varios modelos funcionan muy bien para un hogar nuevo, sobre todo cuando el regalo debe sentirse útil y acogedor." },
        { question: "¿Puedo seguir viendo toda la colección de posavasos?", answer: "Sí. Esta página enlaza directamente con la colección completa para quien quiera comparar más temas." }
      ],
      relatedLinks: [
        { label: "Posavasos de madera", targetKey: "coasters", description: "Una selección de posavasos con estilos felinos, celestiales y botánicos." },
        { label: "Regalos para casa nueva", targetKey: "housewarming", description: "Piezas útiles de madera para nuevas casas, mesas de centro y estanterías." },
        { label: "Regalos de madera", targetKey: "gifts", description: "Explora piezas decorativas y colgadores si quieres ir más allá de los posavasos." }
      ],
      ctaPanel: {
        title: "¿Listo para comparar regalos de gatos en Etsy?",
        text: "Abre Etsy para comparar diseños, precios y reseñas alrededor de ideas con temática felina.",
        label: "Abrir regalos de gatos en Etsy"
      }
    },
    reader: {
      title: "Regalos de madera para lectores, rincones de lectura y estanterías acogedoras | Craftygiftsplace",
      metaDescription: "Explora regalos de madera para lectores, con marcapáginas, un set de fantasía y piezas para rincones de lectura y estanterías tranquilas.",
      h1: "Regalos de madera para lectores y rincones de lectura acogedores",
      intro: "Esta página ayuda a quien ya busca un regalo para lector. Reúne marcapáginas, un set de fantasía a juego y algunas piezas que encajan bien en un rincón de lectura, para comparar varios estilos sin salir del mismo tema.",
      primaryCtaLabel: "Ver regalos para lectores en Etsy",
      secondaryCtaLabel: "Ir a las ideas para lectores",
      linkCloud: [
        { label: "Marcapáginas de madera", targetKey: "bookmarks" },
        { label: "Regalos de madera", targetKey: "gifts" },
        { label: "Todas las ideas para lectores", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Por qué ayuda esta página",
        quote: "\"El detalle es increíble, está muy bien hecho y se nota duradero. Un marcapáginas precioso.\"",
        attribution: "Comprador de marcapáginas · Reseña de Etsy",
        text: "Evita repartir al visitante entre varias colecciones cuando la intención es sencilla: encontrar un regalo para lector que encaje desde el primer vistazo.",
        links: [
          { label: "Ver marcapáginas de madera", targetKey: "bookmarks" },
          { label: "Ver regalos de madera", targetKey: "gifts" },
          { label: "Ver resultados para lectores en Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Un marcapáginas de fantasía muy visual para lectores que disfrutan de detalles potentes y un objeto bonito dentro del libro.",
        "Un set listo para regalar con marcapáginas, colgador de puerta y posavasos para lectores de fantasía.",
        "Una pequeña pieza de ambiente para estanterías y rincones de lectura cuando el regalo puede ser más suave que estrictamente práctico.",
        "Un marcapáginas personalizado para quienes quieren que el regalo para lector se sienta más íntimo, sereno y duradero."
      ],
      featuredWhy: [
        "Mantiene la selección centrada en lectores y hábitos de lectura acogedores.",
        "Combina marcapáginas, un set listo para regalar y una pieza decorativa ligera.",
        "Remite fácilmente a la colección completa de marcapáginas si el visitante quiere comparar con más detalle."
      ],
      catalogIntro: "Ideas de madera para lectores, marcapáginas, set de fantasía y pequeños detalles para rincones de lectura.",
      faq: [
        { question: "¿Esta página incluye solo marcapáginas?", answer: "No. Reúne sobre todo marcapáginas, pero también un set a juego y una pequeña pieza decorativa que funciona bien en un rincón de lectura." },
        { question: "¿Existe también una colección dedicada a los marcapáginas?", answer: "Sí. La colección de marcapáginas de madera sigue disponible para quien quiera quedarse solo en ese tipo de producto." },
        { question: "¿Estos regalos encajan con lectores de fantasía?", answer: "Sí. Varias opciones están claramente orientadas a la fantasía, sin dejar fuera estilos más tranquilos para otros lectores." }
      ],
      relatedLinks: [
        { label: "Marcapáginas de madera", targetKey: "bookmarks", description: "Sigue en la colección de producto si quieres comparar más marcapáginas." },
        { label: "Regalos de madera", targetKey: "gifts", description: "Añade portavelas, colgadores y otros objetos de madera a la idea de regalo." },
        { label: "Regalos para casa nueva", targetKey: "housewarming", description: "Pasa a ideas más domésticas si lo principal es un regalo para un interior nuevo." }
      ],
      ctaPanel: {
        title: "¿Listo para ver regalos para lectores en Etsy?",
        text: "Abre Etsy para comparar fichas, reseñas y opciones que encajen mejor con tu lector.",
        label: "Abrir regalos para lectores en Etsy"
      }
    },
    housewarming: {
      title: "Regalos de madera para casa nueva, mesas de centro, estanterías y hogares acogedores | Craftygiftsplace",
      metaDescription: "Explora regalos de madera para casa nueva, con posavasos útiles y piezas decorativas cálidas para mesas de centro, estanterías y nuevos hogares.",
      h1: "Regalos de madera para casa nueva, mesas de centro, estanterías y hogares acogedores",
      intro: "Esta página es para quien ya busca un regalo para una casa nueva. Se centra en posavasos útiles, algunas piezas decorativas más suaves y opciones que tienen sentido inmediato sobre una mesa de centro, una estantería o una entrada.",
      primaryCtaLabel: "Ver regalos para casa nueva en Etsy",
      secondaryCtaLabel: "Ir a las ideas para casa nueva",
      linkCloud: [
        { label: "Posavasos de madera", targetKey: "coasters" },
        { label: "Regalos para amantes de los gatos", targetKey: "cat" },
        { label: "Todas las ideas para el hogar", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Por qué funciona esta página",
        quote: "\"Estos posavasos son preciosos. Se ven resistentes y muy bien hechos.\"",
        attribution: "Andrew · Reseña de Etsy",
        text: "Para una casa nueva, muchos visitantes quieren algo útil, decorativo y fácil de integrar en el hogar. Esta página mantiene justo ese enfoque.",
        links: [
          { label: "Ver posavasos de madera", targetKey: "coasters" },
          { label: "Ver regalos de gatos", targetKey: "cat" },
          { label: "Ver regalos de madera", targetKey: "gifts" }
        ]
      },
      featuredSummaries: [
        "Un set de posavasos de madera muy fácil de regalar para mesas de centro, cafés de la mañana y nuevos salones.",
        "Otra opción práctica con un estilo más celestial para hogares cálidos y estanterías visibles.",
        "Una pequeña pieza decorativa que añade un acento suave en estanterías o consolas cuando se quiere variar más allá del posavasos.",
        "Un motivo de árbol en madera que encaja muy bien en estanterías nuevas, mesas de centro y regalos de bienvenida al hogar."
      ],
      featuredWhy: [
        "Mantiene el foco en ideas para el hogar claras y fáciles de regalar.",
        "Combina posavasos útiles y una pequeña pieza decorativa más suave.",
        "Ayuda a comparar opciones adecuadas para mesas de centro, estanterías y apartamentos."
      ],
      catalogIntro: "Ideas de madera para casas nuevas, mesas de centro, estanterías e interiores acogedores.",
      faq: [
        { question: "¿Estas ideas sirven para un piso o una casa pequeña?", answer: "Sí. Varias piezas son compactas, útiles y fáciles de colocar en una mesa de centro, una estantería o una consola sin ocupar demasiado espacio." },
        { question: "¿En esta página predominan los posavasos?", answer: "Los posavasos siguen siendo el centro de la selección, pero también se mantiene una pequeña pieza decorativa para quien quiere algo más suave." },
        { question: "¿Se pueden ver otras ideas de regalo desde aquí?", answer: "Sí. Esta página enlaza con las colecciones y con las guías para gatos o lectores si la intención cambia." }
      ],
      relatedLinks: [
        { label: "Posavasos de madera", targetKey: "coasters", description: "Compara más estilos si quieres seguir con un regalo práctico para el hogar." },
        { label: "Regalos para amantes de los gatos", targetKey: "cat", description: "Añade un matiz felino si la casa nueva pertenece a alguien que adora los gatos." },
        { label: "Regalos de madera", targetKey: "gifts", description: "Pasa a piezas decorativas y recuerdos si quieres salir de los posavasos." }
      ],
      ctaPanel: {
        title: "¿Listo para comparar regalos para casa nueva en Etsy?",
        text: "Abre Etsy para ver fichas, precios y reseñas alrededor de regalos para nuevos hogares.",
        label: "Abrir ideas para casa nueva en Etsy"
      }
    }
  }
};

const pagesEs = buildLocalePages(definition);

pagesEs.push({
  path: "/es/pages/personalizacion.html",
  template: "contact",
  locale: "es",
  title: "Cómo funciona la personalización | Craftygiftsplace",
  metaDescription: "Aprende cómo añadir un nombre, fecha o mensaje a regalos de madera artesanales de Craftygiftsplace — antes y después de hacer el pedido en Etsy.",
  h1: "Cómo funciona la personalización",
  eyebrow: "Personaliza tu regalo",
  intro: "Muchos artículos pueden personalizarse con un nombre, fecha o mensaje corto. Aquí tienes lo que puedes esperar, paso a paso.",
  breadcrumbs: [
    { label: "Inicio", path: "/es/index.html" },
    { label: "Personalización" }
  ],
  primaryCta: {
    label: "Abrir Craftygiftsplace en Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Contactar con la tienda en Etsy",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#about"
  },
  sidebar: {
    title: "Consejo rápido",
    quote: "\"El vendedor fue increíblemente útil cuando pregunté por las opciones de personalización.\"",
    attribution: "Tanya · 5/5 en Etsy",
    text: "Envía un mensaje a la tienda antes de pedir y el vendedor confirmará exactamente lo que es posible para la pieza elegida.",
    links: [
      { label: "Abrir la tienda Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace" },
      { label: "Ver posavasos de madera", href: "/es/pages/posavasos-de-madera.html" },
      { label: "Ver marcapáginas de madera", href: "/es/pages/marcapaginas-de-madera.html" }
    ]
  },
  infoCards: [
    {
      title: "¿Qué artículos se pueden personalizar?",
      text: "La mayoría de posavasos, marcapáginas y recuerdos de la tienda pueden personalizarse. Esto incluye añadir un nombre, nombres de pareja, una fecha corta o un mensaje breve. La ficha de Etsy indica lo que está disponible para cada pieza — y siempre puedes enviar un mensaje antes de pedir."
    },
    {
      title: "¿Dónde introduzco los detalles de personalización?",
      text: "En la página de la ficha de Etsy, busca el campo 'Añadir tu personalización'. Introduce tu texto antes de añadir al carrito. Si el campo no aparece, envía primero un mensaje al vendedor."
    },
    {
      title: "¿Con qué puedo personalizar?",
      items: [
        "Un nombre o nombres de pareja (p. ej. 'Emma' o 'Emma y James')",
        "Una fecha (p. ej. fecha de boda, cumpleaños o aniversario)",
        "Un mensaje corto de dos o tres líneas",
        "Un nombre de mascota para piezas conmemorativas",
        "Una frase personalizada para regalos temáticos"
      ]
    },
    {
      title: "¿Puedo escribir antes de pedir?",
      text: "Sí, y suele ser la forma más fácil de hacerlo bien. Usa la mensajería de Etsy para describir lo que quieres. El vendedor responde rápidamente y confirmará las opciones antes de que hagas el pedido."
    },
    {
      title: "¿Qué ocurre después del pedido?",
      text: "Una vez realizado el pedido con tus datos de personalización, el vendedor empieza a fabricar la pieza. Recibirás una notificación de Etsy cuando se envíe. Si algo necesita aclararse, el vendedor se pondrá en contacto contigo por Etsy."
    },
    {
      title: "¿Y si me equivoco en la personalización?",
      text: "Contacta con el vendedor por Etsy lo antes posible tras el pedido. Como cada pieza se fabrica individualmente, las correcciones suelen ser posibles si se comunican a tiempo."
    }
  ],
  faq: [
    {
      question: "¿Está incluida la personalización en el precio?",
      answer: "Los costes varían según el producto. Consulta la ficha de Etsy para más detalles — algunas piezas la incluyen, otras tienen un pequeño suplemento. Escribir al vendedor es la forma más rápida de confirmarlo."
    },
    {
      question: "¿Cuánto tarda un pedido personalizado?",
      answer: "Las piezas personalizadas se fabrican bajo pedido. Cuenta con algunos días adicionales más allá del plazo de procesamiento indicado en Etsy. El vendedor también puede aconsejar en pedidos urgentes."
    },
    {
      question: "¿Puedo ver una vista previa antes de que se fabrique?",
      answer: "En muchos casos, sí. Envía un mensaje al vendedor con tus datos y pide una vista previa — especialmente útil para diseños complejos."
    }
  ],
  ctaPanel: {
    title: "¿Listo para personalizar tu regalo?",
    text: "Ve a Etsy para explorar las fichas, comprobar las opciones de personalización y enviar un mensaje al vendedor.",
    label: "Abrir Craftygiftsplace en Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/es/pages/personalizacion.html" }
});

pagesEs.push({
  path: "/es/pages/por-que-regalos-de-madera.html",
  template: "contact",
  locale: "es",
  title: "¿Por qué regalos de madera? Hechos a mano, duraderos y personales | Craftygiftsplace",
  metaDescription: "Los regalos de madera hechos a mano duran más, se sienten más personales y llevan verdadero artesanado. Descubre por qué la madera grabada es un mejor regalo que las alternativas genéricas.",
  h1: "Por qué los regalos de madera duran más que la mayoría",
  eyebrow: "El argumento de la madera",
  intro: "Los regalos genéricos se olvidan. Los regalos de madera se guardan. Esto es por qué la madera artesanal grabada funciona tan bien para casi cualquier ocasión.",
  breadcrumbs: [
    { label: "Inicio", path: "/es/index.html" },
    { label: "¿Por qué regalos de madera?" }
  ],
  primaryCta: {
    label: "Ver regalos de madera en Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Ver todas las colecciones",
    targetUrl: "/es/pages/regalos-de-madera.html"
  },
  sidebar: {
    title: "Lo que dicen los compradores",
    quote: "\"La artesanía es espectacular. Incluso huele a madera fresca.\"",
    attribution: "Alex · 5/5 en Etsy",
    text: "Valorado con 4,96/5 en cientos de reseñas de Etsy. Los compradores mencionan constantemente calidad, detalle y acabado duradero.",
    links: [
      { label: "Posavasos de madera", href: "/es/pages/posavasos-de-madera.html" },
      { label: "Marcapáginas de madera", href: "/es/pages/marcapaginas-de-madera.html" },
      { label: "Todos los regalos de madera", href: "/es/pages/regalos-de-madera.html" }
    ]
  },
  infoCards: [
    {
      title: "La madera se siente diferente",
      text: "La madera real tiene una calidad táctil que ninguna tarjeta impresa o alternativa de plástico puede igualar. El peso, la veta, el leve calor del material — todo eso se percibe antes de que el destinatario lea el grabado. Un posavasos o marcapáginas de madera se anuncia como algo hecho, no pedido desde un menú desplegable."
    },
    {
      title: "El grabado lo hace permanente",
      text: "Un nombre, una fecha, una frase corta tallada en madera no se desvanece, no se pela y no se lava. Es parte de la pieza. Esa permanencia es lo que separa un regalo grabado de uno que acaba silenciosamente en un cajón. Los lectores guardan sus marcapáginas. Los posavasos se quedan en la mesa de café."
    },
    {
      title: "Funciona para casi cualquier ocasión",
      text: "Regalos de inauguración que van en la mesa de café desde el primer día. Regalos para lectores que viven dentro de un libro favorito. Piezas para amantes de los gatos que están en la estantería todo el año. Los regalos de madera son útiles y decorativos al mismo tiempo, por lo que permanecen visibles en lugar de guardarse tras la ocasión."
    },
    {
      title: "Hecho a mano significa: una persona lo hizo",
      text: "Cada pieza de esta tienda se fabrica bajo pedido por una sola persona con una grabadora láser y un estándar claro de calidad. No es lenguaje de marketing: significa que tu pedido no se coge de una estantería. Se fabrica después de que lo realizas."
    },
    {
      title: "Ideal para lectores, amantes de los gatos, nuevos hogares y más",
      items: [
        "Lectores: marcapáginas de ojo de dragón, pluma, céltico y fantasía que duran más que los libros que marcan",
        "Amantes de los gatos: portavelas Moon Cat y posavasos con temática felina para estanterías acogedoras",
        "Nuevos hogares: juegos de posavasos grabados que se sienten elegidos, no convenientes",
        "Momentos de recuerdo: placas conmemorativas para mascotas para un regalo que reconoce la pérdida con cuidado",
        "Gamers y tecnología: llaveros RAM reciclados y carteles de puerta gaming para escritorios"
      ]
    },
    {
      title: "El argumento honesto para gastar un poco más",
      text: "Un regalo de madera bien hecho cuesta más que una tarjeta y menos que la mayoría de las experiencias. Dura más que las flores, ocupa menos espacio que un bono y no necesita pilas. Para las ocasiones en que lo genérico no es suficiente, suele ser la elección correcta."
    }
  ],
  faq: [
    {
      question: "¿Son los regalos de madera adecuados para todas las edades?",
      answer: "Sí. Los posavasos, marcapáginas y piezas decorativas funcionan para adultos de cualquier edad. La gama incluye artículos funcionales para uso diario y recuerdos para ocasiones especiales. La tienda también tiene piezas de hitos de bebé para regalos de bienvenida."
    },
    {
      question: "¿Aguantan los regalos de madera con el tiempo?",
      answer: "El abedul y maderas similares son duraderos y estables para uso interior. El detalle grabado no se desvanece. La mayoría de los posavasos tienen base de corcho, que protege las superficies. Los compradores mencionan regularmente la durabilidad junto a la calidad visual."
    },
    {
      question: "¿Se pueden personalizar los regalos de madera para cualquier ocasión?",
      answer: "Muchas piezas pueden personalizarse con un nombre, fecha o mensaje corto. Esto las hace adecuadas para cumpleaños, aniversarios, inauguraciones, bodas y regalos conmemorativos. Consulta la página de personalización para todos los detalles."
    }
  ],
  relatedLinks: [
    { label: "Posavasos de madera", href: "/es/pages/posavasos-de-madera.html", description: "Juegos de posavasos grabados para mesas de café, inauguraciones e interiores acogedores." },
    { label: "Marcapáginas de madera", href: "/es/pages/marcapaginas-de-madera.html", description: "Marcapáginas de fantasía, clásicos y personalizados para lectores y regalos." },
    { label: "Regalos de madera", href: "/es/pages/regalos-de-madera.html", description: "Portavelas, carteles de puerta y recuerdos para estantes y momentos especiales." },
    { label: "Cómo funciona la personalización", href: "/es/pages/personalizacion.html", description: "Añade un nombre, fecha o mensaje — aquí tienes lo que puedes esperar." }
  ],
  ctaPanel: {
    title: "¿Listo para encontrar el regalo de madera ideal?",
    text: "Explora la colección completa en Etsy — posavasos, marcapáginas, recuerdos y mucho más.",
    label: "Abrir Craftygiftsplace en Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/es/pages/por-que-regalos-de-madera.html" }
});

module.exports = {
  pagesEs
};
