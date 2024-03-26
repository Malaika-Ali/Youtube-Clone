import React, {useContext} from 'react'
import { FixedSidebarMenuItems } from '../utils/constants'
import { Context } from '../context/contextApi'

function FixedSidebar() {

    const {lightMode}=useContext(Context);

    return (
        <div className={`md:block hidden w-20 overflow-x-hidden overflow-y-auto h-full py-4 ${lightMode ? 'light-bg' : 'dark-bg'} absolute md:relative z-10`}>
            <div className="flex flex-col items-center justify-between mx-auto gap-1">

                {FixedSidebarMenuItems.map((item) => {
                    return (
                        <>
                            <div className={`flex flex-col  items-center justify-between gap-1.5  cursor-pointer rounded-lg py-4 px-4 overflow-hidden
                            ${lightMode ? 'text-black light-bg-hover' : 'text-gray-50 hover:bg-white/[0.15]'}
                            `}>
                                <span className='text-2xl'>{item.icon}</span>
                                <span className='text-xs'>{item.name}</span>
                            </div>
                        </>
                    )
                })
                }

            </div>
        </div>
    )
}

export default FixedSidebar
