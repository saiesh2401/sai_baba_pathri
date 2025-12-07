import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

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
            isActive: true,
        },
    });

    console.log('✅ Admin user created:', admin.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
