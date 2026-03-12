import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Diamond } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Designs", path: "/designs" },
  { name: "Pricing", path: "/pricing" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-testid="navbar-logo"
          >
            <div className="w-10 h-10 rounded-sm bg-gold-400 flex items-center justify-center group-hover:bg-gold-300 transition-colors">
              <Diamond className="w-6 h-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-semibold text-white">
                SriGoRack
              </span>
              <span className="block text-xs text-muted-foreground tracking-widest uppercase">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-gold-400"
                    : "text-muted-foreground hover:text-white"
                }`}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button
                className="bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs px-6 py-5 rounded-sm btn-shine"
                data-testid="navbar-cta"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-3 mx-4 rounded-lg overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm uppercase tracking-[0.15em] py-2 transition-colors ${
                    location.pathname === link.path
                      ? "text-gold-400"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="block pt-4">
                <Button
                  className="w-full bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs py-5 rounded-sm"
                  data-testid="mobile-cta"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
