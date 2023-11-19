import { db } from "@/lib/db";
import { $note } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = 'edge'

export async function POST(req: Request) {
    const {userId} = auth();
    if(!userId) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    const body = await req.json();
    const { name } = body;

    const image_description = await generateImagePrompt(name);
    if(!image_description) {
        return new NextResponse("Unable to generate image description", {status: 500});
    }

    const image_URL = await generateImage(image_description);
    if(!image_URL) {
        return new NextResponse("Unable to generate image", {status: 500});
    }

    const note_ids = await db.insert($note).values({
        name,
        userId,
        imageUrl: image_URL,
        editorState: ""
    }).returning({
        insertedId: $note.id
    })

    return NextResponse.json({
        note_id: note_ids[0].insertedId
    })
}