package com.ProjTeam.Doc2Blog.Authentication;

import java.util.List;

public interface UserService {
	
	AppUser registerUser(AppUser appUser);
	Role saveRole(Role role);
	void addRoleToUser(String username, String roleName);
	AppUser getUser(String username);
	List<AppUser>getUsers();

}
