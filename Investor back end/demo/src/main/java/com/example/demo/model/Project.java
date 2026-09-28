package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private double grade;
    private int progress;
    private String detail;

    private double investedAmount;
    private double requiredFund;

    public Project() {}
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getGrade() { return grade; }
    public void setGrade(double grade) { this.grade = grade; }
    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }
    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }
    public double getInvestedAmount() { return investedAmount; }
    public void setInvestedAmount(double investedAmount) { this.investedAmount = investedAmount; }
    public double getRequiredFund() { return requiredFund; }
    public void setRequiredFund(double requiredFund) { this.requiredFund = requiredFund; }
}