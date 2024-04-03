
'use client'

import { useState, useEffect } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export const MatchMediaWrapper = () => {
    const [isNarrowScreen, setIsNarrowScreen] = useState<boolean>(false);
     useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 420px)");
    setIsNarrowScreen(mediaWatcher.matches);
    function updateIsNarrowScreen(e: MediaQueryListEvent) {
      setIsNarrowScreen(e.matches);
    }
    if(mediaWatcher.addEventListener) {
      mediaWatcher.addEventListener('change', updateIsNarrowScreen)
      return function cleanup() {
        mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
      }
    } else {
      mediaWatcher.addEventListener('change',updateIsNarrowScreen)
      return function cleanup() {
        mediaWatcher.removeEventListener('change',updateIsNarrowScreen)
      }
    }
    
     }, [isNarrowScreen]);
    return isNarrowScreen ? <MobileNav/> : <DesktopNav/>;
}