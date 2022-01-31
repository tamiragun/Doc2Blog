package com.ProjTeam.Doc2Blog;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import com.ProjTeam.Doc2Blog.reminders.ReminderController;

@ExtendWith(SpringExtension.class)
class RemindersControllerTest {

	private static MockMvc mockMvc;

	@BeforeAll
	static void init() {
		mockMvc = MockMvcBuilders.standaloneSetup(ReminderController.class).build();
	}

	/*
	 * @Test void test() {
	 * 
	 * Projects body = new Projects("Test Topic", "10 Feb 2022", "d");
	 * fail("Not yet implemented");
	 * 
	 * RemindersController.saveProject(body); }
	 */
	@Test
	void testGetReminders() throws Exception {

		mockMvc.perform(get("/reminders"))
		.andDo(print())
		.andExpect(status().isOk());
	}
	

}
