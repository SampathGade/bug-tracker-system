package com.example.bugtrackersystem.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests().antMatchers("/**").permitAll() // Permit all requests without any authentication
                .and()
                .csrf().disable() // Disable CSRF protection as it is not needed
                .headers().frameOptions().disable(); // Disable frame options if you are using frames (e.g., H2 console)
    }
}

