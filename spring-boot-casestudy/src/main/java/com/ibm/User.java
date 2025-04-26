package com.ibm;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "users")
	public class User {
	    
@Id

	    private String userId;
	    private String password;
	    private String name;
	    private long phone;
	    private LocalDate dob;
		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public long getPhone() {
			return phone;
		}
		public void setPhone(long phone) {
			this.phone = phone;
		}
		public LocalDate getDob() {
			return dob;
		}
		public void setDob(LocalDate dob) {
			this.dob = dob;
		}
	   
	   
	   
}