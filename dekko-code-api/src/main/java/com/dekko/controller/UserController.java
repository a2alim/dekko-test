package com.dekko.controller;

import com.dekko.entity.UserDtl;
import com.dekko.model.UserRequest;
import com.dekko.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author Abdul Alim
 * @Since 6/7/2023
 */
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDtl> create(@RequestBody UserRequest user){
        UserDtl savedUser = userService.create(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserDtl>> getAll(){
        List<UserDtl> userList = userService.getAll();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDtl> get(@PathVariable Long id){
        UserDtl foundUser = userService.get(id);
        return new ResponseEntity<>(foundUser, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UserDtl> update(@RequestBody UserRequest payload){
        UserDtl savedUser = userService.update(payload);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserDtl> delete(@PathVariable Long id){
        UserDtl deletedUser = userService.delete(id);
        return new ResponseEntity<>(deletedUser, HttpStatus.OK);
    }

}
