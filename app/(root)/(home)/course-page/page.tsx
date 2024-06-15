"use client";

import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import CldImage from '@/components/CldImage/CldImage';
import Button from '@/components/Button/Button';
import images from '@/data/images.json';

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

const CoursePage = () => {
  const [sneakers, setSneakers] = useState<CloudinaryResource[]>([]);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await fetch('/api/upload');
        const data = await response.json();
        setSneakers(data.resources);
      } catch (error) {
        console.error('Error fetching sneakers:', error);
      }
    };
    fetchSneakers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const file = formData.get('image') as File;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: base64 }),
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
          const newSneaker = await response.json();
          setSneakers((prev) => [...prev, newSneaker]);
        } else {
          console.error('Error uploading image:', await response.text());
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">Add a New Image</h2>
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6">
        <p className="mb-6">
          <label htmlFor="image" className="block font-semibold text-sm mb-2">
            Select an Image to Upload
          </label>
          <input
            id="image"
            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="file"
            name="image"
            required
          />
        </p>
        <Button>Submit</Button>
      </form>
      <h2 className="text-xl font-bold mb-4">Images</h2>
      <ul className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {sneakers.map((sneaker) => (
          <li key={sneaker.public_id} className="rounded overflow-hidden bg-white dark:bg-slate-700">
            <div className="relative">
              <CldImage
                width={800}
                height={600}
                src={sneaker.public_id}
                alt={sneaker.context?.alt || ''}
              />
            </div>
            {sneaker.context?.caption && (
              <div className="py-4 px-5">
                <p className="mb-1 text-md font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                  {sneaker.context?.caption || ''}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-4">Links</h2>
      <ul>
        {images.map((image) => (
          <li key={image.name}>
            {image.name}: <a className="text-blue-600" href={image.link}>{image.link}</a>
          </li>
        ))}
      </ul>
      <div className="mt-12 py-10 border-[0] border-t border-solid border-slate-300">
        <p>
          Find more Cloudinary examples at: <a className="underline text-inherit" href="https://github.com/cloudinary-community/cloudinary-examples">github.com/cloudinary-community/cloudinary-examples</a>.
        </p>
      </div>
    </Container>
  );
};

export default CoursePage;
