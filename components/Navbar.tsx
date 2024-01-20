"use client";
import { useAppContext } from "@/context/appContext";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const font = DM_Sans({
  weight: "600",
  subsets: ["latin"],
});
function Navbar() {
  const { isWrongNetwork, correctNetwork } = useAppContext();
  const CheckNet = () => {
    if (isWrongNetwork) {
      return (
        <button
          className={`bg-red-500 font-semibold border-0 w-fit text-white ${font.className} rounded-[24px] px-3 h-[37px] hover:opacity-80 active:opacity-60`}
        >
          Wrong Network
        </button>
      );
    } else {
      return <w3m-button />;
    }
  };
  return (
    <nav
      className={`flex w-full h-[90px] lg:px-9 md:px-7 px-2 items-center justify-between z-20 fixed top-0 shadow bg-[#ffffff] backdrop-filter backdrop-blur-[20px] bg-opacity-10`}
    >
      <Link href={`/`} className={`flex w-fit items-center space-x-1`}>
        <Image
          className={`rounded-full w-[30px] h-[30px]`}
          width={30}
          height={30}
          src={`/gitcoin.webp`}
          alt="logo"
        />
        <p
          className={`lg:text-[23px] md:text-[22px] text-[20px] font-bold bg-gradient-to-r from-[#3d8b8d] to-[rgba(252,0,255)] text-transparent text-center inline-block bg-clip-text `}
        >
          HYPERMINTER
        </p>
      </Link>
      <div className={`block`}>
        <w3m-button size="sm" />
      </div>
    </nav>
  );
}

export default Navbar;
