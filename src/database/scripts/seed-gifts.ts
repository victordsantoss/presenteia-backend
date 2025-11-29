import { PrismaClient, GiftPriority } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function seedGifts() {
  console.log('🔧 Configurações do banco:');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

  console.log('🚀 Iniciando seed dos presentes...');

  try {
    // Buscar eventos existentes
    const events = await prisma.event.findMany({
      where: { isActive: true },
      take: 3,
    });

    if (events.length === 0) {
      console.error(
        '❌ Nenhum evento encontrado. Execute o seed-events primeiro.',
      );
      process.exit(1);
    }

    // Buscar categorias existentes
    const categories = await prisma.category.findMany({
      where: { isActive: true },
    });

    if (categories.length === 0) {
      console.error(
        '❌ Nenhuma categoria encontrada. Execute o seed-categories primeiro.',
      );
      process.exit(1);
    }

    // Criar um mapa de categorias por nome para facilitar
    const categoryMap = categories.reduce(
      (acc, cat) => {
        acc[cat.name] = cat.id;
        return acc;
      },
      {} as Record<string, string>,
    );

    // Presentes para o evento de casamento
    const weddingEvent = events.find((e) =>
      e.title.toLowerCase().includes('casamento'),
    );
    const babyShowerEvent = events.find((e) =>
      e.title.toLowerCase().includes('bebê'),
    );
    const houseWarmingEvent = events.find((e) =>
      e.title.toLowerCase().includes('casa'),
    );

    const giftsToCreate = [];

    // Presentes para casamento
    if (weddingEvent) {
      giftsToCreate.push(
        {
          name: 'Jogo de Panelas Tramontina 5 Peças',
          description:
            'Conjunto de panelas antiaderentes com revestimento interno de antiaderente e externo de alumínio.',
          price: 299.9,
          quantity: 1,
          imageUrl: 'https://example.com/panelas.jpg',
          priority: GiftPriority.HIGH,
          categoryId: categoryMap['Cozinha'],
          eventId: weddingEvent.id,
          isActive: true,
          links: {
            create: [
              {
                url: 'https://www.amazon.com.br/jogo-panelas-tramontina',
              },
              {
                url: 'https://www.magazineluiza.com.br/jogo-panelas-tramontina',
              },
            ],
          },
        },
        {
          name: 'Jogo de Cama Queen 4 Peças',
          description:
            'Jogo de cama 100% algodão, macio e confortável. Inclui lençol, fronha e edredom.',
          price: 189.9,
          quantity: 2,
          imageUrl: 'https://example.com/jogo-cama.jpg',
          priority: GiftPriority.MEDIUM,
          categoryId: categoryMap['Quarto'],
          eventId: weddingEvent.id,
          isActive: true,
          links: {
            create: [
              {
                url: 'https://www.amazon.com.br/jogo-cama-queen',
              },
            ],
          },
        },
        {
          name: 'Micro-ondas Electrolux 20L',
          description:
            'Micro-ondas com 10 níveis de potência, timer digital e função descongelar.',
          price: 459.0,
          quantity: 1,
          imageUrl: 'https://example.com/microondas.jpg',
          priority: GiftPriority.HIGH,
          categoryId: categoryMap['Eletrodomésticos'],
          eventId: weddingEvent.id,
          isActive: true,
          links: {
            create: [
              {
                url: 'https://www.magazineluiza.com.br/microondas-electrolux',
              },
            ],
          },
        },
        {
          name: 'Jogo de Taças de Vinho 6 Peças',
          description: 'Taças de cristal elegantes para momentos especiais.',
          price: 89.9,
          quantity: 2,
          imageUrl: 'https://example.com/tacas.jpg',
          priority: GiftPriority.LOW,
          categoryId: categoryMap['Mesa e Jantar'],
          eventId: weddingEvent.id,
          isActive: true,
        },
        {
          name: 'Contribuição para Lua de Mel',
          description:
            'Ajude-nos a realizar nossa lua de mel dos sonhos! Qualquer valor é bem-vindo.',
          price: 1000.0,
          quantity: 1,
          imageUrl: 'https://example.com/lua-mel.jpg',
          allowMultipleContributions: true,
          priority: GiftPriority.HIGH,
          categoryId: categoryMap['Vaquinha / Dinheiro'],
          eventId: weddingEvent.id,
          isActive: true,
        },
      );
    }

    // Presentes para chá de bebê
    if (babyShowerEvent) {
      giftsToCreate.push(
        {
          name: 'Carrinho de Bebê Galzerano',
          description:
            'Carrinho de bebê com capota removível, cinto de segurança de 5 pontos e cesta para compras.',
          price: 499.9,
          quantity: 1,
          imageUrl: 'https://example.com/carrinho.jpg',
          priority: GiftPriority.HIGH,
          categoryId: categoryMap['Bebê'],
          eventId: babyShowerEvent.id,
          isActive: true,
          links: {
            create: [
              {
                url: 'https://www.amazon.com.br/carrinho-bebe-galzerano',
              },
            ],
          },
        },
        {
          name: 'Kit Berço 9 Peças',
          description:
            'Kit completo para berço incluindo protetor, lençol, fronha e manta.',
          price: 179.9,
          quantity: 1,
          imageUrl: 'https://example.com/kit-berco.jpg',
          priority: GiftPriority.MEDIUM,
          categoryId: categoryMap['Bebê'],
          eventId: babyShowerEvent.id,
          isActive: true,
        },
        {
          name: 'Banheira de Bebê',
          description:
            'Banheira anatômica com suporte e termômetro integrado.',
          price: 89.9,
          quantity: 1,
          imageUrl: 'https://example.com/banheira.jpg',
          priority: GiftPriority.MEDIUM,
          categoryId: categoryMap['Bebê'],
          eventId: babyShowerEvent.id,
          isActive: true,
        },
        {
          name: 'Roupinhas para Bebê (0-6 meses)',
          description:
            'Kit com 10 peças de roupas para recém-nascido até 6 meses.',
          price: 129.9,
          quantity: 3,
          imageUrl: 'https://example.com/roupinhas.jpg',
          priority: GiftPriority.LOW,
          categoryId: categoryMap['Bebê'],
          eventId: babyShowerEvent.id,
          isActive: true,
        },
      );
    }

    // Presentes para chá de casa nova
    if (houseWarmingEvent) {
      giftsToCreate.push(
        {
          name: 'Smart TV 50 Polegadas',
          description:
            'Smart TV LED 50" 4K UHD com Wi-Fi integrado e controle remoto com comando de voz.',
          price: 1899.0,
          quantity: 1,
          imageUrl: 'https://example.com/smart-tv.jpg',
          priority: GiftPriority.HIGH,
          categoryId: categoryMap['Eletrônicos'],
          eventId: houseWarmingEvent.id,
          isActive: true,
          links: {
            create: [
              {
                url: 'https://www.magazineluiza.com.br/smart-tv-50',
              },
              {
                url: 'https://www.americanas.com.br/smart-tv-50',
              },
            ],
          },
        },
        {
          name: 'Sofá Retrátil 3 Lugares',
          description:
            'Sofá confortável e moderno, retrátil e reclinável, perfeito para a sala de estar.',
          price: 2499.0,
          quantity: 1,
          imageUrl: 'https://example.com/sofa.jpg',
          allowMultipleContributions: true,
          priority: GiftPriority.HIGH,
          categoryId: categoryMap['Casa e Decoração'],
          eventId: houseWarmingEvent.id,
          isActive: true,
        },
        {
          name: 'Aspirador de Pó Robô',
          description:
            'Aspirador robô inteligente com mapeamento e recarga automática.',
          price: 899.0,
          quantity: 1,
          imageUrl: 'https://example.com/aspirador.jpg',
          priority: GiftPriority.MEDIUM,
          categoryId: categoryMap['Eletrodomésticos'],
          eventId: houseWarmingEvent.id,
          isActive: true,
        },
        {
          name: 'Kit Quadros Decorativos',
          description:
            'Conjunto de 3 quadros decorativos modernos para sala.',
          price: 149.9,
          quantity: 2,
          imageUrl: 'https://example.com/quadros.jpg',
          priority: GiftPriority.LOW,
          categoryId: categoryMap['Casa e Decoração'],
          eventId: houseWarmingEvent.id,
          isActive: true,
        },
        {
          name: 'Cafeteira Elétrica Nespresso',
          description:
            'Cafeteira de cápsulas com 19 bar de pressão e sistema automático.',
          price: 399.0,
          quantity: 1,
          imageUrl: 'https://example.com/cafeteira.jpg',
          priority: GiftPriority.MEDIUM,
          categoryId: categoryMap['Cozinha'],
          eventId: houseWarmingEvent.id,
          isActive: true,
          links: {
            create: [
              {
                url: 'https://www.amazon.com.br/cafeteira-nespresso',
              },
            ],
          },
        },
      );
    }

    // Criar os presentes
    let createdCount = 0;
    for (const giftData of giftsToCreate) {
      const existingGift = await prisma.gift.findFirst({
        where: {
          name: giftData.name,
          eventId: giftData.eventId,
        },
      });

      if (!existingGift) {
        await prisma.gift.create({
          data: giftData,
        });
        console.log(`✅ Presente '${giftData.name}' criado com sucesso`);
        createdCount++;
      } else {
        console.log(
          `⚠️  Presente '${giftData.name}' já existe no banco de dados`,
        );
      }
    }

    console.log(
      `🎉 Seed dos presentes concluído com sucesso! ${createdCount} presentes criados.`,
    );
  } catch (error) {
    console.error('❌ Erro ao executar seed dos presentes:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
seedGifts().catch((error) => {
  console.error('❌ Erro fatal ao executar seed:', error);
  process.exit(1);
});

