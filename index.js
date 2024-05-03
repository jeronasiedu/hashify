import express from "express";
import multer from "multer";
import { convertBufferToBlurHash } from "./utils/encode.js";
import convertImageToBuffer from "./utils/convert_to_buffer.js";
import { getPlaiceholder } from "plaiceholder";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.sendFile("/public/hashify.html");
});

app.post("/generate-blurhash", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({
        error: "imageUrl is required in the request body",
        recommendation:
          "Please provide an image url or use the /generate-blurhash-from-file endpoint with an image file",
      });
    }
    const buffer = await convertImageToBuffer(imageUrl);
    const blurHash = await convertBufferToBlurHash(buffer);
    res.json({ blurHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An internal server error occurred",
      reason: error?.message,
    });
  }
});

app.post(
  "/generate-blurhash-from-file",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
          recommendation:
            "Please provide an image file or use the /generate-blurhash endpoint with an image url",
        });
      }
      if (!req.file.mimetype.includes("image")) {
        return res.status(400).json({
          error: "File must be an image",
          recommendation:
            "Please provide an image file or use the /generate-blurhash endpoint with an image url",
        });
      }

      const blurHash = await convertBufferToBlurHash(req.file.buffer);

      res.json({ blurHash });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An internal server error occurred",
        reason: error?.message,
      });
    }
  },
);

app.post("/generate-placeholder", async (req, res) => {
  const { imageUrl } = req.body;
  const { size } = req.query;
  if (!imageUrl) {
    return res.status(400).json({
      error: "imageUrl is required in the request body",
      recommendation:
        "Please provide an image url or use the /generate-blurhash-from-file endpoint with an image file",
    });
  }
  try {
    let defaultSize = 4;
    const buffer = await convertImageToBuffer(imageUrl);
    if (!isNaN(size)) {
      const parsedSize = parseFloat(size);
      defaultSize = Math.min(Math.max(parsedSize, 4), 64);
    }
    const { color, base64, css, metadata } = await getPlaiceholder(buffer, {
      size: defaultSize,
    });
    res.json({
      color,
      base64,
      css,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "An internal server error occurred",
      reason: e?.message,
    });
  }
});

app.post(
  "/generate-placeholder-from-file",
  upload.single("image"),
  async (req, res) => {
    const { size } = req.query;
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
          recommendation:
            "Please provide an image file or use the /generate-blurhash endpoint with an image url",
        });
      }
      if (!req.file.mimetype.includes("image")) {
        return res.status(400).json({
          error: "File must be an image",
          recommendation:
            "Please provide an image file or use the /generate-blurhash endpoint with an image url",
        });
      }
      let defaultSize = 4;
      if (!isNaN(size)) {
        const parsedSize = parseFloat(size);
        defaultSize = Math.min(Math.max(parsedSize, 4), 64);
      }

      const { color, base64, css, metadata } = await getPlaiceholder(
        req.file.buffer,
        {
          size: defaultSize,
        },
      );
      res.json({
        color,
        base64,
        css,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An internal server error occurred",
        reason: error?.message,
      });
    }
  },
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
