import Database from './database'
import dotenv from 'dotenv'
dotenv.config()

var DB = new Database()

export default  {
	app_name: process.env.APP_NAME,
	DB: DB.setConnection()
}