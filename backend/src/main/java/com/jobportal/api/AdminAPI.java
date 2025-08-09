package com.jobportal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.AdminService;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminAPI {
    
    @Autowired
    private AdminService adminService;
    
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() throws JobPortalException {
        return new ResponseEntity<>(adminService.getAllUsers(), HttpStatus.OK);
    }
    
    @GetMapping("/users/employers")
    public ResponseEntity<List<UserDTO>> getAllEmployers() throws JobPortalException {
        return new ResponseEntity<>(adminService.getUsersByType("EMPLOYER"), HttpStatus.OK);
    }
    
    @GetMapping("/users/applicants")
    public ResponseEntity<List<UserDTO>> getAllApplicants() throws JobPortalException {
        return new ResponseEntity<>(adminService.getUsersByType("APPLICANT"), HttpStatus.OK);
    }
    
    @PutMapping("/users/{userId}/activate")
    public ResponseEntity<ResponseDTO> activateUser(@PathVariable Long userId) throws JobPortalException {
        adminService.activateUser(userId);
        return new ResponseEntity<>(new ResponseDTO("User activated successfully."), HttpStatus.OK);
    }
    
    @PutMapping("/users/{userId}/deactivate")
    public ResponseEntity<ResponseDTO> deactivateUser(@PathVariable Long userId) throws JobPortalException {
        adminService.deactivateUser(userId);
        return new ResponseEntity<>(new ResponseDTO("User deactivated successfully."), HttpStatus.OK);
    }
    
    @GetMapping("/dashboard/stats")
    public ResponseEntity<ResponseDTO> getDashboardStats() throws JobPortalException {
        return new ResponseEntity<>(adminService.getDashboardStats(), HttpStatus.OK);
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testAdminAccess() {
        return new ResponseEntity<>("Admin access working!", HttpStatus.OK);
    }
}
