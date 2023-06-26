package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	Id      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name    string             `json:"name,omitempty" bson:"name,omitempty"`
	Email   string             `json:"email,omitempty" bson:"email, omitempty"`
	Gender  string             `json:"gender,omitempty" bson:"gender,omitempty"`
	Country string             `json:"country,omitempty" bson:"country,omitempty"`
}

const (
	DBName         = "yt"
	CollectionName = "users"
	URL            = "mongodb://localhost:27017"
)

var db *mongo.Database

func init() {
	clientOptions := options.Client().ApplyURI(URL)
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	db = client.Database(DBName)
}

func main() {
	r := gin.Default()
	// allow cors
	r.Use(cors.Default())
	// Routes
	r.GET("/api/users", getUsers)
	r.GET("/api/users/:id", getUserById)
	r.POST("/api/users", createUser)
	r.PUT("/api/users/:id", updateUser)
	r.DELETE("/api/users/:id", deleteUser)

	// run server
	r.Run(":8080")
}

func getUsers(c *gin.Context) {
	cursor, err := db.Collection(CollectionName).Find(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	var users []User

	for cursor.Next(context.Background()) {
		var user User
		if err := cursor.Decode(&user); err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}
	cursor.Close(context.Background())
	c.JSON(http.StatusOK, users)
}

func getUserById(c *gin.Context) {
	id := c.Param("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal(err)
	}

	var user User
	err = db.Collection(CollectionName).FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}

	c.JSON(http.StatusOK, user)
}

func createUser(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		log.Fatal(err)
	}
	result, err := db.Collection(CollectionName).InsertOne(context.Background(), user)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, result)
}

func updateUser(c *gin.Context) {
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))

	var user User

	if err := c.BindJSON(&user); err != nil {
		log.Fatal(err)
	}
	update := bson.D{
		{Key: "$set", Value: bson.D{
			{Key: "email", Value: user.Email},
			{Key: "country", Value: user.Country},
		}},
	}

	result, err := db.Collection(CollectionName).UpdateOne(context.Background(), bson.M{"_id": id}, update)

	if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, result)
}

func deleteUser(c *gin.Context) {
	id := c.Param("id")
	objectID, _ := primitive.ObjectIDFromHex(id) // Convert ID to ObjectID
	filter := bson.D{{Key: "_id", Value: objectID}}

	result, err := db.Collection(CollectionName).DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, result)
}
