import  React,{createContext, useState } from 'react';

export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <>
      <LoginContext.Provider value={{ account, setAccount }}>
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default ContextProvider;


// import React, { createContext, useState } from 'react'

// export const Logincontext = createContext(null);

// const Contextprovider = ({ children }) => {

//     const [account, setAccount] = useState("");

//     return (
//         <>
//             <Logincontext.Provider value={{ account, setAccount }}>
//                 {children}
//             </Logincontext.Provider>
//         </>
//     )
// }

// export default Contextprovider;