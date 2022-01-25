package com.ProjTeam.Doc2Blog.Reminders;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Creating an extension of the CrudRepository than can manage our Reminders model
@Repository
public interface ProjectCrudRep extends CrudRepository<Projects, Integer>{
	
	public List<Projects> findByPublished(boolean published);
	
	public Projects findById(int projId);
	

}
