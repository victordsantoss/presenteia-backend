import { PrismaClient, RoleTypes } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function seedRoles() {
  console.log('🔧 Configurações do banco:');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

  const rolesToCreate = [
    { name: RoleTypes.SADMIN, isActive: true },
    { name: RoleTypes.ADMIN, isActive: true },
    { name: RoleTypes.MANAGER, isActive: true },
    { name: RoleTypes.USER, isActive: true },
    { name: RoleTypes.GUEST, isActive: true },
  ];

  console.log('🚀 Iniciando seed das roles...');

  try {
    for (const roleData of rolesToCreate) {
      const existingRole = await prisma.role.findFirst({
        where: { name: roleData.name },
      });

      if (!existingRole) {
        await prisma.role.create({
          data: roleData,
        });
        console.log(`✅ Role '${roleData.name}' criada com sucesso`);
      } else {
        console.log(`⚠️  Role '${roleData.name}' já existe no banco de dados`);
      }
    }

    console.log('🎉 Seed das roles concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed das roles:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
seedRoles().catch((error) => {
  console.error('❌ Erro fatal ao executar seed:', error);
  process.exit(1);
});
