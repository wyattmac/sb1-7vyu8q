import React from 'react';
import { MapPin, Folder } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from './ui/card';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <Card className="project-card" onClick={() => onClick?.(project)}>
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
          <p className="text-gray-600">{project.client}</p>
        </div>
        <div className="flex gap-2">
          <span className={`status-badge ${project.priority}`}>
            {project.priority}
          </span>
          <span className={`status-badge ${project.status}`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Folder className="h-4 w-4" />
          <span>Parcel: {project.parcelNumber}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {project.fieldNotes && (
        <div className="field-notes">
          <strong>Field Notes:</strong> {project.fieldNotes}
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-500">
          Last updated {formatDistanceToNow(new Date(project.lastUpdated), { addSuffix: true })}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default ProjectCard;