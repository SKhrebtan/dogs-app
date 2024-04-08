'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import LangBtnList from "../../langSwitcher/LangBtnList";
import { useTranslation } from "react-i18next";
import { setCurrentToken } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";
import BurgerSvg from "../../assets/images/burger.svg";
import CloseSvg from "../../assets/images/close.svg";
import { motion, AnimatePresence } from "framer-motion"

export default function MobileNav() {
    const [showMenu, setShowMenu] = useState(false)
     const { t, i18n:{language} } = useTranslation();
const dispatch = useDispatch()
    const pathname = usePathname();
    
    const { data: session } = useSession();
    useEffect(() => {
        if (showMenu) {
         document.body.style.overflow = 'hidden';
        } else {
       document.body.style.overflow = 'auto';
    }
},[showMenu])
    const user: any = session?.user;
    const handleMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        <>
             <AnimatePresence>
                {showMenu && <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3 }}
                    className={`fixed z-50 h-screen w-screen bg-yellow-100 ${showMenu ? 'overflow-hidden': 'overflow-auto'}`}>
                <CloseSvg
                    onClick={() => setShowMenu(false)}
                    className="absolute right-[25px] top-[25px] hover:fill-blue-300 hover:rotate-180 ease-linear duration-300 cursor-pointer" />
                <ul className='flex flex-col gap-6 items-start pl-[60px] pt-[40px]'>
                    <div className='flex flex-col gap-6 mb-[60px]'>
                        <Link href='/' onClick={handleMenu}>
                            <li className={`${pathname === `/${language}` ? 'text-2xl text-blue-500 underline underline-offset-8' : 'text-2xl'} `}>{t('home')}</li>
                        </Link>
                        {user?.role === 'user' && <Link onClick={handleMenu} href='/mydogs'>
                            <li
                                className={`${pathname === `/${language}/mydogs` ? 'text-2xl text-blue-500 underline underline-offset-8' : 'text-2xl'} `}
                            >{t('mydogs')}</li>
                        </Link>}
                        {user?.role === 'admin' && <Link onClick={handleMenu} className="ml-5" href='/dashboard'>
                            <li
                                className={`${pathname === `/${language}/dashboard` ? 'text-2xl text-blue-500 underline underline-offset-8' : ''} `}
                            >{t('dashboard')}</li>
                        </Link>}
                    </div>
                    <div className='flex flex-col items-start gap-[10px]'>
                        
                    
                        {!user ? (
                            <div className="flex flex-col gap-[20px] mb-[30px]">
                                <Link
                                    onClick={handleMenu}
                                    href='/login'>
                                    <li className={`${pathname === `/${language}/login` ? 'text-xl text-blue-500 underline underline-offset-8' : 'text-xl'} `}>Login</li>
                                </Link>
                                <Link onClick={handleMenu} href='/register'>
                                    <li className={`${pathname === `/${language}/register` ? 'text-xl text-blue-500 underline underline-offset-8' : 'text-xl'} `}>Register</li>
                                </Link>
                            </div>
                        ) :
                            <div className="flex flex-row items-center gap-[10px]">
                                {user?.email}
                                <li>
                                    <button
                                        onClick={() => {
                                            signOut()
                                            dispatch(setCurrentToken(null))
                                        }}
                                        className='p-[5px] bg-blue-500 rounded-full'
                                        type='button'>Logout</button>
                                </li>
                            </div>
                        }
                        <LangBtnList />
                    </div>
              
                </ul>
            </motion.div>}
          </AnimatePresence>
                
                {/* <div className='w-screen h-[50px]'></div> */}
            <div className="flex flex-row w-screen justify-end p-[10px] bg-blue-300">
            <BurgerSvg
                onClick={handleMenu}
                className="fill-yellow-500"
                        />
                </div>
                
   </>
)
}