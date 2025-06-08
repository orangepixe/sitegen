
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
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
            <RichTextEditor
              id="fullDescription"
              placeholder="Enter detailed description with rich formatting..."
              value={formData.fullDescription || ''}
              onChange={(value) => onUpdate({ fullDescription: value })}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Use the toolbar to format your text. HTML formatting will be preserved in the generated website.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductContentSection;
