import React from 'react'

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({onClick}) => {
  return (
    <button onClick={onClick} className="flex gap-2 justify-center w-fit items-center text-white bg-gray-900 rounded-full px-6 py-2 ">
           <span className='w-[7px] h-[7px] rounded-full bg-secondary'></span> Newsletter signup
          </button>
  )
}

export default Button