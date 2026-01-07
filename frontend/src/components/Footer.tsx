import { Facebook, Instagram, Mail, Phone, MapPin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="text-primary-foreground">JESSE FOREMAN</span>
              <span className="text-secondary"> FOR KY</span>
            </h3>
            <p className="text-background/70 mb-4">
              Fighting for hard-working families, safer communities, and a government
              that lives within its means.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/61585932582250/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/foreman4ky"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/foreman4ky"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#about" className="hover:text-secondary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#platform" className="hover:text-secondary transition-colors">
                  Platform
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-secondary transition-colors">
                  Stay Updated
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:jesse@jesseforeman.com" className="hover:text-secondary transition-colors">
                  jesse@jesseforeman.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <a href="tel:+18594269000" className="hover:text-secondary transition-colors">
                  (859) 426-9000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Florence, Kentucky</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50">
          <p className="mb-2">
            © {currentYear} Jesse Foreman for Kentucky State Representative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
