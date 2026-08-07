(function () {
  "use strict";
  window.ELORA = window.ELORA || {};
  window.ELORA_CONFIG = window.ELORA_CONFIG || {
    whatsappNumber: "",
    contactEmail: ""
  };

  var copy = {
    welcome: {
      ar: "مرحبًا بكِ في ÉLORA ✨\nأقدر أساعدك في اختيار المنتجات، معرفة المقاس المناسب، متابعة طلبك أو طلب قطعة من SHEIN.",
      en: "Welcome to ÉLORA ✨\nI can help you find products, choose the right size, track an order, or request an item from SHEIN."
    },
    greeting: { ar: "أهلًا بكِ. كيف أقدر أساعدك اليوم؟", en: "Welcome. How can I help you today?" },
    thanks: { ar: "العفو، يسعدني أساعدك في أي اختيار آخر.", en: "You’re welcome. I’m happy to help with anything else." },
    unknown: {
      ar: "لم أفهم طلبك بشكل كافٍ. اختاري أقرب خيار أو أعيدي صياغة السؤال بكلمات أبسط.",
      en: "I’m not fully sure what you mean. Choose the closest option or rephrase your question."
    },
    noResults: {
      ar: "لم أجد قطعة مطابقة تمامًا داخل المتجر، لكن يمكنني عرض بدائل قريبة أو مساعدتك في طلبها من SHEIN.",
      en: "I couldn’t find an exact match in the store, but I can show similar options or help you request it from SHEIN."
    },
    productIntro: { ar: "وجدت لكِ هذه الاختيارات من الكتالوج الحالي:", en: "I found these options in the current catalog:" },
    recommendationIntro: { ar: "هذه أقرب 3 اختيارات لتفضيلاتك الحالية:", en: "These are the closest three matches for your preferences:" },
    recommendationReason: {
      ar: "اخترته لأنه الأقرب لنوع المنتج والميزانية التي حددتِها.",
      en: "I selected it because it best matches your chosen product type and budget."
    },
    availability: {
      ar: "لا توجد بيانات مخزون مباشرة في النسخة الحالية. سيؤكد لكِ فريق ÉLORA التوفر بعد مراجعة الطلب.",
      en: "Live stock data is not available in this version. The ÉLORA team will confirm availability after reviewing your request."
    },
    payment: {
      ar: "لا يتم تحصيل أي دفع داخل الموقع. بعد مراجعة الطلب والسعر والتوفر، سيتواصل معكِ فريق ÉLORA لتأكيد التفاصيل وطريقة الدفع.",
      en: "No payment is collected on the website. After reviewing the order, availability, and pricing, the ÉLORA team will contact you to confirm the details and payment method."
    },
    shipping: {
      ar: "موعد وتفاصيل التوصيل غير محددة مسبقًا في بيانات الموقع. سيؤكدها فريق ÉLORA بعد مراجعة الطلب والتوفر.",
      en: "Delivery timing and details are not predefined in the site data. The ÉLORA team will confirm them after reviewing the order and availability."
    },
    returns: {
      ar: "يمكنكِ بدء طلب استرجاع من صفحة الاسترجاع. الطلب يُحفظ كتجربة على هذا الجهاز، ويحتاج الإطلاق الحقيقي إلى مراجعة فريق ÉLORA.",
      en: "You can start a return request from the Returns page. It is saved as a device-local demo and requires ÉLORA team review in a real launch."
    },
    exchange: {
      ar: "شروط الاستبدال التفصيلية غير محددة في البيانات الحالية. افتحي صفحة الاسترجاع أو اطلبي من الفريق تأكيد أهلية القطعة.",
      en: "Detailed exchange terms are not defined in the current data. Open the Returns page or ask the team to confirm item eligibility."
    },
    cart: {
      ar: "أقدر أساعدك في اختيار المقاس المتاح، إضافة المنتجات، أو مراجعة أن طلبات SHEIN لا تدخل في الإجمالي حتى تأكيد السعر.",
      en: "I can help with available sizes, adding products, or explaining why SHEIN requests stay outside the total until pricing is confirmed."
    },
    checkout: {
      ar: "راجعي بيانات التواصل والعنوان والمنتجات ثم أرسلي الطلب للمراجعة. لا توجد بوابة دفع داخل الموقع.",
      en: "Review your contact details, address, and products, then submit the order for review. There is no payment gateway on the website."
    },
    shein: {
      ar: "انسخي رابط المنتج من SHEIN، ثم اختاري اللون والمقاس والكمية وأرسلي الطلب للمراجعة. يراجع الفريق السعر والتوفر ويتواصل معكِ للتأكيد. لا يتم جلب أي بيانات من الرابط تلقائيًا.",
      en: "Copy the SHEIN product link, choose the color, size, and quantity, then submit it for review. The team reviews pricing and availability and contacts you to confirm. Nothing is imported from the link automatically."
    },
    sizeStart: {
      ar: "اكتبي اسم القطعة أو افتحي صفحة المنتج وسأعرض المقاسات المسجلة لها فقط.",
      en: "Type the item name or open its product page, and I’ll show only the sizes recorded for it."
    },
    sizeProduct: {
      ar: "المقاسات المتاحة لهذه القطعة هي: {sizes}. لا يوجد دليل قياسات رقمي في بيانات المشروع الحالية، لذلك لا أستطيع ضمان مقاس محدد.",
      en: "The available sizes for this item are: {sizes}. The project does not currently include a measurement chart, so I can’t guarantee a specific fit."
    },
    sizeDisclaimer: {
      ar: "الاقتراح مبني على المقاسات المتاحة، وقد يختلف قليلًا حسب تصميم القطعة. سيؤكد فريق ÉLORA أي تفاصيل غير مذكورة.",
      en: "This guidance is based on the available sizes and may vary by product fit. The ÉLORA team will confirm any unspecified details."
    },
    trackingAsk: { ar: "اكتبي رقم الطلب كما ظهر لكِ، مثل EL-123456.", en: "Enter the order number exactly as shown, for example EL-123456." },
    trackingFound: { ar: "وجدت الطلب {id}. حالته الحالية: {status}.", en: "I found order {id}. Its current status is: {status}." },
    trackingMissing: {
      ar: "لم أجد طلبًا بهذا الرقم على هذا الجهاز. تحققي من الرقم أو تواصلي مع فريق ÉLORA.",
      en: "I couldn’t find an order with this number on this device. Check the number or contact the ÉLORA team."
    },
    contactIntro: {
      ar: "لا يوجد موظف مباشر داخل المحادثة، لكن يمكنني تجهيز طلب تواصل وحفظه تجريبيًا على هذا الجهاز. ما اسمك؟",
      en: "There is no live agent in this chat, but I can prepare a contact request and save it locally as a demo. What is your name?"
    },
    contactAskContact: { ar: "اكتبي رقم الهاتف أو البريد الإلكتروني للتواصل.", en: "Enter a phone number or email address for contact." },
    contactAskTopic: { ar: "ما موضوع طلبك؟", en: "What is your request about?" },
    contactAskMessage: { ar: "اكتبي الرسالة التي تريدين تجهيزها للفريق.", en: "Write the message you want to prepare for the team." },
    contactSaved: {
      ar: "تم حفظ طلب التواصل تجريبيًا على هذا الجهاز. لم يُرسل إلى فريق ÉLORA لأن النسخة الحالية لا تحتوي على Backend.",
      en: "The contact request was saved locally as a demo. It was not sent to ÉLORA because this version has no backend."
    },
    contactCopy: { ar: "يمكنكِ نسخ ملخص المحادثة ومشاركته مع الفريق عند توفر وسيلة التواصل.", en: "You can copy the conversation summary and share it with the team when a contact channel is configured." },
    contactInvalid: { ar: "اكتبي رقم هاتف أو بريدًا إلكترونيًا صحيحًا.", en: "Enter a valid phone number or email address." },
    finderCategory: { ar: "ما نوع المنتج الذي تبحثين عنه؟", en: "What type of product are you looking for?" },
    finderOccasion: { ar: "ما المناسبة الأقرب لاستخدام القطعة؟", en: "What occasion is the item for?" },
    finderBudget: { ar: "ما الميزانية المناسبة لكِ؟", en: "What budget works for you?" },
    finderColor: { ar: "هل لديكِ لون مفضل؟", en: "Do you have a preferred color?" },
    finderSize: { ar: "اختاري المقاس المطلوب من المقاسات الموجودة بالكتالوج.", en: "Choose the needed size from those available in the catalog." },
    finderStyle: { ar: "وأخيرًا، أي ستايل تفضلين؟", en: "Finally, which style do you prefer?" },
    searchAsk: { ar: "اكتبي ما تبحثين عنه، مثل: شنطة، فستان أقل من 1500، أو حذاء للمناسبة.", en: "Tell me what you’re looking for, such as a handbag, a dress under 1500, or occasion shoes." },
    addedCart: { ar: "تمت إضافة القطعة إلى السلة بالمقاس المحدد.", en: "The item was added to your bag in the selected size." },
    addedWishlist: { ar: "تمت إضافة القطعة إلى المفضلة.", en: "The item was added to your wishlist." },
    removedWishlist: { ar: "تمت إزالة القطعة من المفضلة.", en: "The item was removed from your wishlist." },
    reset: { ar: "بدأنا محادثة جديدة. كيف أقدر أساعدك؟", en: "A new conversation has started. How can I help?" },
    proactive: {
      home: { ar: "تحتاجين مساعدة في اختيار قطعة؟", en: "Need help choosing an item?" },
      product: { ar: "محتارة في المقاس؟ أقدر أساعدك.", en: "Unsure about the size? I can help." },
      shop: { ar: "أقدر أبحث داخل الأقسام وأعرض أقرب النتائج.", en: "I can search the departments and show the closest matches." },
      cart: { ar: "عندك سؤال عن الطلب أو التوصيل؟", en: "Any questions about your order or delivery?" },
      search: { ar: "لم تجدي ما تبحثين عنه؟ أقدر أعرض بدائل أو أساعدك في طلبه من SHEIN.", en: "Can’t find it? I can show alternatives or help request it from SHEIN." },
      tracking: { ar: "اكتبي رقم الطلب وسأبحث عنه على هذا الجهاز.", en: "Enter your order number and I’ll look for it on this device." },
      returns: { ar: "أقدر أوضح خطوات طلب الاسترجاع المتاحة.", en: "I can explain the available return-request steps." },
      default: { ar: "تحتاجين مساعدة؟", en: "Need help?" }
    }
  };

  window.ELORA_CHATBOT_DATA = {
    copy: copy,
    intents: {
      greeting: ["hello","hi","hey","welcome","مرحبا","اهلا","السلام","هاي"],
      product_search: ["find","search","show me","looking for","عايزه","عاوزه","بدور على","ابحث","دورلي","وريني","منتج","قطعه"],
      product_recommendation: ["recommend","choose","help me choose","suggest","رشحي","اختار","ساعديني اختار","انسب"],
      category_search: ["fashion","dress","top","bag","handbag","shoe","heels","accessories","beauty","skincare","ازياء","فستان","بلوزه","شنطه","حقيبه","حذاء","كعب","اكسسوارات","جمال","عنايه"],
      budget_search: ["budget","under","less than","price","ميزانيه","اقل من","تحت","سعر"],
      color_search: ["black","white","gold","brown","burgundy","pink","beige","اسود","ابيض","دهبي","ذهبي","بني","نبيتي","وردي","بيج"],
      size_help: ["size","fit","measurement","مقاس","المقاس ايه","يناسبني","قياس"],
      product_availability: ["stock","available","availability","in stock","متوفر","موجود","التوفر"],
      add_to_cart: ["add to cart","add to bag","اضيف السله","حط في السله","ضيفيه"],
      add_to_wishlist: ["wishlist","favorite","favourite","مفضله","المفضله"],
      cart_help: ["cart","bag","basket","السله","الحقيبه"],
      checkout_help: ["checkout","submit order","place order","اتمام الطلب","ارسال الطلب","تاكيد الطلب"],
      no_online_payment: ["payment","pay","visa","card","cash","دفع","ادفع","فيزا","بطاقه","كاش"],
      shipping_question: ["shipping","delivery","arrive","توصيل","شحن","هيوصل","موعد الوصول"],
      return_question: ["return","refund","استرجاع","ارجاع","مرتجع"],
      exchange_question: ["exchange","replace","استبدال","تبديل"],
      order_tracking: ["track","where is my order","order status","فين طلبي","الطلب وصل فين","متابعه طلبي","تتبع"],
      order_status: ["status of my order","check my order","حاله طلبي","حالة الطلب","طلبي عامل ايه"],
      shein_request: ["shein","request from shein","مش لاقيه","اطلبي من شي ان","شي ان"],
      contact_team: ["contact","human","agent","team","talk to someone","اكلم حد","موظف","الفريق","تواصل"],
      thanks: ["thanks","thank you","شكرا","متشكره","تسلمي"],
      restart_conversation: ["restart","start over","new chat","ابدأ من جديد","محادثه جديده","امسح المحادثه"]
    },
    categoryAliases: {
      fashion: ["fashion","clothes","dress","dresses","top","tops","set","jacket","ازياء","ملابس","فستان","فساتين","بلوزه","بلوزات","طقم","جاكيت"],
      "bags-shoes": ["bag","bags","handbag","shoe","shoes","heels","sneakers","شنطه","شنط","حقيبه","حقائب","حذاء","احذيه","كعب"],
      "accessories-beauty": ["accessories","jewelry","necklace","sunglasses","beauty","skincare","serum","اكسسوارات","مجوهرات","عقد","نظاره","جمال","عنايه","سيروم"]
    },
    subcategoryAliases: {
      dresses: ["dress","dresses","فستان","فساتين"], tops: ["top","tops","blouse","بلوزه","بلوزات"], sets: ["set","sets","طقم","اطقم"],
      handbags: ["handbag","handbags","شنطه يد","حقيبه يد"], heels: ["heels","heel","كعب","حذاء كعب"],
      jewelry: ["jewelry","necklace","مجوهرات","عقد"], skincare: ["skincare","serum","عنايه","سيروم"], sunglasses: ["sunglasses","نظاره","نظارات"]
    },
    colors: [
      { id:"black", labels:{ar:"أسود",en:"Black"}, terms:["black","اسود","سوداء","سوده"], hex:["#1e2420","#332926"] },
      { id:"burgundy", labels:{ar:"نبيتي",en:"Burgundy"}, terms:["burgundy","wine","نبيتي"], hex:["#6f2638","#3d1220","#7a293b","#8a4555"] },
      { id:"brown", labels:{ar:"بني",en:"Brown"}, terms:["brown","بني"], hex:["#70523d","#513a38","#9e5747"] },
      { id:"gold", labels:{ar:"ذهبي",en:"Gold"}, terms:["gold","golden","ذهبي","دهبي"], hex:["#c49a4c"] },
      { id:"blush", labels:{ar:"وردي هادئ",en:"Blush"}, terms:["pink","blush","وردي"], hex:["#c79a8d","#d8b8aa","#e8c6b5","#caa18b"] },
      { id:"beige", labels:{ar:"بيج",en:"Beige"}, terms:["beige","cream","بيج","كريمي"], hex:["#efe0cb","#d6c4b1","#c5a998"] }
    ],
    occasions: ["daily","work","university","outing","occasion","gift"],
    styles: ["classic","casual","elegant","trendy","minimal"],
    sensitivePatterns: ["cvv","card number","credit card","password","passcode","otp","رقم البطاقه","بطاقه ائتمان","كلمه السر","كلمه المرور","رمز التحقق"]
  };
})();
