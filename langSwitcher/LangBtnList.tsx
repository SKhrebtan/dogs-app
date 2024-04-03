'use client';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

const LangBtnList = () => {
    const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const onClickLanChange = (e: MouseEvent<HTMLButtonElement>) => {
    const newLocale = e.currentTarget.value;

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/;SameSite=None;secure`;
       if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };
  
    return(
<>
        <button
          value='en'
          type="button"
          onClick={onClickLanChange}
          className={`${
  currentLocale === "en" || currentLocale === "" ? 'text-blue-500 font-bold w-20' : 'text-lightGray'
}`}
        >
        EN
      </button>
        <button
          value='ua'
          type="button"
          onClick={onClickLanChange}     className={`${
  currentLocale === "ua" ? 'text-blue-500 font-bold w-20' : 'text-lightGray'
}`}
        >
        UA
      </button>
             </>
    )
}

export default LangBtnList