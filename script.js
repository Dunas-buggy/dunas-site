/* Dunas — JavaScript puro, sem bibliotecas e sem requisições de imagens externas.
   Para adicionar mídias no futuro, substitua os placeholders após receber os arquivos autorizados. */
(() => {
  'use strict';

  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  const translations = {
    pt: {
      navHome:'Início', navAbout:'Sobre nós',navTours:'Passeios',navContact:'Contatos',downloadApp:'Baixar o app',
      heroKicker:'EXPLORE O RIO GRANDE DO NORTE',heroTitle:'O litoral que você sonha.',heroTitleAccent:'Do seu jeito.',heroBody:'Conectamos você aos melhores bugueiros para viver paisagens inesquecíveis com liberdade, segurança e a praticidade de um app.',
      appleIntro:'Baixe na',googleIntro:'Disponível no',trustDrivers:'Bugueiros parceiros',trustMoments:'Experiências únicas',heroPlaceholder:'Sua imagem principal entrará aqui',nextDestination:'Seu próximo destino',discover:'Descubra a Dunas',
      aboutKicker:'SOBRE NÓS',aboutTitle:'A ponte entre você e a',aboutAccent:'melhor experiência.',aboutPlaceholder:'Espaço para sua mídia',aboutLeadBefore:'A ',aboutLeadAfter:' nasceu para tornar simples o encontro entre quem quer explorar e quem conhece cada caminho.',aboutBody:'Nossa missão é conectar turistas e bugueiros locais por meio da tecnologia, valorizando profissionais da região e criando passeios autênticos pelo litoral potiguar.',
      value1Title:'Conexão local',value1Text:'Profissionais que conhecem cada curva, duna e história do RN.',value2Title:'Liberdade',value2Text:'Roteiros com paradas personalizáveis, respeitando o seu ritmo.',value3Title:'Segurança',value3Text:'Experiências planejadas conforme as condições e disponibilidade.',
      tourKicker:'PASSEIOS',tourTitle:'Dois estados. Quatro roteiros.',tourAccent:'Infinitas memórias.',tourIntro:'Explore roteiros inesquecíveis pelos litorais do Rio Grande do Norte e da Paraíba.',filterAll:'Todos',tourNoteTitle:'Experiências conduzidas por bugueiros parceiros.',tourNoteBody:'Paradas e trajetos podem variar conforme as condições locais, a segurança e a modalidade escolhida.',
      ctaKicker:'SUA AVENTURA COMEÇA AQUI',ctaTitle:'O litoral potiguar',ctaAccent:'na palma da sua mão.',ctaBody:'Conheça a Dunas, escolha seu roteiro e conecte-se a bugueiros locais para uma experiência inesquecível.',comingSoon:'Aplicativo em preparação. Links de download serão disponibilizados no lançamento.',appPlaceholder:'Prévia do aplicativo',
      contactKicker:'CONTATOS',contactTitle:'Vamos conversar?',contactBody:'Tem dúvidas sobre a Dunas ou precisa de ajuda? Nosso time está pronto para atender você.',contactPending:'Canal em preparação',soon:'EM BREVE',footerTagline:'Descubra o litoral do Rio Grande do Norte de um jeito novo.',footerSocial:'Redes sociais em breve',rights:'Todos os direitos reservados.',footerLegal:'Política de privacidade e termos de uso serão disponibilizados antes do lançamento.',
      departure:'Saída de',duration:'DURAÇÃO',distance:'DISTÂNCIA',mainStops:'Principais paradas',optional:'Opcionais',details:'DETALHES DOS PASSEIOS',experience:'Quero viver esse roteiro',galleryHint:'Ver fotos e vídeos',photoPlaceholder:'Sua foto será adicionada aqui',galleryTitle:'Galeria de',detailsTitle:'Detalhes do passeio —',photo:'FOTO',video:'VÍDEO',galleryPlaceholder:'Espaço preparado para receber a mídia que você enviar',
      included:'O que está incluso',excluded:'O que não está incluso',important:'Informações importantes',
      includedItems:['Passeio em buggy compartilhado para até 4 passageiros.','Bugueiro credenciado para conduzir o roteiro.'],
      excludedItems:[['Travessia de balsa:','R$ 60,00, divididos entre os passageiros.'],['Acesso às dunas:','R$ 60,00, divididos entre os passageiros.'],['Almoço:','estimativa de R$ 120 a R$ 180 para duas pessoas.']],
      importantItems:[['Capacidade:','até 4 passageiros ou 320 kg, respeitando o conforto e a segurança de todos.'],['Modalidade compartilhada:','disponível apenas para grupos com número par de participantes, com manobras radicais nas dunas.'],['Modalidade privativa:','recomendada para quem busca maior conforto ou um passeio mais tranquilo.'],['Restrições:','passeio não recomendado para pessoas com problemas de coluna ou hérnia de disco.'],['Roteiro e horários:','podem sofrer alterações conforme as condições do dia e a orientação do bugueiro.'],['Embarque:','Ponta Negra, Via Costeira ou Praia do Meio. Para outras localidades, será indicado o ponto de encontro mais próximo.'],['Assentos:','na modalidade compartilhada, não é possível garantir lugares específicos ou passageiros sentados juntos.']],
      detailDisclaimer:'Observação: as condições acima foram importadas do protótipo e precisam ser confirmadas para cada roteiro antes da publicação.',
      launchToast:'O aplicativo Dunas ainda está em preparação. As lojas serão disponibilizadas no lançamento.',menuOpen:'Abrir menu',menuClose:'Fechar menu',modalClose:'Fechar janela',previous:'Passeios anteriores',next:'Próximos passeios',filterLabel:'Filtrar passeios',galleryButton:'Abrir galeria de fotos e vídeos do passeio',
      routeNotice:'Quer reservar? A integração com o aplicativo será adicionada no lançamento.'
    },
    en: {
      navHome:'Home',navAbout:'About us',navTours:'Tours',navContact:'Contact',downloadApp:'Download app',
      heroKicker:'EXPLORE RIO GRANDE DO NORTE',heroTitle:"The coast you've dreamed of.",heroTitleAccent:'Your way.',heroBody:'We connect you with the best local buggy drivers for unforgettable landscapes, freedom, safety, and the convenience of an app.',
      appleIntro:'Download on the',googleIntro:'Get it on',trustDrivers:'Partner drivers',trustMoments:'Unique experiences',heroPlaceholder:'Your hero image will go here',nextDestination:'Your next destination',discover:'Discover Dunas',
      aboutKicker:'ABOUT US',aboutTitle:'The bridge between you and the',aboutAccent:'best experience.',aboutPlaceholder:'Space for your media',aboutLeadBefore:'',aboutLeadAfter:' was created to make it easy for explorers to meet those who know every path.',aboutBody:'Our mission is to connect travelers and local buggy drivers through technology, supporting regional professionals and creating authentic tours along the coast.',
      value1Title:'Local connection',value1Text:'Professionals who know every turn, dune, and story in the state.',value2Title:'Freedom',value2Text:'Routes with customizable stops that respect your pace.',value3Title:'Safety',value3Text:'Experiences planned according to conditions and availability.',
      tourKicker:'TOURS',tourTitle:'Two states. Four routes.',tourAccent:'Endless memories.',tourIntro:'Explore unforgettable routes along the coasts of Rio Grande do Norte and Paraíba.',filterAll:'All',tourNoteTitle:'Experiences led by local partner drivers.',tourNoteBody:'Stops and routes can vary according to local conditions, safety and the chosen tour format.',
      ctaKicker:'YOUR ADVENTURE STARTS HERE',ctaTitle:'The coast of Rio Grande do Norte',ctaAccent:'in the palm of your hand.',ctaBody:'Discover Dunas, choose your route, and connect with local buggy drivers for an unforgettable experience.',comingSoon:'The app is in preparation. Download links will be available at launch.',appPlaceholder:'App preview',
      contactKicker:'CONTACT',contactTitle:"Let's talk?",contactBody:'Have questions about Dunas or need help? Our team is ready to assist you.',contactPending:'Channel in preparation',soon:'COMING SOON',footerTagline:'Discover the coast of Rio Grande do Norte in a whole new way.',footerSocial:'Social channels coming soon',rights:'All rights reserved.',footerLegal:'Privacy policy and terms of use will be published before launch.',
      departure:'Departure from',duration:'DURATION',distance:'DISTANCE',mainStops:'Main stops',optional:'Optional',details:'TOUR DETAILS',experience:'I want this experience',galleryHint:'View photos and videos',photoPlaceholder:'Your photo will go here',galleryTitle:'Gallery of',detailsTitle:'Tour details —',photo:'PHOTO',video:'VIDEO',galleryPlaceholder:'Space ready for the media you provide',
      included:"What's included",excluded:"What's not included",important:'Important information',includedItems:['Shared buggy tour for up to 4 passengers.','Licensed buggy driver to conduct the route.'],excludedItems:[['Ferry crossing:','R$ 60.00, divided among passengers.'],['Dune access:','R$ 60.00, divided among passengers.'],['Lunch:','estimated R$ 120 to R$ 180 for two people.']],importantItems:[['Capacity:','up to 4 passengers or 320 kg, respecting everyone’s comfort and safety.'],['Shared option:','available only for groups with an even number of participants, including thrilling dune maneuvers.'],['Private option:','recommended for those seeking greater comfort or a more relaxed tour.'],['Restrictions:','not recommended for people with back problems or herniated discs.'],['Route and schedule:','may change according to daily conditions and the driver’s guidance.'],['Pick-up:','Ponta Negra, Via Costeira or Praia do Meio. For other locations, the nearest meeting point will be provided.'],['Seats:','specific seats or passengers sitting together cannot be guaranteed on shared tours.']],
      detailDisclaimer:'Note: these conditions were imported from the prototype and must be confirmed for each route before publication.',launchToast:'The Dunas app is still in preparation. Store links will be available at launch.',menuOpen:'Open menu',menuClose:'Close menu',modalClose:'Close window',previous:'Previous tours',next:'Next tours',filterLabel:'Filter tours',galleryButton:'Open photo and video gallery for',routeNotice:'Want to book? App integration will be added at launch.'
    }
  };

  // The itinerary information below was transcribed from the Figma Make project.
  const tours = [
    {id:'genipabu',region:'rn',number:'01',title:'Genipabu',eyebrow:{pt:'LITORAL NORTE',en:'NORTH COAST'},duration:{pt:'6–7 horas',en:'6–7 hours'},distance:{pt:'Cerca de 90 km',en:'About 90 km'},departure:'Ponta Negra, Natal/RN',stops:{pt:'Ponte Newton Navarro, Redinha, Santa Rita, Genipabu, dunas móveis e fixas, Lagoa de Genipabu, Barra do Rio, Graçandu, Pitangui, Dunas Douradas, Lagoa de Pitangui, Jacumã e Lagoa de Jacumã.',en:'Newton Navarro Bridge, Redinha, Santa Rita, Genipabu, shifting and fixed dunes, Genipabu Lagoon, Barra do Rio, Graçandu, Pitangui, Golden Dunes, Pitangui Lagoon, Jacumã and Jacumã Lagoon.'},optional:{pt:'Porto Mirim e Muriú',en:'Porto Mirim and Muriú'},cover:{src:'assets/genipabu-cover.webp',alt:{pt:'Vista panorâmica das dunas de Genipabu com lagoa e vegetação.',en:'Panoramic view of Genipabu dunes with lagoon and vegetation.'}},media:[{type:'image',pt:'Foto 1 — Vista do litoral de Genipabu',en:'Photo 1 — View of the Genipabu coastline',src:'assets/genipabu-photo-1.webp',alt:{pt:'Vista do litoral de Genipabu com dunas e coqueiros.',en:'View of the Genipabu coastline with dunes and palm trees.'}},{type:'video',pt:'Vídeo — Passeio em Genipabu',en:'Video — Tour in Genipabu',src:'assets/genipabu-tour.mp4',poster:'assets/genipabu-photo-1.webp'},{type:'image',pt:'Foto 2 — Praia e dunas de Genipabu',en:'Photo 2 — Beach and dunes of Genipabu',src:'assets/genipabu-photo-2.webp',alt:{pt:'Praia de Genipabu com dunas, coqueiros e quiosque à beira-mar.',en:'Genipabu beach with dunes, palm trees and a seaside kiosk.'}}]},
    {id:'pipa',region:'rn',number:'02',title:'Pipa',eyebrow:{pt:'LITORAL SUL',en:'SOUTH COAST'},duration:{pt:'7–8 horas',en:'7–8 hours'},distance:{pt:'Cerca de 110 km',en:'About 110 km'},departure:'Ponta Negra, Natal/RN',stops:{pt:'Barreira do Inferno, Cotovelo, Pirangi, Maior Cajueiro do Mundo, Búzios, Tabatinga, Mirante dos Golfinhos, Camurupim, Pedra Oca, Lagoa de Arituba, Barreta, Malembá, Tibau do Sul, Cacimbinhas, Ponta do Madeiro, Pipa e Chapadão.',en:"Barreira do Inferno, Cotovelo, Pirangi, the World's Largest Cashew Tree, Búzios, Tabatinga, Dolphin Lookout, Camurupim, Pedra Oca, Arituba Lagoon, Barreta, Malembá, Tibau do Sul, Cacimbinhas, Madeiro Beach, Pipa and Chapadão."},optional:null,cover:{src:'assets/pipa-cover.webp',alt:{pt:'Vista costeira de Pipa com falésia, mar e coqueiros.',en:'Coastal view of Pipa with cliffs, sea and palm trees.'}},media:[{type:'image',pt:'Foto 1 — Falésias de Pipa',en:'Photo 1 — Pipa cliffs',src:'assets/pipa-photo-1.webp',alt:{pt:'Praia de Pipa com longa faixa de areia e falésias coloridas.',en:'Pipa beach with a long stretch of sand and colorful cliffs.'}},{type:'video',pt:'Vídeo — Passeio em Pipa',en:'Video — Tour in Pipa',src:'assets/pipa-tour.mp4',poster:'assets/pipa-photo-1.webp'},{type:'image',pt:'Foto 2 — Orla de Pipa',en:'Photo 2 — Pipa shoreline',src:'assets/pipa-photo-2.webp',alt:{pt:'Vista ampla da orla de Pipa com praia, falésias e mar azul-esverdeado.',en:'Wide view of Pipa shoreline with beach, cliffs and blue-green sea.'}}]},
    {id:'costa-conde',region:'pb',number:'03',title:'Costa do Conde',eyebrow:{pt:'JOÃO PESSOA · LITORAL SUL',en:'JOÃO PESSOA · SOUTH COAST'},duration:{pt:'Aproximadamente 7 horas',en:'Approximately 7 hours'},distance:{pt:'Cerca de 100 km',en:'About 100 km'},departure:'João Pessoa/PB',stops:{pt:'Barra de Gramame, praias de Carapibus e Tabatinga, Praia de Coqueirinho, Cânion do Castelo da Princesa, Mirante Dedo de Deus e Praia de Tambaba, com áreas distintas para o público geral e para o naturismo.',en:'Barra de Gramame, Carapibus and Tabatinga beaches, Coqueirinho Beach, Princess Castle Canyon, Finger of God Lookout, and Tambaba Beach, with separate areas for the general public and naturism.'},optional:null,cover:{src:'assets/costa-conde-cover.webp',alt:{pt:'Orla com coqueiros e embarcações em Barra do Cunhaú (RN), imagem de capa selecionada para o roteiro Costa do Conde.',en:'Palm-lined waterfront and boats in Barra do Cunhaú (RN), selected as the Costa do Conde tour cover.'}},media:[{type:'image',pt:'Foto 1 — Praia de Tabatinga',en:'Photo 1 — Tabatinga Beach',src:'assets/costa-conde-photo-1.webp',alt:{pt:'Praia de Tabatinga na Paraíba, com falésias e mar calmo.',en:'Tabatinga Beach in Paraíba, with cliffs and calm sea.'}},{type:'video',pt:'Vídeo — Costa do Conde',en:'Video — Costa do Conde',src:'assets/costa-conde-tour.mp4',poster:'assets/costa-conde-photo-1.webp'},{type:'image',pt:'Foto 2 — Praia de Tambaba',en:'Photo 2 — Tambaba Beach',src:'assets/costa-conde-photo-2.webp',alt:{pt:'Vista da Praia de Tambaba na Paraíba com falésias e mar azul.',en:'View of Tambaba Beach in Paraíba with cliffs and blue sea.'}}]},
    {id:'cabedelo-lucena',region:'pb',number:'04',title:'Cabedelo & Lucena',eyebrow:{pt:'JOÃO PESSOA · LITORAL NORTE',en:'JOÃO PESSOA · NORTH COAST'},duration:{pt:'Aproximadamente 6 horas',en:'Approximately 6 hours'},distance:{pt:'Cerca de 100 km',en:'About 100 km'},departure:'João Pessoa/PB',stops:{pt:'Cabedelo e travessia de balsa, Praia de Lucena, Igreja de Nossa Senhora da Guia e Ruínas de Bonsucesso.',en:'Cabedelo and ferry crossing, Lucena Beach, Nossa Senhora da Guia Church, and the Bonsucesso Ruins.'},optional:null,cover:{src:'assets/cabedelo-cover.webp',alt:{pt:'Vista litorânea do passeio Cabedelo & Lucena com falésias e mar azul.',en:'Coastal view of the Cabedelo & Lucena tour with cliffs and blue sea.'}},media:[{type:'image',pt:'Foto 1 — Praia de Lucena',en:'Photo 1 — Lucena Beach',src:'assets/cabedelo-photo-1.webp',alt:{pt:'Praia com coqueiros e mar azul no roteiro de Cabedelo e Lucena.',en:'Beach with palm trees and blue sea on the Cabedelo and Lucena route.'}},{type:'video',pt:'Vídeo — Passeio em Cabedelo & Lucena',en:'Video — Tour in Cabedelo & Lucena',src:'assets/cabedelo-tour.mp4',poster:'assets/cabedelo-photo-1.webp'},{type:'image',pt:'Foto 2 — Orla rochosa',en:'Photo 2 — Rocky shoreline',src:'assets/cabedelo-photo-2.webp',alt:{pt:'Orla rochosa com praia e vista urbana ao fundo.',en:'Rocky shoreline with beach and urban view in the background.'}}]}
  ];

  const state = {lang:'pt',modal:null,lastFocus:null,carouselPaused:false};
  const t = (key) => translations[state.lang][key];
  const carousel = $('#tour-list');
  const backdrop = $('#modal-backdrop');
  const modalWindow = $('#modal-window');
  const mobileMenu = $('#menu-toggle');
  const menu = $('#main-nav');

  function renderTours() {
    const lang = state.lang;
    carousel.innerHTML = tours.map((tour) => {
      const coverMarkup = tour.cover ? `<img class="tour-photo-media" src="${escapeHTML(tour.cover.src)}" alt="${escapeHTML((tour.cover.alt && tour.cover.alt[lang]) || tour.title)}" loading="lazy" decoding="async">` : '';
      const photoLabel = tour.cover
        ? `<span class="photo-label photo-label-cover"><span class="placeholder-number">${escapeHTML(tour.eyebrow[lang])}</span><small>${escapeHTML(tour.title)}</small></span>`
        : `<span class="photo-label"><span class="placeholder-number">${escapeHTML(tour.eyebrow[lang])}</span><span>${escapeHTML(t('photoPlaceholder'))}</span><small>${escapeHTML(tour.title)}</small></span>`;
      return `
      <article class="tour-card" data-tour="${tour.id}">
        <button class="tour-photo ${tour.cover ? 'has-cover' : ''}" type="button" data-action="gallery" data-tour="${tour.id}" aria-label="${escapeHTML(t('galleryButton'))} ${escapeHTML(tour.title)}">
          ${coverMarkup}
          ${photoLabel}<b>${tour.number}</b>
          <span class="gallery-hint">${icon('camera')} ${escapeHTML(t('galleryHint'))}</span>
        </button>
        <div class="tour-details"><p class="tour-eyebrow">${escapeHTML(tour.eyebrow[lang])}</p><h3>${escapeHTML(tour.title)}</h3>
          <p class="departure">${icon('pin')} ${escapeHTML(t('departure'))} ${escapeHTML(tour.departure)}</p>
          <div class="tour-meta"><span>${icon('clock')}<small>${escapeHTML(t('duration'))}</small><strong>${escapeHTML(tour.duration[lang])}</strong></span><span>${icon('route')}<small>${escapeHTML(t('distance'))}</small><strong>${escapeHTML(tour.distance[lang])}</strong></span></div>
          <div class="stops"><strong>${escapeHTML(t('mainStops'))}</strong><p>${escapeHTML(tour.stops[lang])}</p>${tour.optional ? `<p><b>${escapeHTML(t('optional'))}:</b> ${escapeHTML(tour.optional[lang])}.</p>` : ''}</div>
          <button class="details-button" type="button" data-action="details" data-tour="${tour.id}">${escapeHTML(t('details'))} ${icon('arrow')}</button>
          <a class="text-link" href="#download">${escapeHTML(t('experience'))} ${icon('arrow')}</a>
        </div>
      </article>`;
    }).join('');
    carousel.scrollLeft = 0;
  }

  function renderModal() {
    if (!state.modal) return;
    const tour = tours.find((item) => item.id === state.modal.id);
    if (!tour) return;
    const lang = state.lang;
    $('#modal-eyebrow').textContent = tour.eyebrow[lang];
    $('#modal-title').textContent = state.modal.type === 'gallery' ? `${t('galleryTitle')} ${tour.title}` : `${t('detailsTitle')} ${tour.title}`;
    if (state.modal.type === 'gallery') {
      $('#modal-body').innerHTML = `<div class="gallery-grid">${tour.media.map((media, index) => {
        const hasMedia = Boolean(media.src);
        const mediaMarkup = !hasMedia ? '' : media.type === 'video'
          ? `<video class="gallery-item-media" autoplay muted loop playsinline preload="metadata" ${media.poster ? `poster="${escapeHTML(media.poster)}"` : ''} aria-label="${escapeHTML(media[lang])}" disablepictureinpicture><source src="${escapeHTML(media.src)}" type="video/mp4"></video>`
          : `<img class="gallery-item-media" src="${escapeHTML(media.src)}" alt="${escapeHTML((media.alt && media.alt[lang]) || media[lang])}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">`;
        return `<div class="gallery-item gallery-item-${media.type} ${hasMedia ? 'has-media' : ''}">${mediaMarkup}<span class="gallery-type">${escapeHTML(media.type === 'video' ? t('video') : t('photo'))} ${String(index+1).padStart(2,'0')}</span><span class="gallery-placeholder"><strong>${escapeHTML(media[lang])}</strong>${hasMedia ? '' : `<small>${escapeHTML(t('galleryPlaceholder'))}</small>`}</span></div>`;
      }).join('')}</div>`;
    } else {
      const ul = (entries) => `<ul>${entries.map((entry) => `<li>${Array.isArray(entry) ? `<strong>${escapeHTML(entry[0])}</strong> ${escapeHTML(entry[1])}` : escapeHTML(entry)}</li>`).join('')}</ul>`;
      $('#modal-body').innerHTML = `<div class="details-sections"><article><h3>${escapeHTML(t('included'))}</h3>${ul(t('includedItems'))}</article><article><h3>${escapeHTML(t('excluded'))}</h3>${ul(t('excludedItems'))}</article><article><h3>${escapeHTML(t('important'))}</h3>${ul(t('importantItems'))}</article><p class="detail-disclaimer">${escapeHTML(t('detailDisclaimer'))}</p></div>`;
    }
  }

  function openModal(type, id) {
    if (!tours.some((tour) => tour.id === id)) return;
    state.lastFocus = document.activeElement;
    state.modal = {type,id};
    backdrop.hidden = false;
    document.body.classList.add('gallery-open');
    renderModal();
    $('#modal-close').setAttribute('aria-label', t('modalClose'));
    $('#modal-close').focus();
  }
  function closeModal() {
    if (!state.modal) return;
    state.modal = null;
    backdrop.hidden = true;
    document.body.classList.remove('gallery-open');
    $('#modal-body').innerHTML = '';
    if (state.lastFocus && state.lastFocus.isConnected) state.lastFocus.focus();
    state.lastFocus = null;
  }
  function toggleMenu(open = !menu.classList.contains('is-open')) {
    menu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-label', open ? t('menuClose') : t('menuOpen'));
    mobileMenu.innerHTML = icon(open ? 'close' : 'menu');
  }
  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    document.title = lang === 'pt' ? 'Dunas — Explore o litoral do seu jeito' : 'Dunas — Explore the coast your way';
    $$('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (typeof translations[lang][key] === 'string') element.textContent = translations[lang][key];
    });
    const languageToggle = $('#language-toggle');
    languageToggle.textContent = lang === 'pt' ? 'EN-US' : 'PT-BR';
    languageToggle.setAttribute('aria-label', lang === 'pt' ? 'Switch language to English' : 'Mudar idioma para português');
    $('#carousel-prev').setAttribute('aria-label', t('previous'));
    $('#carousel-next').setAttribute('aria-label', t('next'));
    renderTours();
    renderModal();
    toggleMenu(false);
  }
  function moveCarousel(direction) {
    const reachedStart = carousel.scrollLeft <= 12;
    const reachedEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 12;
    const destination = direction === 1 && reachedEnd ? 0 : direction === -1 && reachedStart ? carousel.scrollWidth - carousel.clientWidth : carousel.scrollLeft + carousel.clientWidth * direction;
    carousel.scrollTo({left:destination,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  let toastTimeout;
  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {toast.hidden = true;}, 4600);
  }
  carousel.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action][data-tour]');
    if (trigger) openModal(trigger.dataset.action, trigger.dataset.tour);
  });
  carousel.addEventListener('pointerenter', () => {state.carouselPaused = true;});
  carousel.addEventListener('pointerleave', () => {state.carouselPaused = false;});
  carousel.addEventListener('focusin', () => {state.carouselPaused = true;});
  carousel.addEventListener('focusout', (event) => {if (!carousel.contains(event.relatedTarget)) state.carouselPaused = false;});
  carousel.addEventListener('touchstart', () => {state.carouselPaused = true;}, {passive:true});
  carousel.addEventListener('touchend', () => {state.carouselPaused = false;}, {passive:true});
  $('#carousel-prev').addEventListener('click', () => moveCarousel(-1));
  $('#carousel-next').addEventListener('click', () => moveCarousel(1));
  $('#language-toggle').addEventListener('click', () => setLanguage(state.lang === 'pt' ? 'en' : 'pt'));
  mobileMenu.addEventListener('click', () => toggleMenu());
  menu.addEventListener('click', (event) => {if (event.target.closest('a')) toggleMenu(false);});
  document.addEventListener('click', (event) => {if (!event.target.closest('.site-header')) toggleMenu(false);});
  $$('[data-store]').forEach((button) => button.addEventListener('click', () => showToast(t('launchToast'))));
  $('#modal-close').addEventListener('click', closeModal);
  backdrop.addEventListener('click', (event) => {if (event.target === backdrop) closeModal();});
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {closeModal();toggleMenu(false);return;}
    if (state.modal && event.key === 'Tab') {
      const focusable = $$('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]', modalWindow).filter((el) => el.getClientRects().length);
      if (!focusable.length) {event.preventDefault();modalWindow.focus();return;}
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modalWindow)) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('resize', () => {if (window.innerWidth > 800) toggleMenu(false);});
  $('#copyright-year').textContent = new Date().getFullYear();
  renderTours();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => {
      if (document.hidden || state.carouselPaused || state.modal || window.innerWidth < 801) return;
      moveCarousel(1);
    }, 5500);
  }
})();
