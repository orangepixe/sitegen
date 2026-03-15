
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Project } from '@/types/project';

type GoogleTrackingMode = 'inputs' | 'textarea';

interface PricingSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ formData, onUpdate }) => {
  const [googleMode, setGoogleMode] = useState<GoogleTrackingMode>(() =>
    formData.googleAdsScript?.trim() && !formData.googleTagId?.trim() ? 'textarea' : 'inputs'
  );

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
            <Label className="text-sm font-medium mb-2 block">How do you want to add tracking?</Label>
            <RadioGroup
              value={googleMode}
              onValueChange={(v) => setGoogleMode(v as GoogleTrackingMode)}
              className="flex flex-col gap-2 mb-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inputs" id="google-mode-inputs" />
                <Label htmlFor="google-mode-inputs" className="font-normal cursor-pointer">
                  Use inputs (GA4 Tag ID + Conversion ID & Label) — we generate the scripts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="textarea" id="google-mode-textarea" />
                <Label htmlFor="google-mode-textarea" className="font-normal cursor-pointer">
                  Paste full Google Ads / gtag script in a textarea
                </Label>
              </div>
            </RadioGroup>

            {googleMode === 'inputs' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="googleTagId">Google Tag ID (GA4)</Label>
                  <Input
                    id="googleTagId"
                    placeholder="e.g., G-XXXXXXXXXX"
                    value={formData.googleTagId || ''}
                    onChange={(e) => onUpdate({ googleTagId: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your Google Analytics 4 Measurement ID. We generate the gtag.js script from this.
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
                    Your Google Ads conversion ID (e.g. AW-17232640137). With the label below, we generate the <code>gtag_report_conversion</code> script.
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
                    Conversion label from Google Ads (e.g. vdVLCLmWr94aEInxlJlA). Required with Conversion ID for the generated conversion script.
                  </p>
                </div>
                <div>
                  <Label htmlFor="conversionValue">Conversion Value</Label>
                  <Input
                    id="conversionValue"
                    placeholder="e.g., 1.0"
                    value={formData.conversionValue || '1.0'}
                    onChange={(e) => onUpdate({ conversionValue: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    The monetary value assigned to the conversion event
                  </p>
                </div>
                <div>
                  <Label htmlFor="conversionCurrency">Conversion Currency</Label>
                  <Input
                    id="conversionCurrency"
                    placeholder="e.g., AUD, USD, EUR"
                    value={formData.conversionCurrency || 'AUD'}
                    onChange={(e) => onUpdate({ conversionCurrency: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    The currency code for the conversion value (e.g., AUD, USD, EUR)
                  </p>
                </div>
              </div>
            )}

            {googleMode === 'textarea' && (
              <div>
                <Label htmlFor="googleAdsScript">Google Ads / gtag script</Label>
                <Textarea
                  id="googleAdsScript"
                  placeholder="Paste your full Google Ads or gtag.js script here (e.g. Global Site Tag + conversion config)"
                  value={formData.googleAdsScript || ''}
                  onChange={(e) => onUpdate({ googleAdsScript: e.target.value })}
                  rows={6}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This will be injected in the page head. Use this when you prefer to paste the complete script from Google.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
