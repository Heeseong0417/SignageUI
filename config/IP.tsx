
const IP = "http://localhost:5000"
const headersIP=(token:any)=> {
    return {
    'Content-Type': 'application/json', // 요청 본문의 타입
    
    'Authorization': `Bearer ${token}` // 인증 토큰
  }}
  const headers ={
  
    'Content-Type': 'application/json' // 요청 본문의 타입
    
   
  }

export {IP,headers,headersIP} 