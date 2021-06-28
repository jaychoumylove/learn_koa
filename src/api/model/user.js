import { bookshelfApp } from "../../database/knex";

const User = bookshelfApp.model("User", {
  hasTimestamps: true,
  tableName: "users",
  hidden: ["password"],
});

export default User;
