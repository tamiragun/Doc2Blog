package com.ProjTeam.Doc2Blog;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;
import java.util.Calendar;

public interface Dates {
	
	public static long compareToCurrentDate(String dateStr) throws ParseException {
		
		// Getting current date
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		LocalDateTime ldt = LocalDateTime.now();

		// Getting the last date the reminder was set
		Date date = dateFormat.parse(dateStr);
		
		// Formating the current date
		Date dateNow = dateFormat
				.parse(DateTimeFormatter.ofPattern("yyyy/MM/dd", Locale.ENGLISH).format(ldt));

		// Comparing the current date to date variable
		long diffInMillies = (date.getTime() - dateNow.getTime());
		long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

		
		return diff;
		
	}
	
	public static String addingWeekOrMonth(String postRec){
		

		  //create Calendar instance
	    Calendar now = Calendar.getInstance();
	    
	    //adding either a month or week depending on the postRec value
	    if (postRec.equalsIgnoreCase("weekly")) {
	    	now.add(Calendar.WEEK_OF_YEAR, 1);
	    }else if (postRec.equalsIgnoreCase("monthly")) {
	    	now.add(Calendar.WEEK_OF_YEAR, 4);
	    }   
	    
	    //Getting the year, month and day of current date
	    int year = now.get(Calendar.YEAR);
	    int monthInt =now.get(Calendar.MONTH)+1;
	    int dayInt = now.get(Calendar.DATE);
	    String day;
	    String month;
	    
	    //Changing the format to fit required output
	    if (monthInt < 10){
	        month = String.format("%s","0" + monthInt);
	    }else{
	        month = String.format("%s", monthInt);
	    }
	    
	    if (dayInt < 10){
	         day = String.format("%s","0" + dayInt);
	    }else{
	         day = String.format("%s", dayInt);
	    }
	    
	    //Setting as one string for output
	    String newDate = String.format("%s/%S/%S",year, month ,day);
		
		return newDate;
	}

}
