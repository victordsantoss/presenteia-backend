import { execSync } from 'child_process';

const scripts = [
  { name: 'Roles', file: 'seed-roles.ts' },
  { name: 'Categorias', file: 'seed-categories.ts' },
  { name: 'Usuários', file: 'seed-users.ts' },
  { name: 'Eventos', file: 'seed-events.ts' },
  { name: 'Presentes', file: 'seed-gifts.ts' },
];

async function runAllSeeds() {
  console.log('🚀 Iniciando execução de todos os seeds...\n');

  for (const script of scripts) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📦 Executando seed: ${script.name}`);
    console.log(`${'='.repeat(60)}\n`);

    try {
      execSync(`npx tsx src/database/scripts/${script.file}`, {
        stdio: 'inherit',
      });
      console.log(`\n✅ Seed '${script.name}' concluído com sucesso!\n`);
    } catch (error) {
      console.error(`\n❌ Erro ao executar seed '${script.name}':`, error);
      process.exit(1);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Todos os seeds foram executados com sucesso!');
  console.log('='.repeat(60));
}

runAllSeeds().catch((error) => {
  console.error('❌ Erro fatal ao executar seeds:', error);
  process.exit(1);
});

