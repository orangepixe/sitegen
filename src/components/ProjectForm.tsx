
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';
import { useNavigate } from "react-router-dom";
import BasicInfoSection from './ProjectForm/BasicInfoSection';
import ProductContentSection from './ProjectForm/ProductContentSection';
import ImagesSection from './ProjectForm/ImagesSection';
import PricingSection from './ProjectForm/PricingSection';
import LinksSection from './ProjectForm/LinksSection';
import TemplateSection from './ProjectForm/TemplateSection';

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
    price: '',
    buyButtonText: 'Inquire Now',
    mainWebsiteUrl: '',
    googleAdsScript: '',
    googleTagId: '',
    googleConversionId: '',
    googleConversionLabel: '',
    template: 'modern',
    productPhotos: [],
    ...project,
  });

  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: Project = {
      id: project?.id || Date.now().toString(),
      websiteName: formData.websiteName || '',
      productTitle: formData.productTitle || '',
      shortDescription: formData.shortDescription || '',
      fullDescription: formData.fullDescription || '',
      price: formData.price || '',
      buyButtonText: formData.buyButtonText || 'Inquire Now',
      mainWebsiteUrl: formData.mainWebsiteUrl || '',
      googleAdsScript: formData.googleAdsScript || '',
      googleTagId: formData.googleTagId || '',
      googleConversionId: formData.googleConversionId || '',
      googleConversionLabel: formData.googleConversionLabel || '',
      template: formData.template as 'modern' | 'classic' || 'modern',
      productPhotos: formData.productPhotos || [],
      logo: formData.logo,
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(projectData);
  };

  const updateFormData = (updates: Partial<Project>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const fillDemoContent = () => {
    const demoData: Partial<Project> = {
      websiteName: 'TechStart Solutions',
      productTitle: 'Professional Web Development Services',
      shortDescription: 'Transform your business with custom web applications that drive results and engage your customers.',
      fullDescription: '<h2>Why Choose Our Web Development Services?</h2><p>We specialize in creating modern, responsive websites that help your business grow. Our team combines cutting-edge technology with proven design principles to deliver exceptional results.</p><h3>What We Offer:</h3><ul><li>Custom Web Application Development</li><li>Responsive Design for All Devices</li><li>E-commerce Solutions</li><li>SEO Optimization</li><li>Ongoing Support & Maintenance</li></ul><p>Contact us today to discuss your project and get a free consultation!</p>',
      price: 'Starting at $2,999',
      buyButtonText: 'Get Free Quote',
      mainWebsiteUrl: 'https://techstartsolutions.com',
      googleAdsScript: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE123"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-EXAMPLE123');
</script>`,
      googleTagId: 'G-EXAMPLE123',
      googleConversionId: 'AW-123456789',
      googleConversionLabel: 'conversion-label-123',
      template: 'modern'
    };
    
    setFormData(prev => ({ ...prev, ...demoData }));
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-800">
              {project ? 'Edit Project' : 'Add New Project'}
            </span>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={fillDemoContent}
                className="text-sm"
              >
                Fill Demo Content
              </Button>
              <a className="text-sm cursor-pointer text-gray-500" onClick={onCancel}>Back</a>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <form onSubmit={handleSubmit} className="space-y-8">
        <BasicInfoSection formData={formData} onUpdate={updateFormData} />
        <ProductContentSection formData={formData} onUpdate={updateFormData} />
        <ImagesSection formData={formData} onUpdate={updateFormData} />
        <PricingSection formData={formData} onUpdate={updateFormData} />
        <LinksSection formData={formData} onUpdate={updateFormData} />
        <TemplateSection formData={formData} onUpdate={updateFormData} />

        <div className="flex gap-2 pt-4">
          <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
