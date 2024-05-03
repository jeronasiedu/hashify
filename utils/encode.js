import { encode } from "blurhash"
import sharp from "sharp"

export const convertBufferToBlurHash = (buffer) =>
  new Promise(async (resolve, reject) => {
    try {
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
