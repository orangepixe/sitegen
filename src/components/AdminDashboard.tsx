
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/types/project';
import { loadProjects, saveProject, deleteProject as removeProject } from '@/utils/storage';
import { generateHTML } from '@/utils/templates';
import { logout } from '@/utils/auth';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const handleSaveProject = (project: Project) => {
    saveProject(project);
    setProjects(loadProjects());
    setCurrentView('list');
    setEditingProject(undefined);
    toast({
      title: 'Success',
      description: 'Project saved successfully!',
    });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      removeProject(id);
      setProjects(loadProjects());
      toast({
        title: 'Success',
        description: 'Project deleted successfully!',
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentView('edit');
  };

  const handleGenerateHTML = (project: Project) => {
    try {
      const html = generateHTML(project);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.websiteName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_index.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Success',
        description: 'HTML file generated and downloaded!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate HTML file.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'list' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
              <Button onClick={() => setCurrentView('add')}>
                Add New Project
              </Button>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No projects found</p>
                <Button onClick={() => setCurrentView('add')}>
                  Create Your First Project
                </Button>
              </div>
            ) : (
              <ProjectList
                projects={projects}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onGenerate={handleGenerateHTML}
              />
            )}
          </div>
        )}

        {(currentView === 'add' || currentView === 'edit') && (
          <div className="space-y-6">
            <ProjectForm
              project={editingProject}
              onSave={handleSaveProject}
              onCancel={() => {
                setCurrentView('list');
                setEditingProject(undefined);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
