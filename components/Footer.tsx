import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const links = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'How it Works', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Terms', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#4a154b] text-[#f4ede4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">TrackNBuy</h3>
            <p className="text-sm text-[#f4ede4]/80 mb-4">
              Smart price tracking for smarter shopping decisions.
            </p>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#f4ede4]/80 hover:text-[#f4ede4] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#f4ede4]/80 hover:text-[#f4ede4] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#f4ede4]/80 hover:text-[#f4ede4] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#f4ede4]/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#f4ede4]/80">
            © 2024 TrackNBuy. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-[#f4ede4]/80 hover:text-[#f4ede4] transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-[#f4ede4]/80 hover:text-[#f4ede4] transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-[#f4ede4]/80 hover:text-[#f4ede4] transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
