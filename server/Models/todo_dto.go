package models

// dto holds the information about what we are serving
// data transfer object
/* this is the place from where movement of data takes place */

type Todo struct{
	Id 			int64 	`json:"id"`
	Title	 	string 	`json:"title"`
	Description string	`json:"description"`
	Status 		string	`json:"status"`
	DateCreated string	`json:"date_created"`
}
