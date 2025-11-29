import { PrismaClient, EventVisibility } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function seedEvents() {
  console.log('🔧 Configurações do banco:');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

  console.log('🚀 Iniciando seed dos eventos...');

  try {
    // Buscar um usuário existente para ser organizador
    const organizer = await prisma.user.findFirst({
      where: { isActive: true },
    });

    if (!organizer) {
      console.error(
        '❌ Nenhum usuário encontrado. Execute o seed-users primeiro.',
      );
      process.exit(1);
    }

    const eventsToCreate = [
      {
        title: 'Casamento João e Maria',
        description:
          'Celebração do nosso grande dia! Escolha um presente da lista para nos ajudar a começar nossa nova vida juntos.',
        eventDate: new Date('2025-06-15T15:00:00'),
        location: 'Igreja São Francisco - São Paulo, SP',
        visibility: EventVisibility.PUBLIC,
        slug: 'casamento-joao-maria-2025',
        organizerId: organizer.id,
        isActive: true,
      },
      {
        title: 'Chá de Bebê - Laura',
        description:
          'Estamos esperando a Laura! Ajude-nos a preparar o ninho para nossa pequena.',
        eventDate: new Date('2025-04-20T14:00:00'),
        location: 'Salão de Festas Happy Kids - Rio de Janeiro, RJ',
        visibility: EventVisibility.PUBLIC,
        slug: 'cha-bebe-laura-2025',
        organizerId: organizer.id,
        isActive: true,
      },
      {
        title: 'Chá de Casa Nova - Pedro e Ana',
        description:
          'Realizamos o sonho da casa própria! Escolha um presente para nos ajudar a decorar nosso lar.',
        eventDate: new Date('2025-05-10T16:00:00'),
        location: 'Nosso novo lar - Belo Horizonte, MG',
        visibility: EventVisibility.PRIVATE,
        slug: 'cha-casa-nova-pedro-ana-2025',
        organizerId: organizer.id,
        isActive: true,
      },
    ];

    for (const eventData of eventsToCreate) {
      const existingEvent = await prisma.event.findFirst({
        where: { slug: eventData.slug },
      });

      if (!existingEvent) {
        await prisma.event.create({
          data: eventData,
        });
        console.log(`✅ Evento '${eventData.title}' criado com sucesso`);
      } else {
        console.log(
          `⚠️  Evento '${eventData.title}' já existe no banco de dados`,
        );
      }
    }

    console.log('🎉 Seed dos eventos concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed dos eventos:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
seedEvents().catch((error) => {
  console.error('❌ Erro fatal ao executar seed:', error);
  process.exit(1);
});

