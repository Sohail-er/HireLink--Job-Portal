package com.jobportal.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.UserRepository;

@Service("adminService")
public class AdminServiceImpl implements AdminService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public List<UserDTO> getAllUsers() throws JobPortalException {
        try {
            List<User> users = userRepository.findAll();
            return users.stream()
                    .map(user -> {
                        UserDTO dto = user.toDTO();
                        dto.setPassword(null); // Don't send password
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new JobPortalException("Failed to fetch users: " + e.getMessage());
        }
    }
    
    @Override
    public List<UserDTO> getUsersByType(String accountType) throws JobPortalException {
        try {
            AccountType type = AccountType.valueOf(accountType);
            List<User> users = userRepository.findByAccountType(type);
            return users.stream()
                    .map(user -> {
                        UserDTO dto = user.toDTO();
                        dto.setPassword(null); // Don't send password
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new JobPortalException("Failed to fetch users by type: " + e.getMessage());
        }
    }
    
    @Override
    public void activateUser(Long userId) throws JobPortalException {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new JobPortalException("User not found"));
            user.setActive(true);
            userRepository.save(user);
        } catch (JobPortalException e) {
            throw e;
        } catch (Exception e) {
            throw new JobPortalException("Failed to activate user: " + e.getMessage());
        }
    }
    
    @Override
    public void deactivateUser(Long userId) throws JobPortalException {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new JobPortalException("User not found"));
            user.setActive(false);
            userRepository.save(user);
        } catch (JobPortalException e) {
            throw e;
        } catch (Exception e) {
            throw new JobPortalException("Failed to deactivate user: " + e.getMessage());
        }
    }
    
    @Override
    public ResponseDTO getDashboardStats() throws JobPortalException {
        try {
            long totalUsers = userRepository.count();
            long totalEmployers = userRepository.countByAccountType(AccountType.EMPLOYER);
            long totalApplicants = userRepository.countByAccountType(AccountType.APPLICANT);
            long activeUsers = userRepository.countByActiveTrue();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalUsers", totalUsers);
            stats.put("totalEmployers", totalEmployers);
            stats.put("totalApplicants", totalApplicants);
            stats.put("activeUsers", activeUsers);
            
            return new ResponseDTO("Dashboard stats retrieved successfully", stats);
        } catch (Exception e) {
            throw new JobPortalException("Failed to get dashboard stats: " + e.getMessage());
        }
    }
}
