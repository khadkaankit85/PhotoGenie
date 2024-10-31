import sharp from "sharp";

export async function POST(req: Request) {
  try {
    // Decode ArrayBuffer to Buffer directly for sharp
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));
    console.log(buffer);


    return new Response("hello", {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (e) {
    console.error("Error processing image:");
    return new Response("Unsupported image format or processing error", { status: 500 });
  }
}
