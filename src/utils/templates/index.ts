
import { Project, Template } from '@/types/project';
import { generateModernTemplate } from './modern';
import { generateClassicTemplate } from './classic';

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern (Tailwind)',
    preview: 'Modern design with gradient hero, navigation, features section, and enhanced layout',
    generate: generateModernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic (Bootstrap)',
    preview: 'Classic design with Bootstrap styling, cards, carousel, and professional layout',
    generate: generateClassicTemplate,
  },
];

export const generateHTML = (project: Project): string => {
  const template = templates.find(t => t.id === project.template);
  if (!template) {
    throw new Error('Template not found');
  }
  return template.generate(project);
};
