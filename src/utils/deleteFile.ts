import path from "path";
import fs from "fs";

export const deleteFoodPic = (file?: Express.Multer.File) => {
  if (file != undefined) {
    const filename = file.filename;
    const imagePath = path.join(__dirname, `../uploads/foods/${filename}`);
    if (fs.existsSync(imagePath)) fs.rmSync(imagePath);
  }
};
