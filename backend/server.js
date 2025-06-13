import OpenAI from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  const { topic, tone } = req.body;

  const toneMap = {
    funny: "Make them humorous and witty.",
    shocking: "Make them surprising and dramatic.",
    emotional: "Make them touching and heartfelt.",
    educational: "Make them informative and valuable.",
    default: "Make them catchy and attention-grabbing.",
  };

  const promptStyle = toneMap[tone] || toneMap.default;

  const prompt = `Give me 5 viral TikTok hook ideas about "${topic}". ${promptStyle}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.choices[0].message.content;
    const hooks = responseText.split(/\n(?=\d+\.)/).map((h) => h.trim());

    res.json({ hooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate hooks." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
