import React, { useState } from "react";
import {
  Plus,
  ArrowRight,
  CheckCircle,
  Clock3,
  AlertCircle,
  Sparkles,
  List,
  Filter,
  Search,
  Home,
  X,
  Bell,
  LayoutGrid,
  Link as LinkIcon,
  FileText,
  Users,
  Calendar,
  GitBranch,
  FolderPlus,
  Folder,
  ChevronDown,
  Edit,
  ExternalLink,
  Video,
  Upload,
  Download,
  Trash2,
  File,
  Copy
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";

const TeamPage = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingLink, setEditingLink] = useState({
    projectId: null,
    linkId: null,
  });
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState({});

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
  });

  const [linkForm, setLinkForm] = useState({
    title: "",
    url: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    reminder: false,
  });

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of company website",
      links: [
        { id: 1, title: "Figma Design", url: "https://figma.com/..." },
        { id: 2, title: "Project Doc", url: "https://docs.google.com/..." },
      ],
      meets: [], // Add this new array for meets
      tasks: {
        todo: [
          {
            id: 1,
            title: "Design System Update",
            description: "Update component library with new design tokens",
            dueDate: "2024-01-15",
            priority: "high",
            reminder: true,
            progress: 0,
          },
        ],
        inProgress: [],
        completed: [],
      },
    },
  ]);

  const handleCreateProject = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      ...projectForm,
      links: [],
      tasks: {
        todo: [],
        inProgress: [],
        completed: [],
      },
    };

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject
            ? {
                ...p,
                name: projectForm.name,
                description: projectForm.description,
              }
            : p
        )
      );
      setEditingProject(null);
    } else {
      setProjects((prev) => [...prev, newProject]);
    }

    setProjectForm({ name: "", description: "" });
    setShowCreateProject(false);
    setExpandedProjects((prev) => ({ ...prev, [newProject.id]: true }));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!selectedProject) return;

    const newTask = {
      id: Date.now(),
      ...taskForm,
      progress: 0,
    };

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === selectedProject) {
          return {
            ...project,
            tasks: {
              ...project.tasks,
              todo: [newTask, ...project.tasks.todo],
            },
          };
        }
        return project;
      })
    );

    setTaskForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      reminder: false,
    });
    setShowCreateTask(false);
  };

  const handleCompleteTask = (projectId, taskId) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const task = [
            ...project.tasks.todo,
            ...project.tasks.inProgress,
          ].find((t) => t.id === taskId);

          if (task) {
            const updatedTask = {
              ...task,
              progress: 100,
              completedDate: new Date().toISOString().split("T")[0],
            };

            return {
              ...project,
              tasks: {
                todo: project.tasks.todo.filter((t) => t.id !== taskId),
                inProgress: project.tasks.inProgress.filter(
                  (t) => t.id !== taskId
                ),
                completed: [updatedTask, ...project.tasks.completed],
              },
            };
          }
        }
        return project;
      })
    );
    setTaskToComplete(null);
  };

  const handleSubmitLink = (e) => {
    e.preventDefault();
    const { projectId, linkId } = editingLink;

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const updatedLinks = linkId
            ? project.links.map((link) =>
                link.id === linkId ? { ...link, ...linkForm } : link
              )
            : [...project.links, { id: Date.now(), ...linkForm }];

          return {
            ...project,
            links: updatedLinks,
          };
        }
        return project;
      })
    );

    setLinkForm({ title: "", url: "" });
    setShowLinkForm(false);
    setEditingLink({ projectId: null, linkId: null });
  };

  const handleEditProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setProjectForm({
      name: project.name,
      description: project.description,
    });
    setEditingProject(projectId);
    setShowCreateProject(true);
  };

  const toggleProjectExpanded = (projectId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Add this to your state declarations at the top
  const [showMeetForm, setShowMeetForm] = useState(false);
  const [meetForm, setMeetForm] = useState({
    title: "",
    date: "",
    time: "",
  });

  const handleCreateMeet = (e) => {
    e.preventDefault();
    
    // Generate a meeting code in the format: xxx-xxxx-xxx (all lowercase letters)
    const generateMeetCode = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz'; // Using all lowercase letters as per Google Meet format
      
      // Generate three parts: xxx-xxxx-xxx (all lowercase letters)
      const part1 = Array(3).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      const part2 = Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      const part3 = Array(3).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      
      return `${part1}-${part2}-${part3}`;
    };
  
    const meetCode = generateMeetCode();
    const meetUrl = `https://meet.google.com/${meetCode}`;
    
    const newMeet = {
      id: Date.now(),
      ...meetForm,
      url: meetUrl,
      code: meetCode,
      createdBy: 'dyra-12', // Adding the current user
      createdAt: new Date().toISOString() // Adding creation timestamp
    };
  
    setProjects(prev => prev.map(project => {
      if (project.id === selectedProject) {
        return {
          ...project,
          meets: [...project.meets, newMeet]
        };
      }
      return project;
    }));
  
    setMeetForm({
      title: "",
      date: "",
      time: ""
    });
    setShowMeetForm(false);
  };



  return (
    <div className="px-6 py-3 h-full overflow-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs mb-8">
        <Home className="w-4 h-4 text-white/80" />
        <span className="text-white/80">/</span>
        <span className="text-cyan-500">Projects</span>
      </div>

      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur-xl" />
        <div className="relative rounded-lg border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <h1 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  Project Management
                </h1>
                <p className="text-xs text-white/70 mt-1">
                  Manage your projects and tasks
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateProject(true)}
              className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs">Create Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-white/10 rounded-lg">
            <button
              onClick={() => toggleProjectExpanded(project.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Folder className="w-4 h-4 text-cyan-500" />
                <div className="text-left">
                  <h2 className="text-sm text-white">{project.name}</h2>
                  <p className="text-xs text-gray-400">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditProject(project.id);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project.id);
                    setShowCreateTask(true);
                  }}
                  className="flex items-center space-x-2 bg-black border border-white/10 text-white px-3 py-1.5 rounded-lg hover:border-cyan-500/50 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-xs">Add Task</span>
                </button>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedProjects[project.id] ? "transform rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {expandedProjects[project.id] && (
              <div className="border-t border-white/10">
                {/* Project Links */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-medium text-gray-400">
                      Project Links
                    </h3>
                    <button
                      onClick={() => {
                        setEditingLink({ projectId: project.id, linkId: null });
                        setLinkForm({ title: "", url: "" });
                        setShowLinkForm(true);
                      }}
                      className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Link
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {project.links.map((link) => (
                      <div
                        key={link.id}
                        className="group relative border border-white/10 rounded-lg p-3 hover:border-cyan-500/50 transition-all"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h4 className="text-sm text-gray-300 mb-1 flex items-center">
                            {link.title}
                            <ExternalLink className="w-3 h-3 ml-1 text-gray-500" />
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {link.url}
                          </p>
                        </a>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingLink({
                              projectId: project.id,
                              linkId: link.id,
                            });
                            setLinkForm({ title: link.title, url: link.url });
                            setShowLinkForm(true);
                          }}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-white/5 rounded transition-all"
                        >
                          <Edit className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Meets */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-medium text-gray-400">
                      Meetings
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedProject(project.id);
                        setShowMeetForm(true);
                      }}
                      className="text-xs text-cyan-500 hover:text-cyan-400 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Schedule Meet
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {project.meets?.map((meet) => (
  <div
    key={meet.id}
    className="group relative border border-white/10 rounded-lg p-3 hover:border-cyan-500/50 transition-all"
  >
    <div className="mb-3">
      <h4 className="text-sm text-gray-300 mb-1">
        {meet.title}
      </h4>
      <div className="text-xs text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {meet.date}
        </div>
        <div className="flex items-center mt-1">
          <Clock3 className="w-3 h-3 mr-1" />
          {meet.time}
        </div>
      </div>
    </div>

    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between text-xs bg-white/5 px-2 py-1.5 rounded">
        <code className="font-mono text-cyan-500">{meet.code}</code>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(meet.code);
          }}
          className="p-1 hover:bg-white/10 rounded"
          title="Copy meeting code"
        >
          <Copy className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      <a
        href={meet.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 px-3 py-1.5 rounded-lg transition-colors text-xs"
      >
        <Video className="w-3 h-3" />
        <span>Join Meeting</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>

    <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/10">
      Created by {meet.createdBy}
    </div>
  </div>
))}
                  </div>
                </div>

                {/* Project Tasks */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(project.tasks).map(([status, taskList]) => (
                      <div key={status} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-400 capitalize">
                            {status === "todo"
                              ? "To Do"
                              : status === "inProgress"
                              ? "In Progress"
                              : "Completed"}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {taskList.length} tasks
                          </span>
                        </div>

                        <div className="space-y-3">
                          {taskList.map((task) => (
                            <div
                              key={task.id}
                              className="group bg-black border border-white/10 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={status === "completed"}
                                    onChange={() =>
                                      setTaskToComplete({
                                        projectId: project.id,
                                        ...task,
                                      })
                                    }
                                    className="w-4 h-4 rounded-full border border-white/10 bg-black checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-500"
                                  />
                                  <span className="text-xs text-gray-400">
                                    TASK-{task.id}
                                  </span>
                                </div>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    task.priority === "high"
                                      ? "text-red-400 border border-red-400/20"
                                      : task.priority === "medium"
                                      ? "text-cyan-400 border border-cyan-400/20"
                                      : "text-green-400 border border-green-400/20"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              <h3 className="text-sm text-gray-300 mb-2">
                                {task.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-3">
                                {task.description}
                              </p>

                              <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {task.dueDate}
                                </div>
                                {task.reminder && (
                                  <div className="flex items-center">
                                    <Bell className="w-3 h-3 mr-1" />
                                    Reminder Set
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FolderPlus className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    {editingProject ? "Edit Project" : "Create New Project"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowCreateProject(false);
                    setEditingProject(null);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter project description"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateProject(false);
                      setEditingProject(null);
                    }}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {editingProject ? "Save Changes" : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Plus className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Create New Task
                  </h2>
                </div>
                <button
                  onClick={() => setShowCreateTask(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={taskForm.dueDate}
                      onChange={(e) =>
                        setTaskForm((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      required
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={taskForm.priority}
                      onChange={(e) =>
                        setTaskForm((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="reminder"
                    id="reminder"
                    checked={taskForm.reminder}
                    onChange={(e) =>
                      setTaskForm((prev) => ({
                        ...prev,
                        reminder: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 border-2 border-white/10 rounded focus:ring-cyan-500 bg-black text-cyan-500"
                  />
                  <label
                    htmlFor="reminder"
                    className="text-xs text-gray-400 flex items-center"
                  >
                    <Bell className="w-4 h-4 mr-1 text-cyan-500" />
                    Enable Reminders
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateTask(false)}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Link Form Modal */}
      {showLinkForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <LinkIcon className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    {editingLink.linkId ? "Edit Link" : "Add Link"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowLinkForm(false);
                    setEditingLink({ projectId: null, linkId: null });
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                </button>
              </div>

              <form onSubmit={handleSubmitLink} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Link Title
                  </label>
                  <input
                    type="text"
                    value={linkForm.title}
                    onChange={(e) =>
                      setLinkForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter link title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={linkForm.url}
                    onChange={(e) =>
                      setLinkForm((prev) => ({ ...prev, url: e.target.value }))
                    }
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter URL"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLinkForm(false);
                      setEditingLink({ projectId: null, linkId: null });
                    }}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {editingLink.linkId ? "Save Changes" : "Add Link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Complete Task Dialog */}
      <AlertDialog
        open={taskToComplete !== null}
        onOpenChange={() => setTaskToComplete(null)}
      >
        <AlertDialogContent className="border border-white/10 bg-black/90 max-w-md w-full rounded-xl">
          <AlertDialogHeader className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
              <AlertDialogTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Complete This Task?
              </AlertDialogTitle>
            </div>

            {taskToComplete && (
              <AlertDialogDescription className="space-y-4">
                <div className="group p-4 rounded-lg border border-white/10 bg-white/5">
                  <h3 className="text-gray-300 mb-2">{taskToComplete.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock3 className="w-4 h-4 mr-1" />
                    Due: {taskToComplete.dueDate}
                  </div>
                </div>
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300">
              Keep in progress
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90"
              onClick={() => {
                if (taskToComplete) {
                  handleCompleteTask(
                    taskToComplete.projectId,
                    taskToComplete.id
                  );
                }
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Meet Form Modal */}
      {showMeetForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Video className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Schedule Google Meet
                  </h2>
                </div>
                <button
                  onClick={() => setShowMeetForm(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                </button>
              </div>

              <form onSubmit={handleCreateMeet} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={meetForm.title}
                    onChange={(e) =>
                      setMeetForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter meeting title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={meetForm.date}
                      onChange={(e) =>
                        setMeetForm((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      required
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={meetForm.time}
                      onChange={(e) =>
                        setMeetForm((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      required
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowMeetForm(false)}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Meeting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
