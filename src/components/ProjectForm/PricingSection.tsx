
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/project';

interface PricingSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ formData, onUpdate }) => {
  return (
    <div>
      <div className="text-lg mb-2">Pricing & Tracking</div>
      <Card>
        <CardContent className="space-y-4 py-3">
          <div>
            <Label htmlFor="price">Price (Text)</Label>
            <Input
              id="price"
              type="text"
              placeholder="e.g., $99, Contact for Price, Free Consultation"
              value={formData.price || ''}
              onChange={(e) => onUpdate({ price: e.target.value })}
              required
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter any text you want for pricing - could be a price, "Contact Us", etc.
            </p>
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
          
          <div className="border-t pt-4">
            <h3 className="text-md font-medium mb-3">Google Analytics & Conversion Tracking</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="googleAdsScript">Google Ads Script/Tag</Label>
                <Textarea
                  id="googleAdsScript"
                  placeholder="Paste your Google Ads conversion tracking script here (e.g., Global Site Tag or conversion tracking script)"
                  value={formData.googleAdsScript || ''}
                  onChange={(e) => onUpdate({ googleAdsScript: e.target.value })}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Paste the complete Google Ads tracking script that will be injected into the page head
                </p>
              </div>
              <div>
                <Label htmlFor="googleTagId">Google Tag ID (GA4)</Label>
                <Input
                  id="googleTagId"
                  placeholder="e.g., G-XXXXXXXXXX"
                  value={formData.googleTagId || ''}
                  onChange={(e) => onUpdate({ googleTagId: e.target.value })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your Google Analytics 4 Measurement ID
                </p>
              </div>
              <div>
                <Label htmlFor="googleConversionId">Google Ads Conversion ID</Label>
                <Input
                  id="googleConversionId"
                  placeholder="e.g., AW-123456789"
                  value={formData.googleConversionId || ''}
                  onChange={(e) => onUpdate({ googleConversionId: e.target.value })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your Google Ads conversion tracking ID
                </p>
              </div>
              <div>
                <Label htmlFor="googleConversionLabel">Google Ads Conversion Label</Label>
                <Input
                  id="googleConversionLabel"
                  placeholder="e.g., abc123def456"
                  value={formData.googleConversionLabel || ''}
                  onChange={(e) => onUpdate({ googleConversionLabel: e.target.value })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  The conversion label from your Google Ads conversion action
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
