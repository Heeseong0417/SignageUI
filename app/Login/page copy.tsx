"use client"
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
const Login=()=>{

    return (<>
    <div className=""></div>
  <div className="h-full w-[1920px] relative  flex flex-col items-center justify-center transform 
   bg-red-500 ">
        <div className="relative bg-white w-full h-[2000px] text-left text-sm text-white font-nanumsquare-neo">

      <div className="absolute top-[481px] left-[300px] w-[1320px] h-[61px] text-center text-lg">
        <div className="absolute h-[calc(100%_-_1px)] top-[0px] bottom-[1px] left-[calc(50%_-_300px)] rounded-t-8xs rounded-b-none bg-black w-[300px]">
          <b className="absolute top-[calc(50%_-_15px)] left-[calc(50%_-_36px)] leading-[18px]">
            일반회원
          </b>
          <div className="absolute top-[calc(50%_-_9px)] left-[calc(50%_-_57px)] w-[18px] h-[18px] hidden">
            <div className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-sm bg-white border-darkgray border-[1px] border-solid box-border hidden" />
            <div className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-[9px] bg-snow" />
            <Image
              className="absolute top-[calc(50%_-_3.78px)] left-[calc(50%_-_4.71px)] w-[10.7px] h-[8.5px]"
              width={11}
              height={9}
              alt=""
              src="/check1.svg"
            />
          </div>
        </div>
        <div className="absolute h-[calc(100%_-_1px)] top-[0px] bottom-[1px] left-[calc(50%_-_0px)] rounded-t-8xs rounded-b-none bg-gainsboro w-[300px] text-dimgray-200">
          <b className="absolute top-[calc(50%_-_15px)] left-[calc(50%_-_36px)] leading-[18px]">
            공공회원
          </b>
        </div>
        <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] bg-black h-0.5" />
      </div>
      <div className="absolute flex flex-col items-center justify-center top-[600px] left-[620px] w-[400px] lg:w-[721px] h-[1299px] text-base text-black">
        <div className="absolute w-[calc(100%_-_121px)] top-[0px] right-[81px] left-[40px] h-[91px] text-sm text-darkgray">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <div className="absolute top-[calc(50%_+_7.5px)] left-[25px] leading-[14px]">
            이름
          </div>
          <b className="absolute top-[0px] left-[0px] text-base leading-[16px] text-black">
            이름을 입력해주세요.
          </b>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[120px] right-[81px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            생년월일을 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            생년월일 8자리
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[calc(50%_-_99.5px)] right-[81px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            이메일을 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            이메일
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[calc(50%_+_20.5px)] right-[81px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            사업자명을 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            사업자명
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[calc(50%_+_140.5px)] right-[81px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            사업자등록번호를 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            사업자등록번호
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[calc(50%_+_260.5px)] right-[81px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            업종을 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            업종
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] right-[81px] bottom-[178px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            비밀번호를 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            영문+숫자 조합 8자리이상
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] right-[81px] bottom-[58px] left-[40px] h-[91px]">
          <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            비밀번호를 재입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            비밀번호 재입력
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[calc(50%_-_409.5px)] right-[81px] left-[40px] h-[91px]">
          <div className="absolute bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border w-[490px] h-[60px]" />
          <div className="absolute right-[0px] bottom-[0px] rounded-8xs bg-darkslategray-100 w-[100px] h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px]">
            아이디를 입력해주세요.
          </b>
          <div className="absolute top-[calc(50%_+_5.5px)] left-[25px] text-sm leading-[14px] text-darkgray">
            아이디
          </div>
          <b className="absolute top-[calc(50%_+_3.5px)] right-[17px] leading-[16px] text-white text-center">
            중복확인
          </b>
        </div>
        <div className="absolute w-[calc(100%_-_121px)] top-[calc(50%_-_289.5px)] right-[81px] left-[40px] h-[161px] text-darkgray">
          <div className="absolute top-[calc(50%_-_49.5px)] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border w-[490px] h-[60px]" />
          <div className="absolute bottom-[0px] left-[0px] rounded-8xs border-lightgray-100 border-[1px] border-solid box-border w-[490px] h-[60px]" />
          <div className="absolute top-[calc(50%_-_49.5px)] right-[0px] rounded-8xs bg-darkslategray-100 w-[100px] h-[60px]" />
          <div className="absolute right-[0px] bottom-[0px] rounded-8xs bg-darkslategray-100 w-[100px] h-[60px]" />
          <b className="absolute top-[0px] left-[0px] leading-[16px] text-black">
            휴대폰번호를 입력해주세요.
          </b>
          <b className="absolute bottom-[20px] left-[calc(50%_+_75.75px)] text-sm leading-[14px] text-firebrick">
            2분 30초 남음
          </b>
          <div className="absolute top-[calc(50%_-_29.5px)] left-[25px] text-sm leading-[14px]">
            -없이 휴대폰 번호 입력
          </div>
          <div className="absolute bottom-[21px] left-[25px] text-sm leading-[14px]">
            인증번호 입력
          </div>
          <b className="absolute top-[calc(50%_-_31.5px)] right-[33px] leading-[16px] text-white text-center">
            전송
          </b>
          <b className="absolute right-[33px] bottom-[21px] leading-[16px] text-white text-center">
            인증
          </b>
        </div>
        <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] h-5 text-sm">
          <b className="absolute top-[0px] left-[29px]">
            본인은 회원가입 과정과 광고 신청 관련 주요 안내 사항을 문자 메시지
            또는 이메일로 수신하는 것에 동의합니다.
          </b>
          <div className="absolute h-[calc(100%_-_2px)] top-[2px] bottom-[0px] left-[0px] w-[18px]">
            <div className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-sm bg-white border-darkgray border-[1px] border-solid box-border" />
            <div className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-sm bg-dodgerblue hidden" />
            <Image
              className="absolute top-[calc(50%_-_3.78px)] left-[calc(50%_-_4.71px)] w-[10.7px] h-[8.5px] hidden"
              width={11}
              height={9}
              alt=""
              src="/check.svg"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-[203px] left-[798px] w-[324px] h-[106px] text-center text-lg text-black">
        <div className="absolute bottom-[0px] left-[0px] leading-[18px]">
          회원가입을 위해 본인인증이 필요합니다.
        </div>
        <b className="absolute top-[0px] left-[calc(50%_-_100px)] text-[50px] leading-[50px]">
          회원가입
        </b>
      </div>
      <div className="absolute top-[367px] left-[300px] w-[1320px] h-[54px] text-dimgray-200">
        <div className="absolute top-[3px] left-[0px] bg-red w-[30px] h-[30px]">
          <Image
            className="absolute top-[calc(50%_-_7px)] left-[calc(50%_-_6px)] w-3.5 h-3.5"
            width={14}
            height={14}
            alt=""
            src="/nav-home.svg"
          />
        </div>
        <div className="absolute top-[0px] left-[35px] bg-red w-[26px] h-8">
          <div className="absolute top-[7px] left-[6px] leading-[14px]">홈</div>
        </div>
        <div className="absolute top-[3px] left-[66px] bg-red w-[30px] h-[30px]">
          <Image
            className="absolute top-[calc(50%_-_5.25px)] left-[calc(50%_-_3.25px)] w-[7.1px] h-[7.1px]"
            width={7}
            height={7}
            alt=""
            src="/-58.svg"
          />
          <Image
            className="absolute top-[calc(50%_+_0.75px)] left-[calc(50%_-_3.25px)] w-[6.1px] h-[6.1px]"
            width={6}
            height={6}
            alt=""
            src="/-59.svg"
          />
        </div>
        <div className="absolute top-[0px] left-[101px] bg-red w-[68px] h-8">
          <div className="absolute top-[7px] left-[6px] leading-[14px]">
            회원가입
          </div>
        </div>
        <div className="absolute top-[3px] left-[171px] bg-red w-[30px] h-[30px]">
          <Image
            className="absolute top-[calc(50%_-_5.25px)] left-[calc(50%_-_3.25px)] w-[7.1px] h-[7.1px]"
            width={7}
            height={7}
            alt=""
            src="/-58.svg"
          />
          <Image
            className="absolute top-[calc(50%_+_0.75px)] left-[calc(50%_-_3.25px)] w-[6.1px] h-[6.1px]"
            width={6}
            height={6}
            alt=""
            src="/-59.svg"
          />
        </div>
        <div className="absolute top-[0px] left-[calc(50%_-_454px)] bg-red w-[68px] h-8">
          <div className="absolute top-[7px] left-[6px] leading-[14px]">
            일반회원
          </div>
        </div>
        <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] bg-lightgray-300 h-px" />
      </div>
      
      </div>
    </div></>
      );
    };


export default Login