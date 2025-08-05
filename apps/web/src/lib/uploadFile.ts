import { uploadOnCloudinary } from "./cloudinary";

export async function UploadFile(file: File): Promise<string | null> {
  try {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      return null;
    }

    if (file.size > maxSize) {
      return null;
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    const uploaded = await uploadOnCloudinary(dataURI);
    return uploaded?.url || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
