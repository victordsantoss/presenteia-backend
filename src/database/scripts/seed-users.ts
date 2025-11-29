import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';

config();

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('🔧 Configurações do banco:');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

  console.log('🚀 Iniciando seed dos usuários...');

  try {
    // Buscar a role USER
    const userRole = await prisma.role.findFirst({
      where: { name: 'USER' },
    });

    if (!userRole) {
      console.error('❌ Role USER não encontrada. Execute o seed-roles primeiro.');
      process.exit(1);
    }

    const usersToCreate = [
      {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        cpf: '123.456.789-00',
        password: await bcrypt.hash('senha123', 10),
        birthDate: new Date('1990-05-15'),
        roleId: userRole.id,
        isActive: true,
      },
      {
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        cpf: '987.654.321-00',
        password: await bcrypt.hash('senha123', 10),
        birthDate: new Date('1992-08-20'),
        roleId: userRole.id,
        isActive: true,
      },
      {
        name: 'Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        cpf: '456.789.123-00',
        password: await bcrypt.hash('senha123', 10),
        birthDate: new Date('1988-12-10'),
        roleId: userRole.id,
        isActive: true,
      },
    ];

    for (const userData of usersToCreate) {
      const existingUser = await prisma.user.findFirst({
        where: { email: userData.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: userData,
        });
        console.log(`✅ Usuário '${userData.name}' criado com sucesso`);
      } else {
        console.log(
          `⚠️  Usuário '${userData.name}' já existe no banco de dados`,
        );
      }
    }

    console.log('🎉 Seed dos usuários concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed dos usuários:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
seedUsers().catch((error) => {
  console.error('❌ Erro fatal ao executar seed:', error);
  process.exit(1);
});

