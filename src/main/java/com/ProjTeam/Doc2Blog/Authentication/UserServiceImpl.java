package com.ProjTeam.Doc2Blog.Authentication;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepo userRepo;
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = userRepo.findByUsername(username);

		if (appUser == null) {
			throw new UsernameNotFoundException("User not found in the database!");
		}

		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

		for (Role role : appUser.getRoles()) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}

		return new User(appUser.getName(), appUser.getPassword(), authorities);
	}

	@Override
	public AppUser registerUser(AppUser appUser) {

		appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));

		AppUser user = userRepo.save(appUser);
		Role role = roleRepo.findByName("Role_User");

		user.getRoles().add(role);

		return user;
	}

	@Override
	public AppUser getUser(String username) {

		return userRepo.findByUsername(username);
	}

	@Override
	public List<AppUser> getUsers() {

		return userRepo.findAll();
	}

	@Override
	public Role saveRole(Role role) {
		roleRepo.save(role);
		return null;
	}

	@Override
	public void addRoleToUser(String username, String roleName) {
		AppUser user = userRepo.findByUsername(username);
		Role role = roleRepo.findByName(roleName);

		user.getRoles().add(role);
	}

}
