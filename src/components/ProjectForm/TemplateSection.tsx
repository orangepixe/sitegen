
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Project } from '@/types/project';
import { templates } from '@/utils/templates';

interface TemplateSectionProps {
  formData: Partial<Project>;
  onUpdate: (updates: Partial<Project>) => void;
}

const TemplateSection: React.FC<TemplateSectionProps> = ({ formData, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Template</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={formData.template}
          onValueChange={(value) => onUpdate({ template: value as 'modern' | 'classic' })}
        >
          {templates.map((template) => (
            <div key={template.id} className="flex items-center space-x-2">
              <RadioGroupItem value={template.id} id={template.id} />
              <Label htmlFor={template.id} className="flex-1">
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-gray-500">{template.preview}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default TemplateSection;
