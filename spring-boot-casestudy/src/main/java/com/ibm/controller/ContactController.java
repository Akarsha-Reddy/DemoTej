package com.ibm.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> addContact(@RequestParam Long userId, @RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.addContact(userId, contact));
    }

    @GetMapping("/")
    public String home() {
        return "Hi Tejaswini!";
    }

    @GetMapping("/contacts")
    public ResponseEntity<?> getAll(@RequestParam Long userId) {
        return ResponseEntity.ok(contactService.getAllContacts(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestParam Long userId) {
        contactService.deleteContact(userId, id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam Long userId, @RequestParam String keyword) {
        return ResponseEntity.ok(contactService.searchContacts(userId, keyword));
    }
} 
