package com.ProjTeam.Doc2Blog.blogPosts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/blog")
public class BlogPostController {
	
	@Autowired
	private BlogPostRepository blogPostRepository;
	
	/**
	 *
	 * getBlogPosts Method. <br>
	 * This method is used to pull a list of all the unpublished projects.
	 *
	 * @return A List<Projects> of individual Projects with their due date,
	 *         Id and project topic using a Get command with
	 *         extra mapping of "/project".
	 * 
	 * @since version 1.00
	 */
	
	@ApiOperation(value = "Provides a list of all the blog posts that need to be displayed", nickname = "Request Blog Posts")	
	@GetMapping
	public List<BlogPost> getBlogPosts() {

		// Finding all projects that have not been published
		List<BlogPost> blogPost = blogPostRepository.findByPublished(false);

		return blogPost;
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
	
	
	@ApiOperation(value = "Changes the blog post status to published so it won't be displayed anymore", nickname = "Publish blog post")	
	@PutMapping
	public void publishBlogPost(@RequestBody int projectId) {

		BlogPost project = blogPostRepository.findById(projectId);

		project.setPublished(true);

		blogPostRepository.save(project);
	}

}
