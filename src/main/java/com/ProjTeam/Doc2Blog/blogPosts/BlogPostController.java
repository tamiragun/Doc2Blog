package com.ProjTeam.Doc2Blog.blogPosts;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

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
	 * @return A List<BlogPost> of individual BlogPosts with their due date,
	 *         Id and project topic using a Get command with mapping of "/blog".
	 * 
	 * @since version 1.00
	 */
	
	@ApiOperation(value = "Provides a list of all the blog posts that need to be displayed", nickname = "Request Blog Posts")	
	@GetMapping
	public List<BlogPost> getBlogPosts() {

		// Finding all projects that have not been published
		List<BlogPost> blogPosts = blogPostRepository.findByPublished(false);
		ArrayList<BlogPost> userPosts = new ArrayList<BlogPost>();
		String postUser = tokenHolder.getUsername();
		
		if (blogPosts != null) {
			
			for (BlogPost blogPost : blogPosts) {
				
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
				LocalDateTime ldt = LocalDateTime.now();
				Date dueDate;
				
				try {
					Date dateNow = dateFormat.parse(DateTimeFormatter.ofPattern("yyyy-mm-dd", Locale.ENGLISH).format(ldt));
					dueDate = dateFormat.parse(blogPost.getPostDate());
					
					long diffInMillies = ( dueDate.getTime() - dateNow.getTime());
				    long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
				    
				   
				    
				    if(diff < 0) {
				    	blogPost.setOverdue(true);
				    }
				} catch (ParseException e) {
					
					e.printStackTrace();
				}
				
				if(blogPost.getPostUser().equalsIgnoreCase(postUser)) {
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
	 * @param body     Object representing the topic of the blog to be posted, the
	 *                 date the blog post is due, and how often the user wants to be
	 *                 reminded.
	 *
	 * @since version 1.00
	 */

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public void saveBlogPost(@RequestBody BlogPost body) {

		String postUser = tokenHolder.getUsername();
		
		BlogPost blogPost = new BlogPost(body.getTopic(), body.getPostDate(), body.getRemPeriod(), postUser);
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

}
