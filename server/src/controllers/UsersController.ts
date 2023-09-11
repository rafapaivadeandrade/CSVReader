import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { z } from "zod"

export default class UsersController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const searchTermSchema = z.string().min(1).max(255)
    try {
      const searchTerm = searchTermSchema.parse(req.query.q as string)

      const results = await prisma.cSVRecord.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm.toLowerCase() } },
            { city: { contains: searchTerm.toLowerCase() } },
            { country: { contains: searchTerm.toLowerCase() } },
            { favorite_sport: { contains: searchTerm.toLowerCase() } },
          ],
        },
      })
      return res.json(results?.length > 0 ? results : [])
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Internal Server Error" })
    }
  }
}
