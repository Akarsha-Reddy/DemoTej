package com.ibm.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ibm.User;
public interface UserRepo extends JpaRepository<User, String> {
	 @Query("select u from User u where u.id=?1 and u.password=?2")
	 User findByUserIdAndPassword(String userId, String password);
}