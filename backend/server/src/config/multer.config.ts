import { diskStorage } from 'multer';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/resumes',
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + file.originalname;
      cb(null, unique);
    },
  }),
};
