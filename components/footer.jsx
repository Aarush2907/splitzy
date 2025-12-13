import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur-sm py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Name Tag */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Splitzy
          </span>
        </div>

        {/* Rights */}
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Splitzy. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">
            How it Works
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
