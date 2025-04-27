package com.ibm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.Contact;
import com.ibm.service.ContactService;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addContact(@PathVariable String userId, @RequestBody Contact contact) {
        try {
            if (contact == null || contact.getName() == null || contact.getName().isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Contact name is required");
                return ResponseEntity.badRequest().body(response);
            }
            Contact savedContact = (Contact) contactService.addContact(contact, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllContacts(@PathVariable String userId) {
        try {
            List<Contact> contacts = contactService.getAllContactsByUserId(userId);
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{userId}/search")
    public ResponseEntity<?> searchContacts(@PathVariable String userId, @RequestParam String name) {
        try {
            List<Contact> contacts = contactService.searchContactsByName(userId, name);
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{userId}/count")
    public ResponseEntity<?> getContactCount(@PathVariable String userId) {
        try {
            long count = contactService.getContactCount(userId);
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        try {
            Optional<Contact> contactOptional = contactService.getContactById(id);
            if (contactOptional.isPresent()) {
                contactService.deleteContact(id);
                Map<String, String> response = new HashMap<>();
                response.put("message", "Contact deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Contact not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 
