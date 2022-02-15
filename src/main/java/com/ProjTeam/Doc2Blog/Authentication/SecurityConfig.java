package com.ProjTeam.Doc2Blog.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsService userDetailService;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService).passwordEncoder(bCryptPasswordEncoder);		
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
				
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.authorizeRequests().antMatchers("/login/**").permitAll();
		http.authorizeRequests().antMatchers("/auth/user/register/**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/blog/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.POST,"/blog/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.PUT,"/blog/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/reminders/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.POST,"/reminders/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.PUT,"/reminders/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/convert/**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.POST,"/convert/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.PUT,"/convert/**").hasAnyAuthority("Role_User");
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/check/**").permitAll();
		//http.authorizeRequests().requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll();
		//http.authorizeRequests().antMatchers("/","/public/", "/resources/","/resources/public/**").permitAll();
		//http.authorizeRequests().anyRequest().authenticated();
		http.authorizeRequests().anyRequest().permitAll();

		http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
		http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean () throws Exception {
		return super.authenticationManagerBean();
	}

}


