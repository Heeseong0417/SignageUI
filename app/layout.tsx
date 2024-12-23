"use client"
import Header from "../components/navigation/header/header";
import "./global.css"
import type { NextPage } from "next";
import { createContext, Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./global.css";
import Footer from "../components/navigation/footer/footer";

import {Provider , useDispatch, useSelector} from 'react-redux';
import store from "../tool/redux/store";
import { clearAuthData, setAuthData } from "../tool/redux/slice";
import LoadingOverlay from "../components/loading/LoadingOverlay";
import { usePathname } from 'next/navigation';
import {CookiesProvider} from 'react-cookie';
import { setCookie,getCookie,removeCookie } from "../config/cookies";

const CookieContext = createContext("");



export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    return (
        <html lang="ko">
            <body>
            <LoadingOverlay />
            <CookiesProvider>
            <Suspense fallback={<LoadingOverlay />}>
              {children}
            </Suspense>
    </CookiesProvider>
  
            </body>
        </html>
    );
}