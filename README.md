# Job Seeker Web Application

**HOSTED LINK** : [YourHR](https://kudosware-eight.vercel.app/)

This is a MERN stack web application that allows job seekers to create an account, fill out their personal information, and upload their resumes. The application is built with a focus on simplicity, security, and responsiveness.

## Features

- **User Authentication:** Users can sign up if they are new, and log in if they already have an account.
- **Multi-Step Form:** A 5-step process for new users to fill in their personal information.
- **Profile Management:** Users can upload their profile picture and resume, which are stored securely in Firebase Cloud Storage.
- **GitHub Integration:** Users can provide their GitHub profile link, which is used as a hyperlink on their profile page.
- **Data Storage:** User information and resume metadata are stored in MongoDB.

## Technologies Used

- **Frontend:** React.js (with basic responsive design)
- **Backend:** Node.js, Express.js (with microservice architecture)
- **Database:** MongoDB (for storing user information and resume metadata)
- **Cloud Storage:** Firebase Cloud Storage (for storing resumes and profile pictures)

## API Routes

### 1. `/login`
- **Method:** POST
- **Description:** Allows existing users to log in to their account.

### 2. `/signin`
- **Method:** POST
- **Description:** Handles the signup process for new users. It includes a 5-step form to collect personal information.

### 3. `/pfp`
- **Method:** POST
- **Description:** Allows users to upload their profile picture and resume, which are then stored in Firebase Cloud Storage. Metadata about these files is stored in MongoDB.

## Project

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database set up.
- Firebase project set up with Cloud Storage.
### Accessing the Application

- Open your browser and navigate to `http://localhost:3000` to access the application.

## Folder Structure

```plaintext
├── client   
│    |──src # Frontend React.js code
│        |─components 
|        |─pages
├── server                  # Backend Node.js/Express.js code
│   ├── API            # API route handlers
│   └── Schema            # Mongoose models for MongoDB
└── README.md               # Project documentation
```
## Schema for Employee
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    college: String,
    branch: String,
    specialization: String,
    phoneNumber: String,
    githubLink: String,
    resume: String,
    profileImage: String
