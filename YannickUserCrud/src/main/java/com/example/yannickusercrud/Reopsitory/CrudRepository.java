package com.example.yannickusercrud.Reopsitory;

import com.example.yannickusercrud.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CrudRepository extends JpaRepository<User, Long> {

}
