package models

// it holds all the logic about how we are persisting and retrieving information
// from our data source
import (
	"time"
	errors "web-service-gin/Utils/Errors"
	mysqlutils "web-service-gin/mysql_utils"
	tododb "web-service-gin/todo_db"
)

//creating query
const(
	queryGetAllDeltedTodo = "SELECT id, title, description, status, date_created FROM todo WHERE is_deleted=1;"
	queryInsertTodo = "INSERT INTO todo(title, description, status, date_created) VALUES(?, ?, ?,?);"
	queryGetTodo = "SELECT id, title, description, status, date_created FROM todo WHERE id=?;"
	queryUpdateTodo = "UPDATE todo SET title=?, description=?, status=?, date_created=? WHERE id=?;"
	querySoftDeleteTodo = "UPDATE todo SET is_deleted=1 WHERE id=?;"
	queryRestoreDeleteTodo = "UPDATE todo SET is_deleted=0 WHERE id=?;"
	queryDeleteTodo = "DELETE FROM todo WHERE id=?;"
	queryGetAllTodo = "SELECT id, title, description, status, date_created FROM todo WHERE is_deleted=0 ORDER BY status DESC"
	queryGetCompletedTodo = "SELECT id, title, description, status, date_created FROM todo WHERE status='completed' AND is_deleted=0;"
	queryGetIncompleteTodo ="SELECT id, title, description, status, date_created FROM todo WHERE status='incomplete' AND is_deleted=0;"
	queryGetSearchedTodo = "SELECT id, title, description, status, date_created FROM todo WHERE title like ? AND is_deleted=0"
)
// data acees object
/* we have the entire architecture defined of our micro system design here
this is the only place where we have the access to database
so to change the database we have to make changes here */

func (todo *Todo) Get() *errors.RestErr { 
	stmt , err := tododb.Client.Prepare(queryGetTodo)
	if err != nil{
		return errors.NewInternalServerError(err.Error())
	}
	// if we dont close we will keep an open connedction and that could lead us to run out of open connections
	defer stmt.Close()

	result := stmt.QueryRow(todo.Id) //returns a row based on query
	// below func scan the row stored in result and populate our data
	if getErr :=result.Scan(&todo.Id,&todo.Title,&todo.Description,&todo.Status,&todo.DateCreated);
	getErr != nil{
	 return mysqlutils.ParseError(getErr)
	}
	return nil
}

func (todo *Todo) GetSearchTodo(srch string) ([]Todo, *errors.RestErr) {
	// here we return a todo if we have a todo else we return an error 
	stmt , err := tododb.Client.Prepare(queryGetSearchedTodo)
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()
	
	rows, err := stmt.Query(srch)
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer rows.Close()

	// An results slice to hold data from returned rows.
    var results []Todo

    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
		var todo Todo
        if err := rows.Scan(&todo.Id, &todo.Title, &todo.Description,
            &todo.Status, &todo.DateCreated); err != nil {
            return nil,mysqlutils.ParseError(err)
        }
        results = append(results, todo)
    }
	if len(results)==0{
		return nil, errors.NewNotFoundError("no todo exists")
	}
    return results, nil	
}

func (todo *Todo) GetAll() ([]Todo, *errors.RestErr) {
	// here we return a todo if we have a todo else we return an error 
	stmt , err := tododb.Client.Prepare(queryGetAllTodo)
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer rows.Close()

	// An results slice to hold data from returned rows.
    var results []Todo

    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
		var todo Todo
        if err := rows.Scan(&todo.Id, &todo.Title, &todo.Description,
            &todo.Status, &todo.DateCreated); err != nil {
            return nil,mysqlutils.ParseError(err)
        }
        results = append(results, todo)
    }
	if len(results)==0{
		return nil, errors.NewNotFoundError("no todo exists")
	}
    return results, nil	
}

func (todo *Todo) GetAllDeleted() ([]Todo, *errors.RestErr) {
	// here we return a todo if we have a todo else we return an error 
	stmt , err := tododb.Client.Prepare(queryGetAllDeltedTodo)
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer rows.Close()

	// An results slice to hold data from returned rows.
    var results []Todo

    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
		var todo Todo
        if err := rows.Scan(&todo.Id, &todo.Title, &todo.Description,
            &todo.Status, &todo.DateCreated); err != nil {
            return nil,mysqlutils.ParseError(err)
        }
        results = append(results, todo)
    }
	if len(results)==0{
		return nil, errors.NewNotFoundError("no todo exists")
	}
    return results, nil	
}

func (todo *Todo) GetIncomplete() ([]Todo, *errors.RestErr) {
	// here we return a todo if we have a todo else we return an error 
	stmt , err := tododb.Client.Prepare(queryGetIncompleteTodo)
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer rows.Close()

	// An results slice to hold data from returned rows.
    var results []Todo
    for rows.Next() {
		var todo Todo
        if err := rows.Scan(&todo.Id, &todo.Title, &todo.Description,
            &todo.Status, &todo.DateCreated); err != nil {
            return nil,mysqlutils.ParseError(err)
        }
        results = append(results, todo)
    }
	if len(results)==0{
		return nil, errors.NewNotFoundError("no todo exists")
	}
    return results, nil	
}

func (todo *Todo) GetComplete() ([]Todo, *errors.RestErr) {
	stmt , err := tododb.Client.Prepare(queryGetCompletedTodo)
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	if err != nil{
		return nil,errors.NewInternalServerError(err.Error())
	}
	defer rows.Close()
    var results []Todo
    for rows.Next() {
		var todo Todo
        if err := rows.Scan(&todo.Id, &todo.Title, &todo.Description,
            &todo.Status, &todo.DateCreated); err != nil {
            return nil,mysqlutils.ParseError(err)
        }
        results = append(results, todo)
    }
	if len(results)==0{
		return nil, errors.NewNotFoundError("no todo exists")
	}
    return results, nil	
}

func (todo *Todo) Save() *errors.RestErr {
	// using query to insert into database
	stmt , err := tododb.Client.Prepare(queryInsertTodo)
	if err != nil{
		return errors.NewInternalServerError(err.Error())
	}
	/* the first thing after creating a statement is to defer the statement
	  defer is used to ensure that a function call is performed*/
	  defer stmt.Close()
	  // ##todo.DateCreated = date_utils.GetNowString()
	  todo.DateCreated = time.Now().Format("2006-01-02 15:04:05")
	  insertResult, saveErr :=stmt.Exec(todo.Title,todo.Description,todo.Status,todo.DateCreated)
	  if saveErr != nil{
		return mysqlutils.ParseError(saveErr)
	  }
	  todoId, err := insertResult.LastInsertId()
	  if err!= nil{
		return mysqlutils.ParseError(saveErr)
	  }
	  todo.Id = todoId
	return nil
}

func (todo *Todo) Update() *errors.RestErr{
	stmt, err:= tododb.Client.Prepare(queryUpdateTodo)
	if err != nil {
		return errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()
	todo.DateCreated = time.Now().Format("2006-01-02 15:04:05")
	_, err = stmt.Exec(todo.Title, todo.Description, todo.Status, todo.DateCreated,todo.Id)
	if err != nil {
		return mysqlutils.ParseError(err)
	}
	return nil
}
func (todo *Todo) SoftDelete() *errors.RestErr{
	stmt, err:= tododb.Client.Prepare(querySoftDeleteTodo)
	if err != nil {
		return errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()
	_, err = stmt.Exec(todo.Id)
	if err != nil {
		return mysqlutils.ParseError(err)
	}
	return nil
}
func (todo *Todo) RestoreDelete() *errors.RestErr{
	stmt, err:= tododb.Client.Prepare(queryRestoreDeleteTodo)
	if err != nil {
		return errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()
	_, err = stmt.Exec(todo.Id)
	if err != nil {
		return mysqlutils.ParseError(err)
	}
	return nil
}
func (todo *Todo) Delete() *errors.RestErr {
	stmt, err := tododb.Client.Prepare(queryDeleteTodo)
	if err != nil {
		return errors.NewInternalServerError(err.Error())
	}
	defer stmt.Close()
	 if _, err = stmt.Exec(todo.Id); err != nil {
		return mysqlutils.ParseError(err)
	}
	return nil
}
