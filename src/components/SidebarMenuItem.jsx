import React , {useContext} from 'react'
import { Context } from '../context/contextApi'

export default function SidebarMenuItem({text, icon, className, action}) {

  const {lightMode}=useContext(Context);

  return (
    <div 
    // className={"text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] "+className}

    className={`text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg ${
      lightMode ? 'text-black light-bg-hover' : '  text-white hover:bg-white/[0.15]'
    } ${className}`}
    onClick={action}>
      <span className='text-xl mr-5'>{icon}</span>
      {text}
    </div>
  )
}
