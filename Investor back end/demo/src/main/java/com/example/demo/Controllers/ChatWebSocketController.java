package com.example.demo.Controllers;

import com.example.demo.DTO.ChatMessage;
import com.example.demo.DTO.WaitingRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private static final Set<String> waitingUsers = ConcurrentHashMap.newKeySet();

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/waiting")
    public void handleWaiting(@Payload WaitingRequest waitingRequest) {
        System.out.println(">> handleWaiting called with payload: " + waitingRequest);
        if (waitingRequest.getUsername() != null && !waitingRequest.getUsername().trim().isEmpty() &&
            "investor".equalsIgnoreCase(waitingRequest.getUserType())) {
            System.out.println("[WS] Received waiting from investor: " + waitingRequest.getUsername());
            waitingUsers.add(waitingRequest.getUsername());
        } else {
            System.out.println(">> Not adding to waiting list. Payload: " + waitingRequest);
        }
    }

    @MessageMapping("/send")
    public void handleChat(@Payload ChatMessage message) {
        messagingTemplate.convertAndSend("/topic/" + message.getRecipient(), message);
    }

    public static Set<String> getWaitingUsers() {
        return waitingUsers;
    }

    public static void clearUser(String username) {
        waitingUsers.remove(username);
    }

    @PostConstruct
    public void init() {
        System.out.println("ChatWebSocketController loaded");
    }
}