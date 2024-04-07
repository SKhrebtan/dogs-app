'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import LangBtnList from "../../langSwitcher/LangBtnList";
import { useTranslation } from "react-i18next";
import { setCurrentToken } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";
const DesktopNav = () => {     
    const { t, i18n:{language} } = useTranslation();
const dispatch = useDispatch()
    const pathname = usePathname();
    
    const { data: session } = useSession();

    const user: any = session?.user;
    return (
        <div className='bg-yellow-200 p-[20px]'>
            <ul className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <Link href='/'>
                        <li className={`${pathname === `/${language}` ? 'text-fuchsia-500 underline underline-offset-8' : ''} `}>{t('home')}</li>
                    </Link>
                    {user?.role === 'user' && <Link className="ml-5" href='/mydogs'>
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
                    <div className='flex items-center gap-10'>
                        
                    <LangBtnList/>
                    {!user ? (
                        <>
                        <Link href='/login'>
                        <li className={`${pathname === `/${language}/login`? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Login</li>
                    </Link>              
                    <Link href='/register'>
                        <li className={`${pathname === `/${language}/register`? 'text-fuchsia-500 underline underline-offset-8': '' } `}>Register</li>
                            </Link>
                        </>
                    ) :
                        <>
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
                        </>
                    }
                </div>
              
            </ul>
        </div>
    )
}
export default DesktopNav;