# API Documentation

## Welcome Route

| Route           | Endpoint | Description                            | Features          |
| --------------- | -------- | -------------------------------------- | ----------------- |
| Welcome Message | GET /    | Provides a welcome message to the API. | - Welcome message |

## Swagger Docs

| Route             | Endpoint      | Description                       | Features          |
| ----------------- | ------------- | --------------------------------- | ----------------- |
| Api Documentation | GET /api-docs | Provides a Documentation for API. | - Welcome message |

## Users

| Route           | Endpoint                       | Description                                                                                              | Features                               |
| --------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Register User   | POST /user/register            | Register a new user with provided credentials.                                                           | - User registration                    |
| Login User      | POST /user/login               | Authenticate and log in a user with JWT token.                                                           | - User login with JWT token            |
| Logout User     | POST /user/logout              | Blacklist the token to log out the user securely.(user Must Logged in)                                   | - Secure token blacklisting            |
 

## Insights

| Route                    | Endpoint                           | Description                                                                         | Features                                   |
| ------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| Add New Insight          | POST /insight/                     | Add a new insight to database and retrive data. (user Must Logged in)               | - Insight creation                         |
| Get All Insights         | GET  /insight/getallinsight        | User can get all his insight and also do optional filtering. (user Must Logged in)  | - Get all Insight(Also do optional fliter) |
| Add to Favorite          | PATCH /insight/addtofav/:insightId | Add insight into favorite. (user Must Logged in)                                    | - Add and Remove insight from favorites    |
| Delete Existing Insight  | DELETE /insight/delete/:insightId  | Delete details of already existing insight. (user Must Logged in)                   | - Delete already exists insight            |



```javascript
app.get("/",async(req,res)=>{
     try {
        res.status(200).send({ok:true,msg:"Welcome to Growth.cx word count app backend."})
    } catch (error) {
        console.log("error in '/' route");
        res.status(501).send({ msg: "Internal Server error", error: error.message });
    }
});
```