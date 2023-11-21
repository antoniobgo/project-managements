import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";

export default function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

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
        projects: [...prevState.projects, projectToAdd],
        selectedProjectId: projectToAdd.id,
      };
    });
  };
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
      />
      {projectsState.selectedProjectId === null ? (
        <NewProject
          handleAddProject={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      ) : (
        <NoProjectSelected onStartAddProject={handleStartAddProject} />
      )}
    </main>
  );
}
