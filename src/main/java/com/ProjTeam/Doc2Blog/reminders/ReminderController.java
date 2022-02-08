package com.ProjTeam.Doc2Blog.reminders;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
public class ReminderController {

	@Autowired
	private ReminderCrudRep remindersRepository;

	@Autowired
	private BlogPostRepository blogPostRepository;


	/**
	 *
	 * getReminders Method. <br>
	 * This method is used to pull a list of all the unacknowledged reminders for
	 * all the unpublished projects using a Get command.
	 *
	 * @return reminders A List<Reminders> of individual Reminders with their
	 *         reminderId and the actual reminder text in string format.
	 * @throws ParseException 
	 * 
	 * @since version 1.00
	 */
	
	@ApiOperation(value = "Provides a list of all the reminders that need to be displayed", nickname = "Request reminders")	
	@GetMapping
	public List<Reminder> getReminders() throws ParseException {

		// Finding all projects that have not been published
		List<BlogPost> blogPosts = blogPostRepository.findByPublished(false);

		List<Reminder> reminders = new ArrayList<>();

		// Searching for reminders that match the project
		for (BlogPost blogPost : blogPosts) {

			Reminder reminder = remindersRepository.findByBlogPost(blogPost);

			// If the reminder exists add it to the list
			if (reminder != null) {
				
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/mm/dd");
				Date dateNow = new Date();
				Date lastRem = dateFormat.parse(blogPost.getLastRem());
				
				long diffInMillies = Math.abs(dateNow.getTime() - lastRem.getTime());
			    long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
			    
			    if (blogPost.getRemPeriod().contains("d") && diff > 1) {
			    	reminder.setAcknowledged(false);
			    }
			    else if(blogPost.getRemPeriod().contains("w") && diff > 7) {
			    	reminder.setAcknowledged(false);
			    }
			    else if(blogPost.getRemPeriod().contains("m") && diff > 30) {
			    	reminder.setAcknowledged(false);
			    }

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

		Reminder reminder = remindersRepository.findByReminderId(reminderId);

		reminder.setAcknowledged(true);

		remindersRepository.save(reminder);
	}

	

}
