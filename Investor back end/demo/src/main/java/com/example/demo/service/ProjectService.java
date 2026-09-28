package com.example.demo.service;

import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProjectService {
    
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // GET all
    public List<Project> getAllProjects() {
        return StreamSupport.stream(projectRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    // POST create
    public Project addProject(Project project) {
        // if needed, set default fields
        if (project.getInvestedAmount() == 0) {
            project.setInvestedAmount(0);
        }
        if (project.getRequiredFund() == 0) {
            project.setRequiredFund(1000); // or any default
        }
        return projectRepository.save(project);
    }
}