<h1 align="center">A simplified Jira clone built with React and Java</h1>

<div align="center">Styled with Material-UI:, tested with Junit and Mockito </div>

## Features

1. **Login Page**
    - **Frontend:**
        - **Email Field:** Validates email format to ensure correct input.
        - **Password Field:** Ensures the field is not empty.
        - **Submit Button:** Enabled only when both email and password fields are correctly filled and validated. Submits a backend API call for credentials validation.
        - **OTP Field:** Accepts numeric input for One-Time Password validation.
        - **Submit Button for OTP:** Activated upon OTP field completion to verify the user's login attempt. Submits a backend API call for OTP validation.
        - **Forgot Password Button:** Routes users to the forgot password page for password reset.
        - **Sign-Up Button:** Routes users to the sign-up page for submitting an onboarding request to the Admin.
        - **Session Management:** Records the user IP to enable OTP-less login functionality for up to 24 hours.
    - **Backend:**
        - **Credential Validation:** Checks credentials via a database, validates sessions, and generates and validates OTPs.

2. **Forgot Password Page**
    - **Frontend:**
        - **Email Field:** Validates email format for sending the recovery OTP.
        - **OTP Field:** Accepts numeric input for user identity validation.
        - **Submit OTP Button:** Activates only when the OTP field is filled.
        - **Password and Confirm Password Fields:** Ensures both fields match, providing warnings if they do not.
    - **Backend:**
        - **Validation and Storage:** Validates credentials via a database, generates and validates OTPs, and securely stores the new password.

3. **Sign-Up Page**
    - **Frontend:**
        - **Email Address Field:** Includes real-time validation for correct email format.
        - **OTP Field:** Prompts the user to enter a numeric OTP sent to their email.
        - **Password Fields:** Ensures real-time validation for matching passwords.
        - **Role Selection Dropdown:** Allows users to specify their role within the system.
        - **Submit Button:** Activates only when all fields are correctly filled.
    - **Backend:**
        - **User Validation and Storage:** Checks if the user already exists, generates and validates OTPs, and securely stores new user details.

4. **Dashboard Component**
    - **Frontend:** Ensures access only after valid login, with a persistent navigation bar for quick functionality access.
    - **Backend:** Handles logout requests by invalidating session tokens, ensuring security.

5. **Bug Tracking Component**
    - **Frontend:** Displays and interacts with bugs based on user roles, including a smart assignment interface.
    - **Backend:** Manages bug retrieval and assignment through algorithmic logic based on user roles and permissions.

6. **Onboarding Component**
    - **Frontend:** Manages and reviews new user signup requests.
    - **Backend:** Handles approvals and secure storage of user data.

7. **Personnel Management Component**
    - **Frontend:** Provides a listing of personnel associated with projects, restricted to Admins and Project Managers.
    - **Backend:** Ensures personnel data is accessible only to authorized roles.

8. **Project Management Component**
    - **Frontend:** Includes comprehensive tools for task assignments and progress tracking.
    - **Backend:** Manages project-related data, ensuring consistency and security.

9. **Sprint Management Component**
    - **Frontend:** Displays current sprint metrics with the option to close the current sprint.
    - **Backend:** Generates developer and overall sprint metrics.

## Setting up development environment 🛠

-> Install Mongo DB and Java 11

-> Mongo with data base Bug-Tracker containing 4 collections bugDetails , projectDetails , userDetails and
sprintManager.

-> The userDetails collection should have a default admin user with status onboarded.

{"Email" : "admin@gmail.com" ,"Password" : "test" (this password can be encrypted via forgot password after wards)
"Role" : "admin","Status" : "Onboarded"}

->Backend Spring Boot application up and running to achieve this navigate to th path <rootproject>
/src/main/java/com.example.bugTrackerSystem/BugTrackerSystemApplication and run the application.

->Navigate to <rootproject>/frontend/ and run npm install, this will install all the dependencies listed in the
package.json

->In the same path run npm start, this should start the web application on the port 3000

## What's missing?

-> Dockerization

### Unit/Integration tests 🧪

- Open terminal and run - mvn clean test
- mvn jacoco:report should also generate index.html for coverage

## Contributing

No contributions will be accepted as of now

## License

[MIT](https://opensource.org/licenses/MIT)

