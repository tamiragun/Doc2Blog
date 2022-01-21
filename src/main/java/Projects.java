
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Projects <br>
 * This class manages the project object and its placement in the SQL table.
 *
 * @author Warren Bradley
 * @version 1.00, 21 Jan 2022
 */

@Entity
@Table(name = "Projects")
public class Projects {

	//Attributes
	
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
	private boolean published;
	
	@Column(name = "LAST_REM")
	private String lastRem;
	
	//Constructor
	
	public Projects(Integer id, String topic, String postDate, String remPeriod, boolean published, String lastRem) {
		
		this.id = id;
		this.topic = topic;
		this.postDate = postDate;
		this.remPeriod = remPeriod;
		this.published = published;
		this.lastRem = lastRem;
	}	
		
	//Getters	

	public String getTopic() {
		return topic;
	}	

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
	
	//Setters
	
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

	
	
}
