import React from 'react'

const AboutUsBox = ({children}) => {
  return (
    <div className="bg-[#E1E1E1] text-[#272727] mx-auto px-1 md:px-0 text-md md:text-xl max-w-[500px] border rounded-md flex items-center justify-center w-full h-[100px]">
      {children}
    </div>
  );
}

export default AboutUsBox