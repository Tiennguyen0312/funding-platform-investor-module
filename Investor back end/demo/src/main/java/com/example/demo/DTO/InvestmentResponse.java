package com.example.demo.DTO;

import com.example.demo.model.Project;
import com.example.demo.model.User;

public class InvestmentResponse {
    private Long projectId;
    private String projectName;
    private double investedAmount;
    private int progress;
    private double userBalance;
    private String username;
    public InvestmentResponse(Project project, User user) {
        this.projectId = project.getId();
        this.projectName = project.getName();
        this.investedAmount = project.getInvestedAmount();
        this.progress = project.getProgress();
        this.userBalance = user.getWalletBalance();
        this.username = user.getUsername();
    }
    
    public Long getProjectId() {
        return projectId;
    }
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public double getInvestedAmount() {
        return investedAmount;
    }
    public void setInvestedAmount(double investedAmount) {
        this.investedAmount = investedAmount;
    }

    public int getProgress() {
        return progress;
    }
    public void setProgress(int progress) {
        this.progress = progress;
    }

    public double getUserBalance() {
        return userBalance;
    }
    public void setUserBalance(double userBalance) {
        this.userBalance = userBalance;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}