package com.jobportal.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.exception.JobPortalException;
import com.jobportal.jwt.AuthenticationRequest;
import com.jobportal.jwt.AuthenticationResponse;
import com.jobportal.jwt.JwtHelper;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthAPI {
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtHelper jwtHelper;
	
	@PostMapping("/login")
	public ResponseEntity<?>createAuthenticationToken(@RequestBody AuthenticationRequest request) throws JobPortalException{
		try {
            // First check if user exists and is active
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            
            // If we reach here, user is active, now authenticate credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            final String jwt = jwtHelper.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
            
        } catch (UsernameNotFoundException e) {
            // This will catch USER_DEACTIVATED exception from MyUserDetailsService
            if (e.getMessage() != null && e.getMessage().contains("USER_DEACTIVATED")) {
                throw new JobPortalException("USER_DEACTIVATED");
            }
            throw new JobPortalException("USER_NOT_FOUND");
        } catch (AuthenticationException e) {
            throw new JobPortalException("INVALID_CREDENTIALS");
        }
	}
}
