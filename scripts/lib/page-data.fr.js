const { buildLocalePages } = require("./page-data-builder");

const definition = {
  code: "fr",
  eyebrows: {
    collection: "Collection",
    intent: "Guide cadeau",
    contact: "Contact"
  },
  routes: {
    home: "/fr/index.html",
    coasters: "/fr/pages/sous-verres-en-bois.html",
    bookmarks: "/fr/pages/marque-pages-en-bois.html",
    gifts: "/fr/pages/cadeaux-en-bois.html",
    contact: "/fr/pages/contact.html",
    cat: "/fr/pages/cadeaux-pour-amoureux-des-chats.html",
    reader: "/fr/pages/cadeaux-pour-lecteurs.html",
    housewarming: "/fr/pages/cadeaux-de-cremaillere.html",
    personalization: "/fr/pages/personnalisation.html"
  },
  labels: {
    home: "Accueil",
    coasters: "Sous-verres en bois",
    bookmarks: "Marque-pages en bois",
    gifts: "Cadeaux en bois",
    contact: "Contact",
    cat: "Cadeaux pour amoureux des chats",
    reader: "Cadeaux pour lecteurs",
    housewarming: "Cadeaux de crémaillère"
  },
  pages: {
    coasters: {
      title: "Sous-verres en bois faits main aux gravures célestes, naturelles et plus marquées | Craftygiftsplace",
      metaDescription: "Parcourez des sous-verres en bois faits main aux gravures célestes, naturelles, vikings et autres motifs affirmés pour tables, étagères et cadeaux attentionnés.",
      h1: "Sous-verres en bois faits main aux gravures célestes, naturelles et plus marquées",
      intro: "Parcourez la sélection de sous-verres en un seul endroit. Cette page reste centrée sur le type de produit afin de comparer des sets gravés appréciés pour tables basses, bureaux et étagères sans mélanger les guides cadeaux plus larges. On y trouve des modèles célestes ou nature plus calmes, mais aussi des choix plus affirmés comme des motifs vikings, spirituels ou pensés pour une pièce à vivre avec plus de caractère.",
      primaryCtaLabel: "Voir les sous-verres sur Etsy",
      secondaryCtaLabel: "Voir la sélection de sous-verres",
      linkCloud: [
        { label: "Cadeaux pour amoureux des chats", targetKey: "cat" },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming" },
        { label: "Tous les styles de sous-verres", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Acheter en confiance",
        quote: "\"Ces sous-verres sont magnifiques. Ils semblent solides et bien faits.\"",
        attribution: "Andrew · Avis Etsy",
        text: "Les sous-verres fonctionnent très bien pour une crémaillère ou un cadeau du quotidien, parce qu'ils sont utiles, chaleureux et faciles à intégrer dans la maison.",
        links: [
          { label: "Voir les cadeaux pour amoureux des chats", targetKey: "cat" },
          { label: "Voir les cadeaux de crémaillère", targetKey: "housewarming" },
          { label: "Parcourir les marque-pages en bois", targetKey: "bookmarks" },
          { label: "Comment personnaliser", targetKey: "personalization" },
          { label: "Pourquoi des cadeaux en bois ?", href: "/fr/pages/pourquoi-des-cadeaux-en-bois.html" }
        ]
      },
      featuredSummaries: [
        "Un set parmi les meilleures ventes qui apporte un détail chaleureux à une table basse, une étagère ou un cadeau de crémaillère.",
        "Un modèle céleste pour tables du soir, intérieurs cosy et cadeaux au style visuel affirmé.",
        "Un set gravé au style nordique pour décors inspirés des sagas, bureaux et cadeaux plus marqués.",
        "Un set spirituel plus apaisé pour coins thé, étagères et intérieurs où un détail de table plus symbolique trouve naturellement sa place."
      ],
      featuredWhy: [
        "Elle rassemble les thèmes de sous-verres les plus appréciés en un seul aperçu.",
        "Elle permet de comparer des sets plus calmes et des designs plus marqués.",
        "Elle renvoie toujours vers les pages chats, crémaillère ou cadeaux en bois quand l'intention devient plus précise."
      ],
      catalogIntro: "Une sélection de sous-verres qui réunit des sets appréciés, des cadeaux de maison chaleureux et des gravures plus distinctives.",
      faq: [
        {
          question: "Ces sous-verres conviennent-ils pour une crémaillère ?",
          answer: "Oui. Beaucoup de motifs conviennent naturellement à un cadeau de maison, car ils sont à la fois pratiques, décoratifs et faciles à utiliser dès le premier jour."
        },
        {
          question: "Trouve-t-on ici aussi des sous-verres au style plus affirmé ?",
          answer: "Oui. En plus des motifs plus doux, cette page réunit aussi des sets vikings, spirituels, gaming ou alternatifs avec une présence visuelle plus forte."
        },
        {
          question: "Peut-on encore découvrir d'autres collections depuis ici ?",
          answer: "Oui. Cette page renvoie directement vers les marque-pages, les cadeaux en bois et les guides lecteurs ou crémaillère."
        }
      ],
      relatedLinks: [
        { label: "Cadeaux pour amoureux des chats", targetKey: "cat", description: "Des sous-verres à thème chat et quelques objets déco en bois regroupés pour ce public." },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming", description: "Des pièces en bois utiles pour tables basses, étagères et cadeaux de maison." },
        { label: "Marque-pages en bois", targetKey: "bookmarks", description: "Quittez les cadeaux pour la maison et passez à des idées pensées pour les lecteurs." }
      ],
      ctaPanel: {
        title: "Prêt à comparer les sous-verres sur Etsy ?",
        text: "Ouvrez la recherche Etsy pour voir les prix, les détails complets et les avis acheteurs.",
        label: "Ouvrir les sous-verres sur Etsy"
      }
    },
    bookmarks: {
      title: "Marque-pages en bois faits main pour étagères de fantasy et lectures paisibles | Craftygiftsplace",
      metaDescription: "Découvrez des marque-pages en bois faits main pour étagères de fantasy, cadeaux pour lecteurs et moments de lecture calmes avec beaucoup de caractère.",
      h1: "Marque-pages en bois faits main pour étagères de fantasy et lectures paisibles",
      intro: "Cette page garde la collection de marque-pages clairement centrée sur le produit. Les visiteurs peuvent ainsi comparer des marque-pages en bois pour étagères de fantasy, piles de livres et lectures calmes, sans brouiller la sélection avec des guides cadeaux plus larges.",
      primaryCtaLabel: "Voir les marque-pages sur Etsy",
      secondaryCtaLabel: "Voir la sélection de marque-pages",
      linkCloud: [
        { label: "Cadeaux pour lecteurs", targetKey: "reader" },
        { label: "Cadeaux en bois", targetKey: "gifts" },
        { label: "Tous les marque-pages", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Acheter en confiance",
        quote: "\"Le niveau de détail est superbe, la finition est soignée et le marque-page est très durable.\"",
        attribution: "Acheteur de marque-page · Avis Etsy",
        text: "Les marque-pages restent faciles à offrir, peu encombrants et plus personnels qu'un simple complément glissé dans un livre.",
        links: [
          { label: "Voir les cadeaux pour lecteurs", targetKey: "reader" },
          { label: "Voir les cadeaux en bois", targetKey: "gifts" },
          { label: "Découvrir les sous-verres", targetKey: "coasters" },
          { label: "Comment personnaliser", targetKey: "personalization" },
          { label: "Pourquoi des cadeaux en bois ?", href: "/fr/pages/pourquoi-des-cadeaux-en-bois.html" }
        ]
      },
      featuredSummaries: [
        "Un marque-page fantasy très visuel pour lecteurs qui aiment les détails marqués sur une étagère ou dans un journal de lecture.",
        "Une option plus calme pour ceux qui cherchent un cadeau pour lecteur avec une allure plus classique.",
        "Un set qui réunit marque-page, suspension de porte et sous-verres quand le thème doit déjà être cohérent.",
        "Un marque-page plus classique pour lecteurs qui préfèrent un cadeau sobre avec un détail artisanal."
      ],
      featuredWhy: [
        "Elle garde l'accent clairement sur les marque-pages et les idées proches de la lecture.",
        "Elle permet de comparer rapidement des styles fantasy, classiques et personnalisés.",
        "Elle renvoie vers les cadeaux pour lecteurs quand l'acheteur cherche une idée plus large."
      ],
      catalogIntro: "Une sélection de marque-pages pensée pour lecteurs, étagères de fantasy et moments de lecture paisibles.",
      faq: [
        {
          question: "Ces marque-pages conviennent-ils surtout aux lecteurs de fantasy ?",
          answer: "Beaucoup d'entre eux fonctionnent particulièrement bien pour des étagères de fantasy et des lectures d'ambiance, mais il existe aussi des modèles plus sobres pour des goûts plus classiques."
        },
        {
          question: "Existe-t-il une page plus large pour les cadeaux destinés aux lecteurs ?",
          answer: "Oui. La page cadeaux pour lecteurs réunit des marque-pages, des sets assortis et quelques petits objets en bois pour coin lecture."
        },
        {
          question: "Puis-je découvrir d'autres types de cadeaux depuis ici ?",
          answer: "Oui. Cette collection renvoie directement vers les cadeaux en bois, les sous-verres et les principaux guides cadeaux."
        }
      ],
      relatedLinks: [
        { label: "Cadeaux pour lecteurs", targetKey: "reader", description: "Des marque-pages, des coffrets pour lecteurs de fantasy et de petits objets pour coins lecture réunis sur une seule page." },
        { label: "Cadeaux en bois", targetKey: "gifts", description: "Des suspensions de porte, porte-bougies et souvenirs pour aller au-delà du marque-page." },
        { label: "Sous-verres en bois", targetKey: "coasters", description: "Des cadeaux en bois plus tournés vers la maison, les tables basses et les crémaillères." }
      ],
      ctaPanel: {
        title: "Prêt à voir les marque-pages sur Etsy ?",
        text: "Ouvrez Etsy pour comparer les motifs, les finitions, les avis et les détails de personnalisation.",
        label: "Ouvrir les marque-pages sur Etsy"
      }
    },
    gifts: {
      title: "Cadeaux en bois faits main pour coins lecture, étagères et moments marquants | Craftygiftsplace",
      metaDescription: "Parcourez des cadeaux en bois faits main, comme porte-bougies, suspensions de porte et souvenirs personnalisés pour étagères, entrées et occasions marquantes.",
      h1: "Cadeaux en bois faits main pour coins lecture, étagères et moments marquants",
      intro: "Cette collection réunit les cadeaux en bois qui ne sont ni des sous-verres ni des marque-pages. Elle aide à comparer des porte-bougies, suspensions de porte, souvenirs personnalisés et autres pièces décoratives dans un seul endroit plus calme.",
      primaryCtaLabel: "Voir les cadeaux en bois sur Etsy",
      secondaryCtaLabel: "Voir la sélection de cadeaux en bois",
      linkCloud: [
        { label: "Cadeaux pour lecteurs", targetKey: "reader" },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming" },
        { label: "Tous les cadeaux en bois", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Acheter en confiance",
        quote: "\"Très belle qualité, conforme à la description, avec une vendeuse aimable et claire.\"",
        attribution: "Caroline · Avis Etsy",
        text: "Cette collection aide quand l'acheteur veut quelque chose d'un peu plus décoratif ou personnel que des cadeaux centrés sur la table ou la lecture.",
        links: [
          { label: "Voir les cadeaux pour lecteurs", targetKey: "reader" },
          { label: "Voir les cadeaux de crémaillère", targetKey: "housewarming" },
          { label: "Voir la page contact", targetKey: "contact" },
          { label: "Comment personnaliser", targetKey: "personalization" },
          { label: "Pourquoi des cadeaux en bois ?", href: "/fr/pages/pourquoi-des-cadeaux-en-bois.html" }
        ]
      },
      featuredSummaries: [
        "Un petit porte-bougie chaleureux pour étagères, consoles et coins lecture.",
        "Une suspension de porte plus personnelle quand le cadeau doit être visible dès l'entrée.",
        "Un souvenir personnalisé qui convient aux mariages, anniversaires et moments que l'on veut garder en évidence.",
        "Un brûleur d'encens pour étagères et coins calmes quand le cadeau en bois doit paraître apaisant, décoratif et un peu différent."
      ],
      featuredWhy: [
        "Elle rassemble les pièces en bois plus décoratives et personnalisées.",
        "Elle permet de comparer des cadeaux pour maison, entrée et souvenirs dans un seul espace.",
        "Elle renvoie facilement vers les pages lecteurs, chats ou crémaillère si l'intention devient plus précise."
      ],
      catalogIntro: "Une sélection de cadeaux en bois pour étagères, entrées, coins lecture et souvenirs à garder.",
      faq: [
        {
          question: "Que trouve-t-on dans cette collection ?",
          answer: "Vous y trouverez des porte-bougies, des suspensions de porte, des souvenirs personnalisés et d'autres pièces en bois qui ne relèvent pas des sous-verres ou des marque-pages."
        },
        {
          question: "Ces cadeaux conviennent-ils à une crémaillère ?",
          answer: "Oui. Plusieurs pièces fonctionnent très bien pour des étagères, entrées et coins chaleureux dans une nouvelle maison."
        },
        {
          question: "Puis-je encore accéder aux autres collections depuis ici ?",
          answer: "Oui. Cette page renvoie vers les sous-verres, les marque-pages et les principaux guides cadeaux."
        }
      ],
      relatedLinks: [
        { label: "Cadeaux pour lecteurs", targetKey: "reader", description: "Des idées pensées pour les livres, les coins lecture et quelques petits sets assortis." },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming", description: "Des pièces en bois utiles et décoratives pour nouvelles maisons et appartements." },
        { label: "Contact", targetKey: "contact", description: "Passez par Etsy si vous voulez poser une question sur la personnalisation ou un cadeau précis." }
      ],
      ctaPanel: {
        title: "Prêt à voir davantage de cadeaux en bois sur Etsy ?",
        text: "Ouvrez Etsy pour comparer les fiches, les prix, les avis et les options de personnalisation.",
        label: "Ouvrir les cadeaux en bois sur Etsy"
      }
    },
    contact: {
      title: "Contacter Craftygiftsplace pour cadeaux en bois personnalisés | Craftygiftsplace",
      metaDescription: "Contactez Craftygiftsplace sur Etsy pour des questions sur la personnalisation, le choix d'un cadeau ou la sélection de sous-verres, marque-pages et objets déco en bois.",
      h1: "Une question ou une personnalisation ?",
      intro: "Pour une commande, une personnalisation ou une question sur un article précis, Etsy reste le meilleur point de contact. Cette page montre simplement l'étape la plus claire et quelques entrées faciles vers les collections principales.",
      primaryCtaLabel: "Nous écrire sur Etsy",
      secondaryCtaLabel: "Lire les avis Etsy",
      infoCards: [
        { title: "Petit atelier de bois fait main", text: "Craftygiftsplace se concentre sur des cadeaux en bois gravés qui paraissent chaleureux, utiles et personnels. La sélection présentée ici reste proche des lecteurs, des amoureux des chats, des intérieurs accueillants et de quelques souvenirs personnalisés." },
        { title: "Matériaux et finition", items: ["Le bois est choisi pour une gravure nette, un veinage visible et une finition naturellement chaleureuse.", "Beaucoup de sets de sous-verres utilisent un dos en liège lorsque c'est indiqué sur la fiche Etsy.", "Chaque pièce est vérifiée après la gravure pour garder un rendu propre, chaleureux et agréable à offrir."] },
        { title: "Comment le travail se déroule", text: "Les idées commencent souvent par un thème, un prénom ou un petit lettrage, puis passent par la gravure, la finition à la main et un dernier contrôle avant la mise en ligne sur Etsy." },
        { title: "Ce que l'on peut demander", items: ["Une personnalisation avec prénom, date ou court message.", "De l'aide pour choisir entre sous-verres, marque-pages et autres cadeaux en bois.", "Des conseils pour un cadeau de crémaillère, pour lecteur ou pour un moment marquant."] },
        { title: "Pourquoi Etsy reste le bon point de contact", text: "Etsy réunit au même endroit les commandes, les délais, les notes de personnalisation, la protection acheteur et la messagerie." },
        { title: "Bonnes pages pour commencer", text: "Si quelqu'un hésite encore, il vaut mieux commencer par les sous-verres en bois, les marque-pages en bois ou l'un des guides cadeaux." }
      ],
      sidebar: {
        title: "Acheter en confiance",
        quote: "\"Un vrai plaisir d'échanger avec cette boutique... je reviendrai volontiers.\"",
        attribution: "Clare · Avis Etsy",
        text: "La page contact reste simple : écrivez sur Etsy pour une demande liée à la commande, ou parcourez d'abord une collection si vous voulez comparer les styles.",
        links: [
          { label: "Sous-verres en bois", targetKey: "coasters" },
          { label: "Cadeaux pour lecteurs", targetKey: "reader" },
          { label: "Cadeaux de crémaillère", targetKey: "housewarming" }
        ]
      },
      faq: [
        { question: "Les commandes se passent-elles sur ce site ?", answer: "Non. Les commandes et les messages passent par Etsy, où l'on retrouve la fiche produit, la livraison et les options de personnalisation au même endroit." },
        { question: "Puis-je demander une personnalisation avant d'acheter ?", answer: "Oui. La messagerie Etsy est le meilleur endroit pour demander un prénom, une date ou un petit texte avant la commande." },
        { question: "Puis-je parcourir les collections avant d'écrire ?", answer: "Oui. Les principales collections et les guides cadeaux restent liés depuis cette page pour comparer tranquillement d'abord." }
      ],
      ctaPanel: {
        title: "Prêt à écrire ou à parcourir Etsy ?",
        text: "Ouvrez la boutique Etsy pour envoyer un message, lire les avis ou continuer à explorer les fiches qui correspondent à votre idée cadeau.",
        label: "Ouvrir Craftygiftsplace sur Etsy"
      }
    },
    cat: {
      title: "Cadeaux en bois pour amoureux des chats, intérieurs chaleureux et idées Etsy attentionnées | Craftygiftsplace",
      metaDescription: "Découvrez des cadeaux en bois pour amoureux des chats, avec sous-verres félins et déco chaleureuse pour étagères, tables basses et petites idées qui mènent vers Etsy.",
      h1: "Cadeaux en bois pour amoureux des chats, étagères et tables basses",
      intro: "Cette page s'adresse aux visiteurs qui savent déjà qu'ils veulent offrir quelque chose à un amoureux des chats. Elle réunit les meilleurs choix félins dans un seul endroit : sous-verres pour tables basses, motifs chats plus célestes pour intérieurs chaleureux et petit objet déco pour étagères ou coins lecture.",
      primaryCtaLabel: "Voir les cadeaux chats sur Etsy",
      secondaryCtaLabel: "Aller aux idées chats",
      linkCloud: [
        { label: "Sous-verres en bois", targetKey: "coasters" },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming" },
        { label: "Tous les cadeaux chats", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Pourquoi cette page plaît",
        quote: "\"Ces sous-verres sont magnifiques. Ils semblent solides et bien faits.\"",
        attribution: "Andrew · Avis Etsy",
        text: "Les pièces à thème chat étaient déjà très appréciées dans la boutique. Cette page les rassemble pour comparer facilement sans passer d'une catégorie à l'autre.",
        links: [
          { label: "Voir les sous-verres en bois", targetKey: "coasters" },
          { label: "Voir les cadeaux de crémaillère", targetKey: "housewarming" },
          { label: "Voir les résultats chats sur Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Un favori à thème chat qui reste à la fois décoratif et pratique pour salon, bureau ou anniversaire.",
        "Une option plus lunaire pour quelqu'un qui aime les chats et une ambiance plus céleste sur une table basse.",
        "Une petite pièce déco pensée pour étagères, tables de nuit et coins lecture plus doux.",
        "Un set de sous-verres à motif chat plus simple pour ceux qui cherchent un cadeau pratique au thème félin bien lisible."
      ],
      featuredWhy: [
        "Elle garde les cadeaux à thème chat dans une sélection calme et facile à parcourir.",
        "Elle mélange des sets utiles et une pièce déco plus douce.",
        "Elle convient bien quand le cadeau doit paraître chaleureux, utile et clairement lié aux chats."
      ],
      catalogIntro: "Les meilleurs choix à thème chat pour maisons chaleureuses, étagères et cadeaux autour d'une table basse.",
      faq: [
        { question: "Ces cadeaux pour amoureux des chats sont-ils tous des sous-verres ?", answer: "Non. La page réunit des sets de sous-verres à thème chat ainsi qu'une petite pièce déco en bois, pour choisir entre cadeau pratique et cadeau plus visuel." },
        { question: "Ces idées conviennent-elles aussi à une crémaillère ?", answer: "Oui. Plusieurs modèles fonctionnent très bien pour une nouvelle maison, surtout quand le cadeau doit sembler utile et chaleureux." },
        { question: "Puis-je encore voir toute la collection de sous-verres ?", answer: "Oui. Cette page renvoie directement vers la collection complète pour ceux qui veulent comparer davantage de thèmes." }
      ],
      relatedLinks: [
        { label: "Sous-verres en bois", targetKey: "coasters", description: "Une sélection de sous-verres avec styles chats, célestes et botaniques." },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming", description: "Des pièces utiles en bois pour nouvelles maisons, tables basses et étagères." },
        { label: "Cadeaux en bois", targetKey: "gifts", description: "Parcourez les pièces déco et les suspensions si vous voulez aller au-delà des sous-verres." }
      ],
      ctaPanel: {
        title: "Prêt à comparer les cadeaux chats sur Etsy ?",
        text: "Ouvrez Etsy pour comparer les motifs, les prix et les avis autour des idées à thème chat.",
        label: "Ouvrir les cadeaux chats sur Etsy"
      }
    },
    reader: {
      title: "Cadeaux pour lecteurs en bois, coins lecture et étagères cosy | Craftygiftsplace",
      metaDescription: "Parcourez des cadeaux en bois pour lecteurs, avec marque-pages, coffret pour lecteurs de fantasy et pièces pour coins lecture et étagères calmes.",
      h1: "Cadeaux en bois pour lecteurs et coins lecture cosy",
      intro: "Cette page aide les visiteurs qui cherchent déjà un cadeau pour lecteur. Elle rassemble des marque-pages, un coffret pour lecteurs de fantasy assorti et quelques pièces qui conviennent bien à un coin lecture, afin de comparer plusieurs styles sans quitter le même thème.",
      primaryCtaLabel: "Voir les cadeaux lecteurs sur Etsy",
      secondaryCtaLabel: "Aller aux idées lecteurs",
      linkCloud: [
        { label: "Marque-pages en bois", targetKey: "bookmarks" },
        { label: "Cadeaux en bois", targetKey: "gifts" },
        { label: "Toutes les idées lecteurs", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Pourquoi cette page aide",
        quote: "\"Le niveau de détail est superbe, la finition est soignée et le marque-page est très durable.\"",
        attribution: "Acheteur de marque-page · Avis Etsy",
        text: "Elle évite de disperser les visiteurs entre plusieurs collections lorsque l'intention est simple : trouver un cadeau pour lecteur qui paraît tout de suite juste.",
        links: [
          { label: "Voir les marque-pages en bois", targetKey: "bookmarks" },
          { label: "Voir les cadeaux en bois", targetKey: "gifts" },
          { label: "Voir les résultats lecteurs sur Etsy", external: true }
        ]
      },
      featuredSummaries: [
        "Un marque-page fantasy très visuel pour lecteurs qui aiment les détails marqués et un bel objet à glisser dans un livre.",
        "Un coffret prêt à offrir avec marque-page, suspension de porte et sous-verres pour les lecteurs de fantasy.",
        "Une petite pièce d'ambiance pour étagères et coins lecture quand le cadeau peut être plus doux que strictement pratique.",
        "Un marque-page personnalisé pour ceux qui veulent un cadeau de lecteur plus intime, plus calme et facile à garder."
      ],
      featuredWhy: [
        "Elle garde la sélection centrée sur les lecteurs et les habitudes de lecture cosy.",
        "Elle mélange des marque-pages, un coffret prêt à offrir et une pièce déco légère.",
        "Elle renvoie facilement vers la collection complète de marque-pages si le visiteur veut comparer plus en détail."
      ],
      catalogIntro: "Des idées bois pour lecteurs, marque-pages, coffret pour lecteurs de fantasy et petits détails pour coins lecture.",
      faq: [
        { question: "Cette page contient-elle uniquement des marque-pages ?", answer: "Non. Elle rassemble surtout des marque-pages, mais aussi un coffret assorti et une petite pièce déco qui fonctionne bien dans un coin lecture." },
        { question: "Existe-t-il aussi une collection dédiée aux marque-pages ?", answer: "Oui. La collection marque-pages en bois reste disponible pour ceux qui veulent rester uniquement sur ce type de produit." },
        { question: "Ces cadeaux conviennent-ils aux lecteurs de fantasy ?", answer: "Oui. Plusieurs choix sont clairement orientés fantasy, sans pour autant exclure des styles plus calmes pour d'autres lecteurs." }
      ],
      relatedLinks: [
        { label: "Marque-pages en bois", targetKey: "bookmarks", description: "Restez sur la collection produit si vous voulez comparer davantage de marque-pages." },
        { label: "Cadeaux en bois", targetKey: "gifts", description: "Ajoutez des porte-bougies, suspensions et autres objets en bois à l'idée cadeau." },
        { label: "Cadeaux de crémaillère", targetKey: "housewarming", description: "Passez à des idées plus maison si le visiteur cherche surtout un cadeau pour un nouvel intérieur." }
      ],
      ctaPanel: {
        title: "Prêt à voir les cadeaux pour lecteurs sur Etsy ?",
        text: "Ouvrez Etsy pour comparer les listings, les avis et les options qui conviennent le mieux à votre lecteur.",
        label: "Ouvrir les cadeaux lecteurs sur Etsy"
      }
    },
    housewarming: {
      title: "Cadeaux de crémaillère en bois pour tables basses, étagères et maisons chaleureuses | Craftygiftsplace",
      metaDescription: "Parcourez des cadeaux de crémaillère en bois, avec sous-verres utiles et objets déco chaleureux pour tables basses, étagères et nouvelles maisons.",
      h1: "Cadeaux de crémaillère en bois pour tables basses, étagères et maisons chaleureuses",
      intro: "Cette page s'adresse aux visiteurs qui cherchent déjà un cadeau pour une nouvelle maison. Elle met l'accent sur des sous-verres utiles, quelques pièces déco plus douces et des idées qui ont tout de suite leur place sur une table basse, une étagère ou une entrée.",
      primaryCtaLabel: "Voir les cadeaux de crémaillère sur Etsy",
      secondaryCtaLabel: "Aller aux idées crémaillère",
      linkCloud: [
        { label: "Sous-verres en bois", targetKey: "coasters" },
        { label: "Cadeaux pour amoureux des chats", targetKey: "cat" },
        { label: "Toutes les idées maison", targetKey: "catalog" }
      ],
      sidebar: {
        title: "Pourquoi cette page fonctionne",
        quote: "\"Ces sous-verres sont magnifiques. Ils semblent solides et bien faits.\"",
        attribution: "Andrew · Avis Etsy",
        text: "Pour une crémaillère, les visiteurs veulent souvent quelque chose d'utile, décoratif et facile à intégrer dans la maison. Cette page garde précisément ce cap.",
        links: [
          { label: "Voir les sous-verres en bois", targetKey: "coasters" },
          { label: "Voir les cadeaux chats", targetKey: "cat" },
          { label: "Voir les cadeaux en bois", targetKey: "gifts" }
        ]
      },
      featuredSummaries: [
        "Un set de sous-verres en bois très simple à offrir pour tables basses, cafés du matin et nouveaux salons.",
        "Un autre choix pratique avec un style plus céleste pour maisons chaleureuses et étagères visibles.",
        "Une petite pièce déco qui ajoute un accent doux sur étagère ou console quand l'on veut varier au-delà des sous-verres.",
        "Un motif arbre chaleureux en bois qui fonctionne très bien sur une nouvelle étagère, une table basse ou comme cadeau de bienvenue."
      ],
      featuredWhy: [
        "Elle garde l'accent sur des idées maison claires et faciles à offrir.",
        "Elle mélange des sous-verres utiles et une petite pièce déco plus douce.",
        "Elle aide à comparer des options adaptées aux tables basses, étagères et appartements."
      ],
      catalogIntro: "Des idées en bois pour nouvelles maisons, tables basses, étagères et intérieurs accueillants.",
      faq: [
        { question: "Ces idées conviennent-elles à un appartement ou à une petite maison ?", answer: "Oui. Plusieurs pièces sont compactes, utiles et faciles à poser sur une table basse, une étagère ou une console sans prendre beaucoup de place." },
        { question: "Trouve-t-on surtout des sous-verres sur cette page ?", answer: "Les sous-verres restent au coeur de la sélection, mais la page garde aussi une petite pièce déco pour ceux qui veulent quelque chose de plus doux." },
        { question: "Peut-on encore voir d'autres idées cadeaux depuis ici ?", answer: "Oui. Cette page renvoie directement vers les collections et les guides chats ou lecteurs quand l'intention change." }
      ],
      relatedLinks: [
        { label: "Sous-verres en bois", targetKey: "coasters", description: "Comparez davantage de styles si vous voulez rester sur un cadeau pratique pour la maison." },
        { label: "Cadeaux pour amoureux des chats", targetKey: "cat", description: "Ajoutez une dimension féline si la nouvelle maison appartient à un amoureux des chats." },
        { label: "Cadeaux en bois", targetKey: "gifts", description: "Passez à des pièces décoratives et souvenirs si vous voulez sortir des sous-verres." }
      ],
      ctaPanel: {
        title: "Prêt à comparer les cadeaux de crémaillère sur Etsy ?",
        text: "Ouvrez Etsy pour voir les listings, les prix et les avis autour des cadeaux pour nouvelles maisons.",
        label: "Ouvrir les idées crémaillère sur Etsy"
      }
    }
  }
};

const pagesFr = buildLocalePages(definition);

pagesFr.push({
  path: "/fr/pages/personnalisation.html",
  template: "contact",
  locale: "fr",
  title: "Comment fonctionne la personnalisation | Craftygiftsplace",
  metaDescription: "Découvrez comment ajouter un prénom, une date ou un message à des cadeaux en bois artisanaux de Craftygiftsplace — avant et après la commande sur Etsy.",
  h1: "Comment fonctionne la personnalisation",
  eyebrow: "Personnalisez votre cadeau",
  intro: "De nombreux articles peuvent être personnalisés avec un prénom, une date ou un court message. Voici ce à quoi vous attendre, étape par étape.",
  breadcrumbs: [
    { label: "Accueil", path: "/fr/index.html" },
    { label: "Personnalisation" }
  ],
  primaryCta: {
    label: "Ouvrir Craftygiftsplace sur Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Contacter la boutique sur Etsy",
    targetUrl: "https://www.etsy.com/shop/Craftygiftsplace#about"
  },
  sidebar: {
    title: "Conseil rapide",
    quote: "\"Le vendeur a été incroyablement utile quand j'ai posé des questions sur la personnalisation.\"",
    attribution: "Tanya · 5/5 sur Etsy",
    text: "Envoyez un message à la boutique avant de commander et le vendeur confirmera exactement ce qui est possible pour la pièce choisie.",
    links: [
      { label: "Ouvrir la boutique Etsy", href: "https://www.etsy.com/shop/Craftygiftsplace" },
      { label: "Voir les dessous-de-verre", href: "/fr/pages/sous-verres-en-bois.html" },
      { label: "Voir les marque-pages", href: "/fr/pages/marque-pages-en-bois.html" },
      { label: "Pourquoi des cadeaux en bois ?", href: "/fr/pages/pourquoi-des-cadeaux-en-bois.html" }
    ]
  },
  infoCards: [
    {
      title: "Quels articles peuvent être personnalisés ?",
      text: "La plupart des dessous-de-verre, marque-pages et souvenirs de la boutique peuvent être personnalisés. Cela inclut l'ajout d'un prénom, de noms de couple, d'une courte date ou d'un message bref. La fiche Etsy indique ce qui est disponible pour chaque pièce — et vous pouvez toujours envoyer un message avant de commander."
    },
    {
      title: "Où saisir les détails de personnalisation ?",
      text: "Sur la page de la fiche Etsy, recherchez le champ 'Ajouter votre personnalisation'. Saisissez votre texte avant d'ajouter au panier. Si le champ n'est pas visible, envoyez d'abord un message au vendeur."
    },
    {
      title: "Que puis-je personnaliser ?",
      items: [
        "Un prénom ou des noms de couple (ex. 'Emma' ou 'Emma & James')",
        "Une date (ex. date de mariage, anniversaire)",
        "Un court message de deux ou trois lignes",
        "Un nom d'animal pour les pièces commémoratives",
        "Une phrase personnalisée pour des cadeaux thématiques"
      ]
    },
    {
      title: "Puis-je envoyer un message avant de commander ?",
      text: "Oui, et c'est souvent la meilleure façon de bien faire les choses. Utilisez la messagerie Etsy pour décrire ce que vous souhaitez. Le vendeur répond rapidement et confirmera les options avant votre commande."
    },
    {
      title: "Que se passe-t-il après la commande ?",
      text: "Une fois la commande passée avec vos détails de personnalisation, le vendeur commence la fabrication. Vous recevrez une notification Etsy à l'expédition. Si quelque chose doit être précisé, le vendeur vous contactera via Etsy."
    },
    {
      title: "Et si je fais une erreur dans ma personnalisation ?",
      text: "Contactez le vendeur via Etsy dès que possible après la commande. Comme chaque pièce est fabriquée individuellement, les corrections sont généralement possibles si elles sont signalées rapidement."
    }
  ],
  faq: [
    {
      question: "La personnalisation est-elle incluse dans le prix ?",
      answer: "Les coûts varient selon le produit. Vérifiez la fiche Etsy pour les détails — certaines pièces l'incluent, d'autres ont un supplément. Envoyer un message au vendeur est le moyen le plus rapide de confirmer."
    },
    {
      question: "Combien de temps prend une commande personnalisée ?",
      answer: "Les pièces personnalisées sont fabriquées sur commande. Prévoyez quelques jours supplémentaires au-delà du délai de traitement indiqué sur Etsy. Le vendeur peut aussi conseiller pour les commandes urgentes."
    },
    {
      question: "Puis-je voir un aperçu avant la fabrication ?",
      answer: "Dans de nombreux cas, oui. Envoyez un message au vendeur avec vos détails et demandez un aperçu — particulièrement utile pour des mises en page complexes."
    }
  ],
  ctaPanel: {
    title: "Prêt à personnaliser votre cadeau ?",
    text: "Rendez-vous sur Etsy pour parcourir les fiches, vérifier les options de personnalisation et envoyer un message au vendeur.",
    label: "Ouvrir Craftygiftsplace sur Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/fr/pages/personnalisation.html" }
});

pagesFr.push({
  path: "/fr/pages/pourquoi-des-cadeaux-en-bois.html",
  template: "contact",
  locale: "fr",
  title: "Pourquoi des cadeaux en bois ? Faits main, durables et personnels | Craftygiftsplace",
  metaDescription: "Les cadeaux en bois faits main durent plus longtemps, semblent plus personnels et portent un vrai savoir-faire. Découvrez pourquoi le bois gravé est un meilleur cadeau que les alternatives génériques.",
  h1: "Pourquoi les cadeaux en bois durent plus longtemps que la plupart",
  eyebrow: "L'argument pour le bois",
  intro: "Les cadeaux génériques s'oublient. Les cadeaux en bois se gardent. Voici pourquoi le bois artisanal gravé fonctionne si bien pour presque toutes les occasions.",
  breadcrumbs: [
    { label: "Accueil", path: "/fr/index.html" },
    { label: "Pourquoi des cadeaux en bois ?" }
  ],
  primaryCta: {
    label: "Parcourir les cadeaux en bois sur Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  secondaryCta: {
    label: "Voir toutes les collections",
    targetUrl: "/fr/pages/cadeaux-en-bois.html"
  },
  sidebar: {
    title: "Ce que disent les acheteurs",
    quote: "\"Wow, l'artisanat est spectaculaire. Ça sent même le bois frais.\"",
    attribution: "Alex · 5/5 sur Etsy",
    text: "Noté 4,96/5 sur des centaines d'avis Etsy. Les acheteurs mentionnent régulièrement la qualité, le détail et la finition durable.",
    links: [
      { label: "Dessous-de-verre en bois", href: "/fr/pages/sous-verres-en-bois.html" },
      { label: "Marque-pages en bois", href: "/fr/pages/marque-pages-en-bois.html" },
      { label: "Tous les cadeaux en bois", href: "/fr/pages/cadeaux-en-bois.html" }
    ]
  },
  infoCards: [
    {
      title: "Le bois se ressent différemment",
      text: "Le bois véritable a une qualité tactile qu'aucune carte imprimée ou alternative en plastique ne peut égaler. Le poids, le grain, la légère chaleur du matériau — tout cela se perçoit avant même que le destinataire lise la gravure. Un dessous-de-verre ou un marque-page en bois s'annonce comme quelque chose de fabriqué, pas choisi dans une liste produit générique."
    },
    {
      title: "La gravure rend les choses permanentes",
      text: "Un nom, une date, une courte phrase gravée dans le bois ne s'efface pas, ne s'écaille pas et ne se lave pas. C'est une partie de la pièce. Cette permanence distingue un cadeau gravé de celui qui finit silencieusement dans un tiroir. Les lecteurs gardent leurs marque-pages. Les dessous-de-verre restent sur la table basse."
    },
    {
      title: "Ça convient à presque toutes les occasions",
      text: "Des cadeaux de crémaillère qui trônent sur la table basse dès le premier jour. Des cadeaux pour lecteurs qui vivent dans un livre favori. Des pièces pour amateurs de chats présentes toute l'année sur l'étagère. Les cadeaux en bois sont à la fois utiles et décoratifs — ils restent visibles au lieu d'être rangés après l'occasion."
    },
    {
      title: "Fait main signifie : une personne l'a fabriqué",
      text: "Chaque pièce de cette boutique est fabriquée sur commande par une seule personne, avec une graveuse laser et un standard clair de qualité. Cela se ressent dans le résultat : votre commande ne sort pas d'une étagère. Elle est fabriquée après votre commande, ce qui rend la personnalisation possible et la qualité cohérente d'un avis à l'autre."
    },
    {
      title: "Idéal pour les lecteurs, amateurs de chats, nouveaux foyers et plus",
      items: [
        "Lecteurs : marque-pages œil de dragon, plume, celtique et fantasy qui outlast les livres qu'ils marquent",
        "Amateurs de chats : bougeoirs Moon Cat et dessous-de-verre à thème félin pour étagères douillettes",
        "Nouveaux foyers : sets de dessous-de-verre gravés qui semblent choisis plutôt que pratiques",
        "Moments de souvenir : plaques commémoratives pour animaux pour un cadeau qui honore la perte avec soin",
        "Gamers et tech : porte-clés RAM recyclés et panneaux de porte gaming pour les setups de bureau"
      ]
    },
    {
      title: "L'argument honnête pour dépenser un peu plus",
      text: "Un cadeau en bois bien fabriqué coûte plus qu'une carte et moins que la plupart des expériences. Il dure plus longtemps que des fleurs, prend moins de place qu'un bon cadeau et ne nécessite pas de piles. Pour les occasions où le générique ne suffit pas, c'est généralement le bon choix."
    }
  ],
  faq: [
    {
      question: "Les cadeaux en bois conviennent-ils à tous les âges ?",
      answer: "Oui. Les dessous-de-verre, marque-pages et pièces décoratives conviennent aux adultes de tout âge. La gamme comprend des articles fonctionnels pour un usage quotidien et des souvenirs pour les occasions importantes. La boutique propose aussi des pièces jalons bébé pour les nouveaux arrivants."
    },
    {
      question: "Les cadeaux en bois tiennent-ils dans le temps ?",
      answer: "Le bouleau et les bois similaires sont durables et stables pour une utilisation intérieure. Le détail gravé ne s'efface pas. La plupart des dessous-de-verre ont un fond en liège qui protège les surfaces. Les acheteurs mentionnent régulièrement la durabilité en plus de la qualité visuelle."
    },
    {
      question: "Les cadeaux en bois peuvent-ils être personnalisés pour toute occasion ?",
      answer: "De nombreuses pièces peuvent être personnalisées avec un nom, une date ou un court message. Cela les rend adaptés aux anniversaires, crémaillères, mariages et cadeaux commémoratifs. Consultez la page de personnalisation pour tous les détails."
    }
  ],
  relatedLinks: [
    { label: "Dessous-de-verre en bois", href: "/fr/pages/sous-verres-en-bois.html", description: "Sets de dessous-de-verre gravés pour tables basses, crémaillères et intérieurs chaleureux." },
    { label: "Marque-pages en bois", href: "/fr/pages/marque-pages-en-bois.html", description: "Marque-pages fantasy, classiques et personnalisés pour lecteurs et cadeaux." },
    { label: "Cadeaux en bois", href: "/fr/pages/cadeaux-en-bois.html", description: "Bougeoirs, panneaux de porte et souvenirs pour étagères et moments importants." },
    { label: "Comment fonctionne la personnalisation", href: "/fr/pages/personnalisation.html", description: "Ajoutez un nom, une date ou un message — voici ce à quoi vous attendre." }
  ],
  ctaPanel: {
    title: "Prêt à trouver le bon cadeau en bois ?",
    text: "Parcourez la collection complète sur Etsy — dessous-de-verre, marque-pages, souvenirs et plus encore.",
    label: "Ouvrir Craftygiftsplace sur Etsy",
    url: "https://www.etsy.com/shop/Craftygiftsplace"
  },
  alternatePaths: { en: "/fr/pages/pourquoi-des-cadeaux-en-bois.html" }
});

module.exports = {
  pagesFr
};
