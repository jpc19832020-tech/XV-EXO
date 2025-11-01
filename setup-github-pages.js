#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Leer el nombre del repositorio desde package.json o solicitarlo
function getRepoName() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    // Intentar obtener el nombre del repositorio del package.json
    const repoName = packageJson.name || process.argv[2];
    
    if (repoName && repoName !== 'nextjs_tailwind_shadcn_ts') {
      return repoName;
    }
    
    // Si no se encuentra, solicitar al usuario
    if (!repoName || repoName === 'nextjs_tailwind_shadcn_ts') {
      console.log('Por favor, proporciona el nombre de tu repositorio de GitHub:');
      console.log('Ejemplo: node setup-github-pages.js mi-repositorio');
      process.exit(1);
    }
    
    return repoName;
  } catch (error) {
    console.error('Error al leer package.json:', error);
    process.exit(1);
  }
}

function updateNextConfig(repoName) {
  const configPath = 'next.config.ts';
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Reemplazar o agregar el basePath
    const basePathLine = `  basePath: '/${repoName}',`;
    
    if (configContent.includes('basePath:')) {
      // Reemplazar basePath existente
      configContent = configContent.replace(
        /  basePath: ['"][^'"]*['"],/,
        basePathLine
      );
    } else {
      // Agregar basePath después de output
      configContent = configContent.replace(
        /  output: 'export',/,
        `  output: 'export',\n${basePathLine}`
      );
    }
    
    fs.writeFileSync(configPath, configContent);
    console.log(`✅ basePath configurado como '/${repoName}' en next.config.ts`);
  } catch (error) {
    console.error('Error al actualizar next.config.ts:', error);
    process.exit(1);
  }
}

function updateWorkflow() {
  const workflowPath = '.github/workflows/deploy.yml';
  
  try {
    let workflowContent = fs.readFileSync(workflowPath, 'utf8');
    
    // Asegurar que el workflow esté configurado correctamente
    if (!workflowContent.includes('permissions:')) {
      workflowContent = workflowContent.replace(
        'on:',
        `permissions:
  contents: read
  pages: write
  id-token: write

on:`
      );
      
      fs.writeFileSync(workflowPath, workflowContent);
      console.log('✅ Permisos añadidos al workflow de GitHub Actions');
    }
  } catch (error) {
    console.error('Error al actualizar workflow:', error);
  }
}

// Ejecutar configuración
const repoName = getRepoName();
updateNextConfig(repoName);
updateWorkflow();

console.log('\n🎉 Configuración completada!');
console.log('\n📋 Siguientes pasos:');
console.log('1. Haz commit de los cambios:');
console.log('   git add .');
console.log('   git commit -m "Configurar para GitHub Pages"');
console.log('2. Haz push a GitHub:');
console.log('   git push origin main');
console.log('3. Configura GitHub Pages en la configuración del repositorio');
console.log('\n🌐 Tu sitio estará disponible en:');
console.log(`   https://[tu-username].github.io/${repoName}/`);