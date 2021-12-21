package com.ProjTeam.Doc2Blog.convert;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

/**
 * ReadFile <br>
 * This interface contains all the methods pertaining to reading doc files and
 * the style data within.
 *
 * @author Warren Bradley
 * @version 1.00, 05 Dec 2021
 */

public interface ReadFile {

	/**
	 *
	 * fileParag Method. <br>
	 * This method is used to extract the raw text from a .doc file and return it as
	 * a list of paragraphs
	 *
	 * @param fileLocation String representing where the method will pull the doc
	 *                     file from.
	 * @return paragraghList A list of XWPFParagraph objects representing the
	 *         various paragraphs in the doc.
	 * 
	 * @since version 1.00
	 */
	private static List<XWPFParagraph> fileParag(String fileLocation) {

		List<XWPFParagraph> paragraphList = null;

		try {
			FileInputStream test = new FileInputStream(fileLocation);

			// this class is used to extract the content
			XWPFDocument docx = new XWPFDocument(test);

			// fetch paragragh using getPragraghText method
			// We get a list of all paragraghs methods of the document
			paragraphList = docx.getParagraphs();
			docx.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return paragraphList;

	}

	/**
	 *
	 * paragStyle Method. <br>
	 * This method is used to identify the style ID of the paragraph. For example
	 * Heading1, Title etc.
	 *
	 * @param paragragh XWPFParagraph object to be assessed.
	 * @return A string stating the style ID of the paragraph
	 * 
	 * @since version 1.00
	 */
	public static String paragStyle(XWPFParagraph paragragh) {

		String style =  String.format("%s", paragragh.getStyle());
		
		if (style.contains("null")) {
			return "p";
		}
		else {		
		return String.format("%s%s", style.toLowerCase().charAt(0),style.charAt(7));
		}
	}

	/**
	 *
	 * typeList Method. <br>
	 * This method is used extract a list text of specific style types within a doc
	 * file. For example all the Heading1 or Title Text.
	 *
	 * @param fileLocation String representing where the method will pull the doc
	 *                     file from.
	 * @param type         String indicating what style type the user is looking
	 *                     for.
	 * @return typeList An string ArrayList containing all the sections of text in
	 *         the doc file of that type.
	 * 
	 * @since version 1.00
	 */

	public static ArrayList<String> typeList(String fileLocation, String type) {

		List<XWPFParagraph> paragraphList = fileParag(fileLocation);
		ArrayList<String> typeList = new ArrayList<String>();

		// Iterate over paragraghList
		for (XWPFParagraph paragraph : paragraphList) {

			if (ReadFile.paragStyle(paragraph).toLowerCase().contains(type.toLowerCase())) {
				typeList.add(paragraph.getText());
			}

		}

		return typeList;

	}

	/**
	 *
	 * textList Method. <br>
	 * This method is used to extract the raw text from a .doc file and return it as
	 * a list of strings in the blocks and order it is found int the doc.
	 *
	 * @param fileLocation String representing where the method will pull the doc
	 *                     file from.
	 * @return txtList A list of string ArrayList containing all the text blocks
	 *         found in the doc file.
	 * 
	 * @since version 1.00
	 */
	public static ArrayList<String> textList(String fileLocation) {

		List<XWPFParagraph> paragraphList = fileParag(fileLocation);
		ArrayList<String> txtList = new ArrayList<String>();

		for (XWPFParagraph paragraph : paragraphList) {
			txtList.add(paragraph.getText());
		}

		return txtList;

	}

	public static void setDocument(Document document, String fileLocation) {

		List<XWPFParagraph> paragraphList = fileParag(fileLocation);

		for (XWPFParagraph paragraph : paragraphList) {

			String style = paragStyle(paragraph);
			String text = paragraph.getText();

			Paragraph para = new Paragraph(style, text);

			document.addPara(para);

		}
	}

}
