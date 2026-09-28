package com.example.demo.Controllers;

import com.example.demo.model.Project;
import com.example.demo.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {
    private final ProjectService service;
    public ProjectController(ProjectService service) {
        this.service = service;
    }
    @GetMapping
    public List<Project> getProjects() {
        return service.getAllProjects();
    }
    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return service.addProject(project);
    }

  
}