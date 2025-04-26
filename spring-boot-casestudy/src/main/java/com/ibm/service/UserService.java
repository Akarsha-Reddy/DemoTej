// package com.ibm.service;

// import com.ibm.User;

// public interface UserService {
//     User register(User user);
//     String login(String email, String password); // returns JWT
//     void changePassword(Long userId, String newPassword);
//     void deleteProfile(Long userId);
// }
package com.ibm.service;

import org.springframework.stereotype.Service;

import com.ibm.User;

@Service
public class UserService {

    public User register(User user) {
        // Registration logic here
        return null;
    }

    public String login(String email, String password) {
        // Login logic here (return JWT)
        return null;
    }

    public void changePassword(Long userId, String newPassword) {
        // Change password logic here
    }

    public void deleteProfile(Long userId) {
        // Delete profile logic here
    }
}