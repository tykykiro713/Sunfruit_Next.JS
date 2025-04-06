export function SectionWave() {
  return (
    <div className="relative w-full">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-[50px] md:h-[100px]"
      >
        <path 
          d="M0,100 Q720,40 1440,100 L1440,120 L0,120 Z" 
          fill="#EBECE5"  
          className="fill-chewsybeige-500"
        />
      </svg>
    </div>
  );
}