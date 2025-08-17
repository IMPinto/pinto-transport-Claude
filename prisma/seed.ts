import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing data
  await prisma.route.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'מנהל המערכת',
      email: 'admin@pinto.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create multiple drivers
  const driverPassword = await bcrypt.hash('driver123', 10)
  const drivers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'דוד כהן',
        email: 'david@pinto.com',
        password: driverPassword,
        role: 'DRIVER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'משה לוי',
        email: 'moshe@pinto.com',
        password: driverPassword,
        role: 'DRIVER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'יוסי אברהם',
        email: 'yossi@pinto.com',
        password: driverPassword,
        role: 'DRIVER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'אבי רוזן',
        email: 'avi@pinto.com',
        password: driverPassword,
        role: 'DRIVER',
      },
    }),
    prisma.user.create({
      data: {
        name: 'רן שמיר',
        email: 'ran@pinto.com',
        password: driverPassword,
        role: 'DRIVER',
      },
    }),
  ])

  // Create vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        name: 'מיניבוס פינטו 1',
        type: 'MINIBUS',
        plateNumber: '123-45-678',
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'מיניבוס פינטו 2',
        type: 'MINIBUS',
        plateNumber: '234-56-789',
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'אוטובוס פינטו A',
        type: 'BUS',
        plateNumber: '987-65-432',
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'אוטובוס פינטו B',
        type: 'BUS',
        plateNumber: '876-54-321',
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'מיניבוס פינטו 3',
        type: 'MINIBUS',
        plateNumber: '345-67-890',
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'אוטובוס פינטו C',
        type: 'BUS',
        plateNumber: '765-43-210',
      },
    }),
  ])

  // Create routes for the next 30 days
  const routes = []
  const routeDescriptions = [
    'תל אביב - ירושלים',
    'חיפה - נתניה',
    'באר שבע - אשדוד',
    'רמת גן - פתח תקווה',
    'הוד השרון - רעננה',
    'כפר סבא - רמת השרון',
    'בני ברק - גבעתיים',
    'אשקלון - קרית גת',
    'רחובות - נס ציונה',
    'קרית אונו - יהוד',
  ]
  
  const times = ['06:00', '07:30', '08:00', '09:15', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30']

  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    // Create 3-5 routes per day
    const routesPerDay = Math.floor(Math.random() * 3) + 3
    
    for (let j = 0; j < routesPerDay; j++) {
      const route = await prisma.route.create({
        data: {
          date: date,
          time: times[Math.floor(Math.random() * times.length)],
          driverId: drivers[Math.floor(Math.random() * drivers.length)].id,
          vehicleId: vehicles[Math.floor(Math.random() * vehicles.length)].id,
          description: routeDescriptions[Math.floor(Math.random() * routeDescriptions.length)],
        },
      })
      routes.push(route)
    }
  }

  console.log('Seed completed successfully!')
  console.log(`Created:`)
  console.log(`- 1 admin user`)
  console.log(`- ${drivers.length} drivers`)
  console.log(`- ${vehicles.length} vehicles`) 
  console.log(`- ${routes.length} routes`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })