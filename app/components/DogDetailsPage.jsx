import Image from "next/image";
import { useTranslation } from "react-i18next";

const DogDetailsPage = ({ dog }) => {
  const { name, breed, image } = dog;
  const { t } = useTranslation();
  return (
    <div className="p-[20px] flex mobile:flex-col mobile:align-center desktop:flex-row gap-[40px]">
      <div className="mobile:h-[350px] tablet:h-[750px] mobile:w-full desktop:h-[550px] desktop:w-[1050px] p-[20px] relative">
        <Image
          priority
          src={image}
          alt={name}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-row gap-[10px]">
          <p className="text-amber-500 text-3xl">{t("name")}:</p>
          <p className="text-lime-700 text-3xl">{name}</p>
        </div>
        <div className="flex flex-row gap-[10px]">
          <p className="text-amber-500 text-3xl">{t("breed")}:</p>
          <p className="text-lime-700 text-3xl">{breed}</p>
        </div>
      </div>
    </div>
  );
};

export default DogDetailsPage;
