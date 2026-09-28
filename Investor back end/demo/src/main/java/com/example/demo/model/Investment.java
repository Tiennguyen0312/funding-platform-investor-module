package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "investments")
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User investor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id")
    private Project project;

    private double amount;

    private LocalDateTime investmentTime;
    public Investment() {}
    public Investment(User investor, Project project, double amount) {
        this.investor = investor;
        this.project = project;
        this.amount = amount;
        this.investmentTime = LocalDateTime.now();
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public User getInvestor() {
        return investor;
    }
    public void setInvestor(User investor) {
        this.investor = investor;
    }
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public LocalDateTime getInvestmentTime() {
        return investmentTime;
    }

    public void setInvestmentTime(LocalDateTime investmentTime) {
        this.investmentTime = investmentTime;
    }
}