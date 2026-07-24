import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

if (CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: CLOUDINARY_URL,
  });
}

export const uploadImage = async (filePath: string, folder: string = 'goathides'): Promise<string> => {
  if (CLOUDINARY_URL) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        use_filename: true,
        unique_filename: true,
      });
      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw error;
    }
  }

  // Local file fallback
  console.log('[MOCK CLOUDINARY]: Cloudinary not configured. Emulating image upload.');
  const fileName = path.basename(filePath);
  const uploadsDir = path.join(__dirname, '../../public/uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const destPath = path.join(uploadsDir, fileName);
  fs.copyFileSync(filePath, destPath);

  return `/uploads/${fileName}`;
};
