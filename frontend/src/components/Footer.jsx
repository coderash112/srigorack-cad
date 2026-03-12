import { Link } from "react-router-dom";
import { Diamond, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-300 border-t border-white/5" data-testid="footer">
      {/* Large CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6">
            Ready to Transform Your
            <span className="block gold-text">Jewelry Designs?</span>
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-sm px-10 py-5 rounded-sm transition-all duration-300 btn-shine"
            data-testid="footer-cta"
          >
            Start Your Project
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm bg-gold-400 flex items-center justify-center">
                <Diamond className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="font-heading text-lg font-semibold text-white">
                  SriGoRack Technologies
                </span>
                <span className="block text-xs text-muted-foreground tracking-widest uppercase">
                  Pvt Ltd
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Premium CAD modeling and photorealistic rendering services for the
              jewelry and diamond industry. Transforming ideas into precision
              designs since our inception.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Our Designs", path: "/designs" },
                { name: "Pricing", path: "/pricing" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-gold-400 transition-colors text-sm"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-white text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-400 mt-0.5" />
                <a
                  href="mailto:ashrut@gorack.in"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                  data-testid="footer-email"
                >
                  ashrut@gorack.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-400 mt-0.5" />
                <a
                  href="tel:+919981834205"
                  className="text-muted-foreground hover:text-white transition-colors text-sm"
                  data-testid="footer-phone"
                >
                  +91-9981834205
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm" data-testid="copyright">
            {currentYear} SriGoRack Technologies Pvt Ltd. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Premium CAD & Rendering Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
