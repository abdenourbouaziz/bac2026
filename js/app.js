(function () {
  'use strict';

  /* ================= Models ================= */
  const CHAT_MODELS = [
    { id: 'openai/gpt-5.5', label: 'GPT-5.5 · OpenAI' },
    { id: 'google/gemini-3.6-flash', label: 'Gemini 3.6 Flash · Google' },
    { id: 'anthropic/claude-opus-5', label: 'Claude Opus 5 · Anthropic' },
    { id: 'x-ai/grok-4.5', label: 'Grok 4.5 · xAI' },
    { id: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro' },
    { id: 'meta-llama/llama-4-maverick', label: 'Llama 4 Maverick · Meta' },
    { id: 'qwen/qwen3.7-max', label: 'Qwen 3.7 Max · Alibaba' },
    { id: 'openai/gpt-5.4-nano', label: 'GPT-5.4 Nano · OpenAI (rapide)' }
  ];
  const IMG_MODELS = [
    { id: 'openai/gpt-image-2', label: 'GPT Image 2 · OpenAI' },
    { id: 'google/gemini-3-pro-image-preview', label: 'Nano Banana Pro · Google' },
    { id: 'black-forest-labs/flux-2-pro', label: 'FLUX.2 [pro] · Black Forest Labs' },
    { id: 'x-ai/grok-imagine-image', label: 'Grok Imagine · xAI' },
    { id: 'stabilityai/stable-diffusion-3-medium', label: 'Stable Diffusion 3 · Stability' }
  ];
  const VID_MODELS = [
    { id: 'sora-2', label: 'Sora 2 · OpenAI' },
    { id: 'sora-2-pro', label: 'Sora 2 Pro · OpenAI' },
    { id: 'veo-3.1-generate-preview', label: 'Veo 3.1 · Google' }
  ];

  const DEFAULT_CHAT_MODEL = 'openai/gpt-5.5';
  const DEFAULT_IMG_MODEL = 'openai/gpt-image-2';
  const DEFAULT_VID_MODEL = 'sora-2';
  const LS_CHAT_MODEL = 'bac2026-chat-model';
  const LS_IMG_MODEL = 'bac2026-img-model';
  const LS_VID_MODEL = 'bac2026-vid-model';
  const LS_CHAT_HISTORY = 'bac2026-chat-history';
  const LS_LANG = 'bac2026-lang';

  const SYSTEM_PROMPT =
    "You are 'Bac 2026 Assistant', a friendly AI assistant made for the winners (laureats) of the " +
    "Baccalaureate 2026 in Algeria. Answer in the language the user writes in (French, Arabic or English). " +
    "Help with: BAC 2026 results, university orientation and the orientation.dz platform, choosing a " +
    "filiere/specialty according to the average (moyenne), university pre-registration and registration, " +
    "required documents, service national (military service) postponement/exemption for students, bourses " +
    "(scholarships), studying abroad, deadlines and official procedures. Give clear, practical, structured " +
    "answers with short lists when helpful. Be encouraging and supportive. Always remind the user to check " +
    "official sources (Ministry of National Education, ONEC, orientation.dz, university websites) since rules " +
    "can change.";

  /* ================= Translations ================= */
  const i18n = {
    fr: {
      skipLink: 'Aller au contenu',
      logoTitle: 'Bac 2026', logoSub: 'Assistant des lauréats · Algérie',
      tabAssistant: 'Assistant', tabStudio: 'Studio', tabScanner: 'Scanner',
      heroBadge: 'Baccalauréat 2026 · Algérie',
      heroLine1: 'Félicitations aux lauréats !',
      heroLine2: 'Toutes tes réponses. Tes images. Tes vidéos.',
      heroSub: "Ton assistant IA gratuit répond à toutes tes questions d'orientation, lit tes documents, parle avec toi, et crée les images et vidéos de célébration que tu imagines.",
      heroCta: 'Discuter maintenant', heroCta2: 'Créer une image',
      scrollHint: 'Défiler pour explorer',
      toolsEyebrow: 'Les outils du lauréat', toolsTitle: "Tout ce qu'il faut, au même endroit",
      toolsSub: "Quatre outils IA pensés pour l'après-bac : orientation, création, voix et documents.",
      galleryEyebrow: 'La promo en images', galleryTitle: 'Une nuit à célébrer',
      gallerySub: 'De la proclamation des résultats aux photos de famille — génère tes propres souvenirs dans le Studio.',
      workspaceEyebrow: 'Espace lauréat', workspaceTitle: "Ton atelier, prêt à l'emploi",
      workspaceSub: "Discute, crée, scanne — sans inscription, sans clé API, directement dans le navigateur.",
      stat1Num: '100%', stat1Label: 'Gratuit',
      stat2Num: '24/7', stat2Label: 'Disponible',
      stat3Num: '4 outils', stat3Label: 'Propulsés IA',
      featAssistantTitle: 'Assistant intelligent', featAssistantDesc: "Orientation, filières, inscriptions, bourses… réponse à toutes tes questions en français ou en arabe.",
      featVoiceTitle: 'Parle & écoute', featVoiceDesc: "Dictée vocale de tes questions et réponses lues à voix haute par l'IA.",
      featStudioTitle: 'Studio créatif', featStudioDesc: 'Images et vidéos de célébration générées par IA, avec les modèles de ton choix.',
      featScannerTitle: 'Scanner de documents', featScannerDesc: "Photo d'un document, relevé ou attestation : extraction du texte et explication par l'IA.",
      chatTitle: 'Ton assistant personnel', chatSub: 'Pose ta question par écrit ou par la voix. Choisis le modèle IA que tu préfères.',
      chatPlaceholder: 'Ex : Quelle filière choisir avec une moyenne de 14 ?',
      send: 'Envoyer', modelLabel: 'Modèle IA',
      chatHint: "L'assistant peut se tromper. Vérifie toujours les informations auprès des sources officielles (Ministère, ONEC, orientation.dz).",
      chatWelcome: 'Salut 👋 Je suis ton assistant BAC 2026 ! Pose-moi tes questions par écrit ou par la voix 🎤.',
      clearChat: 'Effacer', listening: '🎤 Écoute en cours… Parle maintenant.',
      speak: '🔊 Lire', stopSpeak: '🔊 Stop', copy: '📋 Copier', copied: 'Copié !',
      micError: "Impossible d'accéder au micro ou de transcrire la voix.",
      studioTitle: 'Studio créatif', studioSub: 'Génère des images et des vidéos de célébration personnalisées.',
      subImg: 'Image', subVideo: 'Vidéo',
      qualityLabel: 'Qualité', qLow: 'Basse', qMedium: 'Moyenne', qHigh: 'Haute',
      imgPlaceholder: "Décris l'image que tu veux générer…", imgEmpty: 'Ton image apparaîtra ici…',
      generate: 'Générer', generating: "Génération de l'image…",
      vidPlaceholder: 'Décris la vidéo que tu veux créer…', vidEmpty: 'Ta vidéo apparaîtra ici…',
      vidGenerate: 'Créer la vidéo', vidSecondsLabel: 'Durée',
      vidGenerating: '🎬 Création de la vidéo… Cela peut prendre plusieurs minutes.',
      download: 'Télécharger', regenerate: 'Regénérer',
      imgError: "Impossible de générer l'image. Réessaie ou change de modèle.",
      videoError: "Impossible de créer la vidéo. Réessaie ou change de modèle.",
      scannerTitle: 'Scanner & analyse', scannerSub: "Photographie un document (relevé, attestation, notification…), l'IA lit et explique.",
      dropText: 'Clique ou dépose une image ici', dropHint: 'JPG, PNG… (max 10 Mo)',
      changeImage: "Changer d'image",
      btnOcr: 'Extraire le texte (OCR)', btnAnalyze: "Analyser avec l'IA",
      ocrTitle: 'Texte extrait', analysisTitle: 'Analyse IA',
      analyzing: '🤖 Analyse en cours…', noImage: 'Choisis d’abord une image.',
      ocrError: "Impossible de lire le texte. Vérifie l'image ou réessaie.",
      toastWaitPuter: 'Chargement de Puter… réessaie dans un instant.',
      toastError: 'Une erreur est survenue. Réessaie.',
      footerText: 'Fait avec ❤️ pour la génération BAC 2026 en Algérie 🇩🇿',
      footerNote: 'Propulsé par puter.js — IA gratuite, sans clé API, 400+ modèles',
      footerEyebrow: 'Génération 2026 — Algérie',
      quick: [
        { label: '🎓 Quelle filière avec une moyenne de 14 ?', prompt: 'Quelle filière puis-je choisir à l\'université en Algérie avec une moyenne de 14 au bac ?' },
        { label: '📝 Comment s\'inscrire à l\'université ?', prompt: 'Quelles sont les étapes pour s\'inscrire à l\'université en Algérie après le bac ?' },
        { label: '🪖 Service militaire, que faire ?', prompt: 'Je suis bachelier en Algérie, comment faire pour le report ou l\'exemption du service militaire pour études ?' },
        { label: '📂 Quels documents préparer ?', prompt: 'Quels documents faut-il préparer pour l\'inscription à l\'université après le bac en Algérie ?' },
        { label: '💰 Bourses et aides', prompt: 'Comment demander la bourse universitaire en Algérie ? Quels sont les montants et les conditions ?' },
        { label: '🗓️ Dates de pré-inscription', prompt: 'Quelles sont les dates importantes de la pré-inscription universitaire en Algérie ?' }
      ],
      templates: [
        { label: '🎓 Carte de félicitations', prompt: 'A congratulation card for passing the BAC 2026 exam in Algeria, green white red Algerian colors, graduation cap, confetti, elegant festive illustration, space for text' },
        { label: '🎉 Affiche célébration', prompt: 'A festive celebration poster for BAC 2026 success in Algeria, fireworks, confetti, graduation caps, Algerian flag colors green white red, bold joyful design' },
        { label: '📸 Avatar de profil', prompt: 'A fun round avatar for a social media profile picture, happy graduate with graduation cap, confetti, Algerian flag colors, flat modern illustration' },
        { label: '📱 Story réseaux sociaux', prompt: 'A vertical Instagram story design celebrating passing the BAC in Algeria, green white red gradient, graduation emoji style, text "BAC 2026", celebratory' },
        { label: '🎊 Félicitations famille', prompt: 'A warm family congratulation image, happy Algerian family celebrating a graduate at home, confetti, warm colors, joyful realistic photo' },
        { label: '🏆 Diplôme décoratif', prompt: 'An elegant diploma certificate design for a BAC 2026 winner, gold and green, Algerian emblem, laurel wreath, luxurious detailed illustration' }
      ],
      vidTemplates: [
        { label: '🎉 Vidéo de félicitations', prompt: 'Festive celebration video, confetti and graduation caps falling, a big golden text "BAC 2026" glowing, Algerian flag colors green white red, joyful cinematic' },
        { label: '🎬 Montage stylisé', prompt: 'Cinematic montage of a happy graduation day, a student throwing their cap in the air, slow motion, confetti, warm sunlight, Algerian flag waving, inspiring music' }
      ]
    },
    ar: {
      skipLink: 'تخطَّ إلى المحتوى',
      logoTitle: 'بكالوريا 2026', logoSub: 'مساعد الناجحين · الجزائر',
      tabAssistant: 'المساعد', tabStudio: 'الاستوديو', tabScanner: 'الماسح',
      heroBadge: 'بكالوريا 2026 · الجزائر',
      heroLine1: 'مبروك للناجحين!',
      heroLine2: 'كل الأجوبة. صورك. فيديوهاتك.',
      heroSub: 'مساعدك الذكي المجاني يجيب عن كل أسئلة التوجيه، يقرأ مستنداتك، يتحدث معك، ويصنع لك صور وفيديوهات الاحتفال التي تتخيلها.',
      heroCta: 'ابدأ المحادثة', heroCta2: 'أنشئ صورة',
      scrollHint: 'مرر لاستكشاف المزيد',
      toolsEyebrow: 'أدوات الناجح', toolsTitle: 'كل ما تحتاجه في مكان واحد',
      toolsSub: 'أربع أدوات ذكاء اصطناعي لما بعد البكالوريا: التوجيه، الإبداع، الصوت والمستندات.',
      galleryEyebrow: 'الدفعة بالصور', galleryTitle: 'ليلة تستحق الاحتفال',
      gallerySub: 'من إعلان النتائج إلى صور العائلة — أنشئ ذكرياتك الخاصة في الاستوديو.',
      workspaceEyebrow: 'فضاء الناجح', workspaceTitle: 'ورشتك جاهزة للعمل',
      workspaceSub: 'تحدث، أنشئ، امسح — بدون تسجيل، بدون مفتاح API، مباشرة في المتصفح.',
      stat1Num: '100%', stat1Label: 'مجاني',
      stat2Num: '24/7', stat2Label: 'متوفر',
      stat3Num: '4 أدوات', stat3Label: 'مدعومة بالذكاء',
      featAssistantTitle: 'مساعد ذكي', featAssistantDesc: 'التوجيه، الشعب، التسجيلات، المنح… إجابات لكل أسئلتك بالعربية أو الفرنسية.',
      featVoiceTitle: 'تحدث واستمع', featVoiceDesc: 'إملاء صوتي لأسئلتك وإجابة تُقرأ بصوت الذكاء الاصطناعي.',
      featStudioTitle: 'استوديو إبداعي', featStudioDesc: 'صور وفيديوهات احتفال يولّدها الذكاء الاصطناعي بالنموذج الذي تختاره.',
      featScannerTitle: 'ماسح المستندات', featScannerDesc: 'صوّر مستنداً أو كشفاً أو شهادة: استخراج النص وشرحه بالذكاء الاصطناعي.',
      chatTitle: 'مساعدك الشخصي', chatSub: 'اطرح سؤالك كتابةً أو صوتاً. اختر نموذج الذكاء الاصطناعي المفضل لديك.',
      chatPlaceholder: 'مثال: ما الشعبة التي أختارها بمعدل 14؟',
      send: 'إرسال', modelLabel: 'نموذج الذكاء الاصطناعي',
      chatHint: 'المساعد قد يخطئ. تأكد دائماً من المعلومات من المصادر الرسمية (الوزارة، الديوان الوطني، orientation.dz).',
      chatWelcome: 'مرحباً 👋 أنا مساعدك لبكالوريا 2026! اسألني كتابةً أو بالصوت 🎤.',
      clearChat: 'مسح', listening: '🎤 جارٍ الاستماع… تحدث الآن.',
      speak: '🔊 قراءة', stopSpeak: '🔊 إيقاف', copy: '📋 نسخ', copied: 'تم النسخ!',
      micError: 'تعذر الوصول إلى الميكروفون أو تحويل الصوت إلى نص.',
      studioTitle: 'استوديو إبداعي', studioSub: 'أنشئ صوراً وفيديوهات احتفال مخصصة.',
      subImg: 'صورة', subVideo: 'فيديو',
      qualityLabel: 'الجودة', qLow: 'منخفضة', qMedium: 'متوسطة', qHigh: 'عالية',
      imgPlaceholder: 'صف الصورة التي تريد إنشاءها…', imgEmpty: 'ستظهر صورتك هنا…',
      generate: 'إنشاء', generating: 'جارٍ إنشاء الصورة…',
      vidPlaceholder: 'صف الفيديو الذي تريد إنشاءه…', vidEmpty: 'سيظهر فيديوك هنا…',
      vidGenerate: 'إنشاء الفيديو', vidSecondsLabel: 'المدة',
      vidGenerating: '🎬 جارٍ إنشاء الفيديو… قد يستغرق عدة دقائق.',
      download: 'تحميل', regenerate: 'إعادة الإنشاء',
      imgError: 'تعذر إنشاء الصورة. أعد المحاولة أو غيّر النموذج.',
      videoError: 'تعذر إنشاء الفيديو. أعد المحاولة أو غيّر النموذج.',
      scannerTitle: 'الماسح والتحليل', scannerSub: 'صوّر مستنداً (كشفاً، شهادة، إشعاراً…) وسيقوم الذكاء الاصطناعي بقراءته وشرحه.',
      dropText: 'انقر أو أفلت صورة هنا', dropHint: 'JPG, PNG … (بحد أقصى 10 ميجابايت)',
      changeImage: 'تغيير الصورة',
      btnOcr: 'استخراج النص (OCR)', btnAnalyze: 'التحليل بالذكاء الاصطناعي',
      ocrTitle: 'النص المستخرج', analysisTitle: 'تحليل الذكاء الاصطناعي',
      analyzing: '🤖 جارٍ التحليل…', noImage: 'اختر صورة أولاً.',
      ocrError: 'تعذر قراءة النص. تحقق من الصورة أو أعد المحاولة.',
      toastWaitPuter: 'جاري تحميل Puter… أعد المحاولة بعد لحظات.',
      toastError: 'حدث خطأ. حاول مرة أخرى.',
      footerText: 'صُنع بحب ❤️ لدفعة بكالوريا 2026 في الجزائر 🇩🇿',
      footerNote: 'مدعوم من puter.js — ذكاء اصطناعي مجاني، بدون مفتاح API، أكثر من 400 نموذج',
      footerEyebrow: 'دفعة 2026 — الجزائر',
      quick: [
        { label: '🎓 ما الشعبة بمعدل 14؟', prompt: 'ما الشعبة التي أستطيع اختيارها في الجامعة بمعدل 14 في البكالوريا؟' },
        { label: '📝 كيف أسجل في الجامعة؟', prompt: 'ما هي خطوات التسجيل في الجامعة في الجزائر بعد البكالوريا؟' },
        { label: '🪖 ماذا عن الخدمة الوطنية؟', prompt: 'أنا ناجح في البكالوريا، كيف أؤجل أو أعفى من الخدمة الوطنية بسبب الدراسة؟' },
        { label: '📂 ما وثائق الملف؟', prompt: 'ما الوثائق المطلوبة للتسجيل في الجامعة بعد البكالوريا في الجزائر؟' },
        { label: '💰 المنح الدراسية', prompt: 'كيف أطلب المنحة الجامعية في الجزائر؟ ما هي المبالغ والشروط؟' },
        { label: '🗓️ مواعيد التسجيل المسبق', prompt: 'ما هي المواعيد المهمة للتسجيل المسبق الجامعي في الجزائر؟' }
      ],
      templates: [
        { label: '🎓 بطاقة تهنئة', prompt: 'A congratulation card for passing the BAC 2026 exam in Algeria, green white red Algerian colors, graduation cap, confetti, elegant festive illustration, space for text' },
        { label: '🎉 ملصق احتفال', prompt: 'A festive celebration poster for BAC 2026 success in Algeria, fireworks, confetti, graduation caps, Algerian flag colors green white red, bold joyful design' },
        { label: '📸 صورة رمزية', prompt: 'A fun round avatar for a social media profile picture, happy graduate with graduation cap, confetti, Algerian flag colors, flat modern illustration' },
        { label: '📱 قصة إنستغرام', prompt: 'A vertical Instagram story design celebrating passing the BAC in Algeria, green white red gradient, graduation emoji style, text "BAC 2026", celebratory' },
        { label: '🎊 تهنئة عائلية', prompt: 'A warm family congratulation image, happy Algerian family celebrating a graduate at home, confetti, warm colors, joyful realistic photo' },
        { label: '🏆 شهادة مزخرفة', prompt: 'An elegant diploma certificate design for a BAC 2026 winner, gold and green, Algerian emblem, laurel wreath, luxurious detailed illustration' }
      ],
      vidTemplates: [
        { label: '🎉 فيديو تهنئة', prompt: 'Festive celebration video, confetti and graduation caps falling, a big glowing golden text "BAC 2026", Algerian flag colors green white red, joyful cinematic' },
        { label: '🎬 مونتاج أنيق', prompt: 'Cinematic montage of a happy graduation day, a student throwing their cap in the air, slow motion, confetti, warm sunlight, Algerian flag waving' }
      ]
    }
  };

  /* ================= State ================= */
  let lang = 'fr';
  let busy = false;
  let imgBusy = false;
  let vidBusy = false;
  let recording = false;
  let speechAudio = null;
  let scanFile = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let recTimer = null;
  let chatHistory = [];

  try {
    chatHistory = JSON.parse(localStorage.getItem(LS_CHAT_HISTORY) || '[]');
  } catch (e) { chatHistory = []; }
  try {
    lang = localStorage.getItem(LS_LANG) || 'fr';
    if (lang !== 'fr' && lang !== 'ar') lang = 'fr';
  } catch (e) { /* ignore */ }

  const $ = (id) => document.getElementById(id);
  const els = {
    langToggle: $('langToggle'), langLabel: $('langLabel'),
    navLinks: Array.from(document.querySelectorAll('.nav-link')),
    tabs: Array.from(document.querySelectorAll('.tab')),
    panels: Array.from(document.querySelectorAll('.panel')),
    subtabs: Array.from(document.querySelectorAll('.subtab')),
    subpanels: Array.from(document.querySelectorAll('.subpanel')),
    ctaTargets: Array.from(document.querySelectorAll('[data-target]')),
    chatBox: $('chatBox'), chatInput: $('chatInput'), sendBtn: $('sendBtn'),
    chatModel: $('chatModel'), quickChips: $('quickChips'), clearChat: $('clearChat'), micBtn: $('micBtn'),
    imgModel: $('imgModel'), imgQuality: $('imgQuality'), imgPrompt: $('imgPrompt'),
    generateBtn: $('generateBtn'), imgResult: $('imgResult'), imgTemplates: $('imgTemplates'),
    vidModel: $('vidModel'), vidSeconds: $('vidSeconds'), vidPrompt: $('vidPrompt'),
    vidGenerateBtn: $('vidGenerateBtn'), vidResult: $('vidResult'), vidTemplates: $('vidTemplates'),
    fileInput: $('fileInput'), dropzone: $('dropzone'), scanPreviewWrap: $('scanPreviewWrap'),
    scanPreview: $('scanPreview'), changeImg: $('changeImg'),
    ocrBtn: $('ocrBtn'), analyzeBtn: $('analyzeBtn'),
    ocrBlock: $('ocrBlock'), ocrText: $('ocrText'),
    analysisBlock: $('analysisBlock'), analysisText: $('analysisText'),
    toast: $('toast')
  };

  const t = (key) => i18n[lang][key] != null ? i18n[lang][key] : i18n.fr[key];

  /* ================= Utils ================= */
  function waitForPuter(timeout) {
    return new Promise(function (resolve) {
      if (window.puter && window.puter.ai) return resolve(true);
      var start = Date.now();
      var timer = setInterval(function () {
        if (window.puter && window.puter.ai) { clearInterval(timer); resolve(true); }
        else if (Date.now() - start > (timeout || 8000)) { clearInterval(timer); resolve(false); }
      }, 200);
    });
  }

  var toastTimer = null;
  function toast(text) {
    els.toast.textContent = text;
    els.toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.classList.remove('show'); }, 3200);
  }

  function saveLS(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ================= i18n ================= */
  function applyLang() {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    els.langLabel.textContent = lang === 'fr' ? 'العربية' : 'Français';
    renderQuick();
    renderTemplates();
    var welcome = els.chatBox.querySelector('.welcome-msg');
    if (welcome) welcome.textContent = t('chatWelcome');
  }

  function switchLang() {
    lang = lang === 'fr' ? 'ar' : 'fr';
    saveLS(LS_LANG, lang);
    applyLang();
  }

  /* ================= Tabs ================= */
  function switchTab(id) {
    els.tabs.forEach(function (tab) {
      var active = tab.dataset.target === id;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });
    els.navLinks.forEach(function (link) {
      var active = link.dataset.target === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    els.panels.forEach(function (p) {
      var active = p.id === id;
      p.classList.toggle('active', active);
      if (active) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });
    var app = document.getElementById('app');
    if (app) app.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function switchSub(id) {
    els.subtabs.forEach(function (st) {
      var active = st.dataset.sub === id;
      st.classList.toggle('active', active);
      st.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    els.subpanels.forEach(function (sp) {
      var active = sp.id === id;
      sp.classList.toggle('active', active);
      if (active) sp.removeAttribute('hidden');
      else sp.setAttribute('hidden', '');
    });
  }

  /* ================= Model selects ================= */
  function populateModels(select, models, lsKey, fallbackId) {
    var saved = fallbackId;
    try { saved = localStorage.getItem(lsKey) || fallbackId; } catch (e) { saved = fallbackId; }
    if (!models.some(function (m) { return m.id === saved; })) saved = fallbackId;
    models.forEach(function (m) {
      var opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.label;
      select.appendChild(opt);
    });
    select.value = saved;
    select.addEventListener('change', function () { saveLS(lsKey, select.value); });
  }

  /* ================= Chips ================= */
  function renderQuick() {
    els.quickChips.innerHTML = '';
    t('quick').forEach(function (q) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.textContent = q.label;
      btn.addEventListener('click', function () {
        els.chatInput.value = q.prompt;
        autosize();
        sendMessage();
      });
      els.quickChips.appendChild(btn);
    });
  }

  function renderTemplates() {
    els.imgTemplates.innerHTML = '';
    t('templates').forEach(function (tp) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip tpl';
      btn.textContent = tp.label;
      btn.addEventListener('click', function () {
        els.imgPrompt.value = tp.prompt;
        generateImage();
      });
      els.imgTemplates.appendChild(btn);
    });

    els.vidTemplates.innerHTML = '';
    t('vidTemplates').forEach(function (tp) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.textContent = tp.label;
      btn.addEventListener('click', function () {
        els.vidPrompt.value = tp.prompt;
        generateVideo();
      });
      els.vidTemplates.appendChild(btn);
    });
  }

  /* ================= Chat ================= */
  function scrollBottom() { els.chatBox.scrollTop = els.chatBox.scrollHeight; }

  function addMsg(role, text) {
    var div = document.createElement('div');
    div.className = 'msg ' + role;
    div.textContent = text;
    els.chatBox.appendChild(div);
    scrollBottom();
    return div;
  }

  function addMsgTools(container, text) {
    var tools = document.createElement('div');
    tools.className = 'msg-tools';

    var speakBtn = document.createElement('button');
    speakBtn.type = 'button';
    speakBtn.className = 'msg-tool';
    speakBtn.textContent = t('speak');
    speakBtn.addEventListener('click', function () { speak(text, speakBtn); });
    tools.appendChild(speakBtn);

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'msg-tool';
    copyBtn.textContent = t('copy');
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = '✓ ' + t('copied');
        setTimeout(function () { copyBtn.textContent = t('copy'); }, 1800);
      }).catch(function () { toast(t('toastError')); });
    });
    tools.appendChild(copyBtn);

    container.appendChild(tools);
    scrollBottom();
  }

  function renderHistory() {
    els.chatBox.innerHTML = '';
    if (!chatHistory.length) {
      var welcome = document.createElement('div');
      welcome.className = 'welcome-msg';
      welcome.textContent = t('chatWelcome');
      els.chatBox.appendChild(welcome);
      return;
    }
    chatHistory.forEach(function (m) {
      var div = addMsg(m.role, m.content);
      if (m.role === 'assistant') addMsgTools(div, m.content);
    });
  }

  function persistHistory() {
    try { localStorage.setItem(LS_CHAT_HISTORY, JSON.stringify(chatHistory.slice(-40))); } catch (e) { /* ignore */ }
  }

  async function sendMessage() {
    var text = els.chatInput.value.trim();
    if (!text || busy) return;
    els.chatInput.value = '';
    autosize();
    addMsg('user', text);
    chatHistory.push({ role: 'user', content: text });
    persistHistory();

    var botEl = addMsg('bot', '');
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    botEl.appendChild(cursor);

    busy = true;
    els.sendBtn.disabled = true;
    try {
      var ready = await waitForPuter();
      if (!ready) throw new Error('puter-load');
      var history = [{ role: 'system', content: SYSTEM_PROMPT }]
        .concat(chatHistory.map(function (m) { return { role: m.role, content: m.content }; }));

      var full = '';
      try {
        var resp = await puter.ai.chat(history, false, { model: els.chatModel.value || DEFAULT_CHAT_MODEL, stream: true });
        for await (var part of resp) {
          var chunk = (part && (part.text || (part.message && part.message.content))) || '';
          if (chunk) { full += chunk; botEl.textContent = full; scrollBottom(); }
        }
      } catch (streamErr) {
        var resp2 = await puter.ai.chat(history, false, { model: els.chatModel.value || DEFAULT_CHAT_MODEL });
        full = typeof resp2 === 'string' ? resp2
          : (resp2 && (resp2.message && resp2.message.content)) || (resp2 && resp2.text) || String(resp2);
        botEl.textContent = full;
      }

      if (!full.trim()) { botEl.textContent = '🤔 …'; full = '🤔 …'; }
      chatHistory.push({ role: 'assistant', content: full });
      persistHistory();
      botEl.textContent = full;
      addMsgTools(botEl, full);
    } catch (err) {
      botEl.classList.add('error');
      botEl.textContent = err.message === 'puter-load' ? t('toastWaitPuter') : t('toastError');
    }
    busy = false;
    els.sendBtn.disabled = false;
    scrollBottom();
  }

  /* ================= Voice input ================= */
  function setMicVisual(on) {
    els.micBtn.classList.toggle('recording', on);
    els.micBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  async function toggleRecording() {
    if (recording) { stopRecording(); return; }
    try {
      var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      mediaRecorder.ondataavailable = function (e) { if (e.data && e.data.size) audioChunks.push(e.data); };
      mediaRecorder.onstop = async function () {
        stream.getTracks().forEach(function (tr) { tr.stop(); });
        var blob = new Blob(audioChunks, { type: (mediaRecorder && mediaRecorder.mimeType) || 'audio/webm' });
        setMicVisual(false);
        try {
          var ready = await waitForPuter();
          if (!ready) throw new Error('puter-load');
          var transcript = await puter.ai.speech2txt(blob, { response_format: 'text' });
          var txt = typeof transcript === 'string' ? transcript
            : (transcript && (transcript.text || transcript.transcript)) || '';
          if (txt) {
            els.chatInput.value = (els.chatInput.value ? els.chatInput.value + ' ' : '') + txt.trim();
            autosize();
          }
        } catch (e) { toast(t('micError')); }
      };
      mediaRecorder.start();
      recording = true;
      setMicVisual(true);
      toast(t('listening'));
      recTimer = setTimeout(stopRecording, 30000);
    } catch (e) {
      toast(t('micError'));
      setMicVisual(false);
    }
  }

  function stopRecording() {
    if (recTimer) { clearTimeout(recTimer); recTimer = null; }
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      try { mediaRecorder.stop(); } catch (e) { /* ignore */ }
    }
    recording = false;
  }

  /* ================= Text to speech ================= */
  function speak(text, btn) {
    if (speechAudio) {
      try { speechAudio.pause(); speechAudio = null; } catch (e) { /* ignore */ }
      if (btn) { btn.classList.remove('active'); btn.textContent = t('speak'); }
      return;
    }
    if (btn) { btn.classList.add('active'); btn.textContent = t('stopSpeak'); }
    waitForPuter(4000).then(function (ready) {
      if (ready) {
        puter.ai.txt2speech(text, { provider: 'openai' }).then(function (audio) {
          speechAudio = audio;
          audio.onended = function () {
            speechAudio = null;
            if (btn) { btn.classList.remove('active'); btn.textContent = t('speak'); }
          };
          audio.play().catch(function () {
            if (btn) { btn.classList.remove('active'); btn.textContent = t('speak'); }
          });
        }).catch(function () {
          if (btn) { btn.classList.remove('active'); btn.textContent = t('speak'); }
        });
      } else {
        try {
          var u = new SpeechSynthesisUtterance(text);
          u.onend = function () { if (btn) { btn.classList.remove('active'); btn.textContent = t('speak'); } };
          window.speechSynthesis.speak(u);
        } catch (e) { if (btn) { btn.classList.remove('active'); btn.textContent = t('speak'); } }
      }
    });
  }

  function clearChatHistory() {
    stopRecording();
    if (speechAudio) { try { speechAudio.pause(); } catch (e) { /* ignore */ } speechAudio = null; }
    chatHistory = [];
    saveLS(LS_CHAT_HISTORY, '[]');
    renderHistory();
  }

  /* ================= Image generation ================= */
  function showImgLoading() {
    els.imgResult.classList.remove('has-result');
    els.imgResult.innerHTML = '';
    var loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<span class="spinner"></span><div>' + t('generating') + '</div>';
    els.imgResult.appendChild(loader);
  }

  function renderResult(box, el, filename) {
    box.classList.add('has-result');
    box.innerHTML = '';
    box.appendChild(el);
    var actions = document.createElement('div');
    actions.className = 'result-actions';
    var download = document.createElement('a');
    download.className = 'btn btn-download';
    download.textContent = '⬇ ' + t('download');
    download.href = el.src;
    download.download = filename;
    var regen = document.createElement('button');
    regen.type = 'button';
    regen.className = 'btn btn-regenerate';
    regen.textContent = '↻ ' + t('regenerate');
    regen.addEventListener('click', function () {
      if (box === els.imgResult) generateImage(); else generateVideo();
    });
    actions.appendChild(download);
    actions.appendChild(regen);
    box.appendChild(actions);
  }

  async function generateImage() {
    var prompt = els.imgPrompt.value.trim();
    if (!prompt || imgBusy) return;
    imgBusy = true;
    els.generateBtn.disabled = true;
    showImgLoading();
    try {
      var ready = await waitForPuter();
      if (!ready) throw new Error('puter-load');
      var img;
      try {
        img = await puter.ai.txt2img({ prompt: prompt, model: els.imgModel.value || DEFAULT_IMG_MODEL, quality: els.imgQuality.value });
      } catch (modelErr) {
        img = await puter.ai.txt2img(prompt);
      }
      renderResult(els.imgResult, img, 'bac2026-celebration.png');
    } catch (err) {
      els.imgResult.classList.remove('has-result');
      els.imgResult.innerHTML = '';
      var errEl = document.createElement('div');
      errEl.className = 'msg bot error';
      errEl.textContent = err.message === 'puter-load' ? t('toastWaitPuter') : t('imgError');
      els.imgResult.appendChild(errEl);
    }
    imgBusy = false;
    els.generateBtn.disabled = false;
  }

  /* ================= Video generation ================= */
  function showVidLoading() {
    els.vidResult.classList.remove('has-result');
    els.vidResult.innerHTML = '';
    var loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<span class="spinner"></span><div>' + t('vidGenerating') + '</div>';
    els.vidResult.appendChild(loader);
  }

  async function generateVideo() {
    var prompt = els.vidPrompt.value.trim();
    if (!prompt || vidBusy) return;
    vidBusy = true;
    els.vidGenerateBtn.disabled = true;
    showVidLoading();
    try {
      var ready = await waitForPuter();
      if (!ready) throw new Error('puter-load');
      var video = await puter.ai.txt2vid({
        prompt: prompt,
        model: els.vidModel.value || DEFAULT_VID_MODEL,
        seconds: Number(els.vidSeconds.value) || 8
      });
      renderResult(els.vidResult, video, 'bac2026-celebration.mp4');
    } catch (err) {
      els.vidResult.classList.remove('has-result');
      els.vidResult.innerHTML = '';
      var errEl = document.createElement('div');
      errEl.className = 'msg bot error';
      errEl.textContent = err.message === 'puter-load' ? t('toastWaitPuter') : t('videoError');
      els.vidResult.appendChild(errEl);
    }
    vidBusy = false;
    els.vidGenerateBtn.disabled = false;
  }

  /* ================= Scanner ================= */
  function setFile(file) {
    scanFile = file;
    var ok = !!scanFile;
    els.ocrBtn.disabled = !ok;
    els.analyzeBtn.disabled = !ok;
    els.ocrBlock.classList.add('hidden');
    els.analysisBlock.classList.add('hidden');
    if (ok) {
      els.dropzone.classList.add('hidden');
      els.scanPreviewWrap.classList.remove('hidden');
      els.scanPreview.src = URL.createObjectURL(file);
    } else {
      els.dropzone.classList.remove('hidden');
      els.scanPreviewWrap.classList.add('hidden');
      els.scanPreview.src = '';
    }
  }

  function resetScan() {
    els.fileInput.value = '';
    setFile(null);
  }

  function fileToDataURL(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { reject(reader.error || new Error('read-failed')); };
      reader.readAsDataURL(file);
    });
  }

  async function runOcr() {
    if (!scanFile) { toast(t('noImage')); return; }
    els.ocrBlock.classList.remove('hidden');
    els.ocrText.textContent = '⏳ …';
    try {
      var ready = await waitForPuter();
      if (!ready) throw new Error('puter-load');
      var text;
      try {
        var dataUrl = await fileToDataURL(scanFile);
        text = await puter.ai.img2txt(dataUrl);
      } catch (dataUrlErr) {
        text = await puter.ai.img2txt(scanFile);
      }
      els.ocrText.textContent = text || '(vide)';
    } catch (err) {
      console.error('OCR failed:', err);
      els.ocrText.textContent = err.message === 'puter-load' ? t('toastWaitPuter') : t('ocrError');
    }
  }

  async function runAnalyze() {
    if (!scanFile) { toast(t('noImage')); return; }
    els.analysisBlock.classList.remove('hidden');
    els.analysisText.textContent = t('analyzing');
    try {
      var ready = await waitForPuter();
      if (!ready) throw new Error('puter-load');
      var prompt = 'Analyse cette image (document, photo ou relevé). Décris ce que c\'est, puis explique son contenu et les informations importantes. Réponds dans la langue de la question de l\'utilisateur.';
      var dataUrl = await fileToDataURL(scanFile);

      var resp;
      var model = els.chatModel.value || DEFAULT_CHAT_MODEL;
      try {
        resp = await puter.ai.chat(prompt, dataUrl, false, { model: model });
      } catch (firstErr) {
        console.error('Analyze failed with', model, firstErr);
        try {
          resp = await puter.ai.chat(prompt, scanFile, false, { model: model });
        } catch (secondErr) {
          console.error('Analyze failed with File media', secondErr);
          resp = await puter.ai.chat(prompt, dataUrl, false, { model: DEFAULT_CHAT_MODEL });
        }
      }

      var out = typeof resp === 'string' ? resp
        : (resp && (resp.message && resp.message.content)) || (resp && resp.text) || String(resp);
      els.analysisText.textContent = out;
    } catch (err) {
      console.error('Analysis failed:', err);
      els.analysisText.textContent = err.message === 'puter-load' ? t('toastWaitPuter') : t('toastError');
    }
  }

  /* ================= Misc ================= */
  function autosize() {
    els.chatInput.style.height = 'auto';
    els.chatInput.style.height = Math.min(els.chatInput.scrollHeight, 120) + 'px';
  }

  /* ================= Init ================= */
  function init() {
    populateModels(els.chatModel, CHAT_MODELS, LS_CHAT_MODEL, DEFAULT_CHAT_MODEL);
    populateModels(els.imgModel, IMG_MODELS, LS_IMG_MODEL, DEFAULT_IMG_MODEL);
    populateModels(els.vidModel, VID_MODELS, LS_VID_MODEL, DEFAULT_VID_MODEL);

    els.langToggle.addEventListener('click', switchLang);

    els.ctaTargets.forEach(function (el) {
      el.addEventListener('click', function () { switchTab(el.dataset.target); });
    });
    els.navLinks.forEach(function (link) {
      link.addEventListener('click', function () { switchTab(link.dataset.target); });
    });
    els.subtabs.forEach(function (st) {
      st.addEventListener('click', function () { switchSub(st.dataset.sub); });
    });

    els.sendBtn.addEventListener('click', sendMessage);
    els.chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    els.chatInput.addEventListener('input', autosize);
    els.micBtn.addEventListener('click', toggleRecording);
    els.clearChat.addEventListener('click', clearChatHistory);

    els.generateBtn.addEventListener('click', generateImage);
    els.imgPrompt.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); generateImage(); } });
    els.vidGenerateBtn.addEventListener('click', generateVideo);
    els.vidPrompt.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); generateVideo(); } });

    els.dropzone.addEventListener('click', function () { els.fileInput.click(); });
    els.dropzone.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); els.fileInput.click(); } });
    els.dropzone.addEventListener('dragover', function (e) { e.preventDefault(); els.dropzone.classList.add('drag'); });
    els.dropzone.addEventListener('dragleave', function () { els.dropzone.classList.remove('drag'); });
    els.dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      els.dropzone.classList.remove('drag');
      if (e.dataTransfer.files && e.dataTransfer.files.length) setFile(e.dataTransfer.files[0]);
    });
    els.fileInput.addEventListener('change', function () {
      if (els.fileInput.files && els.fileInput.files.length) setFile(els.fileInput.files[0]);
    });
    els.changeImg.addEventListener('click', resetScan);
    els.ocrBtn.addEventListener('click', runOcr);
    els.analyzeBtn.addEventListener('click', runAnalyze);

    applyLang();
    renderHistory();

    waitForPuter().then(function (ready) {
      if (!ready) toast(t('toastWaitPuter'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
