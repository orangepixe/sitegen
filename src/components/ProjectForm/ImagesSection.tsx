
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { Project } from '@/types/project';
import { uploadImage } from '@/utils/imageUpload';

interface ImagesSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ formData, onUpdate }) => {
  const { toast } = useToast();
  const [logoUploading, setLogoUploading] = useState(false);
  const [photosUploading, setPhotosUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      const url = await uploadImage(file);
      onUpdate({ logo: url });
      toast({
        title: 'Success',
        description: 'Logo uploaded successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload logo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLogoUploading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setPhotosUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      
      onUpdate({
        productPhotos: [...(formData.productPhotos || []), ...urls]
      });
      
      toast({
        title: 'Success',
        description: `${urls.length} photo(s) uploaded successfully!`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload photos. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setPhotosUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    onUpdate({
      productPhotos: formData.productPhotos?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="logo">Logo Upload</Label>
          <div className="space-y-2">
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              disabled={logoUploading}
            />
            {logoUploading && <p className="text-sm text-gray-500">Uploading logo...</p>}
            {formData.logo && (
              <div className="flex items-center gap-2 p-2 border rounded">
                <img src={formData.logo} alt="Logo" className="w-16 h-16 object-cover rounded" />
                <span className="flex-1 text-sm">Logo uploaded</span>
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onUpdate({ logo: undefined })}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="productPhotos">Product Photos</Label>
          <div className="space-y-2">
            <Input
              id="productPhotos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              disabled={photosUploading}
            />
            {photosUploading && <p className="text-sm text-gray-500">Uploading photos...</p>}
            {formData.productPhotos?.map((photo, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                <img src={photo} alt={`Product ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                <span className="flex-1 text-sm">Photo {index + 1}</span>
                <Button type="button" variant="destructive" size="sm" onClick={() => removePhoto(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
