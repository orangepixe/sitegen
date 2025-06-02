
import { Project } from '@/types/project';

const PROJECTS_KEY = 'admin_projects';

export const saveProjects = (projects: Project[]): void => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const loadProjects = (): Project[] => {
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProject = (project: Project): void => {
  const projects = loadProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  
  saveProjects(projects);
};

export const deleteProject = (id: string): void => {
  const projects = loadProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveProjects(filtered);
};
