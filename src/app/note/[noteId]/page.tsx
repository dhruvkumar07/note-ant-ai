import DeleteButton from '@/components/DeleteButton'
import TipTapEditor from '@/components/TipTapEditor'
import { Button } from '@/components/ui/button'
import { clerk } from '@/lib/clerk-server'
import { db } from '@/lib/db'
import { $note } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        noteId: string
    }
}

const NotebookPage = async ({params:{noteId}}: Props) => {
    const { userId } = auth()
    if(!userId) return redirect('/dashboard')

    const user = await clerk.users.getUser(userId)
    const notes = await db.select().from($note).where(
        and(
            eq($note.id, parseInt(noteId)),
            eq($note.userId, userId)
        )
    )

    if(notes.length != 1) return redirect('/dashboard')
    const note = notes[0]


  return (
    <div className='min-h-screen p-8 bg-gradient-to-b from-purple-50 to-pink-50'>
        <div className='max-w-5xl mx-auto'>
            <div className='border border-stone-200 shadow-lg rounded-lg p-4 flex items-center'>
                <Link href={'/dashboard'}>
                    <Button className='bg-green-600 gap-2'>
                        <ArrowLeft className='w-5 h-5' strokeWidth={2} />
                        Back
                    </Button>
                </Link>
                <div className='w-4'></div>
                <span className='font-semibold text-lg'>
                    {user.firstName} {user.lastName}
                </span>
                <span className='inline-block mx-1'>/</span>
                <span className='font-semibold text-slate-500'>{note.name}</span>
                <div className='ml-auto'>
                    <DeleteButton noteId={note.id} />
                </div>
            </div>

            <div className='h-5'></div>
            <div className='border-stone-200 shadow-lg border rounded-lg h-auto px-8 py-4'>
                <TipTapEditor note={note} />
            </div>

        </div>
    </div>
  )
}

export default NotebookPage