// Test script: simulates a provider connecting and listening for orders
const { io } = require('socket.io-client');

const SOCKET_URL = 'http://localhost:5000';

console.log('\n🔌 مقدم الخدمة (Provider) يتصل بالخادم...\n');

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnection: true,
});

socket.on('connect', () => {
  console.log('✅ تم الاتصال! Socket ID:', socket.id);
  
  // Join providers room using correct event name
  socket.emit('join:provider', 'test-provider-001');
  console.log('📡 انضم لغرفة مقدمي الخدمة (providers room)');
  console.log('⏳ ينتظر الطلبات...\n');
});

socket.on('order:new', (order) => {
  console.log('\n🚨 ======== طلب جديد وصل! ========');
  console.log('📦 رقم الطلب:', order.orderNumber);
  console.log('📍 العنوان:', order.pickupAddress);
  console.log('💰 السعر:', order.estimatedPrice, 'ج.م');
  console.log('🚗 المركبة:', order.vehicle?.model || 'غير محدد');
  console.log('🔧 المشكلة:', order.problem?.type || 'غير محدد');
  console.log('👤 العميل:', order.customer?.name || 'غير محدد');
  console.log('======================================\n');
  
  // Simulate accepting after 2 seconds
  setTimeout(() => {
    console.log('✅ مقدم الخدمة قبل الطلب!');
    socket.emit('provider:accept', { orderId: order.orderId, providerId: 'test-provider-001' });
  }, 2000);
});

socket.on('disconnect', () => {
  console.log('❌ انقطع الاتصال');
});

socket.on('connect_error', (err) => {
  console.error('❌ خطأ في الاتصال:', err.message);
});

// Keep alive for 60 seconds then exit
setTimeout(() => {
  console.log('\n⏱ انتهى وقت الاختبار.');
  process.exit(0);
}, 60000);

console.log('ℹ️  الاختبار سيستمر 60 ثانية. أنشئ طلباً من التطبيق الآن!\n');
