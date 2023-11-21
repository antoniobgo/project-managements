import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";

export default function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleSelectedProject = (id) => {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  };

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: null };
    });
  };

  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: undefined };
    });
  };

  const handleAddProject = (project) => {
    setProjectsState((prevState) => {
      let projectToAdd = {
        ...project,
        id:
          prevState.projects.length > 0
            ? prevState.projects[prevState.projects.length - 1].id + 1
            : 1,
      };
      return {
        ...prevState,
        projects: [...prevState.projects, projectToAdd],
        selectedProjectId: projectToAdd.id,
      };
    });
  };

  const handleDeleteProject = (id) => {
    setProjectsState((prevState) => {
      const filteredProjects = prevState.projects.filter(
        (project) => project.id !== id
      );
      return {
        ...prevState,
        projects: filteredProjects,
        selectedProjectId:
          filteredProjects.length > 0 ? filteredProjects[0].id : undefined,
      };
    });
  };

  let selectedProject;
  if (projectsState.selectedProjectId)
    selectedProject = projectsState.projects.filter(
      (project) => project.id === projectsState.selectedProjectId
    );
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectedProject}
        projects={projectsState.projects}
      />
      {projectsState.selectedProjectId === null ? (
        <NewProject
          handleAddProject={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      ) : projectsState.selectedProjectId === undefined ? (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      ) : (
        <SelectedProject
          project={selectedProject[0]}
          onDeleteProject={handleDeleteProject}
        />
      )}
    </main>
  );
}
