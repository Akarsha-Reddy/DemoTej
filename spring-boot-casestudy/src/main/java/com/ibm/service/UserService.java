// package com.ibm.service;

// import com.ibm.User;

// public interface UserService {
//     User register(User user);
//     String login(String email, String password); // returns JWT
//     void changePassword(Long userId, String newPassword);
//     void deleteProfile(Long userId);
// }
package com.ibm.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.User;
import com.ibm.repo.UserRepo;

@Service
public class UserService {

   
private final UserRepo userRepo;
    private final Random random = new Random();

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User registerUser(User user) {
        // Generate a random user ID (4 digits)
        String userId = String.format("%04d", 1000 + random.nextInt(9000));
        while (userRepo.existsByUserId(userId)) {
            userId = String.format("%04d", 1000 + random.nextInt(9000));
        }
        user.setUserId(userId);
        
        return userRepo.save(user);
    }

    public Optional<User> authenticateUser(String userId, String password) {
        return userRepo.findByUserIdAndPassword(userId, password);
    }

    public Optional<User> getUserByUserId(String userId) {
        return userRepo.findByUserId(userId);
    }

    public boolean isUserIdTaken(String userId) {
        return userRepo.existsByUserId(userId);
    }

    public boolean isEmailTaken(String email) {
        return userRepo.existsByEmail(email);
    }
    // Existing methods in UserService

    public void deleteProfile(Long userId) {
        userRepo.deleteById(String.valueOf(userId));
    }
    public void changePassword(Long userId, String newPassword) {
        Optional<User> userOptional = userRepo.findById(String.valueOf(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword); 
            userRepo.save(user);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }
}