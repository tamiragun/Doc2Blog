package com.ProjTeam.Doc2Blog.spellCheck;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Errors <br>
 * This class is used to track the position of the errors in the user doc and
 * then compile it to display where the errors are
 *
 * @author Warren Bradley
 * @version 1.00, 13 Dec 2021
 */

public class ErrorObject {

	// Attributes

	ArrayList<String> foundErrorPositions;

	public ErrorObject() {
		this.foundErrorPositions = new ArrayList<String>();
	}

	// Adders

	public void addError(String error) {
		foundErrorPositions.add(error);
	}

	/**
	 *
	 * compileErrorDoc Method. <br>
	 * This method is used to create the document with the errors highlighted.
	 *
	 * @param doc String representing the document submitted by the user.
	 * @return errorDoc String with html code of the doc with the errors changed.
	 * 
	 * @since version 1.00
	 */

	public String compileErrorDoc(String doc) {
		if (foundErrorPositions.size() == 0) {
			return doc;
		}

		String errorDoc = "";
		int curPos = 0;

		for (String error : foundErrorPositions) {

			List<String> errorPos = Arrays.asList(error.split(","));

			int errStart = Integer.valueOf(errorPos.get(0));
			int errEnd = Integer.valueOf(errorPos.get(1));

			errorDoc += doc.substring(curPos, errStart);
			errorDoc += "<mark>";
			errorDoc += doc.substring(errStart, errEnd);
			errorDoc += "</mark>";

			curPos = errEnd;
		}

		if (curPos < doc.length()) {
			errorDoc += doc.substring(curPos, doc.length());
		}

		return errorDoc;
	}

}
