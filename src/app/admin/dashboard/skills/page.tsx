"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillsService, Skill } from "@/lib/firebase-services";
import { Input, Button, Select } from "@/components/admin/ui/form-components";
import { Code, Plus, Edit, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";
import ProtectedRoute from "@/components/admin/auth/protected-route";
import { SkillsSkeleton } from "@/components/admin/ui/skeleton";
import { toast } from "react-toastify";

const SKILL_CATEGORIES = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Development",
  "Mobile Development",
  "DevOps & Cloud",
  "Database",
  "Design",
  "Tools & Technologies",
  "Programming Languages",
  "Frameworks & Libraries",
  "Other",
];

const PROFICIENCY_LEVELS = [
  { value: 25, label: "Beginner (25%)" },
  { value: 50, label: "Intermediate (50%)" },
  { value: 75, label: "Advanced (75%)" },
  { value: 90, label: "Expert (90%)" },
  { value: 100, label: "Master (100%)" },
];

export default function SkillsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 75,
    icon: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  // Fetch skills data with better caching
  const {
    data: skills,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const result = await skillsService.getSkills();
    return Array.isArray(result) ? result : [];
    },
  });

  // Create skill mutation
  const createSkillMutation = useMutation({
    mutationFn: (data: Omit<Skill, "id" | "createdAt" | "updatedAt">) =>
      skillsService.createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      resetForm();
      toast.success("Skill created successfully!");
    },
    onError: (error: any) => {
      console.error("Skill creation error:", error);
      toast.error("Failed to create skill. Please try again.");
    },
  });

  // Update skill mutation
  const updateSkillMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Skill> }) =>
      skillsService.updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      resetForm();
      toast.success("Skill updated successfully!");
    },
    onError: (error: any) => {
      console.error("Skill update error:", error);
      toast.error("Failed to update skill. Please try again.");
    },
  });

  // Delete skill mutation
  const deleteSkillMutation = useMutation({
    mutationFn: skillsService.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Skill deletion error:", error);
      toast.error("Failed to delete skill. Please try again.");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      proficiency: 75,
      icon: "",
    });
    setErrors({});
    setShowForm(false);
    setEditingSkill(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.category) {
      setErrors({ general: "Please fill in all required fields." });
      return;
    }

    const skillData = {
      name: formData.name.trim(),
      category: formData.category,
      proficiency: formData.proficiency,
      icon: formData.icon.trim() || undefined,
    };

    if (editingSkill) {
      updateSkillMutation.mutate({ id: editingSkill.id, data: skillData });
    } else {
      createSkillMutation.mutate(skillData);
    }
  };

  const handleDelete = (skill: Skill) => {
    if (window.confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      deleteSkillMutation.mutate(skill.id);
    }
  };

  // Group skills by category
  const safeSkills = Array.isArray(skills) ? skills : [];
  const skillsByCategory =
    safeSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>) || {};

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-green-500";
    if (proficiency >= 75) return "bg-blue-500";
    if (proficiency >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <SkillsSkeleton />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-red-600 dark:text-red-400">
            Failed to load skills. Please refresh the page.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Code className="mr-3 h-8 w-8 text-blue-600" />
                  Skills Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage your technical skills and proficiency levels
                </p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                icon={Plus}
                className="ml-4"
              >
                Add Skill
              </Button>
            </div>
          </div>

          {/* Skill Form */}
          {showForm && (
            <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h2>

              {errors.general && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <p className="text-red-600 dark:text-red-400">
                    {errors.general}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Skill Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., React, Php, AWS"
                    error={errors.name}
                    required
                  />

                  <Select
                    label="Category"
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    options={
                      Array.isArray(SKILL_CATEGORIES)
                        ? SKILL_CATEGORIES.map((cat) => ({
                            value: cat,
                            label: cat,
                          }))
                        : []
                    }
                    error={errors.category}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Proficiency Level
                    </label>
                    <select
                      value={formData.proficiency}
                      onChange={(e) =>
                        handleInputChange(
                          "proficiency",
                          parseInt(e.target.value)
                        )
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {PROFICIENCY_LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full ${getProficiencyColor(
                            formData.proficiency
                          )}`}
                          style={{ width: `${formData.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Icon (Optional)"
                    value={formData.icon}
                    onChange={(e) => handleInputChange("icon", e.target.value)}
                    placeholder="e.g., 🚀, ⚡, 💻"
                    error={errors.icon}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="secondary" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={
                      createSkillMutation.isPending ||
                      updateSkillMutation.isPending
                    }
                    icon={Code}
                  >
                    {editingSkill ? "Update Skill" : "Create Skill"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Skills List */}
          <div className="space-y-8">
            {Object.keys(skillsByCategory).length === 0 ? (
              <div className="text-center py-12">
                <Code className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No skills added yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by adding your first skill.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setShowForm(true)} icon={Plus}>
                    Add Skill
                  </Button>
                </div>
              </div>
            ) : (
              Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div
                    key={category}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {skill.icon && (
                                <span className="text-lg">{skill.icon}</span>
                              )}
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {skill.name}
                              </h4>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleEdit(skill)}
                                icon={Edit}
                              />
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(skill)}
                                icon={Trash2}
                                loading={deleteSkillMutation.isPending}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                              <span>Proficiency</span>
                              <span>{skill.proficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                              <div
                                className={`h-2 rounded-full ${getProficiencyColor(
                                  skill.proficiency
                                )}`}
                                style={{ width: `${skill.proficiency}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
