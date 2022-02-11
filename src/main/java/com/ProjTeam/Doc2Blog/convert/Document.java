package com.ProjTeam.Doc2Blog.convert;

import java.util.ArrayList;


/**
 * Document <br>
 * This class manages the attributes of the full document and produces the document html format for the site
 *
 * @author Warren Bradley
 * @version 1.00, 05 Dec 2021
 */
public class Document {

	// Attributes

	ArrayList<Paragraph> paragraphs;
	String title;
	String style;

	// Constructor

	public Document(String title, String style) {

		this.title = title;
		this.style = style;
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
	public String getStyle() {
		return this.style;
	}

	// To string
	public String toString() {
		String output = "";

		output += "<!doctype html>\n\n";
		output += "<html lang='en'>\n";
		output += "<head>\n";
		output += " <title>" + this.title + "</title>\n";
		output += " <meta name=\"description\" content=\"Blog post published on Doc2Blog\">\n";
		if (this.style.equals("boldx")) {
			output += " <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" crossorigin=\"anonymous\">\n";
		} else if (this.style.equals("sleek")) {
			output += " <link href=\"./sleek-stylesheet.css\" rel=\"stylesheet\">\n";
		}
		output += "</head>\n\n";
		output += "<body>\n";		

		//Looping through paragraphs
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