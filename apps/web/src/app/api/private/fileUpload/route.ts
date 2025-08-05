import { UploadFile } from "@/lib/uploadFile";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const uploadedUrl = await UploadFile(file);

  if (!uploadedUrl) {
    return new Response("File upload failed", { status: 500 });
  }

  return new Response(JSON.stringify({ url: uploadedUrl }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
