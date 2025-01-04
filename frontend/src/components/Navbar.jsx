import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-blue-900 text-white">
      <div className="text-2xl font-bold">B</div>
      <div className="flex items-center">
        <button className="mr-4 px-4 py-2 bg-blue-600 text-white rounded">+ New Post</button>
        <div className="w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center text-lg">B</div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
