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

import com.ProjTeam.Doc2Blog.blogPosts.BlogPost;
import com.ProjTeam.Doc2Blog.blogPosts.BlogPostRepository;

import io.swagger.annotations.ApiOperation;

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
	private BlogPostRepository blogPostRepository;

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
	public void saveProject(@RequestBody BlogPost body) {
		
		BlogPost blogPost = new BlogPost(body.getTopic(), body.getPostDate(), body.getRemPeriod());
		Reminders reminder = new Reminders(blogPost);

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
	
	@ApiOperation(value = "Provides a list of all the reminders that need to be displayed", nickname = "Request reminders")	
	@GetMapping
	public List<Reminders> getReminders() {

		// Finding all projects that have not been published
		List<BlogPost> blogPosts = blogPostRepository.findByPublished(false);

		List<Reminders> reminders = new ArrayList<>();

		// Searching for reminders that match the project
		for (BlogPost blogPost : blogPosts) {

			Reminders reminder = remindersRepository.findByProject(blogPost);

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
	 * acknowledgeReminder Method. <br>
	 * This method is to change the acknowledge value of a reminder to true using a
	 * Put command
	 *
	 * @param reminderId Integer representing the unique reminderId of the reminder.
	 * 
	 * @since version 1.00
	 */
	
	@ApiOperation(value = "Changes the reminder status to acknowledged so it won't display", nickname = "Acknowledge reminder")	
	@PutMapping
	public void acknowledgeReminder(@RequestBody int reminderId) {

		Reminders reminder = remindersRepository.findByReminderId(reminderId);

		reminder.setAcknowledged(true);

		remindersRepository.save(reminder);
	}

	

}
