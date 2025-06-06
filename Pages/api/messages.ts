import { connectDB } from "@/lib/db";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const db = await connectDB();
  const messages = db.collection("messages");

  if (req.method === "GET") {
    const latest = await messages.find().sort({ createdAt: -1 }).limit(50).toArray();
    return res.status(200).json(latest.reverse());
  }

  if (req.method === "POST") {
    const form = formidable({ multiples: false, uploadDir: "./public/uploads", keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Form parsing error" });

      const { text, user } = fields;
      const file = files.file?.filepath
        ? "/uploads/" + path.basename(files.file.filepath)
        : null;

      const msg = {
        text,
        user,
        file,
        createdAt: new Date(),
        reactions: [],
      };

      await messages.insertOne(msg);
      return res.status(200).json({ success: true });
    });
  }
}