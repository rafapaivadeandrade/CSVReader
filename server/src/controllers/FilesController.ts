import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { z } from "zod"

export default class FilesController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const csvRecordSchema = z.object({
      name: z.string(),
      city: z.string(),
      country: z.string(),
      favorite_sport: z.string(),
    })
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    // Validate the file extension
    if (!req.file.originalname.endsWith(".csv")) {
      return res.status(400).json({ error: "Only .csv files are accepted" })
    }

    const csvData: any[] = []

    req.file.buffer
      .toString()
      .split("\n")
      .slice(1) // Skip the first row (header)
      .forEach((row: string) => {
        // Check if the row is empty or consists of only whitespace characters
        if (row.trim() === "") {
          return // Skip this line
        }
        const [name, city, country, favorite_sport] = row.split(",")
        const record = {
          name,
          city,
          country,
          favorite_sport,
        }
        try {
          csvRecordSchema.parse(record)
          csvData.push(record)
        } catch (errorMessage) {
          res
            .status(500)
            .json({ error: "CSV record validation error:", errorMessage })
          console.error("CSV record validation error:", errorMessage)
        }
      })

    try {
      for (const record of csvData) {
        await prisma.cSVRecord.create({
          data: {
            name: record.name,
            city: record.city,
            country: record.country,
            favorite_sport: record.favorite_sport,
          },
        })
      }
      return res.status(201).json({ message: "CSV data uploaded successfully" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
