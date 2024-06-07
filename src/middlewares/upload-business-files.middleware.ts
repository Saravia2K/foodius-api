import { Request } from "express";
import multer from "multer";
import { TRegisterBody } from "../controllers/types";
import path from "path";
import slugify from "../utils/slugify";

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req: Request<{}, {}, TRegisterBody>, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = req.body.name;
    const filename = `${slugify(name)}${ext}`;
    cb(null, `${file.fieldname}s/${filename}`);
  },
});

const multerMiddleware = multer({ storage });
export default multerMiddleware.fields([
  { name: "logo", maxCount: 1 },
  { name: "banner", maxCount: 1 },
]);
