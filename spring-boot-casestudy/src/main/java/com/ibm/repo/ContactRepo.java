package com.ibm.repo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ibm.Contact;
import com.ibm.User;
public interface ContactRepo extends JpaRepository<Contact, String>{
	@Query("SELECT c FROM Contact c WHERE c.user = :user")
	 List<Contact> findByUser(User user);
	
	@Query("select c from Contact c where c.user=?1")
	 void deleteByUser(User user);
}