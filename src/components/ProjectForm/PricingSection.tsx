
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Project } from '@/types/project';

interface PricingSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ formData, onUpdate }) => {
  return (
    <div>
      <div className="text-lg mb-2">Pricing</div>
      <Card>
        <CardContent className="space-y-4 py-3">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={formData.price || ''}
              onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
          <div>
            <Label htmlFor="buyButtonText">Button Text</Label>
            <Input
              id="buyButtonText"
              placeholder="e.g., Buy Now, Inquire Now, Learn More"
              value={formData.buyButtonText || ''}
              onChange={(e) => onUpdate({ buyButtonText: e.target.value })}
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
