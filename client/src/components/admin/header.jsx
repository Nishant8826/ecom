import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'
import { emptyCart } from '@/store/cartSlice'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'


const AdminHeader = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()).then(() => {
      dispatch(emptyCart());
      navigate('/shop/home');
    })

  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block bg-black text-white rounded-md hover:bg-gray-800">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <motion.button whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} transition={{ duration: 0.5 }}>
          <Button onClick={() => handleLogout()} variant="outline" size="icon" className="relative  border-primary" >
            <LogOut />
          </Button>
        </motion.button>
      </div>
    </header>
  )
}

export default AdminHeader