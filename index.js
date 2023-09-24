import express from "express"
import multer from "multer"
import { encodeImageToBlurhash } from "./utils/encode.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.get("/", (_, res) => {
  return res.json({
    message:
      "Hey, visit `/generate-blurhash` or `/generate-blurhash-from-file` to generate a blurhash",
    date: new Date().toLocaleDateString(),
  })
})

app.post("/generate-blurhash", async (req, res) => {
  try {
    const { imageUrl } = req.body
    if (!imageUrl) {
      return res.status(400).json({
        error: "imageUrl is required in the request body",
        recommendation:
          "Please provide an image url or use the /generate-blurhash-from-file endpoint",
      })
    }
    const blurHash = await encodeImageToBlurhash(imageUrl)
    res.json({ blurHash })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "An internal server error occurred" })
  }
})

app.post("/generate-blurhash-from-file", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }
    if (!req.file.mimetype.includes("image")) {
      return res.status(400).json({
        error: "File must be an image",
        recommendation: "Please provide an image url or use the /generate-blurhash endpoint",
      })
    }

    const blurHash = await encodeImageToBlurhash(req.file.buffer, true)

    res.json({ blurHash })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "An internal server error occurred" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
