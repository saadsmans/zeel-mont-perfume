import { FragranceProduct, DiscoverySample } from '../types';

export const ZELL_MONT_EMBLEM = "https://lh3.googleusercontent.com/aida/AEtjO1XjstbGU7pG0OzaBYIs6SX01Ntj-R-yk2L0UzA15ZfklR40lPhAjFZg7baiKkXZRls-21RLHWjdnU0n5xQ8aXk15pkht_YEJ3zmj9Apd1h1s1JX6Oxk0dTmKUKlcbxN7RJ6yesyLc8DW8VCfjxc2q8RBbjiafFwkzUpD6KamaiwwLADq74atNbUdgheSkc8WqEt2G6QG5522QiL7gqLtYi2eARvtsUk0drzBEc2rsRCkLofIMjTfLUtzVjX";

export const FRAGRANCES_DATA: FragranceProduct[] = [
  {
    id: 'citrus-air',
    number: '11',
    name: 'CITRUS AIR',
    subtitle: 'Calabrian Bergamot & Neroli',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Citrus',
    price: 9500,
    price50ml: 6200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR4hOuIECzlbK2wZg2lkx4wggoQqkqRbFHrVKi-LVSyj8_1Qw7CWvH68WOSNBE8_CurVrA_9BmdeUTLQNXIDZCVDRzoERQiQKzHCk5uQPdBr5M21aatODVgm7FfMQKBM9bjwPDjHvNqZh-EixONzX5gERdAByxD4KT9Vrk2hk7dgs5bpNBMo7AmPMe5Jvq_iPY0SbEebDR_ZGAxwfM3fkkwm3zRvuHyfdaz9DpIXFV9txTt9Pca2Yd-w',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCR4hOuIECzlbK2wZg2lkx4wggoQqkqRbFHrVKi-LVSyj8_1Qw7CWvH68WOSNBE8_CurVrA_9BmdeUTLQNXIDZCVDRzoERQiQKzHCk5uQPdBr5M21aatODVgm7FfMQKBM9bjwPDjHvNqZh-EixONzX5gERdAByxD4KT9Vrk2hk7dgs5bpNBMo7AmPMe5Jvq_iPY0SbEebDR_ZGAxwfM3fkkwm3zRvuHyfdaz9DpIXFV9txTt9Pca2Yd-w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ7x--nUmf_EmZkVHrxAe761oJcgyN5ryrm63TJunFMoVJhgcfexSSykFP6giakCDhk15te3SsrkohK1EDIkDtzN4aA8wFzNd-5gcpWUU8_JlDGar1oLgzC6Ngf-nrDWxOgZTioOWcjmX94u9W7wGZQR_2UMpggqk0YvZxdmydRrlC32opSb-vcB65yhy3q9FW2WKfCHo4xyucT-45IHptcQR0l3uGWQDbRIKsX9DoUULYe52iRem4tg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ2sQuGYFzqjnfTmbC6SmBrjbw8BLRtrbd6TiniRqkI_H55WqQCoH4R4PfHF7uSsRolF_Jtrl2Z4HmPl3uzhHZ_BfCRFNACru59bta-i5JCFFxNQKZagFBN0npyJRRl-NmWSkBr9VtSQsTw-uSK48Po2jUwbqtu4SPIsRGP2dwM3YOQEuomS7VKQZ83qAQxRPYhV0mDAaL3GknmiLsXZdkatR54tbTrVSK8_2iS-vk-na3Yx_HH352Sw'
    ],
    badge: 'FEATURED',
    shortDescription: 'Luminous, hyper-effervescent burst capturing crisp morning vapor lifted from chilled Mediterranean orchard groves.',
    narrative: 'Formulated as an ode to untamed daylight, Citrus Air reconciles two geographies: cold-pressed artisanal bergamots harvested before sunrise in southern Calabria, paired with wild-foraged cedarwood aged in the cool elevation of Himalayan valleys.',
    genesis: 'Each harvest cycle is subjected to a 90-day cold maturation period in darkened steel casks in Grasse before hand-decanting into pure architectural crystal in New Delhi. The resulting concentrate retains an extraordinary clarity that defies conventional fleeting citrus perfumery.',
    accords: {
      head: 'Calabrian Bergamot, Sicilian Lemon, Crushed Mint, Neroli Petals',
      heart: 'Egyptian Jasmine Grandiflorum, Steamed White Tea, Malabar Cardamom',
      base: 'Atlas White Cedar, Haitian Vetiver, Salted Ambergris, Warm Skin Musk'
    },
    notesDetailed: {
      head: {
        name: 'Head Notes / 01 (0 — 30 Mins)',
        duration: '0 — 30 MINS',
        description: 'Luminous, hyper-effervescent burst capturing crisp morning vapor lifted from chilled Mediterranean orchard groves with Sicilian lemon and petitgrain.'
      },
      heart: {
        name: 'Heart Notes / 02 (2 — 6 Hours)',
        duration: '2 — 6 HOURS',
        description: 'A tranquil, crystalline tea-floral core of Egyptian Jasmine Grandiflorum and Cardamom that maintains radiance without descending into heavy indole.'
      },
      soul: {
        name: 'Soul Notes / 03 (8 — 14 Hours Drydown)',
        duration: '8 — 14 HOURS DRYDOWN',
        description: 'An intimate anchor of Atlas White Cedar, Haitian vetiver, and solar amber that bonds deeply with personal body chemistry.'
      }
    },
    metrics: {
      freshness: 95,
      woodiness: 70,
      warmth: 60,
      sweetness: 25,
      sillage: "Arm's Length",
      longevity: '10+ Hours'
    },
    ingredients: 'Alcohol Denat. (Organic Grain Spirit), Parfum (Fragrance Conc. 22%), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Citral, Evernia Prunastri Extract (Oakmoss Trace), Alpha-Isomethyl Ionone.',
    inStock: true,
    collection: 'signature',
    rating: 4.9,
    reviewsCount: 84
  },
  {
    id: 'alpine-mist',
    number: '01',
    name: 'ALPINE MIST',
    subtitle: 'Fresh Woody • EDP 100ml',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Woody',
    price: 8200,
    price50ml: 5400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9bCRfGSx1qDphNJG6vPPvLcIXl6TXipkjk48pJ2lW3wNqvUbdiuYuCju2UYOAXMwJNirKAlQKGNihljGaPKdR4a3bS1ZMlvjk_-xjEj3HCT9vpR628nAkpE8dNIMlA2lIXAIXwPLqypCaiJ5n-K92F9tJPfUQTemMDsg6fglzmgcAXF7vTLxvhgGJJKidMZ1q3s0n8SCmMd2P2_ue1w-TAuXgVVaLWQExX3NI3knzaCmv2NKu5UM48Q',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9bCRfGSx1qDphNJG6vPPvLcIXl6TXipkjk48pJ2lW3wNqvUbdiuYuCju2UYOAXMwJNirKAlQKGNihljGaPKdR4a3bS1ZMlvjk_-xjEj3HCT9vpR628nAkpE8dNIMlA2lIXAIXwPLqypCaiJ5n-K92F9tJPfUQTemMDsg6fglzmgcAXF7vTLxvhgGJJKidMZ1q3s0n8SCmMd2P2_ue1w-TAuXgVVaLWQExX3NI3knzaCmv2NKu5UM48Q'
    ],
    shortDescription: 'Frosted mint, crisp woods, alpine ozone, and atlas cedarwood.',
    narrative: 'Inspired by early dawn atop glacial Himalayan peaks where sub-zero wind carries the resinous needles of pine and cedar down through mist-shrouded valleys.',
    genesis: 'Formulated with cold-distilled glacial juniper berries and high-altitude wild pine needles harvested from Himachal valleys.',
    accords: {
      head: 'Sub-Zero Glacial Ozone, Frosted Peppermint, Green Galbanum',
      heart: 'Himalayan White Pine, Wild Juniper Needles, Crushed Birch',
      base: 'Aged Atlas Cedar, White Moss, Clean Skin Musk'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Crisp mountain frost and sparkling peppermint vapor.' },
      heart: { name: 'Heart Notes', description: 'Himalayan pine resin and sharp juniper wood.' },
      soul: { name: 'Soul Notes', description: 'Deep Atlas cedar and mineral drydown.' }
    },
    metrics: { freshness: 92, woodiness: 85, warmth: 35, sweetness: 15, sillage: "2–3 Meters", longevity: "12+ Hours" },
    ingredients: 'Alcohol Denat., Parfum (20%), Aqua, Pinene, Limonene, Evernia Prunastri.',
    inStock: true,
    collection: 'signature',
    rating: 4.8,
    reviewsCount: 62
  },
  {
    id: 'white-aura',
    number: '02',
    name: 'WHITE AURA',
    subtitle: 'Solar Floral • EDP 100ml',
    gender: 'Women',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Floral',
    price: 8900,
    price50ml: 5800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD82dEx57WH0VQTuXT74tdlCj3sBb0ZQWYU01DDV8CUeY7kZADQEYM3WY_UN8StX9KxCajJoJBeyZyyUEw1Y-xRt03VEOQKdP8XNOujO-g3K9Iejoo1OihMxcrlsaiysBbdzud6uXJucRY2Re9vz5NwoI17QfQunTqJsoQn2kjfmKM9STdOpdjZgU0r8RzfSB2lvDSK22JApj1RXfLQjgqS9pF63rRQ1tW4rdZ6eFHR8ZTA3asF7vNNug',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD82dEx57WH0VQTuXT74tdlCj3sBb0ZQWYU01DDV8CUeY7kZADQEYM3WY_UN8StX9KxCajJoJBeyZyyUEw1Y-xRt03VEOQKdP8XNOujO-g3K9Iejoo1OihMxcrlsaiysBbdzud6uXJucRY2Re9vz5NwoI17QfQunTqJsoQn2kjfmKM9STdOpdjZgU0r8RzfSB2lvDSK22JApj1RXfLQjgqS9pF63rRQ1tW4rdZ6eFHR8ZTA3asF7vNNug'
    ],
    badge: 'SOLAR CORE',
    shortDescription: 'Solar Jasmine, Orange Blossom, Golden Amber.',
    narrative: 'A blindingly luminous floral composition radiating warmth like morning sunlight reflecting off warm white marble terraces.',
    genesis: 'Distilled from night-blooming white jasmine collected before dawn in Grasse, bound with warm solar ambergris from the Indian Ocean.',
    accords: {
      head: 'Mandarin Zest, Solar Radiant Aldehydes, White Honeysuckle',
      heart: 'Grasse Jasmine Grandiflorum, Orange Blossom, Lily of the Valley',
      base: 'Golden Liquid Amber, Cashmere Musk, Vanilla Orchid'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Gleaming citrus aldehydes and morning honeysuckle.' },
      heart: { name: 'Heart Notes', description: 'Velvety Grasse jasmine petals and luminous neroli.' },
      soul: { name: 'Soul Notes', description: 'Solar warm amber and crystalline cashmere.' }
    },
    metrics: { freshness: 75, woodiness: 30, warmth: 80, sweetness: 60, sillage: "Radiant & Intimate", longevity: "10+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Linalool, Hydroxycitronellal, Benzyl Salicylate.',
    inStock: true,
    collection: 'signature',
    rating: 4.9,
    reviewsCount: 71
  },
  {
    id: 'cedar-noir',
    number: '03',
    name: 'CEDAR NOIR',
    subtitle: 'Smoky Cedarwood • Extrait (32%)',
    gender: 'Men',
    concentration: 'Extrait de Parfum',
    concentrationDetail: 'EXTRAIT 32% • 100 ML',
    family: 'Woody',
    price: 10500,
    price50ml: 6900,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGPrIN8kCwPzrcLlOp32XBBFuCIPeIMOSJOo4-KwP7fqseTQ3V1sSkHqhmRSJU_R8PH3rfi2zLIbmOsTgupOAWI4lz7vvgqzLP2jHvxQapdXJG-vbO5MGST2bEv2U1tibb3Ha00VE2zxHTFD9SZIvS-o1ChPA1QJQYeC5wkrZSL9rqcOs4wy5xeRjYfwbvOUpNtvCM4xmKEoE9nSoe0bAVeDcs41S9xh_cbKJATiaOMb_tYXDE3a4Z2Q',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGPrIN8kCwPzrcLlOp32XBBFuCIPeIMOSJOo4-KwP7fqseTQ3V1sSkHqhmRSJU_R8PH3rfi2zLIbmOsTgupOAWI4lz7vvgqzLP2jHvxQapdXJG-vbO5MGST2bEv2U1tibb3Ha00VE2zxHTFD9SZIvS-o1ChPA1QJQYeC5wkrZSL9rqcOs4wy5xeRjYfwbvOUpNtvCM4xmKEoE9nSoe0bAVeDcs41S9xh_cbKJATiaOMb_tYXDE3a4Z2Q'
    ],
    badge: 'EXTRAIT 32%',
    shortDescription: 'Smoked Birch Tar, Haitian Vetiver, Himalayan Cedar.',
    narrative: 'An aristocratic nocturnal fragrance with commanding woody depth. Raw charred woods meet cold incense smoke and aristocratic leather.',
    genesis: '180 days of slow maceration in dark charred oak casks to infuse the deep smoked resins with unyielding longevity.',
    accords: {
      head: 'Black Pepper, Nutmeg, Cold Frankincense Smoke',
      heart: 'Smoked Birch Tar, Haitian Vetiver, Cistus Labdanum',
      base: 'Ancient Himalayan Cedar, Dark Leather, Indonesian Patchouli'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Cold smoked spices and frankincense tears.' },
      heart: { name: 'Heart Notes', description: 'Raw charred birch tar and earthy vetiver.' },
      soul: { name: 'Soul Notes', description: 'Massive dark cedar and aged leather upholstery.' }
    },
    metrics: { freshness: 30, woodiness: 95, warmth: 85, sweetness: 10, sillage: "Commanding Aura", longevity: "16+ Hours" },
    ingredients: 'Alcohol Denat., Parfum (32%), Aqua, Isoeugenol, Limonene, Coumarin.',
    inStock: true,
    collection: 'premium',
    rating: 5.0,
    reviewsCount: 95
  },
  {
    id: 'rose-velvet',
    number: '04',
    name: 'ROSE VELVET',
    subtitle: 'Damask Rose & Cashmere',
    gender: 'Women',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Floral',
    price: 9800,
    price50ml: 6400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUq12dfksDW3Q46hdwKq3mTk5pn0rNHpFKXYXVBqavdIH3Bl1i3eH6jOr5IQdNb2aURXMATvKLhlEgX7MiSFE5UWHLTQiN9RwqFkU4hMbjTXeC082blQbWerznUXwHAkf13nMD7Ejk26cpkz6OMWhP86w4p5WvB3S968UpBFKNOhhElQrSfSzokdHBqJ5-AJlzsCwY6kUdyK2rfTmrYxdRzj9sgpCWCqi2mb3xG0LNdUvvgTipl3kxw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUq12dfksDW3Q46hdwKq3mTk5pn0rNHpFKXYXVBqavdIH3Bl1i3eH6jOr5IQdNb2aURXMATvKLhlEgX7MiSFE5UWHLTQiN9RwqFkU4hMbjTXeC082blQbWerznUXwHAkf13nMD7Ejk26cpkz6OMWhP86w4p5WvB3S968UpBFKNOhhElQrSfSzokdHBqJ5-AJlzsCwY6kUdyK2rfTmrYxdRzj9sgpCWCqi2mb3xG0LNdUvvgTipl3kxw'
    ],
    badge: 'BESTSELLER',
    shortDescription: 'Grasse Rose Petals, Saffron Blossom, Cashmere Woods.',
    narrative: 'A velvety tapestry woven from two revered rose capitals: centuries-old Damask rose from Kannauj and delicate Rosa centifolia from Grasse.',
    genesis: '10,000 hand-picked petals distilled under gentle wood fire in Kannauj copper degs, rounded with saffron and aged bourbon vanilla.',
    accords: {
      head: 'Kashmiri Saffron, Pink Pepper, Dewy Rosebud',
      heart: 'Kannauj Damask Rose, Grasse Centifolia, Turkish Rose Absolute',
      base: 'Bourbon Vanilla, Cashmere Woods, Honeyed Ambergris'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Fresh crimson rose water and exotic saffron threads.' },
      heart: { name: 'Heart Notes', description: 'Heirloom rose petals in deep velvety bloom.' },
      soul: { name: 'Soul Notes', description: 'Cashmere woods, raw honeycomb, and vanilla bean.' }
    },
    metrics: { freshness: 55, woodiness: 45, warmth: 80, sweetness: 50, sillage: "Seductive & Opulent", longevity: "12+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Rosa Damascena Extract, Saffron Terpenes, Geraniol.',
    inStock: true,
    collection: 'best_sellers',
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: 'bloom-aura',
    number: '05',
    name: 'BLOOM AURA',
    subtitle: 'White Jasmine & Blossom',
    gender: 'Women',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Floral',
    price: 8500,
    price50ml: 5600,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCQ4uwxBBHJxSkC_xIHi-fKSAlbcbLspI5JoN2oKGkmaf8BgiepmgG2pJcayYS_MZFzdVZ5YZrNT2e5AeYeGWOIEp1mFeavSlLtosNTyXXGm1HypGJ-YbQcAeY6f84l-B_C5Z6h9rpSsU7gUjMU70AQRc_sQs_d4xOjhSp1dG-VcNojYRlp6wT9vf1RvhJB8r-xVGpk54gM1e7dH4PsiIey-BcrIpwiv-Dh2TDglvX59pxdx8RaeXetg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCQ4uwxBBHJxSkC_xIHi-fKSAlbcbLspI5JoN2oKGkmaf8BgiepmgG2pJcayYS_MZFzdVZ5YZrNT2e5AeYeGWOIEp1mFeavSlLtosNTyXXGm1HypGJ-YbQcAeY6f84l-B_C5Z6h9rpSsU7gUjMU70AQRc_sQs_d4xOjhSp1dG-VcNojYRlp6wT9vf1RvhJB8r-xVGpk54gM1e7dH4PsiIey-BcrIpwiv-Dh2TDglvX59pxdx8RaeXetg'
    ],
    shortDescription: 'White Tuberose, Dewy Gardenia, Soft Sandalwood.',
    narrative: 'An ethereal garden illuminated under moonlight. Opulent white floral petals glistened with nocturnal dew and grounding creamy sandalwood.',
    genesis: 'Carefully hydro-distilled to preserve the crisp vegetal stems alongside intoxicating blossom petals.',
    accords: {
      head: 'Green Pear, Neroli Blossom, Morning Dew',
      heart: 'Imperial Tuberose, Night Gardenia, Indian Sambac Jasmine',
      base: 'Creamy White Sandalwood, Coconut Water, Sheer Musk'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Crisp morning pear and sparkling green neroli.' },
      heart: { name: 'Heart Notes', description: 'Carnal tuberose and sweet gardenia blossoms.' },
      soul: { name: 'Soul Notes', description: 'Silky sandalwood and crystalline white musk.' }
    },
    metrics: { freshness: 70, woodiness: 35, warmth: 60, sweetness: 55, sillage: "Luminous", longevity: "10+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Farnesol, Eugenol, Benzyl Benzoate.',
    inStock: true,
    collection: 'signature',
    rating: 4.7,
    reviewsCount: 48
  },
  {
    id: 'royal-oud',
    number: '06',
    name: 'ROYAL OUD',
    subtitle: 'Precious Dehn Al Oud • Extrait',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    concentrationDetail: 'PURE EXTRAIT • 100 ML',
    family: 'Rare Oud',
    price: 14500,
    price50ml: 9500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPjuSsEKpX4ClAdwcjavk3gcJKfWOYirOwd08FH3WdMqRxcC8yHNrql-mh4NIWJ-VfPsm-Ur32vXF5QbYsCBKRcppA4UjPHoJekja075Y2Sgvg3gKfxr-HjneKJY2IH0vRJb-EhxCvamMzw0Htp4M-BRuu-bYlkbJsm0ngnwh2MunqLPowk092MTnc1C19h4xe6gGRGaQO1V_O5iZ-Hhr-l_B9Q6TayoX4lWlutsbL7eFD4C0xSgS_NA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPjuSsEKpX4ClAdwcjavk3gcJKfWOYirOwd08FH3WdMqRxcC8yHNrql-mh4NIWJ-VfPsm-Ur32vXF5QbYsCBKRcppA4UjPHoJekja075Y2Sgvg3gKfxr-HjneKJY2IH0vRJb-EhxCvamMzw0Htp4M-BRuu-bYlkbJsm0ngnwh2MunqLPowk092MTnc1C19h4xe6gGRGaQO1V_O5iZ-Hhr-l_B9Q6TayoX4lWlutsbL7eFD4C0xSgS_NA'
    ],
    badge: 'BESTSELLER',
    shortDescription: 'Rare Assam Heartwood, Wild Smoke, Saddle Leather, Myrrh.',
    narrative: 'The crown jewel of Maison ZELL MONT. Sourced exclusively from wild, aged agarwood trees deep in Assam forests, macerated to royal perfection.',
    genesis: 'Distilled using antique copper cauldrons with 12-year-aged wild agarwood heartwood, producing an unctuous, molasses-dark extraction.',
    accords: {
      head: 'Golden Cardamom, Somalian Frankincense, Bergamot Peel',
      heart: 'Aged Assam Dehn Al Oud, Taif Rose, Smoked Leather',
      base: 'Dark Ambergris, Castoreum Accord, Civet Accord, Oakmoss'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Royal spices and solemn temple frankincense smoke.' },
      heart: { name: 'Heart Notes', description: 'Viscous, balsamic Assam agarwood and bruised Taif roses.' },
      soul: { name: 'Soul Notes', description: 'Ancient leather saddles and oceanic ambergris.' }
    },
    metrics: { freshness: 15, woodiness: 98, warmth: 95, sweetness: 20, sillage: "Sovereign Sillage", longevity: "24+ Hours" },
    ingredients: 'Alcohol Denat., Aquilaria Agallocha (Oud) Oil, Parfum (35%), Ambergris.',
    inStock: true,
    collection: 'best_sellers',
    rating: 5.0,
    reviewsCount: 142
  },
  {
    id: 'amber-oud',
    number: '07',
    name: 'AMBER OUD',
    subtitle: 'Warm Resin & Ambergris • Pure Attar',
    gender: 'Unisex',
    concentration: 'Pure Attar',
    concentrationDetail: 'PURE ATTAR OIL • 12 ML / 100 ML',
    family: 'Amber & Resin',
    price: 12000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD51PVwHpKRDIhLGgqFRNxILt7h1gzrChApTasFDlbjv6E-bP6ondobP33kcf4eP_QagM88JOvOp0nXe-UwKLckHd7rekuztjqPlLEVnoLJ2NoCVWqTy4yUibcyOjS4yOLmN5jUR_bn1uVz0_6hFD3csqn7pHliu7S_jW0vRyBvnOOvoKkOfHcS_GUHv2Twi6_2CNatI4cvpE6kOs1hYqi7PPCnuf3vwb1LKMv5jatPS9ePUrt5ssmtJw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD51PVwHpKRDIhLGgqFRNxILt7h1gzrChApTasFDlbjv6E-bP6ondobP33kcf4eP_QagM88JOvOp0nXe-UwKLckHd7rekuztjqPlLEVnoLJ2NoCVWqTy4yUibcyOjS4yOLmN5jUR_bn1uVz0_6hFD3csqn7pHliu7S_jW0vRyBvnOOvoKkOfHcS_GUHv2Twi6_2CNatI4cvpE6kOs1hYqi7PPCnuf3vwb1LKMv5jatPS9ePUrt5ssmtJw'
    ],
    badge: 'HERITAGE ATTAR',
    shortDescription: 'Warm Cistus Labdanum, Natural Ambergris, Kashmiri Saffron.',
    narrative: 'A 100% pure alcohol-free attar oil formulated in Kannauj. Warm, honeyed amber resin married to aged Cambodian agarwood and Kashmiri saffron.',
    genesis: 'Distilled into pure Mysore sandalwood oil base using the time-honored deg-bhapka water-steam method, aged in leather barrels for 8 years.',
    accords: {
      head: 'Kashmiri Saffron, Dry Cinnamon Bark, Clove Flower',
      heart: 'Fossilized Amber, Cambodian Agarwood, Cistus Labdanum',
      base: 'Mysore Sandalwood Base (100% Pure), Natural Ambergris'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Golden saffron and warm exotic spices.' },
      heart: { name: 'Heart Notes', description: 'Viscous fossilized amber resin and Cambodian wood.' },
      soul: { name: 'Soul Notes', description: 'Deep, creamy Mysore sandalwood and salty ambergris.' }
    },
    metrics: { freshness: 20, woodiness: 85, warmth: 95, sweetness: 40, sillage: "Intimate Halo", longevity: "24–36 Hours" },
    ingredients: '100% Pure Botanical Concentrated Perfume Oil. Zero Alcohol. Santalum Album Oil Base.',
    inStock: true,
    collection: 'attars',
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: 'cedar-peak',
    number: '08',
    name: 'CEDAR PEAK',
    subtitle: 'Juniper & Himalayan Pine',
    gender: 'Men',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Woody',
    price: 8700,
    price50ml: 5700,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvqRrUkxIoEl-G92wVo7cIFzT3FruQQD5eqfHH2QaWtubkUYsG7bBPp5nVTO2yw_sNBRIq1dwz3w6XxIqYrtQqytau2D1WJmcD9UL_s6WK0mT8VP5GgGjdgfipJShw9GheFJyDA9jX80KwLphISaPNkDx8wY-2WikEBM11grtpP6zK_7n2f1bSZJOKQ7_hUPw9iSkQ1bJmHi-vQ5JpEpKWvIQdICDWtDzIS3VsfDXsCcAi9Wsw9mZ2nA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvqRrUkxIoEl-G92wVo7cIFzT3FruQQD5eqfHH2QaWtubkUYsG7bBPp5nVTO2yw_sNBRIq1dwz3w6XxIqYrtQqytau2D1WJmcD9UL_s6WK0mT8VP5GgGjdgfipJShw9GheFJyDA9jX80KwLphISaPNkDx8wY-2WikEBM11grtpP6zK_7n2f1bSZJOKQ7_hUPw9iSkQ1bJmHi-vQ5JpEpKWvIQdICDWtDzIS3VsfDXsCcAi9Wsw9mZ2nA'
    ],
    shortDescription: 'Juniper, High-Altitude Pine, Crushed Needles, Bergamot.',
    narrative: 'A crisp, bracing composition that captures the razor-sharp air of cedar-cloaked Himalayan ridges just as the first sunbeam strikes snow.',
    genesis: 'Wild-harvested pine cone sap and high-elevation juniper berries micro-distilled in stainless copper.',
    accords: {
      head: 'Crushed Juniper Berries, Calabrian Bergamot, Green Cardamom',
      heart: 'Himalayan Blue Pine, Fir Balsam, White Cypress',
      base: 'Virginian Cedarwood, Vetiver Roots, Clean Ambergris'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Sharp, aromatic juniper and cold citrus peel.' },
      heart: { name: 'Heart Notes', description: 'Forest sap, green fir needles, and mountain timber.' },
      soul: { name: 'Soul Notes', description: 'Dry cedarwood and cool mineral earth.' }
    },
    metrics: { freshness: 85, woodiness: 90, warmth: 40, sweetness: 15, sillage: "Clean & Linear", longevity: "11+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Pinene, Linalool.',
    inStock: true,
    collection: 'signature',
    rating: 4.8,
    reviewsCount: 54
  },
  {
    id: 'silver-musk',
    number: '09',
    name: 'SILVER MUSK',
    subtitle: 'Clean Skin Musk & Iris • Extrait',
    gender: 'Unisex',
    concentration: 'Extrait de Parfum',
    concentrationDetail: 'EXTRAIT 30% • 100 ML',
    family: 'Musk',
    price: 9200,
    price50ml: 6100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRhiSPAqk0qNStN5Hg6nB2k3BKej1-fa9u-nnwi5HdlW575lnNAu19ol0DHsu1_qzoO5ur709ePDgHWORkmCqH-0JXtR0eANSyn20OJY4otAG4UDveYID04P2PDOsH0NiijoV-_qn3AkGXEiFBKV80_zz52ww4XHQ-3bu2iXP49e3FJdeT4HiDr8tIa11YgzTEqzcf_3VK53WXpQe3dtl27iSFs7pOAtMRE-Yps97ZDp_RVBo1P3Q0FA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRhiSPAqk0qNStN5Hg6nB2k3BKej1-fa9u-nnwi5HdlW575lnNAu19ol0DHsu1_qzoO5ur709ePDgHWORkmCqH-0JXtR0eANSyn20OJY4otAG4UDveYID04P2PDOsH0NiijoV-_qn3AkGXEiFBKV80_zz52ww4XHQ-3bu2iXP49e3FJdeT4HiDr8tIa11YgzTEqzcf_3VK53WXpQe3dtl27iSFs7pOAtMRE-Yps97ZDp_RVBo1P3Q0FA'
    ],
    badge: 'EXTRAIT 30%',
    shortDescription: 'Florentine Iris, Clean Skin Musk, White Ambergris.',
    narrative: 'A second-skin masterpiece of quiet authority. Pale, powdery Florentine orris butter wrapped in whispers of clean cotton and crystalline silver musk.',
    genesis: 'Three-year cured Tuscan orris roots pulverized and aged with clean botanical ambrette seeds from Grasse.',
    accords: {
      head: 'Ambrette Seeds, White Freesia, Chilled Water Pear',
      heart: 'Florentine Orris Butter, White Suede, Magnolia',
      base: 'Crystalline Silver Musk, Iso-E Super, Salted White Amber'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Clean botanical ambrette and subtle watery pear.' },
      heart: { name: 'Heart Notes', description: 'Noble powdery orris butter and white kidskin suede.' },
      soul: { name: 'Soul Notes', description: 'Intimate skin musk that lasts indefinitely on clothing.' }
    },
    metrics: { freshness: 70, woodiness: 40, warmth: 50, sweetness: 20, sillage: "Second-Skin Intimacy", longevity: "14+ Hours" },
    ingredients: 'Alcohol Denat., Parfum (30%), Iris Florentina Root Extract, Ambrettolide.',
    inStock: true,
    collection: 'premium',
    rating: 4.9,
    reviewsCount: 66
  },
  {
    id: 'aqua-mist',
    number: '10',
    name: 'AQUA MIST',
    subtitle: 'Sea Salt & Marine Amber',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Citrus',
    price: 8000,
    price50ml: 5200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU-pPArm4xbld326ZhPslX46V9XTLbdmGjT0tLuG9x1pwy4oOCvZPIvLL_lUHqmU6lG9SwFPK-bqRZBPXkqCnryzzSmo5CfYK3EIlC3gm-fDvBVJ11jZCSUbv7Vsxt2silIDWQPSQoPXF8DvnkVz4uGVXZdAI9dj2-0EkWV3spV1T7g50_Rf1q5_vgea1jabb-BoTNjHmbw3SzHKwwKC31wcQ4DPnjyrly6pJwFz66vfSnD11Q1VHJyw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCU-pPArm4xbld326ZhPslX46V9XTLbdmGjT0tLuG9x1pwy4oOCvZPIvLL_lUHqmU6lG9SwFPK-bqRZBPXkqCnryzzSmo5CfYK3EIlC3gm-fDvBVJ11jZCSUbv7Vsxt2silIDWQPSQoPXF8DvnkVz4uGVXZdAI9dj2-0EkWV3spV1T7g50_Rf1q5_vgea1jabb-BoTNjHmbw3SzHKwwKC31wcQ4DPnjyrly6pJwFz66vfSnD11Q1VHJyw'
    ],
    shortDescription: 'Sea Salt, Marine Amber, Sun-Bleached Driftwood.',
    narrative: 'A sunlit oceanic fragrance evoking warm Mediterranean tides washing over smooth basalt rocks, leaving crystalline sea salt under high noon.',
    genesis: 'Real maritime ambergris tincture paired with wild coastal sage and cold sea mineral extracts.',
    accords: {
      head: 'Mediterranean Sea Salt, Zesty Yuzu, Coastal Rosemary',
      heart: 'Marine Ozone, Waterlily, Driftwood Accord',
      base: 'Raw Ambergris, Sea Moss, Clean Cedar'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Effervescent sea spray and zesty citrus burst.' },
      heart: { name: 'Heart Notes', description: 'Oceanic ozonic breeze and sun-bleached driftwood.' },
      soul: { name: 'Soul Notes', description: 'Salted ambergris anchor with enduring aquatic purity.' }
    },
    metrics: { freshness: 95, woodiness: 50, warmth: 45, sweetness: 10, sillage: "Radiant & Fresh", longevity: "9+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Benzyl Salicylate, Limonene.',
    inStock: true,
    collection: 'signature',
    rating: 4.8,
    reviewsCount: 59
  },
  {
    id: 'lemon-grove',
    number: '12',
    name: 'LEMON GROVE',
    subtitle: 'Lemon Verbena & Vetiver',
    gender: 'Unisex',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Citrus',
    price: 7800,
    price50ml: 5100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhWzB1YhgOEWHVnAadE16npM0mWqw7dOUqjhGp58skddznxXGfxnTSRRs8U2U8zHtftlOJPWeyc1y58QciNrvoSJ-tBVasTGtxXhbg15R0DdgnBcBx3lx9PEosXX9F2qfwkpG4eJKQSb8HNR7hDSJ9xB2TdQ4FUH_jKLCBsIHvYcT2GA_oWTdXRHnME0o3ZGvBKvumKHakI_RxVshCjE3NqwbIIW0As38myhp6WyoFFjVtMppYAla8Mg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhWzB1YhgOEWHVnAadE16npM0mWqw7dOUqjhGp58skddznxXGfxnTSRRs8U2U8zHtftlOJPWeyc1y58QciNrvoSJ-tBVasTGtxXhbg15R0DdgnBcBx3lx9PEosXX9F2qfwkpG4eJKQSb8HNR7hDSJ9xB2TdQ4FUH_jKLCBsIHvYcT2GA_oWTdXRHnME0o3ZGvBKvumKHakI_RxVshCjE3NqwbIIW0As38myhp6WyoFFjVtMppYAla8Mg'
    ],
    shortDescription: 'Lemon Verbena, Fresh Vetiver Roots, Green Citrus Leaves.',
    narrative: 'Walking through a cliffside Amalfi lemon orchard in late spring. Crushed verbena leaves, tart golden lemons, and earthy roots soaked in sun.',
    genesis: 'Cold-pressed verdant lemon peels blended with damp Java vetiver and white amber.',
    accords: {
      head: 'Amalfi Lemon, Lemon Verbena, Petitgrain',
      heart: 'Green Coriander, Ginger Root, White Thyme',
      base: 'Earthy Vetiver, White Amber, Mineral Flint'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Tart sparkling lemon and crushed herbal verbena.' },
      heart: { name: 'Heart Notes', description: 'Spiced ginger root and sunlit garden herbs.' },
      soul: { name: 'Soul Notes', description: 'Grounded woody vetiver and amber.' }
    },
    metrics: { freshness: 96, woodiness: 60, warmth: 35, sweetness: 15, sillage: "Crisp & Clean", longevity: "8+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Citral, Limonene, Linalool.',
    inStock: true,
    collection: 'signature',
    rating: 4.7,
    reviewsCount: 39
  },
  {
    id: 'berry-mist',
    number: '13',
    name: 'BERRY MIST',
    subtitle: 'Wild Cassis & Red Berries',
    gender: 'Women',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Floral',
    price: 8100,
    price50ml: 5300,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDDKOhhkIOi4dlmPNbldhojy0UG95-ECmab7NuTOxRl7MRuQRjx8ZSEVnif63XyKISCm6a3gYHJv4B3Vh4eIYGupm9mesgR91wxs89IhUsXSMds3EkWtxhxuYLSr4oSHCVCCTF4LEaRaZpPQ9qlEpiCmVwiiwLINOk2pj9hiiz7kBXPYnYGpf3cmxIAcwnnansXlTxOCbk3qE_PGbsguCLTSSzQUONM3fYb0Hp_kQcXLKHk0Q2jQ6__Q',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDDKOhhkIOi4dlmPNbldhojy0UG95-ECmab7NuTOxRl7MRuQRjx8ZSEVnif63XyKISCm6a3gYHJv4B3Vh4eIYGupm9mesgR91wxs89IhUsXSMds3EkWtxhxuYLSr4oSHCVCCTF4LEaRaZpPQ9qlEpiCmVwiiwLINOk2pj9hiiz7kBXPYnYGpf3cmxIAcwnnansXlTxOCbk3qE_PGbsguCLTSSzQUONM3fYb0Hp_kQcXLKHk0Q2jQ6__Q'
    ],
    shortDescription: 'Wild Cassis, Frosted Red Berries, Violet Leaf.',
    narrative: 'Tart forest currants dusted with winter frost, juxtaposed against rich velvety violet petals and sheer cedarwood.',
    genesis: 'French blackcurrant bud absolute paired with Himalayan wild raspberries.',
    accords: {
      head: 'Blackcurrant Nectar, Wild Strawberry, Frosted Pink Pepper',
      heart: 'Parma Violet Petals, Damascena Rosebud, Orris Powder',
      base: 'White Amber, Virginian Cedarwood, Fluffy Musk'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Tart frosted berry compote and pink peppercorns.' },
      heart: { name: 'Heart Notes', description: 'Airy violet petals and subtle tea rose.' },
      soul: { name: 'Soul Notes', description: 'Crisp cedar and soft musky veil.' }
    },
    metrics: { freshness: 75, woodiness: 40, warmth: 50, sweetness: 65, sillage: "Enchanting Trail", longevity: "9+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Citronellol, Alpha-Isomethyl Ionone.',
    inStock: true,
    collection: 'new_arrivals',
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: 'apple-bloom',
    number: '14',
    name: 'APPLE BLOOM',
    subtitle: 'Orchard Blossom & Vanilla',
    gender: 'Women',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Floral',
    price: 8400,
    price50ml: 5500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGApwwA90WAvyg52LjmnYV01y5oSD2q1aqNBaZyjSB5XVkjbqKkWkZfHhE7apfDiVS-e0M03QTYQ3IrhF8JODA80j1eMzJzHLiZTGhvn-Fsj30nNL7mvLMehoPRk1xJfujSTyc1deysX05BxberQKok0zz7sOGZHjeeXAL551H3DM7TXASC__AmUQqrKve89_yMmmTkLF5A_Bwgkf5J-PD-oKqTJgw-aFwYmwrfkLKS2Yg-rySrFCmIg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGApwwA90WAvyg52LjmnYV01y5oSD2q1aqNBaZyjSB5XVkjbqKkWkZfHhE7apfDiVS-e0M03QTYQ3IrhF8JODA80j1eMzJzHLiZTGhvn-Fsj30nNL7mvLMehoPRk1xJfujSTyc1deysX05BxberQKok0zz7sOGZHjeeXAL551H3DM7TXASC__AmUQqrKve89_yMmmTkLF5A_Bwgkf5J-PD-oKqTJgw-aFwYmwrfkLKS2Yg-rySrFCmIg'
    ],
    badge: 'CRISP GOURMAND',
    shortDescription: 'Orchard Blossom, Pink Pepper, Vanilla Bean.',
    narrative: 'Crisp green orchard blossoms blooming in the mountain sun, warmed by gentle vanilla bean pods and cashmere wood.',
    genesis: 'Distilled using spring apple blossoms harvested in Kashmir valleys.',
    accords: {
      head: 'Crisp Green Apple Skin, Bergamot, Pink Peppercorn',
      heart: 'Apple Blossom, White Peony, Orange Flower Water',
      base: 'Madagascar Vanilla Bean, Cashmere Wood, Blonde Cedar'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Crisp apple peel and sparkling pink pepper.' },
      heart: { name: 'Heart Notes', description: 'Floral apple blossoms and dewy peonies.' },
      soul: { name: 'Soul Notes', description: 'Gourmand bourbon vanilla and soft woods.' }
    },
    metrics: { freshness: 78, woodiness: 38, warmth: 68, sweetness: 58, sillage: "Warm & Welcoming", longevity: "10+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Linalool, Hydroxycitronellal.',
    inStock: true,
    collection: 'new_arrivals',
    rating: 4.8,
    reviewsCount: 44
  },
  {
    id: 'santal-gold',
    number: '15',
    name: 'SANTAL GOLD',
    subtitle: 'Mysore Sandalwood & Orris',
    gender: 'Unisex',
    concentration: 'Pure Attar',
    concentrationDetail: 'PURE ATTAR OIL • 12 ML / 100 ML',
    family: 'Woody',
    price: 13900,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsaHX9Xes7SnYBAaK3honnR7wCJnUv6A2Ql2FKGDXzdax_REfQNPk_23iyLQl6ych9-IWvNkvk7GZZZPrP1n94SqdPLuDzIdNMme-ea63cXlBr2L2PeW5BuVz13TPQuvsbbqFmLzNw10JHJ66Z64DGeJXmSJLJ1wNhiQTPAU8TRb1TQwdCQsWI9z_EX04Fq_QemsFlwRJw7sh4X8Nku56fGqKWi1NNbsEwR55U2deCsmR6hWAXapCsLg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsaHX9Xes7SnYBAaK3honnR7wCJnUv6A2Ql2FKGDXzdax_REfQNPk_23iyLQl6ych9-IWvNkvk7GZZZPrP1n94SqdPLuDzIdNMme-ea63cXlBr2L2PeW5BuVz13TPQuvsbbqFmLzNw10JHJ66Z64DGeJXmSJLJ1wNhiQTPAU8TRb1TQwdCQsWI9z_EX04Fq_QemsFlwRJw7sh4X8Nku56fGqKWi1NNbsEwR55U2deCsmR6hWAXapCsLg'
    ],
    badge: 'ROYAL HERITAGE',
    shortDescription: 'Aged White Sandalwood, Orris Butter, Cardamom.',
    narrative: 'A legendary pure attar composed of authenticated 20-year-aged Santalum album heartwood from Mysore, steeped with noble Italian orris.',
    genesis: 'Triple-steam distilled in traditional Kannauj copper stills and aged in sandalwood-lined clay amphorae.',
    accords: {
      head: 'Green Cardamom Pod, Ambrette Seed, Rice Steam',
      heart: 'Florentine Orris Butter, White Sandalwood Cream, Magnolia',
      base: 'Vintage Mysore Sandalwood (100% Pure), Milk Wood, Golden Amber'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Aromatic green cardamom and steamed rice vapors.' },
      heart: { name: 'Heart Notes', description: 'Extremely creamy orris root and milky sandalwood.' },
      soul: { name: 'Soul Notes', description: 'Ancient Mysore sandalwood heartwood that lasts for days.' }
    },
    metrics: { freshness: 30, woodiness: 98, warmth: 85, sweetness: 30, sillage: "Meditative & Intimate", longevity: "36+ Hours" },
    ingredients: '100% Pure Concentrated Perfume Oil. Santalum Album Heartwood Extract.',
    inStock: true,
    collection: 'attars',
    rating: 5.0,
    reviewsCount: 119
  },
  {
    id: 'velvet-amber',
    number: '16',
    name: 'VELVET AMBER',
    subtitle: 'Fossilized Amber & Labdanum',
    gender: 'Unisex',
    concentration: 'Pure Attar',
    concentrationDetail: 'PURE ATTAR OIL • 12 ML / 100 ML',
    family: 'Amber & Resin',
    price: 12500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCLo-xb_ZfjskAXbCA-u6nlBLU4qWYAipsAKPw6Z27wkvJfAQU5loZPYa37qsBPeJSTWotHKEAzlHbbUC6jxq86c3SjxpnCZ1ADcfKmZbLd3Xx92p1tdfvFV2a3EPIShbO_6jCnDaWk1zoD0nW8qQESLx9BDwieIfuHxFAKWyVn26Hdha3XuGtP96tfFihEI6HcAWLWITm1P5_KewIARdI4EKYoYft_LfvORqvWinufV9O1aF35b1adg',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCLo-xb_ZfjskAXbCA-u6nlBLU4qWYAipsAKPw6Z27wkvJfAQU5loZPYa37qsBPeJSTWotHKEAzlHbbUC6jxq86c3SjxpnCZ1ADcfKmZbLd3Xx92p1tdfvFV2a3EPIShbO_6jCnDaWk1zoD0nW8qQESLx9BDwieIfuHxFAKWyVn26Hdha3XuGtP96tfFihEI6HcAWLWITm1P5_KewIARdI4EKYoYft_LfvORqvWinufV9O1aF35b1adg'
    ],
    shortDescription: 'Warm Labdanum, Vanilla Pod, Cinnamon Bark.',
    narrative: 'Viscous golden fossilized amber oil enriched with sticky Mediterranean cistus labdanum and smoked cinnamon.',
    genesis: 'Resinous destructive distillation of million-year-old pine amber, blended with natural plant balsams.',
    accords: {
      head: 'Ceylon Cinnamon Bark, Nutmeg, Bitter Orange',
      heart: 'Cistus Labdanum, Fossilized Amber Oil, Benzoin Tears',
      base: 'Smoked Vanilla Caviar, Patchouli Leaves, Sandalwood'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Spicy dry cinnamon and candied bitter orange peel.' },
      heart: { name: 'Heart Notes', description: 'Rich balsam of Tolu and dark amber resin.' },
      soul: { name: 'Soul Notes', description: 'Creamy smoked vanilla and golden labdanum.' }
    },
    metrics: { freshness: 18, woodiness: 65, warmth: 98, sweetness: 45, sillage: "Enveloping Warmth", longevity: "24+ Hours" },
    ingredients: '100% Pure Perfume Oil. Cistus Ladaniferus Resin, Amber Oil, Santalum Album.',
    inStock: true,
    collection: 'attars',
    rating: 4.9,
    reviewsCount: 77
  },
  {
    id: 'ocean-blue',
    number: '17',
    name: 'OCEAN BLUE',
    subtitle: 'Coastal Driftwood & Java Patchouli',
    gender: 'Men',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Woody',
    price: 8900,
    price50ml: 5800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-_IoWiQRB7vIQMi9j5ONTvVzI1Pj4hUEANkOwJtGt2xa5X4eZQOhbUzDa4bGzJlL6SEvLAdi8nHhvYsTOeA4_t5U9GTcVdXEuNek3yv1utp8wd4LL-pm5zZvmC62DXKKl1kA6qVp3rBJiR59Y04TCMGl3uuObV_5gA08swwvZfdHjFdUM10WafC905O0mWZRqJJFDsURNG3ak92Jz9u65KvxOeFct7RAr4RSjUwf4It3OLV3WmMYTOA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC-_IoWiQRB7vIQMi9j5ONTvVzI1Pj4hUEANkOwJtGt2xa5X4eZQOhbUzDa4bGzJlL6SEvLAdi8nHhvYsTOeA4_t5U9GTcVdXEuNek3yv1utp8wd4LL-pm5zZvmC62DXKKl1kA6qVp3rBJiR59Y04TCMGl3uuObV_5gA08swwvZfdHjFdUM10WafC905O0mWZRqJJFDsURNG3ak92Jz9u65KvxOeFct7RAr4RSjUwf4It3OLV3WmMYTOA'
    ],
    shortDescription: 'Coastal Driftwood, Mineral Salt, Dark Java Patchouli.',
    narrative: 'A dark oceanic masculine elixir. Tempestuous sea salt crashing against rain-soaked coastal driftwood and aged Indonesian patchouli.',
    genesis: 'Fractionated dark patchouli aged for two years, balanced with cold coastal ozone and seaweed absolute.',
    accords: {
      head: 'Marine Sea Salt, Crushed Black Cardamom, Italian Bergamot',
      heart: 'Deep Ocean Accord, Dried Seaweed Absolute, Geranium Leaf',
      base: 'Dark Java Patchouli, Sun-Bleached Driftwood, Grey Ambergris'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Icy mineral salt and zesty citrus burst.' },
      heart: { name: 'Heart Notes', description: 'Ocean storms and salty driftwood.' },
      soul: { name: 'Soul Notes', description: 'Earthy, dark patchouli and deep sea ambergris.' }
    },
    metrics: { freshness: 78, woodiness: 82, warmth: 55, sweetness: 10, sillage: "Striking & Deep", longevity: "11+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Pogostemon Cablin (Patchouli) Oil, Aqua, Limonene.',
    inStock: true,
    collection: 'signature',
    rating: 4.8,
    reviewsCount: 52
  },
  {
    id: 'rose-gold',
    number: '18',
    name: 'ROSE GOLD',
    subtitle: 'Macerated Turkish Rose & Cardamom',
    gender: 'Women',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Floral',
    price: 9600,
    price50ml: 6300,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgCF6HmJritCCMzEtgdUkgos2-oGLP4CMlQJGb_lZYCVFMAIS3M21-iPInpgOFtS9sj7mnP3HVUJyxxJCevv6xsZk6ZH_p-Em1p9zfU1XmbPit7ngohyAmCLuI_nhSucy5GpHH-cimod7JOCLILQuK5zs3JBpZKj_78vcgqWthKCxFSvt8fUK4yNys4h0z6ElecRuk4ZtkuYrP8cImh4ZrZInSLJn6SsmJr-4Y6euJx79aHIyeTqrB8Q',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgCF6HmJritCCMzEtgdUkgos2-oGLP4CMlQJGb_lZYCVFMAIS3M21-iPInpgOFtS9sj7mnP3HVUJyxxJCevv6xsZk6ZH_p-Em1p9zfU1XmbPit7ngohyAmCLuI_nhSucy5GpHH-cimod7JOCLILQuK5zs3JBpZKj_78vcgqWthKCxFSvt8fUK4yNys4h0z6ElecRuk4ZtkuYrP8cImh4ZrZInSLJn6SsmJr-4Y6euJx79aHIyeTqrB8Q'
    ],
    badge: 'EDP SIGNATURE',
    shortDescription: 'Macerated Turkish Rose, Crushed Cardamom, Blonde Amber.',
    narrative: 'A gilded celebration of spicy oriental florals. Macerated Turkish rose petals dusted with green cardamom and blonde resinous amber.',
    genesis: 'Rose petals macerated in copper vessels alongside whole Indian cardamom pods and aged tonka beans.',
    accords: {
      head: 'Green Cardamom, Mandarin Sparkle, Pink Pepper',
      heart: 'Turkish Rose Absolute, Saffron Petals, Cinnamon Bark',
      base: 'Blonde Amber, Tonka Bean, Creamy Cedarwood'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Gourmand cardamom spice and sparkling citrus.' },
      heart: { name: 'Heart Notes', description: 'Rich Turkish rose petals and golden saffron.' },
      soul: { name: 'Soul Notes', description: 'Warm blonde amber and tonka bean warmth.' }
    },
    metrics: { freshness: 48, woodiness: 55, warmth: 88, sweetness: 52, sillage: "Regal Presence", longevity: "13+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Geraniol, Citronellol, Cinnamal.',
    inStock: true,
    collection: 'signature',
    rating: 4.9,
    reviewsCount: 68
  },
  {
    id: 'mountain-wood',
    number: '19',
    name: 'MOUNTAIN WOOD',
    subtitle: 'Aged Oak & Peat Smoke',
    gender: 'Men',
    concentration: 'Eau de Parfum',
    concentrationDetail: 'EDP • 100 ML',
    family: 'Woody',
    price: 9800,
    price50ml: 6500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5TtNUryca7jY4E-foOQQbu0QmFTFm-sTn6pcFWg__kKNaAtN_0uRhXkDeQNDIMXENR6Gkbf-zUryeJE6-UPGSpwahyCV6AXjUk1ldqaKSTMSEYgly7ORZPvCHe3BPXwEB3WCWRb_YFfVguNtPxxfSaieKZW2NV9Loz42_P7sTgcyTaquiQ3b8SiTCmz5laGjlOS42oVNZtOEU2wjQc9_teQD5-NqFrHT56_IaT0lpQXfHHpBv5y7MYA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5TtNUryca7jY4E-foOQQbu0QmFTFm-sTn6pcFWg__kKNaAtN_0uRhXkDeQNDIMXENR6Gkbf-zUryeJE6-UPGSpwahyCV6AXjUk1ldqaKSTMSEYgly7ORZPvCHe3BPXwEB3WCWRb_YFfVguNtPxxfSaieKZW2NV9Loz42_P7sTgcyTaquiQ3b8SiTCmz5laGjlOS42oVNZtOEU2wjQc9_teQD5-NqFrHT56_IaT0lpQXfHHpBv5y7MYA'
    ],
    shortDescription: 'Aged Oak, Peat Smoke, Cashmere Accord, Green Cardamom.',
    narrative: 'A hearth burning in a high alpine chalet. Charred oak logs, earthy peat smoke, and heavy woven cashmere throws.',
    genesis: 'Distilled using aged oak cask shavings and cold-pressed pine resins.',
    accords: {
      head: 'Dried Cardamom, Juniper Berries, Bergamot',
      heart: 'Peat Smoke, Charred Oakwood, Cashmere Accord',
      base: 'Atlas Cedar, Dark Labdanum, Rich Birch Tar'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Woodland herbs and crisp mountain air.' },
      heart: { name: 'Heart Notes', description: 'Peat campfire smoke and aged cask oak.' },
      soul: { name: 'Soul Notes', description: 'Heavy cashmere wood and dark resin.' }
    },
    metrics: { freshness: 35, woodiness: 94, warmth: 86, sweetness: 15, sillage: "Persistent & Smoky", longevity: "14+ Hours" },
    ingredients: 'Alcohol Denat., Parfum, Aqua, Evernia Furfuracea Extract, Coumarin.',
    inStock: true,
    collection: 'signature',
    rating: 4.8,
    reviewsCount: 51
  },
  {
    id: 'golden-musk',
    number: '20',
    name: 'GOLDEN MUSK',
    subtitle: 'Botanical Musk & Frankincense',
    gender: 'Unisex',
    concentration: 'Pure Attar',
    concentrationDetail: 'PURE ATTAR OIL • 12 ML / 100 ML',
    family: 'Musk',
    price: 11800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqJAlol_VdQED8pGAqIZAlO7GUUFK8dhYowAVDt5kttqZ8vkKdfCzQFYwZ5F3ZH-sxctHzhVdwOHXgGJ3bx58aRorBJ6TkSDiqHNxtGrFG7fwe0r7PsGfleTiRIEBWkD4qE3z7hbvp0yoSRns0GKuUNMpDd5SHk9zpcNdl5cmyGzvYWPEchcsqtGycx571hM-sycIb7NrDgU7cN2cDSWrg-HGv1SvftB0xiyjMvCVWl5tndkJlImXgwA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqJAlol_VdQED8pGAqIZAlO7GUUFK8dhYowAVDt5kttqZ8vkKdfCzQFYwZ5F3ZH-sxctHzhVdwOHXgGJ3bx58aRorBJ6TkSDiqHNxtGrFG7fwe0r7PsGfleTiRIEBWkD4qE3z7hbvp0yoSRns0GKuUNMpDd5SHk9zpcNdl5cmyGzvYWPEchcsqtGycx571hM-sycIb7NrDgU7cN2cDSWrg-HGv1SvftB0xiyjMvCVWl5tndkJlImXgwA'
    ],
    badge: 'BOTANICAL MUSK',
    shortDescription: 'White Musk Macerate, Golden Frankincense Tears, Sandalwood.',
    narrative: 'A velvety pure attar made without animal harvest. Rare botanical ambrette seeds macerated with golden Omani frankincense in sweet sandalwood oil.',
    genesis: 'Co-distillation of wild ambrette seeds and weeping frankincense gum in copper cauldrons.',
    accords: {
      head: 'Ambrette Blossom, Golden Frankincense Tears',
      heart: 'Silky White Musk, Magnolia Petals, Blonde Tobacco',
      base: 'Mysore Sandalwood Base, Golden Benzoin, Soft Amber'
    },
    notesDetailed: {
      head: { name: 'Head Notes', description: 'Golden resin tears and clean botanical seeds.' },
      heart: { name: 'Heart Notes', description: 'Liquid silk musk and transparent floral essence.' },
      soul: { name: 'Soul Notes', description: 'Creamy sandalwood base that melts on warm skin.' }
    },
    metrics: { freshness: 40, woodiness: 70, warmth: 88, sweetness: 35, sillage: "Sublime Intimacy", longevity: "28+ Hours" },
    ingredients: '100% Pure Botanical Perfume Oil. Ambrette Seed Extract, Boswellia Carterii, Santalum Album.',
    inStock: true,
    collection: 'attars',
    rating: 4.9,
    reviewsCount: 73
  }
];

export const DISCOVERY_SAMPLES_LIST: DiscoverySample[] = [
  { id: 'sample-alpine', name: '01 Alpine Mist', tag: 'Fresh Woody', family: 'Woody' },
  { id: 'sample-rose', name: '04 Rose Velvet', tag: 'Damask Rose', family: 'Floral' },
  { id: 'sample-royal', name: '06 Royal Oud', tag: 'Assam Agarwood', family: 'Rare Oud' },
  { id: 'sample-citrus', name: '11 Citrus Air', tag: 'Bergamot & Neroli', family: 'Citrus' },
  { id: 'sample-silver', name: '09 Silver Musk', tag: 'Clean Orris', family: 'Musk' },
  { id: 'sample-amber', name: '07 Amber Oud', tag: 'Warm Resin', family: 'Amber & Resin' },
  { id: 'sample-peak', name: '08 Cedar Peak', tag: 'Himalayan Pine', family: 'Woody' },
  { id: 'sample-santal', name: '15 Santal Gold', tag: 'Mysore Sandal', family: 'Woody' }
];
