package com.dekko.service;

import com.dekko.entity.UserDtl;
import com.dekko.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @Author Abdul Alim
 * @Since 6/8/2023
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) {

        UserDtl user = repository.findByEmail(email).orElseThrow(
                ()-> new RuntimeException("User not found with email: "+email));

        return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

}
