'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useAuth } from "@/store/auth.store";

const UserDropDownMenu = ({email} : {email : string}) => {
  const {logout} = useAuth()
  const handleLogout = ()=>{
    const isSure = confirm('Are you sure you want to log out ? ')
    if(isSure){
      logout()
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FiUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-gray-900">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{email}</DropdownMenuItem>
        <DropdownMenuItem className="flex items-center" onClick={()=>handleLogout()}>
          <IoLogOutOutline className="translate-y-px" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
