'use client'

import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useDebounce } from '@/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'
import Text from '@tiptap/extension-text'
import { useCompletion } from 'ai/react'

type Props = {note: NoteType}

const TipTapEditor = ({note}: Props) => {
    const [editorState , setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`)
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveToDB' , {
                noteId: note.id,
                editorState
            })
            return response.data
        },
    })

    const {complete , completion} = useCompletion({
        api: '/api/completion'
    })

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Alt-Shift-a': () => {
                    const promt = this.editor.getText().split(' ').slice(-40).join(' ')
                    //console.log(promt)
                    complete(promt)
                    return true
                }
            }
        },
    })

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit , customText],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML())
        }
    })

    const lastCompletion = React.useRef('')

    React.useEffect(() => {
        if(!completion || !editor) return

        const diff = completion.slice(lastCompletion.current.length)
        lastCompletion.current = completion
        editor.commands.insertContent(diff)
    }, [completion , editor])


    const debounceEditorState = useDebounce(editorState, 1000)
    React.useEffect(() => {
        if(debounceEditorState === '') return
        saveNote.mutate(undefined,{
            onSuccess: data => {
                console.log('saved' , data)
            },
            onError: error => {
                console.log('error' , error)
            }

        })
    }, [debounceEditorState])
  return (
    <>
        <div className='flex gap-2'>
            {editor && <TipTapMenuBar editor={editor} />}
            <Button className='ml-auto' variant={'outline'}>
                {saveNote.isPending ? 'Saving...' : 'Saved'}
            </Button>
        </div>
        <div className='h-4'></div>
        <Separator />
        <div className='prose prose-sm w-full mt-4'>
            <EditorContent editor={editor} />
        </div>
        <div className='h-4'></div>
        <Separator />
        <div className='h-4'></div>
        <span className='text-sm text-slate-600'>
            Tip: Press {' '}
            <kbd className='px-2 py-1 text-sm font-semibold text-slate-700'>Alt + Shift + a</kbd>
            {' '}for AI autocomplete.
        </span>
    </>
  )
}

export default TipTapEditor