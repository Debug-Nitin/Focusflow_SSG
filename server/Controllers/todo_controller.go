package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	models "web-service-gin/Models"
	services "web-service-gin/Services"
	errors "web-service-gin/Utils/Errors"

	"github.com/gin-gonic/gin"
)

/* every request we need to handle is handled by our controllers
this is the entry point of our application/routes */

/* the main responsibility of the controlleer is to take the request, validate
that we have all the parameters to handle this request and send this handling to
the service. ##our entire business logic is in service
*/

/* since we are using todo id mutltiple times */
func getTodoId(todoIdParam string)(int64, *errors.RestErr){
	todoId, todoErr := strconv.ParseInt(todoIdParam,10,64)
	if todoErr !=nil {
		return 0, errors.NewBadRequestError("todo id should be a number")
	}
	return todoId,nil
}



func Create(c *gin.Context){
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err !=nil{
		restErr := errors.NewBadRequestError("invalid json body")
		c.JSON(restErr.Status,restErr)
		return
	}

	result, saveErr := services.CreateTodo(todo)
	if saveErr != nil{
		c.JSON(saveErr.Status,saveErr)
		// handle todo creationn error
		return
	}
	c.JSON(http.StatusCreated,result)
}



func Get(c *gin.Context){
	/* sortFilter := c.Query("sort")
	if sortFilter == ""{

	} */

	todoId, idErr := getTodoId(c.Param("todo_id"))
	if idErr !=nil {
		c.JSON(idErr.Status,idErr)
		return
	}
	todo, getErr := services.GetTodo(todoId)
	if getErr != nil {
		c.JSON(getErr.Status,getErr)
	}
	c.JSON(http.StatusOK, todo)
}

func Update(c *gin.Context){
	todoId, idErr := getTodoId(c.Param("todo_id"))
	if idErr !=nil {
		c.JSON(idErr.Status,idErr)
		return
	}
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil{
		restErr := errors.NewBadRequestError("invalid json body")
		c.JSON(restErr.Status,restErr)
		return
	}
	// this means we have valid data and todId
	todo.Id = todoId
	result, err := services.UpdateTodo(todo);
	if err != nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,result)
}
func SoftDelete(c *gin.Context){
	todoId, idErr := getTodoId(c.Param("todo_id"))
	if idErr !=nil {
		c.JSON(idErr.Status,idErr)
		return
	}
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil{
		restErr := errors.NewBadRequestError("invalid json body")
		c.JSON(restErr.Status,restErr)
		return
	}
	// this means we have valid data and todId
	todo.Id = todoId
	result, err := services.SoftDeleteTodo(todo);
	if err != nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,result)
}
func RestoreTodo(c *gin.Context){
	todoId, idErr := getTodoId(c.Param("todo_id"))
	if idErr !=nil {
		c.JSON(idErr.Status,idErr)
		return
	}
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil{
		restErr := errors.NewBadRequestError("invalid json body")
		c.JSON(restErr.Status,restErr)
		return
	}
	// this means we have valid data and todId
	todo.Id = todoId
	result, err := services.RestoreDeleteTodo(todo);
	if err != nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,result)
}
func Delete(c *gin.Context){
	todoId, idErr := getTodoId(c.Param("todo_id"))
	if idErr !=nil {
		c.JSON(idErr.Status,idErr)
		return
	}
	if err :=services.DeleteTodo(todoId); err != nil{
		c.JSON(err.Status, err)
		return
	}
	c.JSON(http.StatusOK,map[string]string{
		"message": "deleted"})
}

func GetAll(c *gin.Context){
	todo, err := services.GetAllTodo();
	if err !=nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,todo)
}
func GetDeleted(c *gin.Context){
	todo, err := services.GetAllDeletedTodo();
	if err !=nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,todo)
}
func GetIncomplete(c *gin.Context){
	todo, err := services.GetIncompleteTodo();
	if err !=nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,todo)
}

func GetComplete(c *gin.Context){
	todo, err := services.GetCompleteTodo();
	if err !=nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,todo)
}

func SearchTodo(c *gin.Context){
	keyword := c.Param("keyword")
	p := '%'
	keyword = string(p)+keyword+string(p)
	fmt.Println(keyword)
	todo, err := services.GetSearchedTodo(keyword);
	if err !=nil{
		c.JSON(err.Status,err)
		return
	}
	c.JSON(http.StatusOK,todo)
}