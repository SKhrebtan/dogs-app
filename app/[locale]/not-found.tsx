import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[30px]">
      <h2 className="text-6xl font-bold text-gray-900">Not Found- 404</h2>
      <p className="text-2xl text-gray-600">Could not find requested resource</p>
      <Link href="/" className='p-[10px] bg-slate-400 rounded-lg hover:bg-slate-700 ease-linear transition 300'>Return Home</Link>
    </div>
  )
}