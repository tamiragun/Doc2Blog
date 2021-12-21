package com.ProjTeam.Doc2Blog.convert;

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
