import { bookshelfApp } from "../../database/knex";

const User = bookshelfApp.model("User", {
  timestamp: true,
  tableName: "users",
});

export default User;
