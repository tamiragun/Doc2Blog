package com.ProjTeam.Doc2Blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class Doc2BlogWebAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(Doc2BlogWebAppApplication.class, args);
	}

}
