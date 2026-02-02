import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { CastingProject } from '../../types';

interface ProjectCardProps {
    project: CastingProject;
    onViewDetails: (project: CastingProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => (
    <div 
        onClick={() => onViewDetails(project)}
        className="bg-casting-card rounded-lg shadow-md p-6 border border-gray-200/50 hover:shadow-xl hover:border-casting-primary/50 transition-all duration-300 cursor-pointer flex flex-col"
    >
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="text-xs font-bold uppercase text-casting-primary tracking-wider">{project.type}</span>
                    <h3 className="text-xl font-bold text-casting-text-dark mt-1 line-clamp-2">{project.title}</h3>
                    <p className="text-sm text-casting-text-light">{project.agency}</p>
                </div>
                <span className="text-sm font-semibold bg-casting-accent/10 text-casting-accent px-3 py-1 rounded-full whitespace-nowrap">{project.rolesCount} Roles</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-casting-text-light my-4">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={14} /> {project.budget}</span>
            </div>
        </div>
        <div className="mt-auto">
            <button className="w-full bg-casting-primary text-white py-3 rounded-lg font-bold transition-colors hover:bg-casting-accent">
                View Details
            </button>
        </div>
    </div>
);
