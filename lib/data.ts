import type { Product, Additional, Review } from "./types"

export const products: Product[] = [
  // OFERTAS DO DIA - 5 produtos selecionados
  {
    id: "5",
    name: "Heineken 330ml",
    description: "Cerveja puro malte premium em long neck",
    price: 3.63,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/178.jpg?v=1769486884",
    category: "ofertas",
    stock: 50,
    minQuantity: 6,
    includes: ["1 garrafa de 330ml"],
    accompaniments: []
  },
  {
    id: "1",
    name: "Amstel Cerveja 473ml",
    description: "Cerveja puro malte com sabor equilibrado e refrescante",
    price: 3.20,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/amstel_1fe3b8f0-2cb6-44e5-8f8e-7ea7b3835e70.jpg?v=1769489135",
    category: "ofertas",
    stock: 50,
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "2",
    name: "Cerveja Corona Coronita Extra Lager 6un 210ml",
    description: "Cerveja Corona classica, gelada e com uma fatia de limao. American Lager premium",
    price: 27.90,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/91064246b383f2d443f79f23bf15ce02.webp?v=1769488518",
    category: "ofertas",
    badge: "PACK 6UN",
    stock: 50,
    includes: ["6 garrafas de 210ml"],
    accompaniments: ["Limao"]
  },
  {
    id: "3",
    name: "Skol Beats Senses 6un 313ml",
    description: "Bebida mista com base de cerveja, sabor citrico e refrescante. Otima para festas",
    price: 27.90,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/a4f48483bbab465a4304ef1886d372ef.jpg?v=1769488484",
    category: "ofertas",
    badge: "PACK 6UN",
    stock: 50,
    includes: ["6 garrafas de 313ml"],
    accompaniments: []
  },
  {
    id: "4",
    name: "Cerveja Brahma Duplo Malte 350ml",
    description: "Cerveja com duplo malte para um sabor mais encorpado",
    price: 2.49,
    originalPrice: 4.09,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/imgi_1_image_3.jpg?v=1769488266",
    category: "ofertas",
    stock: 50,
    minQuantity: 6,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },

  // CERVEJAS (cervejas)
  {
    id: "24",
    name: "Amstel Cerveja 473ml",
    description: "Cerveja puro malte com sabor equilibrado e refrescante",
    price: 3.20,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/amstel_1fe3b8f0-2cb6-44e5-8f8e-7ea7b3835e70.jpg?v=1769489135",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "25",
    name: "Cerveja Corona Coronita Extra Lager 6un 210ml",
    description: "Cerveja Corona classica, gelada e com uma fatia de limao. American Lager premium",
    price: 27.90,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/91064246b383f2d443f79f23bf15ce02.webp?v=1769488518",
    category: "cervejas",
    badge: "PACK 6UN",
    includes: ["6 garrafas de 210ml"],
    accompaniments: ["Limao"]
  },
  {
    id: "26",
    name: "Skol Beats Senses 6un 313ml",
    description: "Bebida mista com base de cerveja, sabor citrico e refrescante. Otima para festas",
    price: 27.90,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/a4f48483bbab465a4304ef1886d372ef.jpg?v=1769488484",
    category: "cervejas",
    badge: "PACK 6UN",
    includes: ["6 garrafas de 313ml"],
    accompaniments: []
  },
  {
    id: "27",
    name: "Cerveja Brahma Duplo Malte 350ml",
    description: "Cerveja com duplo malte para um sabor mais encorpado",
    price: 2.49,
    originalPrice: 4.09,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/imgi_1_image_3.jpg?v=1769488266",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "28",
    name: "Cerveja Brahma Chopp 550ml",
    description: "A cerveja numero 1 do Brasil em versao chopp gelado",
    price: 2.39,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/imgi_1_image_2.jpg?v=1769487731",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 lata de 550ml"],
    accompaniments: []
  },
  {
    id: "29",
    name: "Cerveja Amstel Sleek 350ml",
    description: "Amstel em lata sleek, pratica e gelada",
    price: 2.49,
    originalPrice: 3.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/imgi_1_image.jpg?v=1769487611",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "30",
    name: "Cerveja Antarctica Original Pilsen 473ml",
    description: "Cerveja pilsen tradicional brasileira",
    price: 3.28,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem10_6a8b2fe1-e2f2-4a51-b38f-7d74c52e4409.png?v=1769486965",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "31",
    name: "Cerveja Stella Artois 473ml",
    description: "Cerveja belga premium com sabor sofisticado",
    price: 3.34,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem2_2dec00d2-02d8-4491-81b4-c9984891e735.png?v=1769486961",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "32",
    name: "Heineken 600ml",
    description: "Cerveja puro malte premium em garrafa grande",
    price: 3.47,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/619615-Cerveja-Heineken-650ml.jpg?v=1769486957",
    category: "cervejas",
    includes: ["1 garrafa de 600ml"],
    accompaniments: []
  },
  {
    id: "33",
    name: "Skol Puro Malte 473ml",
    description: "Cerveja puro malte da Skol, sabor leve e refrescante",
    price: 2.49,
    originalPrice: 4.09,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem30_e34272cf-8fa3-44d9-a034-ebf962b4a4fc.png?v=1769486952",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "34",
    name: "Heineken 330ml",
    description: "Cerveja puro malte premium em long neck",
    price: 3.63,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/178.jpg?v=1769486884",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 garrafa de 330ml"],
    accompaniments: []
  },
  {
    id: "35",
    name: "Itaipava 473ml",
    description: "Cerveja pilsen brasileira refrescante",
    price: 2.49,
    originalPrice: 4.10,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem13_b38c8601-04cc-4b51-aa4e-be8aa6dba3fa.jpg?v=1769486878",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "36",
    name: "Budweiser 473ml",
    description: "Cerveja americana premium, sabor marcante",
    price: 2.53,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/budw.jpg?v=1769486864",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "37",
    name: "Corona 330ml - Pack 6 garrafas",
    description: "Pack com 6 garrafas da classica cerveja mexicana",
    price: 19.19,
    originalPrice: 24.14,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/cerveja_corona_2_1.jpg?v=1769486848",
    category: "cervejas",
    badge: "PROMO",
    includes: ["6 garrafas de 330ml"],
    accompaniments: ["Limao"]
  },
  {
    id: "38",
    name: "Skol Beats Senses Long Neck 313ml",
    description: "Bebida mista citrica refrescante em long neck",
    price: 3.69,
    originalPrice: 5.79,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem1_48f492cc-7d6d-42d2-8a0b-2c342bee977d.jpg?v=1769486797",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 garrafa de 313ml"],
    accompaniments: []
  },
  {
    id: "39",
    name: "Red Bull Energy Drink 250ml - 4 unidades",
    description: "Red Bull te da asas! Energetico com cafeina, taurina e vitaminas do grupo B",
    price: 11.90,
    originalPrice: 33.96,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/352bc8bb94367ea49ebf312bf24bf842.jpg?v=1769488562",
    category: "combinados",
    badge: "PACK 4UN",
    includes: ["4 latas de 250ml"],
    accompaniments: []
  },

  // NOVAS CERVEJAS (cervejas)
  {
    id: "60",
    name: "Cerveja Imperio Ultra 275ml",
    description: "Cerveja leve e refrescante com baixo teor de gordura e sodio",
    price: 3.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/946609-400-auto.avif?v=1769742663",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 garrafa de 275ml"],
    accompaniments: []
  },
  {
    id: "61",
    name: "Cerveja Imperio Puro Malte 350ml",
    description: "Cerveja puro malte com sabor encorpado",
    price: 3.09,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/926165-400-auto.avif?v=1769742858",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "62",
    name: "Cerveja Skol Pilsen 350ml",
    description: "Cerveja pilsen crocante e refrescante",
    price: 3.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/656289-400-auto.avif?v=1769743072",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "63",
    name: "Cerveja Skol 550ml",
    description: "A cerveja que desce redondo em lata grande",
    price: 3.60,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/917455-400-auto.avif?v=1769743112",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 lata de 550ml"],
    accompaniments: []
  },
  {
    id: "64",
    name: "Cerveja Petra Puro Malte 269ml",
    description: "Cerveja puro malte premium em lata compacta",
    price: 2.39,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/926728-400-auto.avif?v=1769743155",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 269ml"],
    accompaniments: []
  },
  {
    id: "65",
    name: "Cerveja Corona Extra Sleek 350ml",
    description: "Cerveja Corona premium em lata sleek",
    price: 3.09,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/943740-400-auto.avif?v=1769743203",
    category: "cervejas",
    minQuantity: 8,
    includes: ["1 lata de 350ml"],
    accompaniments: ["Limao"]
  },
  {
    id: "66",
    name: "Cerveja Eisenbahn Pilsen 350ml",
    description: "Cerveja pilsen artesanal brasileira crocante e dourada",
    price: 3.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/926213-400-auto.avif?v=1769743235",
    category: "cervejas",
    minQuantity: 6,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "67",
    name: "Cerveja Amstel 269ml",
    description: "Cerveja puro malte em lata compacta",
    price: 3.09,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/921937-400-auto.avif?v=1769743299",
    category: "cervejas",
    minQuantity: 12,
    includes: ["1 lata de 269ml"],
    accompaniments: []
  },
  {
    id: "68",
    name: "Cerveja Heineken 269ml",
    description: "Cerveja puro malte premium em lata compacta",
    price: 3.39,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/995546-400-auto.avif?v=1769743357",
    category: "cervejas",
    minQuantity: 8,
    includes: ["1 lata de 269ml"],
    accompaniments: []
  },
  {
    id: "69",
    name: "Cerveja Itaipava 350ml",
    description: "Cerveja pilsen brasileira refrescante",
    price: 2.69,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/973371-400-auto.avif?v=1769743407",
    category: "cervejas",
    minQuantity: 8,
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "70",
    name: "Skol Zero Zero 350ml",
    description: "Cerveja sem alcool e sem acucar, sem gluten",
    price: 3.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00105144_9e5bb664-cab4-4aea-b086-a283ae29b81b.webp?v=1769743599",
    category: "cervejas",
    minQuantity: 6,
    badge: "ZERO ALCOOL",
    includes: ["1 lata de 350ml", "Sem alcool", "Sem acucar"],
    accompaniments: []
  },
  {
    id: "71",
    name: "Chopp Brahma em Lata 350ml",
    description: "O sabor do chopp Brahma na praticidade da lata",
    price: 3.20,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00020686_44ea9bcd-cf7f-47af-bbf7-51172bcf45b4.webp?v=1769743674",
    category: "cervejas",
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "72",
    name: "Stella Pure Gold 350ml",
    description: "Cerveja belga premium sem gluten, crocante e dourada",
    price: 3.59,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00027551_7f5154ab-2213-47e1-8cd5-5e1d4560fb5b.webp?v=1769743714",
    category: "cervejas",
    minQuantity: 8,
    badge: "SEM GLUTEN",
    includes: ["1 lata de 350ml", "Sem gluten"],
    accompaniments: []
  },
  {
    id: "73",
    name: "Beats Green Mix 269ml",
    description: "Bebida mista com sabor refrescante de maca verde",
    price: 3.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00098059_052b7b45-8994-4067-acee-6c1100075bd2.webp?v=1769743874",
    category: "cervejas",
    minQuantity: 8,
    includes: ["1 lata de 269ml"],
    accompaniments: []
  },
  {
    id: "74",
    name: "Beats Tropical 269ml Long Neck",
    description: "Bebida mista sabor tropical em long neck",
    price: 4.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00023435_46c24590-d73b-4ee5-932f-2430b50b8c02.webp?v=1769744043",
    category: "cervejas",
    includes: ["1 garrafa de 269ml"],
    accompaniments: []
  },
  {
    id: "75",
    name: "Beats GT 269ml Long Neck",
    description: "Bebida mista energizante em long neck",
    price: 4.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00015441_c6cd515c-d584-4fbd-8d73-dcd48cb2b296.webp?v=1769744094",
    category: "cervejas",
    includes: ["1 garrafa de 269ml"],
    accompaniments: []
  },
  {
    id: "76",
    name: "Beats Green Mix 269ml Long Neck",
    description: "Bebida mista sabor maca verde em long neck",
    price: 4.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00098060_62dae2c5-6c82-470f-8468-684bcec3c59f.webp?v=1769744206",
    category: "cervejas",
    includes: ["1 garrafa de 269ml"],
    accompaniments: []
  },

  // DESTILADOS E DRINKS FORTES (queridinhos)
  {
    id: "49",
    name: "Gin + Combo Melancia 1L (6 unidades)",
    description: "Gin com sabor melancia, refrescante e pronto para beber. Teor alcoolico 8%",
    price: 38.43,
    originalPrice: 54.90,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/img-20250113-wa0056-2aa5040058fbde1f4a17367909276814-1024-1024.webp?v=1769120814",
    category: "queridinhos",
    badge: "-30%",
    includes: ["6 garrafas de 1L", "Sabor melancia", "Pronto para beber"],
    accompaniments: ["Gelo", "Limao"]
  },
  {
    id: "50",
    name: "Vodka + Combo 1L (6 unidades)",
    description: "Vodka com sabor energetico, equilibrio perfeito entre diversao e sabor. Teor alcoolico 8%",
    price: 38.43,
    originalPrice: 54.90,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/img-20250113-wa0057-9481b9342d5d4a5dac17367908987407-1024-1024.webp?v=1769120804",
    category: "queridinhos",
    badge: "-30%",
    includes: ["6 garrafas de 1L", "Sabor energetico", "Pronto para beber"],
    accompaniments: ["Gelo"]
  },
  {
    id: "51",
    name: "Whisky + Combo 1L (6 unidades)",
    description: "Whisky com toque energetico, sabor marcante. Teor alcoolico 8%",
    price: 38.43,
    originalPrice: 54.90,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/img-20250113-wa0055-b81be437b87f0596c317367908684473-1024-1024.webp?v=1769120795",
    category: "queridinhos",
    badge: "-30%",
    includes: ["6 garrafas de 1L", "Sabor energetico", "Pronto para beber"],
    accompaniments: ["Gelo"]
  },
  {
    id: "52",
    name: "Whisky + Combo Double Darkness 1L (6 unidades)",
    description: "Versao mais intensa com teor alcoolico elevado. Teor alcoolico 10%",
    price: 38.43,
    originalPrice: 54.90,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/whisky-combo-double-darkness-50c0b27f9d998c5fad17545763653107-1024-1024.webp?v=1769120801",
    category: "queridinhos",
    badge: "-30%",
    includes: ["6 garrafas de 1L", "Sabor intenso", "10% alcool"],
    accompaniments: ["Gelo"]
  },
  {
    id: "53",
    name: "Whisky + Combo Job 1L (6 unidades)",
    description: "Whisky pronto para beber com sabor energetico",
    price: 38.43,
    originalPrice: 54.90,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/whisky-combo-job-1l-b479a979fd3eb2d80b17654683945967-1024-1024.webp?v=1769120808",
    category: "queridinhos",
    badge: "-30%",
    includes: ["6 garrafas de 1L", "Pronto para beber"],
    accompaniments: ["Gelo"]
  },
  {
    id: "40",
    name: "Tanqueray Gin Export Strength 750ml",
    description: "Gin premium London Dry com sabor classico e equilibrado",
    price: 69.90,
    originalPrice: 187.90,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem12_544c77a0-e504-46d6-8b76-9ca806a0e094.jpg?v=1769489300",
    category: "queridinhos",
    includes: ["1 garrafa de 750ml"],
    accompaniments: ["Gelo", "Tonica", "Limao"]
  },
  {
    id: "41",
    name: "Whisky Jack Daniel's 1L",
    description: "Whisky americano Tennessee, suave e com notas de caramelo e baunilha",
    price: 54.90,
    originalPrice: 188.89,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/082184090442_WHISKEY-JACK-DANIELS_02_novas.jpg?v=1769489303",
    category: "queridinhos",
    includes: ["1 garrafa de 1L"],
    accompaniments: ["Gelo", "Coca-Cola"]
  },
  {
    id: "42",
    name: "Campari 900ml",
    description: "Aperitivo italiano amargo, ideal para drinks como Negroni e Americano",
    price: 49.90,
    originalPrice: 70.49,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/318_campari_900ml.png?v=1769489310",
    category: "queridinhos",
    includes: ["1 garrafa de 900ml"],
    accompaniments: ["Gelo", "Laranja", "Tonica"]
  },
  {
    id: "43",
    name: "Smirnoff Ice Long Neck 275ml",
    description: "Bebida mista de vodka com sabor citrico, refrescante e pronta para beber",
    price: 6.99,
    originalPrice: 9.15,
    image: "https://cdn.shopify.com/s/files/1/0800/7050/8802/files/Imagem5_673c05aa-8507-43fa-8ec5-2035a65312a4.png?v=1769489390",
    category: "queridinhos",
    includes: ["1 garrafa de 275ml"],
    accompaniments: []
  },
  {
    id: "8",
    name: "Rum Montilla Carta Ouro 1L",
    description: "Rum com paladar levemente adocicado, notas de frutas secas e mel. 38%",
    price: 29.90,
    originalPrice: 37.89,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/rum-montilla-carta-ouro-1-l-1.jpg?v=1769124338",
    category: "queridinhos",
    includes: ["1 garrafa de 1L", "Envelhecido em carvalho"],
    accompaniments: ["Gelo", "Coca-Cola"]
  },
  {
    id: "9",
    name: "Vodka Absolut Vanilia 750ml",
    description: "Vodka com notas de caramelo e chocolate amargo. 38%",
    price: 49.90,
    originalPrice: 99.99,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/vodka-absolut-vanilia---750-ml-1.jpg?v=1769119757",
    category: "queridinhos",
    includes: ["1 garrafa de 750ml", "Sabor baunilha"],
    accompaniments: ["Gelo", "Café"]
  },
  {
    id: "10",
    name: "Whisky Chivas Regal 12 Anos 750ml",
    description: "Blend suave com aroma de maçã, mel e baunilha. 40%",
    price: 59.90,
    originalPrice: 89.99,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/whisky-chivas-regal-escoces-12-anos-750-ml-1.jpg?v=1769119744",
    category: "queridinhos",
    includes: ["1 garrafa de 750ml", "12 anos de maturação"],
    accompaniments: ["Gelo"]
  },
  {
    id: "11",
    name: "Whiskey Jameson Irlandês 750ml",
    description: "Whiskey triplamente destilado, suave e aromático. 40%",
    price: 54.90,
    originalPrice: 89.99,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/whiskey-jameson-irlandes---750-ml-1.jpg?v=1769119732",
    category: "queridinhos",
    includes: ["1 garrafa de 750ml", "Envelhecido 4+ anos"],
    accompaniments: ["Gelo", "Ginger Ale"]
  },
  {
    id: "12",
    name: "Whisky Johnnie Walker Red Label 1L",
    description: "Sabor intenso e vigoroso, ideal para drinks. 40%",
    price: 59.90,
    originalPrice: 89.90,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/whisky-johnnie-walker-red-label-1-l-1.jpg?v=1769119712",
    category: "queridinhos",
    includes: ["1 garrafa de 1L", "Blend escocês"],
    accompaniments: ["Gelo", "Água de coco"]
  },
  {
    id: "77",
    name: "Gin Beefeater London Dry 750ml",
    description: "Gin London Dry classico com botanicos selecionados. 40%",
    price: 65.99,
    originalPrice: 93.99,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00009277_af5f6d72-7c8d-48a4-9c62-f35f401d5a2c.webp?v=1769745316",
    category: "queridinhos",
    includes: ["1 garrafa de 750ml"],
    accompaniments: ["Gelo", "Tonica", "Limao"]
  },
  {
    id: "78",
    name: "Vodka Smirnoff 600ml",
    description: "Vodka triplamente destilada, suave e pura. 37,5%",
    price: 23.79,
    originalPrice: 29.79,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00009153_c4852c16-0d6d-4688-8a16-d0d179ad4500.webp?v=1769745370",
    category: "queridinhos",
    includes: ["1 garrafa de 600ml"],
    accompaniments: ["Gelo", "Limao"]
  },
  {
    id: "79",
    name: "Vodka Smirnoff 998ml",
    description: "Vodka triplamente destilada em garrafa grande. 37,5%",
    price: 36.40,
    originalPrice: 41.29,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00009152_ccba6af4-a8ff-4a96-8abc-17dc5b639b94.webp?v=1769745394",
    category: "queridinhos",
    includes: ["1 garrafa de 998ml"],
    accompaniments: ["Gelo", "Limao"]
  },
  {
    id: "80",
    name: "Gin Gordons London Dry 750ml",
    description: "Gin London Dry com junipero e botanicos cuidadosamente selecionados. 37,5%",
    price: 55.29,
    originalPrice: 75.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00009193_45db3497-b7ec-44d6-86df-df6bbc4f4579.webp?v=1769745425",
    category: "queridinhos",
    includes: ["1 garrafa de 750ml"],
    accompaniments: ["Gelo", "Tonica", "Pepino"]
  },
  {
    id: "81",
    name: "Vodka Absolut Original 1L",
    description: "Vodka sueca premium feita com trigo de inverno. 40%",
    price: 66.99,
    originalPrice: 112.99,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00009156_c9844287-a7f4-469b-b605-79c537670e62.webp?v=1769745453",
    category: "queridinhos",
    includes: ["1 garrafa de 1L"],
    accompaniments: ["Gelo", "Limao"]
  },
  {
    id: "82",
    name: "Vodka Orloff 1L",
    description: "Vodka brasileira suave e versátil para drinks. 37,5%",
    price: 28.99,
    originalPrice: 35.59,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/9487_7768157a-e9f4-4926-ba6a-a797e130e794.webp?v=1769745473",
    category: "queridinhos",
    includes: ["1 garrafa de 1L"],
    accompaniments: ["Gelo", "Limao"]
  },
  {
    id: "83",
    name: "Whisky Ballantine's Finest Blended Escoces 1L",
    description: "Whisky escoces blended com notas de mel e especiarias. 40%",
    price: 51.99,
    originalPrice: 91.99,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00009249_171e5ac9-ab1b-4b55-b81c-70d31516a6ad.webp?v=1769745501",
    category: "queridinhos",
    includes: ["1 garrafa de 1L", "Blend escocês"],
    accompaniments: ["Gelo"]
  },

  // ENERGETICOS (combinados)
  {
    id: "13",
    name: "Energético Baly Melancia Lata 473ml",
    description: "Energético refrescante sabor melancia com cafeína e taurina",
    price: 5.89,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-baly-melancia-lata-473ml-1.jpg?v=1769120715",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "14",
    name: "Energético Baly Morango e Pêssego 473ml",
    description: "Sabor morango com pêssego, delicioso e energizante",
    price: 5.89,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-de-morango-e-pessego-baly-473ml-1.jpg?v=1769120711",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "15",
    name: "Energético Baly Melancia Sem Açúcar 473ml",
    description: "Versão sem açúcar do sabor melancia",
    price: 5.89,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-baly-melancia-sem-acucar-lata-473ml-1.jpg?v=1769120706",
    category: "combinados",
    includes: ["1 lata de 473ml", "Zero açúcar"],
    accompaniments: []
  },
  {
    id: "16",
    name: "Energético Baly Maçã Verde 473ml",
    description: "Sabor maçã verde refrescante com cafeína e taurina",
    price: 5.89,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-baly-brasil-sabor-maca-verde-lata-473ml-1.jpg?v=1769120702",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "17",
    name: "Energético Baly Maçã Verde 2L",
    description: "Garrafa grande de energético maçã verde",
    price: 7.40,
    originalPrice: 12.39,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-maca-verde-baly-garrafa-2l-1.jpg?v=1769120698",
    category: "combinados",
    includes: ["1 garrafa de 2L"],
    accompaniments: []
  },
  {
    id: "18",
    name: "Energético Baly Tropical 2L",
    description: "Garrafa grande de energético sabor tropical",
    price: 7.40,
    originalPrice: 12.39,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-tropical-baly-garrafa-2-l-1.jpg?v=1769120692",
    category: "combinados",
    includes: ["1 garrafa de 2L"],
    accompaniments: []
  },
  {
    id: "19",
    name: "Energético Baly Melancia 2L",
    description: "Garrafa grande de energético sabor melancia",
    price: 7.40,
    originalPrice: 12.39,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/energetico-melancia-baly-garrafa-2-l-1.jpg?v=1769120688",
    category: "combinados",
    includes: ["1 garrafa de 2L"],
    accompaniments: []
  },
  {
    id: "97",
    name: "Red Bull Tropical Edition 250ml",
    description: "Red Bull edicao tropical com sabor de frutas exoticas",
    price: 5.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00011032_8e405f9b-1fe3-43a3-9616-256e3211c386.webp?v=1769744438",
    category: "combinados",
    includes: ["1 lata de 250ml"],
    accompaniments: []
  },
  {
    id: "98",
    name: "Red Bull Melancia 250ml",
    description: "Red Bull edicao melancia refrescante",
    price: 5.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00012306_5ea09200-c4df-4061-b23a-792311ed2178.webp?v=1769744471",
    category: "combinados",
    includes: ["1 lata de 250ml"],
    accompaniments: []
  },
  {
    id: "110",
    name: "Energético Red Bull sem Açúcar Nectarina Lata 250ml The Spring Edition",
    description: "Red Bull sem açúcar com sabor tropical de nectarina",
    price: 6.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/218279-1200-auto.webp?v=1770320023",
    category: "combinados",
    badge: "ZERO AÇÚCAR",
    includes: ["1 lata de 250ml"],
    accompaniments: []
  },
  {
    id: "111",
    name: "Energético Monster Ultra Peachy Keen Zero Açúcar Lata 473ml",
    description: "Monster Ultra com sabor pêssego, zero açúcar",
    price: 6.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/212072-600-auto.webp?v=1770320067",
    category: "combinados",
    badge: "ZERO AÇÚCAR",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "112",
    name: "Energético Juice Tropical Orange Monster Khaotic Lata 473ml",
    description: "Monster Khaotic com sabor tropical de laranja",
    price: 6.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/187013-600-auto.webp?v=1770320108",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "113",
    name: "Energético Monster Energy Ultra White Sem Açúcar 473ml",
    description: "Monster Ultra White, zero açúcar",
    price: 5.09,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/energetico-monster-energy-zero-ultra-white-lata-473ml-1.jpg?v=1770322766",
    category: "combinados",
    badge: "ZERO AÇÚCAR",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "114",
    name: "Energético Monster Energy Green 473ml",
    description: "Monster Energy clássico em lata",
    price: 5.09,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/energetico-monster-energy-lata-473ml-1.webp?v=1770322826",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "115",
    name: "Energético Baly Summer Loko Manga Lata 473ml",
    description: "Baly Summer com sabor tropical de manga",
    price: 6.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/214103-1600-auto.webp?v=1770322907",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "116",
    name: "Energético Monster Pipeline Juice Punch Lata 473ml",
    description: "Monster com sabor tropical de punch",
    price: 6.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/210169-1600-auto.webp?v=1770322943",
    category: "combinados",
    includes: ["1 lata de 473ml"],
    accompaniments: []
  },
  {
    id: "117",
    name: "Energético Machu Picchu Orgânico Ocean Citrus Lata 350ml",
    description: "Energético orgânico com sabor cítrico",
    price: 6.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/222309-600-auto.webp?v=1770322982",
    category: "combinados",
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "118",
    name: "Energético Baly Floripa Spritz Lata 250ml",
    description: "Baly com sabor refrescante de spritz",
    price: 6.49,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/215801-600-auto.webp?v=1770323017",
    category: "combinados",
    includes: ["1 lata de 250ml"],
    accompaniments: []
  },
  {
    id: "119",
    name: "Energético Baly Abacaxi com Hortelã das Galáxias Pet 2 Litros",
    description: "Baly com sabor abacaxi e hortelã em garrafa grande",
    price: 8.99,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/210857-600-auto.webp?v=1770323279",
    category: "combinados",
    includes: ["1 garrafa de 2L"],
    accompaniments: []
  },
  {
    id: "120",
    name: "Energético Baly Caipirinha Lata 250ml",
    description: "Baly com sabor caipirinha",
    price: 6.29,
    image: "https://cdn.shopify.com/s/files/1/0729/5919/7238/files/215800-600-auto.webp?v=1770323328",
    category: "combinados",
    includes: ["1 lata de 250ml"],
    accompaniments: []
  },

  // REFRIGERANTES (temaki)
  {
    id: "20",
    name: "Guaraná Antarctica Sem Açúcar 1,5L",
    description: "O mesmo sabor original do Brasil, agora sem açúcar",
    price: 5.99,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/refrigerante-guarana-antarctica-sem-acucar-garrafa-15l-1.jpg?v=1769124335",
    category: "temaki",
    includes: ["1 garrafa de 1,5L", "Zero açúcar"],
    accompaniments: []
  },
  {
    id: "21",
    name: "Guaraná Antarctica Sem Açúcar Lata 350ml",
    description: "Guaraná feito com fruto da Amazônia, sem açúcar",
    price: 3.09,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/refrigerante-guarana-antarctica-sem-acucar-lata-350ml-1.jpg?v=1769124330",
    category: "temaki",
    includes: ["1 lata de 350ml", "Zero açúcar"],
    accompaniments: []
  },
  {
    id: "22",
    name: "Guaraná Antarctica Lata 350ml",
    description: "O clássico guaraná brasileiro com sabor único",
    price: 3.59,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/refrigerante-guarana-antarctica-350ml-1.jpg?v=1769124326",
    category: "temaki",
    includes: ["1 lata de 350ml"],
    accompaniments: []
  },
  {
    id: "99",
    name: "Pepsi Black 2L",
    description: "Pepsi zero acucar em garrafa grande",
    price: 5.80,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00008891_27e5d388-357e-48c9-b50d-f953a63cf087.webp?v=1769744344",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 garrafa de 2L", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "100",
    name: "Pepsi 2L",
    description: "O sabor classico da Pepsi em garrafa grande",
    price: 5.50,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00008885_5a9e7c2a-4d9b-4419-befd-e19dd7564758.webp?v=1769744386",
    category: "temaki",
    includes: ["1 garrafa de 2L"],
    accompaniments: []
  },
  {
    id: "101",
    name: "Guarana Antarctica 2L",
    description: "O classico guarana brasileiro em garrafa grande",
    price: 5.80,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00008884_91a99c52-6aad-4f1e-a91f-f8b943bbbd46.webp?v=1769744532",
    category: "temaki",
    includes: ["1 garrafa de 2L"],
    accompaniments: []
  },
  {
    id: "102",
    name: "Pepsi Black 350ml",
    description: "Pepsi zero acucar em lata",
    price: 2.80,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00008867_6a15d204-0229-4912-b00e-7e0c0dd4a62f.webp?v=1769744608",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 lata de 350ml", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "103",
    name: "Guarana Antarctica Zero 350ml",
    description: "Guarana Antarctica sem acucar em lata",
    price: 2.97,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/00008865_0da83f51-0f96-4247-9cac-1963bc60dd1c.webp?v=1769744652",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 lata de 350ml", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "104",
    name: "Refrigerante Coca-Cola Sem Acucar 200ml",
    description: "Coca-Cola zero acucar em garrafa compacta",
    price: 1.79,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/924191-400-auto.avif?v=1769750734",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 garrafa de 200ml", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "105",
    name: "Refrigerante Coca-Cola Zero Acucar 2L",
    description: "Coca-Cola zero acucar em garrafa grande",
    price: 11.79,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/911856-400-auto.avif?v=1769750763",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 garrafa de 2L", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "106",
    name: "Refrigerante Coca-Cola Zero Acucar 350ml",
    description: "Coca-Cola zero acucar em lata",
    price: 3.99,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/911854-400-auto.avif?v=1769750792",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 lata de 350ml", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "107",
    name: "Refrigerante Coca-Cola Sem Acucar 220ml",
    description: "Coca-Cola zero acucar em lata compacta",
    price: 2.79,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/927046-400-auto.avif?v=1769750823",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 lata de 220ml", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "108",
    name: "Refrigerante Coca-Cola Zero Acucar Sleek 310ml",
    description: "Coca-Cola zero acucar em lata sleek",
    price: 3.59,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/923034-400-auto.avif?v=1769750859",
    category: "temaki",
    badge: "ZERO ACUCAR",
    includes: ["1 lata de 310ml", "Zero acucar"],
    accompaniments: []
  },
  {
    id: "109",
    name: "Refrigerante Coca-Cola Sleek 310ml",
    description: "Coca-Cola original em lata sleek",
    price: 3.59,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/983001-400-auto.avif?v=1769750883",
    category: "temaki",
    includes: ["1 lata de 310ml"],
    accompaniments: []
  },

  // GELINHOS (poke)
  {
    id: "23",
    name: "Gelo Para Drink Limao Coco Leve 190g",
    description: "Gelo saborizado para deixar seu drink ainda mais especial",
    price: 3.19,
    image: "https://cdn.shopify.com/s/files/1/0709/6211/8725/files/Gelo-Para-Drink-Limao-Coco-Leve-190g.jpg?v=1769119762",
    category: "poke",
    includes: ["1 pacote de 190g", "Sabor limao com coco"],
    accompaniments: []
  },
  {
    id: "84",
    name: "Coco Leve Sabor Limao e Hortela",
    description: "Gelo saborizado refrescante com limao e hortela",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/gt.webp?v=1769742372",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "85",
    name: "Coco Leve Sabor Limao e Framboesa",
    description: "Gelo saborizado com limao e framboesa",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/red_157911fe-e65b-4aa9-9411-5545b144efea.webp?v=1769742329",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "86",
    name: "Coco Leve Sabor Frutas Citricas",
    description: "Gelo saborizado com mix de frutas citricas",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/senses.webp?v=1769742274",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "87",
    name: "Coco Leve Sabor Limao e Gengibre",
    description: "Gelo saborizado com limao e gengibre",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/xeque_mate.webp?v=1769742240",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "88",
    name: "Coco Leve Sabor Sal e Limao",
    description: "Gelo saborizado com sal e limao para drinks",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/cerveja.webp?v=1769742197",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "89",
    name: "Coco Leve Sabor Uva Verde",
    description: "Gelo saborizado com uva verde refrescante",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/uva.webp?v=1769742155",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "90",
    name: "Coco Leve Sabor Laranja",
    description: "Gelo saborizado com laranja",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/laranja.webp?v=1769742126",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "91",
    name: "Coco Leve Sabor Limao",
    description: "Gelo saborizado classico de limao",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/limao.webp?v=1769742103",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "92",
    name: "Coco Leve Sabor Melancia",
    description: "Gelo saborizado com melancia refrescante",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/Melancia.webp?v=1769742054",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "93",
    name: "Coco Leve Sabor Maracuja",
    description: "Gelo saborizado com maracuja tropical",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/maracuja.webp?v=1769741746",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "94",
    name: "Coco Leve Sabor Maca Verde",
    description: "Gelo saborizado com maca verde",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/maca.webp?v=1769741719",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "95",
    name: "Coco Leve Sabor Morango",
    description: "Gelo saborizado com morango doce",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/morango.webp?v=1769741673",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "96",
    name: "Coco Leve Sabor Coco",
    description: "Gelo saborizado classico de coco",
    price: 1.49,
    image: "https://cdn.shopify.com/s/files/1/0794/8750/0511/files/coco.webp?v=1769741610",
    category: "poke",
    includes: ["1 unidade"],
    accompaniments: []
  },

  // COMIDA
  {
    id: "100",
    name: "Batata Frita com Queijo e Bacon",
    description: "500g de batata crocante, coberta com queijo derretido e bacon no ponto certo.",
    price: 28.00,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/9.png?v=1771228564",
    category: "comida",
    includes: ["500g"],
    accompaniments: []
  },
  {
    id: "101",
    name: "Bolinho de Carne Seca com Queijo",
    description: "Sao 10 unidades de bolinhos dourados, preparados com carne seca desfiada e temperada no estilo caipira, unidos a um recheio cremoso de queijo que escorre a cada mordida.",
    price: 22.80,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/8.png?v=1771228557",
    category: "comida",
    includes: ["10 unidades"],
    accompaniments: []
  },
  {
    id: "102",
    name: "Camarao Ao Alho E Oleo",
    description: "Camaroes grelhados ao alho frito e oleo. Acompanha molho tartaro. 350 gr.",
    price: 83.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/18.png?v=1771228475",
    category: "comida",
    includes: ["350g"],
    accompaniments: ["Molho tartaro"]
  },
  {
    id: "103",
    name: "Chapa Mista G",
    description: "600g de picanha macia e suculenta, selada na chapa, acompanhada de 200g de batata frita coberta com queijo derretido e bacon crocante, alem de 200g de mandioca no ponto perfeito.",
    price: 96.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/4.png?v=1771228615",
    category: "comida",
    includes: ["600g picanha", "200g batata frita", "200g mandioca"],
    accompaniments: []
  },
  {
    id: "104",
    name: "Coxinha de Frango com Requeijao",
    description: "Sao 12 unidades de coxinha dourada e crocante, recheadas com frango desfiado temperado no estilo caseiro e um toque generoso de requeijao cremoso que derrete a cada mordida.",
    price: 25.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/3.png?v=1771228604",
    category: "comida",
    includes: ["12 unidades"],
    accompaniments: []
  },
  {
    id: "105",
    name: "Escalope de Mignon",
    description: "File mignon em corte escalope grelhado com molho ferrugem a base de vinho tinto. Acompanha arroz e batata palha caseira. Serve 3 pessoas.",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/19.png?v=1771228501",
    category: "comida",
    includes: ["Arroz", "Batata palha caseira"],
    accompaniments: ["Molho ferrugem"]
  },
  {
    id: "106",
    name: "Feijoada",
    description: "Preparada no fogo lento, como manda a tradicao, com carnes selecionadas que desmancham no paladar e temperos que contam historias em cada colherada.",
    price: 26.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/12.png?v=1771228529",
    category: "comida",
    includes: ["1 porcao"],
    accompaniments: []
  },
  {
    id: "107",
    name: "File Acebolado",
    description: "File mignon em tiras grelhadas com cebola roxa. Acompanha fritas e tomate. 500 gr.",
    price: 65.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/17.png?v=1771228467",
    category: "comida",
    includes: ["500g", "Fritas", "Tomate"],
    accompaniments: []
  },
  {
    id: "108",
    name: "File de Tilapia com Fritas",
    description: "500g de file de tilapia macio e temperado, dourado na chapa ate ganhar cor e sabor marcantes. Servido com batata frita dourada e crocante.",
    price: 61.80,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/6.png?v=1771228576",
    category: "comida",
    includes: ["500g tilapia", "Batata frita"],
    accompaniments: []
  },
  {
    id: "109",
    name: "File em Medalhao com Alcaparras",
    description: "File mignon com corte especial alto envolto em bacon, finalizado no forno com molho de queijos e alcaparras. Acompanha farofa de alho, arroz com brocolis e salada. Serve 3 pessoas.",
    price: 78.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/15.png?v=1771228424",
    category: "comida",
    includes: ["Farofa de alho", "Arroz com brocolis", "Salada"],
    accompaniments: ["Molho de queijos e alcaparras"]
  },
  {
    id: "110",
    name: "Fraldinha Mista",
    description: "450g de fraldinha macia e suculenta, preparada na chapa para selar o sabor e manter toda a suculencia. Acompanha 200g de batata frita coberta com queijo.",
    price: 86.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/1.png?v=1771228591",
    category: "comida",
    includes: ["450g fraldinha", "200g batata frita com queijo"],
    accompaniments: []
  },
  {
    id: "111",
    name: "Frango a Passarinho",
    description: "500g de frango temperado e frito ate a crocancia perfeita, no tempero da casa.",
    price: 23.49,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/11.png?v=1771228522",
    category: "comida",
    includes: ["500g"],
    accompaniments: []
  },
  {
    id: "112",
    name: "Isca de File Mignon a Parmegiana",
    description: "Isca de File Mignon empanada e frita com molho de tomate da casa e gratinada com mussarela. Acompanha batata palha. 350 gr.",
    price: 72.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/16.png?v=1771228451",
    category: "comida",
    includes: ["350g", "Batata palha"],
    accompaniments: ["Molho de tomate"]
  },
  {
    id: "113",
    name: "O`BURGER",
    description: "Pao de hamburguer, burguer bovino de 110g, presunto de alta qualidade, queijo mussarela fatiado, muito bacon sequinho, salada de alface e tomate e maionese caseira especial do Betao.",
    price: 21.00,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/13.png?v=1771228537",
    category: "comida",
    includes: ["1 unidade"],
    accompaniments: []
  },
  {
    id: "114",
    name: "Pastel de Carne com Queijo",
    description: "Sao 10 unidades de pasteis sequinhos, recheados com carne moida bem temperada e queijo derretido, no ponto certo entre o crocante e o cremoso.",
    price: 26.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/7.png?v=1771228548",
    category: "comida",
    includes: ["10 unidades"],
    accompaniments: []
  },
  {
    id: "115",
    name: "Porcao de Feijao Tropeiro 300g",
    description: "Feijao tropeiro preparado no estilo mineiro raiz, com graos macios, tempero da casa e toques de bacon e temperos que lembram cozinha de fazenda.",
    price: 21.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/2.png?v=1771228598",
    category: "comida",
    includes: ["300g"],
    accompaniments: []
  },
  {
    id: "116",
    name: "Torresmo Pururuca com Mandioca",
    description: "Crocancia e sabor em cada mordida, o classico do boteco.",
    price: 18.00,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/5.png?v=1771228626",
    category: "comida",
    includes: ["1 porcao"],
    accompaniments: ["Mandioca"]
  },
  {
    id: "117",
    name: "Tulipas com Molho Especial",
    description: "12 unidades douradas e crocantes, com o molho exclusivo do Picanha Boteco & Choperia.",
    price: 26.90,
    image: "https://cdn.shopify.com/s/files/1/0813/9089/5346/files/10.png?v=1771228516",
    category: "comida",
    includes: ["12 unidades"],
    accompaniments: ["Molho especial"]
  }
]

export const additionals: Additional[] = [
  { id: "a1", name: "Gelo Extra 1kg", quantity: "1 un", price: 0, freeOnFirstOrder: true },
  { id: "a2", name: "Copos Descartáveis", quantity: "10 un", price: 0, freeOnFirstOrder: true },
  { id: "a3", name: "Limão Fatiado", quantity: "1 un", price: 0, freeOnFirstOrder: true },
  { id: "a4", name: "Canudo Biodegradável", quantity: "5 un", price: 0, freeOnFirstOrder: true },
  { id: "a5", name: "Guardanapos", quantity: "20 un", price: 0, freeOnFirstOrder: true },
  { id: "a6", name: "Saco Térmico", quantity: "1 un", price: 0, freeOnFirstOrder: true },
]

export const reviews: Review[] = [
  { id: "r1", name: "Carlos M.", rating: 5, comment: "Bebida gelada e entrega rápida! Salvou a festa.", date: "2 dias atrás" },
  { id: "r2", name: "Ana Paula S.", rating: 5, comment: "Preços muito bons e chegou super rápido!", date: "3 dias atrás" },
  { id: "r3", name: "Henrique L.", rating: 5, comment: "Sempre peço aqui pro churrasco. Recomendo!", date: "5 dias atrás" },
  { id: "r4", name: "Marcia F.", rating: 4, comment: "Ótima variedade de bebidas. Voltarei a comprar.", date: "1 semana atrás" },
  { id: "r5", name: "Roberto N.", rating: 5, comment: "Kit Heineken pelo melhor preço da região!", date: "1 semana atrás" },
  { id: "r6", name: "Juliana C.", rating: 5, comment: "Atendimento top e entrega antes do previsto.", date: "2 semanas atrás" },
]

export const categories = [
  { id: "ofertas", name: "Ofertas do Dia" },
  { id: "cervejas", name: "Cervejas" },
  { id: "comida", name: "Comida" },
  { id: "queridinhos", name: "Destilados e Drinks Fortes" },
  { id: "combinados", name: "Energeticos" },
  { id: "temaki", name: "Refrigerantes" },
  { id: "poke", name: "Gelinhos" },
]
