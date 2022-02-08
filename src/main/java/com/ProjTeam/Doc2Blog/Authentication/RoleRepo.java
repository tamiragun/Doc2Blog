package com.ProjTeam.Doc2Blog.Authentication;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {
	
	Role findByName(String name);

}
