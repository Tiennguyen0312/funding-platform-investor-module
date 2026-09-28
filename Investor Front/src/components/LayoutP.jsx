import { useState } from "react";
import { Outlet } from "react-router-dom";
import Side from "./Side";
import Sec from "./Section";


export default function Layout1({ projects }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const filteredProjects = projects.filter((project) => {
    const matchesName = project.name
    ? project.name.toLowerCase().includes(searchTerm.toLowerCase())
    : true;
    const grade = project.grade;
    const progress = project.progress;
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(project.type);
    const matchesGrade =
      selectedGrades.length === 0 ||
      selectedGrades.some((selected) => {
        selected = selected.trim();
        if (selected === "5 stars") return grade === 5.0;
        if (selected === "4 stars and upper") return grade >= 4.0 && grade < 5.0;
        if (selected === "3 stars and upper") return grade >= 3.0 && grade < 4.0;
        if (selected === "3 stars and below") return grade <= 3.0;
        return false;
      });
    const matchesProgress =
      selectedProgress.length === 0 ||
      selectedProgress.some((selected) => {
        selected = selected.trim();
        if (selected === "Upper 80%") return progress >= 80;
        if (selected === "Upper 50%") return progress >= 50 && progress < 80;
        if (selected === "50% and below") return progress >=0 && progress < 50;
        return false;
      });
    const matchesStars = grade !== null && grade >= selectedStars;
    const matchesPercentage = progress !== null && progress >= selectedPercentage;

    return matchesName &&matchesType && matchesGrade && matchesProgress && matchesStars && matchesPercentage;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="container">
      <div className="sidebar">
        <Side 
         searchTerm={searchTerm}
         setSearchTerm={(name)=> { setSearchTerm(name); setCurrentPage(1); }}
          selectedTypes={selectedTypes}
          setSelectedTypes={(types) => { setSelectedTypes(types); setCurrentPage(1); }}
          selectedGrades={selectedGrades}
          setSelectedGrades={(grades) => { setSelectedGrades(grades); setCurrentPage(1); }}
          selectedProgress={selectedProgress}
          setSelectedProgress={(progress) => { setSelectedProgress(progress); setCurrentPage(1); }}
          selectedStars={selectedStars}
          setSelectedStars={(stars) => { setSelectedStars(stars); setCurrentPage(1); }}
          selectedPercentage={selectedPercentage}
          setSelectedPercentage={(percentage) => { setSelectedPercentage(percentage); setCurrentPage(1); }}
          setCurrentPage={setCurrentPage}
        />
    </div>
      <div  className="maincontent">
        <Sec 
          projects={currentProjects}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage} 
        />
        <Outlet />
     </div>
    </div>
  );
}