
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, Download } from 'lucide-react';
import { Project } from '@/types/project';
import { templates } from '@/utils/templates';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onPreview: (project: Project, template: Project['template']) => void;
  onGenerate: (project: Project, template: Project['template']) => void;
}

const templateLabel = (t: (typeof templates)[0]) => t.name.replace(/\s*\([^)]*\)\s*$/, '').trim() || t.id;

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, onPreview, onGenerate }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-start justify-between">
              <span>{project.productTitle}</span>
              <Badge variant="secondary" className="ml-2">
                {project.template}
              </Badge>
            </CardTitle>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">{project.websiteName}</p>
              {project.mainWebsiteUrl && (
                <div className="flex items-center text-xs text-blue-600">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  <a href={project.mainWebsiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                    {project.mainWebsiteUrl}
                  </a>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-700">{project.shortDescription}</p>
            
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg text-green-600">{project.price}</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {project.productPhotos.length} photo{project.productPhotos.length !== 1 ? 's' : ''}
              </span>
            </div>

            {project.productPhotos.length > 0 && (
              <div className="relative">
                <img 
                  src={project.productPhotos[0]} 
                  alt={project.productTitle}
                  className="w-full h-32 object-cover rounded border"
                />
                {project.productPhotos.length > 1 && (
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    +{project.productPhotos.length - 1}
                  </Badge>
                )}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onEdit(project)} className="flex-1">
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(project.id)}>
                  Delete
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <span className="col-span-2 text-muted-foreground font-medium flex items-center gap-1">
                  <Eye className="h-3 w-3" /> Preview
                </span>
                {templates.map((t) => (
                  <Button
                    key={`preview-${t.id}`}
                    size="sm"
                    variant="ghost"
                    className="h-8 justify-start"
                    onClick={() => onPreview(project, t.id as Project['template'])}
                  >
                    <Eye className="h-3 w-3 mr-1.5 shrink-0" />
                    {templateLabel(t)}
                  </Button>
                ))}
                <span className="col-span-2 text-muted-foreground font-medium flex items-center gap-1 mt-1">
                  <Download className="h-3 w-3" /> Download
                </span>
                {templates.map((t) => (
                  <Button
                    key={`download-${t.id}`}
                    size="sm"
                    variant="outline"
                    className="h-8 justify-start"
                    onClick={() => onGenerate(project, t.id as Project['template'])}
                  >
                    <Download className="h-3 w-3 mr-1.5 shrink-0" />
                    {templateLabel(t)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
