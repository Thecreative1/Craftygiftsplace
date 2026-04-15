const { buildLocalePages } = require("./page-data-builder");

const definition = {
  code: "pt",
  eyebrows: {
    collection: "Coleção",
    intent: "Guia de presentes",
    contact: "Contacto"
  },
  routes: {
    home: "/pt/index.html",
    coasters: "/pt/pages/porta-copos-de-madeira.html",
    bookmarks: "/pt/pages/marcadores-de-livros-de-madeira.html",
    gifts: "/pt/pages/presentes-de-madeira.html",
    contact: "/pt/pages/contacto.html",
    cat: "/pt/pages/presentes-para-amantes-de-gatos.html",
    reader: "/pt/pages/presentes-para-leitores.html",
    housewarming: "/pt/pages/presentes-de-casa-nova.html",
    personalization: "/pt/pages/personalizacao.html"
  },
  labels: {
    home: "Início",
    coasters: "Porta-copos de madeira",
    bookmarks: "Marcadores de livros de madeira",
    gifts: "Presentes de madeira",
    contact: "Contacto",
    cat: "Presentes para amantes de gatos",
    reader: "Presentes para leitores",
    housewarming: "Presentes de casa nova"
  },
  pages: {
    coasters: {
      title: "Porta-copos de madeira feitos à mão com gravuras celestes, naturais e mais marcantes | Craftygiftsplace",
      metaDescription: "Explora porta-copos de madeira feitos à mão com gravuras celestes, naturais, vikings e outros desenhos com personalidade para mesas, prateleiras e presentes bem pensados.",
      h1: "Porta-copos de madeira feitos à mão com gravuras celestes, naturais e mais marcantes",
      intro: "Aqui pode comparar porta-copos de madeira sem distrações, dos desenhos celestes e botânicos aos temas vikings, espirituais e gaming. É uma forma simples de ver lado a lado os conjuntos que funcionam melhor em mesas de centro, secretárias e presentes de casa nova.",
      primaryCtaLabel: "Ver porta-copos na Etsy",
      secondaryCtaLabel: "Explorar porta-copos",
      linkCloud: [
        { label: "Presentes para amantes de gatos", targetKey: "cat" },
        { label: "Presentes de casa nova", targetKey: "housewarming" },
        { label: "Todos os estilos de porta-copos", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Explorar com confiança",
        quote: "\"Estes porta-copos são lindos. Parecem resistentes e muito bem feitos.\"",
        attribution: "Andrew · Avaliação Etsy",
        text: "Os porta-copos funcionam muito bem para uma casa nova ou para um presente do dia a dia porque são úteis, acolhedores e fáceis de integrar em casa.",
        links: [
          { label: "Ver presentes para amantes de gatos", targetKey: "cat" },
          { label: "Ver presentes de casa nova", targetKey: "housewarming" },
          { label: "Explorar marcadores de livros", targetKey: "bookmarks" },
          { label: "Como funciona a personalização", targetKey: "personalization" },
          { label: "Porque escolher presentes de madeira?", href: "/pt/pages/por-que-presentes-de-madeira.html" }
        ]
      },
      featuredSummaries: [
        "Um conjunto entre os mais vendidos que leva um detalhe quente de madeira a mesas de centro, prateleiras e presentes de casa nova.",
        "Um desenho celeste para mesas de fim de dia, interiores acolhedores e compradores que procuram uma peça com presença.",
        "Um conjunto gravado com mais força para decoração viking, salas de hobbies e presentes com um tema marcante.",
        "Um conjunto de inspiração espiritual mais sereno para cantos de chá, prateleiras e casas onde um detalhe de mesa com significado faz sentido."
      ],
      featuredWhy: [
        "Reúne os temas de porta-copos mais procurados numa só vista clara.",
        "Permite comparar conjuntos mais tranquilos e desenhos com mais presença.",
        "Continua a encaminhar para páginas de gatos, casa nova ou presentes de madeira quando a intenção já é mais específica."
      ],
      catalogIntro: "Porta-copos muito procurados com desenhos celestes, naturais e outros temas cheios de personalidade.",
      faq: [
        { question: "Estes porta-copos servem para um presente de casa nova?", answer: "Sim. Muitos desenhos encaixam naturalmente em presentes para uma casa nova, porque são práticos, decorativos e fáceis de usar desde o primeiro dia." },
        { question: "Há aqui também porta-copos com temas mais fortes?", answer: "Sim. Para além dos desenhos mais serenos, aqui também encontra conjuntos vikings, espirituais, gaming e alternativos com uma presença visual mais marcada." },
        { question: "Posso descobrir outras coleções a partir daqui?", answer: "Sim. Daqui pode seguir diretamente para marcadores, presentes de madeira e guias para leitores ou casa nova." }
      ],
      relatedLinks: [
        { label: "Presentes para amantes de gatos", targetKey: "cat", description: "Porta-copos com tema felino e algumas peças decorativas em madeira reunidas para esse público." },
        { label: "Presentes de casa nova", targetKey: "housewarming", description: "Peças úteis em madeira para mesas de centro, prateleiras e presentes para uma casa nova." },
        { label: "Marcadores de livros de madeira", targetKey: "bookmarks", description: "Sai dos presentes para casa e passa para ideias pensadas para leitores." }
      ],
      ctaPanel: {
        title: "Pronto para comparar porta-copos na Etsy?",
        text: "Abre a Etsy para ver preços, detalhes completos e avaliações de compradores.",
        label: "Abrir porta-copos na Etsy"
      }
    },
    bookmarks: {
      title: "Marcadores de livros de madeira feitos à mão para estantes de fantasia e leituras tranquilas | Craftygiftsplace",
      metaDescription: "Descobre marcadores de livros de madeira feitos à mão para estantes de fantasia, presentes para leitores e momentos de leitura tranquilos com muito carácter.",
      h1: "Marcadores de livros de madeira feitos à mão para estantes de fantasia e leituras tranquilas",
      intro: "Aqui fica mais fácil comparar marcadores de livros em madeira pensados para estantes de fantasia, pilhas de livros e leituras tranquilas. Tudo está reunido num só lugar para quem quer escolher um presente para leitor sem sair do mesmo universo.",
      primaryCtaLabel: "Ver marcadores na Etsy",
      secondaryCtaLabel: "Explorar marcadores",
      linkCloud: [
        { label: "Presentes para leitores", targetKey: "reader" },
        { label: "Presentes de madeira", targetKey: "gifts" },
        { label: "Todos os marcadores", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Explorar com confiança",
        quote: "\"O detalhe é incrível, o acabamento é muito bom e nota-se durabilidade. Um marcador lindíssimo.\"",
        attribution: "Comprador de marcador · Avaliação Etsy",
        text: "Os marcadores são fáceis de oferecer, ocupam pouco espaço e parecem mais pessoais do que um simples extra dentro de um livro.",
        links: [
          { label: "Ver presentes para leitores", targetKey: "reader" },
          { label: "Ver presentes de madeira", targetKey: "gifts" },
          { label: "Descobrir porta-copos", targetKey: "coasters" },
          { label: "Como funciona a personalização", targetKey: "personalization" },
          { label: "Porque escolher presentes de madeira?", href: "/pt/pages/por-que-presentes-de-madeira.html" }
        ]
      },
      featuredSummaries: [
        "Um marcador de fantasia muito visual para leitores que gostam de detalhes fortes numa estante ou num diário de leitura.",
        "Uma opção mais serena para quem procura um presente para leitor com um ar mais clássico.",
        "Um conjunto que reúne marcador, pendente de porta e porta-copos quando o tema já deve parecer coerente.",
        "Um marcador mais clássico para leitores que preferem um presente sereno com detalhe artesanal."
      ],
      featuredWhy: [
        "Mantém o foco em marcadores e em detalhes ligados à leitura.",
        "Permite comparar rapidamente estilos de fantasia, clássicos e personalizados.",
        "Leva à página de presentes para leitores quando o comprador precisa de uma ideia mais ampla."
      ],
      catalogIntro: "Uma seleção de marcadores pensada para leitores, estantes de fantasia e momentos de leitura tranquilos.",
      faq: [
        { question: "Estes marcadores são sobretudo para leitores de fantasia?", answer: "Muitos encaixam especialmente bem em estantes de fantasia e leituras com ambiente, embora também haja opções mais sóbrias para gostos clássicos." },
        { question: "Existe uma página mais ampla de presentes para leitores?", answer: "Sim. A página de presentes para leitores junta marcadores, conjuntos a condizer e algumas peças pequenas de madeira para cantos de leitura." },
        { question: "Posso descobrir outros tipos de presente a partir daqui?", answer: "Sim. Esta coleção liga diretamente a presentes de madeira, porta-copos e aos principais guias de presentes." }
      ],
      relatedLinks: [
        { label: "Presentes para leitores", targetKey: "reader", description: "Marcadores, conjuntos de fantasia e pequenas peças para cantos de leitura reunidos numa só página." },
        { label: "Presentes de madeira", targetKey: "gifts", description: "Pendentes de porta, porta-velas e recordações para ir além do marcador." },
        { label: "Porta-copos de madeira", targetKey: "coasters", description: "Presentes em madeira mais virados para a casa, a mesa de centro e uma casa nova." }
      ],
      ctaPanel: {
        title: "Pronto para ver marcadores na Etsy?",
        text: "Abre a Etsy para comparar desenhos, acabamentos, avaliações e detalhes de personalização.",
        label: "Abrir marcadores na Etsy"
      }
    },
    gifts: {
      title: "Presentes de madeira feitos à mão para cantos de leitura, prateleiras e momentos especiais | Craftygiftsplace",
      metaDescription: "Explora presentes de madeira feitos à mão, como porta-velas, pendentes de porta e recordações personalizadas para prateleiras, entradas e momentos especiais.",
      h1: "Presentes de madeira feitos à mão para cantos de leitura, prateleiras e momentos especiais",
      intro: "Aqui estão reunidos os presentes de madeira que vão além de porta-copos e marcadores: porta-velas, pendentes de porta, recordações personalizadas e outras peças decorativas para oferecer com calma.",
      primaryCtaLabel: "Ver presentes de madeira na Etsy",
      secondaryCtaLabel: "Explorar presentes de madeira",
      linkCloud: [
        { label: "Presentes para leitores", targetKey: "reader" },
        { label: "Presentes de casa nova", targetKey: "housewarming" },
        { label: "Todos os presentes de madeira", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Explorar com confiança",
        quote: "\"Ótima qualidade, exatamente como descrito, e uma comunicação simpática e clara.\"",
        attribution: "Caroline · Avaliação Etsy",
        text: "Esta coleção ajuda quando se procura algo mais decorativo ou pessoal do que um presente centrado apenas na mesa ou na leitura.",
        links: [
          { label: "Ver presentes para leitores", targetKey: "reader" },
          { label: "Ver presentes de casa nova", targetKey: "housewarming" },
          { label: "Ver a página de contacto", targetKey: "contact" },
          { label: "Como funciona a personalização", targetKey: "personalization" },
          { label: "Porque escolher presentes de madeira?", href: "/pt/pages/por-que-presentes-de-madeira.html" }
        ]
      },
      featuredSummaries: [
        "Um pequeno porta-vela acolhedor para prateleiras, consolas e cantos de leitura.",
        "Um pendente de porta mais pessoal quando o presente deve ser visível logo à entrada.",
        "Uma recordação personalizada que funciona bem em casamentos, aniversários e momentos que vale a pena guardar.",
        "Um queimador de incenso para prateleiras e cantos tranquilos quando o presente de madeira deve parecer sereno, decorativo e um pouco diferente."
      ],
      featuredWhy: [
        "Reúne as peças de madeira mais decorativas e personalizadas.",
        "Permite comparar presentes para casa, entrada e recordações num só espaço.",
        "Leva com facilidade às páginas de leitores, gatos ou casa nova quando a intenção muda."
      ],
      catalogIntro: "Uma seleção de presentes de madeira para prateleiras, entradas, cantos de leitura e recordações que vale a pena guardar.",
      faq: [
        { question: "O que se encontra nesta coleção?", answer: "Aqui há porta-velas, pendentes de porta, recordações personalizadas e outras peças de madeira que não entram em porta-copos ou marcadores." },
        { question: "Estes presentes também servem para casa nova?", answer: "Sim. Várias peças funcionam muito bem em prateleiras, entradas e cantos acolhedores de uma casa nova." },
        { question: "Posso continuar a navegar para outras coleções a partir daqui?", answer: "Sim. Daqui pode seguir para porta-copos, marcadores e os principais guias de presentes." }
      ],
      relatedLinks: [
        { label: "Presentes para leitores", targetKey: "reader", description: "Ideias pensadas para livros, cantos de leitura e alguns pequenos conjuntos a condizer." },
        { label: "Presentes de casa nova", targetKey: "housewarming", description: "Peças de madeira úteis e decorativas para casas novas e apartamentos." },
        { label: "Contacto", targetKey: "contact", description: "Passa pela Etsy se quiseres perguntar sobre personalização ou sobre um presente específico." }
      ],
      ctaPanel: {
        title: "Pronto para ver mais presentes de madeira na Etsy?",
        text: "Abre a Etsy para comparar fichas, preços, avaliações e opções de personalização.",
        label: "Abrir presentes de madeira na Etsy"
      }
    },
    contact: {
      title: "Contacta a Craftygiftsplace para presentes de madeira personalizados | Craftygiftsplace",
      metaDescription: "Contacta a Craftygiftsplace na Etsy para perguntas sobre personalização, ajuda a escolher um presente ou comparar porta-copos, marcadores e decoração em madeira.",
      h1: "Tens uma pergunta ou queres personalização?",
      intro: "Para uma encomenda, um pedido de personalização ou uma dúvida sobre um artigo, o melhor é falar pela Etsy. Aqui fica a forma mais rápida de avançar e os atalhos mais úteis para as coleções principais.",
      primaryCtaLabel: "Escrever-nos na Etsy",
      secondaryCtaLabel: "Ler avaliações da Etsy",
      infoCards: [
        { title: "Pequeno atelier artesanal", text: "A Craftygiftsplace centra-se em presentes de madeira gravada que parecem acolhedores, úteis e pessoais. A seleção apresentada aqui mantém-se próxima de leitores, amantes de gatos, casas acolhedoras e algumas recordações personalizadas." },
        { title: "Materiais e acabamento", items: ["A madeira é escolhida por permitir uma gravação limpa, um veio visível e um acabamento naturalmente acolhedor.", "Muitos conjuntos de porta-copos usam base de cortiça quando isso aparece na ficha da Etsy.", "Cada peça é revista depois da gravação para manter um acabamento limpo, acolhedor e agradável de oferecer."] },
        { title: "Como funciona o processo", text: "As ideias começam muitas vezes com um tema, um nome ou um pequeno texto, e depois passam por gravação, acabamento manual e uma revisão final antes de entrarem na Etsy." },
        { title: "O que se pode perguntar", items: ["Personalização com nome, data ou mensagem curta.", "Ajuda para escolher entre porta-copos, marcadores e outros presentes de madeira.", "Sugestões para um presente de casa nova, para leitores ou para uma ocasião importante."] },
        { title: "Porque é que a Etsy é o melhor ponto de contacto", text: "A Etsy reúne encomendas, prazos de entrega, notas de personalização, proteção ao comprador e mensagens no mesmo lugar." },
        { title: "Bons pontos para começar", text: "Se alguém ainda estiver indeciso, o melhor é começar pelos porta-copos de madeira, pelos marcadores de livros de madeira ou por um dos guias de presentes." }
      ],
      sidebar: {
        title: "Explorar com confiança",
        quote: "\"Foi um prazer lidar com esta loja... vou voltar para mais.\"",
        attribution: "Clare · Avaliação Etsy",
        text: "Se tiver uma dúvida sobre a encomenda, escreva pela Etsy. Se ainda estiver a comparar estilos, comece por uma das coleções abaixo.",
        links: [
          { label: "Porta-copos de madeira", targetKey: "coasters" },
          { label: "Presentes para leitores", targetKey: "reader" },
          { label: "Presentes de casa nova", targetKey: "housewarming" }
        ]
      },
      faq: [
        { question: "As encomendas são feitas neste site?", answer: "Não. As encomendas e as mensagens são tratadas na Etsy, onde ficam reunidas a ficha do produto, a entrega e as opções de personalização." },
        { question: "Posso pedir personalização antes de comprar?", answer: "Sim. As mensagens da Etsy são o melhor lugar para perguntar por um nome, uma data ou um pequeno texto antes da encomenda." },
        { question: "Posso ver as coleções antes de escrever?", answer: "Sim. As principais coleções e os guias de presentes continuam ligados aqui para poderes comparar primeiro com calma." }
      ],
      ctaPanel: {
        title: "Pronto para escrever ou navegar na Etsy?",
        text: "Abre a loja na Etsy para enviar uma mensagem, ler avaliações ou continuar a explorar fichas que combinem com a tua ideia de presente.",
        label: "Abrir Craftygiftsplace na Etsy"
      }
    },
    cat: {
      title: "Presentes de madeira para amantes de gatos, casas acolhedoras e ideias Etsy bem pensadas | Craftygiftsplace",
      metaDescription: "Descobre presentes de madeira para amantes de gatos, com porta-copos felinos e decoração acolhedora para prateleiras, mesas de centro e ideias que seguem para a Etsy.",
      h1: "Presentes de madeira para amantes de gatos, prateleiras e mesas de centro",
      intro: "Se já sabe que quer oferecer algo a um amante de gatos, aqui encontra algumas das melhores ideias com tema felino num só lugar: porta-copos para mesas de centro, desenhos de gato com um toque celeste e uma pequena peça decorativa para prateleiras ou cantos de leitura.",
      primaryCtaLabel: "Ver presentes para amantes de gatos na Etsy",
      secondaryCtaLabel: "Ir para as ideias de gatos",
      linkCloud: [
        { label: "Porta-copos de madeira", targetKey: "coasters" },
        { label: "Presentes de casa nova", targetKey: "housewarming" },
        { label: "Todas as ideias para amantes de gatos", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Porque facilita a escolha",
        quote: "\"Estes porta-copos são lindos. Parecem resistentes e muito bem feitos.\"",
        attribution: "Andrew · Avaliação Etsy",
        text: "As peças com tema de gatos já eram favoritas na loja. Aqui ficam reunidas para ser mais fácil comparar sem saltar entre várias coleções.",
        links: [
          { label: "Ver porta-copos de madeira", targetKey: "coasters" },
          { label: "Ver presentes de casa nova", targetKey: "housewarming" },
          { label: "Ver resultados de gatos na Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Um favorito com tema felino que continua decorativo e prático para sala, secretária ou aniversário.",
        "Uma opção mais lunar para quem gosta de gatos e de uma atmosfera mais celeste na mesa de centro.",
        "Uma pequena peça decorativa pensada para prateleiras, mesinhas e cantos de leitura mais suaves.",
        "Um conjunto mais simples de porta-copos com gatos para quem procura um presente prático com um tema felino bem claro."
      ],
      featuredWhy: [
        "Mantém os presentes com tema de gatos numa seleção calma e fácil de percorrer.",
        "Mistura conjuntos úteis com uma peça decorativa mais suave.",
        "Resulta bem quando o presente deve parecer acolhedor, útil e claramente ligado a gatos."
      ],
      catalogIntro: "Ideias com tema de gatos para casas acolhedoras, prateleiras e presentes que ficam bem à volta de uma mesa de centro.",
      faq: [
        { question: "Todos estes presentes para amantes de gatos são porta-copos?", answer: "Não. A página reúne conjuntos de porta-copos com tema felino e uma pequena peça decorativa em madeira para escolher entre presente prático e presente mais visual." },
        { question: "Estas ideias também servem para casa nova?", answer: "Sim. Vários modelos funcionam muito bem para uma casa nova, sobretudo quando o presente deve parecer útil e acolhedor." },
        { question: "Posso continuar a ver toda a coleção de porta-copos?", answer: "Sim. Daqui pode seguir diretamente para a coleção completa e comparar mais temas." }
      ],
      relatedLinks: [
        { label: "Porta-copos de madeira", targetKey: "coasters", description: "Uma seleção de porta-copos com estilos felinos, celestes e botânicos." },
        { label: "Presentes de casa nova", targetKey: "housewarming", description: "Peças úteis em madeira para casas novas, mesas de centro e prateleiras." },
        { label: "Presentes de madeira", targetKey: "gifts", description: "Explora peças decorativas e pendentes se quiseres ir além dos porta-copos." }
      ],
      ctaPanel: {
        title: "Pronto para comparar presentes para amantes de gatos na Etsy?",
        text: "Abre a Etsy para comparar desenhos, preços e avaliações em torno de ideias com tema felino.",
        label: "Abrir presentes para amantes de gatos na Etsy"
      }
    },
    reader: {
      title: "Presentes de madeira para leitores, cantos de leitura e estantes acolhedoras | Craftygiftsplace",
      metaDescription: "Explora presentes de madeira para leitores, com marcadores, um conjunto de fantasia e peças para cantos de leitura e estantes tranquilas.",
      h1: "Presentes de madeira para leitores e cantos de leitura acolhedores",
      intro: "Quando a intenção já é oferecer algo a um leitor, aqui fica mais fácil comparar marcadores, um conjunto de fantasia a condizer e algumas peças para cantos de leitura sem sair do mesmo tema.",
      primaryCtaLabel: "Ver presentes para leitores na Etsy",
      secondaryCtaLabel: "Ir para as ideias de leitores",
      linkCloud: [
        { label: "Marcadores de livros de madeira", targetKey: "bookmarks" },
        { label: "Presentes de madeira", targetKey: "gifts" },
        { label: "Todas as ideias para leitores", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Porque facilita a escolha",
        quote: "\"O detalhe é incrível, o acabamento é muito bom e nota-se durabilidade. Um marcador lindíssimo.\"",
        attribution: "Comprador de marcador · Avaliação Etsy",
        text: "Evita espalhar o visitante por várias coleções quando a intenção é simples: encontrar um presente para leitor que faça sentido logo à primeira vista.",
        links: [
          { label: "Ver marcadores de livros de madeira", targetKey: "bookmarks" },
          { label: "Ver presentes de madeira", targetKey: "gifts" },
          { label: "Ver resultados para leitores na Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Um marcador de fantasia muito visual para leitores que gostam de detalhes fortes e de um objeto bonito dentro do livro.",
        "Um conjunto pronto a oferecer com marcador, pendente de porta e porta-copos para leitores de fantasia.",
        "Uma pequena peça de ambiente para prateleiras e cantos de leitura quando o presente pode ser mais suave do que estritamente prático.",
        "Um marcador personalizado para quem quer que o presente para leitor pareça mais íntimo, mais sereno e duradouro."
      ],
      featuredWhy: [
        "Mantém a seleção centrada em leitores e hábitos de leitura acolhedores.",
        "Mistura marcadores, um conjunto pronto a oferecer e uma peça decorativa leve.",
        "Remete facilmente para a coleção completa de marcadores se o visitante quiser comparar com mais detalhe."
      ],
      catalogIntro: "Ideias em madeira para leitores, marcadores, conjunto de fantasia e pequenos detalhes para cantos de leitura.",
      faq: [
        { question: "Aqui encontra apenas marcadores?", answer: "Não. Reúne sobretudo marcadores, mas também um conjunto a condizer e uma pequena peça decorativa que funciona bem num canto de leitura." },
        { question: "Existe também uma coleção dedicada aos marcadores?", answer: "Sim. A coleção de marcadores de livros de madeira continua disponível para quem quiser ficar apenas nesse tipo de produto." },
        { question: "Estes presentes combinam com leitores de fantasia?", answer: "Sim. Várias opções estão claramente orientadas para fantasia, sem excluir estilos mais calmos para outros leitores." }
      ],
      relatedLinks: [
        { label: "Marcadores de livros de madeira", targetKey: "bookmarks", description: "Fica na coleção de produto se quiseres comparar mais marcadores." },
        { label: "Presentes de madeira", targetKey: "gifts", description: "Acrescenta porta-velas, pendentes e outros objetos de madeira à ideia de presente." },
        { label: "Presentes de casa nova", targetKey: "housewarming", description: "Passa para ideias mais ligadas à casa se o principal for um presente para um interior novo." }
      ],
      ctaPanel: {
        title: "Pronto para ver presentes para leitores na Etsy?",
        text: "Abre a Etsy para comparar fichas, avaliações e opções que façam mais sentido para o teu leitor.",
        label: "Abrir presentes para leitores na Etsy"
      }
    },
    housewarming: {
      title: "Presentes de madeira para casa nova, mesas de centro, prateleiras e lares acolhedores | Craftygiftsplace",
      metaDescription: "Explora presentes de madeira para casa nova, com porta-copos úteis e peças decorativas acolhedoras para mesas de centro, prateleiras e novos lares.",
      h1: "Presentes de madeira para casa nova, mesas de centro, prateleiras e lares acolhedores",
      intro: "Quando o presente é para uma casa nova, aqui encontra porta-copos úteis, algumas peças decorativas mais suaves e opções que encaixam logo numa mesa de centro, prateleira ou entrada.",
      primaryCtaLabel: "Ver presentes de casa nova na Etsy",
      secondaryCtaLabel: "Ir para as ideias de casa nova",
      linkCloud: [
        { label: "Porta-copos de madeira", targetKey: "coasters" },
        { label: "Presentes para amantes de gatos", targetKey: "cat" },
        { label: "Todas as ideias para a casa", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Porque ajuda a escolher",
        quote: "\"Estes porta-copos são lindos. Parecem resistentes e muito bem feitos.\"",
        attribution: "Andrew · Avaliação Etsy",
        text: "Para uma casa nova, muitos visitantes querem algo útil, decorativo e fácil de integrar no lar. É exatamente nisso que esta seleção se concentra.",
        links: [
          { label: "Ver porta-copos de madeira", targetKey: "coasters" },
          { label: "Ver presentes para amantes de gatos", targetKey: "cat" },
          { label: "Ver presentes de madeira", targetKey: "gifts" }
        ]
      },
      featuredSummaries: [
        "Um conjunto de porta-copos em madeira muito fácil de oferecer para mesas de centro, cafés de manhã e salas novas.",
        "Outra opção prática com um estilo mais celeste para lares acolhedores e prateleiras visíveis.",
        "Uma pequena peça decorativa que acrescenta um apontamento suave a prateleiras ou consolas quando se quer variar para além dos porta-copos.",
        "Um motivo de árvore em madeira que assenta bem em novas prateleiras, mesas de centro e presentes de boas-vindas para a casa."
      ],
      featuredWhy: [
        "Mantém o foco em ideias para a casa claras e fáceis de oferecer.",
        "Mistura porta-copos úteis e uma pequena peça decorativa mais suave.",
        "Ajuda a comparar opções adequadas para mesas de centro, prateleiras e apartamentos."
      ],
      catalogIntro: "Ideias em madeira para casas novas, mesas de centro, prateleiras e interiores acolhedores.",
      faq: [
        { question: "Estas ideias servem para um apartamento ou uma casa pequena?", answer: "Sim. Várias peças são compactas, úteis e fáceis de colocar numa mesa de centro, prateleira ou consola sem ocupar muito espaço." },
        { question: "Os porta-copos continuam a dominar esta seleção?", answer: "Os porta-copos continuam no centro da seleção, mas a página mantém também uma pequena peça decorativa para quem quer algo mais suave." },
        { question: "Posso ver outras ideias de presente a partir daqui?", answer: "Sim. Daqui pode seguir para as coleções e para os guias de gatos ou leitores se a intenção mudar." }
      ],
      relatedLinks: [
        { label: "Porta-copos de madeira", targetKey: "coasters", description: "Compara mais estilos se quiseres ficar num presente prático para a casa." },
        { label: "Presentes para amantes de gatos", targetKey: "cat", description: "Acrescenta um lado felino se a casa nova pertencer a alguém que adora gatos." },
        { label: "Presentes de madeira", targetKey: "gifts", description: "Passa para peças decorativas e recordações se quiseres sair dos porta-copos." }
      ],
      ctaPanel: {
        title: "Pronto para comparar presentes de casa nova na Etsy?",
        text: "Abre a Etsy para ver fichas, preços e avaliações em torno de presentes para novos lares.",
        label: "Abrir ideias de casa nova na Etsy"
      }
    }
  }
};

const pagesPt = buildLocalePages(definition);

pagesPt.push({
  path: "/pt/pages/personalizacao.html",
  template: "contact",
  locale: "pt",
  title: "Como funciona a personalização | Craftygiftsplace",
  metaDescription: "Saiba como adicionar um nome, data ou mensagem a presentes de madeira artesanais da Craftygiftsplace — antes e depois de fazer a encomenda no Etsy.",
  h1: "Como funciona a personalização",
  eyebrow: "Personalize o seu presente",
  intro: "Muitos artigos podem ser personalizados com um nome, data ou mensagem curta. Aqui está o que esperar, passo a passo.",
  breadcrumbs: [
    { label: "Início", path: "/pt/index.html" },
    { label: "Personalização" }
  ],
  navCtaLabel: "Abrir no Etsy",
  primaryCta: {
    label: "Abrir a Craftygiftsplace no Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Contactar a loja no Etsy",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#about"
  },
  sidebar: {
    title: "Dica rápida",
    quote: "\"O vendedor foi incrivelmente prestável quando perguntei sobre as opções de personalização.\"",
    attribution: "Tanya · 5/5 no Etsy",
    text: "Envie uma mensagem à loja antes de encomendar e o vendedor confirmará exatamente o que é possível para a peça escolhida.",
    links: [
      { label: "Abrir a loja Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace" },
      { label: "Ver porta-copos de madeira", href: "/pt/pages/porta-copos-de-madeira.html" },
      { label: "Ver marcadores de livros", href: "/pt/pages/marcadores-de-livros-de-madeira.html" },
      { label: "Porque escolher presentes de madeira?", href: "/pt/pages/por-que-presentes-de-madeira.html" }
    ]
  },
  infoCards: [
    {
      title: "Quais artigos podem ser personalizados?",
      text: "A maioria dos porta-copos, marcadores de livros e lembranças da loja pode ser personalizada. Pode incluir um nome, nomes de casal, uma data curta ou uma mensagem breve. A ficha da Etsy indica o que está disponível para cada peça — e pode sempre enviar uma mensagem antes de encomendar."
    },
    {
      title: "Onde introduzo os detalhes de personalização?",
      text: "Na página da ficha do Etsy, procure o campo 'Adicionar personalização'. Introduza o texto antes de adicionar ao carrinho. Se o campo não estiver visível, envie primeiro uma mensagem ao vendedor."
    },
    {
      title: "Com o que posso personalizar?",
      items: [
        "Um nome próprio ou nomes de casal (ex.: 'Emma' ou 'Emma & James')",
        "Uma data (ex.: data de casamento, aniversário)",
        "Uma mensagem curta de duas ou três linhas",
        "O nome de um animal de estimação para peças comemorativas",
        "Uma frase personalizada para presentes temáticos"
      ]
    },
    {
      title: "Posso enviar mensagem antes de encomendar?",
      text: "Sim, e muitas vezes é a forma mais simples de acertar. Use as mensagens da Etsy para descrever o que pretende. O vendedor responde rapidamente e confirma as opções antes de fazer a encomenda."
    },
    {
      title: "O que acontece após a encomenda?",
      text: "Assim que a encomenda for feita com os detalhes de personalização, o vendedor começa a fabricar a peça. Receberá uma notificação do Etsy quando for enviada. Se algo precisar de ser esclarecido, o vendedor entrará em contacto pelo Etsy."
    },
    {
      title: "E se cometer um erro na personalização?",
      text: "Contacte o vendedor pelo Etsy o mais rapidamente possível após a encomenda. Como cada peça é feita individualmente, as correções são geralmente possíveis se comunicadas atempadamente."
    }
  ],
  faq: [
    {
      question: "A personalização está incluída no preço?",
      answer: "Os custos variam consoante o produto. Consulte a ficha do Etsy para mais detalhes — algumas peças incluem-na, outras têm um pequeno acréscimo. Enviar uma mensagem ao vendedor é a forma mais rápida de confirmar."
    },
    {
      question: "Quanto tempo demora uma encomenda personalizada?",
      answer: "As peças personalizadas são feitas sob encomenda. Conte com alguns dias extra além do prazo de processamento indicado no Etsy. O vendedor também pode aconselhar sobre encomendas urgentes."
    },
    {
      question: "Posso ver uma pré-visualização antes de a peça ser feita?",
      answer: "Em muitos casos, sim. Envie uma mensagem ao vendedor com os seus detalhes e peça uma pré-visualização — especialmente útil para layouts complexos."
    }
  ],
  ctaPanel: {
    title: "Pronto para personalizar o seu presente?",
    text: "Aceda ao Etsy para explorar fichas, verificar opções de personalização e enviar mensagem ao vendedor.",
    label: "Abrir a Craftygiftsplace no Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/pt/pages/personalizacao.html" }
});

pagesPt.push({
  path: "/pt/pages/por-que-presentes-de-madeira.html",
  template: "contact",
  locale: "pt",
  title: "Porque escolher presentes de madeira? Feitos à mão, duradouros e pessoais | Craftygiftsplace",
  metaDescription: "Os presentes de madeira feitos à mão duram mais, parecem mais pessoais e mostram verdadeiro trabalho artesanal. Descubra porque a madeira gravada é uma escolha melhor do que as alternativas genéricas.",
  h1: "Porque os presentes de madeira duram mais do que muitos outros",
  eyebrow: "O argumento para a madeira",
  intro: "Os presentes genéricos esquecem-se. Os presentes de madeira ficam. É por isso que a madeira gravada e feita à mão funciona tão bem em tantas ocasiões.",
  breadcrumbs: [
    { label: "Início", path: "/pt/index.html" },
    { label: "Porque escolher presentes de madeira?" }
  ],
  primaryCta: {
    label: "Ver presentes de madeira no Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Ver todas as coleções",
    targetUrl: "/pt/pages/presentes-de-madeira.html"
  },
  sidebar: {
    title: "O que dizem os compradores",
    quote: "\"O trabalho artesanal é espetacular. Até cheira a madeira fresca.\"",
    attribution: "Alex · 5/5 no Etsy",
    text: "Avaliado com 4,96/5 em centenas de avaliações no Etsy. Os compradores mencionam consistentemente qualidade, detalhe e acabamento duradouro.",
    links: [
      { label: "Porta-copos de madeira", href: "/pt/pages/porta-copos-de-madeira.html" },
      { label: "Marcadores de livros", href: "/pt/pages/marcadores-de-livros-de-madeira.html" },
      { label: "Todos os presentes de madeira", href: "/pt/pages/presentes-de-madeira.html" }
    ]
  },
  infoCards: [
    {
      title: "A madeira sente-se diferente",
      text: "A madeira real tem uma qualidade tátil que nenhum cartão impresso ou alternativa em plástico pode igualar. O peso, o grão, o ligeiro calor do material — tudo isso nota-se antes de o destinatário ler a gravura. Um porta-copos ou marcador de livros em madeira percebe-se como algo feito com intenção, não escolhido de uma lista genérica."
    },
    {
      title: "A gravura torna-o permanente",
      text: "Um nome, uma data, uma frase curta gravada na madeira não desvanece, não descasca e não é lavada. Faz parte da peça. Essa permanência distingue um presente gravado de um que acaba silenciosamente numa gaveta. Os leitores guardam os seus marcadores. Os porta-copos ficam na mesa de centro."
    },
    {
      title: "Funciona para quase qualquer ocasião",
      text: "Presentes de inauguração que ficam na mesa de centro desde o primeiro dia. Presentes para leitores que vivem dentro de um livro favorito. Peças para amantes de gatos presentes todo o ano na prateleira. Os presentes de madeira são funcionais e decorativos ao mesmo tempo, pelo que ficam visíveis em vez de guardados após a ocasião."
    },
    {
      title: "Feito à mão significa: uma pessoa fez",
      text: "Cada peça desta loja é feita por encomenda por uma só pessoa, com gravação a laser e um padrão de acabamento muito claro. Isso nota-se no resultado: a sua encomenda não sai de uma prateleira. É preparada depois de a fazer, o que permite personalizar e manter uma qualidade consistente de peça para peça."
    },
    {
      title: "Ótimo para leitores, amantes de gatos, novas casas e mais",
      items: [
        "Leitores: marcadores de olho de dragão, pena, céltico e fantasia que duram mais do que os livros que marcam",
        "Amantes de gatos: porta-velas Moon Cat e porta-copos com tema felino para prateleiras acolhedoras",
        "Novas casas: conjuntos de porta-copos gravados que parecem escolhidos com intenção, não comprados à pressa",
        "Momentos de memória: placas comemorativas para animais para um presente que reconhece a perda com cuidado",
        "Gamers e tecnologia: porta-chaves de RAM reciclado e cartazes de porta para gaming para secretárias"
      ]
    },
    {
      title: "O argumento honesto para gastar um pouco mais",
      text: "Um presente de madeira bem feito custa mais do que um cartão e menos do que a maioria das experiências. Dura mais do que flores, ocupa menos espaço do que um vale e não precisa de pilhas. Para as ocasiões em que o genérico não chega, é geralmente a escolha certa."
    }
  ],
  faq: [
    {
      question: "Os presentes de madeira são adequados para todas as idades?",
      answer: "Sim. Porta-copos, marcadores de livros e peças decorativas funcionam para adultos de qualquer idade. A gama inclui artigos funcionais para uso diário e lembranças para ocasiões especiais. A loja também tem peças para assinalar os primeiros meses do bebé."
    },
    {
      question: "Os presentes de madeira duram ao longo do tempo?",
      answer: "A bétula e madeiras semelhantes são duráveis e estáveis para uso interior. O detalhe gravado não desvanece. A maioria dos porta-copos tem fundo de cortiça que protege as superfícies. Os compradores mencionam regularmente a durabilidade a par da qualidade visual."
    },
    {
      question: "Os presentes de madeira podem ser personalizados para qualquer ocasião?",
      answer: "Muitas peças podem ser personalizadas com um nome, data ou mensagem curta. Isso torna-as adequadas para aniversários, casamentos, inaugurações e presentes comemorativos. Consulte a página de personalização para todos os detalhes."
    }
  ],
  relatedLinks: [
    { label: "Porta-copos de madeira", href: "/pt/pages/porta-copos-de-madeira.html", description: "Conjuntos de porta-copos gravados para mesas de centro, inaugurações e interiores acolhedores." },
    { label: "Marcadores de livros de madeira", href: "/pt/pages/marcadores-de-livros-de-madeira.html", description: "Marcadores fantasia, clássicos e personalizados para leitores e embalagens de presente." },
    { label: "Presentes de madeira", href: "/pt/pages/presentes-de-madeira.html", description: "Porta-velas, cartazes de porta e lembranças para prateleiras e momentos especiais." },
    { label: "Como funciona a personalização", href: "/pt/pages/personalizacao.html", description: "Adicione um nome, data ou mensagem — aqui está o que esperar." }
  ],
  ctaPanel: {
    title: "Pronto para encontrar o presente de madeira certo?",
    text: "Veja a coleção completa no Etsy — porta-copos, marcadores de livros, lembranças e muito mais.",
    label: "Abrir a Craftygiftsplace no Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/pt/pages/por-que-presentes-de-madeira.html" }
});

// ── Translated Etsy section pages (13) ────────────────────────────────────
pagesPt.push({ path: "/pt/pages/baby-bliss.html",              locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/porta-velas.html",             locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/natal.html",                   locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/faca-voce-mesmo.html",         locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/cabides-de-porta.html",        locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/brinquedos-educativos.html",   locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/prendas-divertidas.html",      locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/presentes-para-gamers.html",   locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/queimadores-incenso.html",     locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/artigos-personalizados.html",  locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/memorial-animais.html",        locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/kit-leitor.html",              locale: "pt", template: "intent" });
pagesPt.push({ path: "/pt/pages/casamento.html",               locale: "pt", template: "intent" });

module.exports = {
  pagesPt
};
