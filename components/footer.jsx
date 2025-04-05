import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github
} from "lucide-react";
import { Logo } from "./ui/logo";

const Footer = () => {
  return (
    <footer className="relative pt-28 pb-16 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-background/90 to-transparent z-0"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>

      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30rem] h-36 rounded-full bg-primary/20 opacity-30 blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="NextGen Welth Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-cyan-300">NextGen Welth</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
              NextGenWelth is revolutionizing personal finance with AI-powered insights and intelligent wealth management for the next generation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} NextGen Welth. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;