import { Server } from "restify";
import PostController from "./../controllers/post.controller";
import UserController from "../controllers/user.controller";
import { IsAuthenticated } from "../policies/Authorizer";
export default function routeDefinition(server: Server) {
  const user = new UserController();
  server.post("/signup", user.addUser);
  server.post("/login", user.userLogin);
  server.post("/allusers", user.allusers);

  const post = new PostController();
  server.post("/post", post.addPost);
  server.post("/allposts", post.getAll);
  server.post("/singlepost/:id", post.getOne);
  server.patch("/post/:id", post.updatePost);
  server.post("/delete/:id", post.deletePost);

  // server.post("/:id", post.);
}
