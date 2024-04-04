package com.example.bugtrackersystem.services;

import com.example.bugtrackersystem.model.User;
import com.example.bugtrackersystem.repositories.MongoDBManager;
import org.bson.Document;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public void save(User user) {
        // Call the insertUser method of MongoDBManager to insert the user into the database
        MongoDBManager.insertUser(user);
    }

    public  User findUserByUsername(String username) {
        // Call the findUserByUsername method of MongoDBManager to find the user in the database
        Document userDocument = MongoDBManager.findUserByUsername(username);
        return userDocument != null ? createUserFromDocument(userDocument) : null;
    }

    public  User findUserByEmail(String email) {
        // Call the findUserByEmail method of MongoDBManager to find the user in the database
        Document userDocument = MongoDBManager.findUserByEmail(email);
        return userDocument != null ? createUserFromDocument(userDocument) : null;
    }
    private  User createUserFromDocument(Document document) {
        // Convert Document object to User object
        User user = new User();
        user.setUsername(document.getString("username"));
        user.setEmail(document.getString("email"));
        user.setPassword(document.getString("password"));
        return user;
    }
}
