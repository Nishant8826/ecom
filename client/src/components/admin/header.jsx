import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block bg-black text-white rounded-md hover:bg-gray-800">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={() => handleLogout()} className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium shadow rounded-md hover:bg-gray-800" >
          <LogOut />
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader