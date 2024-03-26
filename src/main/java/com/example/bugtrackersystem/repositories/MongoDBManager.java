package com.example.bugtrackersystem.repositories;

import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.HashSet;
import java.util.Set;

public class MongoDBManager {
    private static final String DATABASE_NAME = "bug_tracker";
    private static final String COLLECTION_NAME_USERS = "users";
    private static final String COLLECTION_NAME_TICKETS = "tickets";
    private static final String COLLECTION_NAME_ROLES = "roles";
    private static MongoClient mongoClient;

    static {
        // Establish MongoDB connection
        String connectionString = "mongodb://localhost:27017";
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .build();
        mongoClient = MongoClients.create(settings);
    }

    public static void insertUser(User user) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);

        // Convert User object to Document
        Document userDocument = new Document();
        userDocument.put("username", user.getUsername());
        userDocument.put("email", user.getEmail());
        userDocument.put("password", user.getPassword());


        // Convert empty sets for projects and tickets
        userDocument.put("projects", new HashSet<>());
        userDocument.put("projectsWorkingOn", new HashSet<>());
        userDocument.put("ticketsWorkingOn", new HashSet<>());

        // Insert the document into the collection
        collection.insertOne(userDocument);
    }


    public static Document findUserByUsername(String username) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);

        // Create a query document
        Document query = new Document("username", username);

        // Execute the query
        return collection.find(query).first();
    }

    public static Document findUserByEmail(String email) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);

        // Create a query document
        Document query = new Document("email", email);

        // Execute the query
        return collection.find(query).first();
    }

    public static Document findUserById(String userId) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);

        // Create a query document
        Document query = new Document("_id", userId);

        // Execute the query
        return collection.find(query).first();
    }

    public static void deleteUser(ObjectId userId) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);

        // Create a query document
        Document query = new Document("_id", userId);

        // Delete the document from the collection
        collection.deleteOne(query);
    }

    public static void insertTicket(Ticket ticket) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_TICKETS);

        // Convert Ticket object to Document
        Document ticketDocument = new Document();
        ticketDocument.put("title", ticket.getTitle());
        ticketDocument.put("description", ticket.getDescription());
        // Add more fields as needed

        // Insert the document into the collection
        collection.insertOne(ticketDocument);
    }

    public static Document findTicketById(String ticketId) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_TICKETS);

        // Create a query document
        Document query = new Document("_id", ticketId);

        // Execute the query
        return collection.find(query).first();
    }

    public static void insertRole(Role role) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_ROLES);

        // Convert Role object to Document
        Document roleDocument = new Document();
        roleDocument.put("_id", role.getId()); // Assuming id is the unique identifier for Role
        roleDocument.put("role", role.getRole().name()); // Assuming role is an enum and you want to store its name

        // Insert the document into the collection
        collection.insertOne(roleDocument);
    }

    public static Document findRoleByName(String roleName) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_ROLES);

        // Create a query document
        Document query = new Document("name", roleName);

        // Execute the query
        return collection.find(query).first();
    }

    // Add more methods as needed for ticket management
}
