


const Bluebutton=({className,onClick,children}:any)=>{
return(<>
<button onClick={onClick} className={`cursor-pointer transition-all duration-100 hover:scale-105 bg-bgblue hover:bg-textblue flex items-center justify-center text-white px-[2rem] py-[0.4rem] text-center rounded-md ${className}`}>{children}</button> 
</>)

}
const Darkgraybutton=({className,onClick,children}:any)=>{
    return(<>
    <button onClick={onClick} className={`cursor-pointer transition-all duration-100 hover:scale-105 bg-bggray flex items-center justify-center hover:bg-textblue text-white px-[2rem] py-[0.4rem] text-center rounded-md ${className}`}>{children}</button> 
    </>)
    
    }

export  {Bluebutton,Darkgraybutton}