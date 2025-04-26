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

import org.springframework.stereotype.Service;

import com.ibm.Contact;

@Service
public class ContactService {
    public Object addContact(Long userId, Contact contact) {
        // Add contact logic
        return null;
    }

    public Object getAllContacts(Long userId) {
        // Get all contacts logic
        return null;
    }

    public void deleteContact(Long userId, Long id) {
        // Delete contact logic
    }

    public Object searchContacts(Long userId, String keyword) {
        // Search contacts logic
        return null;
    }
}


