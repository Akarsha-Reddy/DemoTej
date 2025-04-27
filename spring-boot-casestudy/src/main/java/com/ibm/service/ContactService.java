// package com.ibm.service;

// import java.util.List;

// import com.ibm.Contact;

// public interface ContactService {
// 	    Contact addContact(Long userId, Contact contact);
// 	    List<Contact> getAllContacts(Long userId);
// 	    void deleteContact(Long userId, Long contactId);
// 	    List<Contact> searchContacts(Long userId, String keyword);
// 	}
// filepath: /c:/Users/akars/OneDrive/Documents/Teju/spring-boot-casestudy/src/main/java/com/ibm/service/ContactService.java
package com.ibm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ibm.Contact;
import com.ibm.User;
import com.ibm.repo.ContactRepo;
import com.ibm.repo.UserRepo;

@Service
public class ContactService {
    private final ContactRepo contactRepo;
    private final UserRepo userRepo;

    public ContactService(ContactRepo contactRepo, UserRepo userRepo) {
        this.contactRepo = contactRepo;
        this.userRepo = userRepo;
    }

    public Object addContact(Contact contact, String userId) {
        Optional<User> userOptional = userRepo.findByUserId(String.valueOf(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            contact.setUser(user);
            return contactRepo.save(contact);
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public List<Contact> getAllContactsByUserId(String userId) {
        Optional<User> userOptional = userRepo.findByUserId(String.valueOf(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return contactRepo.findByUserIdOrderByNameAsc(user.getId());
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public List<Contact> searchContactsByName(String userId, String name) {
        Optional<User> userOptional = userRepo.findByUserId(String.valueOf(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return contactRepo.findByUserIdAndNameContainingIgnoreCase(user.getId(), name);
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public Object getAllContacts(Long userId) {
        Optional<User> userOptional = userRepo.findByUserId(String.valueOf(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return contactRepo.findByUserIdOrderByNameAsc(user.getId());
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public void deleteContact(Long userId, Long id) {
        // Delete contact logic
    }

    public Object searchContacts(Long userId, String keyword) {
        Optional<User> userOptional = userRepo.findByUserId(String.valueOf(userId));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return contactRepo.findByUserIdAndNameContainingIgnoreCase(user.getId(), keyword);
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }
   
    public long getContactCount(String userId) {
        Optional<User> userOptional = userRepo.findByUserId(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return contactRepo.countByUserId(user.getId());
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    public Optional<Contact> getContactById(Long id) {
        return contactRepo.findById(id);
    }

    public void deleteContact(Long id) {
        contactRepo.deleteById(id);
    }
}


