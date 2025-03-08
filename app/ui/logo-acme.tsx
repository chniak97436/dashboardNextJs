import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function IconAcme() {
  return (
    <div className='flex flex-row items-center loading-none text-white'>
      <GlobeAltIcon className="h-16 w-16 rotate-[20deg]" />
      <p className='text-[44px]'>Acme</p>
    </div>
  )
}