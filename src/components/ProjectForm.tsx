
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import { Project } from '@/types/project';
import { templates } from '@/utils/templates';
import { uploadImage } from '@/utils/imageUpload';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Project>>({
    websiteName: '',
    productTitle: '',
    shortDescription: '',
    fullDescription: '',
    price: 0,
    buyButtonText: 'Buy Now',
    mainWebsiteUrl: '',
    googleAdsScript: '',
    template: 'modern',
    productPhotos: [],
    ...project,
  });

  const [logoUploading, setLogoUploading] = useState(false);
  const [photosUploading, setPhotosUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: Project = {
      id: project?.id || Date.now().toString(),
      websiteName: formData.websiteName || '',
      productTitle: formData.productTitle || '',
      shortDescription: formData.shortDescription || '',
      fullDescription: formData.fullDescription || '',
      price: formData.price || 0,
      buyButtonText: formData.buyButtonText || 'Buy Now',
      mainWebsiteUrl: formData.mainWebsiteUrl || '',
      googleAdsScript: formData.googleAdsScript || '',
      template: formData.template as 'modern' | 'classic' || 'modern',
      productPhotos: formData.productPhotos || [],
      logo: formData.logo,
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(projectData);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, logo: url }));
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
      
      setFormData(prev => ({
        ...prev,
        productPhotos: [...(prev.productPhotos || []), ...urls]
      }));
      
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
    setFormData(prev => ({
      ...prev,
      productPhotos: prev.productPhotos?.filter((_, i) => i !== index) || []
    }));
  };

  const goBack = (event) => {
    event.preventDefault();
    setCurrentView('list');
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <span className="mr-2">
              {project ? 'Edit Project' : 'Add New Project'}
            </span>
            <a className="text-sm" href="#" onClick={goBack($event)}>Back</a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="websiteName">Website Name</Label>
                  <Input
                    id="websiteName"
                    placeholder="Enter your website name"
                    value={formData.websiteName}
                    onChange={(e) => setFormData(prev => ({ ...prev, websiteName: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="productTitle">Product Title</Label>
                  <Input
                    id="productTitle"
                    placeholder="Enter your product title"
                    value={formData.productTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, productTitle: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    placeholder="Brief description for SEO and hero section"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Content Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="fullDescription">Full HTML Description</Label>
                  <Textarea
                    id="fullDescription"
                    placeholder="Enter detailed product description with HTML formatting"
                    value={formData.fullDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                    rows={8}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images Section */}
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
                          onClick={() => setFormData(prev => ({ ...prev, logo: undefined }))}
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

            {/* Pricing & CTA Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing & CTA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    placeholder="$500 or View Pricing"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value || 0 }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="buyButtonText">Buy Button Text</Label>
                  <Input
                    id="buyButtonText"
                    placeholder="Buy Now, Get Started, etc."
                    value={formData.buyButtonText}
                    onChange={(e) => setFormData(prev => ({ ...prev, buyButtonText: e.target.value }))}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Links & SEO Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Links & SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mainWebsiteUrl">Main Website URL</Label>
                  <Input
                    id="mainWebsiteUrl"
                    placeholder="https://yourwebsite.com"
                    value={formData.mainWebsiteUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, mainWebsiteUrl: e.target.value }))}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">All buttons and links will redirect to this URL</p>
                </div>

                <div>
                  <Label htmlFor="googleAdsScript">Google Ads Tracking Script</Label>
                  <Textarea
                    id="googleAdsScript"
                    placeholder="Paste your Google Ads Global Site Tag or conversion tracking script here"
                    value={formData.googleAdsScript}
                    onChange={(e) => setFormData(prev => ({ ...prev, googleAdsScript: e.target.value }))}
                    rows={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">Optional: This script will be added to the &lt;head&gt; of your generated website</p>
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Template</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.template}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, template: value as 'modern' | 'classic' }))}
                >
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={template.id} id={template.id} />
                      <Label htmlFor={template.id} className="flex-1">
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.preview}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex gap-2 pt-4">
              <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;
