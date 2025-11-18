"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/_common/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/authStore";

export interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className={cn("sticky top-0 z-50 w-full", className)}>
      <div className="flex h-14 w-full items-center justify-between px-2 md:px-4 lg:px-6">
        {/* 로고 */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="logo_favicon/Logo_white.svg"
            alt="모두의식물 로고"
            width={117}
            height={26}
          />
        </Link>

        {/* 로그인 상태에 따른 버튼 */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {/* 프로필 아이콘 (추후 드롭다운 추가) */}
              <button
                className="bg-primary-10 text-primary-50 hover:bg-primary-50 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-neutral-100"
                aria-label="프로필 메뉴"
                title={user?.email || "사용자"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {/* 글쓰기 버튼 */}
              <Link href="/community/new">
                <Button variant="point" size="sm" className="h-10 rounded-2xl">
                  글쓰기
                </Button>
              </Link>
              {/* 로그아웃 버튼 */}
              {/* TODO: 추후 삭제 */}
              <Button
                variant="default"
                size="sm"
                className="rounded-full"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              {/* 로그인/회원가입 버튼 */}
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="cursor-pointer rounded-full"
                >
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="point"
                  size="sm"
                  className="cursor-pointer rounded-full"
                >
                  회원가입
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
