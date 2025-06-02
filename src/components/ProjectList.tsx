
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onGenerate: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, onGenerate }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle className="text-lg">{project.productTitle}</CardTitle>
            <p className="text-sm text-gray-600">{project.websiteName}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">{project.shortDescription}</p>
              <p className="font-semibold">${project.price}</p>
              <p className="text-xs text-gray-500">Template: {project.template}</p>
              {project.productPhotos.length > 0 && (
                <img 
                  src={project.productPhotos[0]} 
                  alt={project.productTitle}
                  className="w-full h-32 object-cover rounded"
                />
              )}
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => onEdit(project)}>Edit</Button>
                <Button size="sm" variant="outline" onClick={() => onGenerate(project)}>Generate</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(project.id)}>Delete</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
