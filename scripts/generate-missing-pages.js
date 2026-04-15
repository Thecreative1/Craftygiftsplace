#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// ── Slug map: EN → each language ─────────────────────────────────────────────
const slugMap = {
  'wooden-coasters':            { de:'holzuntersetzer',               fr:'sous-verres-en-bois',              es:'posavasos-de-madera',           pt:'porta-copos-de-madeira',          it:'sottobicchieri-in-legno',      nl:'onderzetters' },
  'wooden-bookmarks':           { de:'holzlesezeichen',               fr:'marque-pages-en-bois',             es:'marcapaginas-de-madera',        pt:'marcadores-de-livros-de-madeira', it:'segnalibri-in-legno',          nl:'bladwijzers' },
  'wooden-gifts':               { de:'holzgeschenke',                 fr:'cadeaux-en-bois',                  es:'regalos-de-madera',             pt:'presentes-de-madeira',            it:'regali-in-legno',              nl:'houten-cadeaus' },
  'cat-lover-gifts':            { de:'geschenke-fuer-katzenliebhaber',fr:'cadeaux-pour-amoureux-des-chats',  es:'regalos-para-amantes-de-los-gatos',pt:'presentes-para-amantes-de-gatos',it:'regali-per-amanti-dei-gatti', nl:'cadeaus-voor-kattenliefhebbers' },
  'reader-gifts':               { de:'geschenke-fuer-leser',          fr:'cadeaux-pour-lecteurs',            es:'regalos-para-lectores',         pt:'presentes-para-leitores',         it:'regali-per-lettori',           nl:'lezerscadeaus' },
  'housewarming-gifts':         { de:'einzugsgeschenke',              fr:'cadeaux-de-cremaillere',           es:'regalos-para-casa-nueva',       pt:'presentes-de-casa-nova',          it:'regali-per-la-casa-nuova',     nl:'verhuiscadeaus' },
  'personalization':            { de:'personalisierung',              fr:'personnalisation',                 es:'personalizacion',               pt:'personalizacao',                  it:'personalizzazione',            nl:'personalisatie' },
  'contact':                    { de:'kontakt',                       fr:'contact',                          es:'contacto',                      pt:'contacto',                        it:'contatto',                     nl:'contact' },
  'baby-bliss':                 { de:'baby-erstausstattung',          fr:'baby-bliss',                       es:'baby-bliss',                    pt:'baby-bliss',                      it:'baby-bliss',                   nl:'baby-bliss' },
  'candle-holders':             { de:'kerzenhalter',                  fr:'porte-bougies',                    es:'portavelas',                    pt:'porta-velas',                     it:'portacandele',                 nl:'kaarsenhouders' },
  'christmas':                  { de:'weihnachten',                   fr:'noel',                             es:'navidad',                       pt:'natal',                           it:'natale',                       nl:'kerst' },
  'diy':                        { de:'do-it-yourself',                fr:'bricolage',                        es:'manualidades',                  pt:'faca-voce-mesmo',                 it:'fai-da-te',                    nl:'doe-het-zelf' },
  'door-hangers':               { de:'tuerschilder',                  fr:'accroches-portes',                 es:'colgadores-de-puerta',          pt:'cabides-de-porta',                it:'appendiporte',                 nl:'deurtekens' },
  'educational-toys-and-games': { de:'lernspielzeug',                 fr:'jouets-educatifs',                 es:'juguetes-educativos',           pt:'brinquedos-educativos',           it:'giocattoli-educativi',         nl:'educatief-speelgoed' },
  'funny-presents':             { de:'lustige-geschenke',             fr:'cadeaux-rigolos',                  es:'regalos-divertidos',            pt:'prendas-divertidas',              it:'regali-divertenti',            nl:'grappige-cadeaus' },
  'gifts-for-it-and-gamers':    { de:'geschenke-fuer-gamer',          fr:'cadeaux-pour-gamers',              es:'regalos-para-gamers',           pt:'presentes-para-gamers',           it:'regali-per-gamer',             nl:'cadeaus-voor-gamers' },
  'incense-burners':            { de:'raucherstabchenhalter',         fr:'brule-encens',                     es:'quemadores-incienso',           pt:'queimadores-incenso',             it:'brucia-incenso',               nl:'wierookbranders' },
  'personalized-items':         { de:'personalisierte-artikel',       fr:'articles-personnalises',           es:'articulos-personalizados',      pt:'artigos-personalizados',          it:'articoli-personalizzati',      nl:'gepersonaliseerde-items' },
  'pet-memorial':               { de:'haustier-gedenkgeschenke',      fr:'memorial-animaux',                 es:'memorial-mascotas',             pt:'memorial-animais',                it:'memorial-animali',             nl:'huisdier-herdenking' },
  'readers-kit':                { de:'lesepaket',                     fr:'kit-lecteur',                      es:'kit-lector',                    pt:'kit-leitor',                      it:'kit-lettore',                  nl:'lezerspakket' },
  'wedding':                    { de:'hochzeit',                      fr:'mariage',                          es:'boda',                          pt:'casamento',                       it:'matrimonio',                   nl:'bruiloft' },
};

// ── Display names ─────────────────────────────────────────────────────────────
const displayNames = {
  'wooden-coasters':            { de:'Holzuntersetzer',             fr:'Sous-verres en bois',           es:'Posavasos de madera',           pt:'Porta-copos de madeira',          it:'Sottobicchieri in legno',      nl:'Houten onderzetters' },
  'wooden-bookmarks':           { de:'Holzlesezeichen',             fr:'Marque-pages en bois',          es:'Marcap\u00e1ginas de madera',   pt:'Marcadores de livros de madeira', it:'Segnalibri in legno',          nl:'Houten bladwijzers' },
  'wooden-gifts':               { de:'Holzgeschenke',               fr:'Cadeaux en bois',               es:'Regalos de madera',             pt:'Presentes de madeira',            it:'Regali in legno',              nl:'Houten cadeaus' },
  'cat-lover-gifts':            { de:'Geschenke f\u00fcr Katzenliebhaber', fr:'Cadeaux pour amoureux des chats', es:'Regalos para amantes de gatos', pt:'Presentes para amantes de gatos', it:'Regali per amanti dei gatti', nl:'Cadeaus voor kattenliefhebbers' },
  'reader-gifts':               { de:'Lesergeschenke',              fr:'Cadeaux pour lecteurs',         es:'Regalos para lectores',         pt:'Presentes para leitores',         it:'Regali per lettori',           nl:'Lezerscadeaus' },
  'housewarming-gifts':         { de:'Einzugsgeschenke',            fr:'Cadeaux de cr\u00e9maill\u00e8re', es:'Regalos para casa nueva',    pt:'Presentes de casa nova',          it:'Regali per la casa nuova',     nl:'Verhuiscadeaus' },
  'personalization':            { de:'Personalisierung',            fr:'Personnalisation',              es:'Personalizaci\u00f3n',          pt:'Personaliza\u00e7\u00e3o',        it:'Personalizzazione',            nl:'Personalisatie' },
  'contact':                    { de:'Kontakt',                     fr:'Contact',                       es:'Contacto',                      pt:'Contacto',                        it:'Contatto',                     nl:'Contact' },
  'baby-bliss':                 { de:'Baby Erstausstattung',        fr:'Baby Bliss',                    es:'Baby Bliss',                    pt:'Baby Bliss',                      it:'Baby Bliss',                   nl:'Baby Bliss' },
  'candle-holders':             { de:'Kerzenhalter',                fr:'Porte-bougies',                 es:'Portavelas',                    pt:'Porta-velas',                     it:'Portacandele',                 nl:'Kaarsenhouders' },
  'christmas':                  { de:'Weihnachten',                 fr:'No\u00ebl',                     es:'Navidad',                       pt:'Natal',                           it:'Natale',                       nl:'Kerst' },
  'diy':                        { de:'Do It Yourself',              fr:'Bricolage',                     es:'Manualidades',                  pt:'Fa\u00e7a voc\u00ea mesmo',       it:'Fai da te',                    nl:'Doe het zelf' },
  'door-hangers':               { de:'T\u00fcrschilder',            fr:'Accroche-portes',               es:'Colgadores de puerta',          pt:'Cabides de porta',                it:'Appendiporte',                 nl:'Deurtekens' },
  'educational-toys-and-games': { de:'Lernspielzeug',               fr:'Jouets \u00e9ducatifs',         es:'Juguetes educativos',           pt:'Brinquedos educativos',           it:'Giocattoli educativi',         nl:'Educatief speelgoed' },
  'funny-presents':             { de:'Lustige Geschenke',           fr:'Cadeaux rigolos',               es:'Regalos divertidos',            pt:'Prendas divertidas',              it:'Regali divertenti',            nl:'Grappige cadeaus' },
  'gifts-for-it-and-gamers':    { de:'Geschenke f\u00fcr Gamer',   fr:'Cadeaux pour gamers',           es:'Regalos para gamers',           pt:'Presentes para gamers',           it:'Regali per gamer',             nl:'Cadeaus voor gamers' },
  'incense-burners':            { de:'R\u00e4ucherst\u00e4bchenhalter', fr:'Br\u00fcle-encens',        es:'Quemadores de incienso',        pt:'Queimadores de incenso',          it:'Brucia-incenso',               nl:'Wierookbranders' },
  'personalized-items':         { de:'Personalisierte Artikel',     fr:'Articles personnalis\u00e9s',   es:'Art\u00edculos personalizados', pt:'Artigos personalizados',          it:'Articoli personalizzati',      nl:'Gepersonaliseerde items' },
  'pet-memorial':               { de:'Haustier-Gedenken',           fr:'M\u00e9morial animaux',        es:'Memorial mascotas',             pt:'Memorial animais',                it:'Memorial animali',             nl:'Huisdier herdenking' },
  'readers-kit':                { de:'Lesepaket',                   fr:'Kit lecteur',                   es:'Kit lector',                    pt:'Kit leitor',                      it:'Kit lettore',                  nl:'Lezerspakket' },
  'wedding':                    { de:'Hochzeit',                    fr:'Mariage',                       es:'Boda',                          pt:'Casamento',                       it:'Matrimonio',                   nl:'Bruiloft' },
};

// ── Language config ───────────────────────────────────────────────────────────
const langConfig = {
  de: {
    lang: 'de', locale: 'de_DE', dir: 'de/pages', assetPrefix: '../../', homeHref: '../index.html',
    canonical: (s) => `https://craftygiftsplace.store/de/pages/${s}.html`,
    websiteId: 'https://craftygiftsplace.store/de/#website', websiteUrl: 'https://craftygiftsplace.store/de/',
    homeLabel: 'Start', eyebrow: 'Aus dem Etsy-Shop',
    shopBtn: (q,n) => `${n} auf Etsy kaufen`,
    shopBtnNav: (q,n) => `${n} auf Etsy kaufen`,
    note: 'Hier st\u00f6bern, dann auf Etsy f\u00fcr Preise, Bewertungen und Bestellungen.',
    seeLabel: (n) => `${n} ansehen`,
    moreIdeas: 'Weitere Geschenkideen',
    reviewQuote: '"Tolle Qualit\u00e4t, genau wie beschrieben, und der Verk\u00e4ufer war freundlich. Sehr gerne wieder!"',
    reviewMeta: 'Etsy-Rezension',
    browseNote: (n) => `Hier kannst du ${n} entdecken und dann auf Etsy f\u00fcr Preise, Bewertungen und Bestellungen weitergehen.`,
    popularPicks: 'Beliebte Auswahl',
    popularPicksSub: 'Entdecke ein paar herausragende St\u00fccke, dann sieh dir die gesamte Auswahl an.',
    viewOnEtsy: 'Auf Etsy ansehen',
    whyLoveIt: 'Warum K\u00e4ufer das lieben',
    whyItems: (n) => [`H\u00e4lt die ${n}-St\u00fccke in einer \u00fcbersichtlichen Ansicht zusammen.`, `Erleichtert den Vergleich von Stilen, Ausf\u00fchrungen und Geschenkideen auf einen Blick.`, `F\u00fchrt dich trotzdem zu Etsy f\u00fcr Live-Preise, Bewertungen und Bestellungen.`],
    readReviews: 'Etsy-Bewertungen lesen \u2192',
    moreFromRange: 'Mehr aus dieser Kategorie',
    moreFromRangeSub: (n) => `Eine n\u00e4here Ansicht der ${n}-St\u00fccke.`,
    faqHeading: 'H\u00e4ufig gestellte Fragen',
    faqSub: 'Kurze Antworten auf die h\u00e4ufigsten Fragen.',
    faqItems: (n) => [
      { q: `Gibt es mehr in ${n}?`, a: `Diese Seite zeigt die ${n}-St\u00fccke mit Etsy f\u00fcr Live-Preisdetails.` },
      { q: 'Bestelle ich trotzdem auf Etsy?', a: 'Ja. Wenn du kaufen m\u00f6chtest, \u00fcbernimmt Etsy Preise, Bewertungen und Bestellungen.' },
      { q: 'Kann ich von hier aus weiterst\u00f6bern?', a: 'Ja. \u00dcber Links gelangst du zur\u00fcck zu den Hauptkategorien und weiteren Geschenkideen.' },
    ],
    moreGiftIdeas: 'Weitere Geschenkideen',
    moreGiftIdeasSub: 'Ein paar weitere Kategorien, die sich lohnen.',
    ctaHeading: (n) => `Bereit, ${n} auf Etsy zu entdecken?`,
    ctaSub: 'Etsy \u00f6ffnen f\u00fcr aktuelle Preise, Angebotsdetails und K\u00e4uferbewertungen.',
    footerBrandTagline: 'Handgefertigte Holzgeschenke mit W\u00e4rme, Detail und Charakter.',
    footerCollections: 'Kategorien', footerGiftIdeas: 'Geschenkideen',
    footerCoasters: 'Untersetzer', footerBookmarks: 'Lesezeichen', footerWooden: 'Holzgeschenke',
    footerCat: 'Geschenke f\u00fcr Katzenliebhaber', footerReader: 'Lesergeschenke', footerHousewarming: 'Einzugsgeschenke',
    footerEtsy: 'Craftygiftsplace auf Etsy kaufen \u2192',
    footerRating: 'Mit 4,96/5 auf Etsy bewertet f\u00fcr durchdachten Service, sch\u00f6ne Details und handgefertigte Qualit\u00e4t.',
    navLinks: [
      { href: '../index.html', label: 'Start' },
      { href: 'holzuntersetzer.html', label: 'Untersetzer' },
      { href: 'holzlesezeichen.html', label: 'Lesezeichen' },
      { href: 'holzgeschenke.html', label: 'Holzgeschenke' },
      { href: 'personalisierung.html', label: 'Personalisierung' },
      { href: 'warum-holzgeschenke.html', label: 'Warum Holzgeschenke?' },
      { href: 'kontakt.html', label: 'Kontakt' },
    ],
    menuOpen: 'Men\u00fc \u00f6ffnen', menuClose: 'Men\u00fc schlie\u00dfen',
  },
  fr: {
    lang: 'fr', locale: 'fr_FR', dir: 'fr/pages', assetPrefix: '../../', homeHref: '../index.html',
    canonical: (s) => `https://craftygiftsplace.store/fr/pages/${s}.html`,
    websiteId: 'https://craftygiftsplace.store/fr/#website', websiteUrl: 'https://craftygiftsplace.store/fr/',
    homeLabel: 'Accueil', eyebrow: 'De la boutique Etsy',
    shopBtn: (q,n) => `Acheter ${n} sur Etsy`,
    note: 'Jetez un \u0153il ici, puis rendez-vous sur Etsy pour les prix, les avis et les commandes.',
    seeLabel: (n) => `Voir ${n}`,
    moreIdeas: "Plus d'id\u00e9es cadeaux",
    reviewQuote: '"Tr\u00e8s bonne qualit\u00e9, exactement comme d\u00e9crit, et le vendeur \u00e9tait agr\u00e9able. Tr\u00e8s recommand\u00e9\u00a0!"',
    reviewMeta: 'Avis Etsy',
    browseNote: (n) => `Parcourez ${n} ici, puis rendez-vous sur Etsy pour les prix, les avis et les commandes.`,
    popularPicks: 'S\u00e9lections populaires',
    popularPicksSub: 'Commencez avec quelques pi\u00e8ces remarquables, puis d\u00e9couvrez toute la gamme.',
    viewOnEtsy: 'Voir sur Etsy',
    whyLoveIt: 'Pourquoi les acheteurs adorent',
    whyItems: (n) => [`Regroupe les pi\u00e8ces ${n} en un seul endroit.`, `Facilite la comparaison des styles et des id\u00e9es cadeaux.`, `Vous dirige vers Etsy pour les prix, les avis et les commandes.`],
    readReviews: 'Lire les avis Etsy \u2192',
    moreFromRange: 'Plus dans cette gamme',
    moreFromRangeSub: (n) => `Un aper\u00e7u des pi\u00e8ces ${n} actuellement disponibles.`,
    faqHeading: 'Questions fr\u00e9quemment pos\u00e9es',
    faqSub: 'R\u00e9ponses courtes aux questions les plus fr\u00e9quentes.',
    faqItems: (n) => [
      { q: `Vous cherchez plus dans ${n}\u00a0?`, a: `Cette page met en avant les pi\u00e8ces ${n}, avec Etsy pour les d\u00e9tails en direct.` },
      { q: 'Je commande toujours sur Etsy\u00a0?', a: 'Oui. Quand vous \u00eates pr\u00eat \u00e0 acheter, Etsy g\u00e8re les prix, les avis et la commande.' },
      { q: 'Puis-je continuer \u00e0 explorer\u00a0?', a: 'Oui. Les liens voisins permettent de revenir aux collections et aux id\u00e9es cadeaux.' },
    ],
    moreGiftIdeas: "Plus d'id\u00e9es cadeaux",
    moreGiftIdeasSub: 'Quelques collections proches qui valent le coup d\u2019\u0153il.',
    ctaHeading: (n) => `Pr\u00eat \u00e0 voir ${n} sur Etsy\u00a0?`,
    ctaSub: 'Ouvrez Etsy pour les prix actuels, les d\u00e9tails et les avis acheteurs.',
    footerBrandTagline: 'Cadeaux en bois faits main avec chaleur, d\u00e9tail et caract\u00e8re.',
    footerCollections: 'Collections', footerGiftIdeas: 'Id\u00e9es cadeaux',
    footerCoasters: 'Sous-verres', footerBookmarks: 'Marque-pages', footerWooden: 'Cadeaux en bois',
    footerCat: 'Cadeaux pour amoureux des chats', footerReader: 'Cadeaux pour lecteurs', footerHousewarming: 'Cadeaux de cr\u00e9maill\u00e8re',
    footerEtsy: 'Acheter Craftygiftsplace sur Etsy \u2192',
    footerRating: 'Not\u00e9 4,96/5 sur Etsy pour un service attentionn\u00e9, de beaux d\u00e9tails et une qualit\u00e9 artisanale.',
    navLinks: [
      { href: '../index.html', label: 'Accueil' },
      { href: 'sous-verres-en-bois.html', label: 'Sous-verres' },
      { href: 'marque-pages-en-bois.html', label: 'Marque-pages' },
      { href: 'cadeaux-en-bois.html', label: 'Cadeaux en bois' },
      { href: 'personnalisation.html', label: 'Personnalisation' },
      { href: 'pourquoi-des-cadeaux-en-bois.html', label: 'Pourquoi des cadeaux en bois\u00a0?' },
      { href: 'contact.html', label: 'Contact' },
    ],
    menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu',
  },
  es: {
    lang: 'es', locale: 'es_ES', dir: 'es/pages', assetPrefix: '../../', homeHref: '../index.html',
    canonical: (s) => `https://craftygiftsplace.store/es/pages/${s}.html`,
    websiteId: 'https://craftygiftsplace.store/es/#website', websiteUrl: 'https://craftygiftsplace.store/es/',
    homeLabel: 'Inicio', eyebrow: 'De la tienda Etsy',
    shopBtn: (q,n) => `Comprar ${n} en Etsy`,
    note: 'Echa un vistazo aqu\u00ed, luego ve a Etsy para precios, rese\u00f1as y pedidos.',
    seeLabel: (n) => `Ver ${n}`,
    moreIdeas: 'M\u00e1s ideas de regalo',
    reviewQuote: '"\u00c9xcelente calidad, exactamente como se describe, y el vendedor fue muy amable. \u00a1Muy recomendado!"',
    reviewMeta: 'Rese\u00f1a de Etsy',
    browseNote: (n) => `Explora ${n} aqu\u00ed y luego ve a Etsy para precios, rese\u00f1as y pedidos.`,
    popularPicks: 'Selecciones populares',
    popularPicksSub: 'Empieza con algunas piezas destacadas y luego descubre toda la gama.',
    viewOnEtsy: 'Ver en Etsy',
    whyLoveIt: 'Por qu\u00e9 les encanta a los compradores',
    whyItems: (n) => [`Re\u00fane las piezas de ${n} en un solo lugar.`, `Facilita comparar estilos e ideas de regalo de un vistazo.`, `Te dirige a Etsy para precios, rese\u00f1as y pedidos en vivo.`],
    readReviews: 'Leer rese\u00f1as de Etsy \u2192',
    moreFromRange: 'M\u00e1s de esta categor\u00eda',
    moreFromRangeSub: (n) => `Un vistazo m\u00e1s cercano a las piezas de ${n} disponibles.`,
    faqHeading: 'Preguntas frecuentes',
    faqSub: 'Respuestas cortas a las preguntas m\u00e1s frecuentes.',
    faqItems: (n) => [
      { q: `\u00bfBuscas m\u00e1s en ${n}?`, a: `Esta p\u00e1gina destaca las piezas de ${n} con Etsy para detalles en vivo.` },
      { q: '\u00bfSigo comprando en Etsy?', a: 'S\u00ed. Cuando est\u00e9s listo para comprar, Etsy gestiona los precios, rese\u00f1as y pedidos.' },
      { q: '\u00bfPuedo seguir explorando?', a: 'S\u00ed. Los enlaces cercanos permiten volver a las colecciones e ideas de regalo.' },
    ],
    moreGiftIdeas: 'M\u00e1s ideas de regalo',
    moreGiftIdeasSub: 'Algunas colecciones cercanas que merece la pena ver.',
    ctaHeading: (n) => `\u00bfListo para ver ${n} en Etsy?`,
    ctaSub: 'Abre Etsy para ver precios actuales, detalles y rese\u00f1as de compradores.',
    footerBrandTagline: 'Regalos de madera artesanales con calidez, detalle y car\u00e1cter.',
    footerCollections: 'Colecciones', footerGiftIdeas: 'Ideas de regalo',
    footerCoasters: 'Posavasos', footerBookmarks: 'Marcap\u00e1ginas', footerWooden: 'Regalos de madera',
    footerCat: 'Regalos para amantes de gatos', footerReader: 'Regalos para lectores', footerHousewarming: 'Regalos para casa nueva',
    footerEtsy: 'Comprar Craftygiftsplace en Etsy \u2192',
    footerRating: 'Valorado con 4,96/5 en Etsy por servicio atento, hermosos detalles y calidad artesanal.',
    navLinks: [
      { href: '../index.html', label: 'Inicio' },
      { href: 'posavasos-de-madera.html', label: 'Posavasos' },
      { href: 'marcapaginas-de-madera.html', label: 'Marcap\u00e1ginas' },
      { href: 'regalos-de-madera.html', label: 'Regalos de madera' },
      { href: 'personalizacion.html', label: 'Personalizaci\u00f3n' },
      { href: 'por-que-regalos-de-madera.html', label: '\u00bfPor qu\u00e9 regalos de madera?' },
      { href: 'contacto.html', label: 'Contacto' },
    ],
    menuOpen: 'Abrir el men\u00fa', menuClose: 'Cerrar el men\u00fa',
  },
  pt: {
    lang: 'pt', locale: 'pt_PT', dir: 'pt/pages', assetPrefix: '../../', homeHref: '../index.html',
    canonical: (s) => `https://craftygiftsplace.store/pt/pages/${s}.html`,
    websiteId: 'https://craftygiftsplace.store/pt/#website', websiteUrl: 'https://craftygiftsplace.store/pt/',
    homeLabel: 'In\u00edcio', eyebrow: 'Da loja Etsy',
    shopBtn: (q,n) => `Comprar ${n} no Etsy`,
    note: 'Veja aqui, depois v\u00e1 ao Etsy para pre\u00e7os, avalia\u00e7\u00f5es e encomendas.',
    seeLabel: (n) => `Ver ${n}`,
    moreIdeas: 'Mais ideias de presente',
    reviewQuote: '"Qualidade excelente, exatamente como descrito, e o vendedor foi muito simpático. Muito recomendado!"',
    reviewMeta: 'Avalia\u00e7\u00e3o Etsy',
    browseNote: (n) => `Explore ${n} aqui e depois v\u00e1 ao Etsy para pre\u00e7os, avalia\u00e7\u00f5es e encomendas.`,
    popularPicks: 'Escolhas populares',
    popularPicksSub: 'Comece com algumas pe\u00e7as de destaque e depois descubra toda a gama.',
    viewOnEtsy: 'Ver no Etsy',
    whyLoveIt: 'Por que os compradores adoram',
    whyItems: (n) => [`Re\u00fane as pe\u00e7as de ${n} num s\u00f3 lugar.`, `Facilita a compara\u00e7\u00e3o de estilos e ideias de presente.`, `Encaminha para o Etsy para pre\u00e7os, avalia\u00e7\u00f5es e encomendas.`],
    readReviews: 'Ler avalia\u00e7\u00f5es Etsy \u2192',
    moreFromRange: 'Mais desta categoria',
    moreFromRangeSub: (n) => `Uma vis\u00e3o mais pr\u00f3xima das pe\u00e7as de ${n} dispon\u00edveis.`,
    faqHeading: 'Perguntas frequentes',
    faqSub: 'Respostas curtas \u00e0s perguntas mais frequentes.',
    faqItems: (n) => [
      { q: `Procura mais em ${n}?`, a: `Esta p\u00e1gina destaca as pe\u00e7as de ${n} com o Etsy para detalhes em tempo real.` },
      { q: 'Ainda compro no Etsy?', a: 'Sim. Quando estiver pronto para comprar, o Etsy trata dos pre\u00e7os, avalia\u00e7\u00f5es e encomendas.' },
      { q: 'Posso continuar a explorar?', a: 'Sim. Os links pr\u00f3ximos permitem voltar \u00e0s cole\u00e7\u00f5es e ideias de presente.' },
    ],
    moreGiftIdeas: 'Mais ideias de presente',
    moreGiftIdeasSub: 'Algumas cole\u00e7\u00f5es pr\u00f3ximas que vale a pena ver.',
    ctaHeading: (n) => `Pronto para ver ${n} no Etsy?`,
    ctaSub: 'Abra o Etsy para pre\u00e7os atuais, detalhes e avalia\u00e7\u00f5es de compradores.',
    footerBrandTagline: 'Presentes de madeira artesanais com calor, detalhe e car\u00e1ter.',
    footerCollections: 'Cole\u00e7\u00f5es', footerGiftIdeas: 'Ideias de presente',
    footerCoasters: 'Porta-copos', footerBookmarks: 'Marcadores de livros', footerWooden: 'Presentes de madeira',
    footerCat: 'Presentes para amantes de gatos', footerReader: 'Presentes para leitores', footerHousewarming: 'Presentes de casa nova',
    footerEtsy: 'Comprar Craftygiftsplace no Etsy \u2192',
    footerRating: 'Avaliado com 4,96/5 no Etsy por servi\u00e7o atencioso, belos detalhes e qualidade artesanal.',
    navLinks: [
      { href: '../index.html', label: 'In\u00edcio' },
      { href: 'porta-copos-de-madeira.html', label: 'Porta-copos' },
      { href: 'marcadores-de-livros-de-madeira.html', label: 'Marcadores' },
      { href: 'presentes-de-madeira.html', label: 'Presentes de madeira' },
      { href: 'personalizacao.html', label: 'Personaliza\u00e7\u00e3o' },
      { href: 'por-que-presentes-de-madeira.html', label: 'Por que presentes de madeira?' },
      { href: 'contacto.html', label: 'Contacto' },
    ],
    menuOpen: 'Abrir o menu', menuClose: 'Fechar o menu',
  },
  it: {
    lang: 'it', locale: 'it_IT', dir: 'it/pages', assetPrefix: '../../', homeHref: '../index.html',
    canonical: (s) => `https://craftygiftsplace.store/it/pages/${s}.html`,
    websiteId: 'https://craftygiftsplace.store/it/#website', websiteUrl: 'https://craftygiftsplace.store/it/',
    homeLabel: 'Home', eyebrow: 'Dal negozio Etsy',
    shopBtn: (q,n) => `Acquista ${n} su Etsy`,
    note: 'Dai uno sguardo qui, poi vai su Etsy per prezzi, recensioni e ordini.',
    seeLabel: (n) => `Vedi ${n}`,
    moreIdeas: 'Altre idee regalo',
    reviewQuote: '"Qualit\u00e0 eccellente, esattamente come descritto, e il venditore era gentile. Molto consigliato!"',
    reviewMeta: 'Recensione Etsy',
    browseNote: (n) => `Esplora ${n} qui, poi vai su Etsy per prezzi, recensioni e ordini.`,
    popularPicks: 'Scelte popolari',
    popularPicksSub: 'Inizia con alcune pezze di punta, poi scopri tutta la gamma.',
    viewOnEtsy: 'Vedi su Etsy',
    whyLoveIt: 'Perch\u00e9 gli acquirenti lo adorano',
    whyItems: (n) => [`Raggruppa i pezzi di ${n} in un unico posto.`, `Semplifica il confronto di stili e idee regalo.`, `Ti porta su Etsy per prezzi, recensioni e ordini in tempo reale.`],
    readReviews: 'Leggi le recensioni Etsy \u2192',
    moreFromRange: 'Di pi\u00f9 in questa categoria',
    moreFromRangeSub: (n) => `Uno sguardo pi\u00f9 da vicino ai pezzi di ${n} disponibili.`,
    faqHeading: 'Domande frequenti',
    faqSub: 'Risposte brevi alle domande pi\u00f9 frequenti.',
    faqItems: (n) => [
      { q: `Cerchi altro in ${n}?`, a: `Questa pagina mette in evidenza i pezzi di ${n} con Etsy per i dettagli in tempo reale.` },
      { q: 'Ordino comunque su Etsy?', a: 'S\u00ec. Quando sei pronto ad acquistare, Etsy gestisce prezzi, recensioni e ordini.' },
      { q: 'Posso continuare ad esplorare?', a: 'S\u00ec. I link vicini ti permettono di tornare alle collezioni e alle idee regalo.' },
    ],
    moreGiftIdeas: 'Altre idee regalo',
    moreGiftIdeasSub: 'Alcune collezioni vicine che vale la pena guardare.',
    ctaHeading: (n) => `Pronto a vedere ${n} su Etsy?`,
    ctaSub: 'Apri Etsy per prezzi attuali, dettagli e recensioni degli acquirenti.',
    footerBrandTagline: 'Regali in legno fatti a mano con calore, dettaglio e carattere.',
    footerCollections: 'Collezioni', footerGiftIdeas: 'Idee regalo',
    footerCoasters: 'Sottobicchieri', footerBookmarks: 'Segnalibri', footerWooden: 'Regali in legno',
    footerCat: 'Regali per amanti dei gatti', footerReader: 'Regali per lettori', footerHousewarming: 'Regali per la casa nuova',
    footerEtsy: 'Acquista Craftygiftsplace su Etsy \u2192',
    footerRating: 'Valutato 4,96/5 su Etsy per servizio premuroso, bellissimi dettagli e qualit\u00e0 artigianale.',
    navLinks: [
      { href: '../index.html', label: 'Home' },
      { href: 'sottobicchieri-in-legno.html', label: 'Sottobicchieri' },
      { href: 'segnalibri-in-legno.html', label: 'Segnalibri' },
      { href: 'regali-in-legno.html', label: 'Regali in legno' },
      { href: 'personalizzazione.html', label: 'Personalizzazione' },
      { href: 'perche-regali-in-legno.html', label: 'Perch\u00e9 regali in legno?' },
      { href: 'contatto.html', label: 'Contatto' },
    ],
    menuOpen: 'Apri il menu', menuClose: 'Chiudi il menu',
  },
  nl: {
    lang: 'nl', locale: 'nl_NL', dir: 'pages', assetPrefix: '../', homeHref: '../index.html',
    canonical: (s) => `https://craftygiftsplace.store/pages/${s}.html`,
    websiteId: 'https://craftygiftsplace.store/#website', websiteUrl: 'https://craftygiftsplace.store/',
    homeLabel: 'Home', eyebrow: 'Uit de Etsy-winkel',
    shopBtn: (q,n) => `${n} op Etsy kopen`,
    note: 'Kijk hier rond, ga dan naar Etsy voor prijzen, reviews en bestellen.',
    seeLabel: (n) => `Bekijk ${n}`,
    moreIdeas: 'Meer cadeauidee\u00ebn',
    reviewQuote: '"Geweldige kwaliteit, precies zoals beschreven, en de verkoper was vriendelijk. Zeker aan te raden!"',
    reviewMeta: 'Etsy-review',
    browseNote: (n) => `Blader hier door ${n} en ga dan naar Etsy voor prijzen, reviews en bestellen.`,
    popularPicks: 'Populaire keuzes',
    popularPicksSub: 'Begin met een paar opvallende stukken en ontdek daarna het volledige aanbod.',
    viewOnEtsy: 'Bekijk op Etsy',
    whyLoveIt: 'Waarom kopers het geweldig vinden',
    whyItems: (n) => [`Houdt de ${n}-stukken bij elkaar in \u00e9\u00e9n overzicht.`, `Maakt het makkelijker om stijlen en cadeauidee\u00ebn te vergelijken.`, `Stuurt je toch naar Etsy voor live-prijzen, reviews en bestellen.`],
    readReviews: 'Lees Etsy-reviews \u2192',
    moreFromRange: 'Meer uit deze categorie',
    moreFromRangeSub: (n) => `Een nadere blik op de beschikbare ${n}-stukken.`,
    faqHeading: 'Veelgestelde vragen',
    faqSub: 'Korte antwoorden op de meest gestelde vragen.',
    faqItems: (n) => [
      { q: `Op zoek naar meer in ${n}?`, a: `Deze pagina toont de ${n}-stukken met Etsy voor live-details.` },
      { q: 'Bestel ik nog steeds via Etsy?', a: 'Ja. Als je klaar bent om te kopen, regelt Etsy de prijzen, reviews en bestellingen.' },
      { q: 'Kan ik hier verder browsen?', a: 'Ja. Via links kom je terug bij de hoofdcollecties en meer cadeauidee\u00ebn.' },
    ],
    moreGiftIdeas: 'Meer cadeauidee\u00ebn',
    moreGiftIdeasSub: 'Nog een paar categorieën die de moeite waard zijn.',
    ctaHeading: (n) => `Klaar om ${n} op Etsy te zien?`,
    ctaSub: 'Open Etsy voor actuele prijzen, aanbiedingsdetails en kopersreviews.',
    footerBrandTagline: 'Handgemaakte houten cadeaus met warmte, detail en karakter.',
    footerCollections: 'Collecties', footerGiftIdeas: 'Cadeauidee\u00ebn',
    footerCoasters: 'Onderzetters', footerBookmarks: 'Bladwijzers', footerWooden: 'Houten cadeaus',
    footerCat: 'Cadeaus voor kattenliefhebbers', footerReader: 'Lezerscadeaus', footerHousewarming: 'Verhuiscadeaus',
    footerEtsy: 'Koop Craftygiftsplace op Etsy \u2192',
    footerRating: 'Beoordeeld met 4,96/5 op Etsy voor attente service, prachtige details en handgemaakte kwaliteit.',
    navLinks: [
      { href: '../index.html', label: 'Home' },
      { href: 'onderzetters.html', label: 'Onderzetters' },
      { href: 'bladwijzers.html', label: 'Bladwijzers' },
      { href: 'houten-cadeaus.html', label: 'Houten cadeaus' },
      { href: 'personalisatie.html', label: 'Personalisatie' },
      { href: 'waarom-houten-cadeaus.html', label: 'Waarom houten cadeaus?' },
      { href: 'contact.html', label: 'Contact' },
    ],
    menuOpen: 'Open het menu', menuClose: 'Sluit het menu',
  },
};

// ── Page translations ─────────────────────────────────────────────────────────
// name, lede, relatedDesc per language for each new page
const pageTranslations = {
  'baby-bliss': {
    de: { name: 'Baby Erstausstattung', lede: 'Baby Erstausstattung bringt die Meilenstein- und Kinderzimmerst\u00fccke zusammen, die Menschen kaufen, wenn ein neues Leben beginnt.' },
    fr: { name: 'Baby Bliss', lede: 'Baby Bliss regroupe les pi\u00e8ces de jalons et de chambre de b\u00e9b\u00e9 que les gens recherchent \u00e0 l\u2019arriv\u00e9e d\u2019un nouveau-n\u00e9.' },
    es: { name: 'Baby Bliss', lede: 'Baby Bliss re\u00fane las piezas de hitos y decoraci\u00f3n de beb\u00e9 que la gente compra cuando llega un nuevo integrante a la familia.' },
    pt: { name: 'Baby Bliss', lede: 'Baby Bliss re\u00fane as pe\u00e7as de marcos e quarto de beb\u00e9 que as pessoas procuram quando chega um novo membro \u00e0 fam\u00edlia.' },
    it: { name: 'Baby Bliss', lede: 'Baby Bliss riunisce i pezzi di traguardi e cameretta che le persone cercano quando arriva un nuovo bambino.' },
    nl: { name: 'Baby Bliss', lede: 'Baby Bliss brengt de mijlpaal- en babykamerstukken samen die mensen kopen wanneer er een nieuw leven begint.' },
  },
  'candle-holders': {
    de: { name: 'Kerzenhalter', lede: 'Kerzenhalter bringt die schattenspendenden Teelichtdesigns zusammen, die zu Regalen, Kommoden und gem\u00fctlichen Ecken passen.' },
    fr: { name: 'Porte-bougies', lede: 'Porte-bougies regroupe les designs de bougeoirs qui projettent des ombres et qui conviennent aux \u00e9tag\u00e8res et aux coins cosy.' },
    es: { name: 'Portavelas', lede: 'Portavelas re\u00fane los dise\u00f1os de portavelas que proyectan sombras y que se adaptan a estanter\u00edas y rincones acogedores.' },
    pt: { name: 'Porta-velas', lede: 'Porta-velas re\u00fane os designs de porta-velas que projetam sombras e que se adaptam a prateleiras e cantos aconchegantes.' },
    it: { name: 'Portacandele', lede: 'Portacandele riunisce i design di porta-candele che proiettano ombre e che si adattano a scaffali e angoli accoglienti.' },
    nl: { name: 'Kaarsenhouders', lede: 'Kaarsenhouders brengt de schaduwwerpende theelichtontwerpen samen die passen bij planken, dressoirs en gezellige hoekjes.' },
  },
  'christmas': {
    de: { name: 'Weihnachten', lede: 'Weihnachten h\u00e4lt das festliche Holzornament-Set f\u00fcr saisonales Schenken und Dekorieren bereit.' },
    fr: { name: 'No\u00ebl', lede: 'No\u00ebl regroupe le set d\u2019ornements en bois festifs pour les cadeaux et la d\u00e9coration de saison.' },
    es: { name: 'Navidad', lede: 'Navidad mantiene el set de adornos navide\u00f1os de madera f\u00e1cil de encontrar para regalar y decorar en temporada.' },
    pt: { name: 'Natal', lede: 'Natal mant\u00e9m o conjunto de ornamentos de madeira festivos f\u00e1cil de encontrar para presentes e decora\u00e7\u00e3o de temporada.' },
    it: { name: 'Natale', lede: 'Natale mantiene il set di ornamenti in legno natalizi facile da trovare per regali e decorazioni stagionali.' },
    nl: { name: 'Kerst', lede: 'Kerst houdt het feestelijke houten ornamentset gemakkelijk vindbaar voor seizoensgebonden cadeaus en decoratie.' },
  },
  'diy': {
    de: { name: 'Do It Yourself', lede: 'Do It Yourself bringt die Rohlinge und bastelfertigen St\u00fccke zusammen, die Menschen kaufen, um sie zu bemalen oder zu Hause fertigzustellen.' },
    fr: { name: 'Bricolage', lede: 'Bricolage regroupe les \u00e9bauches et pi\u00e8ces pr\u00eates \u00e0 cr\u00e9er que les gens ach\u00e8tent pour peindre, d\u00e9corer ou finir \u00e0 la maison.' },
    es: { name: 'Manualidades', lede: 'Manualidades re\u00fane las piezas en blanco y listas para manualidades que la gente compra para pintar, decorar o terminar en casa.' },
    pt: { name: 'Fa\u00e7a voc\u00ea mesmo', lede: 'Fa\u00e7a voc\u00ea mesmo re\u00fane as pe\u00e7as em branco e prontas para artesanato que as pessoas compram para pintar, decorar ou acabar em casa.' },
    it: { name: 'Fai da te', lede: 'Fai da te riunisce i pezzi grezzi e pronti per il fai da te che le persone acquistano per dipingere, decorare o finire a casa.' },
    nl: { name: 'Doe het zelf', lede: 'Doe het zelf brengt de blanks en klaarmaakmaterialen samen die mensen kopen om te schilderen, versieren of thuis af te maken.' },
  },
  'door-hangers': {
    de: { name: 'T\u00fcrschilder', lede: 'T\u00fcrschilder bringt H\u00f6lzer Schilder und T\u00fcranh\u00e4nger f\u00fcr Schlafzimmer, Gaming-Setups und ruhigere Ecken zusammen.' },
    fr: { name: 'Accroche-portes', lede: 'Accroche-portes regroupe les panneaux en bois et accroche-portes pour chambres, espaces gaming et coins tranquilles.' },
    es: { name: 'Colgadores de puerta', lede: 'Colgadores de puerta re\u00fane los carteles y colgadores de madera para dormitorios, configuraciones de juego y rincones tranquilos.' },
    pt: { name: 'Cabides de porta', lede: 'Cabides de porta re\u00fane os cart\u00f5es e cabides de madeira para quartos, setups de jogos e cantos mais tranquilos.' },
    it: { name: 'Appendiporte', lede: 'Appendiporte riunisce i cartelli e appendiporte in legno per camere da letto, postazioni gaming e angoli pi\u00f9 tranquilli.' },
    nl: { name: 'Deurtekens', lede: 'Deurtekens brengt houten borden en deurtekens samen voor slaapkamers, gamingsetups en rustigere hoekjes.' },
  },
  'educational-toys-and-games': {
    de: { name: 'Lernspielzeug', lede: 'Lernspielzeug hebt das handgefertigte Lernst\u00fcck f\u00fcr fr\u00fches Rechnen, den Unterricht und durchdachtes Schenken hervor.' },
    fr: { name: 'Jouets \u00e9ducatifs', lede: 'Jouets \u00e9ducatifs met en avant la pi\u00e8ce d\u2019apprentissage faite \u00e0 la main pour les maths pr\u00e9coces, l\u2019usage scolaire et les cadeaux r\u00e9fl\u00e9chis.' },
    es: { name: 'Juguetes educativos', lede: 'Juguetes educativos destaca la pieza de aprendizaje artesanal para matem\u00e1ticas tempranas, uso escolar y regalos reflexivos.' },
    pt: { name: 'Brinquedos educativos', lede: 'Brinquedos educativos destaca a pe\u00e7a de aprendizagem artesanal para matem\u00e1tica precoce, uso escolar e presentes cuidadosos.' },
    it: { name: 'Giocattoli educativi', lede: 'Giocattoli educativi mette in evidenza il pezzo di apprendimento artigianale per la matematica precoce, l\u2019uso scolastico e i regali ponderati.' },
    nl: { name: 'Educatief speelgoed', lede: 'Educatief speelgoed belicht het handgemaakte leerstuk voor vroege wiskunde, schoolgebruik en doordachte cadeaus.' },
  },
  'funny-presents': {
    de: { name: 'Lustige Geschenke', lede: 'Lustige Geschenke h\u00e4lt das witzigste Scherzgeschenk aus dem Laden f\u00fcr eine einfachere \u00dcbersicht bereit.' },
    fr: { name: 'Cadeaux rigolos', lede: 'Cadeaux rigolos regroupe les cadeaux farce les plus port\u00e9s de la boutique pour une navigation plus facile.' },
    es: { name: 'Regalos divertidos', lede: 'Regalos divertidos mantiene los regalos de broma m\u00e1s usables de la tienda juntos para una navegaci\u00f3n m\u00e1s f\u00e1cil.' },
    pt: { name: 'Prendas divertidas', lede: 'Prendas divertidas mant\u00e9m os presentes de brincadeira mais us\u00e1veis da loja juntos para uma navega\u00e7\u00e3o mais f\u00e1cil.' },
    it: { name: 'Regali divertenti', lede: 'Regali divertenti mantiene i regali scherzo pi\u00f9 indossabili del negozio insieme per una navigazione pi\u00f9 facile.' },
    nl: { name: 'Grappige cadeaus', lede: 'Grappige cadeaus houdt de meest draagbare grappige cadeaus uit de winkel bij elkaar voor gemakkelijker bladeren.' },
  },
  'gifts-for-it-and-gamers': {
    de: { name: 'Geschenke f\u00fcr Gamer', lede: 'Geschenke f\u00fcr Gamer gibt dem technikaffinen Schl\u00fcsselanh\u00e4nger ein klares Zuhause f\u00fcr Schreibtischgeschenke und Gamer-freundliches St\u00f6bern.' },
    fr: { name: 'Cadeaux pour gamers', lede: 'Cadeaux pour gamers donne au porte-cl\u00e9s tech un endroit clair pour les cadeaux de bureau et la navigation adapt\u00e9e aux gamers.' },
    es: { name: 'Regalos para gamers', lede: 'Regalos para gamers da al llavero tem\u00e1tico un hogar claro para regalos de escritorio y navegaci\u00f3n amigable para gamers.' },
    pt: { name: 'Presentes para gamers', lede: 'Presentes para gamers d\u00e1 \u00e0 chaveiro tem\u00e1tica um lugar claro para presentes de escrit\u00f3rio e navega\u00e7\u00e3o amig\u00e1vel para gamers.' },
    it: { name: 'Regali per gamer', lede: 'Regali per gamer d\u00e0 al portachiavi tematico un posto chiaro per i regali da scrivania e la navigazione pensata per i gamer.' },
    nl: { name: 'Cadeaus voor gamers', lede: 'Cadeaus voor gamers geeft de thematische sleutelhanger een duidelijke plek voor bureaucadeaus en gamer-vriendelijk bladeren.' },
  },
  'incense-burners': {
    de: { name: 'R\u00e4ucherst\u00e4bchenhalter', lede: 'Das R\u00e4ucherstabst\u00fcck ist hier leicht zu finden f\u00fcr Regale, Leseecken und ruhige Routinen.' },
    fr: { name: 'Br\u00fcle-encens', lede: 'Le br\u00fcle-encens est facile \u00e0 trouver ici pour les \u00e9tag\u00e8res, les coins lecture et les routines calmes.' },
    es: { name: 'Quemadores de incienso', lede: 'El quemador de incienso es f\u00e1cil de encontrar aqu\u00ed para estanter\u00edas, rincones de lectura y rutinas tranquilas.' },
    pt: { name: 'Queimadores de incenso', lede: 'O queimador de incenso \u00e9 f\u00e1cil de encontrar aqui para prateleiras, cantos de leitura e rotinas calmas.' },
    it: { name: 'Brucia-incenso', lede: 'Il brucia-incenso \u00e8 facile da trovare qui per scaffali, angoli di lettura e routine tranquille.' },
    nl: { name: 'Wierookbranders', lede: 'Het wierookstuk is hier gemakkelijk te vinden voor planken, leeshoekjes en rustige routines.' },
  },
  'personalized-items': {
    de: { name: 'Personalisierte Artikel', lede: 'Personalisierte Artikel bringt die St\u00fccke zusammen, bei denen Namen, Daten oder individuelle Beschriftungen am meisten z\u00e4hlen.' },
    fr: { name: 'Articles personnalis\u00e9s', lede: 'Articles personnalis\u00e9s regroupe les pi\u00e8ces o\u00f9 les noms, les dates ou les inscriptions personnalis\u00e9es comptent le plus.' },
    es: { name: 'Art\u00edculos personalizados', lede: 'Art\u00edculos personalizados re\u00fane las piezas donde los nombres, fechas o mensajes personalizados importan m\u00e1s.' },
    pt: { name: 'Artigos personalizados', lede: 'Artigos personalizados re\u00fane as pe\u00e7as onde nomes, datas ou textos personalizados mais importam.' },
    it: { name: 'Articoli personalizzati', lede: 'Articoli personalizzati riunisce i pezzi dove i nomi, le date o le scritte personalizzate contano di pi\u00f9.' },
    nl: { name: 'Gepersonaliseerde items', lede: 'Gepersonaliseerde items brengt de stukken samen waarbij namen, datums of persoonlijke teksten het meest tellen.' },
  },
  'pet-memorial': {
    de: { name: 'Haustier-Gedenken', lede: 'Haustier-Gedenken h\u00e4lt dieses Erinnerungsst\u00fcck leicht auffindbar, wenn das Geschenk pers\u00f6nlich und er\u00e4hrungsvoll sein soll.' },
    fr: { name: 'M\u00e9morial animaux', lede: 'M\u00e9morial animaux facilite la recherche de cette pi\u00e8ce comm\u00e9morative quand le cadeau doit \u00eatre personnel et attentionn\u00e9.' },
    es: { name: 'Memorial mascotas', lede: 'Memorial mascotas facilita encontrar esta pieza conmemorativa cuando el regalo necesita sentirse personal y considerado.' },
    pt: { name: 'Memorial animais', lede: 'Memorial animais facilita encontrar esta pe\u00e7a comemorativa quando o presente precisa de ser pessoal e cuidadoso.' },
    it: { name: 'Memorial animali', lede: 'Memorial animali rende facile trovare questo pezzo commemorativo quando il regalo deve essere personale e premuroso.' },
    nl: { name: 'Huisdier herdenking', lede: 'Huisdier herdenking maakt dit herdenkingsstuk gemakkelijk vindbaar wanneer het cadeau persoonlijk en attent moet zijn.' },
  },
  'readers-kit': {
    de: { name: 'Lesepaket', lede: 'Lesepaket bringt die besten Lesezeichen- und Lesepakete aus dem Shop in einer \u00fcbersichtlichen Auswahl zusammen.' },
    fr: { name: 'Kit lecteur', lede: 'Kit lecteur regroupe les meilleurs marque-pages et packs cadeaux lecteur de la boutique en un seul endroit.' },
    es: { name: 'Kit lector', lede: 'Kit lector re\u00fane los mejores marcap\u00e1ginas y packs de regalo para lectores de la tienda en una sola navegaci\u00f3n.' },
    pt: { name: 'Kit leitor', lede: 'Kit leitor re\u00fane os melhores marcadores e packs de presente para leitores da loja numa \u00fanica navega\u00e7\u00e3o.' },
    it: { name: 'Kit lettore', lede: 'Kit lettore riunisce i migliori segnalibri e pack regalo per lettori del negozio in un\u2019unica navigazione.' },
    nl: { name: 'Lezerspakket', lede: 'Lezerspakket brengt de beste bladwijzers en lezersgeschenkpakketten uit de winkel samen in \u00e9\u00e9n overzicht.' },
  },
  'wedding': {
    de: { name: 'Hochzeit', lede: 'Hochzeit h\u00e4lt den Geldhalter f\u00fcr Neuverm\u00e4hlte und festliche Momente leicht auffindbar.' },
    fr: { name: 'Mariage', lede: 'Mariage facilite la recherche du porte-cadeau en esp\u00e8ces pour les nouveaux mari\u00e9s et les moments cl\u00e9s.' },
    es: { name: 'Boda', lede: 'Boda mantiene el portabilletes para reci\u00e9n casados y momentos especiales f\u00e1cil de encontrar.' },
    pt: { name: 'Casamento', lede: 'Casamento mant\u00e9m o porta-dinheiro para rec\u00e9m-casados e momentos especiais f\u00e1cil de encontrar.' },
    it: { name: 'Matrimonio', lede: 'Matrimonio mantiene il portasoldi per i novelli sposi e i momenti speciali facile da trovare.' },
    nl: { name: 'Bruiloft', lede: 'Bruiloft houdt de geldhouder voor pasgetrouwden en bijzondere momenten gemakkelijk vindbaar.' },
  },
};

// ── Page data: 13 missing pages ───────────────────────────────────────────────
const pages = [
  {
    enSlug: 'baby-bliss',
    etsyQuery: 'baby',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/776584/5442155599/il_600x600.5442155599_qtxo.jpg',
    products: [
      { name: 'Wooden Baby Milestone Discs', image: 'https://i.etsystatic.com/46731516/r/il/776584/5442155599/il_600x600.5442155599_qtxo.jpg', imageId: '776584/5442155599', query: 'Wooden%20Baby%20Milestone%20Discs', chips: ['New baby', 'Cozy style'], desc: 'A standout handmade pick for nurseries and milestone moments.' },
    ],
    related: ['personalized-items', 'christmas', 'wooden-gifts'],
    relatedDesc: { 'personalized-items': 'Pieces where a name or date makes the gift feel truly made for them.', 'christmas': 'Seasonal wooden pieces that also work for first-Christmas gifting.', 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.' },
  },
  {
    enSlug: 'candle-holders',
    etsyQuery: 'candle%20holder',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/01a147/6325144691/il_600x600.6325144691_ecdm.jpg',
    products: [
      { name: 'Moon Cat Shadow Tealight Holder', image: 'https://i.etsystatic.com/46731516/r/il/01a147/6325144691/il_600x600.6325144691_ecdm.jpg', imageId: '01a147/6325144691', query: 'Moon%20Cat%20Shadow%20Tealight%20Holder', chips: ['Cat lover gift', 'Housewarming gift'], desc: 'A shadow-casting tealight piece for shelves, side tables and cozy corners.' },
      { name: 'Spider Web Tealight Holder', image: 'https://i.etsystatic.com/46731516/r/il/8dcb7c/6339150323/il_600x600.6339150323_jmbn.jpg', imageId: '8dcb7c/6339150323', query: 'Spider%20Web%20Tealight%20Holder', chips: ['Bold decor', 'Housewarming gift'], desc: 'A bold tealight holder with spider web engraving for atmospheric shelves.' },
      { name: 'Skull Tealight Holder', image: 'https://i.etsystatic.com/46731516/r/il/58d874/6329506163/il_600x600.6329506163_9aip.jpg', imageId: '58d874/6329506163', query: 'Skull%20Tealight%20Holder', chips: ['Bold decor', 'Housewarming gift'], desc: 'A character-led tealight holder for darker, more atmospheric interiors.' },
    ],
    related: ['wooden-gifts', 'housewarming-gifts', 'cat-lover-gifts'],
    relatedDesc: { 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.', 'housewarming-gifts': 'Coaster sets and decor for new homes and warm interiors.', 'cat-lover-gifts': 'Cat-themed coasters, tealights and decor for cozy homes.' },
  },
  {
    enSlug: 'christmas',
    etsyQuery: 'christmas',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/e2a1f8/5392453943/il_600x600.5392453943_rd6e.jpg',
    products: [
      { name: 'DIY Christmas Ornaments', image: 'https://i.etsystatic.com/46731516/r/il/e2a1f8/5392453943/il_600x600.5392453943_rd6e.jpg', imageId: 'e2a1f8/5392453943', query: 'DIY%20Christmas%20Ornaments', chips: ['DIY gift', 'Seasonal decor'], desc: 'A festive wooden ornament set ready to paint and decorate at home.' },
    ],
    related: ['diy', 'baby-bliss', 'wooden-gifts'],
    relatedDesc: { 'diy': 'Craft blanks and seasonal kits for hands-on holiday making.', 'baby-bliss': 'New-arrival keepsakes that also fit first-Christmas gifting.', 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.' },
  },
  {
    enSlug: 'diy',
    etsyQuery: 'diy',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/6b90e3/5945198279/il_600x600.5945198279_d3g2.jpg',
    products: [
      { name: 'Birch Wood Circle Blanks', image: 'https://i.etsystatic.com/46731516/r/il/6b90e3/5945198279/il_600x600.5945198279_d3g2.jpg', imageId: '6b90e3/5945198279', query: 'Birch%20Wood%20Circle%20Blanks', chips: ['DIY craft', 'Wooden blank'], desc: 'Smooth birch circles ready to paint, stamp or personalise at home.' },
      { name: 'Wooden Dinosaur Shapes', image: 'https://i.etsystatic.com/46731516/r/il/ef7380/7439397136/il_600x600.7439397136_qiy2.jpg', imageId: 'ef7380/7439397136', query: 'Wooden%20Dinosaur%20Shapes%20Set%20of%2012', chips: ['DIY craft', 'Kids gift'], desc: 'A set of laser-cut dinosaur shapes perfect for painting and creative play.' },
      { name: 'DIY Christmas Ornaments', image: 'https://i.etsystatic.com/46731516/r/il/e2a1f8/5392453943/il_600x600.5392453943_rd6e.jpg', imageId: 'e2a1f8/5392453943', query: 'DIY%20Christmas%20Ornaments', chips: ['DIY gift', 'Seasonal decor'], desc: 'Wooden blanks to decorate as festive ornaments for the holiday season.' },
    ],
    related: ['wooden-gifts', 'educational-toys-and-games', 'christmas'],
    relatedDesc: { 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.', 'educational-toys-and-games': 'Hands-on learning pieces and games for curious young minds.', 'christmas': 'The seasonal ornament set for festive gifting and decorating.' },
  },
  {
    enSlug: 'door-hangers',
    etsyQuery: 'door%20hanger',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/10c262/5411743080/il_600x600.5411743080_iwdn.jpg',
    products: [
      { name: 'Fantasy Gamer Door Sign', image: 'https://i.etsystatic.com/46731516/r/il/10c262/5411743080/il_600x600.5411743080_iwdn.jpg', imageId: '10c262/5411743080', query: 'wooden%20gamer%20door%20sign', chips: ['Gamer gift', 'Door decor'], desc: 'A fantasy-themed wooden door sign for bedrooms and gaming setups.' },
      { name: 'MOBA Gamer Door Hanger', image: 'https://i.etsystatic.com/46731516/r/il/c8dbb2/6232479392/il_600x600.6232479392_9rtx.jpg', imageId: 'c8dbb2/6232479392', query: 'wooden%20gamer%20door%20sign', chips: ['Gamer gift', 'Door decor'], desc: 'For dedicated MOBA players — a bold wooden door hanger with gaming detail.' },
    ],
    related: ['wooden-gifts', 'gifts-for-it-and-gamers', 'wedding'],
    relatedDesc: { 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.', 'gifts-for-it-and-gamers': 'Tech-themed wooden gifts for IT professionals and gamers.', 'wedding': 'Wooden keepsakes and personalised pieces for wedding gifting.' },
  },
  {
    enSlug: 'educational-toys-and-games',
    etsyQuery: 'montessori',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/1e60c4/7424299275/il_600x600.7424299275_ome0.jpg',
    products: [
      { name: 'Montessori Wooden Numicon Set', image: 'https://i.etsystatic.com/46731516/r/il/1e60c4/7424299275/il_600x600.7424299275_ome0.jpg', imageId: '1e60c4/7424299275', query: 'Montessori%20Wooden%20Numicon%20Set', chips: ['Educational', 'Wooden toy'], desc: 'A hands-on Montessori maths set for early learning at home or in the classroom.' },
    ],
    related: ['diy', 'baby-bliss', 'wooden-gifts'],
    relatedDesc: { 'diy': 'Craft blanks and creative kits for hands-on making.', 'baby-bliss': 'Nursery and milestone pieces for new arrivals.', 'wooden-gifts': 'The broader handmade gifts category for thoughtful browsing.' },
  },
  {
    enSlug: 'funny-presents',
    etsyQuery: 'funny%20gift',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/04a22b/6453094459/il_600x600.6453094459_6kwu.jpg',
    products: [
      { name: "Bald Man's Comb", image: 'https://i.etsystatic.com/46731516/r/il/04a22b/6453094459/il_600x600.6453094459_6kwu.jpg', imageId: '04a22b/6453094459', query: "Bald%20Man's%20Comb", chips: ['Funny gift', 'Novelty wood'], desc: "A wooden comb for the baldest man in the room. Gets a laugh every time." },
    ],
    related: ['wooden-gifts', 'gifts-for-it-and-gamers', 'housewarming-gifts'],
    relatedDesc: { 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.', 'gifts-for-it-and-gamers': 'Tech-themed wooden gifts for IT professionals and gamers.', 'housewarming-gifts': 'Coaster sets and decor for new homes and warm interiors.' },
  },
  {
    enSlug: 'gifts-for-it-and-gamers',
    etsyQuery: 'ram%20keychain',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/885244/7443464993/il_600x600.7443464993_trrw.jpg',
    products: [
      { name: 'Upcycled Ram Keychain', image: 'https://i.etsystatic.com/46731516/r/il/885244/7443464993/il_600x600.7443464993_trrw.jpg', imageId: '885244/7443464993', query: 'Upcycled%20RAM%20Keychain', chips: ['Tech gift', 'Gamer gift'], desc: 'A keychain made from upcycled RAM — a niche gift that lands immediately with IT people.' },
    ],
    related: ['door-hangers', 'wooden-coasters', 'wooden-gifts'],
    relatedDesc: { 'door-hangers': 'Wooden door signs for bedrooms and gaming setups.', 'wooden-coasters': 'Handmade wooden coasters for desks and game rooms.', 'wooden-gifts': 'The broader handmade gifts category for thoughtful browsing.' },
  },
  {
    enSlug: 'incense-burners',
    etsyQuery: 'incense%20burner',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/54aa86/6303435020/il_600x600.6303435020_tsf2.jpg',
    products: [
      { name: 'Laser Birch Wood Incense Burner', image: 'https://i.etsystatic.com/46731516/r/il/54aa86/6303435020/il_600x600.6303435020_tsf2.jpg', imageId: '54aa86/6303435020', query: 'Laser%20Engraved%20Birch%20Wood%20Incense%20Burner', chips: ['Cozy home gift', 'Housewarming gift'], desc: 'A laser-engraved birch wood incense burner for shelves, reading nooks and quiet routines.' },
    ],
    related: ['wooden-gifts', 'housewarming-gifts', 'reader-gifts'],
    relatedDesc: { 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.', 'housewarming-gifts': 'Coaster sets and decor for new homes and warm interiors.', 'reader-gifts': 'Bookmarks, bundles and decor for book lovers and reading nooks.' },
  },
  {
    enSlug: 'personalized-items',
    etsyQuery: 'personalized',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/4f57fc/5611355601/il_600x600.5611355601_9mfy.jpg',
    products: [
      { name: 'Personalized Wooden Coasters', image: 'https://i.etsystatic.com/46731516/r/il/4f57fc/5611355601/il_600x600.5611355601_9mfy.jpg', imageId: '4f57fc/5611355601', query: 'Personalized%20Wood%20Coasters', chips: ['Personalised', 'Housewarming gift'], desc: 'A coaster set personalised with a name or date — a housewarming gift that feels made for them.' },
      { name: 'Personalised Team Wooden Coasters', image: 'https://i.etsystatic.com/46731516/r/il/c8b13b/7475569258/il_600x600.7475569258_hzso.jpg', imageId: 'c8b13b/7475569258', query: 'Personalised%20Team%20Coaster', chips: ['Personalised', 'Team gift'], desc: 'Custom coasters for a team, club or group — a memorable gift for shared spaces.' },
      { name: 'Personalized Calendar Coaster', image: 'https://i.etsystatic.com/46731516/r/il/bde01c/6310421867/il_600x600.6310421867_jtom.jpg', imageId: 'bde01c/6310421867', query: 'Personalized%20Calendar%20Coaster', chips: ['Personalised', 'Unique gift'], desc: 'A coaster printed with a meaningful date — perfect for anniversaries and milestones.' },
    ],
    related: ['wooden-gifts', 'wedding', 'wooden-bookmarks'],
    relatedDesc: { 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.', 'wedding': 'Wooden keepsakes and personalised pieces for wedding gifting.', 'wooden-bookmarks': 'Handmade wooden bookmarks including personalised styles.' },
  },
  {
    enSlug: 'pet-memorial',
    etsyQuery: 'pet%20memorial',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/1a761c/5962006217/il_600x600.5962006217_sgpc.jpg',
    products: [
      { name: 'Personalized Pet Memorial Plaque', image: 'https://i.etsystatic.com/46731516/r/il/1a761c/5962006217/il_600x600.5962006217_sgpc.jpg', imageId: '1a761c/5962006217', query: 'Personalized%20Pet%20Memorial%20Plaque', chips: ['Pet memorial', 'Personalised gift'], desc: 'A personalised wooden plaque to honour a beloved pet with care and warmth.' },
    ],
    related: ['personalized-items', 'candle-holders', 'wooden-gifts'],
    relatedDesc: { 'personalized-items': 'Pieces where a name, date or custom message matters most.', 'candle-holders': 'Tealight holders for shelves and quiet, personal spaces.', 'wooden-gifts': 'The broader handmade gifts category for thoughtful browsing.' },
  },
  {
    enSlug: 'readers-kit',
    etsyQuery: 'reader%20gift',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/b48938/7593439386/il_600x600.7593439386_5kt7.jpg',
    products: [
      { name: 'Fantasy Reader Gift Set', image: 'https://i.etsystatic.com/46731516/r/il/b48938/7593439386/il_600x600.7593439386_5kt7.jpg', imageId: 'b48938/7593439386', query: 'Book%20Lover%20Gift%20Set%20Fantasy%20Dragon%20Bookmark%20Wizard%20Door%20Hanger%20Wooden%20Coasters%20Reading%20Nook%20Decor%20BookTok%20Dark%20Academia%20for%20Fantasy%20Readers', chips: ['Reader gift', 'Fantasy gift'], desc: 'A ready-made bundle for fantasy readers: bookmark, coasters and door hanger in one gift.' },
    ],
    related: ['wooden-bookmarks', 'reader-gifts', 'candle-holders'],
    relatedDesc: { 'wooden-bookmarks': 'Individual handmade bookmarks for readers and fantasy shelves.', 'reader-gifts': 'Bookmarks, bundles and decor for book lovers and reading nooks.', 'candle-holders': 'Tealight holders for shelves and reading-nook atmosphere.' },
  },
  {
    enSlug: 'wedding',
    etsyQuery: 'wedding',
    ogImage: 'https://i.etsystatic.com/46731516/r/il/30b65e/7821492120/il_600x600.7821492120_9zkv.jpg',
    products: [
      { name: 'Just Married Wedding Money Holder', image: 'https://i.etsystatic.com/46731516/r/il/30b65e/7821492120/il_600x600.7821492120_9zkv.jpg', imageId: '30b65e/7821492120', query: 'Wedding%20Money%20Holder', chips: ['Wedding gift', 'Personalised'], desc: 'A wooden cash gift holder for newlyweds — elegant, personal, and easy to wrap.' },
    ],
    related: ['personalized-items', 'door-hangers', 'wooden-gifts'],
    relatedDesc: { 'personalized-items': 'Pieces where a name or date makes the gift feel made for them.', 'door-hangers': 'Wooden door hangers and signs that suit newly-weds and home corners.', 'wooden-gifts': 'The broader handmade gifts category for non-seasonal browsing.' },
  },
];

// ── HTML template ─────────────────────────────────────────────────────────────
function buildHreflang(enSlug) {
  const lines = [
    `  <link rel="alternate" hreflang="nl" href="https://craftygiftsplace.store/pages/${slugMap[enSlug].nl}.html" />`,
    `  <link rel="alternate" hreflang="en" href="https://craftygiftsplace.store/en/pages/${enSlug}.html" />`,
    `  <link rel="alternate" hreflang="de" href="https://craftygiftsplace.store/de/pages/${slugMap[enSlug].de}.html" />`,
    `  <link rel="alternate" hreflang="fr" href="https://craftygiftsplace.store/fr/pages/${slugMap[enSlug].fr}.html" />`,
    `  <link rel="alternate" hreflang="es" href="https://craftygiftsplace.store/es/pages/${slugMap[enSlug].es}.html" />`,
    `  <link rel="alternate" hreflang="pt" href="https://craftygiftsplace.store/pt/pages/${slugMap[enSlug].pt}.html" />`,
    `  <link rel="alternate" hreflang="it" href="https://craftygiftsplace.store/it/pages/${slugMap[enSlug].it}.html" />`,
    `  <link rel="alternate" hreflang="x-default" href="https://craftygiftsplace.store/en/pages/${enSlug}.html" />`,
  ];
  return lines.join('\n');
}

function buildLanguageSwitcher(enSlug, currentLang, assetPrefix) {
  const flags = [
    { code: 'nl', href: `https://craftygiftsplace.store/pages/${slugMap[enSlug].nl}.html` },
    { code: 'en', href: `https://craftygiftsplace.store/en/pages/${enSlug}.html` },
    { code: 'de', href: `https://craftygiftsplace.store/de/pages/${slugMap[enSlug].de}.html` },
    { code: 'fr', href: `https://craftygiftsplace.store/fr/pages/${slugMap[enSlug].fr}.html` },
    { code: 'es', href: `https://craftygiftsplace.store/es/pages/${slugMap[enSlug].es}.html` },
    { code: 'pt', href: `https://craftygiftsplace.store/pt/pages/${slugMap[enSlug].pt}.html` },
    { code: 'it', href: `https://craftygiftsplace.store/it/pages/${slugMap[enSlug].it}.html` },
  ];
  const labelMap = { nl:'Nederlands', en:'English', de:'Deutsch', fr:'Fran\u00e7ais', es:'Espa\u00f1ol', pt:'Portugu\u00eas', it:'Italiano' };
  return flags.map(f => {
    const cur = f.code === currentLang ? ' aria-current="true"' : '';
    return `        <a href="${f.href}" lang="${f.code}" aria-label="${labelMap[f.code]}" title="${labelMap[f.code]}"${cur}>\n          <span class="flag-icon flag-icon--${f.code}" aria-hidden="true"></span>\n          <span class="language-code">${f.code.toUpperCase()}</span>\n        </a>`;
  }).join('\n');
}

function buildFeaturedCards(products, lang, lc) {
  const cards = products.map((p, i) => {
    const chipsHtml = p.chips.map(c => `<span class="chip">${c}</span>`).join('');
    const desc = i === 0 ? p.desc : (i === products.length - 1 ? 'A closer look before heading to Etsy for prices, reviews and ordering.' : 'Another strong choice if you want something personal, practical or easy to gift.');
    return `    <article class="copy-card">
      <img class="listing-photo" src="${p.image}" alt="${p.name} by Craftygiftsplace" width="600" height="600" loading="lazy" decoding="async" />
      <div class="product-meta">${chipsHtml}</div>
      <h2>${p.name}</h2>
      <p>${desc}</p>
      <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace?search_query=${p.query}" target="_blank" rel="noopener" aria-label="${lc.viewOnEtsy} ${p.name}" title="${lc.viewOnEtsy} ${p.name}">${lc.viewOnEtsy}</a>
    </article>`;
  }).join('\n\n');

  const whyItems = lc.whyItems('').map(item => `<li>${item}</li>`).join('');
  const whyCard = `    <article class="copy-card">
      <h2>${lc.whyLoveIt}</h2>
      <ul>${whyItems}</ul>
      <p class="small-note">4.96/5 on Etsy across hundreds of reviews.</p>
      <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace#reviews" target="_blank" rel="noopener">${lc.readReviews}</a>
    </article>`;

  return cards + '\n\n' + whyCard;
}

function buildCatalogCards(products) {
  return products.map((p, i) => {
    const chipsHtml = p.chips.map(c => `<span class="chip">${c}</span>`).join('');
    const [id1, id2] = p.imageId.split('/');
    const imgBase = `https://i.etsystatic.com/46731516/r/il/${id1}/${id2}`;
    // derive suffix from image URL
    const suffix = p.image.split(id2 + '_')[1] || 'il_fullxfull.jpg';
    const imgSlug = `il_600x600.${id2}_${suffix}`;
    const srcset = `${imgBase}/il_340x270.${id2}_${suffix} 340w, ${imgBase}/il_600x600.${id2}_${suffix} 600w, ${imgBase}/il_794xN.${id2}_${suffix} 794w`;
    const fetch = i === 0 ? 'fetchpriority="high"' : 'fetchpriority="low"';
    const loading = i === 0 ? 'eager' : 'lazy';
    return `          <a class="product-card catalog-card-link" href="https://www.etsy.com/shop/Craftygiftsplace?search_query=${p.query}" target="_blank" rel="noopener" aria-label="View ${p.name} on Etsy" title="View ${p.name} on Etsy">
  <div class="card-media">
    <img src="${p.image}" srcset="${srcset}" sizes="(max-width: 720px) calc(100vw - 1.25rem), (max-width: 1024px) calc(50vw - 2rem), 360px" alt="${p.name} by Craftygiftsplace" width="600" height="600" loading="${loading}" decoding="async" ${fetch} referrerpolicy="no-referrer" />
  </div>
  <div class="card-body">
    <div class="product-meta">${chipsHtml}</div>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
  </div>
</a>`;
  }).join('\n');
}

function buildRelatedCards(related, relatedDesc, lang, lc) {
  return related.map(enSlug => {
    const name = displayNames[enSlug] ? displayNames[enSlug][lang] : enSlug;
    const targetSlug = slugMap[enSlug] ? slugMap[enSlug][lang] : enSlug;
    const href = lang === 'nl' ? `../${targetSlug}.html` : targetSlug + '.html';
    const desc = relatedDesc[enSlug] || '';
    return `            <article class="copy-card">
              <h2>${name}</h2>
              <p>${desc}</p>
              <a class="btn" href="${href}">${name}</a>
            </article>`;
  }).join('\n\n');
}

function buildPage(page, lang) {
  const lc   = langConfig[lang];
  const t    = pageTranslations[page.enSlug][lang];
  const slug = slugMap[page.enSlug][lang];
  const canon = lc.canonical(slug);
  const p1   = page.products[0];

  const navHtml = lc.navLinks.map(n => `        <a href="${n.href}">${n.label}</a>`).join('\n');
  const langSwitcher = buildLanguageSwitcher(page.enSlug, lang, lc.assetPrefix);
  const hreflang = buildHreflang(page.enSlug);
  const featured = buildFeaturedCards(page.products, lang, lc);
  const catalog  = buildCatalogCards(page.products);
  const relCards = buildRelatedCards(page.related, page.relatedDesc, lang, lc);
  const faqItems = lc.faqItems(t.name);
  const faqHtml  = faqItems.map(f => `<div class="faq-card">\n  <h3>${f.q}</h3>\n  <p>${f.a}</p>\n</div>`).join('\n\n');
  const faqJsonLd = faqItems.map(f => `    {\n      "@type": "Question",\n      "name": "${f.q.replace(/"/g, '\\"')}",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "${f.a.replace(/"/g, '\\"')}"\n      }\n    }`).join(',\n');
  const shopBtnLabel = lc.shopBtn(page.etsyQuery, t.name);
  const seeLabel = lc.seeLabel(t.name);
  const breadcrumbItem = lang === 'nl' ? `https://craftygiftsplace.store/pages/${slug}.html` : `https://craftygiftsplace.store/${lang}/pages/${slug}.html`;

  const etsyShopUrl = `https://www.etsy.com/shop/Craftygiftsplace?search_query=${page.etsyQuery}`;

  return `<!DOCTYPE html>
<html lang="${lc.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t.name} | Craftygiftsplace</title>
  <meta name="description" content="${t.lede}" />
  <meta name="author" content="Craftygiftsplace" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VF0CSSZHC2"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-VF0CSSZHC2");
  </script>

  <link rel="canonical" href="${canon}" />
${hreflang}
  <meta property="og:site_name" content="Craftygiftsplace" />
  <meta property="og:title" content="${t.name} | Craftygiftsplace" />
  <meta property="og:description" content="${t.lede}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="${lc.locale}" />
  <meta property="og:url" content="${canon}" />
  <meta property="og:image" content="${page.ogImage}" />
  <meta property="og:image:alt" content="${p1.name} by Craftygiftsplace" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t.name} | Craftygiftsplace" />
  <meta name="twitter:description" content="${t.lede}" />
  <meta name="twitter:image" content="${page.ogImage}" />
  <meta name="theme-color" content="#f5efe7" />
  <link rel="icon" type="image/x-icon" href="${lc.assetPrefix}favicon.ico" />
  <link rel="icon" type="image/png" href="${lc.assetPrefix}assets/img/logos/craftygiftsplace-logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="preconnect" href="https://i.etsystatic.com" crossorigin />
  <link rel="dns-prefetch" href="//i.etsystatic.com" />
  <link rel="preconnect" href="https://www.etsy.com" crossorigin />
  <link rel="stylesheet" href="${lc.assetPrefix}assets/css/style.min.css" />
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://craftygiftsplace.store/#organization",
      "name": "Craftygiftsplace",
      "url": "https://craftygiftsplace.store/",
      "logo": "https://craftygiftsplace.store/assets/img/logos/craftygiftsplace-logo.png",
      "sameAs": [
        "https://www.etsy.com/shop/Craftygiftsplace"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "${lc.websiteId}",
      "url": "${lc.websiteUrl}",
      "name": "Craftygiftsplace",
      "inLanguage": "${lc.lang}"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "${lc.homeLabel}",
      "item": "${lc.websiteUrl}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "${t.name}",
      "item": "${breadcrumbItem}"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${faqJsonLd}
  ]
}
</script>
</head>

<body class="page-subpage has-sticky-cta">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="topbar">
    <div class="container nav">
      <a href="${lc.homeHref}" class="brand" aria-label="Go to the homepage">
        <img class="brand-logo" src="${lc.assetPrefix}assets/img/logos/craftygiftsplace-logo.png" alt="Craftygiftsplace logo" width="64" height="64" />
        <span class="brand-copy">
          <strong>Craftygiftsplace</strong>
          <span>Handmade wooden gifts with character</span>
        </span>
      </a>

      <nav class="nav-links" id="site-nav" aria-label="Main menu">
${navHtml}
        <a class="btn" href="${etsyShopUrl}" target="_blank" rel="noopener">${shopBtnLabel}</a>
      </nav>

      <div class="language-switch language-switch-header" role="group" aria-label="Choose language">
  <span class="language-switch-label">Choose language</span>
${langSwitcher}
</div>


      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${lc.menuOpen}">
        <span>Menu</span>
        <span class="nav-toggle-lines" aria-hidden="true">
          <span class="nav-toggle-line"></span>
          <span class="nav-toggle-line"></span>
          <span class="nav-toggle-line"></span>
        </span>
      </button>
    </div>
  </header>


    <main class="page-main" id="main-content">

    <section class="section page-hero">
      <div class="container page-shell page-hero-shell">
        <div class="page-grid page-hero-grid">
          <div class="page-intro page-hero-copy">
            <div class="breadcrumbs"><a href="${lc.homeHref}">${lc.homeLabel}</a> / ${t.name}</div>
            <div class="eyebrow">${lc.eyebrow}</div>
            <h1>${t.name}</h1>
            <p class="page-lede">${t.lede}</p>
            <div class="page-actions">
              <a class="btn" href="${etsyShopUrl}" target="_blank" rel="noopener">${shopBtnLabel}</a>
            </div>
            <div class="page-hero-meta">
              <p class="page-note">${lc.note}</p>
              <a class="inline-link page-secondary-link" href="#shop-catalog">${seeLabel}</a>
            </div>
            <div class="link-cloud">${page.related.map(r => `<a href="${lang === 'nl' ? '../' + slugMap[r][lang] + '.html' : slugMap[r][lang] + '.html'}">${displayNames[r][lang]}</a>`).join('')}</div>
          </div>

    <aside class="page-sidebar">
      <h2>${lc.moreIdeas}</h2>
      <p>${lc.reviewQuote}</p>
      <p class="small-note">${lc.reviewMeta}</p>
      <p>${lc.browseNote(t.name)}</p>
      <div class="quick-links">
        ${page.related.map(r => `<a href="${lang === 'nl' ? '../' + slugMap[r][lang] + '.html' : slugMap[r][lang] + '.html'}">${displayNames[r][lang]} <span>></span></a>`).join('')}
      </div>
    </aside>
        </div>
      </div>
    </section>

    <section class="section" id="featured-products">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${lc.popularPicks}</h2>
            <p>${lc.popularPicksSub}</p>
          </div>
          <a class="btn-secondary" href="#shop-catalog">${seeLabel}</a>
        </div>
        <div class="copy-stack featured-copy-grid">

${featured}
        </div>
      </div>
    </section>

    <section class="section" id="shop-catalog">
      <div class="container">
        <div class="catalog-header">
          <div>
            <h2>${lc.moreFromRange}</h2>
            <p>${lc.moreFromRangeSub(t.name)}</p>
          </div>
          <a class="btn" href="${etsyShopUrl}" target="_blank" rel="noopener">${shopBtnLabel}</a>
        </div>
        <div class="product-grid catalog-grid">
          ${catalog}
        </div>
        <div class="catalog-section-cta"><a class="btn" href="${etsyShopUrl}" target="_blank" rel="noopener">${shopBtnLabel} \u2192</a></div>
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${lc.faqHeading}</h2>
            <p>${lc.faqSub}</p>
          </div>
        </div>
        <div class="faq-grid">
${faqHtml}
</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${lc.moreGiftIdeas}</h2>
            <p>${lc.moreGiftIdeasSub}</p>
          </div>
        </div>
        <div class="copy-stack">

${relCards}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-panel">
          <div>
            <h2>${lc.ctaHeading(t.name)}</h2>
            <p>${lc.ctaSub}</p>
          </div>
          <a class="btn" href="${etsyShopUrl}" target="_blank" rel="noopener">${shopBtnLabel}</a>
        </div>
      </div>
    </section>
    </main>
    <div class="sticky-mobile-cta">
      <a class="btn" href="${etsyShopUrl}" target="_blank" rel="noopener">${shopBtnLabel}</a>
    </div>
  <footer>
    <div class="container footer-inner footer-inner--expanded">
      <div class="footer-brand">
        <img class="footer-logo" src="${lc.assetPrefix}assets/img/logos/craftygiftsplace-logo.png" alt="Craftygiftsplace logo" width="72" height="72" />
        <div>
          <strong>Craftygiftsplace</strong><br />
          <span class="small-note">${lc.footerBrandTagline}</span>
        </div>
      </div>
      <div class="footer-nav">
        <div class="footer-column">
          <strong>${lc.footerCollections}</strong>
          <div class="footer-links">
            <a href="${lang === 'nl' ? '../' + slugMap['wooden-coasters'][lang] + '.html' : slugMap['wooden-coasters'][lang] + '.html'}">${lc.footerCoasters}</a><a href="${lang === 'nl' ? '../' + slugMap['wooden-bookmarks'][lang] + '.html' : slugMap['wooden-bookmarks'][lang] + '.html'}">${lc.footerBookmarks}</a><a href="${lang === 'nl' ? '../' + slugMap['wooden-gifts'][lang] + '.html' : slugMap['wooden-gifts'][lang] + '.html'}">${lc.footerWooden}</a>
          </div>
        </div>
        <div class="footer-column">
          <strong>${lc.footerGiftIdeas}</strong>
          <div class="footer-links">
            <a href="${lang === 'nl' ? '../' + slugMap['cat-lover-gifts'][lang] + '.html' : slugMap['cat-lover-gifts'][lang] + '.html'}">${lc.footerCat}</a><a href="${lang === 'nl' ? '../' + slugMap['reader-gifts'][lang] + '.html' : slugMap['reader-gifts'][lang] + '.html'}">${lc.footerReader}</a><a href="${lang === 'nl' ? '../' + slugMap['housewarming-gifts'][lang] + '.html' : slugMap['housewarming-gifts'][lang] + '.html'}">${lc.footerHousewarming}</a>
          </div>
        </div>
      </div>
      <div class="footer-etsy-cta">
        <a class="btn" href="https://www.etsy.com/shop/Craftygiftsplace" target="_blank" rel="noopener">${lc.footerEtsy}</a>
      </div>
      <div class="small-note">${lc.footerRating}</div>
    </div>
  </footer>
  <script src="${lc.assetPrefix}assets/js/main.js"></script>
</body>
</html>`;
}

// ── Generate files ────────────────────────────────────────────────────────────
const langs = ['de', 'fr', 'es', 'pt', 'it', 'nl'];
let created = 0;

for (const page of pages) {
  for (const lang of langs) {
    const lc   = langConfig[lang];
    const slug = slugMap[page.enSlug][lang];
    const dir  = path.join(ROOT, lc.dir);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, slug + '.html');
    if (fs.existsSync(filePath)) {
      console.log(`SKIP (exists): ${lc.dir}/${slug}.html`);
      continue;
    }

    const html = buildPage(page, lang);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`CREATED: ${lc.dir}/${slug}.html`);
    created++;
  }
}

console.log(`\nDone. ${created} files created.`);
