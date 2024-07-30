import React from 'react'
import logo from './../../public/logo.png'
import { Button } from './ui/button'
import { Download, DownloadIcon } from 'lucide-react'

const Header = ({DownloadIcon}) => {
  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
        <img 
            src={logo} 
            alt="logo" 
            className='w-40'
        />
        <Button 
        className="flex gap-2 items-center"
        onClick={()=>DownloadIcon(Date.now())}
        >
          <Download/> Download
        </Button>
    </div>
  )
}

export default Header