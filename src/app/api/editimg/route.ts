import sharp from "sharp";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
  try {
    // const buffer = await req.arrayBuffer();

    const resizedBuffer = await sharp(
      Buffer.from(
        "https://react-dropzone.js.org/71afa465-cd1c-4dc1-9e08-a901a954f78d"
      )
    )
      .resize({ width: 600, height: 600 })
      .toBuffer();
    console.log("img received");

    return new Response(resizedBuffer, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (e) {
    console.clear();
    console.log("some error", e);
    return new Response("error happened");
  }
}
