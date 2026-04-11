const { buildLocalePages } = require("./page-data-builder");

const definition = {
  code: "it",
  eyebrows: {
    collection: "Collezione",
    intent: "Guida regalo",
    contact: "Contatto"
  },
  routes: {
    home: "/it/index.html",
    coasters: "/it/pages/sottobicchieri-in-legno.html",
    bookmarks: "/it/pages/segnalibri-in-legno.html",
    gifts: "/it/pages/regali-in-legno.html",
    contact: "/it/pages/contatto.html",
    cat: "/it/pages/regali-per-amanti-dei-gatti.html",
    reader: "/it/pages/regali-per-lettori.html",
    housewarming: "/it/pages/regali-per-la-casa-nuova.html",
    personalization: "/it/pages/personalizzazione.html"
  },
  labels: {
    home: "Home",
    coasters: "Sottobicchieri in legno",
    bookmarks: "Segnalibri in legno",
    gifts: "Regali in legno",
    contact: "Contatto",
    cat: "Regali per amanti dei gatti",
    reader: "Regali per lettori",
    housewarming: "Regali per la casa nuova"
  },
  pages: {
    coasters: {
      title: "Sottobicchieri in legno fatti a mano con incisioni celesti, naturali e più decise | Craftygiftsplace",
      metaDescription: "Esplora sottobicchieri in legno fatti a mano con incisioni celesti, naturali, vichinghe e altri design ricchi di carattere per tavoli, mensole e regali ben scelti.",
      h1: "Sottobicchieri in legno fatti a mano con incisioni celesti, naturali e più decise",
      intro: "Esplora la selezione di sottobicchieri in un solo posto. Questa pagina resta focalizzata sul tipo di prodotto, così è facile confrontare set incisi molto richiesti per tavolini, scrivanie e mensole senza mescolare guide regalo più ampie. Qui trovi design celesti e naturali più tranquilli accanto a scelte più forti, come temi vichinghi, spirituali o pensati per uno spazio hobby.",
      primaryCtaLabel: "Vedi i sottobicchieri su Etsy",
      secondaryCtaLabel: "Vedi la selezione di sottobicchieri",
      linkCloud: [
        { label: "Regali per amanti dei gatti", targetKey: "cat" },
        { label: "Regali per la casa nuova", targetKey: "housewarming" },
        { label: "Tutti gli stili di sottobicchieri", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Acquistare con fiducia",
        quote: "\"Questi sottobicchieri sono bellissimi. Sembrano robusti e molto ben fatti.\"",
        attribution: "Andrew · Recensione Etsy",
        text: "I sottobicchieri funzionano molto bene per una casa nuova o per un regalo quotidiano perché sono utili, caldi e facili da inserire in casa.",
        links: [
          { label: "Vedi i regali per amanti dei gatti", targetKey: "cat" },
          { label: "Vedi i regali per la casa nuova", targetKey: "housewarming" },
          { label: "Esplora i segnalibri in legno", targetKey: "bookmarks" },
          { label: "Come funziona la personalizzazione", targetKey: "personalization" }
        ]
      },
      featuredSummaries: [
        "Un set tra i più venduti che aggiunge un dettaglio caldo in legno a tavolini, mensole e regali per la casa nuova.",
        "Un design celeste per tavole serali, interni accoglienti e regali con una presenza visiva chiara.",
        "Un set inciso dal carattere deciso per decorazioni nordiche, stanze hobby e regali con un tema più forte.",
        "Un set spirituale più tranquillo per angoli tè, mensole e case in cui un dettaglio da tavolo più simbolico si sente naturale."
      ],
      featuredWhy: [
        "Riunisce i temi di sottobicchieri più richiesti in una sola vista chiara.",
        "Permette di confrontare set più tranquilli e design più decisi.",
        "Continua a rimandare a pagine su gatti, casa nuova o regali in legno quando l'intenzione diventa più specifica."
      ],
      catalogIntro: "Una selezione di sottobicchieri che riunisce set molto venduti, regali caldi per la casa e incisioni dal carattere più deciso.",
      faq: [
        { question: "Questi sottobicchieri vanno bene come regalo per la casa nuova?", answer: "Sì. Molti design si adattano naturalmente a un regalo per una casa nuova, perché sono pratici, decorativi e facili da usare fin dal primo giorno." },
        { question: "Qui ci sono anche sottobicchieri con temi più forti?", answer: "Sì. Oltre ai design più delicati, questa pagina raccoglie anche set vichinghi, spirituali, gaming o alternativi con una presenza visiva più marcata." },
        { question: "Si possono vedere anche altre collezioni da qui?", answer: "Sì. Questa pagina collega direttamente a segnalibri, regali in legno e guide per lettori o casa nuova." }
      ],
      relatedLinks: [
        { label: "Regali per amanti dei gatti", targetKey: "cat", description: "Sottobicchieri a tema felino e alcune piccole decorazioni in legno raccolte per questo pubblico." },
        { label: "Regali per la casa nuova", targetKey: "housewarming", description: "Pezzi utili in legno per tavolini, mensole e regali per una nuova casa." },
        { label: "Segnalibri in legno", targetKey: "bookmarks", description: "Lascia i regali per la casa e passa a idee pensate per chi legge." }
      ],
      ctaPanel: {
        title: "Pronto a confrontare i sottobicchieri su Etsy?",
        text: "Apri Etsy per vedere prezzi, dettagli completi e recensioni dei compratori.",
        label: "Apri i sottobicchieri su Etsy"
      }
    },
    bookmarks: {
      title: "Segnalibri in legno fatti a mano per scaffali fantasy e letture tranquille | Craftygiftsplace",
      metaDescription: "Scopri segnalibri in legno fatti a mano per scaffali fantasy, regali per lettori e momenti di lettura tranquilli con molto carattere.",
      h1: "Segnalibri in legno fatti a mano per scaffali fantasy e letture tranquille",
      intro: "Questa pagina mantiene la collezione di segnalibri chiaramente focalizzata sul prodotto. In questo modo è facile confrontare segnalibri in legno per scaffali fantasy, pile di libri e letture tranquille, senza confondere la scelta con guide regalo più ampie.",
      primaryCtaLabel: "Vedi i segnalibri su Etsy",
      secondaryCtaLabel: "Vedi la selezione di segnalibri",
      linkCloud: [
        { label: "Regali per lettori", targetKey: "reader" },
        { label: "Regali in legno", targetKey: "gifts" },
        { label: "Tutti i segnalibri", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Acquistare con fiducia",
        quote: "\"Il livello di dettaglio è incredibile, la lavorazione è ottima e il segnalibro è molto resistente.\"",
        attribution: "Acquirente di segnalibri · Recensione Etsy",
        text: "I segnalibri sono facili da regalare, occupano poco spazio e risultano più personali di un semplice extra infilato in un libro.",
        links: [
          { label: "Vedi i regali per lettori", targetKey: "reader" },
          { label: "Vedi i regali in legno", targetKey: "gifts" },
          { label: "Scopri i sottobicchieri", targetKey: "coasters" },
          { label: "Come funziona la personalizzazione", targetKey: "personalization" }
        ]
      },
      featuredSummaries: [
        "Un segnalibro fantasy molto visivo per lettori che amano dettagli decisi su uno scaffale o in un diario di lettura.",
        "Un'opzione più calma per chi cerca un regalo per lettore con un'aria più classica.",
        "Un set che unisce segnalibro, targhetta da porta e sottobicchieri quando il tema deve già risultare coerente.",
        "Un segnalibro più classico per lettori che preferiscono un regalo sobrio con un dettaglio artigianale."
      ],
      featuredWhy: [
        "Mantiene il focus su segnalibri e dettagli legati alla lettura.",
        "Permette di confrontare rapidamente stili fantasy, classici e personalizzati.",
        "Porta alla pagina dei regali per lettori quando chi compra ha bisogno di un'idea più ampia."
      ],
      catalogIntro: "Una selezione di segnalibri pensata per lettori, scaffali fantasy e momenti di lettura tranquilli.",
      faq: [
        { question: "Questi segnalibri sono soprattutto per lettori fantasy?", answer: "Molti si adattano particolarmente bene a scaffali fantasy e letture d'atmosfera, ma ci sono anche opzioni più sobrie per gusti classici." },
        { question: "Esiste una pagina più ampia di regali per lettori?", answer: "Sì. La pagina dei regali per lettori riunisce segnalibri, set coordinati e alcuni piccoli pezzi in legno per angoli lettura." },
        { question: "Posso scoprire altri tipi di regalo da qui?", answer: "Sì. Questa collezione collega direttamente a regali in legno, sottobicchieri e alle principali guide regalo." }
      ],
      relatedLinks: [
        { label: "Regali per lettori", targetKey: "reader", description: "Segnalibri, set per lettori fantasy e piccoli pezzi per angoli lettura raccolti in una sola pagina." },
        { label: "Regali in legno", targetKey: "gifts", description: "Targhette da porta, portacandela e ricordi per andare oltre il segnalibro." },
        { label: "Sottobicchieri in legno", targetKey: "coasters", description: "Regali in legno più orientati alla casa, al tavolino e a una nuova abitazione." }
      ],
      ctaPanel: {
        title: "Pronto a vedere i segnalibri su Etsy?",
        text: "Apri Etsy per confrontare design, finiture, recensioni e dettagli di personalizzazione.",
        label: "Apri i segnalibri su Etsy"
      }
    },
    gifts: {
      title: "Regali in legno fatti a mano per angoli lettura, mensole e momenti speciali | Craftygiftsplace",
      metaDescription: "Esplora regali in legno fatti a mano, come portacandela, targhette da porta e ricordi personalizzati per mensole, ingressi e momenti speciali.",
      h1: "Regali in legno fatti a mano per angoli lettura, mensole e momenti speciali",
      intro: "Questa collezione riunisce i regali in legno che non sono né sottobicchieri né segnalibri. Aiuta a confrontare portacandela, targhette da porta, ricordi personalizzati e altri pezzi decorativi in uno spazio più tranquillo.",
      primaryCtaLabel: "Vedi i regali in legno su Etsy",
      secondaryCtaLabel: "Vedi la selezione di regali in legno",
      linkCloud: [
        { label: "Regali per lettori", targetKey: "reader" },
        { label: "Regali per la casa nuova", targetKey: "housewarming" },
        { label: "Tutti i regali in legno", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Acquistare con fiducia",
        quote: "\"Ottima qualità, proprio come descritto, con una venditrice gentile e chiara.\"",
        attribution: "Caroline · Recensione Etsy",
        text: "Questa collezione aiuta quando chi compra vuole qualcosa di più decorativo o personale di un regalo legato solo al tavolo o alla lettura.",
        links: [
          { label: "Vedi i regali per lettori", targetKey: "reader" },
          { label: "Vedi i regali per la casa nuova", targetKey: "housewarming" },
          { label: "Vedi la pagina contatto", targetKey: "contact" },
          { label: "Come funziona la personalizzazione", targetKey: "personalization" }
        ]
      },
      featuredSummaries: [
        "Un piccolo portacandela caldo per mensole, consolle e angoli lettura.",
        "Una targhetta da porta più personale quando il regalo deve essere visibile fin dall'ingresso.",
        "Un ricordo personalizzato che si adatta bene a matrimoni, anniversari e momenti che vale la pena conservare.",
        "Un bruciatore d'incenso per mensole e angoli tranquilli quando il regalo in legno deve risultare sereno, decorativo e un po' diverso."
      ],
      featuredWhy: [
        "Riunisce i pezzi in legno più decorativi e personalizzati.",
        "Permette di confrontare regali per casa, ingresso e ricordi in un solo spazio.",
        "Porta con facilità alle pagine per lettori, gatti o casa nuova quando l'intenzione cambia."
      ],
      catalogIntro: "Una selezione di regali in legno per mensole, ingressi, angoli lettura e ricordi da conservare.",
      faq: [
        { question: "Che cosa si trova in questa collezione?", answer: "Qui ci sono portacandela, targhette da porta, ricordi personalizzati e altri pezzi in legno che non rientrano in sottobicchieri o segnalibri." },
        { question: "Questi regali vanno bene anche per la casa nuova?", answer: "Sì. Diversi pezzi funzionano molto bene su mensole, ingressi e angoli accoglienti di una casa nuova." },
        { question: "Posso continuare a navigare verso altre collezioni da qui?", answer: "Sì. Questa pagina collega a sottobicchieri, segnalibri e alle principali guide regalo." }
      ],
      relatedLinks: [
        { label: "Regali per lettori", targetKey: "reader", description: "Idee pensate per libri, angoli lettura e alcuni piccoli set coordinati." },
        { label: "Regali per la casa nuova", targetKey: "housewarming", description: "Pezzi in legno utili e decorativi per nuove case e appartamenti." },
        { label: "Contatto", targetKey: "contact", description: "Passa da Etsy se vuoi chiedere informazioni sulla personalizzazione o su un regalo specifico." }
      ],
      ctaPanel: {
        title: "Pronto a vedere altri regali in legno su Etsy?",
        text: "Apri Etsy per confrontare schede prodotto, prezzi, recensioni e opzioni di personalizzazione.",
        label: "Apri i regali in legno su Etsy"
      }
    },
    contact: {
      title: "Contatta Craftygiftsplace per regali in legno personalizzati | Craftygiftsplace",
      metaDescription: "Contatta Craftygiftsplace su Etsy per domande sulla personalizzazione, aiuto nella scelta di un regalo o confronto tra sottobicchieri, segnalibri e decorazioni in legno.",
      h1: "Hai una domanda o vuoi personalizzare?",
      intro: "Per un ordine, una personalizzazione o una domanda su un articolo specifico, Etsy resta il punto di contatto migliore. Questa pagina mostra solo il passo successivo più chiaro e alcuni accessi semplici alle collezioni principali.",
      primaryCtaLabel: "Scrivici su Etsy",
      secondaryCtaLabel: "Leggi le recensioni Etsy",
      infoCards: [
        { title: "Piccolo laboratorio di legno fatto a mano", text: "Craftygiftsplace si concentra su regali in legno incisi che risultano caldi, utili e personali. La selezione mostrata qui resta vicina a lettori, amanti dei gatti, case accoglienti e alcuni ricordi personalizzati." },
        { title: "Materiali e finitura", items: ["Il legno è scelto per un'incisione pulita, una venatura visibile e una finitura naturalmente calda.", "Molti set di sottobicchieri usano il fondo in sughero quando è indicato nella scheda Etsy.", "Ogni pezzo viene controllato dopo l'incisione per mantenere un risultato pulito, caldo e piacevole da regalare."] },
        { title: "Come funziona il processo", text: "Le idee partono spesso da un tema, un nome o una piccola scritta, poi passano da incisione, finitura a mano e controllo finale prima di arrivare su Etsy." },
        { title: "Che cosa si può chiedere", items: ["Personalizzazione con nome, data o messaggio breve.", "Aiuto nella scelta tra sottobicchieri, segnalibri e altri regali in legno.", "Suggerimenti per un regalo per la casa nuova, per lettori o per un'occasione importante."] },
        { title: "Perché Etsy resta il contatto giusto", text: "Etsy riunisce ordini, tempi di consegna, note di personalizzazione, protezione dell'acquirente e messaggi nello stesso posto." },
        { title: "Buoni punti da cui iniziare", text: "Se qualcuno è ancora indeciso, il modo migliore è iniziare dai sottobicchieri in legno, dai segnalibri in legno o da una delle guide regalo." }
      ],
      sidebar: {
        title: "Acquistare con fiducia",
        quote: "\"È stato un vero piacere acquistare qui... tornerò sicuramente.\"",
        attribution: "Clare · Recensione Etsy",
        text: "La pagina contatto resta semplice: scrivi su Etsy per un dubbio sull'ordine, oppure esplora prima una collezione se vuoi confrontare gli stili.",
        links: [
          { label: "Sottobicchieri in legno", targetKey: "coasters" },
          { label: "Regali per lettori", targetKey: "reader" },
          { label: "Regali per la casa nuova", targetKey: "housewarming" }
        ]
      },
      faq: [
        { question: "Gli ordini si fanno su questo sito?", answer: "No. Ordini e messaggi passano da Etsy, dove restano raccolti scheda prodotto, consegna e opzioni di personalizzazione." },
        { question: "Posso chiedere la personalizzazione prima di acquistare?", answer: "Sì. I messaggi Etsy sono il posto migliore per chiedere un nome, una data o una breve scritta prima dell'ordine." },
        { question: "Posso vedere le collezioni prima di scrivere?", answer: "Sì. Le collezioni principali e le guide regalo restano collegate da questa pagina per confrontare con calma prima di scrivere." }
      ],
      ctaPanel: {
        title: "Pronto a scrivere o a navigare su Etsy?",
        text: "Apri il negozio Etsy per inviare un messaggio, leggere le recensioni o continuare a esplorare le schede che si adattano alla tua idea regalo.",
        label: "Apri Craftygiftsplace su Etsy"
      }
    },
    cat: {
      title: "Regali in legno per amanti dei gatti, case accoglienti e idee Etsy ben pensate | Craftygiftsplace",
      metaDescription: "Scopri regali in legno per amanti dei gatti, con sottobicchieri felini e decorazioni calde per mensole, tavolini e idee che portano su Etsy.",
      h1: "Regali in legno per amanti dei gatti, mensole e tavolini",
      intro: "Questa pagina è per chi sa già di voler regalare qualcosa a un amante dei gatti. Riunisce i migliori pezzi a tema felino in un solo posto: sottobicchieri per tavolini, design con gatti dal tono più celeste e un piccolo pezzo decorativo per mensole o angoli lettura.",
      primaryCtaLabel: "Vedi i regali per gatti su Etsy",
      secondaryCtaLabel: "Vai alle idee per amanti dei gatti",
      linkCloud: [
        { label: "Sottobicchieri in legno", targetKey: "coasters" },
        { label: "Regali per la casa nuova", targetKey: "housewarming" },
        { label: "Tutti i regali per gatti", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Perché questa pagina aiuta",
        quote: "\"Questi sottobicchieri sono bellissimi. Sembrano robusti e molto ben fatti.\"",
        attribution: "Andrew · Recensione Etsy",
        text: "I pezzi a tema gatto erano già popolari nel negozio. Questa pagina li raccoglie per confrontarli senza saltare da una categoria all'altra.",
        links: [
          { label: "Vedi i sottobicchieri in legno", targetKey: "coasters" },
          { label: "Vedi i regali per la casa nuova", targetKey: "housewarming" },
          { label: "Vedi i risultati per gatti su Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Un favorito a tema felino che resta decorativo e pratico per salotto, scrivania o compleanno.",
        "Un'opzione più lunare per chi ama i gatti e un'atmosfera più celeste sul tavolino.",
        "Un piccolo pezzo decorativo pensato per mensole, comodini e angoli lettura più delicati.",
        "Un set di sottobicchieri a tema gatto più semplice per chi cerca un regalo pratico con un tema felino ben riconoscibile."
      ],
      featuredWhy: [
        "Mantiene i regali a tema gatto in una selezione calma e facile da scorrere.",
        "Mescola set utili con un pezzo decorativo più morbido.",
        "Funziona bene quando il regalo deve sembrare accogliente, utile e chiaramente legato ai gatti."
      ],
      catalogIntro: "Le scelte migliori a tema gatto per case accoglienti, mensole e regali intorno a un tavolino.",
      faq: [
        { question: "Tutti questi regali per amanti dei gatti sono sottobicchieri?", answer: "No. La pagina riunisce set di sottobicchieri a tema felino e un piccolo pezzo decorativo in legno per scegliere tra regalo pratico e regalo più visivo." },
        { question: "Queste idee vanno bene anche per la casa nuova?", answer: "Sì. Diversi modelli funzionano molto bene per una nuova casa, soprattutto quando il regalo deve sembrare utile e accogliente." },
        { question: "Posso continuare a vedere tutta la collezione di sottobicchieri?", answer: "Sì. Questa pagina collega direttamente alla collezione completa per chi vuole confrontare più temi." }
      ],
      relatedLinks: [
        { label: "Sottobicchieri in legno", targetKey: "coasters", description: "Una selezione di sottobicchieri con stili felini, celesti e botanici." },
        { label: "Regali per la casa nuova", targetKey: "housewarming", description: "Pezzi utili in legno per nuove case, tavolini e mensole." },
        { label: "Regali in legno", targetKey: "gifts", description: "Esplora pezzi decorativi e targhette se vuoi andare oltre i sottobicchieri." }
      ],
      ctaPanel: {
        title: "Pronto a confrontare i regali per gatti su Etsy?",
        text: "Apri Etsy per confrontare design, prezzi e recensioni intorno a idee a tema felino.",
        label: "Apri i regali per gatti su Etsy"
      }
    },
    reader: {
      title: "Regali in legno per lettori, angoli lettura e scaffali accoglienti | Craftygiftsplace",
      metaDescription: "Esplora regali in legno per lettori, con segnalibri, un set per lettori fantasy e pezzi per angoli lettura e scaffali tranquilli.",
      h1: "Regali in legno per lettori e angoli lettura accoglienti",
      intro: "Questa pagina aiuta chi sta già cercando un regalo per lettori. Riunisce segnalibri, un set per lettori fantasy coordinato e alcuni pezzi che stanno bene in un angolo lettura, così si possono confrontare più stili senza uscire dallo stesso tema.",
      primaryCtaLabel: "Vedi i regali per lettori su Etsy",
      secondaryCtaLabel: "Vai alle idee per lettori",
      linkCloud: [
        { label: "Segnalibri in legno", targetKey: "bookmarks" },
        { label: "Regali in legno", targetKey: "gifts" },
        { label: "Tutte le idee per lettori", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Perché questa pagina aiuta",
        quote: "\"Il livello di dettaglio è incredibile, la lavorazione è ottima e il segnalibro è molto resistente.\"",
        attribution: "Acquirente di segnalibri · Recensione Etsy",
        text: "Evita di spargere il visitatore tra più collezioni quando l'intenzione è semplice: trovare un regalo per lettori che sembri giusto fin dal primo sguardo.",
        links: [
          { label: "Vedi i segnalibri in legno", targetKey: "bookmarks" },
          { label: "Vedi i regali in legno", targetKey: "gifts" },
          { label: "Vedi i risultati per lettori su Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Un segnalibro fantasy molto visivo per lettori che amano dettagli forti e un bel oggetto tra le pagine.",
        "Un set pronto da regalare con segnalibro, targhetta da porta e sottobicchieri per lettori fantasy.",
        "Un piccolo pezzo d'atmosfera per mensole e angoli lettura quando il regalo può essere più morbido che strettamente pratico.",
        "Un segnalibro personalizzato per chi vuole che il regalo per lettori sembri più intimo, più tranquillo e duraturo."
      ],
      featuredWhy: [
        "Mantiene la selezione centrata su lettori e abitudini di lettura accoglienti.",
        "Mescola segnalibri, un set pronto da regalare e un pezzo decorativo leggero.",
        "Rimanda facilmente alla collezione completa di segnalibri se il visitatore vuole confrontare con più dettaglio."
      ],
      catalogIntro: "Idee in legno per lettori, segnalibri, set per lettori fantasy e piccoli dettagli per angoli lettura.",
      faq: [
        { question: "Questa pagina include solo segnalibri?", answer: "No. Riunisce soprattutto segnalibri, ma anche un set coordinato e un piccolo pezzo decorativo che funziona bene in un angolo lettura." },
        { question: "Esiste anche una collezione dedicata ai segnalibri?", answer: "Sì. La collezione di segnalibri in legno resta disponibile per chi vuole restare solo su questo tipo di prodotto." },
        { question: "Questi regali si adattano ai lettori fantasy?", answer: "Sì. Diverse opzioni sono chiaramente orientate al fantasy, senza escludere stili più tranquilli per altri lettori." }
      ],
      relatedLinks: [
        { label: "Segnalibri in legno", targetKey: "bookmarks", description: "Resta sulla collezione prodotto se vuoi confrontare più segnalibri." },
        { label: "Regali in legno", targetKey: "gifts", description: "Aggiungi portacandela, targhette e altri oggetti in legno all'idea regalo." },
        { label: "Regali per la casa nuova", targetKey: "housewarming", description: "Passa a idee più legate alla casa se il regalo serve soprattutto per un interno nuovo." }
      ],
      ctaPanel: {
        title: "Pronto a vedere i regali per lettori su Etsy?",
        text: "Apri Etsy per confrontare schede, recensioni e opzioni che si adattano meglio al tuo lettore.",
        label: "Apri i regali per lettori su Etsy"
      }
    },
    housewarming: {
      title: "Regali in legno per la casa nuova, tavolini, mensole e case accoglienti | Craftygiftsplace",
      metaDescription: "Esplora regali in legno per la casa nuova, con sottobicchieri utili e pezzi decorativi caldi per tavolini, mensole e nuovi ambienti.",
      h1: "Regali in legno per la casa nuova, tavolini, mensole e case accoglienti",
      intro: "Questa pagina è per chi sta già cercando un regalo per una casa nuova. Si concentra su sottobicchieri utili, qualche pezzo decorativo più morbido e idee che hanno subito senso su un tavolino, una mensola o un ingresso.",
      primaryCtaLabel: "Vedi i regali per la casa nuova su Etsy",
      secondaryCtaLabel: "Vai alle idee per la casa nuova",
      linkCloud: [
        { label: "Sottobicchieri in legno", targetKey: "coasters" },
        { label: "Regali per amanti dei gatti", targetKey: "cat" },
        { label: "Tutte le idee per la casa", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Perché questa pagina funziona",
        quote: "\"Questi sottobicchieri sono bellissimi. Sembrano robusti e molto ben fatti.\"",
        attribution: "Andrew · Recensione Etsy",
        text: "Per una casa nuova, molti visitatori vogliono qualcosa di utile, decorativo e facile da integrare nell'ambiente. Questa pagina mantiene proprio quel focus.",
        links: [
          { label: "Vedi i sottobicchieri in legno", targetKey: "coasters" },
          { label: "Vedi i regali per gatti", targetKey: "cat" },
          { label: "Vedi i regali in legno", targetKey: "gifts" }
        ]
      },
      featuredSummaries: [
        "Un set di sottobicchieri in legno molto facile da regalare per tavolini, caffè del mattino e nuovi salotti.",
        "Un'altra opzione pratica con uno stile più celeste per case calde e mensole in vista.",
        "Un piccolo pezzo decorativo che aggiunge un accento morbido su mensole o consolle quando si vuole variare oltre i sottobicchieri.",
        "Un motivo ad albero caldo in legno che si adatta bene a nuove mensole, tavolini e regali di benvenuto per la casa."
      ],
      featuredWhy: [
        "Mantiene il focus su idee per la casa chiare e facili da regalare.",
        "Mescola sottobicchieri utili e un piccolo pezzo decorativo più delicato.",
        "Aiuta a confrontare opzioni adatte a tavolini, mensole e appartamenti."
      ],
      catalogIntro: "Idee in legno per case nuove, tavolini, mensole e interni accoglienti.",
      faq: [
        { question: "Queste idee vanno bene per un appartamento o una casa piccola?", answer: "Sì. Diversi pezzi sono compatti, utili e facili da sistemare su un tavolino, una mensola o una consolle senza occupare troppo spazio." },
        { question: "In questa pagina dominano i sottobicchieri?", answer: "I sottobicchieri restano al centro della selezione, ma la pagina mantiene anche un piccolo pezzo decorativo per chi vuole qualcosa di più morbido." },
        { question: "Posso vedere altre idee regalo da qui?", answer: "Sì. Questa pagina collega alle collezioni e alle guide per gatti o lettori se l'intenzione cambia." }
      ],
      relatedLinks: [
        { label: "Sottobicchieri in legno", targetKey: "coasters", description: "Confronta altri stili se vuoi restare su un regalo pratico per la casa." },
        { label: "Regali per amanti dei gatti", targetKey: "cat", description: "Aggiungi un tocco felino se la casa nuova appartiene a qualcuno che adora i gatti." },
        { label: "Regali in legno", targetKey: "gifts", description: "Passa a pezzi decorativi e ricordi se vuoi uscire dal mondo dei sottobicchieri." }
      ],
      ctaPanel: {
        title: "Pronto a confrontare i regali per la casa nuova su Etsy?",
        text: "Apri Etsy per vedere schede, prezzi e recensioni intorno ai regali per nuovi ambienti.",
        label: "Apri le idee per la casa nuova su Etsy"
      }
    }
  }
};

const pagesIt = buildLocalePages(definition);

pagesIt.push({
  path: "/it/pages/personalizzazione.html",
  template: "contact",
  locale: "it",
  title: "Come funziona la personalizzazione | Craftygiftsplace",
  metaDescription: "Scopri come aggiungere un nome, una data o un messaggio ai regali in legno artigianali di Craftygiftsplace — prima e dopo l'ordine su Etsy.",
  h1: "Come funziona la personalizzazione",
  eyebrow: "Personalizza il tuo regalo",
  intro: "Molti articoli possono essere personalizzati con un nome, una data o un breve messaggio. Ecco cosa aspettarti, passo dopo passo.",
  breadcrumbs: [
    { label: "Home", path: "/it/index.html" },
    { label: "Personalizzazione" }
  ],
  primaryCta: {
    label: "Apri Craftygiftsplace su Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Contatta il negozio su Etsy",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#about"
  },
  sidebar: {
    title: "Consiglio rapido",
    quote: "\"Il venditore è stato incredibilmente disponibile quando ho chiesto della personalizzazione.\"",
    attribution: "Tanya · 5/5 su Etsy",
    text: "Invia un messaggio al negozio prima di ordinare e il venditore confermerà esattamente cosa è possibile per il pezzo scelto.",
    links: [
      { label: "Apri il negozio Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace" },
      { label: "Vedi i sottobicchieri", href: "/it/pages/sottobicchieri-in-legno.html" },
      { label: "Vedi i segnalibri", href: "/it/pages/segnalibri-in-legno.html" }
    ]
  },
  infoCards: [
    {
      title: "Quali articoli possono essere personalizzati?",
      text: "La maggior parte dei sottobicchieri, segnalibri e ricordi del negozio può essere personalizzata. Questo include l'aggiunta di un nome, nomi di coppia, una data breve o un breve messaggio. La scheda Etsy indica cosa è disponibile per ogni pezzo — e puoi sempre inviare un messaggio prima di ordinare."
    },
    {
      title: "Dove inserisco i dettagli di personalizzazione?",
      text: "Nella pagina della scheda Etsy, cerca il campo 'Aggiungi la tua personalizzazione'. Inserisci il testo prima di aggiungere al carrello. Se il campo non è visibile, invia prima un messaggio al venditore."
    },
    {
      title: "Con cosa posso personalizzare?",
      items: [
        "Un nome o nomi di coppia (es. 'Emma' o 'Emma & James')",
        "Una data (es. data di matrimonio, compleanno o anniversario)",
        "Un breve messaggio di due o tre righe",
        "Il nome di un animale per i pezzi commemorativi",
        "Una frase personalizzata per regali tematici"
      ]
    },
    {
      title: "Posso scrivere prima di ordinare?",
      text: "Sì, ed è spesso il modo più semplice per ottenere il risultato desiderato. Usa la messaggistica Etsy per descrivere cosa vuoi. Il venditore risponde rapidamente e confermerà le opzioni prima dell'ordine."
    },
    {
      title: "Cosa succede dopo l'ordine?",
      text: "Una volta effettuato l'ordine con i dettagli di personalizzazione, il venditore inizia la produzione. Riceverai una notifica Etsy alla spedizione. Se qualcosa deve essere chiarito, il venditore ti contatterà tramite Etsy."
    },
    {
      title: "E se sbaglio la personalizzazione?",
      text: "Contatta il venditore tramite Etsy il prima possibile dopo l'ordine. Poiché ogni pezzo è realizzato individualmente, le correzioni sono di solito possibili se segnalate tempestivamente."
    }
  ],
  faq: [
    {
      question: "La personalizzazione è inclusa nel prezzo?",
      answer: "I costi variano in base al prodotto. Controlla la scheda Etsy per i dettagli — alcuni pezzi la includono, altri hanno un piccolo supplemento. Scrivere al venditore è il modo più rapido per confermare."
    },
    {
      question: "Quanto tempo richiede un ordine personalizzato?",
      answer: "I pezzi personalizzati vengono realizzati su ordinazione. Prevedi alcuni giorni extra oltre al tempo di lavorazione indicato su Etsy. Il venditore può anche consigliare per ordini urgenti."
    },
    {
      question: "Posso vedere un'anteprima prima della realizzazione?",
      answer: "In molti casi sì. Invia un messaggio al venditore con i tuoi dettagli e chiedi un'anteprima — particolarmente utile per layout complessi."
    }
  ],
  ctaPanel: {
    title: "Pronto a personalizzare il tuo regalo?",
    text: "Vai su Etsy per sfogliare le schede, verificare le opzioni di personalizzazione e inviare un messaggio al venditore.",
    label: "Apri Craftygiftsplace su Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/it/pages/personalizzazione.html" }
});

module.exports = {
  pagesIt
};
