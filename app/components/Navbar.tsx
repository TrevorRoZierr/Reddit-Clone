import Link from "next/link";
import RedditText from "../../public/logo-name.svg";
import redditMobile from "../../public/reddit-full.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";
export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="flex justify-between items-center px-5 lg:px-14 border-b h-[10vh] w-full">
      <Link href="/" className="flex gap-x-3 items-center ">
        <Image src={redditMobile} alt="Reddit Mobile" className="h-10 w-fit" />
        <Image
          src={RedditText}
          alt="Reddit Desktop"
          className="hidden lg:block h-9 w-fit"
        />
      </Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {user ? (
          <UserDropdown userImage={user.picture} />
        ) : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
          </div>
        )
        }
      </div >
    </nav >
  );
}
