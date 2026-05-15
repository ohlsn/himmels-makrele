export interface ProductVariant {
  size: string;
  color: string;
  printfulSyncVariantId: number;
  numericPrice?: number;
  displayPrice?: string;
  price?: string;
  isOutOfStock?: boolean;
}

export interface ProductSizeGuideCell {
  size: string;
  value: string;
}

export interface ProductSizeGuideRow {
  label: string;
  values: ProductSizeGuideCell[];
}

export interface ProductSizeGuideTable {
  type?: string;
  title?: string;
  unit?: string;
  sizes: string[];
  rows: ProductSizeGuideRow[];
}

export interface ProductSizeGuide {
  source: "Printful";
  availableSizes: string[];
  tables: ProductSizeGuideTable[];
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: "T-Shirt" | "Lunchbox" | "Hoodie" | "Print" | string;
  shortDescription?: string;
  description?: string;
  stripePriceId: string;
  printifyUrl?: string;

  sizes: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  sizeGuide?: ProductSizeGuide;

  // Aus Printful Catalog Title automatisch erkannt (sync-size-families.mjs).
  // Source of truth für Adult/Kids/Baby-Sizing.
  sizeFamily?: "adult" | "kids" | "baby";
  // Printful-Rohling-Titel (z.B. "Youth Classic Tee | Gildan 5000B") —
  // hilft beim Debuggen, wenn sizeFamily mal überraschend kippt.
  catalogTitle?: string;
}

// ⚠️ AUTO-SYNCED: Diese Datei wurde automatisch vom sync-catalog Skript generiert!
export const shopData: Product[] = [
  {
    "id": "prod-428001712",
    "name": "Girrafant cotton t-shirt",
    "price": "€ 29,90",
    "stripePriceId": "price_1TWv70Ivvuq0QPHzLku7Kch7",
    "category": "T-Shirt",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Dein neues Lieblings-Shirt! Hervorragende Passform, weicher Stoff und ein Design, das dich so frei wie die Himmels Makrele fühlen lässt.\n\nMaterial & Details:\n• 100 % gekämmte und ringgesponnene Premium-Baumwolle\n• Stoffgewicht: 142 g/m²\n• Vorgeschrumpftes Material für lange Formstabilität\n• Schulter-zu-Schulter-Taping und Seitennähte für idealen Sitz",
    "sizes": [
      "S"
    ],
    "colors": [
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_428001712_Weiss_972470250.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "S",
        "color": "Weiß",
        "printfulSyncVariantId": 5267030883,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
            "4XL",
            "5XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "S",
                  "value": "69"
                },
                {
                  "size": "M",
                  "value": "73"
                },
                {
                  "size": "L",
                  "value": "75"
                },
                {
                  "size": "XL",
                  "value": "77"
                },
                {
                  "size": "2XL",
                  "value": "79"
                },
                {
                  "size": "3XL",
                  "value": "81"
                },
                {
                  "size": "4XL",
                  "value": "83"
                },
                {
                  "size": "5XL",
                  "value": "84"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "S",
                  "value": ""
                },
                {
                  "size": "M",
                  "value": ""
                },
                {
                  "size": "L",
                  "value": ""
                },
                {
                  "size": "XL",
                  "value": ""
                },
                {
                  "size": "2XL",
                  "value": ""
                },
                {
                  "size": "3XL",
                  "value": ""
                },
                {
                  "size": "4XL",
                  "value": ""
                },
                {
                  "size": "5XL",
                  "value": ""
                }
              ]
            },
            {
              "label": "Sleeve length",
              "values": [
                {
                  "size": "S",
                  "value": "22.5"
                },
                {
                  "size": "M",
                  "value": "24"
                },
                {
                  "size": "L",
                  "value": "24.5"
                },
                {
                  "size": "XL",
                  "value": "25"
                },
                {
                  "size": "2XL",
                  "value": "25.5"
                },
                {
                  "size": "3XL",
                  "value": "26"
                },
                {
                  "size": "4XL",
                  "value": "26"
                },
                {
                  "size": "5XL",
                  "value": "26"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
            "4XL",
            "5XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "S",
                  "value": "69"
                },
                {
                  "size": "M",
                  "value": "73"
                },
                {
                  "size": "L",
                  "value": "75"
                },
                {
                  "size": "XL",
                  "value": "77"
                },
                {
                  "size": "2XL",
                  "value": "79"
                },
                {
                  "size": "3XL",
                  "value": "81"
                },
                {
                  "size": "4XL",
                  "value": "83"
                },
                {
                  "size": "5XL",
                  "value": "84"
                }
              ]
            },
            {
              "label": "Width",
              "values": [
                {
                  "size": "S",
                  "value": "49.5"
                },
                {
                  "size": "M",
                  "value": "53.5"
                },
                {
                  "size": "L",
                  "value": "56.5"
                },
                {
                  "size": "XL",
                  "value": "59.5"
                },
                {
                  "size": "2XL",
                  "value": "63.5"
                },
                {
                  "size": "3XL",
                  "value": "67.5"
                },
                {
                  "size": "4XL",
                  "value": "72.5"
                },
                {
                  "size": "5XL",
                  "value": "77.5"
                }
              ]
            },
            {
              "label": "Sleeve length",
              "values": [
                {
                  "size": "S",
                  "value": "22.5"
                },
                {
                  "size": "M",
                  "value": "24"
                },
                {
                  "size": "L",
                  "value": "24.5"
                },
                {
                  "size": "XL",
                  "value": "25"
                },
                {
                  "size": "2XL",
                  "value": "25.5"
                },
                {
                  "size": "3XL",
                  "value": "26"
                },
                {
                  "size": "4XL",
                  "value": "26"
                },
                {
                  "size": "5XL",
                  "value": "26"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "adult",
    "catalogTitle": "Unisex Organic Cotton Creator 2.0 T-Shirt | Stanley/Stella STTU169"
  },
  {
    "id": "prod-427646958",
    "name": "Girrafant Sweatshirt",
    "price": "€ 34,90",
    "stripePriceId": "price_1TWv71Ivvuq0QPHz26TruzvY",
    "category": "T-Shirt",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Bequemes Sweatshirt mit modernem Schnitt. Perfekt, um deine innere Himmels Makrele formschön nach außen zu tragen.\n\nMaterial & Details:\n• 50 % Baumwolle, 50 % Polyester\n• Stoffgewicht: 271,25 g/m²\n• Sportlicher Kragen, Bündchen und Taille aus Rippstrick\n• Weiches Fleece-Innenfutter für maximalen Tragekomfort",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Schwarz",
        "hex": "#000000",
        "images": [
          "/assets/shop/pf_mock_427646958_Schwarz_970606304.webp",
          "/assets/shop/prod-427646958-Black-1776018499461-94.webp",
          "/assets/shop/prod-427646958-Black-1776018499463-95.webp",
          "/assets/shop/prod-427646958-Black-1776018499464-96.webp",
          "/assets/shop/prod-427646958-Black-1776018499465-97.webp",
          "/assets/shop/prod-427646958-Black-1776018499467-98.webp",
          "/assets/shop/prod-427646958-Black-1776018499469-99.webp",
          "/assets/shop/prod-427646958-Black-1776018499471-100.webp"
        ]
      },
      {
        "name": "Marineblau",
        "hex": "#0f172a",
        "images": [
          "/assets/shop/pf_mock_427646958_Marineblau_970606307.webp",
          "/assets/shop/prod-427646958-Navy-1776018499484-108.webp",
          "/assets/shop/prod-427646958-Navy-1776018499485-109.webp",
          "/assets/shop/prod-427646958-Navy-1776018499487-110.webp",
          "/assets/shop/prod-427646958-Navy-1776018499489-111.webp",
          "/assets/shop/prod-427646958-Navy-1776018499491-112.webp",
          "/assets/shop/prod-427646958-Navy-1776018499492-113.webp",
          "/assets/shop/prod-427646958-Navy-1776018499494-114.webp"
        ]
      },
      {
        "name": "Dunkelgrau",
        "hex": "#334155",
        "images": [
          "/assets/shop/pf_mock_427646958_Dunkelgrau_970606308.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499473-101.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499474-102.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499476-103.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499477-104.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499479-105.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499480-106.webp",
          "/assets/shop/prod-427646958-Dark_Heather-1776018499482-107.webp"
        ]
      },
      {
        "name": "Königsblau",
        "hex": "#2563eb",
        "images": [
          "/assets/shop/pf_mock_427646958_Koenigsblau_970606310.webp",
          "/assets/shop/prod-427646958-Royal-1776018499496-115.webp",
          "/assets/shop/prod-427646958-Royal-1776018499497-116.webp",
          "/assets/shop/prod-427646958-Royal-1776018499499-117.webp",
          "/assets/shop/prod-427646958-Royal-1776018499500-118.webp",
          "/assets/shop/prod-427646958-Royal-1776018499501-119.webp",
          "/assets/shop/prod-427646958-Royal-1776018499502-120.webp",
          "/assets/shop/prod-427646958-Royal-1776018499504-121.webp"
        ]
      },
      {
        "name": "Sportgrau",
        "hex": "#94a3b8",
        "images": [
          "/assets/shop/pf_mock_427646958_Sportgrau_970606313.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499506-122.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499507-123.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499508-124.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499509-125.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499512-126.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499514-127.webp",
          "/assets/shop/prod-427646958-Sport_Grey-1776018499516-128.webp"
        ]
      },
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427646958_Weiss_970606315.webp",
          "/assets/shop/prod-427646958-White-1776018499518-129.webp",
          "/assets/shop/prod-427646958-White-1776018499519-130.webp",
          "/assets/shop/prod-427646958-White-1776018499521-131.webp",
          "/assets/shop/prod-427646958-White-1776018499522-132.webp",
          "/assets/shop/prod-427646958-White-1776018499523-133.webp",
          "/assets/shop/prod-427646958-White-1776018499524-134.webp",
          "/assets/shop/prod-427646958-White-1776018499526-135.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "XS",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263780361,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263780363,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263780364,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263780365,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263780367,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263780368,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263780370,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263780371,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263780373,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263780374,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263780375,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263780377,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263780378,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263780380,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263780381,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263780383,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263780384,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263780385,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263780386,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263780387,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263780388,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263780389,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263780390,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263780391,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263780392,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Weiß",
        "printfulSyncVariantId": 5263780393,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Weiß",
        "printfulSyncVariantId": 5263780394,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263780395,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Weiß",
        "printfulSyncVariantId": 5263780396,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Weiß",
        "printfulSyncVariantId": 5263780397,
        "price": "€ 34,90",
        "numericPrice": 3490,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "50"
                },
                {
                  "size": "S",
                  "value": "54"
                },
                {
                  "size": "M",
                  "value": "57"
                },
                {
                  "size": "L",
                  "value": "61"
                },
                {
                  "size": "XL",
                  "value": "65"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            },
            {
              "label": "Sleeve Length",
              "values": [
                {
                  "size": "XS",
                  "value": "60"
                },
                {
                  "size": "S",
                  "value": "67"
                },
                {
                  "size": "M",
                  "value": "70"
                },
                {
                  "size": "L",
                  "value": "77"
                },
                {
                  "size": "XL",
                  "value": "84"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "50"
                },
                {
                  "size": "S",
                  "value": "54"
                },
                {
                  "size": "M",
                  "value": "57"
                },
                {
                  "size": "L",
                  "value": "61"
                },
                {
                  "size": "XL",
                  "value": "65"
                }
              ]
            },
            {
              "label": "Width",
              "values": [
                {
                  "size": "XS",
                  "value": "41"
                },
                {
                  "size": "S",
                  "value": "43"
                },
                {
                  "size": "M",
                  "value": "46"
                },
                {
                  "size": "L",
                  "value": "48"
                },
                {
                  "size": "XL",
                  "value": "51"
                }
              ]
            },
            {
              "label": "Sleeve Length",
              "values": [
                {
                  "size": "XS",
                  "value": "60"
                },
                {
                  "size": "S",
                  "value": "67"
                },
                {
                  "size": "M",
                  "value": "70"
                },
                {
                  "size": "L",
                  "value": "77"
                },
                {
                  "size": "XL",
                  "value": "84"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "kids",
    "catalogTitle": "Youth Crew Neck Sweatshirt | Gildan 18000B"
  },
  {
    "id": "prod-427646662",
    "name": "Youth classic tee",
    "price": "€ 24,90",
    "stripePriceId": "price_1TWv72Ivvuq0QPHzLVY8gMM6",
    "category": "T-Shirt",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Auch für die kleinsten Makrelen: Superweich, gemütlich und perfekt zum Toben in der großen weiten Welt.\n\nMaterial & Details:\n• 100 % weiche, ringgesponnene (Bio-)Baumwolle (Meliert enthält Polyesteranteile)\n• Besonders hautfreundlich und komfortabel\n• Hervorragende Passform auch nach dem Waschen\n• Verstärkte Nähte für extra Langlebigkeit",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Schwarz",
        "hex": "#000000",
        "images": [
          "/assets/shop/pf_mock_427646662_Schwarz_970604984.webp",
          "/assets/shop/prod-427646662-Black-1776018499344-22.webp",
          "/assets/shop/prod-427646662-Black-1776018499345-23.webp",
          "/assets/shop/prod-427646662-Black-1776018499346-24.webp",
          "/assets/shop/prod-427646662-Black-1776018499348-25.webp",
          "/assets/shop/prod-427646662-Black-1776018499349-26.webp",
          "/assets/shop/prod-427646662-Black-1776018499350-27.webp",
          "/assets/shop/prod-427646662-Black-1776018499351-28.webp",
          "/assets/shop/prod-427646662-Black-1776018499353-29.webp",
          "/assets/shop/prod-427646662-Black-1776018499355-30.webp",
          "/assets/shop/prod-427646662-Black-1776018499357-31.webp",
          "/assets/shop/prod-427646662-Black-1776018499359-32.webp",
          "/assets/shop/prod-427646662-Black-1776018499360-33.webp",
          "/assets/shop/prod-427646662-Black-1776019015802-0.webp",
          "/assets/shop/prod-427646662-Black-1776019015803-1.webp",
          "/assets/shop/prod-427646662-Black-1776019015803-2.webp",
          "/assets/shop/prod-427646662-Black-1776019015804-3.webp",
          "/assets/shop/prod-427646662-Black-1776019015805-4.webp",
          "/assets/shop/prod-427646662-Black-1776019015805-5.webp",
          "/assets/shop/prod-427646662-Black-1776019015806-6.webp",
          "/assets/shop/prod-427646662-Black-1776019015807-7.webp",
          "/assets/shop/prod-427646662-Black-1776019015808-8.webp",
          "/assets/shop/prod-427646662-Black-1776019015809-10.webp",
          "/assets/shop/prod-427646662-Black-1776019015809-9.webp",
          "/assets/shop/prod-427646662-Black-1776019015810-11.webp"
        ]
      },
      {
        "name": "Marineblau",
        "hex": "#0f172a",
        "images": [
          "/assets/shop/pf_mock_427646662_Marineblau_970604985.webp",
          "/assets/shop/prod-427646662-Navy-1776018499383-46.webp",
          "/assets/shop/prod-427646662-Navy-1776018499385-47.webp",
          "/assets/shop/prod-427646662-Navy-1776018499386-48.webp",
          "/assets/shop/prod-427646662-Navy-1776018499387-49.webp",
          "/assets/shop/prod-427646662-Navy-1776018499388-50.webp",
          "/assets/shop/prod-427646662-Navy-1776018499390-51.webp",
          "/assets/shop/prod-427646662-Navy-1776018499391-52.webp",
          "/assets/shop/prod-427646662-Navy-1776018499393-53.webp",
          "/assets/shop/prod-427646662-Navy-1776018499395-54.webp",
          "/assets/shop/prod-427646662-Navy-1776018499397-55.webp",
          "/assets/shop/prod-427646662-Navy-1776018499399-56.webp",
          "/assets/shop/prod-427646662-Navy-1776018499400-57.webp",
          "/assets/shop/prod-427646662-Navy-1776019015820-24.webp",
          "/assets/shop/prod-427646662-Navy-1776019015820-25.webp",
          "/assets/shop/prod-427646662-Navy-1776019015821-26.webp",
          "/assets/shop/prod-427646662-Navy-1776019015821-27.webp",
          "/assets/shop/prod-427646662-Navy-1776019015821-28.webp",
          "/assets/shop/prod-427646662-Navy-1776019015822-29.webp",
          "/assets/shop/prod-427646662-Navy-1776019015822-30.webp",
          "/assets/shop/prod-427646662-Navy-1776019015823-31.webp",
          "/assets/shop/prod-427646662-Navy-1776019015824-32.webp",
          "/assets/shop/prod-427646662-Navy-1776019015825-33.webp",
          "/assets/shop/prod-427646662-Navy-1776019015825-34.webp",
          "/assets/shop/prod-427646662-Navy-1776019015826-35.webp"
        ]
      },
      {
        "name": "Königsblau",
        "hex": "#2563eb",
        "images": [
          "/assets/shop/pf_mock_427646662_Koenigsblau_970604988.webp",
          "/assets/shop/prod-427646662-Royal-1776018499402-58.webp",
          "/assets/shop/prod-427646662-Royal-1776018499403-59.webp",
          "/assets/shop/prod-427646662-Royal-1776018499405-60.webp",
          "/assets/shop/prod-427646662-Royal-1776018499406-61.webp",
          "/assets/shop/prod-427646662-Royal-1776018499408-62.webp",
          "/assets/shop/prod-427646662-Royal-1776018499409-63.webp",
          "/assets/shop/prod-427646662-Royal-1776018499410-64.webp",
          "/assets/shop/prod-427646662-Royal-1776018499413-65.webp",
          "/assets/shop/prod-427646662-Royal-1776018499414-66.webp",
          "/assets/shop/prod-427646662-Royal-1776018499417-67.webp",
          "/assets/shop/prod-427646662-Royal-1776018499419-68.webp",
          "/assets/shop/prod-427646662-Royal-1776018499420-69.webp",
          "/assets/shop/prod-427646662-Royal-1776019015827-36.webp",
          "/assets/shop/prod-427646662-Royal-1776019015828-37.webp",
          "/assets/shop/prod-427646662-Royal-1776019015828-38.webp",
          "/assets/shop/prod-427646662-Royal-1776019015829-39.webp",
          "/assets/shop/prod-427646662-Royal-1776019015829-40.webp",
          "/assets/shop/prod-427646662-Royal-1776019015830-41.webp",
          "/assets/shop/prod-427646662-Royal-1776019015830-42.webp",
          "/assets/shop/prod-427646662-Royal-1776019015831-43.webp",
          "/assets/shop/prod-427646662-Royal-1776019015831-44.webp",
          "/assets/shop/prod-427646662-Royal-1776019015832-45.webp",
          "/assets/shop/prod-427646662-Royal-1776019015833-46.webp",
          "/assets/shop/prod-427646662-Royal-1776019015833-47.webp"
        ]
      },
      {
        "name": "Sportgrau",
        "hex": "#94a3b8",
        "images": [
          "/assets/shop/pf_mock_427646662_Sportgrau_970604989.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499422-70.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499424-71.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499425-72.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499426-73.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499427-74.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499429-75.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499430-76.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499432-77.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499434-78.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499436-79.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499438-80.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776018499439-81.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015834-48.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015835-49.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015835-50.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015835-51.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015836-52.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015836-53.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015837-54.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015837-55.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015838-56.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015838-57.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015839-58.webp",
          "/assets/shop/prod-427646662-Sport_Grey-1776019015839-59.webp"
        ]
      },
      {
        "name": "Hellrosa",
        "hex": "#fbcfe8",
        "images": [
          "/assets/shop/pf_mock_427646662_Hellrosa_970604990.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499362-34.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499363-35.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499365-36.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499366-37.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499368-38.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499369-39.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499371-40.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499373-41.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499375-42.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499377-43.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499380-44.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776018499381-45.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015811-12.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015812-13.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015812-14.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015813-15.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015814-16.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015814-17.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015815-18.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015816-19.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015816-20.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015817-21.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015818-22.webp",
          "/assets/shop/prod-427646662-Light_Pink-1776019015819-23.webp"
        ]
      },
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427646662_Weiss_970604991.webp",
          "/assets/shop/prod-427646662-White-1776018499442-82.webp",
          "/assets/shop/prod-427646662-White-1776018499443-83.webp",
          "/assets/shop/prod-427646662-White-1776018499444-84.webp",
          "/assets/shop/prod-427646662-White-1776018499445-85.webp",
          "/assets/shop/prod-427646662-White-1776018499446-86.webp",
          "/assets/shop/prod-427646662-White-1776018499448-87.webp",
          "/assets/shop/prod-427646662-White-1776018499449-88.webp",
          "/assets/shop/prod-427646662-White-1776018499451-89.webp",
          "/assets/shop/prod-427646662-White-1776018499453-90.webp",
          "/assets/shop/prod-427646662-White-1776018499456-91.webp",
          "/assets/shop/prod-427646662-White-1776018499458-92.webp",
          "/assets/shop/prod-427646662-White-1776018499459-93.webp",
          "/assets/shop/prod-427646662-White-1776019015840-60.webp",
          "/assets/shop/prod-427646662-White-1776019015841-61.webp",
          "/assets/shop/prod-427646662-White-1776019015841-62.webp",
          "/assets/shop/prod-427646662-White-1776019015842-63.webp",
          "/assets/shop/prod-427646662-White-1776019015842-64.webp",
          "/assets/shop/prod-427646662-White-1776019015842-65.webp",
          "/assets/shop/prod-427646662-White-1776019015843-66.webp",
          "/assets/shop/prod-427646662-White-1776019015844-67.webp",
          "/assets/shop/prod-427646662-White-1776019015844-68.webp",
          "/assets/shop/prod-427646662-White-1776019015844-69.webp",
          "/assets/shop/prod-427646662-White-1776019015845-70.webp",
          "/assets/shop/prod-427646662-White-1776019015846-71.webp",
          "/assets/shop/prod-427646662-White-1776019015846-72.webp",
          "/assets/shop/prod-427646662-White-1776019015847-73.webp",
          "/assets/shop/prod-427646662-White-1776019015847-74.webp",
          "/assets/shop/prod-427646662-White-1776019015848-75.webp",
          "/assets/shop/prod-427646662-White-1776019015848-76.webp",
          "/assets/shop/prod-427646662-White-1776019015849-77.webp",
          "/assets/shop/prod-427646662-White-1776019015850-78.webp",
          "/assets/shop/prod-427646662-White-1776019015850-79.webp",
          "/assets/shop/prod-427646662-White-1776019015851-80.webp",
          "/assets/shop/prod-427646662-White-1776019015851-81.webp",
          "/assets/shop/prod-427646662-White-1776019015852-82.webp",
          "/assets/shop/prod-427646662-White-1776019015852-83.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "XS",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263778515,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263778516,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263778517,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263778518,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263778519,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263778520,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263778521,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263778522,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263778523,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263778524,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263778525,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263778526,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263778527,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263778528,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263778529,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263778530,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263778531,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263778532,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263778533,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263778534,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263778535,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263778536,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263778537,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263778538,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263778539,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Weiß",
        "printfulSyncVariantId": 5263778540,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Weiß",
        "printfulSyncVariantId": 5263778541,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263778542,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Weiß",
        "printfulSyncVariantId": 5263778543,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Weiß",
        "printfulSyncVariantId": 5263778544,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "52.07"
                },
                {
                  "size": "S",
                  "value": "55.88"
                },
                {
                  "size": "M",
                  "value": "59.69"
                },
                {
                  "size": "L",
                  "value": "63.50"
                },
                {
                  "size": "XL",
                  "value": "67.31"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "A",
              "values": [
                {
                  "size": "XS",
                  "value": "52.07"
                },
                {
                  "size": "S",
                  "value": "55.88"
                },
                {
                  "size": "M",
                  "value": "59.69"
                },
                {
                  "size": "L",
                  "value": "63.50"
                },
                {
                  "size": "XL",
                  "value": "67.31"
                }
              ]
            },
            {
              "label": "B",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "kids",
    "catalogTitle": "Youth Classic Tee | Gildan 5000B"
  },
  {
    "id": "prod-427646425",
    "name": "Organic cotton kids t-shirt",
    "price": "€ 29,90",
    "stripePriceId": "price_1TWv73Ivvuq0QPHz88EUksAI",
    "category": "T-Shirt",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Auch für die kleinsten Makrelen: Superweich, gemütlich und perfekt zum Toben in der großen weiten Welt.\n\nMaterial & Details:\n• 100 % weiche, ringgesponnene (Bio-)Baumwolle (Meliert enthält Polyesteranteile)\n• Besonders hautfreundlich und komfortabel\n• Hervorragende Passform auch nach dem Waschen\n• Verstärkte Nähte für extra Langlebigkeit",
    "sizes": [
      "3-4",
      "5-6",
      "7-8",
      "9-11",
      "12-13"
    ],
    "colors": [
      {
        "name": "Schwarz",
        "hex": "#000000",
        "images": [
          "/assets/shop/pf_mock_427646425_Schwarz_970604327.webp",
          "/assets/shop/prod-427646425-Black-1776018499315-0.webp",
          "/assets/shop/prod-427646425-Black-1776018499318-1.webp",
          "/assets/shop/prod-427646425-Black-1776018499319-2.webp",
          "/assets/shop/prod-427646425-Black-1776018499321-3.webp",
          "/assets/shop/prod-427646425-Black-1776018499322-4.webp",
          "/assets/shop/prod-427646425-Black-1776018499323-5.webp",
          "/assets/shop/prod-427646425-Black-1776018499325-6.webp",
          "/assets/shop/prod-427646425-Black-1776018499326-7.webp",
          "/assets/shop/prod-427646425-Black-1776018499327-8.webp",
          "/assets/shop/prod-427646425-Black-1776018499328-9.webp",
          "/assets/shop/prod-427646425-Black-1776018499330-10.webp"
        ]
      },
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427646425_Weiss_970604329.webp",
          "/assets/shop/prod-427646425-White-1776018499331-11.webp",
          "/assets/shop/prod-427646425-White-1776018499332-12.webp",
          "/assets/shop/prod-427646425-White-1776018499333-13.webp",
          "/assets/shop/prod-427646425-White-1776018499334-14.webp",
          "/assets/shop/prod-427646425-White-1776018499336-15.webp",
          "/assets/shop/prod-427646425-White-1776018499337-16.webp",
          "/assets/shop/prod-427646425-White-1776018499338-17.webp",
          "/assets/shop/prod-427646425-White-1776018499339-18.webp",
          "/assets/shop/prod-427646425-White-1776018499340-19.webp",
          "/assets/shop/prod-427646425-White-1776018499342-20.webp",
          "/assets/shop/prod-427646425-White-1776018499343-21.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "3-4",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263776762,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "5-6",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263776763,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "7-8",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263776765,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "9-11",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263776766,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "12-13",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263776768,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "3-4",
        "color": "Weiß",
        "printfulSyncVariantId": 5263776769,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "5-6",
        "color": "Weiß",
        "printfulSyncVariantId": 5263776770,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "7-8",
        "color": "Weiß",
        "printfulSyncVariantId": 5263776772,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "9-11",
        "color": "Weiß",
        "printfulSyncVariantId": 5263776773,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      },
      {
        "size": "12-13",
        "color": "Weiß",
        "printfulSyncVariantId": 5263776774,
        "price": "€ 29,90",
        "numericPrice": 2990,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "3-4",
        "5-6",
        "7-8",
        "9-11",
        "12-13"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "3-4",
            "5-6",
            "7-8",
            "9-11",
            "12-13"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "3-4",
                  "value": "41.91"
                },
                {
                  "size": "5-6",
                  "value": "45.97"
                },
                {
                  "size": "7-8",
                  "value": "51.56"
                },
                {
                  "size": "9-11",
                  "value": "57.40"
                },
                {
                  "size": "12-13",
                  "value": "62.48"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "3-4",
                  "value": ""
                },
                {
                  "size": "5-6",
                  "value": ""
                },
                {
                  "size": "7-8",
                  "value": ""
                },
                {
                  "size": "9-11",
                  "value": ""
                },
                {
                  "size": "12-13",
                  "value": ""
                }
              ]
            },
            {
              "label": "Sleeve length",
              "values": [
                {
                  "size": "3-4",
                  "value": "11.43"
                },
                {
                  "size": "5-6",
                  "value": "12.45"
                },
                {
                  "size": "7-8",
                  "value": "14.48"
                },
                {
                  "size": "9-11",
                  "value": "16.51"
                },
                {
                  "size": "12-13",
                  "value": "18.54"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "3-4",
            "5-6",
            "7-8",
            "9-11",
            "12-13"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "3-4",
                  "value": "41.91"
                },
                {
                  "size": "5-6",
                  "value": "45.97"
                },
                {
                  "size": "7-8",
                  "value": "51.56"
                },
                {
                  "size": "9-11",
                  "value": "57.40"
                },
                {
                  "size": "12-13",
                  "value": "62.48"
                }
              ]
            },
            {
              "label": "Width",
              "values": [
                {
                  "size": "3-4",
                  "value": "33.02"
                },
                {
                  "size": "5-6",
                  "value": "35.05"
                },
                {
                  "size": "7-8",
                  "value": "37.08"
                },
                {
                  "size": "9-11",
                  "value": "40.89"
                },
                {
                  "size": "12-13",
                  "value": "43.94"
                }
              ]
            },
            {
              "label": "Sleeve length",
              "values": [
                {
                  "size": "3-4",
                  "value": "11.43"
                },
                {
                  "size": "5-6",
                  "value": "12.45"
                },
                {
                  "size": "7-8",
                  "value": "14.48"
                },
                {
                  "size": "9-11",
                  "value": "16.51"
                },
                {
                  "size": "12-13",
                  "value": "18.54"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "kids",
    "catalogTitle": "Kids Organic Cotton Mini Creator 2.0 T-Shirt | Stanley/Stella STTK184"
  },
  {
    "id": "prod-427645681",
    "name": "Girrafant Baby jersey bodysuit",
    "price": "€ 26,90",
    "stripePriceId": "price_1TWv74Ivvuq0QPHzPGnSZn1e",
    "category": "T-Shirt",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Auch für die kleinsten Makrelen: Superweich, gemütlich und perfekt zum Toben in der großen weiten Welt.\n\nMaterial & Details:\n• 100 % weiche, ringgesponnene (Bio-)Baumwolle (Meliert enthält Polyesteranteile)\n• Besonders hautfreundlich und komfortabel\n• Hervorragende Passform auch nach dem Waschen\n• Verstärkte Nähte für extra Langlebigkeit",
    "sizes": [
      "6M",
      "12M",
      "18M",
      "24M"
    ],
    "colors": [
      {
        "name": "Schwarz",
        "hex": "#000000",
        "images": [
          "/assets/shop/pf_mock_427645681_Schwarz_970601109.webp",
          "/assets/shop/prod-427645681-Black-1776104041824-0.webp",
          "/assets/shop/prod-427645681-Black-1776104041826-1.webp",
          "/assets/shop/prod-427645681-Black-1776104041828-2.webp",
          "/assets/shop/prod-427645681-Black-1776104041829-3.webp",
          "/assets/shop/prod-427645681-Black-1776104041830-4.webp",
          "/assets/shop/prod-427645681-Black-1776104041831-5.webp",
          "/assets/shop/prod-427645681-Black-1776104041831-6.webp"
        ]
      },
      {
        "name": "Königsblau",
        "hex": "#2563eb",
        "images": [
          "/assets/shop/pf_mock_427645681_Koenigsblau_970601110.webp",
          "/assets/shop/prod-427645681-Royal-1776104041832-7.webp",
          "/assets/shop/prod-427645681-Royal-1776104041832-8.webp",
          "/assets/shop/prod-427645681-Royal-1776104041833-9.webp",
          "/assets/shop/prod-427645681-Royal-1776104041834-10.webp",
          "/assets/shop/prod-427645681-Royal-1776104041834-11.webp",
          "/assets/shop/prod-427645681-Royal-1776104041835-12.webp",
          "/assets/shop/prod-427645681-Royal-1776104041836-13.webp"
        ]
      },
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427645681_Weiss_970601111.webp",
          "/assets/shop/prod-427645681-White-1776104041837-14.webp",
          "/assets/shop/prod-427645681-White-1776104041838-15.webp",
          "/assets/shop/prod-427645681-White-1776104041838-16.webp",
          "/assets/shop/prod-427645681-White-1776104041839-17.webp",
          "/assets/shop/prod-427645681-White-1776104041839-18.webp",
          "/assets/shop/prod-427645681-White-1776104041840-19.webp",
          "/assets/shop/prod-427645681-White-1776104041841-20.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "6M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263772027,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": true
      },
      {
        "size": "12M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263772028,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "18M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263772029,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "24M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263772030,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "6M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263772031,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": true
      },
      {
        "size": "12M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263772032,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "18M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263772033,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "24M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263772034,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "6M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263772035,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": true
      },
      {
        "size": "12M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263772036,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "18M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263772037,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      },
      {
        "size": "24M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263772038,
        "price": "€ 26,90",
        "numericPrice": 2690,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "6M",
        "12M",
        "18M",
        "24M"
      ],
      "tables": [
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "6M",
            "12M",
            "18M",
            "24M"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "6M",
                  "value": "29.85"
                },
                {
                  "size": "12M",
                  "value": "32.39"
                },
                {
                  "size": "18M",
                  "value": "34.93"
                },
                {
                  "size": "24M",
                  "value": "37.47"
                }
              ]
            },
            {
              "label": "Width",
              "values": [
                {
                  "size": "6M",
                  "value": "22.86"
                },
                {
                  "size": "12M",
                  "value": "25.40"
                },
                {
                  "size": "18M",
                  "value": "27.94"
                },
                {
                  "size": "24M",
                  "value": "30.48"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "baby",
    "catalogTitle": "Baby Jersey Bodysuit | Rabbit Skins 4424"
  },
  {
    "id": "prod-427645374",
    "name": "Wolf T-Shirt",
    "price": "€ 24,90",
    "stripePriceId": "price_1TWv75Ivvuq0QPHzeC3sYuyT",
    "category": "T-Shirt",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Dein neues Lieblings-Shirt! Hervorragende Passform, weicher Stoff und ein Design, das dich so frei wie die Himmels Makrele fühlen lässt.\n\nMaterial & Details:\n• 100 % gekämmte und ringgesponnene Premium-Baumwolle\n• Stoffgewicht: 142 g/m²\n• Vorgeschrumpftes Material für lange Formstabilität\n• Schulter-zu-Schulter-Taping und Seitennähte für idealen Sitz",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427645374_Weiss_970600346.webp",
          "/assets/shop/prod-427645374-White-1776103503195-0.webp",
          "/assets/shop/prod-427645374-White-1776103503198-1.webp",
          "/assets/shop/prod-427645374-White-1776103503200-2.webp",
          "/assets/shop/prod-427645374-White-1776103503202-3.webp",
          "/assets/shop/prod-427645374-White-1776103503203-4.webp",
          "/assets/shop/prod-427645374-White-1776103503204-5.webp",
          "/assets/shop/prod-427645374-White-1776103503206-6.webp",
          "/assets/shop/prod-427645374-White-1776103503208-7.webp",
          "/assets/shop/prod-427645374-White-1776103503210-8.webp",
          "/assets/shop/prod-427645374-White-1776103503212-9.webp",
          "/assets/shop/prod-427645374-White-1776103503213-10.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "XS",
        "color": "Weiß",
        "printfulSyncVariantId": 5263769656,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Weiß",
        "printfulSyncVariantId": 5263769657,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263769658,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Weiß",
        "printfulSyncVariantId": 5263769659,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Weiß",
        "printfulSyncVariantId": 5263769660,
        "price": "€ 24,90",
        "numericPrice": 2490,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "52.07"
                },
                {
                  "size": "S",
                  "value": "55.88"
                },
                {
                  "size": "M",
                  "value": "59.69"
                },
                {
                  "size": "L",
                  "value": "63.50"
                },
                {
                  "size": "XL",
                  "value": "67.31"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "A",
              "values": [
                {
                  "size": "XS",
                  "value": "52.07"
                },
                {
                  "size": "S",
                  "value": "55.88"
                },
                {
                  "size": "M",
                  "value": "59.69"
                },
                {
                  "size": "L",
                  "value": "63.50"
                },
                {
                  "size": "XL",
                  "value": "67.31"
                }
              ]
            },
            {
              "label": "B",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "kids",
    "catalogTitle": "Youth Classic Tee | Gildan 5000B"
  },
  {
    "id": "prod-427644473",
    "name": "Girrafant Hoodie",
    "price": "€ 39,90",
    "stripePriceId": "price_1TWv76Ivvuq0QPHzRljYVdgX",
    "category": "Hoodie",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Kuscheliger, hochwertiger Hoodie für kalte Tage und freie Gedanken. Aus weicher, langlebiger Qualität gefertigt, verleiht er dir echte Makrelen-Vibes.\n\nMaterial & Details:\n• 50 % vorgeschrumpfte Baumwolle, 50 % Polyester\n• Stoffgewicht: 271,25 g/m²\n• Weiches Fleecematerial innen\n• Doppelt gefütterte Kapuze mit farblich passendem Kordelzug\n• Praktische Kängurutasche auf der Vorderseite",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Schwarz",
        "hex": "#000000",
        "images": [
          "/assets/shop/pf_mock_427644473_Schwarz_970597730.webp",
          "/assets/shop/prod-427644473-Black-1776019015853-84.webp",
          "/assets/shop/prod-427644473-Black-1776019015854-85.webp",
          "/assets/shop/prod-427644473-Black-1776019015855-86.webp",
          "/assets/shop/prod-427644473-Black-1776019015856-87.webp",
          "/assets/shop/prod-427644473-Black-1776019015856-88.webp",
          "/assets/shop/prod-427644473-Black-1776019015857-89.webp",
          "/assets/shop/prod-427644473-Black-1776019015857-90.webp",
          "/assets/shop/prod-427644473-Black-1776019015858-91.webp",
          "/assets/shop/prod-427644473-Black-1776019015859-92.webp",
          "/assets/shop/prod-427644473-Black-1776019015859-93.webp",
          "/assets/shop/prod-427644473-Black-1776019015859-94.webp",
          "/assets/shop/prod-427644473-Black-1776019015860-95.webp",
          "/assets/shop/prod-427644473-Black-1776019015860-96.webp",
          "/assets/shop/prod-427644473-Black-1776019015861-97.webp"
        ]
      },
      {
        "name": "Marineblau",
        "hex": "#0f172a",
        "images": [
          "/assets/shop/pf_mock_427644473_Marineblau_970597731.webp",
          "/assets/shop/prod-427644473-Navy-1776019015913-140.webp",
          "/assets/shop/prod-427644473-Navy-1776019015914-141.webp",
          "/assets/shop/prod-427644473-Navy-1776019015915-142.webp",
          "/assets/shop/prod-427644473-Navy-1776019015916-143.webp",
          "/assets/shop/prod-427644473-Navy-1776019015918-144.webp",
          "/assets/shop/prod-427644473-Navy-1776019015919-145.webp",
          "/assets/shop/prod-427644473-Navy-1776019015921-146.webp",
          "/assets/shop/prod-427644473-Navy-1776019015922-147.webp",
          "/assets/shop/prod-427644473-Navy-1776019015925-148.webp",
          "/assets/shop/prod-427644473-Navy-1776019015926-149.webp",
          "/assets/shop/prod-427644473-Navy-1776019015927-150.webp",
          "/assets/shop/prod-427644473-Navy-1776019015928-151.webp",
          "/assets/shop/prod-427644473-Navy-1776019015929-152.webp",
          "/assets/shop/prod-427644473-Navy-1776019015932-153.webp"
        ]
      },
      {
        "name": "Dunkelgrau",
        "hex": "#334155",
        "images": [
          "/assets/shop/pf_mock_427644473_Dunkelgrau_970597732.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015873-112.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015874-113.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015876-114.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015876-115.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015879-116.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015879-117.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015881-118.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015882-119.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015884-120.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015887-121.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015888-122.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015889-123.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015890-124.webp",
          "/assets/shop/prod-427644473-Dark_Heather-1776019015892-125.webp"
        ]
      },
      {
        "name": "Königsblau",
        "hex": "#2563eb",
        "images": [
          "/assets/shop/pf_mock_427644473_Koenigsblau_970597733.webp",
          "/assets/shop/prod-427644473-Royal-1776019015933-154.webp",
          "/assets/shop/prod-427644473-Royal-1776019015934-155.webp",
          "/assets/shop/prod-427644473-Royal-1776019015935-156.webp",
          "/assets/shop/prod-427644473-Royal-1776019015937-157.webp",
          "/assets/shop/prod-427644473-Royal-1776019015939-158.webp",
          "/assets/shop/prod-427644473-Royal-1776019015940-159.webp",
          "/assets/shop/prod-427644473-Royal-1776019015941-160.webp",
          "/assets/shop/prod-427644473-Royal-1776019015944-161.webp",
          "/assets/shop/prod-427644473-Royal-1776019015945-162.webp",
          "/assets/shop/prod-427644473-Royal-1776019015946-163.webp",
          "/assets/shop/prod-427644473-Royal-1776019015948-164.webp",
          "/assets/shop/prod-427644473-Royal-1776019015948-165.webp",
          "/assets/shop/prod-427644473-Royal-1776019015949-166.webp",
          "/assets/shop/prod-427644473-Royal-1776019015950-167.webp"
        ]
      },
      {
        "name": "Carolina Blau",
        "hex": "#7badd8",
        "images": [
          "/assets/shop/pf_mock_427644473_Carolina_Blau_970597735.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015862-100.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015862-98.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015862-99.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015863-101.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015863-102.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015864-103.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015865-104.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015866-105.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015868-106.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015869-107.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015869-108.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015870-109.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015870-110.webp",
          "/assets/shop/prod-427644473-Carolina_Blue-1776019015872-111.webp"
        ]
      },
      {
        "name": "Hellrosa",
        "hex": "#fbcfe8",
        "images": [
          "/assets/shop/pf_mock_427644473_Hellrosa_970597736.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015893-126.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015894-127.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015895-128.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015897-129.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015898-130.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015900-131.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015901-132.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015903-133.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015905-134.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015907-135.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015908-136.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015909-137.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015910-138.webp",
          "/assets/shop/prod-427644473-Light_Pink-1776019015911-139.webp"
        ]
      },
      {
        "name": "Sportgrau",
        "hex": "#94a3b8",
        "images": [
          "/assets/shop/pf_mock_427644473_Sportgrau_970597737.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015950-168.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015951-169.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015951-170.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015952-171.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015952-172.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015953-173.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015954-174.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015954-175.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015955-176.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015956-177.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015956-178.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015956-179.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015957-180.webp",
          "/assets/shop/prod-427644473-Sport_Grey-1776019015957-181.webp"
        ]
      },
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427644473_Weiss_970597738.webp",
          "/assets/shop/prod-427644473-White-1776019015958-182.webp",
          "/assets/shop/prod-427644473-White-1776019015958-183.webp",
          "/assets/shop/prod-427644473-White-1776019015958-184.webp",
          "/assets/shop/prod-427644473-White-1776019015959-185.webp",
          "/assets/shop/prod-427644473-White-1776019015959-186.webp",
          "/assets/shop/prod-427644473-White-1776019015960-187.webp",
          "/assets/shop/prod-427644473-White-1776019015960-188.webp",
          "/assets/shop/prod-427644473-White-1776019015961-189.webp",
          "/assets/shop/prod-427644473-White-1776019015961-190.webp",
          "/assets/shop/prod-427644473-White-1776019015962-191.webp",
          "/assets/shop/prod-427644473-White-1776019015962-192.webp",
          "/assets/shop/prod-427644473-White-1776019015962-193.webp",
          "/assets/shop/prod-427644473-White-1776019015963-194.webp",
          "/assets/shop/prod-427644473-White-1776019015963-195.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "XS",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263763761,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263763762,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263763763,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263763764,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Schwarz",
        "printfulSyncVariantId": 5263763765,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263763766,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263763767,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263763768,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263763769,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Marineblau",
        "printfulSyncVariantId": 5263763770,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263763771,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263763772,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263763773,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263763774,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Dunkelgrau",
        "printfulSyncVariantId": 5263763775,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263763776,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263763777,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263763778,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263763780,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Königsblau",
        "printfulSyncVariantId": 5263763781,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Carolina Blau",
        "printfulSyncVariantId": 5263763782,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Carolina Blau",
        "printfulSyncVariantId": 5263763783,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Carolina Blau",
        "printfulSyncVariantId": 5263763784,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Carolina Blau",
        "printfulSyncVariantId": 5263763785,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Carolina Blau",
        "printfulSyncVariantId": 5263763786,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263763787,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263763788,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263763789,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263763790,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Hellrosa",
        "printfulSyncVariantId": 5263763791,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263763792,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263763793,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263763794,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263763795,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Sportgrau",
        "printfulSyncVariantId": 5263763796,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XS",
        "color": "Weiß",
        "printfulSyncVariantId": 5263763797,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Weiß",
        "printfulSyncVariantId": 5263763798,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263763799,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Weiß",
        "printfulSyncVariantId": 5263763800,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Weiß",
        "printfulSyncVariantId": 5263763801,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "50.17"
                },
                {
                  "size": "S",
                  "value": "53.98"
                },
                {
                  "size": "M",
                  "value": "57.15"
                },
                {
                  "size": "L",
                  "value": "60.96"
                },
                {
                  "size": "XL",
                  "value": "64.77"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "XS",
                  "value": ""
                },
                {
                  "size": "S",
                  "value": ""
                },
                {
                  "size": "M",
                  "value": ""
                },
                {
                  "size": "L",
                  "value": ""
                },
                {
                  "size": "XL",
                  "value": ""
                }
              ]
            },
            {
              "label": "Sleeve Length",
              "values": [
                {
                  "size": "XS",
                  "value": "59.69"
                },
                {
                  "size": "S",
                  "value": "67.31"
                },
                {
                  "size": "M",
                  "value": "70.49"
                },
                {
                  "size": "L",
                  "value": "76.84"
                },
                {
                  "size": "XL",
                  "value": "83.82"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "50.17"
                },
                {
                  "size": "S",
                  "value": "53.98"
                },
                {
                  "size": "M",
                  "value": "57.15"
                },
                {
                  "size": "L",
                  "value": "60.96"
                },
                {
                  "size": "XL",
                  "value": "64.77"
                }
              ]
            },
            {
              "label": "Width",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            },
            {
              "label": "Sleeve Length",
              "values": [
                {
                  "size": "XS",
                  "value": "59.69"
                },
                {
                  "size": "S",
                  "value": "67.31"
                },
                {
                  "size": "M",
                  "value": "70.49"
                },
                {
                  "size": "L",
                  "value": "76.84"
                },
                {
                  "size": "XL",
                  "value": "83.82"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "kids",
    "catalogTitle": "Youth Heavy Blend Hoodie | Gildan 18500B"
  },
  {
    "id": "prod-427643733",
    "name": "Wolfs Hoodie",
    "price": "€ 39,90",
    "stripePriceId": "price_1TWv77Ivvuq0QPHzaS6iG9fa",
    "category": "Hoodie",
    "shortDescription": "Original Himmels Makrele Printful Collection",
    "description": "Kuscheliger, hochwertiger Hoodie für kalte Tage und freie Gedanken. Aus weicher, langlebiger Qualität gefertigt, verleiht er dir echte Makrelen-Vibes.\n\nMaterial & Details:\n• 50 % vorgeschrumpfte Baumwolle, 50 % Polyester\n• Stoffgewicht: 271,25 g/m²\n• Weiches Fleecematerial innen\n• Doppelt gefütterte Kapuze mit farblich passendem Kordelzug\n• Praktische Kängurutasche auf der Vorderseite",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Weiß",
        "hex": "#FFFFFF",
        "images": [
          "/assets/shop/pf_mock_427643733_Weiss_970593601.webp",
          "/assets/shop/prod-427643733-White-1776104198038-0.webp",
          "/assets/shop/prod-427643733-White-1776104208636-1.webp",
          "/assets/shop/prod-427643733-White-1776104219198-2.webp",
          "/assets/shop/prod-427643733-White-1776104233911-3.webp",
          "/assets/shop/prod-427643733-White-1776104245695-4.webp",
          "/assets/shop/prod-427643733-White-1776104264069-5.webp",
          "/assets/shop/prod-427643733-White-1776104286221-6.webp",
          "/assets/shop/prod-427643733-White-1776104303021-7.webp",
          "/assets/shop/prod-427643733-White-1776104309299-8.webp",
          "/assets/shop/prod-427643733-White-1776104318460-9.webp",
          "/assets/shop/prod-427643733-White-1776104328780-10.webp",
          "/assets/shop/prod-427643733-White-1776104336108-11.webp",
          "/assets/shop/prod-427643733-White-1776104353875-12.webp",
          "/assets/shop/prod-427643733-White-1776104368881-13.webp"
        ]
      }
    ],
    "variants": [
      {
        "size": "XS",
        "color": "Weiß",
        "printfulSyncVariantId": 5263757626,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "S",
        "color": "Weiß",
        "printfulSyncVariantId": 5263757627,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "M",
        "color": "Weiß",
        "printfulSyncVariantId": 5263757628,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "L",
        "color": "Weiß",
        "printfulSyncVariantId": 5263757629,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      },
      {
        "size": "XL",
        "color": "Weiß",
        "printfulSyncVariantId": 5263757630,
        "price": "€ 39,90",
        "numericPrice": 3990,
        "isOutOfStock": false
      }
    ],
    "printifyUrl": "#",
    "sizeGuide": {
      "source": "Printful",
      "availableSizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ],
      "tables": [
        {
          "type": "measure_yourself",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "50.17"
                },
                {
                  "size": "S",
                  "value": "53.98"
                },
                {
                  "size": "M",
                  "value": "57.15"
                },
                {
                  "size": "L",
                  "value": "60.96"
                },
                {
                  "size": "XL",
                  "value": "64.77"
                }
              ]
            },
            {
              "label": "Chest",
              "values": [
                {
                  "size": "XS",
                  "value": ""
                },
                {
                  "size": "S",
                  "value": ""
                },
                {
                  "size": "M",
                  "value": ""
                },
                {
                  "size": "L",
                  "value": ""
                },
                {
                  "size": "XL",
                  "value": ""
                }
              ]
            },
            {
              "label": "Sleeve Length",
              "values": [
                {
                  "size": "XS",
                  "value": "59.69"
                },
                {
                  "size": "S",
                  "value": "67.31"
                },
                {
                  "size": "M",
                  "value": "70.49"
                },
                {
                  "size": "L",
                  "value": "76.84"
                },
                {
                  "size": "XL",
                  "value": "83.82"
                }
              ]
            }
          ]
        },
        {
          "type": "product_measure",
          "unit": "cm",
          "sizes": [
            "XS",
            "S",
            "M",
            "L",
            "XL"
          ],
          "rows": [
            {
              "label": "Length",
              "values": [
                {
                  "size": "XS",
                  "value": "50.17"
                },
                {
                  "size": "S",
                  "value": "53.98"
                },
                {
                  "size": "M",
                  "value": "57.15"
                },
                {
                  "size": "L",
                  "value": "60.96"
                },
                {
                  "size": "XL",
                  "value": "64.77"
                }
              ]
            },
            {
              "label": "Width",
              "values": [
                {
                  "size": "XS",
                  "value": "40.64"
                },
                {
                  "size": "S",
                  "value": "43.18"
                },
                {
                  "size": "M",
                  "value": "45.72"
                },
                {
                  "size": "L",
                  "value": "48.26"
                },
                {
                  "size": "XL",
                  "value": "50.80"
                }
              ]
            },
            {
              "label": "Sleeve Length",
              "values": [
                {
                  "size": "XS",
                  "value": "59.69"
                },
                {
                  "size": "S",
                  "value": "67.31"
                },
                {
                  "size": "M",
                  "value": "70.49"
                },
                {
                  "size": "L",
                  "value": "76.84"
                },
                {
                  "size": "XL",
                  "value": "83.82"
                }
              ]
            }
          ]
        }
      ]
    },
    "sizeFamily": "kids",
    "catalogTitle": "Youth Heavy Blend Hoodie | Gildan 18500B"
  }
];
