package com.ProjTeam.Doc2Blog.blogPosts;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.ProjTeam.Doc2Blog.Dates;
import com.ProjTeam.Doc2Blog.reminders.Reminder;
import com.ProjTeam.Doc2Blog.reminders.ReminderCrudRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;
import static com.ProjTeam.Doc2Blog.Doc2BlogWebAppApplication.tokenHolder;

@RestController
@RequestMapping("/blog")
public class BlogPostController {

	@Autowired
	private BlogPostRepository blogPostRepository;

	@Autowired
	private ReminderCrudRep remindersRepository;

	/**
	 *
	 * getBlogPosts Method. <br>
	 * This method is used to pull a list of all the unpublished projects.
	 *
	 * @return A List<BlogPost> of individual BlogPosts with their due date, Id and
	 *         project topic using a Get command with mapping of "/blog".
	 * @throws ParseException
	 * 
	 * @since version 1.00
	 */

	@ApiOperation(value = "Provides a list of all the blog posts that need to be displayed", nickname = "Request Blog Posts")
	@Transactional
	@GetMapping
	public List<BlogPost> getBlogPosts() throws ParseException {

		// Finding all projects that have not been published
		List<BlogPost> blogPosts = blogPostRepository.findByPublished(false);
		// List to store the blogPosts to be displayed
		ArrayList<BlogPost> userPosts = new ArrayList<BlogPost>();
		// The active user that is logged in
		String postUser = tokenHolder.getUsername();

		if (blogPosts != null) {

			for (BlogPost blogPost : blogPosts) {

				if (blogPost.getPostUser().equalsIgnoreCase(postUser)) {

					// Getting the dueDate of the blogPost
					String dueDate = blogPost.getPostDate();

					// Checking to see if the post is overdue
					long diff = Dates.compareToCurrentDate(dueDate);

					if (diff < 0) {
						blogPost.setOverdue(true);

						String postRec = blogPost.getPostRec();

						boolean recurred = blogPost.isRecurred();

						if (recurred == false) {

							recBlogPost(blogPost, postRec);

						}

					}

					userPosts.add(blogPost);
				}

			}

		}
		return userPosts;
	}

	/**
	 *
	 * saveBlogPost Method. <br>
	 * This method is to save a new blogpost to the database using a Post command
	 *
	 * @param body Object representing the topic of the blog to be posted, the date
	 *             the blog post is due, and how often the user wants to be
	 *             reminded.
	 *
	 * @since version 1.00
	 */

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public void saveBlogPost(@RequestBody BlogPost body) {

		String postUser = tokenHolder.getUsername();

		BlogPost blogPost = new BlogPost(body.getTopic(), body.getPostDate(), body.getRemPeriod(), postUser,
				body.getDaysBefore(), body.getPostRec());
		Reminder reminder = new Reminder(blogPost);

		remindersRepository.save(reminder);
	}

	/**
	 *
	 * publishBlogPost Method. <br>
	 * This method is to change the publish value of a blogpost to true using a Put
	 * command with mapping of "/blog".
	 *
	 * @param projectId Integer representing the unique Id of the project.
	 * 
	 * @since version 1.00
	 */

	@ApiOperation(value = "Changes the blog post status to published so it won't be displayed anymore", nickname = "Publish blog post")
	@PutMapping
	public void publishBlogPost(@RequestBody int projectId) {

		BlogPost project = blogPostRepository.findById(projectId);

		project.setPublished(true);

		blogPostRepository.save(project);
	}

	public void recBlogPost(BlogPost body, String postRec) {

		String postUser = tokenHolder.getUsername();

		String newDate = Dates.addingWeekOrMonth(postRec);
		body.setRecurred(true);

		BlogPost blogPostNew = new BlogPost(body.getTopic(), newDate, body.getRemPeriod(), postUser,
				body.getDaysBefore(), body.getPostRec());
		Reminder reminderNew = new Reminder(blogPostNew);

		remindersRepository.save(reminderNew);
	}

}
