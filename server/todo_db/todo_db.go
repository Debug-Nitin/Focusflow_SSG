package tododb

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

const(
	mysql_users_username = "MYSQL_USERS_USERNAME"
	mysql_users_password = "MYSQL_USERS_PASSWORD"
	mysql_users_host = "MYSQL_USERS_HOST"
	mysql_users_schema = "MYSQL_USERS_SCHEMA"
	

	
)

var Client *sql.DB

func getConfigs()(string,string,string,string){
	username := os.Getenv(mysql_users_username)
	password := os.Getenv(mysql_users_password)
	host := os.Getenv(mysql_users_host)
	schema := os.Getenv(mysql_users_schema)

	return username,password,host,schema
}



func Init(){
	errenv := godotenv.Load()
	if errenv != nil {
		log.Fatal("error loading .env file")
	}
	username,password,host,schema :=getConfigs()
	fmt.Println("hello", username, password, host, schema)
	dataSourceName := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8",
	username, password, host, schema,
	/* "root",
	"12345678",
	"127.0.0.1", /* localhost of our database resolves to this hostname */
	/* "todo_db", */  /* name of database schema */
	// above is not recommended because we will be placing our credentials
	//on git hub


)
	var err error
	Client , err = sql.Open("mysql", dataSourceName)
	if err != nil{
		panic(err)
	}
	log.Println("database successfully configured")
}