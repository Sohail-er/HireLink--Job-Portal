package com.jobportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.dto.AccountType;
import com.jobportal.entity.User;

public interface UserRepository extends MongoRepository<User, Long>{
	public Optional<User>findByEmail(String email);
	public List<User> findByAccountType(AccountType accountType);
	public long countByAccountType(AccountType accountType);
	public long countByActiveTrue();
}
