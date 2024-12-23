// src/utils/cookieUtils.js
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키 설정 함수
export const setCookie = (name: string, value: any, options = {}) => {
  cookies.set(name, value, {
    path: '/', // 기본 경로 설정
    ...options, // 옵션 병합
  });
};

// 쿠키 가져오기 함수
export const getCookie = (name: string) => {
  return cookies.get(name);
};

// 쿠키 삭제 함수
export const removeCookie = (name: string, options = {}) => {
  cookies.remove(name, {
    path: '/', // 삭제 시에도 path를 설정해야 함
    ...options,
  });
};

// 액세스 토큰, 리프레시 토큰, 사용자 아이디를 함께 저장하는 함수
export const setAuthData = (accessToken: string, refreshToken: string, userId: string,user_type:string) => {
  const authData = {
    accessToken,
    refreshToken,
    userId,
    user_type
  };

  // 객체를 JSON 문자열로 변환하여 저장
  setCookie('authData', JSON.stringify(authData), {
    secure: false, // HTTPS에서만 쿠키 전송
    httpOnly: false, // JavaScript에서 쿠키 접근을 막음
    sameSite: 'Strict', // Cross-site 요청에 대한 보호
  });
};

// 저장된 데이터를 가져오는 함수
export const getAuthData = () => {
  const authData = getCookie('authData');
  
  if (authData) {
    try {
      // JSON 문자열을 다시 객체로 변환
      return JSON.parse(authData);
    } catch (error) {
      console.error('authData 쿠키를 파싱하는 데 오류가 발생했습니다.', error);
      return authData;
    }
  }
  return null;
};

// 쿠키 삭제 함수들
export const removeAuthData = () => {
  removeCookie('authData', { secure: false, httpOnly: false, sameSite: 'Strict' });
};