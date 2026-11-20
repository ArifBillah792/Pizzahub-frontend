"use server";

export async function uploadImage(formData) {
  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      { method: "POST", body: formData },
    );
    const data = await res.json();
    if (!data.success)
      return { error: "Image upload failed. Please try another image." };
    return { url: data.data.url };
  } catch {
    return { error: "Image upload failed. Please check your connection." };
  }
}
