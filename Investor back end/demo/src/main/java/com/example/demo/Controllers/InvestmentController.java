package com.example.demo.Controllers;

import com.example.demo.DTO.InvestmentRequest;
import com.example.demo.DTO.InvestmentResponse;
import com.example.demo.model.Project;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.InvestmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/investments")
@CrossOrigin(origins = "http://localhost:5173")
public class InvestmentController {
    private final InvestmentService investmentService;
    private final UserRepository userRepository;  
    public InvestmentController(InvestmentService investmentService, UserRepository userRepository) {
        this.investmentService = investmentService;
        this.userRepository = userRepository;
    }
    @PostMapping("/project/{projectId}")
    public ResponseEntity<InvestmentResponse> investInProject(
            @PathVariable Long projectId,
            @RequestBody InvestmentRequest req) {
        try {
            req.setProjectId(projectId);
            Project updatedProject = investmentService.investInProject(req);
            User updatedUser = userRepository.findById(req.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
         
            InvestmentResponse response = new InvestmentResponse(updatedProject, updatedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InvestmentResponse>> getInvestmentsByUser(@PathVariable Long userId) {
    try {
        List<InvestmentResponse> responses = investmentService.getInvestmentsByUser(userId);
        return ResponseEntity.ok(responses);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
}