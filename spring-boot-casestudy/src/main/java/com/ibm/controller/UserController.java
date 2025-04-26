package com.ibm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(userService.login(email, password));
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
