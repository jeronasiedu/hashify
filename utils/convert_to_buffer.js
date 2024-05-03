async function convertImageToBuffer(imageUrl) {
    const response = await fetch(imageUrl)
    if (!response.ok) {
        throw new Error("Failed to fetch the image")
    }
    const buffer = await response.arrayBuffer()
    return Buffer.from(buffer)
}

export default convertImageToBuffer
