"use client";

import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { useAuth } from "@/hooks/useAuth";
import { authState } from "@/store/auth";

import HamburgerButton from "./HamburgerButton";
import Logo from "./Logo";

const Header = () => {
	const { user } = useRecoilValue(authState);

	const { logout } = useAuth();

	return (
		<header className="max-w-[120rem] w-full mx-auto h-[8rem] flex justify-between items-center p-4">
			<div>
				<Logo />
			</div>
			<div className="flex items-start gap-4">
				<Link href="/movies">
					<div className="py-3 px-4 text-link text-gray-50 cursor-pointer">
            Movies
					</div>
				</Link>
				<div className="py-3 px-4 text-link text-gray-50 cursor-pointer">
          Bookmark
				</div>
				<div className="flex items-center gap-2">
					<div>
						<HamburgerButton />
					</div>
					{!user ? <Link href="/login" className="flex gap-2 py-3 px-4 cursor-pointer">
						<Image
							src="/icons/logout.svg"
							alt="화살표"
							width={16}
							height={16} />
						<span className="text-link text-gray-50">LogIn</span>
					</Link> : <div onClick={() => logout()} className="flex gap-2 py-3 px-4 cursor-pointer">
						<Image
							src="/icons/logout.svg"
							alt="화살표"
							width={16}
							height={16} />
						<span className="text-link text-gray-50">LogIn</span>
					</div>}
				</div>
			</div>
		</header>
	);
};

export default Header;
