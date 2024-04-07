'use client'
import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import LangBtnList from "../../langSwitcher/LangBtnList";
import { useTranslation } from "react-i18next";
import { setCurrentToken } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";
import BurgerSvg from "../../assets/images/burger.svg";
import CloseSvg from "../../assets/images/close.svg";

export default function MobileNav() {
    const [showMenu, setShowMenu] = useState(false)
     const { t, i18n:{language} } = useTranslation();
const dispatch = useDispatch()
    const pathname = usePathname();
    
    const { data: session } = useSession();

    const user: any = session?.user;
    const handleMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        showMenu
            ?
            <div className='fixed z-50 h-screen w-screen bg-yellow-100'>
                <CloseSvg
                    onClick={()=>setShowMenu(false)}
                    style={{ position: 'absolute', right: '25px', top: '25px' }} />
            <ul className='flex flex-col gap-6 items-start pl-[60px] pt-[40px]'>
                <div className='flex flex-col gap-6'>
                    <Link href='/'>
                        <li className={`${pathname === `/${language}` ? 'text-fuchsia-500 underline underline-offset-8' : ''} `}>{t('home')}</li>
                    </Link>
                    {user?.role === 'user' && <Link href='/mydogs'>
                       <li
                            className={`${pathname === `/${language}/mydogs`? 'text-fuchsia-500 underline underline-offset-8': '' } `}
                        >{t('mydogs')}</li>
                    </Link>}
                    {user?.role === 'admin' && <Link className="ml-5" href='/dashboard'>
                       <li
                            className={`${pathname === `/${language}/dashboard`? 'text-fuchsia-500 underline underline-offset-8': '' } `}
                        >{t('dashboard')}</li>
                    </Link>} 
                      </div>
                    <div className='flex flex-col items-start gap-[10px]'>
                        
                    
                    {!user ? (
                        <div className="flex flex-col">
                        <Link href='/login'>
                        <li className={`${pathname === `/${language}/login`? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Login</li>
                    </Link>              
                    <Link href='/register'>
                        <li className={`${pathname === `/${language}/register`? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Register</li>
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
                        <LangBtnList/>
                </div>
              
            </ul>
        </div>
            :
            <div className="flex flex-row justify-end p-[20px] bg-blue-300">
            <BurgerSvg
                onClick={handleMenu}
                className="fill-yellow-500"
                        />
        </div>
   
)
}