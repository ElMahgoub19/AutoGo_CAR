require('dotenv').config();
const prisma = require('./src/config/database');

async function main() {
  console.log('Testing Database Connection and Creating Order...');
  
  // Find the first user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log('No users found in database. Please run seed script first.');
    return;
  }

  // Create a dummy order
  const orderNumber = 'ORD-' + Date.now();
  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: user.id,
      type: 'test_order',
      status: 'pending',
      price: 150.00,
      total: 150.00,
      notes: 'Test order from script',
      pickupAddress: 'Test Address',
      paymentMethod: 'cash'
    }
  });

  console.log('Successfully created test order:');
  console.log(order);
}

main()
  .catch(e => console.error('Error connecting to DB or creating order:', e))
  .finally(() => prisma.$disconnect());
