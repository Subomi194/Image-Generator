
export default async function handler(req, res) {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
  
    const body = req.body;
    const prompt = body.prompt;
    const count = body.count || 1;
  
    if (!prompt) {
      res.status(400).json({ error: "Prompt required" });
      return;
    }
  
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.OPENAI_API_KEY,
            },
            body: JSON.stringify({
            model: "dall-e-2",
            prompt: prompt,
            n: count,
            size: "1024x1024",
            }),
        });

        const data = await response.json();
            res.status(200).json(data);

    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Image generation failed" });
    }
    
}  
   
   