package com.example.yannickusercrud.Service;

import com.example.yannickusercrud.Entity.User;

import java.util.List;

public interface UserService {

    public List<User> getAllUsers();
    public User addUser(User user);
    public String deleteDepById(Long id) throws Exception;
    public User updateUser(User user);

}
