import React, { useState } from 'react';
import { Clock, AlertCircle, Calendar, Search, 
         CloudRain, Download, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from './ui/card';
import ProjectCard from './ProjectCard';
import { initialProjects } from '../data/initialProjects';
import type { Project, ProjectStatus, ProjectPriority } from '../types/project';

const weatherData = {
  temperature: "72°F",
  conditions: "Partly Cloudy",
  windSpeed: "8 mph",
  precipitation: "20%"
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<ProjectPriority | 'all'>('all');
  const [view, setView] = useState<'list' | 'grid'>('list');

  const stats = [
    { 
      title: 'Active Projects', 
      value: '12', 
      icon: Clock, 
      trend: '+2 this week',
      color: 'blue',
      detail: '8 field surveys, 4 office work'
    },
    { 
      title: 'Field Conditions', 
      value: weatherData.temperature, 
      icon: CloudRain, 
      trend: weatherData.conditions,
      color: 'purple',
      detail: `Wind: ${weatherData.windSpeed}`
    },
    { 
      title: 'Pending Reviews', 
      value: '6', 
      icon: AlertCircle, 
      trend: '3 urgent',
      color: 'amber',
      detail: '2 client reviews pending'
    },
  ];

  const filteredProjects = initialProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.parcelNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || project.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Surveyor Dashboard</h2>
          <p className="text-gray-600 mt-1">
            {format(new Date(), 'EEEE, MMMM do yyyy')}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="stats-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className={`stats-icon ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{stat.trend}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1 md:flex-initial">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>
          <select 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | 'all')}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            className="filter-select"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as ProjectPriority | 'all')}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button 
            className={`view-button ${view === 'list' ? 'active' : 'inactive'}`}
            onClick={() => setView('list')}
          >
            List View
          </button>
          <button 
            className={`view-button ${view === 'grid' ? 'active' : 'inactive'}`}
            onClick={() => setView('grid')}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            onClick={handleProjectClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;