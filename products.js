/* ============================================================
   NAWAJE PERFUMES — PRODUCT DATA
   ------------------------------------------------------------
   EDIT THIS FILE to update your products.
   - name:        Product name
   - price:       Price in Naira (number only, no ₦ symbol)
   - image:       Path to product image (place images in /images)
   - category:    Category name (used for filtering)
   - description: Short product description
   - badge:       Optional label shown on the card (e.g. "Bestseller")
   - featured:    true = shown in the Featured section on homepage
   ============================================================ */

const PRODUCTS = [
  {
    id: "manjul",
    name: "Manjul",
    price: 26000,
    image: "manjul.jpg",
    category: "Surrati",
    description: "A rich, long-lasting concentrated perfume oil from Surrati Perfumes Factory, Makkah. Deep, elegant and unmistakably premium.",
    badge: "Premium",
    featured: true
  },
  {
    id: "chanse",
    name: "Chanse",
    price: 21000,
    image: "chanse.jpg",
    category: "Surrati",
    description: "A timeless fragrance of tradition. Premium concentrated oil with a bold, sophisticated character.",
    featured: true
  },
  {
    id: "iresh-leather",
    name: "Iresh Leather",
    price: 19500,
    image: "iresh-leather.jpg",
    category: "Surrati",
    description: "Bold. Rich. Masculine. A scent of true character — premium leather notes in concentrated oil form.",
    badge: "Bestseller",
    featured: true
  },
  {
    id: "dere-tmerhes",
    name: "Dere T'Merhes",
    price: 19000,
    image: "dere-tmerhes.jpg",
    category: "Surrati",
    description: "A timeless fragrance of elegance. Rich scent with a lasting impression, crafted by Surrati.",
    featured: true
  },
  {
    id: "reef",
    name: "Reef 33",
    price: 75000,
    image: "reef.jpg",
    category: "Luxury",
    description: "An exclusive luxury eau de parfum presented in a stunning gift-ready box. The pinnacle of sophistication.",
    badge: "Luxury",
    featured: true
  },
  {
    id: "atlantis",
    name: "Atlantis",
    price: 70000,
    image: "atlantis.jpg",
    category: "Luxury",
    description: "A majestic blue eau de parfum in an ornate collector's bottle. Pure luxury in every detail.",
    badge: "Luxury",
    featured: true
  },
  {
    id: "amani",
    name: "Amani",
    price: 6500,
    image: "amani.jpg",
    category: "Naseem",
    description: "Luxury attar for every moment. Soft, floral and alcohol-free concentrated perfume oil.",
    featured: true
  },
  {
    id: "mufaddal",
    name: "Mufaddal",
    price: 6500,
    image: "mufaddal.jpg",
    category: "Naseem",
    description: "A premium quality concentrated perfume oil with a warm, refined character. Long lasting fragrance.",
    featured: true
  },
  {
    id: "soft",
    name: "Soft",
    price: 6500,
    image: "soft.jpg",
    category: "Naseem",
    description: "Gentle, elegant and unforgettable. A luxury attar crafted for everyday sophistication.",
    featured: true
  },
  {
    id: "blue-horizon",
    name: "Blue Horizon",
    price: 6500,
    image: "blue-horizon.jpg",
    category: "Naseem",
    description: "Fresh and invigorating concentrated perfume oil. A clean, oceanic scent that lasts all day.",
    featured: true
  },
  {
    id: "be-sugar",
    name: "Be Sugar",
    price: 6500,
    image: "be-sugar.jpg",
    category: "Naseem",
    description: "Sweet, playful and addictive. A delightful concentrated perfume oil with a sugary warmth.",
    featured: true
  },
  {
    id: "dubai-gold",
    name: "Dubai Gold",
    price: 7000,
    image: "dubai-gold.jpg",
    category: "Almas",
    description: "Long lasting, rich fragrance with no alcohol. A golden touch of Arabian luxury.",
    badge: "Popular",
    featured: true
  },
  {
    id: "lamsa",
    name: "Lamsa",
    price: 6500,
    image: "lamsa.jpg",
    category: "Naseem",
    description: "Luxury attar with a soft, floral elegance. Pure scent, lasting impression.",
    featured: true
  },
  {
    id: "cool-weather",
    name: "Cool Weather",
    price: 7500,
    image: "cool-weather.jpg",
    category: "Almiftah",
    description: "A crisp, refreshing concentrated perfume oil. Cool, clean and effortlessly premium.",
    featured: true
  },
  {
    id: "chocolate-musk",
    name: "Chocolate Musk",
    price: 7500,
    image: "chocolate-musk.jpg",
    category: "Almas",
    description: "A delicious blend of rich chocolate and warm musk. Irresistibly smooth and long lasting.",
    featured: true
  },
  {
    id: "musk-tahara",
    name: "Musk Tahara",
    price: 7500,
    image: "musk-tahara.jpg",
    category: "Almiftah",
    description: "100% natural attar. Pure white musk — clean, soft and deeply comforting.",
    featured: true
  },
  {
    id: "pink-chiffon",
    name: "Even Pink Chiffon",
    price: 7500,
    image: "pink-chiffon.jpg",
    category: "Al Mass",
    description: "Soft, feminine, unforgettable. A luxurious pink fragrance free from alcohol.",
    featured: true
  },
  {
    id: "turkey-oud",
    name: "Turkey Oud",
    price: 7500,
    image: "turkey-oud.jpg",
    category: "Naseem",
    description: "A rich, smoky oud fragrance with Turkish character. Deep, warm and commanding.",
    featured: true
  },
  {
    id: "pares",
    name: "Pares",
    price: 7500,
    image: "pares.jpg",
    category: "Almas",
    description: "Concentrated perfume oil with a distinctive, elegant scent profile. Premium quality.",
    featured: true
  },
  {
    id: "wild-fawakiha",
    name: "Wild Fawakeh",
    price: 7500,
    image: "wild-fawakiha.jpg",
    category: "Almas",
    description: "A fruity scent that leaves a lasting impression. Fresh, vibrant and full of life.",
    featured: true
  },
  {
    id: "terry-dmehres",
    name: "Terry D'Mehres",
    price: 7500,
    image: "terry-dmehres.jpg",
    category: "Almietah",
    description: "A classic scent for modern men. Eau de parfum with timeless masculine appeal.",
    featured: true
  },
  {
    id: "bakar-joul",
    name: "Bakar Joul (Rouge 540)",
    price: 7500,
    image: "bakar-joul.jpg",
    category: "Almas",
    description: "Inspired by the iconic Rouge 540. A luxurious, warm and radiant concentrated perfume oil.",
    badge: "Trending",
    featured: true
  },
  {
    id: "bushra",
    name: "Bushra",
    price: 6500,
    image: "bushra.jpg",
    category: "Naseem",
    description: "Luxury attar for every moment. Bright, floral and beautifully long lasting.",
    featured: true
  },
  {
    id: "ameer-oud",
    name: "Ameer Al Oudh",
    price: 7500,
    image: "ameer-oud.jpg",
    category: "Almas",
    description: "A regal oud fragrance fit for royalty. Deep, warm and powerfully elegant.",
    featured: true
  }
];

/* ------------------------------------------------------------
   BUSINESS CONTACT NUMBERS
   Format: international format without "+" for wa.me links
   ------------------------------------------------------------ */
const CONTACT_NUMBERS = [
  { label: "07062359015", wa: "2347062359015", tel: "+2347062359015" },
  { label: "08035375525", wa: "2348035375525", tel: "+2348035375525" }
];
