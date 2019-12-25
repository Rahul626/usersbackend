import { createConnection, set } from "mongoose";

import SCHEMAS from "./schema";
import * as dbtypes from "./dbtypes";

const mongoPath = process.env.MONGO_PATH;
set("debug", true);
set("useCreateIndex", true);
set("useFindAndModify", false);

const connection = createConnection(mongoPath, { useNewUrlParser: true, config: { autoIndex: true }, useUnifiedTopology: true });

export const db = {
  // customers: connection.model<dbtypes.ICustomers>("customers", SCHEMAS.customerSchema),
  users: connection.model<dbtypes.IUser>("users", SCHEMAS.userSchema),
  posts: connection.model<dbtypes.IPost>("posts", SCHEMAS.postSchema),
};
