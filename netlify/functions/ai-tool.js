const fetch = require("node-fetch");

exports.handler = async (event) => {
  const userInput = JSON.parse(event.body).input;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: The user said: "${userInput}". Recommend 2–3 AI tools that match this task. Keep it short and clear.
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      reply: data.choices?.[0]?.message?.content || "Error"
    })
  };
};
