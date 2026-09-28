package com.example.demo.service;

import com.example.demo.DTO.InvestmentRequest;
import com.example.demo.DTO.InvestmentResponse;
import com.example.demo.model.Investment;
import com.example.demo.model.Project;
import com.example.demo.model.User;
import com.example.demo.repository.InvestmentRepository;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.UserRepository;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service
public class InvestmentService {
    private final InvestmentRepository investmentRepo;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;
    public InvestmentService(InvestmentRepository investmentRepo,
                             UserRepository userRepo,
                             ProjectRepository projectRepo) {
        this.investmentRepo = investmentRepo;
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
    }

    @Transactional
    public Project investInProject(InvestmentRequest req) {
   
        User investor = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (investor.getWalletBalance() < req.getAmount()) {
            throw new RuntimeException("Insufficient balance");
        }
   
        investor.setWalletBalance(investor.getWalletBalance() - req.getAmount());
        userRepo.save(investor);
        Project project = projectRepo.findById(req.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Investment investment = new Investment(investor, project, req.getAmount());
        investmentRepo.save(investment);
        double newInvestedAmount = project.getInvestedAmount() + req.getAmount();
        project.setInvestedAmount(newInvestedAmount);
        if (project.getRequiredFund() > 0) {
            int newProgress = (int) ((newInvestedAmount / project.getRequiredFund()) * 100);
            project.setProgress(newProgress);
        }
        return projectRepo.save(project);
    }

    @Transactional(readOnly = true)
    public List<InvestmentResponse> getInvestmentsByUser(Long userId) {
    List<Investment> investments = StreamSupport
            .stream(investmentRepo.findAll().spliterator(), false)
            .filter(inv -> inv.getInvestor().getId().equals(userId))
            .collect(Collectors.toList());

    return investments.stream()
            .map(inv -> new InvestmentResponse(inv.getProject(), inv.getInvestor()))
            .collect(Collectors.toList());
   
}
}