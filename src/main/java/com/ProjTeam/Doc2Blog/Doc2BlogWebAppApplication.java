package com.ProjTeam.Doc2Blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ProjTeam.Doc2Blog.Authentication.TokenHolder;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class Doc2BlogWebAppApplication {


	public static void main(String[] args) {
		SpringApplication.run(Doc2BlogWebAppApplication.class, args);
		
	}
	
	

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Autowired
	public static TokenHolder tokenHolder = new TokenHolder();

}
