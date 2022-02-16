package com.ProjTeam.Doc2Blog.reminders;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ProjTeam.Doc2Blog.blogPosts.BlogPost;

/**
 * Reminder Class<br>
 * This class manages the reminder object and its placement in the SQL table.
 *
 * @author Warren Bradley
 * @version 1.00, 21 Jan 2022
 */

@Entity
@Table(name = "Reminders")
public class Reminder {

	//Attributes
	@Id
	@GeneratedValue
	private Integer reminderId;

	@Column(name = "REMINDER")
	private String reminder = "Your project is due";

	@Column(name = "AKNOWLEDGED")
	private boolean acknowledged ;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "post_id", referencedColumnName = "id")
	private BlogPost blogPost;

	//NoArgsConstuctor
	public Reminder() {
	}
	//ArgsConstructor
	public Reminder(BlogPost blogPost) {

		this.reminder = String.format("Your blog on \"%s\" is due on %s.", blogPost.getTopic(), blogPost.getPostDate());
		this.acknowledged = true;
		this.blogPost = blogPost;
	}

	// Getters

	public Integer getReminderId() {
		return reminderId;
	}

	public String getReminder() {
		return reminder;
	}

	public boolean isAcknowledged() {
		return acknowledged;
	}

	public BlogPost getBlogPost() {
		return blogPost;
	}

	// Setters
	
	
	public void setReminder(String reminder) {
		this.reminder = reminder;
	}

	public void setAcknowledged(boolean acknowledged) {
		this.acknowledged = acknowledged;
	}

	//ToString
	@Override
	public String toString() {
		return String.format("%s", reminder);
	}

}
