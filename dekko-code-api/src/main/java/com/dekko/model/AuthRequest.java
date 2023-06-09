package com.dekko.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author Abdul Alim
 * @Since 6/8/2023
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    private static final long serialVersionUID = 5926468583005150707L;

    private String email;
    private String password;

}
