package com.example.yannickusercrud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


//@EntityScan("Entity")
//@ComponentScan(basePackageClasses = {CrudRestcontoller.class, CrudRepository.class, UserService.class})
@SpringBootApplication

public class YannickUserCrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(YannickUserCrudApplication.class, args);
    }
    ;
}


