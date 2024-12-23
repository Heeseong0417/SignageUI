"use client"
import Header from "../../components/navigation/header/loginheader";

import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

import Footer from "../../components/navigation/footer/footer";

import {Provider , useDispatch, useSelector} from 'react-redux';
import store from "../../tool/redux/store";
import { clearAuthData, setAuthData } from "../../tool/redux/slice";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [zoom, setZoom] = useState(1);

  const updateZoom = () => {
    // 1920px 기준으로 zoom 값 계산
    const scale = Math.max(0.8, Math.min(1, window.innerWidth / 1920)); // 1920px 기준
    setZoom(scale);
  };
  useEffect(() => {
      updateZoom(); // 초기 실행
      window.addEventListener('resize', updateZoom); // resize 이벤트 핸들러 추가
  
      // 컴포넌트가 언마운트 될 때 이벤트 핸들러 제거
      return () => {
        window.removeEventListener('resize', updateZoom);
      };
    }, []); // 처음 렌더링 시만 실행
    return (
      
         
            <Provider store={store}>
                <Header>
              
    
  
                <div className="relative w-full h-full min-h-[60.775vh] flex">
                <section className="w-full h-full flex flex-col items-center justify-center ">
                <div  className="relative flex items-center justify-center transform w-full h-full ">
                <section className="w-full h-full flex flex-col items-center justify-center ">
                <div style={{ zoom: zoom }} className="relative flex items-center justify-center transform w-full h-full ">
      {children}
      </div></section>
      </div>
      </section>
    </div>
 

           
                <Footer/>
              </Header>
              </Provider>
          
    );
}