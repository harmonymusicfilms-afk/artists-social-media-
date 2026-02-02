import React from 'react';
import { X, MapPin, Briefcase, Calendar, CheckCircle, Users, Building, Globe } from 'lucide-react';
import { CastingProject } from '../../types';

interface ProjectDetailModalProps {
    project: CastingProject;
    onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-3xl bg-casting-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-zoom-in border border-white/10">
                <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all">
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="p-8 border-b border-gray-200">
                    <span className="text-xs font-bold uppercase text-casting-primary tracking-wider">{project.type}</span>
                    <h2 className="text-3xl font-bold text-casting-text-dark mt-2">{project.title}</h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-casting-text-light mt-3">
                        <span className="flex items-center gap-1.5"><Building size={14} /> {project.agency}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={14} /> {project.budget}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> Posted {project.postedAt}</span>
                    </div>
                </div>
                
                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-casting-text-dark mb-3">Project Description</h3>
                        <p className="text-casting-text-light leading-relaxed">{project.description}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-casting-text-dark mb-4">Role Requirements ({project.rolesCount} Open)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                           <div className="text-center">
                               <p className="text-sm font-semibold text-casting-text-light">Gender</p>
                               <p className="font-bold text-lg text-casting-text-dark">{project.roleRequirements.gender}</p>
                           </div>
                            <div className="text-center">
                               <p className="text-sm font-semibold text-casting-text-light">Age Range</p>
                               <p className="font-bold text-lg text-casting-text-dark">{project.roleRequirements.ageRange}</p>
                           </div>
                           <div className="text-center">
                               <p className="text-sm font-semibold text-casting-text-light">Total Roles</p>
                               <p className="font-bold text-lg text-casting-text-dark">{project.rolesCount}</p>
                           </div>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold text-casting-text-dark mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.roleRequirements.skills.map(skill => (
                                <span key={skill} className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                    <CheckCircle size={14} className="text-casting-primary" /> {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-casting-text-light">Ready to take the spotlight?</p>
                    <button className="w-full sm:w-auto px-10 py-3 bg-casting-primary text-white font-bold rounded-lg hover:bg-casting-accent transition-colors duration-300">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};
