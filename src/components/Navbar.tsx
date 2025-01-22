'use client'
import React, { useEffect } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import UserDropDownMenu from "@/components/UserDropDownMenu";
import { useAuth } from "@/store/auth.store";
import { FaCheckDouble } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const {user , getUser} = useAuth()
  useEffect(() => {
    getUser()
  }, [getUser]) 
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="flex items-center justify-center gap-2 text-2xl text-gray-900 dark:text-gray-100">
        <FaCheckDouble className="bg-emerald-600 rounded-md text-white size-7 p-1.5" />
        <span>
          <span className="text-emerald-600">Todo</span> App
        </span>
      </h1>
      <div className="flex items-center justify-center gap-6 text-xl">
        {user ? (
            <>
            <IoIosSearch />
            <UserDropDownMenu email={user.email} />
            <ModeToggle />
          </>
        ) : (
          <>
            <Link href={'/signup'}>
            <Button className="btn dark:bg-gray-900" variant={'link'}>Sign Up</Button>
            </Link>
            <Link href={'/signin'}>
            <Button className="btn dark:bg-gray-900" variant={'link'}>Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;