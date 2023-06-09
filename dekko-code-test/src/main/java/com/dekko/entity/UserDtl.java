package com.dekko.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * @Author Abdul Alim
 * @Since 6/7/2023
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserDtl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String address;
    private Date dateOfBirth;
    private String userId;
    private String password;
    private String type;

    private Boolean accountNonLocked = true;
    private Integer failedAttempt = 0;
    private Date lockTime;

    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }
}
