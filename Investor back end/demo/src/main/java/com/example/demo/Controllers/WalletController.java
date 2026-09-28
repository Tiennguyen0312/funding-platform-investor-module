package com.example.demo.Controllers;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.DTO.WalletRequest;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/wallet")
@CrossOrigin(origins = "http://localhost:5173")
public class WalletController {
    private final UserRepository userRepository;
    public WalletController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @PostMapping("/deposit")
    public User deposit(@RequestBody WalletRequest req) {
        User user = userRepository.findById(req.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setWalletBalance(user.getWalletBalance() + req.getAmount());
        userRepository.save(user);
        return user;
    }
    @PostMapping("/withdraw")
    public User withdraw(@RequestBody WalletRequest req) {
        User user = userRepository.findById(req.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getWalletBalance() < req.getAmount()) {
            throw new RuntimeException("Insufficient funds");
        }
        user.setWalletBalance(user.getWalletBalance() - req.getAmount());
        userRepository.save(user);
        return user;
    }
}

