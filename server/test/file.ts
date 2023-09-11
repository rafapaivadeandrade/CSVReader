// import { expect } from "chai"
// import sinon, { SinonSandbox } from "sinon"
// import { Request, Response } from "express"
// import { prisma } from "../src/lib/prisma"
// import FilesController from "../src/controllers/FilesController"
// import { beforeEach, afterEach } from "node:test"

// describe("FilesController", () => {
//   let sandbox: SinonSandbox

//   beforeEach(() => {
//     sandbox = sinon.createSandbox()
//   })

//   afterEach(() => {
//     sandbox.restore()
//   })

//   it("should create CSV records when a valid file is uploaded", async () => {
//     const req: Partial<Request> = {
//       file: {
//         buffer: Buffer.from(
//           "name,city,country,favorite_sport\nAlice,New York,USA,Basketball\nBob,Los Angeles,USA,Soccer"
//         ),
//       },
//     }
//     const res: Partial<Response> = {
//       status: sandbox.stub().returnsThis(),
//       json: sandbox.stub(),
//     }
//     const prismaCreateStub = sandbox.stub(prisma.cSVRecord, "create")

//     await FilesController.create(req as Request, res as Response)

//     expect(res.status).to.be.calledWith(201)
//     expect(res.json).to.be.calledWith({
//       message: "CSV data uploaded successfully",
//     })
//     expect(prismaCreateStub).to.be.calledTwice // Two records in the CSV

//     // Ensure the data sent to prisma.create is correct
//     expect(prismaCreateStub.firstCall.args[0].data).to.deep.equal({
//       name: "Alice",
//       city: "New York",
//       country: "USA",
//       favorite_sport: "Basketball",
//     })
//     expect(prismaCreateStub.secondCall.args[0].data).to.deep.equal({
//       name: "Bob",
//       city: "Los Angeles",
//       country: "USA",
//       favorite_sport: "Soccer",
//     })
//   })

//   it("should handle invalid CSV records", async () => {
//     const req: Partial<Request> = {
//       file: {
//         buffer: Buffer.from(
//           "name,city,country,favorite_sport\nAlice,New York,USA,Basketball\nInvalid Data"
//         ),
//       },
//     }
//     const res: Partial<Response> = {
//       status: sandbox.stub().returnsThis(),
//       json: sandbox.stub(),
//     }
//     const prismaCreateStub = sandbox.stub(prisma.cSVRecord, "create")

//     await FilesController.create(req as Request, res as Response)

//     expect(res.status).to.be.calledWith(500)
//     expect(res.json).to.be.calledWithMatch({
//       error: "CSV record validation error:",
//     })
//     expect(prismaCreateStub).to.not.be.called
//   })

//   it("should handle no file uploaded", async () => {
//     const req: Partial<Request> = {}
//     const res: Partial<Response> = {
//       status: sandbox.stub().returnsThis(),
//       json: sandbox.stub(),
//     }
//     const prismaCreateStub = sandbox.stub(prisma.cSVRecord, "create")

//     await FilesController.create(req as Request, res as Response)

//     expect(res.status).to.be.calledWith(400)
//     expect(res.json).to.be.calledWith({ error: "No file uploaded" })
//     expect(prismaCreateStub).to.not.be.called
//   })

//   it("should handle internal server errors", async () => {
//     const req: Partial<Request> = {
//       file: {
//         buffer: Buffer.from(
//           "name,city,country,favorite_sport\nAlice,New York,USA,Basketball"
//         ),
//       },
//     }
//     const res: Partial<Response> = {
//       status: sandbox.stub().returnsThis(),
//       json: sandbox.stub(),
//     }
//     sandbox.stub(prisma.cSVRecord, "create").throws(new Error("Internal Error"))

//     await FilesController.create(req as Request, res as Response)

//     expect(res.status).to.be.calledWith(500)
//     expect(res.json).to.be.calledWith({ error: "Internal Server Error" })
//   })
// })
