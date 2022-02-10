package com.ProjTeam.Doc2Blog.Authentication;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Role")
public class Role {

	// Attributes
	@Id
	@GeneratedValue
	private Integer Id;

	@Column(name = "Name")
	private String name;

	// NoArgsConstructor

	public Role() {
	}

	// AllArgsConstructor

	public Role(String name) {

		this.name = name;
	}

	// Getters

	public Integer getId() {
		return Id;
	}

	public String getName() {
		return name;
	}

	// Setters

	public void setName(String name) {
		this.name = name;
	}

}
