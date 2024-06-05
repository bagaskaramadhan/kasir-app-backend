import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "src/uploads");
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${Date.now()}.png`);
	}
});

export const upload = multer({
	storage,
	limits: { fileSize: 2000000 },
	fileFilter(req, file, cb) {
		if (file.originalname.match(/\.(jpg|jpeg|png)\b/)) {
			cb(null, true);
		} else {
			cb(null, false);
			console.log("ERROR UPLOAD: File format tidak diizinkan");
		}
	}
});