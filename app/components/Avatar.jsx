import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updateAvatar } from "../store/auth/operation";
import { useMediaObserver } from "../helpers/useMediaObserver";
export const Avatar = () => {
  const { t } = useTranslation();
  const [showAvatarInfo, setShowAvatarInfo] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatarStore = useSelector((state) => state.auth.avatar);
  const narrowScreen = useMediaObserver();
  const inputRef = useRef(null);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedAvatar) return;
    (async () => {
      const formData = new FormData();
      formData.append("file", selectedAvatar);
      dispatch(updateAvatar(formData));
    })();
  }, [selectedAvatar]);
  let user;
  if (session?.user) {
    user = session?.user;
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e?.target?.files?.[0];
          if (file) {
            setSelectedAvatar(file);
          }
        }}
        style={{ display: "none" }}
      />
      {(avatarStore || user.avatar) && (
        <Image
          onClick={() => inputRef?.current && inputRef.current.click()}
          onMouseEnter={() => setShowAvatarInfo(true)}
          onMouseLeave={() => setShowAvatarInfo(false)}
          src={avatarStore || user.avatar}
          alt={avatarStore || user.avatar || "avatar"}
          width={narrowScreen ? 200 : 60}
          height={narrowScreen ? 200 : 60}
          className="relative cursor-pointer rounded-full"
        />
      )}
      {showAvatarInfo && (
        <div className="absolute p-[2px] rounded-md text-nowrap bg-teal-100">
          {t("updateAvatar")}
        </div>
      )}
    </div>
  );
};
