package com.example.demo.DTO;

public class WaitingRequest {
    private String username;
    private String userType;
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getUserType() {
        return userType;
    }
    public void setUserType(String userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "WaitingRequest{username='" + username + "', userType='" + userType + "'}";
    }
}
