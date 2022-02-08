package com.ProjTeam.Doc2Blog.Authentication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




/**
 * RemindersCrudRep interface Class<br>
 * This interface manages the CRUD repository for the User class and it's interaction with mysql.
 *
 * @author Warren Bradley
 * @version 1.00, 01 Feb 2022
 */
//Creating an extension of the CrudRepository than can manage our Reminders model
@Repository
public interface UserRepo extends JpaRepository<AppUser, Integer>{
	
	AppUser findByUsername(String username);

}
