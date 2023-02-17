package com.example.yannickusercrud.Controller;

import com.example.yannickusercrud.Entity.User;
import com.example.yannickusercrud.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


//@org.springframework.web.bind.annotation.RestController
@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "*")
public class CrudRestcontoller {


    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello(){
        return "hello";
    }

    @PostMapping("/adduser")
    public User saveDepartment(@Valid @RequestBody User user){
        return userService.addUser(user);
    }


    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteDepById(@PathVariable("id") Long id) throws Exception {
        return userService.deleteDepById(id);
    }

    @PutMapping("/update")
    public User updateDep(@RequestBody User user){
        return userService.updateUser(user);
    }


}
