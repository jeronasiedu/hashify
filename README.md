---
title: hashify v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"
---

# hashify

> v1.0.0

Base URLs:

- <a href="https://hashify.cyclic.cloud/">Prod Env: https://hashify.cyclic.cloud/</a>

# Default

## POST blurhhash from url

POST /generate-blurhash

> Body Parameters

```json
{
  "imageUrl": "string"
}
```

### Params

| Name       | Location | Type   | Required | Description                                             |
| ---------- | -------- | ------ | -------- | ------------------------------------------------------- |
| body       | body     | object | no       | none                                                    |
| » imageUrl | body     | string | yes      | The url of the image your want to generate the blurhash |

> Response Examples

> OK

```json
{
  "blurHash": "U9BDKG~W9ZIq_Nx]D%aK0g9ZR5kWEMIUwb%g"
}
```

> Bad Request

```json
{
  "error": "imageUrl is required in the request body",
  "recommendation": "Please provide an image url or use the /generate-blurhash-from-file endpoint with an image file"
}
```

> Server Error

```json
{
  "error": "An internal server error occurred",
  "reason": "image.buffer() is not a function"
}
```

### Responses

| HTTP Status Code | Meaning                                                                    | Description  | Data schema |
| ---------------- | -------------------------------------------------------------------------- | ------------ | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK           | Inline      |
| 400              | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request  | Inline      |
| 500              | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Server Error | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name       | Type   | Required | Restrictions | Title | description     |
| ---------- | ------ | -------- | ------------ | ----- | --------------- |
| » blurHash | string | true     | none         |       | Blurhash string |

HTTP Status Code **400**

| Name             | Type   | Required | Restrictions | Title | description          |
| ---------------- | ------ | -------- | ------------ | ----- | -------------------- |
| » error          | string | true     | none         |       | The error message    |
| » recommendation | string | false    | none         |       | How to fix the error |

HTTP Status Code **500**

| Name     | Type   | Required | Restrictions | Title | description           |
| -------- | ------ | -------- | ------------ | ----- | --------------------- |
| » error  | string | true     | none         |       | Internal Server Error |
| » reason | string | true     | none         |       | What caused the error |

## POST Blurhash from image file

POST /generate-blurhash-from-file

Use the /generate-blurhash-from-file endpoint to upload an image file and generate Blurhash. The image file should be sent as a multipart/form-data request, and you will receive the Blurhash string in the response

> Body Parameters

```yaml
image: file:///Users/jeron/Downloads/health app.png
```

### Params

| Name    | Location | Type           | Required | Description                                 |
| ------- | -------- | -------------- | -------- | ------------------------------------------- |
| body    | body     | object         | no       | none                                        |
| » image | body     | string(binary) | yes      | An image file uploaded using multipart form |

> Response Examples

> OK

```json
{
  "blurHash": "U9BDKG~W9ZIq_Nx]D%aK0g9ZR5kWEMIUwb%g"
}
```

> Bad Request

```json
{
  "error": "File must be an image",
  "recommendation": "Please provide an image file or use the /generate-blurhash endpoint with an image url"
}
```

```json
{
  "error": "No file uploaded",
  "recommendation": "Please provide an image file or use the /generate-blurhash endpoint with an image url"
}
```

> Server Error

```json
{
  "error": "An internal server error occurred",
  "reason": "image.buffer() is not a function"
}
```

### Responses

| HTTP Status Code | Meaning                                                                    | Description  | Data schema |
| ---------------- | -------------------------------------------------------------------------- | ------------ | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)                    | OK           | Inline      |
| 400              | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)           | Bad Request  | Inline      |
| 500              | [Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1) | Server Error | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name       | Type   | Required | Restrictions | Title | description |
| ---------- | ------ | -------- | ------------ | ----- | ----------- |
| » blurHash | string | true     | none         |       | none        |

HTTP Status Code **400**

| Name             | Type   | Required | Restrictions | Title | description          |
| ---------------- | ------ | -------- | ------------ | ----- | -------------------- |
| » error          | string | true     | none         |       | The error message    |
| » recommendation | string | false    | none         |       | How to fix the error |

HTTP Status Code **500**

| Name     | Type   | Required | Restrictions | Title | description              |
| -------- | ------ | -------- | ------------ | ----- | ------------------------ |
| » error  | string | true     | none         |       | An internal server error |
| » reason | string | false    | none         |       | What caused the error    |
