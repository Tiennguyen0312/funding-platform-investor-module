package com.example.demo;

import com.example.demo.model.Project;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.model.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;



@Component
public class DatabaseInit implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public DatabaseInit(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        
        Project project1 = new Project();
        project1.setName("Mega Growth");
        project1.setType("Scalable");
        project1.setGrade(5.0);
        project1.setRequiredFund(1000.0);   
        project1.setInvestedAmount(0.0); 
        project1.setProgress(0);
        project1.setDetail("High potential project");

        Project project2 = new Project();
        project2.setName("Budget Saver");
        project2.setType("Small");
        project2.setGrade(3.4);
        project2.setRequiredFund(1000.0);    
        project2.setInvestedAmount(0.0); 
        project2.setProgress(0);
        project2.setDetail("Moderate potential project");

        Project project3 = new Project();
        project3.setName("Gym Franchise");
        project3.setType("Small");
        project3.setGrade(3.4);
        project3.setRequiredFund(1000.0);    
        project3.setInvestedAmount(0.0); 
        project3.setProgress(0);
        project3.setDetail("Moderate potential project");

        Project project4 = new Project();
        project4.setName("Merchant");
        project4.setType("Small");
        project4.setGrade(3.4);
        project4.setRequiredFund(1000.0);   
        project4.setInvestedAmount(0.0); 
        project4.setProgress(0);
        project4.setDetail("Moderate potential project");

        Project project5 = new Project();
        project5.setName("Cyber Security");
        project5.setType("Small");
        project5.setGrade(3.4);
        project5.setRequiredFund(1000.0);    
        project5.setInvestedAmount(0.0); 
        project5.setProgress(0);
        project5.setDetail("Moderate potential project");

        Project project6 = new Project();
        project6.setName("Small Growth");
        project6.setType("Small");
        project6.setGrade(3.4);
        project6.setRequiredFund(1000.0);   
        project6.setInvestedAmount(0.0); 
        project6.setProgress(0);
        project6.setDetail("Moderate potential project");

        Project project7 = new Project();
        project7.setName("Food Bank");
        project7.setType("Small");
        project7.setGrade(3.4);
        project7.setRequiredFund(1000.0);   
        project7.setInvestedAmount(0.0); 
        project7.setProgress(0);
        project7.setDetail("Moderate potential project");

        Project project8 = new Project();
        project8.setName("Sport Equipment");
        project8.setType("Small");
        project8.setGrade(3.4);
        project8.setRequiredFund(1000.0);   
        project8.setInvestedAmount(0.0); 
        project8.setProgress(0);
        project8.setDetail("Moderate potential project");
        
        Project project9 = new Project();
        project9.setName("Medium Growth");
        project9.setType("Small");
        project9.setGrade(3.4);
        project9.setRequiredFund(1000.0);   
        project9.setInvestedAmount(0.0); 
        project9.setProgress(0);
        project9.setDetail("Moderate potential project");
        
        Project project10 = new Project();
        project10.setName("Souvernir");
        project10.setType("Small");
        project10.setGrade(3.4);
        project10.setRequiredFund(1000.0);    
        project10.setInvestedAmount(0.0); 
        project10.setProgress(0);
        project10.setDetail("Moderate potential project");
        
        Project project11 = new Project();
        project11.setName("Milk Farm");
        project11.setType("Small");
        project11.setGrade(3.4);
        project11.setRequiredFund(1000.0);    
        project11.setInvestedAmount(0.0); 
        project11.setProgress(0);
        project11.setDetail("Moderate potential project");
        
        Project project12 = new Project();
        project12.setName("Sport Wear");
        project12.setType("Small");
        project12.setGrade(3.4);
        project12.setRequiredFund(1000.0);    
        project12.setInvestedAmount(0.0); 
        project12.setProgress(0);
        project12.setDetail("Moderate potential project");
        
        projectRepository.save(project1);
        projectRepository.save(project2);
        projectRepository.save(project3);
        projectRepository.save(project4);
        projectRepository.save(project5);
        projectRepository.save(project6);
        projectRepository.save(project7);
        projectRepository.save(project8);
        projectRepository.save(project9);
        projectRepository.save(project10);
        projectRepository.save(project11);
        projectRepository.save(project12);

        projectRepository.findAll().forEach(project -> System.out.println(project.getType() + " - " + project.getGrade()));

        

        userRepository.save(new User("alice", "password", "investor", 100.0));
        userRepository.save(new User("bob", "password", "investor", 50.0));
        userRepository.save(new User("admin", "admin123", "admin", 0.0));
        userRepository.findAll().forEach(u -> 
            System.out.println("User: " + u.getUsername() + ", type=" + u.getUserType() + ", bal=" + u.getWalletBalance())
        );

    }
   
}
