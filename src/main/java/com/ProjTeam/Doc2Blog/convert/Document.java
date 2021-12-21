package com.ProjTeam.Doc2Blog.convert;

import java.util.ArrayList;

public class Document {

	// Attributes

	ArrayList<Paragraph> paragraphs;
	String title;

	// Constructor

	public Document(String title) {

		this.title = title;
		this.paragraphs = new ArrayList<Paragraph>();
		
	}

	// Setters

	public void setDoc(String fileLocation) {
		ReadFile.setDocument(this, fileLocation);
	}

	// Adders

	public void addPara(Paragraph paragraph) {
		this.paragraphs.add(paragraph);
	}
	
	//Getters
	
	public String getTitle() {
		return this.title;
	}

	// To string
	public String toString() {
		String output = "";

		output += "<!doctype html>\n\n";
		output += "<html lang='en'>\n";
		output += "<head>\n";
		output += " <title>" + this.title + "</title>\n";
		output += "</head>\n\n";
		output += "<body>\n";		

		//Looping through pragraphs
		for (Paragraph paragraph : this.paragraphs) {
			output += "<" + paragraph.getStyle() + ">";
			output += paragraph.getText();
			output += "</" + paragraph.getStyle() + ">" + "\n";
		}
		
		output += "</body>\n";
		output += "</html>";	

		return output;

	}
}