package com.ProjTeam.Doc2Blog.Reminders;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


/**
 * ProjectCrudRep interface Class<br>
 * This interface manages the CRUD repository for the Projects class and it's interaction with mysql.
 *
 * @author Warren Bradley
 * @version 1.00, 21 Jan 2022
 */
// Creating an extension of the CrudRepository than can manage our Reminders model
@Repository
public interface ProjectCrudRep extends CrudRepository<Projects, Integer>{
	
	//Method to find a list of all projects based on their published status
	public List<Projects> findByPublished(boolean published);
	
	//Method to find individual projects based on their Id
	public Projects findById(int projId);
	

}
