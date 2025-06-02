
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Project } from '@/types/project';
import { templates } from '@/utils/templates';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    websiteName: '',
    productTitle: '',
    shortDescription: '',
    fullDescription: '',
    price: 0,
    buyButtonText: 'Buy Now',
    template: 'modern',
    productPhotos: [],
    ...project,
  });

  const [photoUrl, setPhotoUrl] = useState('');

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
      template: formData.template as 'modern' | 'classic' || 'modern',
      productPhotos: formData.productPhotos || [],
      logo: formData.logo,
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(projectData);
  };

  const addPhoto = () => {
    if (photoUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        productPhotos: [...(prev.productPhotos || []), photoUrl.trim()]
      }));
      setPhotoUrl('');
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      productPhotos: prev.productPhotos?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Add New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="websiteName">Website Name</Label>
            <Input
              id="websiteName"
              value={formData.websiteName}
              onChange={(e) => setFormData(prev => ({ ...prev, websiteName: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="logo">Logo URL (Cloudinary)</Label>
            <Input
              id="logo"
              value={formData.logo || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              placeholder="https://res.cloudinary.com/..."
            />
          </div>

          <div>
            <Label htmlFor="productTitle">Product Title</Label>
            <Input
              id="productTitle"
              value={formData.productTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, productTitle: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="fullDescription">Full HTML Description</Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
              rows={6}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="buyButtonText">Buy Button Text</Label>
            <Input
              id="buyButtonText"
              value={formData.buyButtonText}
              onChange={(e) => setFormData(prev => ({ ...prev, buyButtonText: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label>Product Photos (Cloudinary)</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                />
                <Button type="button" onClick={addPhoto}>Add</Button>
              </div>
              {formData.productPhotos?.map((photo, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <img src={photo} alt={`Product ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                  <span className="flex-1 text-sm">{photo}</span>
                  <Button type="button" variant="destructive" size="sm" onClick={() => removePhoto(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Template</Label>
            <RadioGroup
              value={formData.template}
              onValueChange={(value) => setFormData(prev => ({ ...prev, template: value as 'modern' | 'classic' }))}
            >
              {templates.map((template) => (
                <div key={template.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={template.id} id={template.id} />
                  <Label htmlFor={template.id}>
                    {template.name} - {template.preview}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
