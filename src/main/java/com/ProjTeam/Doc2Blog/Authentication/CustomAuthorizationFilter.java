package com.ProjTeam.Doc2Blog.Authentication;
import static com.ProjTeam.Doc2Blog.Doc2BlogWebAppApplication.tokenHolder;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

public class CustomAuthorizationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Checking if it is the login path or register path
		if (request.getServletPath().equals("/login") || request.getServletPath().equals("/auth/user/register") ) {
			filterChain.doFilter(request, response);
		} else {

			String authorizationHeader = request.getHeader(AUTHORIZATION);

			// Token must be passed with "Bearer " infront of it
			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				String token = authorizationHeader.substring("Bearer ".length());

				// Decoding the JWT
				try {
					// This is redundant. Remove redundancy in future
					Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());					
				
					JWTVerifier verifier = JWT.require(algorithm).build();
					DecodedJWT decodedJWT = verifier.verify(token);
					String username = decodedJWT.getSubject();
					String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
					Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
					
					tokenHolder.setUsername(username);
					
					for (String role : roles) {
						authorities.add(new SimpleGrantedAuthority(role));
					}

					// Credentials is null is because password has already been given
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
							username, null, authorities);
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					filterChain.doFilter(request, response);

				} catch (Exception exception) {

					// Responding with the error message
					response.setHeader("error", exception.getMessage());
					response.setStatus(FORBIDDEN.value());
					Map<String, String> error = new HashMap<>();
					error.put("error_message", exception.getMessage());

					response.setContentType(MediaType.APPLICATION_JSON_VALUE);
					new ObjectMapper().writeValue(response.getOutputStream(), error);

				}

			} else {
				filterChain.doFilter(request, response);
			}
		}

	}

}
