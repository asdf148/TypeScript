import {Router} from "express";
import methodOverride from "method-override";
import PostController from "../../controllers/postController";
const route = Router();

export default (app: Router) => {
    const postController = new PostController();
    app.use(methodOverride("_method"));
    app.use("/posts", route);

    route.get("/update", postController.updatePage);

    route.post("/write", postController.create);

    route.put("/update", postController.update)

    route.delete("/delete/:id", postController.delete);
}