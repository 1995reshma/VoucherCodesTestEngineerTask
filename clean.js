import fs from 'fs';
import path from 'path';

const folders = ['test-results', 'allure-results', 'allure-report'];

folders.forEach((folder) => {
  const folderPath = path.resolve(process.cwd(), folder);
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Cleaned: ${folder}`);
  }
});
