import React from 'react'

const Navbar = ({ onLogout }) => {
  return (
    <nav className='bg-purple-200 flex justify-around items-center p-2'>
        <div className="logo font-bold text-2xl text-green-800">PassManager</div>
        <ul className='flex justify-around gap-5 list-none'>
            <li className='text-black'>Home</li>
            <li className='text-black'>Contact</li>
            <li className='text-black'>About</li>
        </ul>
        <button onClick={onLogout} className="login text-white hover:bg-blue-800 bg-blue-600 px-2 py-1 rounded-sm">Logout</button>
    </nav>
  )
}

export default Navbar
