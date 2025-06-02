
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Project } from '@/types/project';

interface BasicInfoSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onUpdate }) => {
  return (
    <div>
      <div className="text-lg">Basic Info</div>
      <Card>
        <CardContent className="space-y-4 py-3">
          <div>
            <Label htmlFor="websiteName">Website Name</Label>
            <Input
              id="websiteName"
              placeholder="Enter your website name"
              value={formData.websiteName}
              onChange={(e) => onUpdate({ websiteName: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="productTitle">Product Title</Label>
            <Input
              id="productTitle"
              placeholder="Enter your product title"
              value={formData.productTitle}
              onChange={(e) => onUpdate({ productTitle: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              placeholder="Brief description for SEO and hero section"
              value={formData.shortDescription}
              onChange={(e) => onUpdate({ shortDescription: e.target.value })}
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoSection;
