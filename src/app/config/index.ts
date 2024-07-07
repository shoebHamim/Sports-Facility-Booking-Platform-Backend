import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  environment:process.env.ENV,
  salt_round:process.env.SALT_ROUND,
  facility_opening_time:process.env.FACILITY_OPENING_TIME,
  facility_closing_time:process.env.FACILITY_CLOSING_TIME,
 
};
