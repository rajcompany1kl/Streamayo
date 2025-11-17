// app/server/home.ts
import { auth } from "@clerk/nextjs/server";

export async function getLikedVideosServer() {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    
  const { userId, getToken } = await auth();
  if (!userId) return [];

  const token = await getToken();

  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/likes/videos/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  console.log("answer",res)

  return res.ok ? res.json() : [];
}
