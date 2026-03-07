// 2. BÖLÜM: GEO & SEO SCHEMA (JSON-LD)

// Hexa Dijital - 2026 GEO & SEO Yapılandırılmış Veri Kartı
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hexa Dijital",
  image: "https://hexadijital.com/assets/img/logo/logo-bg.webp",
  "@id": "https://hexadijital.com",
  url: "https://hexadijital.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bursa", // Nilüfer ibaresi kaldırıldı, tüm Bursa hedef alındı.
    addressRegion: "Marmara",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.1824, // Bursa merkez koordinatları olarak güncellendi.
    longitude: 29.0611,
  },
  areaServed: {
    "@type": "State",
    name: "Bursa", // Bursa'nın her yerinde olduğunu botlara bu etiketle söylüyoruz.
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: ["https://instagram.com/hexadijital", "https://hexadijital.com"],
  knowsAbout: [
    "Web Design",
    "Artificial Intelligence",
    "Android POS Systems Development",
    "Laravel & PHP Development",
    "UI/UX Design",
    "AI Hologram Assistant Integration",
    "Python Automation Tools",
    "Digital Agency Services",
    "Mobile Game Development",
    "E-commerce Solutions",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dijital Dönüşüm Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Özel Laravel Web Geliştirme",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Android POS ve Otomasyon Yazılımları",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Yapay Zeka Destekli Hologram Asistanlar",
        },
      },
    ],
  },
};

const script = document.createElement("script");
script.type = "application/ld+json";
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);
