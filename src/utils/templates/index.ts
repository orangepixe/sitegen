
import { Project, Template } from '@/types/project';
import { generateModernTemplate } from './modern';
import { generateClassicTemplate } from './classic';
import { generateMinimalTemplate } from './minimal';
import { generateEditorialTemplate } from './editorial';
import { generateRealestateTemplate } from './realestate';
import { generateHeavyequipmentTemplate } from './heavyequipment';

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
  {
    id: 'minimal',
    name: 'Minimal',
    preview: 'Clean, typography-focused layout with plenty of white space and simple structure',
    generate: generateMinimalTemplate,
  },
  {
    id: 'editorial',
    name: 'Editorial',
    preview: 'Magazine-style with serif headings, strong type hierarchy, and dark accents',
    generate: generateEditorialTemplate,
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    preview: 'Property-focused layout with hero image, price highlight, and listing-style details',
    generate: generateRealestateTemplate,
  },
  {
    id: 'heavyequipment',
    name: 'Heavy Equipment',
    preview: 'Industrial look for construction and heavy equipment with bold type and orange accents',
    generate: generateHeavyequipmentTemplate,
  },
];

export const generateHTML = (project: Project): string => {
  const template = templates.find(t => t.id === project.template);
  if (!template) {
    throw new Error('Template not found');
  }
  return template.generate(project);
};
