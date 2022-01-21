package com.ProjTeam.Doc2Blog.convert;

/**
 * ReadFile <br>
 * This class manages and stores the attributes and content of each paraghragh pulled from the document.
 *
 * @author Warren Bradley
 * @version 1.00, 05 Dec 2021
 */

public class Paragraph {

	// Attributes

	String style;
	String text;
	// Boolean bold;
	// Boolean ital;
	// Boolean underL;

	// Constructor

	public Paragraph(String style, String text) {

		this.style = style;
		this.text = text;
		// this.bold = bold;
		// this.ital = ital;
	}
	
	// Getters
	
	public String getStyle() {
		return style;
	}
	
	public String getText() {
		return text;
	}

}
