package com.example.githubActionTest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/user")
    public Map<String, String> getUser() {
        Map<String, String> user = new HashMap<>();
        user.put("name", "testuser");
        user.put("status", "active");
        return user;
    }
}