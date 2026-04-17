// AutoGo - Mock Data
import {
  User, Car, Service, Workshop, TowType, Driver, Order,
  HistoryOrder, Transaction, AppNotification, Address,
  ChatMessage, OnboardingItem, PaymentMethod,
} from '../types';

export const mockUser: User = {
  id: 'user_001',
  name: 'محمد علي',
  phone: '+20 10 1234 5678',
  email: 'mohamed@email.com',
  city: 'القاهرة، مصر',
  avatar: null,
  membershipType: 'بريميوم',
  points: 2450,
  walletBalance: 450.00,
};

export const mockCars: Car[] = [
  {
    id: 'car_001',
    brand: 'هيونداي',
    model: 'إلنترا',
    year: 2024,
    plate: 'أ ب ج 1234',
    mileage: 45200,
    nextService: 2500,
    status: 'نشط',
    color: '#FFFFFF',
    image: null,
    lastLocation: { lat: 30.0444, lng: 31.2357, address: 'القاهرة، المعادي' },
    reminders: [
      { type: 'license', message: 'باقي 15 يوم على انتهاء رخصة السيارة', urgent: true },
    ],
  },
  {
    id: 'car_002',
    brand: 'كيا',
    model: 'سبورتيدج',
    year: 2023,
    plate: 'د هـ و 5678',
    mileage: 13800,
    nextService: -200,
    status: 'تحتاج صيانة',
    color: '#1A1A1A',
    image: null,
    lastLocation: null,
    reminders: [],
  },
];

export const mockServices: Service[] = [
  // --- صيانة دورية (Maintenance) ---
  { id: 'srv_001', name: 'تغيير الزيت والفلاتر', description: 'حماية المحرك وزيادة عمره الافتراضي مع زيت أصلي', price: 120, icon: 'water', category: 'صيانة دورية' },
  { id: 'mnt_001', name: 'تغيير فلتر الهواء', description: 'استبدال فلتر الهواء لضمان نقاء المحرك', price: 50, icon: 'leaf', category: 'صيانة دورية' },
  { id: 'mnt_002', name: 'تغيير فلتر البنزين', description: 'لضمان أداء سلس وتوفير استهلاك الوقود', price: 60, icon: 'color-filter', category: 'صيانة دورية' },
  { id: 'mnt_003', name: 'تغيير فلتر التكييف', description: 'تنقية هواء المقصورة من الأتربة', price: 40, icon: 'barcode', category: 'صيانة دورية' },
  { id: 'mnt_004', name: 'فحص السوائل', description: 'مراجعة مياه رادياتير وفرامل وزيت', price: 30, icon: 'beaker', category: 'صيانة دورية' },
  { id: 'srv_006', name: 'فحص ضغط الإطارات', description: 'تعديل الضغط لجميع الإطارات', price: 45, icon: 'speedometer', category: 'صيانة دورية' },
  { id: 'srv_002', name: 'فحص البطارية', description: 'التأكد من قوة التشغيل في جميع الظروف', price: 80, icon: 'battery-half', category: 'صيانة دورية' },

  // --- ميكانيكا (Mechanical) ---
  { id: 'mec_001', name: 'صيانة المحرك', description: 'فحص المحرك وتشخيص المشكلات والإصلاح', price: 500, icon: 'settings', category: 'ميكانيكا' },
  { id: 'mec_002', name: 'تغيير سيور', description: 'تغيير سير الكاتينة وسير الدينامو', price: 300, icon: 'sync', category: 'ميكانيكا' },
  { id: 'mec_003', name: 'صيانة الفتيس', description: 'إصلاح أعطال الفتيس (Gearbox)', price: 700, icon: 'construct', category: 'ميكانيكا' },
  { id: 'mec_004', name: 'إصلاح العفشة', description: 'فحص وإصلاح المساعدين والمقصات', price: 400, icon: 'hardware-chip', category: 'ميكانيكا' },
  { id: 'mec_005', name: 'إصلاح نظام التبريد', description: 'صيانة الرادياتير والمراوح ودائرة التبريد', price: 200, icon: 'thermometer', category: 'ميكانيكا' },
  { id: 'mec_006', name: 'إصلاح تسريب الزيت', description: 'معالجة ومنع تسريب زيت المحرك', price: 250, icon: 'water', category: 'ميكانيكا' },
  { id: 'mec_007', name: 'تغيير طلمبة المياه', description: 'تغيير طرمبة المياه لضمان التبريد', price: 300, icon: 'water-outline', category: 'ميكانيكا' },
  { id: 'srv_003', name: 'صيانة المكابح', description: 'الأمان أولاً، فحص الفحمات ونظام الهيدروليك', price: 150, icon: 'shield-checkmark', category: 'ميكانيكا' },

  // --- كهرباء (Electrical) ---
  { id: 'ele_001', name: 'تغيير بطارية', description: 'استبدال البطارية القديمة بأخرى جديدة', price: 100, icon: 'battery-full', category: 'كهرباء' },
  { id: 'ele_002', name: 'شحن بطارية', description: 'تقويمها في مكان تعطل السيارة', price: 50, icon: 'flash', category: 'كهرباء' },
  { id: 'ele_003', name: 'إصلاح الأعطال الكهربائية', description: 'فحص ضفيرة السيارة والحساسات', price: 150, icon: 'flash-outline', category: 'كهرباء' },
  { id: 'ele_004', name: 'إصلاح الأنوار', description: 'فحص وتغيير المصابيح الأمامية والخلفية', price: 80, icon: 'bulb', category: 'كهرباء' },
  { id: 'ele_005', name: 'إصلاح المارش', description: 'فحص وإصلاح نظام بدء الدوران (Starter)', price: 200, icon: 'sync-circle', category: 'كهرباء' },
  { id: 'ele_006', name: 'إصلاح الدينامو', description: 'فحص وإصلاح دائرة شحن الكهرباء', price: 250, icon: 'battery-charging', category: 'كهرباء' },

  // --- تكييف (AC) ---
  { id: 'srv_004', name: 'صيانة التكييف', description: 'تبريد مثالي وفحص عام للتكييف', price: 200, icon: 'snow', category: 'تكييف' },
  { id: 'ac_001', name: 'شحن فريون', description: 'تعبئة فريون أصلي مع كشف التسريبات', price: 300, icon: 'snow-outline', category: 'تكييف' },
  { id: 'ac_002', name: 'تنظيف التكييف', description: 'غسيل ثلاجة التكييف لضمان الهواء النقي', price: 150, icon: 'color-wand', category: 'تكييف' },
  { id: 'ac_003', name: 'إصلاح تسريب', description: 'معالجة تسريب الفريون من مواسير التبريد', price: 250, icon: 'water', category: 'تكييف' },
  { id: 'ac_004', name: 'تغيير كمبروسر', description: 'استبدال كمبروسر التكييف التالف', price: 1000, icon: 'cog', category: 'تكييف' },

  // --- إطارات (Tires) ---
  { id: 'tir_001', name: 'تغيير كاوتش', description: 'استبدال إطارات السيارة بإطارات جديدة', price: 100, icon: 'disc', category: 'إطارات' },
  { id: 'tir_002', name: 'إصلاح بنشر', description: 'لحام كاوتش وفحص الثقوب', price: 50, icon: 'build', category: 'إطارات' },
  { id: 'tir_003', name: 'ترصيص', description: 'ترصيص عجلات لضمان ثبات السيارة', price: 120, icon: 'disc-outline', category: 'إطارات' },
  { id: 'tir_004', name: 'ضبط زوايا', description: 'تظبيط زوايا العجل لحماية الكاوتش', price: 150, icon: 'crop', category: 'إطارات' },

  // --- طوارئ (Emergency) ---
  { id: 'emg_001', name: 'ونش إنقاذ (Towing)', description: 'سحب ونقل للسيارة لأقرب ورشة أو للمنزل', price: 250, icon: 'car-sport', category: 'طوارئ' },
  { id: 'emg_002', name: 'اشتراك بطارية', description: 'شحن البطارية سريع على الطريق', price: 100, icon: 'flash', category: 'طوارئ' },
  { id: 'emg_003', name: 'تغيير بطارية في الموقع', description: 'توصيل وتركيب بطارية جديدة بمكانك', price: 150, icon: 'battery-full', category: 'طوارئ' },
  { id: 'emg_004', name: 'تغيير كاوتش في الموقع', description: 'فك الإطار التالف وتركيب الاستبن', price: 100, icon: 'build', category: 'طوارئ' },
  { id: 'emg_005', name: 'إصلاح بنشر في الموقع', description: 'لحام أو إصلاح سريع للإطار', price: 120, icon: 'hammer', category: 'طوارئ' },
  { id: 'emg_006', name: 'توصيل بنزين', description: 'توصيل وقود فوري لسيارتك لإنقاذك على الطريق', price: 150, icon: 'color-fill', category: 'طوارئ' },
  { id: 'emg_007', name: 'فتح باب السيارة', description: 'فتح الأبواب بأمان في حال نسيان المفتاح', price: 200, icon: 'key', category: 'طوارئ' },
  { id: 'emg_008', name: 'SOS طلب سريع', description: 'استغاثة سريعة وإرسال أقرب منقذ شامل', price: 300, icon: 'alert-circle', category: 'طوارئ' },

  // --- عناية بالسيارة (Car Care) ---
  { id: 'cc_001', name: 'غسيل سيارات', description: 'غسيل شامل سريع', price: 80, icon: 'water', category: 'عناية بالسيارة' },
  { id: 'srv_005', name: 'غسيل ذكي بريميوم', description: 'تنظيف شامل للهيكل مع تلميع', price: 150, icon: 'sparkles', category: 'عناية بالسيارة' },
  { id: 'cc_002', name: 'تلميع (Polishing)', description: 'إزالة الخدوش وتلميع سطح السيارة', price: 300, icon: 'diamond', category: 'عناية بالسيارة' },
  { id: 'cc_003', name: 'تنظيف داخلي', description: 'غسيل جاف للمقاعد والسجاد', price: 200, icon: 'shirt', category: 'عناية بالسيارة' },
  { id: 'cc_004', name: 'تنظيف محرك', description: 'غسيل المحرك بمواد آمنة للكهرباء', price: 100, icon: 'car-outline', category: 'عناية بالسيارة' },
  { id: 'cc_005', name: 'نانو سيراميك', description: 'تركيب طبقة حماية 9H للهيكل', price: 1500, icon: 'shield', category: 'عناية بالسيارة' },

  // --- فحص (Inspection) ---
  { id: 'ins_001', name: 'فحص شامل للعربية', description: 'مراجعة الميكانيكا والكهرباء بالكامل', price: 250, icon: 'search', category: 'فحص' },
  { id: 'ins_002', name: 'فحص قبل الشراء', description: 'مهم جداً: بودي، دهان، محرك وشاسيه', price: 500, icon: 'document-text', category: 'فحص' },
  { id: 'ins_003', name: 'فحص كمبيوتر', description: 'قراءة حساسات السيارة (OBD Scan)', price: 150, icon: 'laptop', category: 'فحص' },
  { id: 'ins_004', name: 'تقرير حالة السيارة', description: 'كشف مطبوع لتاريخ وحالة السيارة الفنية', price: 100, icon: 'reader', category: 'فحص' },

  // --- متقدمة (Advanced) ---
  { id: 'adv_001', name: 'تركيب GPS', description: 'أجهزة التتبع الجغرافي وحماية من السرقة', price: 350, icon: 'location', category: 'متقدمة' },
  { id: 'adv_002', name: 'تركيب Dash Cam', description: 'تركيب كاميرات المراقبة على الطرق بدقة', price: 400, icon: 'videocam', category: 'متقدمة' },
  { id: 'adv_003', name: 'تعديل برمجة (ECU Tuning)', description: 'برمجة كمبيوتر السيارة وضبط الأداء', price: 1000, icon: 'code-working', category: 'متقدمة' },
  { id: 'adv_004', name: 'تركيب إنذار', description: 'نظام حماية ضد السطو والسرقة', price: 300, icon: 'notifications', category: 'متقدمة' },
  { id: 'adv_005', name: 'تركيب حساسات ركن', description: 'تسهيل عملية الركن بكاميرا وحساسات', price: 450, icon: 'wifi', category: 'متقدمة' }
];

export const mockWorkshops: Workshop[] = [
  {
    id: 'ws_001',
    name: 'مركز النيل لصيانة السيارات',
    address: 'المعادي، شارع النصر، القاهرة',
    distance: 2.4,
    rating: 4.9,
    reviewCount: 1240,
    isOpen: true,
    openHours: '08:00 ص - 10:00 م',
    workDays: 'الأحد - الخميس',
    image: null,
    features: ['مركز معتمد', 'مواقف سيارات', 'واي فاي مجاني', 'منطقة انتظار'],
    location: { lat: 30.0444, lng: 31.2357 },
  },
  {
    id: 'ws_002',
    name: 'مركز المهندس المتخصص',
    address: 'الدقي، ميدان فيني، الجيزة',
    distance: 3.1,
    rating: 4.8,
    reviewCount: 850,
    isOpen: true,
    openHours: '09:00 ص - 09:00 م',
    workDays: 'السبت - الخميس',
    image: null,
    features: ['قطع غيار أصلية', 'فحص كمبيوتر', 'ضمان على الخدمة'],
    location: { lat: 30.0395, lng: 31.2157 },
  },
  {
    id: 'ws_003',
    name: 'ورشة السلام المتكاملة',
    address: 'مدينة نصر، مكرم عبيد، القاهرة',
    distance: 4.5,
    rating: 4.5,
    reviewCount: 320,
    isOpen: false,
    openHours: '09:00 ص - 09:00 م',
    workDays: 'السبت - الخميس',
    image: null,
    features: ['مركز معتمد', 'مواقف سيارات', 'منطقة انتظار'],
    location: { lat: 30.0595, lng: 31.3457 },
  },
  {
    id: 'ws_004',
    name: 'أوتو سيرفيس الأهرام',
    address: 'شارع الهرم، الجيزة',
    distance: 5.2,
    rating: 4.3,
    reviewCount: 210,
    isOpen: true,
    openHours: '08:30 ص - 10:30 م',
    workDays: 'يومياً',
    image: null,
    features: ['غسيل سيارات', 'تغيير إطارات', 'مقهى'],
    location: { lat: 29.9895, lng: 31.1457 },
  },
  {
    id: 'ws_005',
    name: 'مركز النور لكهرباء السيارات',
    address: 'مصر الجديدة، ميدان تريومف، القاهرة',
    distance: 6.8,
    rating: 4.7,
    reviewCount: 450,
    isOpen: true,
    openHours: '10:00 ص - 11:00 م',
    workDays: 'السبت - الخميس',
    image: null,
    features: ['شحن بطارية', 'تكييف', 'متخصص كهرباء'],
    location: { lat: 30.1095, lng: 31.3357 },
  },
  {
    id: 'ws_006',
    name: 'مركز طيبة للميكانيكا',
    address: 'التجمع الخامس، شارع التسعين، القاهرة',
    distance: 12.0,
    rating: 4.6,
    reviewCount: 156,
    isOpen: true,
    openHours: '09:00 ص - 08:00 م',
    workDays: 'يومياً',
    image: null,
    features: ['خدمة VIP', 'سيارة بديلة', 'مواقف خاصة'],
    location: { lat: 30.0195, lng: 31.4257 },
  },
];

export const towTypes: TowType[] = [
  {
    id: 'tow_001',
    name: 'ونش عادي',
    description: 'مناسب للسيارات الصغيرة والمتوسطة (سطحة ثابتة)',
    icon: 'truck',
    price: 100,
  },
  {
    id: 'tow_002',
    name: 'ونش هيدروليك',
    description: 'للأسطح المنخفضة والسيارات الفارهة (سطحة تنزل للأرض)',
    icon: 'layers',
    price: 150,
  },
  {
    id: 'tow_003',
    name: 'ونش سحب',
    description: 'للمساحات الضيقة جداً وسحب السيارات العالقة',
    icon: 'link',
    price: 120,
  },
];

export const mockDriver: Driver = {
  id: 'driver_001',
  name: 'أحمد محمود',
  avatar: null,
  rating: 4.9,
  reviewCount: 120,
  towType: 'ونش هيدروليك',
  plate: 'أ ب ج 1234',
  eta: 7,
  phone: '+20 11 9876 5432',
};

export const mockOrders: Order[] = [
  {
    id: 'SOS-8921',
    type: 'ونش',
    title: 'طلب ونش طوارئ',
    status: 'في الطريق إليك',
    statusColor: '#2DD4BF',
    driver: mockDriver,
    car: mockCars[0],
    createdAt: '2024-05-12T10:42:00',
    icon: 'truck',
  },
  {
    id: 'MNT-4402',
    type: 'صيانة',
    title: 'صيانة دورية (زيت وفلاتر)',
    status: 'بانتظار وصولك',
    statusColor: '#D69E2E',
    workshop: mockWorkshops[0],
    car: mockCars[0],
    date: 'الأحد، 12 مايو • 10:00 صباحاً',
    location: 'مركز الرياض لصيانة تيسلا، حي الملقا',
    createdAt: '2024-05-10T14:00:00',
    icon: 'build',
  },
];

export const mockHistory: HistoryOrder[] = [
  {
    id: 'ORD-77291',
    type: 'غسيل',
    title: 'غسيل ذكي بريميوم',
    status: 'مكتمل',
    statusColor: '#38A169',
    car: mockCars[0],
    date: '15 مايو 2025 • 04:30 مساءً',
    price: 150.00,
    icon: 'sparkles',
    month: 'مايو 2025',
    createdAt: '2025-05-15T16:30:00',
  },
  {
    id: 'MNT-4402',
    type: 'صيانة',
    title: 'صيانة دورية (زيوت وفلاتر)',
    status: 'قيد التنفيذ',
    statusColor: '#D69E2E',
    car: mockCars[0],
    date: 'اليوم • 08:00 م',
    price: 120.00,
    icon: 'build',
    month: 'مايو 2025',
    createdAt: '2025-05-15T20:00:00',
  },
  {
    id: 'SOS-9999',
    type: 'ونش',
    title: 'ونش طوارئ',
    status: 'ملغي',
    statusColor: '#E53E3E',
    car: mockCars[1],
    date: '20 أبريل 2025',
    price: 150.00,
    icon: 'truck',
    month: 'أبريل 2025',
    createdAt: '2025-04-20T00:00:00',
  },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', title: 'غسيل ذكي بريميوم', date: '15 مايو • 04:30 م', amount: -150.00, icon: 'sparkles', color: '#2DD4BF' },
  { id: 't2', title: 'إيداع (فوري)', date: '12 مايو • 10:15 ص', amount: 200.00, icon: 'download', color: '#3182CE' },
  { id: 't3', title: 'فحص ضغط الإطارات', date: '10 مايو • 09:00 م', amount: -45.00, icon: 'build', color: '#D69E2E' },
  { id: 't4', title: 'استرداد مبلغ (إلغاء حجز)', date: '08 مايو • 11:20 ص', amount: 75.00, icon: 'refresh', color: '#38A169' },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'تنبيه صيانة عاجل',
    body: 'سيارتك "تسلا موديل 3" تحتاج لفحص نظام الفرامل فوراً. تم رصد انخفاض في مستوى السوائل.',
    action: 'حجز فحص الآن',
    time: 'منذ 5 د',
    type: 'urgent',
    isToday: true,
  },
  {
    id: 'n2',
    title: 'تم قبول طلب الونش',
    body: 'طلبك رقم #8821 تم قبوله. السائق "أحمد" في طريقه إليك الآن، يمكنك تتبع الموقع مباشرة.',
    action: 'تتبع السائق',
    time: 'منذ 2 س',
    type: 'success',
    isToday: true,
  },
  {
    id: 'n3',
    title: 'عرض الويكند!',
    body: 'خصم 25% على غسيل السيارات اليدوي واللمعان السريع. العرض متاح حتى نهاية الأسبوع.',
    time: 'أمس، 10:30 م',
    type: 'promo',
    isToday: false,
  },
  {
    id: 'n4',
    title: 'تذكير: انتهاء الاستمارة',
    body: 'استمارة سيارتك "G-Class" ستنتهي خلال 15 يوماً. نوصيك ببدء إجراءات التجديد الآن.',
    time: 'أمس، 09:00 ص',
    type: 'reminder',
    isToday: false,
  },
];

export const mockAddresses: Address[] = [
  {
    id: 'addr_001',
    label: 'المنزل',
    address: 'حي الملقا، شارع الأمير محمد بن سعد، الرياض',
    icon: 'home',
  },
  {
    id: 'addr_002',
    label: 'العمل',
    address: 'برج الفيصلية، طريق الملك فهد، الرياض',
    icon: 'briefcase',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'driver',
    text: 'مرحباً بك يا محمد، أنا استلمت طلبك وأنا الآن في طريقي إليك. سأصل خلال 7 دقائق تقريباً.',
    time: '10:45 ص',
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'ممتاز، شكراً لك. أنا بانتظارك عند مدخل المواقف الرئيسي.',
    time: '10:46 ص',
  },
  {
    id: 'm3',
    sender: 'driver',
    text: 'تمام، هل السيارة في مكان يسمح للونش بالدخول أم أحتاج لمعدات إضافية؟',
    time: '10:47 ص',
  },
];

export const quickReplies: string[] = [
  'أنا في الانتظار',
  'المكان واضح؟',
  'كم ستحتاج من الوقت؟',
];

export const serviceCategories: string[] = ['الكل', 'طوارئ', 'صيانة دورية', 'ميكانيكا', 'كهرباء', 'تكييف', 'إطارات', 'فحص', 'عناية بالسيارة', 'متقدمة'];

export const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'حجز سهل\nوخدمات ذكية',
    subtitle: 'احجز موعد صيانة، قارن بين أفضل الورش المعتمدة، وادفع بسهولة وأمان في مكان واحد.',
    highlightedText: 'وخدمات ذكية',
  },
  {
    id: '2',
    title: 'خدمة طوارئ سريعة\nوتتبع مباشر',
    subtitle: 'اطلب شاحنة سحب فوراً وتتبعها في الوقت الفعلي حتى وصولها لموقعك بدقة.',
    highlightedText: 'وتتبع مباشر',
  },
  {
    id: '3',
    title: 'كل احتياجات سيارتك\nفي تطبيق واحد',
    subtitle: 'أدر سيارتك، وتتبع الصيانة الدورية، واحصل على مساعدة فورية في أي وقت ومن أي مكان.',
    highlightedText: 'في تطبيق واحد',
  },
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'apple_pay', name: 'Apple Pay', icon: 'logo-apple', description: 'دفع فوري وآمن' },
  { id: 'mada', name: 'بطاقة مدى', icon: 'card', description: null },
  { id: 'cash', name: 'الدفع نقداً للسائق', icon: 'cash', description: null },
];
