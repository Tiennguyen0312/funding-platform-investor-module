import React, { useState } from "react";
import InvestmentForm from "./InvestmentForm";
import { useAuth } from "../customHooks/AuthContext";

export default function Sec({ projects, currentPage, totalPages, setCurrentPage }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const { user } = useAuth();

  const handleInvestClick = (project) => {
    setSelectedProject(project);
  };
  const handleInvestmentSuccess = (updatedProject) => {
    console.log("Updated project:", updatedProject);
  };

  return (
    <div className="section-container">
    <h2 className="project-heading">List of Projects:</h2>
    {projects.length === 0 ? (
      <p>No projects match the selected filters.</p>
    ) : (
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <div className="project-top-row">
              <div className="project-main-info">
                <strong>{project.name}</strong> &mdash; {project.type} &mdash;{" "}
                {project.grade} &mdash; {project.progress}%
              </div>
              
              {user && user.userType === "investor" && (
                <button className="rainbow-button" onClick={() => handleInvestClick(project)}>
                  Invest
                </button>
              )}
            </div>
            <div className="project-detail">{project.detail}</div>
          </li>
        ))}
      </ul>
    )}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
      {selectedProject && (
        <InvestmentForm
          project={selectedProject}
          user={user}
          onClose={() => setSelectedProject(null)}
          onInvestmentSuccess={handleInvestmentSuccess}
        />
      )}
    </div>
  );
}