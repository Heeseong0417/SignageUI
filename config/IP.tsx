
const IP = "http://localhost:5000"
const headersIP=(token:any)=> {
    return {
    'Content-Type': 'application/json', // 요청 본문의 타입
    'Accept': 'application/json', // 서버로부터 JSON 응답을 기대
    'Authorization': `Bearer ${token}` // 인증 토큰
  }}
  const headers ={
  
    'Content-Type': 'application/json', // 요청 본문의 타입
    'Accept': 'application/json', // 서버로부터 JSON 응답을 기대
   
  }

export {IP,headers,headersIP} 