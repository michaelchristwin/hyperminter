"use client";

import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/appContext";
import { Chain } from "viem";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HyperCertCardProps {
  name: string;
  logoImg: string;
  bannerImg: string;
  roundId: string;
  chain: Chain;
  bannerPattern: string;
  gradient: string;
}
function HyperCertCard({
  name,
  bannerImg,
  logoImg,
  roundId,
  chain,
  gradient,
  bannerPattern,
}: HyperCertCardProps) {
  const { isConnected, chainId } = useWeb3ModalAccount();
  const [isClicked, setIsClicked] = useState(false);
  const { open } = useWeb3Modal();
  const router = useRouter();
  const { setCorrectNetwork, setIsWrongNetwork, setRoundColor } =
    useAppContext();
  const handleClick = async () => {
    setRoundColor({
      pattern: "",
      color: "",
    });
    setIsClicked(false);
    if (!isConnected) {
      setIsClicked(true);
      open();
    } else if (isConnected) {
      router.push(`/form?chainId=${chain?.id}&roundId=${roundId}`);
      setRoundColor({
        pattern: bannerPattern,
        color: gradient,
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (isClicked && isConnected && chain) {
          setRoundColor({
            pattern: "",
            color: "",
          });
          console.log("Route effect ran");
          router.push(`/form?chainId=${chain.id}&roundId=${roundId}`);
          setRoundColor({
            pattern: bannerPattern,
            color: gradient,
          });
          setIsClicked(false);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [
    isClicked,
    isConnected,
    roundId,
    chain,
    router,
    bannerPattern,
    gradient,
    setRoundColor,
    chainId,
    setCorrectNetwork,
    setIsWrongNetwork,
  ]);
  return (
    <div
      className={`block max-w-[300px] relative w-[100%] h-[380px] rounded-[12px]`}
    >
      <Image
        className={`max-w-[300px] w-[100%] rounded-[12px] h-[380px]`}
        alt="bg-image"
        src={`${bannerImg}`}
        loading="lazy"
        width={300}
        height={360}
      />
      <div
        className={`w-full h-[100%] absolute bottom-[0px] rounded-[12px] p-3`}
        style={{
          background: `linear-gradient(to bottom, rgba(226,188,245,0.25) 15%, ${gradient} 75%), url("${bannerPattern}") center/cover no-repeat`,
        }}
      >
        <div className={`flex justify-start`}>
          <Image
            width={40}
            height={40}
            alt="logo"
            loading="lazy"
            src={`${logoImg as string}`}
            className={`w-[40px] h-[40px] rounded-full`}
          />
        </div>
        <div
          className={`border-t-2 border-b block border-black min-h-[100px] h-fit mt-[130px]`}
        >
          <p className={`font-[600] text-[22px]`}>{name}</p>
        </div>
        <div className={`flex justify-between w-full pt-2 text-black`}>
          <div className={`block`}>
            <p className={`font-bold text-[13px]`}>Work</p>
            <div className={`grid grid-cols-2 gap-2`}></div>
          </div>
          <div className={`flex items-cente`}>
            <p className={`text-[14px]`}>work-start</p>
            <p className={`text-[13px] space-x-1`}>&rarr;</p>
            <p className={`text-[14px]`}>work-end</p>
          </div>
        </div>
        <button
          className={`text-black mx-auto bg-["${gradient}"] backdrop-filter backdrop-brightness-150 block mt-[20px] w-fit hover:opacity-80 active:opacity-65 px-2 h-[35px] rounded-lg`}
          type="button"
          onClick={handleClick}
        >
          Mint HyperCert
        </button>
      </div>
    </div>
  );
}

export default HyperCertCard;
