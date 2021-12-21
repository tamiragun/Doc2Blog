package com.ProjTeam.Doc2Blog.spellCheck;

import java.io.File;
import java.io.IOException;
import java.util.*;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.languagetool.JLanguageTool;
import org.languagetool.language.BritishEnglish;
import org.languagetool.rules.RuleMatch;


@RestController
@RequestMapping("/check")
public class SpellCheckController {

	@ApiOperation(value = "Given a valid filename, displays the corresponding file with any spelling or grammar mistakes highlighted.", nickname = "Display spell checked document")
	@GetMapping
	public String checkDoc(@ApiParam(value = "The name of the file - as saved in the file directory but excluding its extension - that you want spell checked.", required = true) String fileName) throws IOException {

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
