package com.ProjTeam.Doc2Blog.Authentication;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	/**
	 *
	 * registerUser Method. <br>
	 * This method is to create and save new Users on the server
	 *
	 * @param body Object representing the Name, email address and password of the
	 *             user.
	 *
	 * @since version 1.00
	 */

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/user/register")
	public ResponseEntity<AppUser> registerUser(@RequestBody AppUser body) {
		URI uri = URI
				.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/auth/user/register").toUriString());			
		
		return ResponseEntity.created(uri).body(userService.registerUser(body));
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/role/save")
	public ResponseEntity<Role> saveRole(@RequestBody Role body) {
		URI uri = URI
				.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/auth/role/save").toUriString());
		return ResponseEntity.created(uri).body(userService.saveRole(body));
	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/role/addtouser")
	public ResponseEntity<Role> addRoleToUser(@RequestBody RoleToUserForm form) {
		userService.addRoleToUser(form.getUsername(), form.getRoleName());

		return ResponseEntity.ok().build();
	}

	@GetMapping("/user")
	public ResponseEntity<AppUser> getUser(String email) {
		return ResponseEntity.ok().body(userService.getUser(email));
	}

	@GetMapping("/users")
	public ResponseEntity<List<AppUser>> getUsers() {
		return ResponseEntity.ok().body(userService.getUsers());
	}

}

class RoleToUserForm {
	private String username;
	private String roleName;

	public String getUsername() {
		return username;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
