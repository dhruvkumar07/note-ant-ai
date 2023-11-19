import CreateNoteDialog from '@/components/CreateNoteDialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { $note } from '@/lib/db/schema'
import { UserButton, auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Dashboard = async (props: Props) => {
    const {userId} = auth()
    const notes = await db.select().from($note).where(
        eq($note.userId , userId!)
    )

  return (
    <div className='min-h-screen bg-gradient-to-r from-teal-100 to-purple-200'>
        <div className='max-w-7xl mx-auto p-10'>
            <div className='h-10'></div>
            <div className='flex justify-between items-center md:flex-col flex-col'>
                <div className='flex items-center w-full'>
                    <div className='pl-6'>
                        <Link href={'/'}>
                            <Button className='bg-green-600' size={'sm'}>
                            <ArrowLeftIcon className='w-5 h-5 mr-2' strokeWidth={2}/> Back</Button>
                        </Link>
                    </div>
                    <div className='w-5'></div>
                    <h1 className='text-4xl font-bold text-slate-900'>My Notes</h1>
                    <div className='w-5'></div>
                    <div className='ml-auto pr-8'>
                        <UserButton />
                    </div>
                </div>
            </div>
            <div className='h-8'></div>
            <Separator />
            <div className='h-8'></div>
            {notes.length === 0 && (
                <div className='text-center'>
                    <h2 className='text-slate-700'>You don't have any note yet.</h2>
                </div>
            )}



            <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                <CreateNoteDialog />
                {notes.map((note) => {
                    return (
                        <a href={`/note/${note.id}`} key={note.id}>
                          <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                            <img
                              width={400}
                              height={200}
                              alt={note.name}
                              src={note.imageUrl || ""}
                            />
                            <div className="p-4">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {note.name}
                              </h3>
                              <div className="h-1"></div>
                              <p className="text-sm text-gray-500">
                                {new Date(note.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </a>
                      );
                })}
            </div>
        </div>
    </div>
  )
}

export default Dashboard