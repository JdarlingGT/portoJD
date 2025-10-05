import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { NavProvider } from "@/components/layout/NavContext";
import { Header } from "@/components/layout/header";
import { MegaMenu } from "@/components/layout/MegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Work from "@/pages/work";
import CaseStudy from "@/pages/work/[slug]";
import Toolbox from "@/pages/toolbox";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import ContactSuccess from "@/pages/contact-success";
import Preloader from "@/components/ui/Preloader";
import { CursorTrail } from "@/components/ui/CursorTrail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/work/:slug" component={CaseStudy} />
      <Route path="/toolbox" component={Toolbox} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/contact/success" component={ContactSuccess} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavProvider>
          <TooltipProvider>
            <Toaster />
            <CursorTrail />
            <Preloader />
            <Header />
            <MegaMenu />
            <MobileMenu />
            <main>
              <Router />
            </main>
            <Footer />
          </TooltipProvider>
        </NavProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
