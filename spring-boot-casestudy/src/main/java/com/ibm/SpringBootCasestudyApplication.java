package com.ibm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.ibm"})
public class SpringBootCasestudyApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootCasestudyApplication.class, args);
    }
}