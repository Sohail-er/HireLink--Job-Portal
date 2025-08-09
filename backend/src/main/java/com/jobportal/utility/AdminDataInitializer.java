package com.jobportal.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.jobportal.dto.AccountType;
import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user already exists
        if (!userRepository.findByEmail("admin@hirelink.com").isPresent()) {
            User adminUser = new User();
            adminUser.setId(Utilities.getNextSequenceId("users"));
            adminUser.setName("Admin User");
            adminUser.setEmail("admin@hirelink.com");
            adminUser.setPassword(passwordEncoder.encode("Admin@123"));
            adminUser.setAccountType(AccountType.ADMIN);
            adminUser.setActive(true);
            
            userRepository.save(adminUser);
            System.out.println("Admin user created successfully!");
            System.out.println("Email: admin@hirelink.com");
            System.out.println("Password: Admin@123");
            System.out.println("Admin user ID: " + adminUser.getId());
            System.out.println("Admin account type: " + adminUser.getAccountType());
        } else {
            System.out.println("Admin user already exists!");
        }
    }
}
