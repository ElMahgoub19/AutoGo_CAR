// AutoGo Backend - Seed Script
// Usage: node src/seed.js
require('dotenv').config();
const prisma = require('./config/database');

async function main() {
  console.log('🌱 Seeding AutoGo database...\n');

  // ─── Clean existing data ─────────────────────────────
  await prisma.rating.deleteMany();
  await prisma.orderTracking.deleteMany();
  await prisma.message.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.order.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.address.deleteMany();
  await prisma.carReminder.deleteMany();
  await prisma.car.deleteMany();
  await prisma.workshopService.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleaned old data');

  // ─── Users ────────────────────────────────────────────
  const user = await prisma.user.create({
    data: {
      name: 'محمد علي',
      phone: '+201012345678',
      email: 'mohamed@email.com',
      city: 'القاهرة، مصر',
      membershipType: 'بريميوم',
      points: 2450,
      isVerified: true,
    },
  });
  console.log('✅ User created:', user.name);

  // ─── Wallet ───────────────────────────────────────────
  const wallet = await prisma.wallet.create({
    data: { userId: user.id, balance: 450.00, currency: 'EGP' },
  });
  await prisma.transaction.createMany({
    data: [
      { walletId: wallet.id, type: 'payment', amount: -150, title: 'غسيل ذكي بريميوم', status: 'completed' },
      { walletId: wallet.id, type: 'deposit', amount: 200, title: 'إيداع (فوري)', paymentMethod: 'fawry', status: 'completed' },
      { walletId: wallet.id, type: 'payment', amount: -45, title: 'فحص ضغط الإطارات', status: 'completed' },
      { walletId: wallet.id, type: 'refund', amount: 75, title: 'استرداد مبلغ (إلغاء حجز)', status: 'completed' },
    ],
  });
  console.log('✅ Wallet + Transactions seeded');

  // ─── Cars ─────────────────────────────────────────────
  const car1 = await prisma.car.create({
    data: {
      userId: user.id, brand: 'هيونداي', model: 'إلنترا', year: 2024,
      plate: 'أ ب ج 1234', color: '#FFFFFF', mileage: 45200,
      nextServiceKm: 2500, status: 'نشط', isActive: true,
    },
  });
  await prisma.carReminder.create({
    data: { carId: car1.id, type: 'license', message: 'باقي 15 يوم على انتهاء رخصة السيارة', isUrgent: true },
  });
  const car2 = await prisma.car.create({
    data: {
      userId: user.id, brand: 'كيا', model: 'سبورتيدج', year: 2023,
      plate: 'د هـ و 5678', color: '#1A1A1A', mileage: 13800,
      nextServiceKm: -200, status: 'تحتاج صيانة', isActive: false,
    },
  });
  console.log('✅ Cars seeded:', car1.brand, car2.brand);

  // ─── Addresses ────────────────────────────────────────
  await prisma.address.createMany({
    data: [
      { userId: user.id, label: 'المنزل', address: 'حي المعادي، شارع النصر، القاهرة', latitude: 30.0444, longitude: 31.2357, isDefault: true },
      { userId: user.id, label: 'العمل', address: 'مدينة نصر، شارع مكرم عبيد، القاهرة', latitude: 30.0595, longitude: 31.3457 },
    ],
  });
  console.log('✅ Addresses seeded');

  // ─── Service Categories ───────────────────────────────
  const categories = await Promise.all([
    prisma.serviceCategory.create({ data: { name: 'طوارئ', icon: 'alert-circle', sortOrder: 0 } }),
    prisma.serviceCategory.create({ data: { name: 'صيانة دورية', icon: 'build', sortOrder: 1 } }),
    prisma.serviceCategory.create({ data: { name: 'ميكانيكا', icon: 'settings', sortOrder: 2 } }),
    prisma.serviceCategory.create({ data: { name: 'كهرباء', icon: 'flash', sortOrder: 3 } }),
    prisma.serviceCategory.create({ data: { name: 'تكييف', icon: 'snow', sortOrder: 4 } }),
    prisma.serviceCategory.create({ data: { name: 'إطارات', icon: 'disc', sortOrder: 5 } }),
    prisma.serviceCategory.create({ data: { name: 'فحص', icon: 'search', sortOrder: 6 } }),
    prisma.serviceCategory.create({ data: { name: 'عناية بالسيارة', icon: 'sparkles', sortOrder: 7 } }),
    prisma.serviceCategory.create({ data: { name: 'متقدمة', icon: 'hardware-chip', sortOrder: 8 } }),
  ]);
  const catMap = {};
  categories.forEach(c => catMap[c.name] = c.id);
  console.log('✅ Service categories seeded');

  // ─── Services ─────────────────────────────────────────
  const servicesData = [
    { name: 'تغيير الزيت والفلاتر', basePrice: 120, icon: 'water', cat: 'صيانة دورية' },
    { name: 'فحص البطارية', basePrice: 80, icon: 'battery-half', cat: 'صيانة دورية' },
    { name: 'صيانة المكابح', basePrice: 150, icon: 'shield-checkmark', cat: 'ميكانيكا' },
    { name: 'صيانة التكييف', basePrice: 200, icon: 'snow', cat: 'تكييف' },
    { name: 'غسيل ذكي بريميوم', basePrice: 150, icon: 'sparkles', cat: 'عناية بالسيارة' },
    { name: 'فحص ضغط الإطارات', basePrice: 45, icon: 'speedometer', cat: 'صيانة دورية' },
    { name: 'ونش إنقاذ (Towing)', basePrice: 250, icon: 'car-sport', cat: 'طوارئ' },
    { name: 'شحن بطارية', basePrice: 100, icon: 'flash', cat: 'طوارئ' },
    { name: 'صيانة المحرك', basePrice: 500, icon: 'settings', cat: 'ميكانيكا' },
    { name: 'تغيير كاوتش', basePrice: 100, icon: 'disc', cat: 'إطارات' },
    { name: 'فحص شامل للعربية', basePrice: 250, icon: 'search', cat: 'فحص' },
    { name: 'فحص قبل الشراء', basePrice: 500, icon: 'document-text', cat: 'فحص' },
    { name: 'تركيب GPS', basePrice: 350, icon: 'location', cat: 'متقدمة' },
    { name: 'تغيير بطارية', basePrice: 100, icon: 'battery-full', cat: 'كهرباء' },
    { name: 'شحن فريون', basePrice: 300, icon: 'snow-outline', cat: 'تكييف' },
    { name: 'SOS طلب سريع', basePrice: 300, icon: 'alert-circle', cat: 'طوارئ' },
  ];
  const services = [];
  for (const s of servicesData) {
    const srv = await prisma.service.create({
      data: { name: s.name, basePrice: s.basePrice, icon: s.icon, categoryId: catMap[s.cat] },
    });
    services.push(srv);
  }
  console.log(`✅ ${services.length} services seeded`);

  // ─── Workshops ────────────────────────────────────────
  const workshopsData = [
    { name: 'مركز النيل لصيانة السيارات', address: 'المعادي، شارع النصر، القاهرة', lat: 30.0444, lng: 31.2357, rating: 4.9, reviewCount: 1240, features: ['مركز معتمد', 'مواقف سيارات', 'واي فاي مجاني', 'منطقة انتظار'], openHours: '08:00 ص - 10:00 م', workDays: 'الأحد - الخميس' },
    { name: 'مركز المهندس المتخصص', address: 'الدقي، ميدان فيني، الجيزة', lat: 30.0395, lng: 31.2157, rating: 4.8, reviewCount: 850, features: ['قطع غيار أصلية', 'فحص كمبيوتر', 'ضمان على الخدمة'], openHours: '09:00 ص - 09:00 م', workDays: 'السبت - الخميس' },
    { name: 'ورشة السلام المتكاملة', address: 'مدينة نصر، مكرم عبيد، القاهرة', lat: 30.0595, lng: 31.3457, rating: 4.5, reviewCount: 320, features: ['مركز معتمد', 'مواقف سيارات', 'منطقة انتظار'], openHours: '09:00 ص - 09:00 م', workDays: 'السبت - الخميس', isOpen: false },
    { name: 'أوتو سيرفيس الأهرام', address: 'شارع الهرم، الجيزة', lat: 29.9895, lng: 31.1457, rating: 4.3, reviewCount: 210, features: ['غسيل سيارات', 'تغيير إطارات', 'مقهى'], openHours: '08:30 ص - 10:30 م', workDays: 'يومياً' },
    { name: 'مركز النور لكهرباء السيارات', address: 'مصر الجديدة، ميدان تريومف، القاهرة', lat: 30.1095, lng: 31.3357, rating: 4.7, reviewCount: 450, features: ['شحن بطارية', 'تكييف', 'متخصص كهرباء'], openHours: '10:00 ص - 11:00 م', workDays: 'السبت - الخميس' },
    { name: 'مركز طيبة للميكانيكا', address: 'التجمع الخامس، شارع التسعين، القاهرة', lat: 30.0195, lng: 31.4257, rating: 4.6, reviewCount: 156, features: ['خدمة VIP', 'سيارة بديلة', 'مواقف خاصة'], openHours: '09:00 ص - 08:00 م', workDays: 'يومياً' },
  ];
  const workshops = [];
  for (const w of workshopsData) {
    const ws = await prisma.workshop.create({
      data: {
        name: w.name, address: w.address, latitude: w.lat, longitude: w.lng,
        rating: w.rating, reviewCount: w.reviewCount, features: w.features,
        openHours: w.openHours, workDays: w.workDays, isOpen: w.isOpen !== false,
      },
    });
    workshops.push(ws);
    // Link some services to each workshop
    for (const srv of services.slice(0, 8)) {
      await prisma.workshopService.create({
        data: { workshopId: ws.id, serviceId: srv.id },
      });
    }
  }
  console.log(`✅ ${workshops.length} workshops seeded`);

  // ─── Drivers ──────────────────────────────────────────
  const driver = await prisma.driver.create({
    data: {
      name: 'أحمد محمود', phone: '+201199876543', rating: 4.9, reviewCount: 120,
      towType: 'ونش هيدروليك', vehiclePlate: 'أ ب ج 1234',
      isOnline: true, currentLat: 30.0400, currentLng: 31.2300,
    },
  });
  await prisma.driver.create({
    data: {
      name: 'حسن إبراهيم', phone: '+201155556666', rating: 4.7, reviewCount: 85,
      towType: 'ونش عادي', vehiclePlate: 'د هـ و 5678',
      isOnline: true, currentLat: 30.0500, currentLng: 31.2400,
    },
  });
  console.log('✅ Drivers seeded');

  // ─── Notifications ────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      { userId: user.id, title: 'تنبيه صيانة عاجل', body: 'سيارتك "هيونداي إلنترا" تحتاج لفحص نظام الفرامل فوراً.', type: 'urgent', action: 'حجز فحص الآن' },
      { userId: user.id, title: 'تم قبول طلب الونش', body: 'طلبك تم قبوله. السائق "أحمد" في طريقه إليك الآن.', type: 'success', action: 'تتبع السائق' },
      { userId: user.id, title: 'عرض الويكند!', body: 'خصم 25% على غسيل السيارات. العرض متاح حتى نهاية الأسبوع.', type: 'promo' },
      { userId: user.id, title: 'تذكير: انتهاء الرخصة', body: 'رخصة سيارتك ستنتهي خلال 15 يوماً.', type: 'reminder' },
    ],
  });
  console.log('✅ Notifications seeded');

  // ─── Promo Codes ──────────────────────────────────────
  await prisma.promoCode.createMany({
    data: [
      { code: 'AUTOGO25', discountType: 'percentage', discountValue: 25, maxUses: 100 },
      { code: 'FIRST50', discountType: 'fixed', discountValue: 50, maxUses: 500 },
    ],
  });
  console.log('✅ Promo codes seeded');

  console.log('\n🎉 Seeding complete! Database is ready.\n');
  console.log(`📧 Test User: ${user.phone}`);
  console.log(`🔑 Dev OTP:   1234\n`);
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
