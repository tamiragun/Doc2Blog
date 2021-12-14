package com.ProjTeam.Doc2Blog.SpellCheck;

import java.io.File;
import java.io.IOException;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.languagetool.JLanguageTool;
import org.languagetool.language.BritishEnglish;
import org.languagetool.rules.RuleMatch;


@RestController
@RequestMapping("/check")
public class SpellCheckController {

	@GetMapping
	public String checkDoc(String fileName) throws IOException {

		JLanguageTool langTool = new JLanguageTool(new BritishEnglish());

		// pass the path to the file as a parameter
		File file = new File(String.format("src/main/resources/static/%s.txt", fileName));
		
		Scanner sc = new Scanner(file);

		String doc = "";

		while (sc.hasNextLine())
			doc += sc.nextLine();

		sc.close();
		
		ErrorObject errorCheck = new ErrorObject();

		List<RuleMatch> matches = langTool.check(doc);
		
		for (RuleMatch match : matches) {
			
			//System.out.println("Potential error at characters " + match.getFromPos() + "-" + match.getToPos() + ": "
					//+ match.getMessage());
			//System.out.println("Suggested correction(s): " + match.getSuggestedReplacements());
			
			errorCheck.addError(String.format("%s,%s", match.getFromPos(),match.getToPos()));
		}
		
		String errorDoc = errorCheck.compileErrorDoc(doc);
		
		return errorDoc;
	}

}
