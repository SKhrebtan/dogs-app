'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import LangBtnList from "../../langSwitcher/LangBtnList";
import { useTranslation } from "react-i18next";

const DesktopNav = () => {     
    const { t, i18n:{language} } = useTranslation();

    const pathname = usePathname();
    
    const { data: session } = useSession();
    return (
        <div className='h-[45px]'>
            <ul className='flex justify-between m-10 items-center'>
                <div className='flex items-center'>
                    <Link href='/'>
                        <li className={`${pathname === `/${language}` ? 'text-fuchsia-500 underline underline-offset-8' : ''} `}>{t('home')}</li>
                    </Link>
                    {session && <Link className="ml-5" href='/mydogs'>
                       <li
                            className={`${pathname === `/${language}/mydogs`? 'text-fuchsia-500 underline underline-offset-8': '' } `}
                        >{t('mydogs')}</li>
                    </Link>} 
                      </div>
                    <div className='flex items-center gap-10'>
                        
                    <LangBtnList/>
                    {!session ? (
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
                            {session.user?.email}
                            <li>
                                <button
                                onClick={()=>signOut()}
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