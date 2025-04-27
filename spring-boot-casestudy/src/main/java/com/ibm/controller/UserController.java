package com.ibm.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.User;
import com.ibm.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // return ResponseEntity.ok(userService.register(user));
        try {
            if (userService.isEmailTaken(user.getEmail())) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Email is already registered");
                return ResponseEntity.badRequest().body(response);
            }

            User registeredUser = userService.registerUser(user);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", registeredUser.getUserId());
            response.put("message", "User registered successfully");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        //return ResponseEntity.ok(userService.login(email, password));
        if (email == null || password == null) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Email and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<User> userOptional = userService.authenticateUser(email, password);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("userId", user.getUserId());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());
            response.put("mobile", user.getMobile());
            response.put("birthday", user.getBirthday());
            
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable String userId) {
        Optional<User> userOptional = userService.getUserByUserId(userId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("userId", user.getUserId());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());
            response.put("mobile", user.getMobile());
            response.put("birthday", user.getBirthday());
            
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestParam Long userId, @RequestParam String newPassword) {
        userService.changePassword(userId, newPassword);
        return ResponseEntity.ok("Password updated");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam Long userId) {
        userService.deleteProfile(userId);
        return ResponseEntity.ok("User deleted");
    }
} 
