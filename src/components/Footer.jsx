import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full bg-black text-white flex-col flex justify-center items-center p-2'>
      <div className="text-xl">&copy; MudassarMajeed5 all rights reserved</div>
      <div className='text-sm'>Your Personal Password Manager | Made by <a className='hover:underline no-underline underline-offset-4' target='_blank' href="https://mudasar.netlify.app">Mudassar</a></div>
    </div>
  )
}

export default Footer
