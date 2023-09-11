import request from "supertest"
import app from "../src/app"
import chai from "chai"
import chaiHttp from "chai-http"

const expect = chai.expect
chai.use(chaiHttp)

describe("User Search Endpoint", () => {
  it("should return search results based on the query parameter", async () => {
    const searchTerm = "John" // Replace with a test search term

    const response = await request(app)
      .get("/api/users")
      .query({ q: searchTerm })

    expect(response).to.have.status(200)
    // Add assertions for the expected search results based on your test data
  })

  it("should return an empty array if no results are found", async () => {
    const searchTerm = "NonExistentUser" // Replace with a non-existent search term

    const response = await request(app)
      .get("/api/users")
      .query({ q: searchTerm })

    expect(response).to.have.status(200)
    expect(response.body).to.empty // Expect an empty array for no results
  })

  // Add more tests for error cases and other scenarios as needed
})
