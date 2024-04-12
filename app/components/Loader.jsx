import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

export const Loader = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height={80}
      width={80}
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClassName="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
};
