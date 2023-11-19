'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader2, PlusCircle } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Alert } from './ui/alert'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateNoteDialog = (props: Props) => {
    const [input , setInput] = React.useState('')
    const router = useRouter()

    const createNotebook = useMutation({
        mutationFn: async () => {
            const res = await axios.post('/api/createNotebook' , {name: input})
            return res.data
        }
    
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(input.trim() === '') {
            <Alert>Name cannot be empty.</Alert>
        }
        createNotebook.mutate(undefined , {
            onSuccess: ({note_id}) => {
                console.log('Create note_id' , {note_id})
                router.push(`/note/${note_id}`)
            },
            onError: () => {
                window.alert('Unable to create notebook.')
            }
        })
    }


  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4 '>
                <PlusCircle className='text-green-600'/>
                <h2 className='text-seminold text-green-600 text-lg'>New Notebook</h2>
            </div>
        </DialogTrigger>
        <DialogContent className='bg-gradient-to-r from-purple-100 to-teal-100'>
            <DialogHeader>
                <DialogTitle>
                    New Notebook
                </DialogTitle>
                <DialogDescription>
                    You can create new notebook by providing name and clicking the button below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input placeholder='Name...' value={input} onChange={(e) => setInput(e.target.value)} />
                <div className='h-5'></div>
                <div className='flex items-center gap-2'>
                    <Button variant={'secondary'} type='reset'>Cancel</Button>
                    <Button className='bg-green-600' type='submit' disabled={createNotebook.isPending}>
                        {createNotebook.isPending && (
                            <Loader2 className='animate-spin mr-2 w-4 h-4'/>
                        )}
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog