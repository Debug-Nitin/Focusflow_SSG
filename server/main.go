package main

import (
	routes "web-service-gin/Routes"
	tododb "web-service-gin/todo_db"
)

func main(){
    tododb.Init()
    routes.StartRoutes()
}

// mysql -h localhost -P30006 -u root -p