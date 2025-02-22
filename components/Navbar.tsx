"use client"
import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
  ];

  return (
    <nav className="bg-[#f4ede4] sticky top-0 z-50 border-b border-[#4a154b]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[#4a154b] tracking-tight">
                Track<span className="opacity-80">N</span>Buy
              </h1>
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a154b] ml-1 animate-pulse" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Nav Links */}
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#4a154b]/80 hover:text-[#4a154b] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="text-[#4a154b] font-medium hover:text-[#4a154b]/80 transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-[#4a154b] text-[#f4ede4] px-4 py-2 rounded-lg hover:bg-[#4a154b]/90 transition-colors font-medium">
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#4a154b] p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#f4ede4] border-t border-[#4a154b]/10">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-[#4a154b]/80 hover:text-[#4a154b] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isSignedIn && (
              <div className="flex flex-col space-y-3 pt-3 border-t border-[#4a154b]/10">
                <SignInButton mode="modal">
                  <button className="text-[#4a154b] font-medium hover:text-[#4a154b]/80 transition-colors w-full text-left py-2">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-[#4a154b] text-[#f4ede4] px-4 py-2 rounded-lg hover:bg-[#4a154b]/90 transition-colors font-medium w-full">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
