import Image from "next/image";

const DogsList = ({ dogs }) => {
  return (
    <ul>
      {dogs?.map(({ id, name, breed, image }) => (
        <li key={id}>
          <p>{name}</p>
          <p>{breed}</p>
          <Image src={image} alt={name} width={640} height={480} />
        </li>
      ))}
    </ul>
  );
};
export default DogsList;
