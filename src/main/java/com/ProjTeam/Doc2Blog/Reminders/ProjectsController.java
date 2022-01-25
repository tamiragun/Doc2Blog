package com.ProjTeam.Doc2Blog.Reminders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController

public class ProjectsController {
	
	@Autowired
	private ProjectCrudRep projectRepository;
	
	
	
	/*
	public ProjectsController(ProjectCrudRep projectRepository) {
		
		this.projectRepository = projectRepository;
	}
	@PostMapping
	public void saveProject(String topic, String postDate, String remPeriod, String lastRem) {
		
		Projects project = new Projects(topic, postDate, remPeriod, lastRem);
		//Reminders reminder = new Reminders(project.getId());
		
		projectRepository.save(project);
		//remindersRepository.save(reminder);
		
	}*/
	
	
	
	

}
