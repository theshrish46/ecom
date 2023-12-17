import multer from 'multer'

const storate = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storate: storate
})