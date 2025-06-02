
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
    <div>
      <div className="text-lg mb-2">Product Content</div>
      <Card>
        <CardContent className="space-y-4 py-3">
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
    </div>
  );
};

export default ProductContentSection;
