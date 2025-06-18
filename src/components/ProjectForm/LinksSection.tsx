
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      </CardContent>
    </Card>
  );
};

export default LinksSection;
