import { encode } from "blurhash"
import sharp from "sharp"

export const encodeImageToBlurhash = (image, isBuffer = false) =>
  new Promise(async (resolve, reject) => {
    try {
      let buffer
      if (isBuffer) {
        buffer = image
      } else {
        const response = await fetch(image)
        if (!response.ok) {
          return reject(new Error("Failed to fetch the image"))
        }
        buffer = await response.arrayBuffer()
      }
      sharp(buffer)
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: "inside" })
        .toBuffer((err, buffer, { width, height }) => {
          if (err) return reject(err)
          resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4))
        })
    } catch (error) {
      reject(error)
    }
  })
