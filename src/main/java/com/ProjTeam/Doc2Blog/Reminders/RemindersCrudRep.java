package com.ProjTeam.Doc2Blog.Reminders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Creating an extension of the CrudRepository than can manage our Reminders model
@Repository
public interface RemindersCrudRep extends JpaRepository<Reminders, Integer>{
	
	public List<Reminders> findByAcknowledged(boolean acknowledged);
	
	public Reminders findByProject(Projects project);
	
	public Reminders findByReminderId(int reminderId);

}
