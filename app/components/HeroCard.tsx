function HeroCard() {
  const tags = ["Public Goods", "Hypercerts", "Gitcoin"];
  return (
    <div
      className={`block min-w-[260px] border max-w-[300px] relative w-[330px] h-[380px] rounded-[12px] lg:mx-0 md:mx-0 mx-auto`}
    >
      <div
        className={`w-[40px] h-[40px] absolute left-3 top-3 bg-cover rounded-full`}
        style={{ backgroundImage: `url("/logo.webp")` }}
      />
      <div className={`w-full h-[45%] border rounded-[12px] p-3`}></div>
      <div className={`h-[55%] p-3 rounded-[12px] border bg-purple-300`}>
        <p className={`font-bold text-[20px] text-neutral-700`}>
          Funding Public Goods
        </p>
        <div className="h-px bg-neutral-700 mt-[50px]" />
        <div className={`flex justify-between w-full`}>
          <div className={`block`}>
            <p className={`font-semibold text-[13px] text-neutral-700`}>Work</p>
          </div>
          <div className={`flex items-center space-x-2 font-semibold`}>
            <p className={`text-[14px] text-neutral-700`}>Nov 1, 2024 </p>
            <p className={`text-[13px] text-neutral-700 space-x-1`}>&rarr; </p>
            <p className={`text-[14px] text-neutral-700`}>Nov 30, 2024</p>
          </div>
        </div>
        <div className={`flex w-full flex-wrap mt-[20px] gap-[6px]`}>
          {tags.map((v, i) => (
            <div
              key={i}
              className={`border rounded-[6px] truncate w-fit max-w-[65px] h-fit px-[6px] py-[2px] inline-block border-black items-center text-[12px]`}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
