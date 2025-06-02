
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/project';

interface ProductContentSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const ProductContentSection: React.FC<ProductContentSectionProps> = ({ formData, onUpdate }) => {
  return (
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
            onChange={(e) => onUpdate({ fullDescription: e.target.value })}
            rows={8}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductContentSection;
