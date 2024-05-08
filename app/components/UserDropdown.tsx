import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

interface imageProp {
    userImage: string | null;
}

export function UserDropdown({ userImage }: imageProp) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full flex border items-center gap-x-3 px-2 py-2 lg:px-4">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <img src={userImage ?? "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} alt="User" className="rounded-full h-8 w-8 hidden lg:block" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                    <Link href="/r/create" className="w-full">Create Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/create" className="w-full">Create Post</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/settings" className="w-full">Setting</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogoutLink className="w-full">Logout</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}