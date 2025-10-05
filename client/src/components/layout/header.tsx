import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { NavContext } from "./NavContext";
import { Menu } from "lucide-react";
import AnimatedLogo from "../ui/AnimatedLogo";

export function Header() {
  const navContext = useContext(NavContext);
  if (!navContext) throw new Error("Header must be used within a NavProvider");
  const { toggleMenu } = navContext;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0F0F0F]/70 border-b border-white/10 ${
        scrolled ? "py-2 shadow-lg" : "py-4"
      } transition-all`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <motion.a
          href="#"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <AnimatedLogo size={50} />
        </motion.a>

        <nav className="hidden md:flex gap-6 text-gray-300">
          {["About", "Case Studies", "Reel", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="hover:text-accentCyan transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white transition-colors"
        >
          <Menu size={28} />
        </button>
      </div>
    </motion.header>
  );
}
