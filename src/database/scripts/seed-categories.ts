import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function seedCategories() {
  console.log('🔧 Configurações do banco:');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

  const categoriesToCreate = [
    {
      name: 'Cozinha',
      description: 'Utensílios e eletrodomésticos para cozinha',
      icon: '🍳',
      isActive: true,
    },
    {
      name: 'Casa e Decoração',
      description: 'Itens decorativos e para organização da casa',
      icon: '🏠',
      isActive: true,
    },
    {
      name: 'Quarto',
      description: 'Roupas de cama, travesseiros e itens para o quarto',
      icon: '🛏️',
      isActive: true,
    },
    {
      name: 'Banheiro',
      description: 'Toalhas, tapetes e acessórios para banheiro',
      icon: '🚿',
      isActive: true,
    },
    {
      name: 'Eletrônicos',
      description: 'TVs, computadores e outros eletrônicos',
      icon: '📱',
      isActive: true,
    },
    {
      name: 'Eletrodomésticos',
      description:
        'Geladeira, fogão, máquina de lavar e outros eletrodomésticos',
      icon: '🔌',
      isActive: true,
    },
    {
      name: 'Mesa e Jantar',
      description: 'Louças, talheres, copos e itens para mesa',
      icon: '🍽️',
      isActive: true,
    },
    {
      name: 'Lavanderia',
      description: 'Ferros, tábuas de passar e organizadores',
      icon: '🧺',
      isActive: true,
    },
    {
      name: 'Bebê',
      description: 'Roupas, fraldas e acessórios para bebês',
      icon: '👶',
      isActive: true,
    },
    {
      name: 'Jardim e Área Externa',
      description: 'Ferramentas de jardinagem e móveis externos',
      icon: '🌱',
      isActive: true,
    },
    {
      name: 'Ferramentas',
      description: 'Ferramentas e equipamentos para manutenção',
      icon: '🔧',
      isActive: true,
    },
    {
      name: 'Livros e Entretenimento',
      description: 'Livros, jogos e itens de entretenimento',
      icon: '📚',
      isActive: true,
    },
    {
      name: 'Fitness e Esportes',
      description: 'Equipamentos de exercício e artigos esportivos',
      icon: '🏋️',
      isActive: true,
    },
    {
      name: 'Pet',
      description: 'Itens para cuidados com animais de estimação',
      icon: '🐾',
      isActive: true,
    },
    {
      name: 'Viagem',
      description: 'Malas, mochilas e acessórios para viagem',
      icon: '✈️',
      isActive: true,
    },
    {
      name: 'Vaquinha / Dinheiro',
      description: 'Contribuição em dinheiro para o casal',
      icon: '💰',
      isActive: true,
    },
    {
      name: 'Outros',
      description: 'Itens diversos não categorizados',
      icon: '🎁',
      isActive: true,
    },
  ];

  console.log('🚀 Iniciando seed das categorias...');

  try {
    for (const categoryData of categoriesToCreate) {
      const existingCategory = await prisma.category.findFirst({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        await prisma.category.create({
          data: categoryData,
        });
        console.log(`✅ Categoria '${categoryData.name}' criada com sucesso`);
      } else {
        console.log(
          `⚠️  Categoria '${categoryData.name}' já existe no banco de dados`,
        );
      }
    }

    console.log('🎉 Seed das categorias concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed das categorias:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
seedCategories().catch((error) => {
  console.error('❌ Erro fatal ao executar seed:', error);
  process.exit(1);
});
