import { db } from "@/lib/db";
import { $note } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { noteId , editorState } = body;
        if(!noteId || !editorState){
            return new NextResponse("Missing noteId or editorState" , { status: 500 });
        }

        noteId = parseInt(noteId)
        const notes = await db.select().from($note).where(
            eq($note.id , noteId)
        )

        if(notes.length != 1){
            return new NextResponse("Note not found" , { status: 404 });
        }

        const note = notes[0];
        if(note.editorState !== editorState){
            await db.update($note).set({
                editorState
            }).where(
                eq($note.id , noteId)
            )
        }

        return NextResponse.json({success: true }, { status: 200 });

        
    } catch (error) {
        return NextResponse.json({success: false } , { status: 500 });
        
    }
}