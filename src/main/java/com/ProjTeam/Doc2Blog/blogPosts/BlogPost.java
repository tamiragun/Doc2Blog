package com.ProjTeam.Doc2Blog.blogPosts;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.util.Locale;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Projects Class<br>
 * This class manages the project object and its placement in the SQL table.
 *
 * @author Warren Bradley
 * @version 1.00, 21 Jan 2022
 */

@Entity
@Table(name = "Blog_Post")
public class BlogPost {

	// Attributes

	@Id
	@GeneratedValue
	private Integer id;

	@Column(name = "TOPIC")
	private String topic;

	@Column(name = "POST_DATE")
	private String postDate;

	@Column(name = "REM_PERIOD")
	private String remPeriod;

	@Column(name = "PUBLISHED")
	private boolean published = false;

	@Column(name = "LAST_REM")
	private String lastRem;

	@Column(name = "IS_OVERDUE")
	private boolean isOverdue = false;

	@Column(name = "POST_USER")
	private String postUser;

	@Column(name = "DAYS_BEFORE")
	private int daysBefore = 0;

	@Column(name = "POST_RECURRENCE")
	private String postRec = "none";

	@Column(name = "RECURRED")
	private boolean recurred = false;

	// Constructors

	// NoArgsConstructor
	public BlogPost() {

	}

	// ArgsConstructor
	public BlogPost(String topic, String postDate, String remPeriod, String postUser, int daysBefore, String postRec) {

		LocalDateTime ldt = LocalDateTime.now();

		this.topic = topic;
		this.postDate = postDate;
		this.remPeriod = remPeriod;
		this.postUser = postUser;
		this.lastRem = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH).format(ldt);
		this.daysBefore = daysBefore;
		this.postRec = postRec;
	}

	// Getters

	public Integer getId() {
		return id;
	}

	public String getTopic() {
		return topic;
	}

	@Column(nullable = false)
	public String getPostDate() {
		return postDate;
	}

	public String getRemPeriod() {
		return remPeriod;
	}

	public boolean isPublished() {
		return published;
	}

	public String getLastRem() {
		return lastRem;
	}

	public boolean isOverdue() {
		return isOverdue;
	}

	public String getPostUser() {
		return postUser;
	}

	public int getDaysBefore() {
		return daysBefore;
	}

	public String getPostRec() {
		return postRec;
	}

	public boolean isRecurred() {
		return recurred;
	}

	// Setters

	public void setRecurred(boolean recurred) {
		this.recurred = recurred;
	}

	public void setPostRec(String postRec) {
		this.postRec = postRec;
	}

	public void setOverdue(boolean isOverdue) {
		this.isOverdue = isOverdue;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}

	public void setRemPeriod(String remPeriod) {
		this.remPeriod = remPeriod;
	}

	public void setPublished(boolean published) {
		this.published = published;
	}

	public void setLastRem(String lastRem) {
		this.lastRem = lastRem;
	}

	public void setDaysBefore(int daysBefore) {
		this.daysBefore = daysBefore;
	}

	// ToString
	@Override
	public String toString() {
		return "Projects [id=" + id + ", topic=" + topic + ", postDate=" + postDate + ", remPeriod=" + remPeriod
				+ ", published=" + published + ", lastRem=" + lastRem + "]";
	}

}
