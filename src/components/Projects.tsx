import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import type { Project } from '../types/project';
import ProjectCard from './ProjectCard';
import NewProjectModal from './NewProjectModal';
import { initialProjects } from '../data/initialData';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getNextProjectNumber = () => {
    const projectNumbers = projects.map(p => parseInt(p.id));
    const maxNumber = Math.max(...projectNumbers, 99);
    return (maxNumber + 1).toString();
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.id.includes(searchTerm)
  );

  const handleCreateProject = async (projectData: Omit<Project, 'id' | 'lastUpdated' | 'title'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const nextNumber = getNextProjectNumber();
      const newProject: Project = {
        ...projectData,
        id: nextNumber,
        title: `Project #${nextNumber}`,
        lastUpdated: new Date().toISOString(),
        progress: 0,
        equipment: [],
        surveyType: 'Boundary',
        priority: 'medium',
        status: 'pending'
      };
      setProjects(prev => [newProject, ...prev]);
      setIsModalOpen(false);

      // Create a schedule event for research
      const startTime = new Date();
      startTime.setHours(7, 0, 0, 0); // Set to 7:00 AM
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 30); // Add 30 minutes

      const scheduleEvent = new CustomEvent('newScheduleEvent', {
        detail: {
          id: crypto.randomUUID(),
          title: `Research for Project #${nextNumber}`,
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          projectId: nextNumber,
          type: 'office-work',
          status: 'scheduled',
          description: 'Initial project research and planning',
          allDay: false
        }
      });
      window.dispatchEvent(scheduleEvent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async (projectData: Project) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProject = {
        ...projectData,
        lastUpdated: new Date().toISOString()
      };
      setProjects(prev => prev.map(p => p.id === projectData.id ? updatedProject : p));
      setSelectedProject(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      setProjects(prev => prev.filter(p => p.id !== id));
      setSelectedProject(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects by number, client, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {(isModalOpen || selectedProject) && (
        <NewProjectModal
          isOpen={true}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
          onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
          onDelete={selectedProject ? () => handleDeleteProject(selectedProject.id) : undefined}
          isLoading={isLoading}
          initialData={selectedProject}
          showDelete={!!selectedProject}
        />
      )}
    </div>
  );
}