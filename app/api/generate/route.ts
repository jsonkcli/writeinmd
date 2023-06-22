// import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'


export const runtime = 'edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);



export async function POST(req: Request) {
  const json = await req.json()
  let { prompt: content } = json

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You're a markdown generator - Write a README  with what's known as a preffered read me docs convention for the users project describtion ind markdown format`,
      },
      {
        role: "user",
        content,
      },
    ],
    max_tokens: 200,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });


  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response, {
  //   async onCompletion(completion) {
  //     const userId = user?.id
  //     if (userId) {
  //       const createdAt = Date.now()
  //       const payload = {
  //         userId,
  //         createdAt,
  //         messages: [
  //           {
  //             content: completion,
  //             role: 'assistant'
  //           }
  //         ]
  //       }
  //       await kv.hmset(`chat:${id}`, payload)
  //       await kv.zadd(`user:chat:${userId}`, {
  //         score: createdAt,
  //         member: `chat:${id}`
  //       })
  //     }
  //   }
  // })

  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);

}
