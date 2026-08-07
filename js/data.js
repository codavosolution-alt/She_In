(function () {
  "use strict";
  var art = ["#6f2638", "#3d1220", "#9e5747", "#70523d", "#4d1424", "#7a293b", "#8a4555", "#513a38"];
  window.ELORA_DATA = {
    sheinRequestStatuses: ["pending_review","reviewing","price_confirmed","awaiting_customer_confirmation","confirmed","ordered_from_supplier","arrived_at_warehouse","out_for_delivery","delivered","unavailable","cancelled"],
    visuals: {
      hero: ["assets/images/hero/home-hero.webp", "assets/images/hero/home-hero-detail.webp"],
      editorial: ["assets/images/editorial/minimal-fashion.webp", "assets/images/editorial/lifestyle.webp", "assets/images/editorial/luxury-essentials.webp"],
      styleQuiz: "assets/images/editorial/style-quiz.webp"
    },
    categories: [
      { id: "new-in", translationKey: "categories.newIn", name: { en: "New In", ar: "وصل حديثًا" }, image: "assets/images/hero/home-hero-detail.webp", colors: ["#f2c7bf", "#7a293b"], subcategories: [] },
      { id: "fashion", translationKey: "categories.fashion", name: { en: "Fashion", ar: "أزياء" }, image: "assets/images/categories/fashion.webp", colors: ["#f2e0c7", "#70523d"], subcategories: [
        { id: "dresses", translationKey: "categories.dresses", name: { en: "Dresses", ar: "فساتين" } },
        { id: "tops", translationKey: "categories.tops", name: { en: "Tops", ar: "بلوزات" } },
        { id: "bottoms", translationKey: "categories.bottoms", name: { en: "Bottoms", ar: "بناطيل وتنانير" } },
        { id: "sets", translationKey: "categories.sets", name: { en: "Sets", ar: "أطقم" } },
        { id: "jackets", translationKey: "categories.jackets", name: { en: "Jackets", ar: "جاكيتات" } }
      ] },
      { id: "bags-shoes", translationKey: "categories.bagsShoes", name: { en: "Bags & Shoes", ar: "حقائب وأحذية" }, image: "assets/images/categories/bags.webp", colors: ["#d1c4b8", "#332926"], subcategories: [
        { id: "handbags", translationKey: "categories.handbags", name: { en: "Handbags", ar: "حقائب يد" } },
        { id: "shoulder-bags", translationKey: "categories.shoulderBags", name: { en: "Shoulder Bags", ar: "حقائب كتف" } },
        { id: "heels", translationKey: "categories.heels", name: { en: "Heels", ar: "أحذية بكعب" } },
        { id: "flats", translationKey: "categories.flats", name: { en: "Flats", ar: "أحذية فلات" } },
        { id: "sneakers", translationKey: "categories.sneakers", name: { en: "Sneakers", ar: "أحذية رياضية" } }
      ] },
      { id: "accessories-beauty", translationKey: "categories.accessoriesBeauty", name: { en: "Accessories & Beauty", ar: "إكسسوارات وجمال" }, image: "assets/images/categories/beauty.webp", colors: ["#fad9c7", "#9e5747"], subcategories: [
        { id: "jewelry", translationKey: "categories.jewelry", name: { en: "Jewelry", ar: "مجوهرات" } },
        { id: "watches", translationKey: "categories.watches", name: { en: "Watches", ar: "ساعات" } },
        { id: "sunglasses", translationKey: "categories.sunglasses", name: { en: "Sunglasses", ar: "نظارات شمسية" } },
        { id: "hair-accessories", translationKey: "categories.hairAccessories", name: { en: "Hair Accessories", ar: "إكسسوارات الشعر" } },
        { id: "beauty", translationKey: "categories.beauty", name: { en: "Beauty", ar: "مستحضرات تجميل" } },
        { id: "skincare", translationKey: "categories.skincare", name: { en: "Skincare", ar: "العناية بالبشرة" } }
      ] }
    ],
    products: [
      { id: 1, slug: "satin-evening-dress", name: { en: "Satin Evening Dress", ar: "فستان سهرة ساتان" }, description: { en: "A sculpted satin silhouette with a soft drape and an elegant square neckline.", ar: "قصة ساتان منحوتة بانسيابية ناعمة وياقة مربعة أنيقة." }, price: 2490, oldPrice: 2890, category: "fashion", subcategory: "dresses", sizes: ["XS", "S", "M", "L"], colors: ["#6f2638", "#c79a8d"], art: art[0], badge: "new", images: ["assets/images/products/dress-01.webp","assets/images/products/dress-02.webp","assets/images/products/dress-03.webp"], imagePosition: "center 30%" },
      { id: 2, slug: "soft-knit-set", name: { en: "Soft Knit Co-ord Set", ar: "طقم تريكو ناعم" }, description: { en: "An effortless two-piece knit set designed for polished everyday comfort.", ar: "طقم تريكو من قطعتين لراحة يومية بإطلالة راقية." }, price: 1980, category: "fashion", subcategory: "sets", sizes: ["S", "M", "L", "XL"], colors: ["#3d1220", "#d8b8aa"], art: art[1], badge: "best", images: ["assets/images/products/knit-set-01.webp","assets/images/products/knit-set-02.webp","assets/images/products/knit-set-03.webp"], imagePosition: "center 35%" },
      { id: 3, slug: "structured-leather-handbag", name: { en: "Structured Leather Handbag", ar: "حقيبة يد جلد منظمة" }, description: { en: "A polished everyday handbag with a structured profile and refined metal details.", ar: "حقيبة يد يومية أنيقة بتصميم منظم وتفاصيل معدنية راقية." }, price: 2250, category: "bags-shoes", subcategory: "handbags", sizes: ["ONE"], colors: ["#9e5747", "#1e2420"], art: art[2], badge: "new", images: ["assets/images/products/handbag-01.webp","assets/images/products/handbag-02.webp","assets/images/products/handbag-03.webp"], imagePosition: "center" },
      { id: 4, slug: "sculpted-leather-heels", name: { en: "Sculpted Leather Heels", ar: "حذاء جلد بكعب منحوت" }, description: { en: "Elegant leather heels balanced with a softly sculpted shape for day-to-evening wear.", ar: "حذاء جلد أنيق بكعب منحوت وقصة مريحة من النهار إلى المساء." }, price: 1790, category: "bags-shoes", subcategory: "heels", sizes: ["37", "38", "39", "40"], colors: ["#70523d", "#efe0cb"], art: art[3], images: ["assets/images/products/heels-01.webp","assets/images/products/heels-02.webp","assets/images/products/heels-03.webp"], imagePosition: "center" },
      { id: 5, slug: "gold-layered-necklace", name: { en: "Gold Layered Necklace", ar: "عقد ذهبي متعدد الطبقات" }, description: { en: "A delicate layered necklace designed to bring a warm finish to every look.", ar: "عقد رقيق متعدد الطبقات يضيف لمسة ذهبية دافئة لكل إطلالة." }, price: 1250, category: "accessories-beauty", subcategory: "jewelry", sizes: ["ONE"], colors: ["#c49a4c", "#d6c4b1"], art: art[4], badge: "limited", images: ["assets/images/products/necklace-01.webp","assets/images/products/necklace-02.webp","assets/images/products/necklace-03.webp"], imagePosition: "center" },
      { id: 6, slug: "radiance-face-serum", name: { en: "Radiance Face Serum", ar: "سيروم إشراقة للوجه" }, description: { en: "A lightweight daily serum that hydrates and leaves the skin looking naturally luminous.", ar: "سيروم يومي خفيف يرطب البشرة ويمنحها إشراقة طبيعية." }, price: 890, category: "accessories-beauty", subcategory: "skincare", sizes: ["30 ML"], colors: ["#7a293b", "#e8c6b5"], art: art[5], badge: "new", images: ["assets/images/products/serum-01.webp","assets/images/products/serum-02.webp"], imagePosition: "center" },
      { id: 7, slug: "silk-drape-top", name: { en: "Silk Drape Top", ar: "بلوزة حرير منسدلة" }, description: { en: "A fluid silk top with a softly draped neckline for effortless styling.", ar: "بلوزة حرير انسيابية بياقة منسدلة لإطلالة سهلة وأنيقة." }, price: 1590, category: "fashion", subcategory: "tops", sizes: ["XS", "S", "M", "L"], colors: ["#8a4555", "#c5a998"], art: art[6], images: ["assets/images/products/silk-top-01.webp","assets/images/editorial/minimal-fashion.webp"], imagePosition: "center 25%" },
      { id: 8, slug: "oversized-sunglasses", name: { en: "Oversized Frame Sunglasses", ar: "نظارة شمسية بإطار كبير" }, description: { en: "Statement sunglasses with a softly oversized frame and polished tinted lenses.", ar: "نظارة شمسية بإطار كبير أنيق وعدسات ملونة مصقولة." }, price: 1350, category: "accessories-beauty", subcategory: "sunglasses", sizes: ["ONE"], colors: ["#513a38", "#caa18b"], art: art[7], images: ["assets/images/products/sunglasses-01.webp","assets/images/products/sunglasses-02.webp","assets/images/products/sunglasses-03.webp"], imagePosition: "center" }
    ],
    account: { name: "Mariam Hassan", email: "mariam@example.com", phone: "+20 100 123 4567" },
    addresses: [
      { id: 1, label: { en: "Home", ar: "المنزل" }, name: "Mariam Hassan", line: { en: "12 Teseen Street, New Cairo, Cairo", ar: "١٢ شارع التسعين، القاهرة الجديدة، القاهرة" }, phone: "+20 100 123 4567", primary: true },
      { id: 2, label: { en: "Work", ar: "العمل" }, name: "Mariam Hassan", line: { en: "Nile City Towers, Corniche El Nil, Cairo", ar: "أبراج نايل سيتي، كورنيش النيل، القاهرة" }, phone: "+20 100 123 4567" }
    ],
    orders: [
      { id: "EL-10482", date: "2026-07-22", status: "delivered", total: 4470, products: [1, 2], tracking: 100 },
      { id: "EL-10516", date: "2026-07-29", status: "in_transit", total: 4040, products: [3, 4], tracking: 68 },
      { id: "EL-10390", date: "2026-06-14", status: "cancelled", total: 2350, products: [8], tracking: 20 }
    ],
    reviews: [
      { name: "Mariam", quote: { en: "The fit guide was spot on.", ar: "دليل المقاس كان دقيقًا جدًا." } },
      { name: "Layla", quote: { en: "Looks even better in natural light.", ar: "يبدو أجمل في الإضاءة الطبيعية." } },
      { name: "Nour", quote: { en: "The delivery timing was very clear.", ar: "موعد التوصيل كان واضحًا جدًا." } }
    ]
  };
})();
