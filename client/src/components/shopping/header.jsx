import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, LogIn, CircleUserRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { shoppingViewHeaderMenuItems } from '@/config'
import { Label } from '@radix-ui/react-label'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/authSlice'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import UserCartWrapper from './cart-wrapper'
import { emptyCart } from '@/store/cartSlice'
import LoginModal from '@/pages/auth/loginModal'
import SignupModal from '@/pages/auth/signupModal'
import ForgetPasswordModal from '@/pages/auth/forgetPassword'
import { motion } from "motion/react"
import SwiftCart from '../../assets/SwiftCart.png'

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter = getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products" && getCurrentMenuItem.id !== "search" ? { category: [getCurrentMenuItem.id], } : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) : navigate(getCurrentMenuItem.path);
  }


  return (
    <nav className="flex flex-col mb-3 mt-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label onClick={() => handleNavigate(menuItem)} className="relative cursor-pointer text-md font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-500 hover:after:w-full" key={menuItem.id}>
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}



const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      dispatch(emptyCart())
    })
  }

  const handleLogIn = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <motion.button whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} transition={{ duration: 0.5 }}>
          <Button variant="outline" size="icon" className="relative  border-primary" onClick={() => setOpenCartSheet(true)}>
            <ShoppingCart className="w-6 h-6" />
            {cartItems?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{cartItems.items.length}</span>
            )}
          </Button>
        </motion.button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      {user?.userName ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} transition={{ duration: 0.5 }}>

              <Avatar>
                <AvatarFallback >
                  <CircleUserRound height={40} width={40} strokeWidth={0.7} className='hover:cursor-pointer' />
                </AvatarFallback>
              </Avatar>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-60 bg-white">
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")} className="flex items-center hover:bg-gray-200 cursor-pointer" >
              <UserCog className="mr-2 h-4 w-4" />Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center hover:bg-gray-200 cursor-pointer" >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <motion.button whileHover={{ scale: 1.1, transition: { duration: 0.1 } }} transition={{ duration: 0.5 }}>
          <Button onClick={handleLogIn} variant="outline" size="icon" className='border-primary'><LogIn /></Button>
        </motion.button>
      )}

      {loginOpen && <LoginModal open={loginOpen} onClose={setLoginOpen} setSignupOpen={setSignupOpen} setForgetPassword={setForgetPassword} />}
      {forgetPassword && <ForgetPasswordModal open={forgetPassword} onClose={setForgetPassword} setLoginOpen={setLoginOpen} />}
      {signupOpen && <SignupModal open={signupOpen} onClose={setSignupOpen} setLoginOpen={setLoginOpen} />}
    </div>
  );
}

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img src={SwiftCart} alt='SwiftCart' className="h-20 rounded object-cover"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-1/2 max-w-xs!important bg-white">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader