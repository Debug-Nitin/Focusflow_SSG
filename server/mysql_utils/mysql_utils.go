package mysqlutils

import (
	"strings"
	errors "web-service-gin/Utils/Errors"

	"github.com/go-sql-driver/mysql"
)



const(
	errorNoRows = "no rows in result set"
)

func ParseError(err error) *errors.RestErr{
	sqlErr, ok := err.(*mysql.MySQLError)
	if !ok{
		if strings.Contains(err.Error(),errorNoRows){
			return errors.NewNotFoundError("no record matching given id")
		}
		return errors.NewInternalServerError("error parsing database response")
	}
	switch sqlErr.Number{
	case 1062:
		return errors.NewBadRequestError("invalid data")	
	}
	return errors.NewInternalServerError("error processinng request")
}