
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/project';

interface LinksSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ formData, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Links & SEO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="mainWebsiteUrl">Main Website URL</Label>
          <Input
            id="mainWebsiteUrl"
            placeholder="https://yourwebsite.com"
            value={formData.mainWebsiteUrl}
            onChange={(e) => onUpdate({ mainWebsiteUrl: e.target.value })}
            required
          />
          <p className="text-sm text-gray-500 mt-1">All buttons and links will redirect to this URL</p>
        </div>

        <div>
          <Label htmlFor="googleAdsScript">Google Ads Tracking Script</Label>
          <Textarea
            id="googleAdsScript"
            placeholder="Paste your Google Ads Global Site Tag or conversion tracking script here"
            value={formData.googleAdsScript}
            onChange={(e) => onUpdate({ googleAdsScript: e.target.value })}
            rows={6}
          />
          <p className="text-sm text-gray-500 mt-1">Optional: This script will be added to the &lt;head&gt; of your generated website</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinksSection;
