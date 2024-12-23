"use client"
import Header from "../../components/navigation/header/header";

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

    return (
      
         
            <Provider store={store}>
                <Header>
              
    
  
                <div className="relative w-full h-full min-h-[60.775vh] flex">
                <section className="w-full h-full flex flex-col items-center justify-center ">
                <div  className="font-nanumsquare-neo cursor-default flex flex-col items-center justify-center transform w-full h-full overflow-auto">
      {children} 
      </div>
      </section>
    </div>
 

           
                <Footer/>
              </Header>
              </Provider>
          
    );
}