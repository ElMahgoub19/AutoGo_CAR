// AutoGo - Mock Data
export const mockUser = {
  id: 'user_001',
  name: 'محمد العتيبي',
  phone: '+966 50 123 4567',
  email: 'mohammed@email.com',
  city: 'الرياض، المملكة العربية السعودية',
  avatar: null,
  membershipType: 'بريميوم',
  points: 2450,
  walletBalance: 450.00,
};

export const mockCars = [
  {
    id: 'car_001',
    brand: 'تسلا',
    model: 'موديل 3',
    year: 2024,
    plate: 'أ ب ج 1234',
    mileage: 45200,
    nextService: 2500,
    status: 'نشط',
    color: '#FFFFFF',
    image: null,
    lastLocation: { lat: 24.7136, lng: 46.6753, address: 'الرياض، حي الملقا' },
    reminders: [
      { type: 'license', message: 'باقي 15 يوم على انتهاء رخصة السيارة', urgent: true },
    ],
  },
  {
    id: 'car_002',
    brand: 'مرسيدس',
    model: 'G-Class',
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

export const mockServices = [
  {
    id: 'srv_001',
    name: 'تغيير الزيت والفلاتر',
    description: 'حماية المحرك وزيادة عمره الافتراضي مع زيت أصلي',
    price: 120,
    icon: 'water',
    category: 'فلاتر وزيوت',
  },
  {
    id: 'srv_002',
    name: 'فحص وتغيير البطارية',
    description: 'تأكد من قوة التشغيل في جميع الظروف المناخية',
    price: 80,
    icon: 'battery-half',
    category: 'كهرباء',
  },
  {
    id: 'srv_003',
    name: 'صيانة المكابح',
    description: 'الأمان أولاً، فحص الفحمات ونظام الهيدروليك',
    price: 150,
    icon: 'disc',
    category: 'ميكانيكا',
  },
  {
    id: 'srv_004',
    name: 'صيانة التكييف',
    description: 'تبريد مثالي وفحص تسريب الفريون وتنظيف الفلتر',
    price: 200,
    icon: 'snowflake',
    category: 'كهرباء',
  },
  {
    id: 'srv_005',
    name: 'غسيل ذكي بريميوم',
    description: 'تنظيف شامل للهيكل الخارجي مع تلميع داخلي نانو سيراميك',
    price: 150,
    icon: 'sparkles',
    category: 'الكل',
  },
  {
    id: 'srv_006',
    name: 'فحص ضغط الإطارات',
    description: 'تعديل الضغط لجميع الإطارات وفحص عمق المداس',
    price: 45,
    icon: 'circle',
    category: 'ميكانيكا',
  },
];

export const mockWorkshops = [
  {
    id: 'ws_001',
    name: 'مركز الرياض لصيانة تيسلا',
    address: 'حي الملقا، طريق الملك فهد الفرعي، الرياض',
    distance: 2.4,
    rating: 4.9,
    reviewCount: 1240,
    isOpen: true,
    openHours: '08:00 ص - 10:00 م',
    workDays: 'الأحد - الخميس',
    image: null,
    features: ['مركز معتمد', 'مواقف سيارات', 'واي فاي مجاني', 'منطقة انتظار'],
    location: { lat: 24.7736, lng: 46.6353 },
  },
  {
    id: 'ws_002',
    name: 'ورشة العتيبي المتكاملة',
    address: 'حي الصحافة، الرياض',
    distance: 4.1,
    rating: 4.5,
    reviewCount: 320,
    isOpen: false,
    openHours: '09:00 ص - 09:00 م',
    workDays: 'السبت - الخميس',
    image: null,
    features: ['مركز معتمد', 'مواقف سيارات'],
    location: { lat: 24.7936, lng: 46.6553 },
  },
  {
    id: 'ws_003',
    name: 'مركز أوتو فيكس للمحركات',
    address: 'حي النرجس، الرياض',
    distance: 6.8,
    rating: 4.2,
    reviewCount: 180,
    isOpen: true,
    openHours: '08:00 ص - 11:00 م',
    workDays: 'السبت - الخميس',
    image: null,
    features: ['مواقف سيارات', 'واي فاي مجاني'],
    location: { lat: 24.8136, lng: 46.6753 },
  },
];

export const towTypes = [
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

export const mockDriver = {
  id: 'driver_001',
  name: 'أحمد المنصور',
  avatar: null,
  rating: 4.9,
  reviewCount: 120,
  towType: 'ونش هيدروليك',
  plate: 'أ ب ج 1234',
  eta: 7,
  phone: '+966 55 987 6543',
};

export const mockOrders = [
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

export const mockHistory = [
  {
    id: 'ORD-77291',
    type: 'غسيل',
    title: 'غسيل ذكي بريميوم',
    status: 'مكتمل',
    car: mockCars[0],
    date: '15 مايو 2025 • 04:30 مساءً',
    price: 150.00,
    icon: 'sparkles',
    month: 'مايو 2025',
  },
  {
    id: 'MNT-4402',
    type: 'صيانة',
    title: 'صيانة دورية (زيوت وفلاتر)',
    status: 'قيد التنفيذ',
    car: mockCars[0],
    date: 'اليوم • 08:00 م',
    price: 120.00,
    icon: 'build',
    month: 'مايو 2025',
  },
  {
    id: 'SOS-9999',
    type: 'ونش',
    title: 'ونش طوارئ',
    status: 'ملغي',
    car: mockCars[1],
    date: '20 أبريل 2025',
    price: 150.00,
    icon: 'truck',
    month: 'أبريل 2025',
  },
];

export const mockTransactions = [
  { id: 't1', title: 'غسيل ذكي بريميوم', date: '15 مايو • 04:30 م', amount: -150.00, icon: 'sparkles', color: '#2DD4BF' },
  { id: 't2', title: 'إيداع (Apple Pay)', date: '12 مايو • 10:15 ص', amount: 200.00, icon: 'download', color: '#3182CE' },
  { id: 't3', title: 'فحص ضغط الإطارات', date: '10 مايو • 09:00 م', amount: -45.00, icon: 'build', color: '#D69E2E' },
  { id: 't4', title: 'استرداد مبلغ (إلغاء حجز)', date: '08 مايو • 11:20 ص', amount: 75.00, icon: 'refresh', color: '#38A169' },
];

export const mockNotifications = [
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

export const mockAddresses = [
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

export const mockChatMessages = [
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

export const quickReplies = [
  'أنا في الانتظار',
  'المكان واضح؟',
  'كم ستحتاج من الوقت؟',
];

export const serviceCategories = ['الكل', 'ميكانيكا', 'كهرباء', 'فلاتر وزيوت'];

export const onboardingData = [
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

export const paymentMethods = [
  { id: 'apple_pay', name: 'Apple Pay', icon: 'logo-apple', description: 'دفع فوري وآمن' },
  { id: 'mada', name: 'بطاقة مدى', icon: 'card', description: null },
  { id: 'cash', name: 'الدفع نقداً للسائق', icon: 'cash', description: null },
];
