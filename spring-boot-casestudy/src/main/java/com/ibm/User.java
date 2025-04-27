package com.ibm;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
	public class User {
	    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userId;

    
    private String password;

    
    private String firstName;

    
    private String lastName;

    
   
    @Column(unique = true)
    private String email;

    
    private String mobile;

   
    private String birthday;
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contact> contacts = new ArrayList<>();

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
		public String getEmail() {
			return email;
		}
	
		public void setEmail(String email) {
			this.email = email;
		}

		public Long getId() {
			return id;
		}
	
		public void setId(Long id) {
			this.id = id;
		}
	
		public String getFirstName() {
			return firstName;
		}
	
	
		public String getLastName() {
			return lastName;
		}
	
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
	
		public String getMobile() {
			return mobile;
		}
	
		public void setMobile(String mobile) {
			this.mobile = mobile;
		}
	
		public String getBirthday() {
			return birthday;
		}
	
		public void setBirthday(String birthday) {
			this.birthday = birthday;
		}
	
		public List<Contact> getContacts() {
			return contacts;
		}
	
		public void setContacts(List<Contact> contacts) {
			this.contacts = contacts;
		}
	   
	   
	   
}