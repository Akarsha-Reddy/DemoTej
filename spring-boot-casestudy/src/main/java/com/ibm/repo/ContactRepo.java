package com.ibm.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibm.Contact;

public interface ContactRepo extends JpaRepository<Contact, Long> {
    List<Contact> findByUserIdOrderByNameAsc(Long userId);
    List<Contact> findByUserIdAndNameContainingIgnoreCase(Long userId, String name);
    long countByUserId(Long userId);
}