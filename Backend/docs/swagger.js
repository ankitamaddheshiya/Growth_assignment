/*-----------> Schemas <--------------*/

/* ---------------------> Authorization Schema <---------------------*/
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
*/


/* ---------------------> Users Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The unique identifier for the user (Created by MongoDB by default).
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - name
 *         - email
 *         - password
 *       example:
 *         name: Growthcx
 *         email: growthcx@gmail.com
 *         password: growthcx
 */

/* ---------------------> Blacklist Token Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     BlacklistToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           unique: true
 *           description: The blacklisted token.
 *       required:
 *         - token
 *       example:
 *         token: "your_blacklisted_token_here"
 */


/* ---------------------> Insight Schema <---------------------*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Insight:
 *       type: object
 *       required:
 *         - url
 *         - wordCount
 *         - user
 *       properties:
 *         url:
 *           type: string
 *           description: URL of the insight
 *         wordCount:
 *           type: number
 *           description: Word count of the insight
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         videos:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of video URLs
 *         weblinks:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of web link URLs
 *         favorite:
 *           type: boolean
 *           description: Indicates if the insight is marked as a favorite
 *         user:
 *           type: string
 *           format: uuid
 *           description: ID of the user associated with the insight
 *       example:
 *         url: "https://example.com"
 *         wordCount: 500
 *         images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         videos: ["https://example.com/video1.mp4"]
 *         weblinks: ["https://example.com/link1", "https://example.com/link2"]
 *         favorite: false
 *         user: "60c18ac714dc1e0015a61d43" 
 */







/* ---------------------> Routes <---------------------*/

/* ---------------------> Home Routes <---------------------*/
/**
 * @swagger
 * paths:
 *   /:
 *     get:
 *       summary: Welcome message
 *       description: Returns a welcome message for the Growth.cx word count app backend.
 *       tags: [Home]
 *       responses:
 *         200:
 *           description: Welcome message retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   message:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   message: Welcome to Growth.cx word count app backend.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   error:
 *                     type: string
 *                 example:
 *                   ok: false
 *                   error: Internal server error.
 */


/* ---------------------> Users Routes <---------------------*/

// Register
/**
 * @swagger
 * paths:
 *   /user/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: User Registration Successful
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 *         400:
 *           description: Bad Request. User already exist.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: User already exist
 */



// Login
/**
 * @swagger
 * paths:
 *   /user/login:
 *     post:
 *       summary: Authenticate and log in an existing user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 password:
 *                   type: string
 *                   description: The password of the user.
 *               required:
 *                 - email
 *                 - password
 *               example:
 *                 email: growthcx@gmail.com
 *                 password: growthcx
 *       responses:
 *         200:
 *           description: Login Successful. Returns an access token.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                   msg:
 *                     type: string
 *                   token:
 *                     type: string
 *                 example:
 *                   ok: true
 *                   msg: Login Successful
 *                   token: your-access-token-here
 *                   user: user-details-here
 *         400:
 *           description: Bad Request. User does not exist or incorrect password.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: User does not exist or incorrect password.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


//Logout

/**
 * @swagger
 * paths:
 *   /user/logout:
 *     post:
 *       summary: Log out an existing user
 *       tags: [Users]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Logout successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   ok:
 *                     type: boolean
 *                     description: Indicates if the logout was successful.
 *                     example: true
 *                   msg:
 *                     type: string
 *                     description: Logout success message.
 *                     example: Logout successful
 *         '501':
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */



/* ---------------------> Insight Routes <---------------------*/

/**
 * @swagger
 * paths:
 *   /insight:
 *     post:
 *       summary: Retrieve word count and media details from a URL and save in database as an insight
 *       tags: [Insights]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The URL for which insights need to be extracted.
 *               required:
 *                 - url
 *               example:
 *                 url: "https://example.com"
 *       responses:
 *         200:
 *           description: Word count and media details retrieved successfully and insight saved.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   wordCount:
 *                     type: number
 *                     description: Number of words in the content of the URL.
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of image URLs from the URL content.
 *                   videos:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of video URLs from the URL content.
 *                   weblinks:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of web link URLs from the URL content.
 *                 example:
 *                   wordCount: 500
 *                   images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                   videos: ["https://example.com/video1.mp4"]
 *                   weblinks: ["https://example.com/link1", "https://example.com/link2"]
 *         400:
 *           description: Bad Request. Failed to retrieve insights from the provided URL.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Error occurred while retrieving insights from the provided URL.
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */



/**
 * @swagger
 * paths:
 *   /insight/getallinsight:
 *     get:
 *       summary: Get all insights for a specific user with optional filtering by favorite status(if we not pass any query then we got all insights.).
 *       tags: [Insights]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: query
 *           name: favorite
 *           schema:
 *             type: boolean
 *           required: false
 *           description: Filter insights by favorite status (true/false).
 *       responses:
 *         200:
 *           description: Returns all insights for the authenticated user with optional filtering by favorite status.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Insight'
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                   error:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */





/**
 * @swagger
 * paths:
 *   /insight/addtofav/{insightId}:
 *     patch:
 *       summary: Add an insight to favorites
 *       tags: [Insights]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: insightId
 *           required: true
 *           description: The ID of the insight to add to favorites.
 *           schema:
 *             type: string
 *           example: 6172a08e9be192001f97e65d
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorite:
 *                   type: boolean
 *                   description: Boolean value to set whether the insight is a favorite or not.
 *               required:
 *                 - favorite
 *               example:
 *                 favorite: true
 *       responses:
 *         200:
 *           description: Insight added to favorites successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Details Updated
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */


/**
 * @swagger
 * paths:
 *   /insight/delete/{insightId}:
 *     delete:
 *       summary: Delete an insight by ID
 *       tags: [Insights]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: insightId
 *           required: true
 *           description: The ID of the insight to delete.
 *           schema:
 *             type: string
 *           example: 6172a08e9be192001f97e65d
 *       responses:
 *         200:
 *           description: Insight deleted successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Insight Deleted Sucessfully
 *         501:
 *           description: Internal Server Error. Please contact the administrator.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                 example:
 *                   msg: Internal Server error
 */
