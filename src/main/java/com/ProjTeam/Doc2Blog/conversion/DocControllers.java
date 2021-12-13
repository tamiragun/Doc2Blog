package com.ProjTeam.Doc2Blog.conversion;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class DocControllers {
	
	@GetMapping
	public String getDoc(String fileName) throws FileNotFoundException {
		
		// pass the path to the file as a parameter
	    File file = new File(String.format("src/main/resources/static/%s.txt", fileName));
	    Scanner sc = new Scanner(file);
	    
	    String doc = "";
	 
	    while (sc.hasNextLine())
	      doc += sc.nextLine();
	    
	    sc.close();
	    
	    return doc;
		
	}
		
	 @PostMapping
	public ResponseEntity<String> uploadFile(@RequestPart("file") MultipartFile file) {
		//Return a bad request if the file is null
		if (null == file.getOriginalFilename()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		//Set default string to return as error; this should be overridden with the filename if successful
		 String title = "Error";
		try {
			//Storing the file in a byte array
			byte[] bytes = file.getBytes();
			
			//Setting the path of the file temporarily stored in our memory
			Path path = Paths.get(file.getOriginalFilename());
			Files.write(path, bytes);			
			
			System.out.println(path.getFileName());
			
			//Extracting the document title from the file name
			title = path.toString().substring(0,path.toString().length()-5);
			
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
		// Send the doc title along with the body of the response
		return new ResponseEntity<>(title, HttpStatus.OK);
	}
	
	
	
	

}
