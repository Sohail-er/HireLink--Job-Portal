package com.jobportal.service;

import java.util.List;

import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.exception.JobPortalException;

public interface AdminService {
    
    List<UserDTO> getAllUsers() throws JobPortalException;
    
    List<UserDTO> getUsersByType(String accountType) throws JobPortalException;
    
    void activateUser(Long userId) throws JobPortalException;
    
    void deactivateUser(Long userId) throws JobPortalException;
    
    ResponseDTO getDashboardStats() throws JobPortalException;
}
