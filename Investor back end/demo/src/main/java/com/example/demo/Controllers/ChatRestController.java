package com.example.demo.Controllers;

import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ChatRestController {

    @GetMapping("/waiting-list")
    public Set<String> getWaitingInvestors() {
        return ChatWebSocketController.getWaitingUsers();
    }

    @PostMapping("/clear-user")
    public void clearUser(@RequestParam String username) {
        ChatWebSocketController.clearUser(username);
    }
}