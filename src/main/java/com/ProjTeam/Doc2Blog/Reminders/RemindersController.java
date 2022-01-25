package com.ProjTeam.Doc2Blog.Reminders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reminders")
public class RemindersController {

	@Autowired
	private RemindersCrudRep remindersRepository;

	@Autowired
	private ProjectCrudRep projectsRepository;

	//Method to allow for the creating of a new project with its reminder
	@PostMapping
	public void saveProject(String topic, String postDate, String remPeriod) {

		Projects project = new Projects(topic, postDate, remPeriod);
		Reminders reminder = new Reminders(project);

		remindersRepository.save(reminder);

	}

	//Method to fetch the active reminders 
	@GetMapping
	public String getReminders() {

		//Finding all projects that have not been published
		List<Projects> projects = projectsRepository.findByPublished(false);

		//Creating the output string
		String outputString = "";

		//Searching for reminders that match the project
		for (Projects project : projects) {
				
			Reminders reminder = remindersRepository.findByProject(project);

			if (reminder != null) {

				if (reminder.isAcknowledged() == false) {
					outputString += reminder.toString() + "\n";
				}
			}
		}		
		return outputString;
	}
	
	//Method to set the reminder to acknowledged
	@PutMapping
	public void acknowledgeReminder (int reminderId) {
		
		Reminders reminder = remindersRepository.findByReminderId(reminderId);
		
		reminder.setAcknowledged(true);
		
		remindersRepository.save(reminder);
		
	}
	
	//Method to set the project to published
	@PutMapping("/project")
	public void publishProject (int projectId) {
		
		Projects project = projectsRepository.findById(projectId);
		
		project.setPublished(true);
		
		projectsRepository.save(project);
		
	}

}
