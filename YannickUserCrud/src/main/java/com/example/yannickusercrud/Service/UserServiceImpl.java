package com.example.yannickusercrud.Service;


import com.example.yannickusercrud.Entity.User;
import com.example.yannickusercrud.Reopsitory.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    CrudRepository crudRepository;

    @Override
    public List<User> getAllUsers() {
        return crudRepository.findAll();
    }

    @Override
    public User addUser(User user) {
        return crudRepository.save(user);
    }

    @Override
    public String deleteDepById(Long id) throws Exception {
        Optional<User> depToDelete = crudRepository.findById(id);
        if(!depToDelete.isPresent()) throw new Exception("User not found");
        crudRepository.deleteById(id);
        return "Deleted :)";
    }

    @Override
    public User updateUser(User user) {
        Optional<User> userToUpdate=crudRepository.findById(user.getUserId());
        //we can add some verification here
        userToUpdate.get().setUserId(user.getUserId());
        userToUpdate.get().setFirstname(user.getFirstname());
        userToUpdate.get().setLastname(user.getLastname());
        userToUpdate.get().setAge(user.getAge());
        userToUpdate.get().setProfession(user.getProfession());
        userToUpdate.get().setUsername(user.getUsername());
        return crudRepository.save(userToUpdate.get());
    }
}
