# Backend Application

## Setup and Run Instructions

### Prerequisites
- Node.js 
- npm 

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ssacharya2002/Google-Form-Windows-Desktop-App-Backend
   cd Google-Form-Windows-Desktop-App-Backend
   ```


2. **Install dependencies::**

    ```bash
    npm install
    ```
### Configuration

1. **Database File Setup:**
   The `db.json` file will be automatically created in the dist directory when you run the application for the first time. This file is used to store submissions data.

### Build and Run
1. **Build the TypeScript files:**
    ```bash
    npm run start
    ```
2. **Accessing the API:**

 Once the server is running, you can access the API endpoints:

* GET /ping: Checks if the server is running.
  
* POST /submit: Submits data to the database (db.json).
  
* GET /read?index={index}: Retrieves a submission by index from the database.
  
* DELETE /delete?index={index}: Deletes a submission from the database.
  
* PUT /edit?index={index}: Updates a submission in the database.
  
* GET /search?email={email}: Searches for a submission by email in the database.