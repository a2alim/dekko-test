package com.dekko.model;

import lombok.Data;

import java.util.Date;

/**
 * @Author Abdul Alim
 * @Since 6/7/2023
 */
@Data
public class UserRequest {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String address;
    private Date dateOfBirth;
    private String userId;
    private String password;
}
