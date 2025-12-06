import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://saieshsingh@localhost:5432/pathri_db?schema=public' });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@saibaba-pathri.org' },
        update: {},
        create: {
            email: 'admin@saibaba-pathri.org',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create sevas
    const sevas = await Promise.all([
        prisma.seva.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: 'Daily Abhishekam',
                description: 'Daily morning abhishekam to Sai Baba',
                baseAmount: 500,
                isDaily: true,
            },
        }),
        prisma.seva.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: 'Special Archana',
                description: 'Special archana with 108 names',
                baseAmount: 1100,
                isDaily: false,
            },
        }),
        prisma.seva.upsert({
            where: { id: 3 },
            update: {},
            create: {
                name: 'Annadan',
                description: 'Food donation for devotees',
                baseAmount: 2100,
                isDaily: false,
            },
        }),
    ]);
    console.log(`✅ Created ${sevas.length} sevas`);

    // Create locations
    const locations = await Promise.all([
        prisma.location.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: 'Main Store',
                type: 'STORE',
                description: 'Central storage facility',
            },
        }),
        prisma.location.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: 'Temple Pooja Room',
                type: 'TEMPLE',
                description: 'Daily pooja items storage',
            },
        }),
        prisma.location.upsert({
            where: { id: 3 },
            update: {},
            create: {
                name: 'Kitchen',
                type: 'KITCHEN',
                description: 'Annadan kitchen storage',
            },
        }),
        prisma.location.upsert({
            where: { id: 4 },
            update: {},
            create: {
                name: 'Shop',
                type: 'SHOP',
                description: 'Prasad and items shop',
            },
        }),
    ]);
    console.log(`✅ Created ${locations.length} locations`);

    // Create items
    const items = await Promise.all([
        prisma.item.upsert({
            where: { id: 1 },
            update: {},
            create: {
                name: 'Rice',
                category: 'KITCHEN',
                unit: 'KG',
                minStock: 10,
            },
        }),
        prisma.item.upsert({
            where: { id: 2 },
            update: {},
            create: {
                name: 'Oil',
                category: 'POOJA',
                unit: 'LITRE',
                minStock: 5,
            },
        }),
        prisma.item.upsert({
            where: { id: 3 },
            update: {},
            create: {
                name: 'Flowers',
                category: 'POOJA',
                unit: 'PIECE',
                minStock: 100,
            },
        }),
        prisma.item.upsert({
            where: { id: 4 },
            update: {},
            create: {
                name: 'Incense Sticks',
                category: 'POOJA',
                unit: 'PIECE',
                minStock: 50,
            },
        }),
        prisma.item.upsert({
            where: { id: 5 },
            update: {},
            create: {
                name: 'Wicks',
                category: 'POOJA',
                unit: 'PIECE',
                minStock: 200,
            },
        }),
    ]);
    console.log(`✅ Created ${items.length} items`);

    // Create livestream config
    const livestream = await prisma.livestream.upsert({
        where: { id: 1 },
        update: {},
        create: {
            platform: 'YouTube',
            streamUrl: null,
            isLive: false,
        },
    });
    console.log('✅ Created livestream configuration');

    console.log('🎉 Seeding completed!');
    console.log('\n📝 Login credentials:');
    console.log('Email: admin@saibaba-pathri.org');
    console.log('Password: admin123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
