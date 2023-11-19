import TypeWriter from '@/components/TypeWriter'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowRight, PenLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import previewImage from '../../public/projectPreview.gif'

export default function Home() {
  return (
    <div className='bg-gradient-to-r from-purple-200 to-teal-100 min-h-screen'>
      <nav className='flex justify-between items-center px-8 py-4 border-b border-green-300'>
        <div className='flex items-center'>
          <PenLine className='w-8 h-8 text-green-600' />
          <div className='w-3'></div>
          <div className='text-lg font-bold text-green-600'>
            NoteAnt.ai
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button className='bg-green-600'>
                Project Overview
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-5xl'>
              <DialogTitle>Project Overview</DialogTitle>
              <Image src={previewImage} alt='Preview' className='rounded-md' />
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-6xl font-semibold text-center'>
          AI powered
          <span className='font-bold text-green-600'> note taking</span> {' '}application
        </h1>
        <div className='mt-10'></div>
        <h2 className='text-2xl text-slate-500 font-bold text-center'>
          <TypeWriter />
        </h2>
        <div className='flex justify-center mt-6'>
          <Link href={'/dashboard'}>
            <Button className='bg-green-600 font-bold'>Get Started <ArrowRight className='ml-2' strokeWidth={3} /></Button>
          </Link>
        </div>
      </div>
      <div className='absolute text-center bottom-6 left-1/2 -translate-x-1/2 font-semibold text-slate-600'>Made by Dhruv Kumar</div>
    </div>
  )
}
