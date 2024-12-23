


const hasNoEmptyValues=(jsonObj:any)=> {
    return Object.values(jsonObj).every(
      (value:any) => value !== "" && value !== null && value !== undefined 
    );
  }

  export {hasNoEmptyValues}