import React, { useState, useEffect } from "react";
import Layout1 from "./LayoutP";
export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error:", error));
  }, []);
    return (
        <Layout1 projects={projects}></Layout1>
    );
  }