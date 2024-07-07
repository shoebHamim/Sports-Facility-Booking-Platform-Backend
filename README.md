# Sports Facility Booking System Backend

This project is the backend for a Sports Facility Booking System, designed to manage Users(admin,user),Facilities and Bookings.

## Live URL- 

## Features

- **User Authentication and Authorization**: User and Admin can SingUp and login. JWT token is given upon login for session management. User password is securely stored by hashing before storing in  the database.
- **Data Validation**: It has robust data validation in place using Zod validation and mongoose with proper error message.
- **Facility**: Admin can create,update,delete and see all the facilities.
- **Booking**: User can book a facility for a  specific time. The system will calculate the price for that specific time that the user has to pay and send back a response. User can also see available booking for a specific day, find all their bookings,cancel a booking etc. Admin can find all all the bookings made.


## Technology Used
- **TypeScript**:
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Zod**
- **JWT**

## Getting Started
### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/shoebHamim/Sports-Facility-Booking-Platform-Backend.git
2. Change the directory:
   ```sh
   cd Sports-Facility-Booking-Platform-Backend

3. Install the required packages:
   ```sh
   npm install
4. Add the .env file here,to the root directory
5. Compile the Code [TS->JS]:
   ```sh
   tsc
6. Run the server:
   ```sh
   node dist/server.js


If everything is okay. It will show ```server is up and running on port 5000```.

## API Endpoints
### User Routes
#### 1. User Sign Up

- Route: `POST /api/auth/signup`
- Request Body:
  ```json
  {
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "password": "programming-hero",
    "phone": "01322901105",
    "role": "admin", // or 'user'
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User registered successfully",
    "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4"
    }
  }
  ```

### 2. User Login
- Route: `POST /api/auth/login`
- Request Body:
  ```json
  {
    "email": "web@programming-hero.com",
    "password": "programming-hero"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "JWT_TOKEN",
    "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "Programming Hero",
      "email": "web@programming-hero.com",
      "role": "admin",
      "phone": "01322901105",
      "address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
    }
  }
  ```

### 3. Create a Facility (Admin Only)
- Route: `POST /api/facility`
- Headers:
```Authorization: Bearer JWT_TOKEN```
```json
  {
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield"
  }
```
```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Facility added successfully",
    "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  }
```
### 4. Update a Facility (Admin Only)
- Route: `PUT /api/facility/:id`
- Headers:
```json
  Authorization: Bearer JWT_TOKEN
```
- Request
```json
  {
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield"
  }
```
- Response
```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Facility updated successfully",
    "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Updated Tennis Court",
      "description": "Updated outdoor tennis court with synthetic surface.",
      "pricePerHour": 35,
      "location": "789 Sports Ave, Springfield",
      "isDeleted": false
    }
  }
```
### 5.Delete a Facility - Soft Delete (Admin Only)
- Route: `DELETE /api/facility/:id`
- Headers:
```json
  Authorization: Bearer JWT_TOKEN
```
- Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Updated Tennis Court",
      "description": "Updated outdoor tennis court with synthetic surface.",
      "pricePerHour": 35,
      "location": "789 Sports Ave, Springfield",
      "isDeleted": true
    }
}
```

### 6. Get All Facilities

- Route: `GET /api/facility`
- Response:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
```
## Booking Routes
### 7. Check Availability
Check the availability of time slots for booking on a specific date.

- Route: ```GET /api/check-availability```
- Example Request
```GET /api/check-availability?date=2024-06-15```
- Example Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
      {
          "startTime": "08:00",
          "endTime": "10:00"
      },
      {
          "startTime": "14:00",
          "endTime": "16:00"
      }
   ]
}
```

### 8. Create a Booking (User Only)

- Route: `POST /api/bookings`
- Headers:
```json
  Authorization: Bearer JWT_TOKEN
```
- Request
```json
  {
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00"
  }
```
- Response:
```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Booking created successfully",
    "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  }
```
### 9. View All Bookings (Admin Only)

- Route: `GET /api/bookings`
- Headers:
```json
  Authorization: Bearer JWT_TOKEN
```
- Response:
```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "facility": {
          "_id": "60d9c4e4f3b4b544b8b8d1c5",
          "name": "Tennis Court",
          "description": "Outdoor tennis court with professional-grade surface.",
          "pricePerHour": 30,
          "location": "123 Main Street",
          "isDeleted": false
        },
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "13:00",
        "user": {
          "_id": "60d9c4e4f3b4b544b8b8d1c4",
          "name": "Programming Hero",
          "email": "programming.hero@example.com",
          "phone": "+1234567890",
          "role": "user",
          "address": "456 Elm Street"
        },
        "payableAmount": 90,
        "isBooked": " confirmed"
      }
    ]
  }
```
### 10. View Bookings by User (User Only)

- Route: GET /api/bookings/user
- Headers:
```json
  Authorization: Bearer JWT_TOKEN
```
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```
### 11. Cancel a Booking (User Only)

- Route: DELETE /api/bookings/:id
- Headers:
```json 
  Authorization: Bearer JWT_TOKEN
```
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": "canceled"
    }
}
```


    
    
