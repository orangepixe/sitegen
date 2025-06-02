
// Note: For production, store the API key in Supabase secrets or environment variables
const IMGBB_API_KEY = 'f9e26e6e24a1c5743bb3d74e4fe0fb31'; // Demo key - replace with your own

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  
  const data = await response.json();
  return data.data.image.url;
};
