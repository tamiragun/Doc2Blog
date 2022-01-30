package com.ProjTeam.Doc2Blog.Reminders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ProjTeam.Doc2Blog.blogPosts.BlogPost;

/**
 * RemindersCrudRep interface Class<br>
 * This interface manages the CRUD repository for the Reminderss class and it's interaction with mysql.
 *
 * @author Warren Bradley
 * @version 1.00, 21 Jan 2022
 */
// Creating an extension of the CrudRepository than can manage our Reminders model
@Repository
public interface RemindersCrudRep extends JpaRepository<Reminders, Integer>{
	
	//Method to find a list of reminders objects based in their acknowledged status.
	public List<Reminders> findByAcknowledged(boolean acknowledged);
	
	//Method to find individual reminder objects using the project they are linked to.
	public Reminders findByProject(BlogPost project);
	
	//Method to find individual reminder objects using their reminderId.
	public Reminders findByReminderId(int reminderId);

}
