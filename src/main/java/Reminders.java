import javax.persistence.Column;
import javax.persistence.Id;

public class Reminders {
	
	@Id
	@Column(name = "PROJ_ID")
	private Integer projId;
	
	@Column(name = "REMINDER")
	private String reminder;	
		
	@Column(name = "AKNOWLEDGED")
	private boolean acknowledged;
		
	
	public Reminders(Integer projId, String reminder, boolean acknowledged) {
		
		this.projId = projId;
		this.reminder = reminder;
		this.acknowledged = acknowledged;
	}

	//Getters

	public Integer getProjId() {
		return projId;
	}

	public String getReminder() {
		return reminder;
	}

	public boolean isAcknowledged() {
		return acknowledged;
	}	
		
	//Setters	

	public void setReminder(String reminder) {
		this.reminder = reminder;
	}

	public void setAcknowledged(boolean acknowledged) {
		this.acknowledged = acknowledged;
	}
	
	
	

}
