"use client";

import { QueryProvider } from "./QueryProvider";
import { RecoilProvider } from "./RecoilProvider";
import { SidebarProvider } from "./SidebarProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastMessageProvider } from "./ToastMessageProvider";

/**
 * 전역 Provider 관리 컴포넌트
 *
 * 특징:
 * 1. 관심사 분리: 각 Provider를 독립적인 파일로 관리
 * 2. 순서 보장: Provider 중첩 순서가 중요한 경우 고려
 * 3. 단일 진실 공급원: 모든 Provider를 한 곳에서 관리
 *
 * Provider 순서:
 * 1. RecoilProvider (전역 상태)
 * 2. QueryProvider (API 통신)
 * 3. ThemeProvider (테마)
 * 4. ToastMessageProvider (알림)
 * 5. SidebarProvider (사이드바)
 */
export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<RecoilProvider>
			<QueryProvider>
				<ThemeProvider>
					<ToastMessageProvider>
						<SidebarProvider>
							{children}
						</SidebarProvider>
					</ToastMessageProvider>
				</ThemeProvider>
			</QueryProvider>
		</RecoilProvider>
	);
}