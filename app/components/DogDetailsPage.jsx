import Image from "next/image";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DogDetailsPage = ({ dog }) => {
  const { name, breed, image } = dog;
  const { t } = useTranslation();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const firstPart = pathParts[1];
  const secondPart = pathParts[2];
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
        <Link
          href={
            secondPart === "alldogs" ? `/${firstPart}` : `/${firstPart}/mydogs`
          }
          className="p-[20px] rounded-md bg-teal-200 hover:bg-teal-600 hover:shadow-lg ease-linear duration-300"
          // onClick={handleClick}
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
};

export default DogDetailsPage;
