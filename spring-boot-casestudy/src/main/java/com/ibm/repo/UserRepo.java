package com.ibm.repo;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibm.User;

public interface UserRepo extends JpaRepository<User, String> {
	//  @Query("select u from User u where u.id=?1 and u.password=?2")
	//  User findByUserIdAndPassword(String userId, String password);
	Optional<User> findByUserId(String userId);
    Optional<User> findByUserIdAndPassword(String userId, String password);
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
}