"use client"

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import Play from"../../public/play.svg"
import carousel_bg from "../../public/carousel_bg.png"
import Cantplay from"../../public/cantplay.svg"
const Carousel=({data}:any)=>{
    const [currentIndex, setCurrentIndex] = useState(-1);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.min(data.length - 1, 3) : prevIndex - 1));
      };
      
      const handleNext = () => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === Math.min(data.length - 1, 3)) {
            return 0; // 최대 값에 도달하면 처음으로 돌아갑니다.
          }
          return prevIndex + 1; // 현재 값 증가
        });
      };
  
    return (
        <>

      <div style={{backgroundImage:"url('/carousel_bg.png')"}} className="w-full mx-auto  h-full bg-cover relative overflow-hidden bg-[#000000]">
        {/* Carousel Items */}

        <div
          className={`flex transition-transform duration-500 w-[80%] items-center justify-center mx-[10%]  py-[3%]`}
          style={{transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : 1))}%)` }}
        >

          {data.map((item: {
              [x: string]: ReactNode; thumbnail: string | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; admin: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
}, index: Key | null | undefined) => (
            <div
              key={index}
              className={`w-full lg:w-[calc(100%/3)] flex flex-col bg-transparent rounded-[1rem] flex-shrink-0 h-full `}
            >
                <span className="h-full bg-[#172731] mx-[5%] cursor-pointer rounded-[1rem] duration-200 hover:scale-110">
                <div className="text-white font-medium w-full text-lg text-center border-[#213643] border-solid border-b py-[5%]">{item.screen}</div>
                <div className="w-full h-full mb-2 flex items-center justify-center">
              <img
                src={item.thumbnail}
                alt={String(item.title)}
                className="max-h-[12rem] max-w-[8rem] lg:max-h-[18rem] lg:max-w-[10rem] xl:max-h-[16rem] xl:max-w-[13rem] py-[10%] object-certain overflow-hidden"
              />
              </div>
              <div className="p-4 bg-white rounded-br-[1rem] rounded-bl-[1rem] flex justify-between items-center">
                <div className="">  <h2 className=" overflow-hidden  text-lg font-semibold m-0 mb-1">{item.title}</h2>
                <p className=" text-gray-500 m-0 text-xs">관리자: ({item.admin})</p>
                
                </div>
                {item.play?
                <Play className={`h-4 w-4 lg:h-6 lg:w-6 p-2 rounded-full bg-[#0DCE3A] border-[#00B22A] border`}/>
                :
                <Cantplay className={`h-4 w-4 lg:h-6 lg:w-6 p-2 rounded-full bg-[#F81818] border-[#D10606] border`}/>}
            
              </div>
              </span>
            </div>
          ))}
        </div>
  
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-[3%] transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
         &larr;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-[3%] transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
        >
         &rarr; 
        </button>
      </div></>
    );
  };


export default Carousel
