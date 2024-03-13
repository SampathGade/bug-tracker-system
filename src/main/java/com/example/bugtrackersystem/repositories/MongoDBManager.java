package com.example.bugtrackersystem.repositories;



import com.example.bugtrackersystem.model.Role;
import com.example.bugtrackersystem.requests.ProjectAddRequest;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.example.bugtrackersystem.model.User;
import org.bson.Document;

public class MongoDBManager {
    private static final String DATABASE_NAME = "bug_tracker";
    private static final String COLLECTION_NAME = "users";
    private static final String COLLECTION_NAME_ROLES = "roles";

    private static final String COLLECTION_NAME_PROJECTS = "projects";

    private static final MongoClient mongoClient;

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
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);

        // Convert User object to Document
        Document userDocument = new Document();
        userDocument.put("username", user.getUsername());
        userDocument.put("email", user.getEmail());
        userDocument.put("password",user.getPassword());
        collection.insertOne(userDocument);
    }

    public static Document findUserByUsername(String username) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);

        // Create a query document
        Document query = new Document("username", username);
        System.out.println(collection.find(query).first());
        // Execute the query
        return collection.find(query).first();
    }

    public static Document findUserByEmail(String email) {
        // Get reference to the database
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);

        // Get reference to the collection
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);

        // Create a query document
        Document query = new Document("email", email);

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
        roleDocument.put("name", role.getName());
        // Add more fields as needed

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

    public static void insertProject(ProjectAddRequest projectAddRequest) {
        MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
        MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME_PROJECTS);

        Document projectDocument = new Document();
        projectDocument.put("name", projectAddRequest.getName());
        collection.insertOne(projectDocument);
    }
}
