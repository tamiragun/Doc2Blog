package com.ProjTeam.Doc2Blog.Reminders;

import java.util.ArrayList;
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
	 * @param topic     String representing the topic of the blog to be posted
	 * @param postDate  String depicting the date the blog post is due
	 * @param remPeriod String depicting how often the user wants to be reminded.
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
	 * @return methodOutput A List<List<String>> of individual lists containing the
	 *         reminderId and the actual reminder both in string format.
	 * 
	 * @since version 1.00
	 */
	@GetMapping
	public List<List<String>> getReminders() {

		// Finding all projects that have not been published
		List<Projects> projects = projectsRepository.findByPublished(false);

		// Creating the output string
		ArrayList<List<String>> methodOutput = new ArrayList<List<String>>();

		// Searching for reminders that match the project
		for (Projects project : projects) {

			ArrayList<String> reminderInfo = new ArrayList<String>();

			Reminders reminder = remindersRepository.findByProject(project);

			// If the reminder exists add it to the list
			if (reminder != null) {

				if (reminder.isAcknowledged() == false) {
					reminderInfo.add(String.format("%s", reminder.getReminderId()));
					reminderInfo.add(reminder.toString());
				}
			}

			methodOutput.add(reminderInfo);
		}
		return methodOutput;
	}

	/**
	 *
	 * getProjects Method. <br>
	 * This method is used to pull a list of all the unpublished projects.
	 *
	 * @return methodOutput A List<List<String>> of individual lists containing the
	 *         Id and project topic both in string format using a Get command with
	 *         extra mapping of "/project".
	 * 
	 * @since version 1.00
	 */
	@GetMapping("/project")
	public List<List<String>> getProjects() {

		// Finding all projects that have not been published
		List<Projects> projects = projectsRepository.findByPublished(false);

		// Creating the output string
		ArrayList<List<String>> methodOutput = new ArrayList<List<String>>();

		// iterating through unpublished projects to add them to the list
		for (Projects project : projects) {

			ArrayList<String> projectInfo = new ArrayList<String>();

			int projId = project.getId();
			String topic = project.getTopic();

			projectInfo.add(String.format("%s", projId));
			projectInfo.add(topic);

			methodOutput.add(projectInfo);
		}
		return methodOutput;
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
