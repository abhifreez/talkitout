import { PrismaClient, UserRole, DoctorType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@talkitout.com' },
    update: {},
    create: {
      email: 'admin@talkitout.com',
      password: hashedPassword,
      name: 'Admin User',
      role: UserRole.admin,
      phone: '+1234567890',
      isActive: true,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create Therapist User
  const therapistUser = await prisma.user.upsert({
    where: { email: 'therapist@talkitout.com' },
    update: {},
    create: {
      email: 'therapist@talkitout.com',
      password: hashedPassword,
      name: 'Dr. Sarah Johnson',
      role: UserRole.therapist,
      phone: '+1234567891',
      isActive: true,
    },
  });

  // Create Therapist Doctor Profile
  const therapist = await prisma.doctor.upsert({
    where: { userId: therapistUser.id },
    update: {},
    create: {
      userId: therapistUser.id,
      type: DoctorType.therapist,
      specialization: 'Clinical Psychology',
      licenseNumber: 'PSY-12345',
    },
  });

  console.log('✅ Created therapist:', therapistUser.email);

  // Create Intern User
  const internUser = await prisma.user.upsert({
    where: { email: 'intern@talkitout.com' },
    update: {},
    create: {
      email: 'intern@talkitout.com',
      password: hashedPassword,
      name: 'John Smith',
      role: UserRole.intern,
      phone: '+1234567892',
      isActive: true,
    },
  });

  // Create Intern Doctor Profile
  const intern = await prisma.doctor.upsert({
    where: { userId: internUser.id },
    update: {},
    create: {
      userId: internUser.id,
      type: DoctorType.intern,
      specialization: 'Psychology Intern',
      assignedToId: therapist.id,
    },
  });

  console.log('✅ Created intern:', internUser.email);

  // Create Time Slots for Therapist
  const timeSlots = [
    { time: '09:00', label: '09:00 AM' },
    { time: '10:00', label: '10:00 AM' },
    { time: '11:00', label: '11:00 AM' },
    { time: '13:00', label: '01:00 PM' },
    { time: '14:00', label: '02:00 PM' },
    { time: '15:00', label: '03:00 PM' },
    { time: '16:00', label: '04:00 PM' },
    { time: '17:00', label: '05:00 PM' },
  ];

  // Create time slots for Monday to Friday (1-5)
  for (let day = 1; day <= 5; day++) {
    for (const slot of timeSlots) {
      const [hour] = slot.time.split(':');
      const startTime = slot.time;
      const endTime = `${String(parseInt(hour) + 1).padStart(2, '0')}:00`;

      // Check if slot already exists
      const existingSlot = await prisma.timeSlot.findFirst({
        where: {
          doctorId: therapist.id,
          startTime,
          dayOfWeek: day,
        },
      });

      if (!existingSlot) {
        await prisma.timeSlot.create({
          data: {
            doctorId: therapist.id,
            startTime,
            endTime,
            dayOfWeek: day,
            isAvailable: true,
          },
        });
      }
    }
  }

  console.log('✅ Created time slots for therapist');

  // Create Customer User
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: hashedPassword,
      name: 'Jane Doe',
      role: UserRole.customer,
      phone: '+1234567893',
      isActive: true,
    },
  });

  // Create Customer Profile
  await prisma.customer.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      userId: customerUser.id,
      assignedInternId: intern.id,
      address: '123 Main St, Springfield',
      emergencyContact: 'John Doe: +1987654321',
      notes: 'Initial consultation scheduled.',
    },
  });

  console.log('✅ Created customer:', customerUser.email);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
