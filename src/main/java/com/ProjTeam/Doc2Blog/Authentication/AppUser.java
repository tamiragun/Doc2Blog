package com.ProjTeam.Doc2Blog.Authentication;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Users")
public class AppUser {

	// Attributes
	@Id
	@GeneratedValue
	private Integer userId;

	@Column(name = "Name")
	private String name;

	@Column(name = "Username")
	private String username;

	@Column(name = "Email")
	private String email;

	@Column(name = "Password")
	private String password;

	@ManyToMany(fetch = FetchType.EAGER)
	private Collection<Role> roles = new ArrayList<Role>();

	// NoArgsConstructor
	public AppUser() {
	}

	// AllArgsCOnstructor
	public AppUser(String name, String username, String email, String password) {

		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;

	}

	// Getters

	public String getUsername() {
		return username;
	}

	public Integer getUserId() {
		return userId;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public Collection<Role> getRoles() {
		return roles;
	}

	// Setters

	public void setName(String name) {
		this.name = name;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
