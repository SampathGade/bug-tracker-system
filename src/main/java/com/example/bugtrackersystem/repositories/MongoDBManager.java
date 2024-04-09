package com.example.bugtrackersystem.repositories;

import com.example.bugtrackersystem.model.Project;
import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.model.Ticket;
import com.example.bugtrackersystem.model.User;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class MongoDBManager {
    private static final String DATABASE_NAME = "bug_tracker";
    private static final String COLLECTION_NAME_USERS = "users";
    private static final String COLLECTION_NAME_TICKETS = "tickets";
    private static final String COLLECTION_NAME_ROLES = "roles";
    private static final String COLLECTION_NAME_PROJECTS = "projects";
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
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);
        Document userDocument = new Document();
        userDocument.put("username", user.getUsername());
        userDocument.put("email", user.getEmail());
        userDocument.put("password", user.getPassword());
        userDocument.put("projects", new HashSet<>());
        userDocument.put("projectsWorkingOn", new HashSet<>());
        userDocument.put("ticketsWorkingOn", new HashSet<>());
        collection.insertOne(userDocument);
    }


    public static Document findUserByUsername(String username) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);
        Document query = new Document("username", username);
        return collection.find(query).first();
    }

    public static Document findUserByEmail(String email) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);
        Document query = new Document("email", email);
        return collection.find(query).first();
    }

    public static Document findUserById(String userId) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);
        Document query = new Document("_id", userId);
        return collection.find(query).first();
    }

    public static void deleteUser(ObjectId userId) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_USERS);
        Document query = new Document("_id", userId);
        collection.deleteOne(query);
    }

    public static void insertTicket(Ticket ticket) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection("tickets");
        Document ticketDocument = new Document();
        ticketDocument.put("title", ticket.getTitle());
        ticketDocument.put("description", ticket.getDescription());
        ticketDocument.put("projectId", ticket.getProjectId() != null ? ticket.getProjectId() : null);
        ticketDocument.put("typeId", ticket.getType() != null ? ticket.getType().getId() : null);
        ticketDocument.put("priorityId",ticket.getPriority() != null ? ticket.getPriority() : null );
        ticketDocument.put("assignedDeveloperId", ticket.getDeveloper() != null ? ticket.getDeveloper() : null);
        collection.insertOne(ticketDocument);
    }
    public static void updateTicket(Ticket ticket){
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection("tickets");
        System.out.println(ticket);
        ObjectId ticketId = new ObjectId(ticket.getId()); // Convert String ID to ObjectId

        Document updateFields = new Document();
        updateFields.put("title", ticket.getTitle());
        updateFields.put("description", ticket.getDescription());
        updateFields.put("assignedDeveloperId", ticket.getDeveloper() != null ? ticket.getDeveloper() : null);

        Document update = new Document("$set", updateFields);
        UpdateResult result = collection.updateOne(Filters.eq("_id", ticketId), update);

        if(result.getMatchedCount() == 0){
            System.out.println("No ticket found with ID: " + ticket.getId());
        } else if(result.getModifiedCount() == 1){
            System.out.println("Ticket updated successfully.");
        } else {
            System.out.println("Ticket update failed.");
        }
    }


    public static Document findTicketById(String ticketId) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_TICKETS);
        Document query = new Document("title", ticketId);
        return collection.find(query).first();
    }

    public static void insertRole(Role role) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_ROLES);
        Document roleDocument = new Document();
        roleDocument.put("_id", role.getId());
        roleDocument.put("role", role.getRole().name());
        collection.insertOne(roleDocument);
    }

    public static Document findRoleByName(String roleName) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_ROLES);
        Document query = new Document("name", roleName);
        return collection.find(query).first();
    }

    public static void insertProject(Project project) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_PROJECTS);

        Document projectDoc = new Document("name", project.getName())
                .append("code", project.getCode())
                .append("projectManager", project.getProjectManager() != null ? project.getProjectManager() : null)
                .append("developers", project.getDevelopers().stream().map(dev -> dev.getId()).collect(Collectors.toList()))
                .append("tickets", project.getTickets().stream().map(ticket -> ticket.getId()).collect(Collectors.toList()));

        collection.insertOne(projectDoc);
    }
    public static List<Document> getAllProjects() {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection =database.getCollection(COLLECTION_NAME_PROJECTS);
        FindIterable<Document> iterable = collection.find();
        List<Document> projects = new ArrayList<>();
        iterable.into(projects);
        return projects;
    }
    public static List<Document> getAllTickets() {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_TICKETS);
        FindIterable<Document> iterable = collection.find();
        List<Document> tickets = new ArrayList<>();
        iterable.into(tickets);
        return tickets;
    }
    public static Document findprojectByName(String code) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection("projects");
        Document query = new Document("code", code);
        return collection.find(query).first();
    }


    // Add more methods as needed for ticket management
}
