import { FiArrowUpRight } from 'react-icons/fi'
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 text-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-22">
          
          {/* Logo */}
          <div className="flex items-end gap-2">
            <img
              src="img/Judul.png"
              alt="KaderAI"
              className="w-28"
            />
          </div>

          {/* Menu */}
          <ul style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }} className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <li className="hover:text-gray-900 cursor-pointer ">Home</li>
            <li className="hover:text-gray-900 cursor-pointer">About</li>
            <li className="hover:text-gray-900 cursor-pointer">Contact</li>
            <li className="hover:text-gray-900 cursor-pointer">FAQ</li>
          </ul>

          {/* Login Button */}
          <div>
            <button
  className="
    flex items-center gap-2
    px-8 py-2.5
    rounded-2xl
    bg-linear-to-r from-[#0FA6A0] to-[#1F4E79]
    text-white font-semibold
    shadow-md
    hover:shadow-lg
    hover:scale-105
    transition
  "
>
  Login
  <FiArrowUpRight className="text-xl" />
</button>
          </div>

        </div>
      </div>
    </nav>
  )
}
