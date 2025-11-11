import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full border-t border-surface-stroke bg-surface-99",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
          {/* 로고 및 소개 */}
          <div className="md:col-span-2">
            <h3 className="font-emphasis text-lg font-bold text-primary-50 md:text-xl">
              모두의식물
            </h3>
            <p className="mt-1.5 text-xs text-neutral-60 md:mt-2 md:text-sm">
              식물에 관심 있는 모든 사람들을 위한
              <br />
              정보 공유 플랫폼
            </p>
          </div>

          {/* 링크 섹션 1 */}
          <div>
            <h4 className="mb-2 text-xs font-semibold text-neutral-20 md:mb-3 md:text-sm">
              서비스
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-60 md:space-y-2 md:text-sm">
              <li>
                <Link
                  href="/community"
                  className="transition-colors hover:text-primary-50"
                >
                  소통 게시판
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-primary-50"
                >
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 링크 섹션 2 */}
          <div>
            <h4 className="mb-2 text-xs font-semibold text-neutral-20 md:mb-3 md:text-sm">
              정보
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-60 md:space-y-2 md:text-sm">
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-primary-50"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-primary-50"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-6 border-t border-surface-stroke pt-6 text-center text-xs text-neutral-60 md:mt-8 md:pt-8 md:text-sm">
          <p>© {currentYear} 모두의식물. All rights reserved.</p>
          <p className="mt-0.5 text-[10px] md:mt-1 md:text-xs">
            This is a portfolio project for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
