import { OpenAI } from "openai";
import { envConfig } from "./envConfig";

const openai = new OpenAI({
  apiKey: envConfig.OPENAI_API_KEY as string,
});

export default openai;
