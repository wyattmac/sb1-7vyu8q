import { ArrowLeft, MapPin, User, Phone, Hash, Calendar, Clock, Pencil } from 'lucide-react';
import type { Project } from '../types/project';
import { useState } from 'react';
import NewProjectModal from './NewProjectModal';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export default function ProjectDetail({ project, onBack, onEdit, onDelete }: ProjectDetailProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const handleUpdate = async (projectData: Omit<Project, 'id' | 'lastUpdated'>) => {
    setIsLoading(true);
    try {
      const updatedProject: Project = {
        ...projectData,
        id: project.id,
        lastUpdated: new Date().toISOString()
      };
      onEdit(updatedProject);
      setIsEditModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Projects
        </button>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Pencil className="h-4 w-4" />
          Edit Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
              {project.status.replace('-', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{project.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Parcel Number</p>
                  <p className="font-medium">{project.parcelNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Contact Phone</p>
                  <p className="font-medium">{project.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Project Date</p>
                  <p className="font-medium">{new Date(project.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{new Date(project.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {project.description && (
            <div className="border-t mt-6 pt-6">
              <h2 className="text-lg font-semibold mb-3">Project Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
            </div>
          )}
        </div>
      </div>

      <NewProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        onDelete={() => {
          onDelete(project.id);
          onBack();
        }}
        isLoading={isLoading}
        initialData={project}
        showDelete
      />
    </div>
  );
}