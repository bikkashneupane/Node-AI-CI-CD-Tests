import { Router, Request, Response, NextFunction } from "express";
import openai from "../config/openAIConfig";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    console.log(response?.choices[0]?.message?.content);

    res.json({ response: response?.choices[0]?.message?.content });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    next(error);
  }
});

const chatRouter = router;
export default chatRouter;
