package routes

import (
	"net/http"
	controllers "web-service-gin/Controllers"

	"github.com/gin-gonic/gin"
)

/* the only point where we interact with our http server is
routes this is the only place where we intialise and use our server
so incase if we decide to change the server we have to do changes here
only */

func StartRoutes(){
	
	router := gin.Default()
	router.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        c.Writer.Header().Set("Access-Control-Max-Age", "86400")
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }
        c.Next()
    })
	api := router.Group("/api")
	{
			 api.POST("/todo", controllers.Create)
			 api.GET("/incomplete",controllers.GetIncomplete)
			 api.GET("/complete",controllers.GetComplete)
			 api.GET("/todos",controllers.GetAll)
			 api.GET("/deletedtodos",controllers.GetDeleted)
			 api.GET("/todos/search/:keyword",controllers.SearchTodo)
			 api.GET("/todo/:todo_id", controllers.Get)
			 api.PUT("/todo/:todo_id", controllers.Update)
			 api.PATCH("/todo/:todo_id",controllers.SoftDelete)
			 api.PATCH("/restore/:todo_id",controllers.RestoreTodo) 
			 api.DELETE("/todo/:todo_id", controllers.Delete)
	}
	router.NoRoute(func(c *gin.Context) {
		   c.AbortWithStatus(http.StatusNotFound)
	})
	router.Run(":8080")

}