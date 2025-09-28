import { ThemeProviderComponent } from "@/hooks/use-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeProviderComponent defaultTheme="system" storageKey="portfolio-theme">
      {children}
    </ThemeProviderComponent>
  );
}
