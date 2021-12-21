package com.ProjTeam.Doc2Blog.convert;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/convert")
public class ConversionController {

	@ApiOperation(value = "Given a valid filename, displays the corresponding file as HTML.", nickname = "Display converted document")
	@GetMapping
	public String getDoc(@ApiParam(value = "The name of the file - as saved in the file directory but excluding its extension - that you want displayed as HTML.", required = true) String fileName) throws FileNotFoundException {
		
		// pass the path to the file as a parameter
	    File file = new File(String.format("src/main/resources/static/%s.txt", fileName));
	    Scanner sc = new Scanner(file);
	    
	    String doc = "";
	 
	    while (sc.hasNextLine())
	      doc += sc.nextLine();
	    
	    sc.close();
	    
	    return doc;
		
	}

	@ApiOperation(value = "Takes a file in the request body, converts it to HTML, and saves it to the file directory.", nickname = "Upload document to convert")
	@PostMapping
	public void uploadFile(@RequestPart("file") MultipartFile file) {
		/*Return a bad request if the file is null
		 if (null == file.getOriginalFilename()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}*/

		try {
			//Storing the file in a byte array
			byte[] bytes = file.getBytes();
			
			//Setting the path of the file temporarily stored in our memory
			Path path = Paths.get(file.getOriginalFilename());
			Files.write(path, bytes);			
			
			System.out.println(path.getFileName());
			
			//Extracting the document title from the file name
			String title = path.toString().substring(0,path.toString().length()-5);
			
			//Creating the document class object
			Document doc = new Document(title);		
			
			//Setting the document object with the information stored in the uploaded document
			doc.setDoc(path.toString());
			
			try (PrintWriter out = new PrintWriter(String.format("src/main/resources/static/%s.txt", doc.getTitle()) )) {
			    out.println(doc);
			    System.out.println(doc.getTitle());
			    System.out.println("Doc saved");
			}
			
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}

		//return new ResponseEntity<>("File Received", HttpStatus.OK);
	}
	
	
	
	

}
