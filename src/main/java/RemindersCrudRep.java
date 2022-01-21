
import org.springframework.data.repository.CrudRepository;

// Creating an extension of the CrudRepository than can manage our Reminders model
public interface RemindersCrudRep extends CrudRepository<Reminders, Integer>{
	

}
