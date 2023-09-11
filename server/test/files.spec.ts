import chai from "chai"
import chaiHttp from "chai-http"
import app from "../src/app"

const expect = chai.expect
chai.use(chaiHttp)

describe("FilesController", () => {
  it("should return a success response when uploading a valid CSV file", async () => {
    // Create a sample CSV file buffer
    const csvFileBuffer = Buffer.from(
      "name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball"
    )

    const response = await chai
      .request(app)
      .post("/api/files")
      .attach("file", csvFileBuffer, "sample_data.csv")

    // Assert HTTP status code
    expect(response).to.have.status(201)

    // Assert that the response contains the expected message
    expect(response.body.message).to.equal("CSV data uploaded successfully")
  })

  it("should return an error response when uploading an invalid CSV file", async () => {
    // Create an invalid CSV file buffer
    const csvFileBuffer = Buffer.from(
      "name,city,country,favorite_sport\nJohn Doe,New York,USA"
    )

    const response = await chai
      .request(app)
      .post("/api/files")
      .attach("file", csvFileBuffer, "invalid.csv")

    // Assert HTTP status code
    expect(response).to.have.status(500)

    // Assert that the response contains an error message
    expect(response.body.error).to.exist
  })
  it("should return an error response when uploading an invalid CSV file format", async () => {
    // Create an invalid CSV file buffer
    const csvFileBuffer = Buffer.from(
      "name,city,country,favorite_sport\nJohn Doe,New York,USA"
    )

    const response = await chai
      .request(app)
      .post("/api/files")
      .attach("file", csvFileBuffer, "invalid.txt")

    // Assert HTTP status code
    expect(response).to.have.status(400)

    // Assert that the response contains an error message
    expect(response.body.error).to.exist
  })

  it("should return an error response when no file is uploaded", async () => {
    const response = await chai.request(app).post("/api/files")

    // Assert HTTP status code
    expect(response).to.have.status(400)

    // Assert that the response contains an error message
    expect(response.body.error).to.equal("No file uploaded")
  })
})
