package com.ProjTeam.Doc2Blog.Reminders;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * RemindersController Class<br>
 * This class manages the controller endpoint methods to interact with from the
 * server.
 *
 * @author Warren Bradley
 * @version 1.00, 21 Jan 2022
 */

@RestController
@RequestMapping("/reminders")
public class RemindersController {

	@Autowired
	private RemindersCrudRep remindersRepository;

	@Autowired
	private ProjectCrudRep projectsRepository;

	/**
	 *
	 * saveProject Method. <br>
	 * This method is to save a new project to the database using a Post command
	 *
	 * @param body     Object representing the topic of the blog to be posted, the
	 *                 date the blog post is due, and how often the user wants to be
	 *                 reminded.
	 * 
	 * @since version 1.00
	 */
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public void saveProject(@RequestBody Projects body) {

		// TODO: find better way to do this?
		Projects project = new Projects(body.getTopic(), body.getPostDate(), body.getRemPeriod());
		Reminders reminder = new Reminders(project);

		remindersRepository.save(reminder);
	}

	/**
	 *
	 * getReminders Method. <br>
	 * This method is used to pull a list of all the unacknowledged reminders for
	 * all the unpublished projects using a Get command.
	 *
	 * @return reminders A List<Reminders> of individual Reminders with their
	 *         reminderId and the actual reminder text in string format.
	 * 
	 * @since version 1.00
	 */
	@GetMapping
	public List<Reminders> getReminders() {

		// Finding all projects that have not been published
		List<Projects> projects = projectsRepository.findByPublished(false);

		List<Reminders> reminders = new ArrayList<>();

		// Searching for reminders that match the project
		for (Projects project : projects) {

			Reminders reminder = remindersRepository.findByProject(project);

			// If the reminder exists add it to the list
			if (reminder != null) {

				if (reminder.isAcknowledged() == false) {
					reminders.add(reminder);
				}
			}
		}
		return reminders;
	}

	/**
	 *
	 * getProjects Method. <br>
	 * This method is used to pull a list of all the unpublished projects.
	 *
	 * @return A List<Projects> of individual Projects with their due date,
	 *         Id and project topic using a Get command with
	 *         extra mapping of "/project".
	 * 
	 * @since version 1.00
	 */
	@GetMapping(value = "/project", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Projects> getProjects() {

		// Finding all projects that have not been published
		List<Projects> projects = projectsRepository.findByPublished(false);

		return projects;
	}

	/**
	 *
	 * acknowledgeReminder Method. <br>
	 * This method is to change the acknowledge value of a reminder to true using a
	 * Put command
	 *
	 * @param reminderId Integer representing the unique reminderId of the reminder.
	 * 
	 * @since version 1.00
	 */
	@PutMapping
	public void acknowledgeReminder(@RequestBody int reminderId) {

		Reminders reminder = remindersRepository.findByReminderId(reminderId);

		reminder.setAcknowledged(true);

		remindersRepository.save(reminder);
	}

	/**
	 *
	 * publishProject Method. <br>
	 * This method is to change the publish value of a project to true using a Put
	 * command with extra mapping of "/project".
	 *
	 * @param projectId Integer representing the unique Id of the project.
	 * 
	 * @since version 1.00
	 */
	// Method to set the project to published
	@PutMapping("/project")
	public void publishProject(@RequestBody int projectId) {

		Projects project = projectsRepository.findById(projectId);

		project.setPublished(true);

		projectsRepository.save(project);
	}

}
