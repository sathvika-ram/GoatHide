export type Locale = 'en' | 'fr' | 'de' | 'es' | 'it' | 'ar' | 'hi' | 'te' | 'ja' | 'zh';

export const translations: Record<Locale, Record<string, any>> = {
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      craftsmanship: "Craftsmanship",
      care: "Leather Care",
      blog: "Blog",
      contact: "Contact",
      faqs: "FAQs"
    },
    home: {
      heroTitle: "Crafted for Life. Designed for Legacy.",
      heroSubtitle: "Experience the timeless art of premium hand-burnished goat leather goods, built to endure.",
      shopNow: "Explore Collection",
      viewDetails: "View Details",
      featured: "Featured Collections",
      featuredSub: "Impeccable construction from vegetable-tanned full-grain hides.",
      loyaltyTitle: "Join The Legacy Club",
      loyaltyDesc: "Earn reward points on every luxury purchase and unlock private collections."
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is currently empty.",
      checkout: "Proceed to Checkout",
      subtotal: "Subtotal",
      add: "Add to Cart",
      remove: "Remove",
      coupon: "Promo Code",
      apply: "Apply",
      points: "Redeem Loyalty Points"
    },
    checkout: {
      title: "Checkout",
      shipping: "Shipping Address",
      payment: "Payment Method",
      placeOrder: "Complete Purchase",
      fullName: "Full Name",
      address: "Street Address",
      city: "City",
      postalCode: "Postal / ZIP Code",
      country: "Country"
    },
    product: {
      sku: "SKU",
      stock: "In Stock",
      outOfStock: "Out of Stock",
      reviews: "Customer Reviews",
      writeReview: "Write a Review",
      boughtTogether: "Frequently Bought Together",
      related: "Related Products"
    },
    
    common: {
      search: "Search",
      language: "Language",
      currency: "Currency",
      searchPlaceholder: "Search GOATHIDES luxury leather...",
      shopCollection: "Shop Collection",
      discount: "Discount",
      total: "Total",
      atelier: "GOATHIDES",
      shopByCategory: "Shop By Category",
      shopByCategorySub: "Explore hand-curated catalogs crafted for the modern lifestyle.",
      viewCollection: "View Collection",
      catHandbags: "Handbags",
      catBriefcases: "Briefcases",
      catWallets: "Wallets",
      catAccessories: "Accessories"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      shop: "Boutique",
      about: "À Propos",
      craftsmanship: "Artisanat",
      care: "Entretien du Cuir",
      blog: "Blog",
      contact: "Contact",
      faqs: "FAQ"
    },
    home: {
      heroTitle: "Conçu pour la Vie. Créé pour l'Héritage.",
      heroSubtitle: "Découvrez l'art intemporel des articles en cuir de chèvre de qualité supérieure, faits pour durer.",
      shopNow: "Explorer la Collection",
      viewDetails: "Voir les Détails",
      featured: "Collections Vedettes",
      featuredSub: "Construction impeccable à partir de peaux de cuir tanné végétal.",
      loyaltyTitle: "Rejoignez le Legacy Club",
      loyaltyDesc: "Gagnez des points de récompense à chaque achat et accédez aux collections privées."
    },
    cart: {
      title: "Votre Panier",
      empty: "Votre panier est actuellement vide.",
      checkout: "Passer à la Caisse",
      subtotal: "Sous-total",
      add: "Ajouter au Panier",
      remove: "Supprimer",
      coupon: "Code Promo",
      apply: "Appliquer",
      points: "Échanger des Points"
    },
    checkout: {
      title: "Paiement",
      shipping: "Adresse de Livraison",
      payment: "Mode de Paiement",
      placeOrder: "Compléter l'Achat",
      fullName: "Nom Complet",
      address: "Adresse",
      city: "Ville",
      postalCode: "Code Postal",
      country: "Pays"
    },
    product: {
      sku: "Réf",
      stock: "En Stock",
      outOfStock: "En Rupture",
      reviews: "Avis Clients",
      writeReview: "Rédiger un Avis",
      boughtTogether: "Fréquemment Achetés Ensemble",
      related: "Produits Similaires"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      shop: "Shop",
      about: "Über Uns",
      craftsmanship: "Handwerkskunst",
      care: "Lederpflege",
      blog: "Blog",
      contact: "Kontakt",
      faqs: "FAQs"
    },
    home: {
      heroTitle: "Fürs Leben Gefertigt. Fürs Erbe Designt.",
      heroSubtitle: "Erleben Sie die zeitlose Kunst handpolierter Ziegenlederwaren, die für die Ewigkeit gebaut sind.",
      shopNow: "Kollektion Erkunden",
      viewDetails: "Details Anzeigen",
      featured: "Premium-Kollektionen",
      featuredSub: "Makellose Konstruktion aus pflanzlich gegerbten Volllederhäuten.",
      loyaltyTitle: "Treten Sie dem Legacy Club bei",
      loyaltyDesc: "Sammeln Sie bei jedem Einkauf Punkte und schalten Sie private Kollektionen frei."
    },
    cart: {
      title: "Ihr Warenkorb",
      empty: "Ihr Warenkorb ist derzeit leer.",
      checkout: "Zur Kasse",
      subtotal: "Zwischensumme",
      add: "In den Warenkorb",
      remove: "Entfernen",
      coupon: "Gutscheincode",
      apply: "Anwenden",
      points: "Treuepunkte einlösen"
    },
    checkout: {
      title: "Kasse",
      shipping: "Lieferadresse",
      payment: "Zahlungsart",
      placeOrder: "Kauf abschließen",
      fullName: "Vollständiger Name",
      address: "Straße und Hausnummer",
      city: "Stadt",
      postalCode: "Postleitzahl",
      country: "Land"
    },
    product: {
      sku: "SKU",
      stock: "Auf Lager",
      outOfStock: "Ausverkauft",
      reviews: "Kundenbewertungen",
      writeReview: "Bewertung schreiben",
      boughtTogether: "Wird oft zusammen gekauft",
      related: "Ähnliche Produkte"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      shop: "Tienda",
      about: "Nosotros",
      craftsmanship: "Artesanía",
      care: "Cuidado del Cuero",
      blog: "Blog",
      contact: "Contacto",
      faqs: "Preguntas Frecuentes"
    },
    home: {
      heroTitle: "Creado para la Vida. Diseñado para el Legado.",
      heroSubtitle: "Experimente el arte atemporal de los artículos de cuero de cabra premium pulidos a mano.",
      shopNow: "Ver Colección",
      viewDetails: "Ver Detalles",
      featured: "Colecciones Destacadas",
      featuredSub: "Impecable construcción a partir de pieles de grano completo de curtido vegetal.",
      loyaltyTitle: "Únase al Legacy Club",
      loyaltyDesc: "Acumule puntos de recompensa en cada compra de lujo y acceda a colecciones privadas."
    },
    cart: {
      title: "Su Carrito",
      empty: "Su carrito está actualmente vacío.",
      checkout: "Proceder al Pago",
      subtotal: "Subtotal",
      add: "Añadir al Carrito",
      remove: "Eliminar",
      coupon: "Código de Descuento",
      apply: "Aplicar",
      points: "Canjear Puntos"
    },
    checkout: {
      title: "Pago",
      shipping: "Dirección de Envío",
      payment: "Método de Pago",
      placeOrder: "Completar Compra",
      fullName: "Nombre Completo",
      address: "Dirección de Calle",
      city: "Ciudad",
      postalCode: "Código Postal",
      country: "País"
    },
    product: {
      sku: "SKU",
      stock: "En Stock",
      outOfStock: "Agotado",
      reviews: "Opiniones de Clientes",
      writeReview: "Escribir Opinión",
      boughtTogether: "Comprados Juntos Frecuentemente",
      related: "Productos Relacionados"
    }
  },
  it: {
    nav: {
      home: "Home",
      shop: "Negozio",
      about: "Chi Siamo",
      craftsmanship: "Artigianato",
      care: "Cura della Pelle",
      blog: "Blog",
      contact: "Contatti",
      faqs: "Domande Frequenti"
    },
    home: {
      heroTitle: "Creato per la Vita. Progettato per l'Eredità.",
      heroSubtitle: "Sperimenta l'arte senza tempo di articoli in pelle di capra pregiata brunita a mano.",
      shopNow: "Esplora Collezione",
      viewDetails: "Vedi Dettagli",
      featured: "Collezioni In Evidenza",
      featuredSub: "Costruzione impeccabile da pelli pieno fiore conciate al vegetale.",
      loyaltyTitle: "Unisciti al Legacy Club",
      loyaltyDesc: "Guadagna punti premio su ogni acquisto di lusso e sblocca collezioni riservate."
    },
    cart: {
      title: "Carrello",
      empty: "Il tuo carrello è attualmente vuoto.",
      checkout: "Procedi al Checkout",
      subtotal: "Totale Parziale",
      add: "Aggiungi al Carrello",
      remove: "Rimuovi",
      coupon: "Codice Promo",
      apply: "Applica",
      points: "Riscatta Punti Fedeltà"
    },
    checkout: {
      title: "Pagamento",
      shipping: "Indirizzo di Spedizione",
      payment: "Metodo di Pagamento",
      placeOrder: "Completa l'Acquisto",
      fullName: "Nome Completo",
      address: "Indirizzo",
      city: "Città",
      postalCode: "CAP",
      country: "Paese"
    },
    product: {
      sku: "SKU",
      stock: "Disponibile",
      outOfStock: "Esaurito",
      reviews: "Recensioni Clienti",
      writeReview: "Scrivi Recensione",
      boughtTogether: "Acquistati Insieme Spesso",
      related: "Prodotti Correlati"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      shop: "المتجر",
      about: "من نحن",
      craftsmanship: "الحرفية",
      care: "العناية بالجلد",
      blog: "المدونة",
      contact: "اتصل بنا",
      faqs: "الأسئلة الشائعة"
    },
    home: {
      heroTitle: "صُنع للحياة. صُمم للإرث.",
      heroSubtitle: "جرب الفن الخالد للمصنوعات الجلدية الفاخرة من جلد الماعز المصقول يدويًا، والمصممة لتدوم طويلًا.",
      shopNow: "استكشف المجموعة",
      viewDetails: "عرض التفاصيل",
      featured: "المجموعات المميزة",
      featuredSub: "تصنيع لا تشوبه شائبة من جلود الحبوب الكاملة المدبوغة نباتيًا.",
      loyaltyTitle: "انضم إلى نادي الإرث",
      loyaltyDesc: "اكسب نقاط مكافأة على كل عملية شراء فاخرة وافتح مجموعات خاصة."
    },
    cart: {
      title: "عربة التسوق",
      empty: "عربة التسوق الخاصة بك فارغة حاليًا.",
      checkout: "المتابعة لإتمام الشراء",
      subtotal: "المجموع الفرعي",
      add: "أضف إلى السلة",
      remove: "إزالة",
      coupon: "رمز الخصم",
      apply: "تطبيق",
      points: "استرداد نقاط الولاء"
    },
    checkout: {
      title: "الدفع",
      shipping: "عنوان الشحن",
      payment: "طريقة الدفع",
      placeOrder: "إتمام الشراء",
      fullName: "الاسم الكامل",
      address: "عنوان الشارع",
      city: "المدينة",
      postalCode: "الرمز البريدي",
      country: "البلد"
    },
    product: {
      sku: "رمز المنتج",
      stock: "متوفر في المخزن",
      outOfStock: "نفذت الكمية",
      reviews: "آراء العملاء",
      writeReview: "اكتب تقييمًا",
      boughtTogether: "يشتري عادة معًا",
      related: "منتجات ذات صلة"
    }
  },
  hi: {
    nav: {
      home: "होम",
      shop: "शॉप",
      about: "हमारे बारे में",
      craftsmanship: "शिल्पकला",
      care: "चमड़े की देखभाल",
      blog: "ब्लॉग",
      contact: "संपर्क",
      faqs: "अक्सर पूछे जाने वाले प्रश्न"
    },
    home: {
      heroTitle: "जीवन के लिए निर्मित। विरासत के लिए डिज़ाइन किया गया।",
      heroSubtitle: "प्रीमियम हैंड-बर्निश्ड बकरी के चमड़े के उत्पादों की शाश्वत कला का अनुभव करें, जो टिकने के लिए बनी है।",
      shopNow: "कलेक्शन देखें",
      viewDetails: "विवरण देखें",
      featured: "विशेष कलेक्शन",
      featuredSub: "वनस्पति-तने हुए पूर्ण-अनाज चमड़े से त्रुटिहीन निर्माण।",
      loyaltyTitle: "लिगेसी क्लब में शामिल हों",
      loyaltyDesc: "हर लक्ज़री खरीद पर रिवॉर्ड पॉइंट अर्जित करें और निजी कलेक्शन्स अनलॉक करें।"
    },
    cart: {
      title: "आपकी कार्ट",
      empty: "आपकी कार्ट वर्तमान में खाली है।",
      checkout: "चेकआउट करें",
      subtotal: "कुल योग",
      add: "कार्ट में जोड़ें",
      remove: "हटाएं",
      coupon: "प्रोमो कोड",
      apply: "लागू करें",
      points: "रिवॉर्ड पॉइंट रिडीम करें"
    },
    checkout: {
      title: "चेकआउट",
      shipping: "शिपिंग पता",
      payment: "भुगतान का प्रकार",
      placeOrder: "खरीद पूरी करें",
      fullName: "पूरा नाम",
      address: "गली का पता",
      city: "शहर",
      postalCode: "पिन कोड",
      country: "देश"
    },
    product: {
      sku: "SKU",
      stock: "स्टॉक में है",
      outOfStock: "स्टॉक समाप्त",
      reviews: "ग्राहक समीक्षाएं",
      writeReview: "समीक्षा लिखें",
      boughtTogether: "अक्सर एक साथ खरीदे जाने वाले",
      related: "संबंधित उत्पाद"
    }
  },
  te: {
    nav: {
      home: "హోమ్",
      shop: "షాప్",
      about: "మా గురించి",
      craftsmanship: "హస్తకళ",
      care: "లెదర్ కేర్",
      blog: "బ్లాగ్",
      contact: "సంప్రదించండి",
      faqs: "ప్రశ్నలు"
    },
    home: {
      heroTitle: "జీవితం కోసం తయారుచేయబడింది. వారసత్వం కోసం రూపొందించబడింది.",
      heroSubtitle: "నిలకడైన ప్రీమియం చేతితో మెరుగుపెట్టిన మేక చర్మపు వస్తువుల శాశ్వత కళను అనుభవించండి.",
      shopNow: "కలెక్షన్ చూడండి",
      viewDetails: "వివరాలు చూడండి",
      featured: "ప్రత్యేక సేకరణలు",
      featuredSub: "కూరగాయల సహాయంతో పండించిన ప్యూర్ లెదర్‌తో అద్భుతమైన తయారీ.",
      loyaltyTitle: "లెగసీ క్లబ్‌లో చేరండి",
      loyaltyDesc: "ప్రతి విలాసవంతమైన కొనుగోలుపై రివార్డ్ పాయింట్లను సంపాదించండి."
    },
    cart: {
      title: "మీ కార్ట్",
      empty: "మీ కార్ట్ ఖాళీగా ఉంది.",
      checkout: "చెకౌట్ చేయండి",
      subtotal: "మొత్తం",
      add: "కార్ట్ లో చేర్చండి",
      remove: "తొలగించండి",
      coupon: "కూపన్ కోడ్",
      apply: "వర్తింపజేయి",
      points: "పాయింట్లు రిడీమ్ చేసుకోండి"
    },
    checkout: {
      title: "చెకౌట్",
      shipping: "షిప్పింగ్ చిరునామా",
      payment: "చెల్లింపు పద్ధతి",
      placeOrder: "కొనుగోలు పూర్తిచేయండి",
      fullName: "పూర్తి పేరు",
      address: "చిరునామా",
      city: "నగరం",
      postalCode: "పిన్ కోడ్",
      country: "దేశం"
    },
    product: {
      sku: "SKU",
      stock: "స్టాక్ ఉంది",
      outOfStock: "స్టాక్ లేదు",
      reviews: "సమీక్షలు",
      writeReview: "సमीక్ష రాయండి",
      boughtTogether: "తరచుగా కలిసి కొనేవి",
      related: "సంబంధిత ఉత్పత్తులు"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      shop: "ショップ",
      about: "ブランドについて",
      craftsmanship: "職人技",
      care: "レザーケア",
      blog: "ブログ",
      contact: "お問い合わせ",
      faqs: "よくある質問"
    },
    home: {
      heroTitle: "一生モノ。そして、次世代に受け継ぐレガシー。",
      heroSubtitle: "時を経ても色褪せない、最高級手染めゴートレザーが放つ職人技の極み。",
      shopNow: "コレクションを見る",
      viewDetails: "詳細を見る",
      featured: "厳選コレクション",
      featuredSub: "植物タンニン鞣しフルグレインレザーを用いた、妥協なき美しさと堅牢性。",
      loyaltyTitle: "レガシークラブに入会",
      loyaltyDesc: "すべてのご購入でリワードポイントが貯まり、限定コレクションにアクセス可能。"
    },
    cart: {
      title: "ショッピングカート",
      empty: "カートは空です。",
      checkout: "購入手続きへ",
      subtotal: "小計",
      add: "カートに追加",
      remove: "削除",
      coupon: "クーポンコード",
      apply: "適用",
      points: "ポイントを利用する"
    },
    checkout: {
      title: "チェックアウト",
      shipping: "配送先住所",
      payment: "決済方法",
      placeOrder: "注文を確定する",
      fullName: "氏名",
      address: "住所",
      city: "市区町村",
      postalCode: "郵便番号",
      country: "国"
    },
    product: {
      sku: "型番",
      stock: "在庫あり",
      outOfStock: "在庫切れ",
      reviews: "カスタマーレビュー",
      writeReview: "レビューを書く",
      boughtTogether: "よく一緒に購入されている商品",
      related: "関連商品"
    }
  },
  zh: {
    nav: {
      home: "首页",
      shop: "商店",
      about: "关于我们",
      craftsmanship: "匠心工艺",
      care: "皮革护理",
      blog: "博客",
      contact: "联系我们",
      faqs: "常见问题"
    },
    home: {
      heroTitle: "匠心筑物，传世经典。",
      heroSubtitle: "感受手磨抛光顶级山羊皮具的永恒艺术魅力，为岁月打磨而生。",
      shopNow: "探索系列",
      viewDetails: "查看详情",
      featured: "精选系列",
      featuredSub: "精选植物鞣制全粒面皮，无懈可击的手工缝线结构。",
      loyaltyTitle: "加入传世俱乐部",
      loyaltyDesc: "尊享每一笔奢华消费的积分奖励，开启私人定制系列。"
    },
    cart: {
      title: "您的购物车",
      empty: "您的购物车目前是空的。",
      checkout: "前往结账",
      subtotal: "小计",
      add: "加入购物车",
      remove: "移除",
      coupon: "优惠码",
      apply: "应用",
      points: "兑换会员积分"
    },
    checkout: {
      title: "结算",
      shipping: "收货地址",
      payment: "支付方式",
      placeOrder: "完成购买",
      fullName: "姓名",
      address: "街道地址",
      city: "城市",
      postalCode: "邮政编码",
      country: "国家"
    },
    product: {
      sku: "货号",
      stock: "有现货",
      outOfStock: "无现货",
      reviews: "用户评价",
      writeReview: "撰写评价",
      boughtTogether: "经常一起购买的商品",
      related: "相关产品"
    }
  }
};
