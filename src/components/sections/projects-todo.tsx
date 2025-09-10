"use client";

// import { plannedProjects, type Project } from '@/data/projects'
import { Badge } from "@/components/ui/badge";
import { plannedProjects } from "@/data/projects";
import { Project, projectsService } from "@/lib/firebase-services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Target, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";

const getPriorityColor = (priority: Project["projectType"]) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getPriorityIcon = (priority: Project["projectType"]) => {
  switch (priority) {
    case "high":
      return <Target className="w-4 h-4" />;
    case "medium":
      return <TrendingUp className="w-4 h-4" />;
    case "low":
      return <Lightbulb className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export function ProjectsToDo() {
  const highPriorityProjects = plannedProjects.filter(
    (p) => p.priority === "high"
  );
  const mediumPriorityProjects = plannedProjects.filter(
    (p) => p.priority === "medium"
  );
  const lowPriorityProjects = plannedProjects.filter(
    (p) => p.priority === "low"
  );

  const [showCompleted, setShowCompleted] = useState(true);

  const queryClient = useQueryClient();

  // Fetch projects data with better caching
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsService.getProjects,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const filteredProjects =
    projects?.filter((project) =>
      showCompleted ? !project.isCompleted : project.isCompleted
    ) || [];

  return (
    <section
      id="projects-todo"
      className="section-padding bg-white dark:bg-primary-900"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              Project Roadmap
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              Exciting projects I'm planning to build. These represent my
              learning goals and future ambitions.
            </p>
            <div className="w-24 h-1 bg-accent-600 mx-auto mt-6"></div>
          </div>

          {/* High Priority Projects */}
          {highPriorityProjects.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100">
                  High Priority
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* {highPriorityProjects.map(renderProjectCard)} */}
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="card group hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent-500"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <Badge className={getPriorityColor(project.projectType)}>
                          {getPriorityIcon(project.projectType)}
                          <span className="ml-1">
                            {/* {project.priority?.charAt(0).toUpperCase() + project.priority?.slice(1) || 'Planned'} */}
                            {project.projectType || "Planned"}
                          </span>
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-primary-600 dark:text-primary-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                          Planned Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full border border-dashed border-primary-300 dark:border-primary-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center space-x-2 text-sm text-primary-500 dark:text-primary-400">
                        <Clock className="w-4 h-4" />
                        <span>In Planning Phase</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
 

          {/* Roadmap Info */}
          <div className="text-center mt-16">
            <div className="p-8 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl border border-accent-200 dark:border-accent-800">
              <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
                Always Evolving
              </h3>
              <p className="text-primary-600 dark:text-primary-400 mb-6 max-w-2xl mx-auto">
                This roadmap represents my current learning goals and project
                ideas. As I grow and learn new technologies, this list will
                continue to evolve. I'm always open to suggestions and
                collaboration opportunities!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-500 dark:text-primary-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>High Priority - Next 3 months</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Medium Priority - Next 6 months</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Future Ideas - Long term</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
