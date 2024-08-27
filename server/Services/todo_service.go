package services

import (
	models "web-service-gin/Models"
	errors "web-service-gin/Utils/Errors"
)

func GetTodo(todoId int64)(*models.Todo,*errors.RestErr){
	result := models.Todo{Id:todoId}
	if err:= result.Get(); err!=nil{
		return nil, err
	}
	return &result, nil
}

func GetSearchedTodo(srch string)([]models.Todo,*errors.RestErr){
	dao := &models.Todo{}
	return dao.GetSearchTodo(srch)
}

func CreateTodo(todo models.Todo)(*models.Todo, *errors.RestErr){		
	if err := todo.Save(); err!=nil{
		return nil, err
	}
	return &todo,nil	
}

/* now := time.Now()
todo.DateCreated = now.format("date month year") */

func UpdateTodo(todo models.Todo) (*models.Todo, *errors.RestErr){
	current, err := GetTodo(todo.Id)
	if err != nil{
		return nil,err
	}
	current.Title = todo.Title
	current.Description = todo.Description
	current.Status = todo.Status	
	if err := current.Update(); err != nil{
		return nil, err
	}
	return current, nil
}
func SoftDeleteTodo(todo models.Todo) (*models.Todo, *errors.RestErr){
	current, err := GetTodo(todo.Id)
	if err != nil{
		return nil,err
	}	
	if err := current.SoftDelete(); err != nil{
		return nil, err
	}
	return current, nil
}
func RestoreDeleteTodo(todo models.Todo) (*models.Todo, *errors.RestErr){
	current, err := GetTodo(todo.Id)
	if err != nil{
		return nil,err
	}	
	if err := current.RestoreDelete(); err != nil{
		return nil, err
	}
	return current, nil
}
func DeleteTodo(todoId int64) *errors.RestErr{
	// create a new struct of todo and call the method delete
	todo := &models.Todo{Id: todoId}
	return todo.Delete()
}

func GetAllTodo() ([]models.Todo,*errors.RestErr){
	dao := &models.Todo{}
	// Todos, err := dao.GetAll()
	// if err != nil{
	// 	return nil, err
	// }
	// return Todos,nil
	return dao.GetAll()
}
func GetAllDeletedTodo() ([]models.Todo,*errors.RestErr){
	dao := &models.Todo{}
	// Todos, err := dao.GetAll()
	// if err != nil{
	// 	return nil, err
	// }
	// return Todos,nil
	return dao.GetAllDeleted()
}
func GetCompleteTodo() ([]models.Todo,*errors.RestErr){
	dao := &models.Todo{}
	return dao.GetComplete()
}
func GetIncompleteTodo() ([]models.Todo,*errors.RestErr){
	dao := &models.Todo{}
	return dao.GetIncomplete()
}