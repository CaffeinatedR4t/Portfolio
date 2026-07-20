import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'C:\\Users\\Jeremy yosep pohar\\Downloads\\Porto-Project\\Portofolio\\vite-project\\public\\images';
const files = fs.readdirSync(dir);

async function convert() {
  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i)) {
      const filePath = path.join(dir, file);
      const parsed = path.parse(filePath);
      const outPath = path.join(dir, `${parsed.name}.webp`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 75 })
          .toFile(outPath);
        console.log(`Converted ${file} to ${parsed.name}.webp`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convert();
