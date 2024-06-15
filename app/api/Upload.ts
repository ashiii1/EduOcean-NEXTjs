import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
          tags: ['nextjs-server-actions-upload-sneakers'],
          upload_preset: 'nextjs-server-actions-upload',
        }, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        });
      });
      res.status(200).json(uploadResponse);
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else if (req.method === 'GET') {
    try {
      const { resources } = await cloudinary.api.resources_by_tag('nextjs-server-actions-upload-sneakers', { context: true });
      res.status(200).json({ resources });
    } catch (error) {
      console.error('Error fetching sneakers:', error);
      res.status(500).json({ error: 'Error fetching sneakers' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
