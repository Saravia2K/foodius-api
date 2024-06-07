import { Request } from "express";
import multer from "multer";
import { TCreateFoodBody } from "../controllers/types";
import path from "path";
import slugify from "../utils/slugify";

const storage = multer.diskStorage({
  destination: "src/uploads/foods",
  filename: (req: Request<{}, {}, TCreateFoodBody>, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = req.body.name;
    cb(null, `${slugify(name)}${ext}`);
  },
});

export default multer({ storage }).single("image");
