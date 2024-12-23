"use client"

import Image from "next/image"
import { SetStateAction, useEffect, useRef, useState } from "react"
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

const Grid =({className,children}:any)=>{

    return(<>
    <div className={`grid grid-flow-row-dense grid-cols-3  w-full ${className}`}> 
    {children}
    </div>
    </>)
}
const GridContainer =({className,children}:any)=>{

    return(<>
    <div className={`grid grid-cols-5 w-full text-wrap ${className}`}> 
    {children}
    </div>
    </>)
}
const GridInputText = ({onChange,value,placeholder,className}:any)=>{
return(<>
<input type="text" placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} value={value} className={`${className?className:"max-w-[14rem] min-w-[10rem]"}  max-h-[1.5rem] min-h-[1.5rem]  px-[1rem] py-[0.5rem] border border-[#999999] border-solid rounded-sm`}/>
</>)
}
const GridInputSelect = ({onChange,value,defaultValue,className,defaultText="Select an option",children}:any)=>{
    return(<>
    <select defaultValue="default" onChange={(e)=>{onChange(e.target.value)}}  className={`${className?className:"max-w-[14rem] min-w-[10rem]"} font-thin text-[0.7rem] lg:text-[1rem] max-h-[1.5rem] min-h-[2.5rem]  px-[1rem] py-[0.5rem] border border-[#999999] border-solid rounded-sm `}>
    <option value="default" disabled>
        {defaultText}
      </option>
   {children}
    </select>
    </>)
    }
    const GridInputFile = ({onChange,value,defaultValue,className,children,saveFile,saveTumbnail}:any)=>{
      const [images, setImages] = useState<any[]>([]);
      const [images2, setImages2] = useState<any[]>([]);
      
      const [thumbnail, setThumbnail] = useState<string | null>(null);

      const videoRef = useRef<HTMLVideoElement>(null);
     const xy:any = {
      "세로":{btn1:"",btn2:"hidden"},
      "세로 1:1":{btn1:"top-[25%] left-[calc(50%_-)]",btn2:"top-[70%] left-[colc(50%_-)]"},
      "세로 1:2":{btn1:"top-[10%] left-[calc(50%_-)]",btn2:"top-[58%] left-[colc(50%_-)]"},
      "세로 2:1":{btn1:"top-[33%] left-[calc(50%_-)]",btn2:"top-[80%] left-[colc(50%_-)]"},
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>,imgclass:String) => {
      const files:any = e.target.files;
      if (imgclass==="img1"){
        if (files?.[0].type.startsWith('video/mp4')) {

         

          ConvertMP4(files[0],setImages)
          ConvertMP4(files[0],saveTumbnail)
        saveFile((prev: any) => [...prev, files[0]]);
  
     
      }else {
        setImages((prev:any) => [...prev, URL.createObjectURL(files[0])])
        saveTumbnail((prev: any) => [...prev, URL.createObjectURL(files[0])])
        saveFile((prev: any) => [...prev, files[0]]);
      
      }    
      }

    };


      const handleRemoveImage = (index: number,imgclass:any) => {
        if(imgclass==="img1"){
        setImages((prev:any[]) => prev.filter((_, i) => i !== index));
        saveFile((prev: any[]) => prev.filter((_, i) => i !== index));
      
        }
       
      };
      
    
      const ConvertMP4 = (videoFile: Blob | MediaSource,set:any) => {
        const videoElement = document.createElement('video'); // 새로운 비디오 요소 생성
        videoElement.src = URL.createObjectURL(videoFile); // Blob URL 설정
        videoElement.crossOrigin = 'anonymous'; // CORS 문제가 있는 경우
      
        videoElement.onloadeddata = () => {
          console.log('비디오 로드 완료');
      
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth || 640; // 기본 너비 설정
          canvas.height = videoElement.videoHeight || 360; // 기본 높이 설정
      
          videoElement.currentTime = 1; // 특정 시간으로 이동
      
          videoElement.onseeked = () => {
            console.log('특정 시간으로 이동 완료');
      
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              const imageUrl = canvas.toDataURL('image/jpeg'); // 이미지 URL 생성
              console.log('썸네일 URL:', imageUrl);
              
              set((prev: any)=>[...prev,imageUrl]); // 상태 업데이트
            } else {
              console.error('캔버스 컨텍스트 생성 실패');
            }
          };
        };
      
        videoElement.onerror = (error) => {
          console.error('비디오 로드 중 오류:', error);
        };
      };
        return (<>
           <div className="w-full h-full">
            <div className=" border border-gray-300 rounded-md w-full max-w-2xl">
      {/* 파일 입력 */}
      <div className="flex flex-nowrap w-full items-center space-x-2 mb-4">
        <input
          type="text"
          value={String(images[0]?.name?images[0]?.name:"파일을 업로드 해주세요")}
          placeholder="입력하세요."
          className="flex-1 border border-gray-300 text-gray-500 rounded-md p-2 text-sm focus:outline-blue-500"
        />
        <label
              htmlFor="fileInput"        
            
        className="bg-[#485C6D] text-white px-4 py-2 max-w-[8rem] text-sm rounded-md hover:bg-blue-600">
          찾아보기
        </label>
      </div>

      {/* 가이드 정보 */}
      <div className="grid gird-cols-1 lg:grid-cols-2 gap-4 bg-[#F0F0F0] px-4 pb-4 rounded-md text-sm text-gray-700">
        {/* 해상도 사이즈 */}
        <div className="rounded-md">
          <h3 className="text-[0.8rem] text-textblue font-bold mb-1">[ 해상도 사이즈 ]</h3>
          <span className="space-y-1 text-[0.7rem]">
            <div>• 보도측 디스플레이: 800 x 1280px</div>
            <div>• 차도측 디스플레이: 800 x 2560px</div>
            <div>
              * 규격 사이즈와 상이 할 경우 콘텐츠가 왜곡되어 보입니다.
            </div>
          </span>
        </div>

        {/* 콘텐츠 파일 가이드 */}
        <div className=" rounded-md">
          <h3 className="text-[0.8rem] text-textblue font-bold mb-1 ">[ 콘텐츠 파일 가이드 ]</h3>
          <span className="space-y-1 text-[0.7rem]">
            <div>• 이미지: jpeg (Good Quality), 최대 용량 6MB</div>
            <div>• 동영상: mp4 (H.264, 4K 30fps), 최대 용량 300MB</div>
            <div>* 동영상은 15초 단위로 반복됩니다.</div>
            <div>* 사운드 출력은 지원되지 않습니다.</div>
          </span>
        </div>
      </div>
    </div>
          <div className="p-4">
            {/* 파일 입력 버튼 */}

            <input
              id="fileInput"
              type="file"
              accept="image/*,video/mp4"
              multiple
              className="hidden"
              onChange={(e)=>images.length>0?alert("파일은 최대 1개 업로드 가능합니다."):handleFileChange(e,"img1")}
            />
      
            {/* 업로드된 이미지 미리보기 */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center border border-gray-300 rounded-lg p-2"
                >
                  <img
                    src={(image)}
                    alt={`Uploaded ${index}`}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    onClick={() => handleRemoveImage(index,"img1")}
                  >
                    ×
                  </button>
                  <p className="mt-2 text-sm text-gray-700">{image.name}</p>
                </div>
              ))}
            </div>
          </div>
          {children}
          </div>
        </>);
      };
      const GridInputFileHorizontal = ({classImage,select_templete,select_image,children,saveTumbnail1,saveTumbnail2,saveFile1,saveFile2}:any)=>{
        const [images, setImages] = useState<any[]>([]);
        const [images2, setImages2] = useState<any[]>([]);
        
        const videoRef = useRef<HTMLVideoElement>(null);
       const xy:any = {
        "세로":{btn1:"",btn2:"hidden"},
        "세로 1:1":{btn1:"top-[25%] left-[calc(50%_-)]",btn2:"top-[70%] left-[colc(50%_-)]"},
        "세로 1:2":{btn1:"top-[10%] left-[calc(50%_-)]",btn2:"top-[58%] left-[colc(50%_-)]"},
        "세로 2:1":{btn1:"top-[33%] left-[calc(50%_-)]",btn2:"top-[80%] left-[colc(50%_-)]"},
      }
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>,imgclass:String) => {
          const files:any = e.target.files;
          if (imgclass==="img1"){
            if (files?.[0].type.startsWith('video/mp4')) {

             

              ConvertMP4(files[0],setImages)
              ConvertMP4(files[0],saveTumbnail1)
            saveFile1((prev: any) => [...prev, files?.[0]]);
      
         
          }else{
            setImages((prev:any) => [...prev, URL.createObjectURL(files[0])])
            saveTumbnail1((prev: any) => [...prev, URL.createObjectURL(files[0])])
            saveFile1((prev: any) => [...prev, files?.[0]]);
          
          }    
          }else{
            if (files?.[0].type.startsWith('video/mp4')) {
           
            ConvertMP4(files[0],setImages2)
            ConvertMP4(files[0],saveTumbnail2)
            saveFile2((prev: any) => [...prev, files?.[0]]);
           
          }else{
            setImages2((prev:any) => [...prev, URL.createObjectURL(files[0])])
            saveTumbnail2((prev: any) => [...prev, URL.createObjectURL(files[0])])
            saveFile2((prev: any) => [...prev, files?.[0]]);
           
          } 
          }
 
        };


        const handleRemoveImage = (index: number,imgclass:any) => {
          if(imgclass==="img1"){
          setImages((prev:any[]) => prev.filter((_, i) => i !== index));
          saveFile1((prev: any[]) => prev.filter((_, i) => i !== index));
          saveTumbnail1((prev: any[]) => prev.filter((_, i) => i !== index));
          }else{
            setImages2((prev:any[]) => prev.filter((_, i) => i !== index));
            saveFile2((prev: any[]) => prev.filter((_, i) => i !== index));
            saveTumbnail2((prev: any[]) => prev.filter((_, i) => i !== index));
          }
         
        };
        
      
        const ConvertMP4 = (videoFile: Blob | MediaSource,set:any) => {
          const videoElement = document.createElement('video'); // 새로운 비디오 요소 생성
          videoElement.src = URL.createObjectURL(videoFile); // Blob URL 설정
          videoElement.crossOrigin = 'anonymous'; // CORS 문제가 있는 경우
        
          videoElement.onloadeddata = () => {
            console.log('비디오 로드 완료');
        
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth || 640; // 기본 너비 설정
            canvas.height = videoElement.videoHeight || 360; // 기본 높이 설정
        
            videoElement.currentTime = 1; // 특정 시간으로 이동
        
            videoElement.onseeked = () => {
              console.log('특정 시간으로 이동 완료');
        
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                const imageUrl = canvas.toDataURL('image/jpeg'); // 이미지 URL 생성
                console.log('썸네일 URL:', imageUrl);
                
                set((prev: any)=>[...prev,imageUrl]); // 상태 업데이트
              } else {
                console.error('캔버스 컨텍스트 생성 실패');
              }
            };
          };
        
          videoElement.onerror = (error) => {
            console.error('비디오 로드 중 오류:', error);
          };
        };
        return (<>

           <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 ">
            <section className="py-[1rem] justify-center items-center flex flex-col">
           <div className="flex justify-center items-center flex-col ">
            <div className="relative flex items-center justify-center aspect-square bg-[#BFD5E9] border-sm py-[1rem] px-[3rem]">
           <Image className={`object-contain lg:w-[20rem] lg:h-[20rem] ${classImage}`} src={select_image} alt={""}/>
           <label
              htmlFor="fileInput"        
               
        className={` absolute ${xy[select_templete]["btn1"]} bg-[#485C6D] text-white px-4 py-2 max-w-[8rem] text-sm rounded-md hover:bg-blue-600`}>
          파일업로드
        </label>
        <label
              htmlFor="fileInput2"        
               
        className={` absolute ${xy[select_templete]["btn2"]} bg-[#485C6D] text-white px-4 py-2 max-w-[8rem] text-sm rounded-md hover:bg-blue-600`}>
          파일업로드
        </label>         
            </div>
            <div className="mt-[1rem] bg-black text-sm text-center w-[5rem] text-white px-[0.7rem] rounded-xl py-[0.3rem]">{select_templete}</div>
            </div>
            </section>
            <div className=" border border-gray-300 rounded-md w-full max-w-2xl">
      {/* 파일 입력 */}
      <div className="flex flex-nowrap w-full items-center  space-x-2 mb-4">
        <input
          type="text"
          value={String(images[0]?.name?images[0]?.name:"파일을 업로드 해주세요")}
          placeholder="입력하세요."
          className="hidden flex-1 border border-gray-300 text-gray-500 rounded-md p-2 text-sm focus:outline-blue-500"
        />

      </div>
      <section className="w-full h-full flex flex-col space-y-4">
      <div className="w-full flex flex-row leading-5">
      <div className="text-sm w-[6rem] mr-[5%] flex-col border-textblue">
      <div className="h-[2px] w-[2rem] bg-[#1292F5] mb-[0.2rem]"/>
        파일 업로드<br/>방법</div>
      <div className="w-full flex flex-col gap-4 bg-[#F0F0F0] px-4 pb-4 rounded-md text-sm text-gray-700">
      
      <div className="rounded-md">
          
          <h3 className="text-[0.8rem] text-textblue font-bold mb-1"></h3>
          <span className=" text-[0.7rem]">
            <div className="">1. 각 영역에 있는 <b className="text-textblue ">파일 업로드 버튼을 클릭</b>하세요!</div>
            <div>2. 라이브러리에 업로드 한 <b className="text-textblue ">영상, 이미지 등을 선택</b>하세요.</div>

          </span>
        </div>
        </div>
        
      </div>
      {/* 가이드 정보 */}
      <div className="w-full flex flex-row">
      <div className="text-sm w-[6rem] mr-[5%] flex-col border-textblue">
      <div className="h-[2px] w-[2rem] bg-[#1292F5] mb-[0.2rem]"/>
        광고규격<br/>가이드</div>
      <div className="w-full flex flex-col gap-4 bg-[#F0F0F0] px-4 pb-4 rounded-md text-sm text-gray-700">
        {/* 해상도 사이즈 */}
        <div className="rounded-md">
          <h3 className="text-[0.8rem] text-textblue font-bold mb-1">[ 해상도 사이즈 ]</h3>
          <span className="space-y-1 text-[0.7rem]">
            <div>• LCD: 800 x 55인치(in)</div>
            <div>• LED 앞면: 800x1280 px</div>
            <div>• LED 뒷면: 800x2560 px</div>
            <div>
              * 규격 사이즈와 상이 할 경우 콘텐츠가 왜곡되어 보입니다.
            </div>
          </span>
        </div>

        {/* 콘텐츠 파일 가이드 */}
        <div className=" rounded-md">
          <h3 className="text-[0.8rem] text-textblue font-bold mb-1 ">[ 콘텐츠 파일 가이드 ]</h3>
          <span className="space-y-1 text-[0.7rem]">
            <div>• 이미지: jpeg (Good Quality), 최대 용량 6MB</div>
            <div>• 동영상: mp4 (H.264, 4K 30fps), 최대 용량 300MB</div>
            <div>* 동영상은 15초 단위로 반복됩니다.</div>
            <div>* 사운드 출력은 지원되지 않습니다.</div>
          </span>
        </div>
      </div>
      </div>
      </section>
    </div>
          <div className="p-4">
            {/* 파일 입력 버튼 */}

            <input
              id="fileInput"
              type="file"
              accept="image/*,video/mp4"
              multiple
              className="hidden"
              onChange={(e)=>images.length>0?alert("파일은 최대 1개 업로드 가능합니다."):handleFileChange(e,"img1")}
            />
                  <input
              id="fileInput2"
              type="file"
              accept="image/*,video/mp4"
              multiple
              className="hidden"
              onChange={(e)=>images2.length>0?alert("파일은 최대 1개 업로드 가능합니다."):handleFileChange(e,"img2")}
            />
            {/* 업로드된 이미지 미리보기 */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center border border-gray-300 rounded-lg p-2"
                >
                  <img
                    src={(image)}
                    alt={`Uploaded ${index}`}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    onClick={() => handleRemoveImage(index,"img1")}
                  >
                    ×
                  </button>
                  <p className="mt-2 text-sm text-gray-700">{image.name}</p>
              
                </div>
              ))}
                            {images2.map((image, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center border border-gray-300 rounded-lg p-2"
                >
                  <img
                    src={(image)}
                    alt={`Uploaded ${index}`}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    onClick={() => handleRemoveImage(index,"img2")}
                  >
                    ×
                  </button>
                  <p className="mt-2 text-sm text-gray-700">{image.name}</p>
                </div>
              ))}

                 
            </div>
          </div>
          {children}
          </div>
        </>);
      };
const GridImageCheckbox =({checked,onChange,value,className,boxlist,classTitle,children,classImage,checknum}:any)=>{
    const checkOnlyOne = (checkThis: any) => {
        const checkboxes:any = document.getElementsByName('test'+String(checknum))
        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i] !== checkThis) {
            checkboxes[i].checked = false
          }else{
            checkboxes[i].checked = true
          }
        }
      }
 
    return(<>
    <div className="w-full h-full flex flex-row items-center justify-start space-x-4 overflow-x-auto">
        {boxlist.map((item:any,index:number)=>(<>
        <div className={`${item.tf===false&&"opacity-40 pointer-events-none"}`}>
        <div className={` rounded-md flex justify-center items-center relative max-w-[20rem] px-[0.7rem] py-[0.2rem] bg-[#172731] text-white ${className}`}>

            
        {typeof item.image ==="function"?(<><item.image className={`object-contain ${classImage}`}/></>):<Image className={`object-contain ${classImage}`} src={item.image} alt={""}/>}

        <div className=" absolute flex justify-center items-center text-[0.7rem] text-white font-bold">{item.subtitle}</div>
        
        </div>

        <div className="flex flex-row w-full items-center space-x-2 pt-[0.5rem]"><input name={`test${String(checknum)}`} defaultChecked={index==0?true:false} value={item.title} onChange={(e) => {
            onChange(e.target.value)
            checkOnlyOne(e.target)}} type="checkbox"></input><p className={`m-0 ${classTitle}`}>{item.title}</p> </div>
        
        </div>
        </>))}
        </div>   
    </>)
}
const GridCheckboxList =({onChange,value,className,boxlist,children,classImage,checknum}:any)=>{
  const checkOnlyOne = (checkThis: any) => {
    const checkboxes:any = document.getElementsByName('test'+String(checknum))
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false
      }else{
        checkboxes[i].checked = true
      }
    }
  }
 
    return(<>
    <div className=" w-full h-full flex flex-row items-center justify-start space-x-2 overflow-x-auto">
        
        {boxlist.map((item:any)=>(<>
        <div>
       
        <div className="flex flex-row w-full items-center space-x-2 pt-[0.5rem]"><input name={`test${String(checknum)}`}  value={item.title} onChange={(e) => {
            onChange(e.target.value)
            checkOnlyOne(e.target)}} type="checkbox"></input>
            <p className="m-0">{item.title}</p> 
            </div>
        
        </div>
        </>))}
        </div>   
    </>)
}

    const GridSideScroll = ({children}:any)=>{
        return(<>
        <div className="w-full flex flex-row overflow-x-auto scroll-m-3">{children}</div>
        </>)
        }   
const GridSlider = ()=>{

    const sliderRef = useRef<any>(null);
    const isDragging = useRef<any>(false); // 드래그 상태
    const startX = useRef<any>(0); // 드래그 시작 위치
    const scrollLeft = useRef<any>(0); // 드래그 시작 시 스크롤 위치
    const [dragging, setDragging] = useState<any>(false);
  
    const handleMouseDown = (e: { pageX: number }) => {
      isDragging.current = true;
      setDragging(true);
      startX.current = e.pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
    };
  
    const handleMouseMove = (e: { pageX: number }) => {
      if (!isDragging.current) return;
  
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5; // 드래그 거리
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
    };
  
    const handleMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
    };
  
    const handleTouchStart = (e: any) => {
      isDragging.current = true;
      setDragging(true);
      startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
      scrollLeft.current = sliderRef.current.scrollLeft;
    };
  
    const handleTouchMove = (e: any) => {
      if (!isDragging.current) return;
  
      const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      sliderRef.current.scrollLeft = scrollLeft.current - walk;
    };
  
    const handleTouchEnd = () => {
      isDragging.current = false;
      setDragging(false);
    };
  
    return (
      <div className="relative">
        {/* 드래그 가능한 슬라이더 */}
        <div
          ref={sliderRef}
          className={`overflow-x-scroll flex scroll-snap-x mandatory [&::-webkit-scrollbar]:hidden ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="min-w-[250px] h-[150px] bg-red-500 flex items-center justify-center scroll-snap-start">
            Slide 1
          </div>
          <div className="min-w-[250px] h-[150px] bg-blue-500 flex items-center justify-center scroll-snap-start">
            Slide 2
          </div>
          <div className="min-w-[250px] h-[150px] bg-green-500 flex items-center justify-center scroll-snap-start">
            Slide 3
          </div>
          <div className="min-w-[250px] h-[150px] bg-yellow-500 flex items-center justify-center scroll-snap-start">
            Slide 4
          </div>
        </div>
      </div>
    );
  };
  
const GridTitle =({title,className,subtitle}:any)=>{

    return(<>

<div className={`w-full flex flex-col font-semibold items-center justify-start ${className} mt-[3%]`}>
    <h1 className={`w-full text-[1.3rem] lg:text-[1.8rem] flex flex-row space-x-2 items-center ${className}`}><p className="m-0">{title}</p>  {subtitle&&<p className={`m-0 border-2 text-[0.7rem] lg:text-[1rem] text-center  border-solid rounded-xl py-[0.25rem] px-[1rem] text-[#1292F5] border-[#1292F5]`} style={{color:subtitle==="반려"?"gray":"#1292F5",borderColor:subtitle==="반려"?"gray":"#1292F5"}}>{subtitle}</p>}</h1>
 <div className={`w-full h-[2px] bg-[#384958]  ${className}`}/>
 
    </div>    

    </>)
}
const GridTitleBetween =({title,className,subtitle,children}:any)=>{

  return(<>

<div className={`w-full flex flex-col font-semibold items-center justify-start ${className} mt-[3%]`}>
  <h1 className={`w-full text-[1.3rem] lg:text-[1.8rem] flex flex-row space-x-2 items-center justify-between ${className}`}><p className="m-0">{title}</p> {children}  {subtitle&&<p className={`m-0 border-2 text-[0.7rem] lg:text-[1rem] text-center  border-solid rounded-xl py-[0.25rem] px-[1rem] text-[#1292F5] border-[#1292F5]`} style={{color:subtitle==="반려"?"gray":"#1292F5",borderColor:subtitle==="반려"?"gray":"#1292F5"}}>{subtitle}</p>}</h1>

<div className={`w-full h-[2px] bg-[#384958]  ${className}`}/>

  </div>    

  </>)
}

const GridItem =({title,className,children}:any)=>{

    return(<>

<div className={`text-start text-[0.7rem] mt-[0.5rem] text-wrap flex-wrap lg:text-[1rem] justify-start font-[550] p-[0.5rem] min-h-[2rem] border-b-[1px] border-[#D8D8D8] border-solid ${className}`}>

• {title}

    </div>
    <div className={` w-[calc(100%_-1rem)] items-center text-wrap flex-wrap font-thin text-[0.7rem] lg:text-[1rem]  justify-start min-h-[2rem] p-[0.5rem] col-span-4 border-b-[1px] border-[#D8D8D8] border-solid ${className}`}>
<div className="w-full h-full flex flex-col justify-center">
{children}
</div>
    </div>        


    </>)

}
const GridItemCN =({title,className,children,className_title,className_item}:any)=>{

    return(<>

<div className={`text-start text-wrap flex-wrap  justify-start font-[550] p-[0.5rem] min-h-[1rem] border-b-[1px] border-[#D8D8D8] border-solid ${className_title?className_title:"text-[0.7rem] lg:text-[1rem]"}`}>

{title}

    </div>
    <div className={` w-[calc(100%_-1rem)] items-center text-wrap flex-wrap font-thin  justify-start min-h-[1rem] p-[0.5rem] col-span-4 border-b-[1px] border-[#D8D8D8] border-solid ${className_item?className_item:"text-[0.7rem] lg:text-[1rem]"}`}>
<div className="w-full h-full flex flex-col justify-center">
{children}
</div>
    </div>        


    </>)

}
export {Grid,GridTitle,GridTitleBetween,GridItem,GridContainer,GridInputText,GridInputSelect,GridSlider,GridSideScroll,GridImageCheckbox,GridInputFile,GridInputFileHorizontal,GridCheckboxList,GridItemCN}

