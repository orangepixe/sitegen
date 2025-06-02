
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Project } from '@/types/project';

interface PricingSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ formData, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pricing & CTA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="price">Price or Text</Label>
          <Input
            id="price"
            placeholder="$500 or View Pricing"
            value={formData.price}
            onChange={(e) => onUpdate({ price: e.target.value || 0 })}
            required
          />
        </div>

        <div>
          <Label htmlFor="buyButtonText">Buy Button Text</Label>
          <Input
            id="buyButtonText"
            placeholder="Buy Now, Get Started, etc."
            value={formData.buyButtonText}
            onChange={(e) => onUpdate({ buyButtonText: e.target.value })}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSection;
