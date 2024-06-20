import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/imas.png"
          width={42}
          height={52}
          alt="yoom logo"
          className="max-sm:size-20"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          EduOcean
        </p>
      </Link>
      <div className="flex-between gap-5">
         <SignedIn>
          <UserButton />
        </SignedIn> 

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
