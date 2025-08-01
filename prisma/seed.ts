import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // יוצרים משתמש מנהל
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pinto.com' },
    update: {},
    create: {
      name: 'מנהל המערכת',
      email: 'admin@pinto.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // יוצרים נהג
  const driverPassword = await bcrypt.hash('driver123', 10)
  const driver = await prisma.user.upsert({
    where: { email: 'driver@pinto.com' },
    update: {},
    create: {
      name: 'נהג דוגמה',
      email: 'driver@pinto.com',
      password: driverPassword,
      role: 'DRIVER',
    },
  })

  // יוצרים כמה רכבים לדוגמה
  const vehicle1 = await prisma.vehicle.upsert({
    where: { id: 'vehicle-1' },
    update: {},
    create: {
      id: 'vehicle-1',
      name: 'מיניבוס פינטו 1',
      type: 'MINIBUS',
      plateNumber: '123-45-678',
    },
  })

  const vehicle2 = await prisma.vehicle.upsert({
    where: { id: 'vehicle-2' },
    update: {},
    create: {
      id: 'vehicle-2',
      name: 'אוטובוס פינטו 2',
      type: 'BUS',
      plateNumber: '987-65-432',
    },
  })

  // יוצרים מסלול לדוגמה
  const route = await prisma.route.create({
    data: {
      date: new Date(),
      time: '08:00',
      driverId: driver.id,
      vehicleId: vehicle1.id,
      description: 'מסלול תל אביב - ירושלים',
    },
  })

  console.log('Seed completed successfully!')
  console.log({ admin, driver, vehicle1, vehicle2, route })
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