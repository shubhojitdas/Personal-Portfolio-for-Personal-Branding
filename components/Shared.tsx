import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Github, Twitter, Linkedin, 
  Terminal, ShieldCheck, Activity, BrainCircuit, Sun, Moon 
} from 'lucide-react';
import { NavItem } from '../types';

// --- UI Primitives ---

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', disabled = false 
}) => {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const baseStyle = "relative overflow-hidden rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider group";
  
  const variants = {
    primary: "bg-primary text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-transparent",
    secondary: "bg-secondary text-white hover:bg-fuchsia-400 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] border border-transparent",
    outline: "bg-transparent border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white hover:border-primary/50 hover:text-primary hover:bg-primary/5",
    ghost: "bg-transparent text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-300 skew-x-12" />
      )}
    </button>
  );
};

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`glass-panel p-6 rounded-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'blue' | 'purple' | 'green';
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]",
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-mono border backdrop-blur-sm ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Theme Toggle Component ---
export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-gray-400 hover:text-primary"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// --- Layout Components ---

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'About Me', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path || (path === '/articles' && location.pathname.startsWith('/articles'));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold text-lg overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             <span className="relative z-10">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
            Shubhojit<span className="text-primary">.io</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium tracking-wide transition-colors py-2 group ${
                isActive(item.path) ? 'text-primary' : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
          <div className="w-px h-6 bg-zinc-200 dark:bg-white/10 mx-2" />
          <ThemeToggle />
          <Link to="/contact">
            <Button variant="outline" className="px-4 py-2 text-xs">Let's Chat</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-surface/95 backdrop-blur-lg border-b border-zinc-200 dark:border-white/5 p-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-zinc-600 dark:text-gray-300 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block">
             <Button className="w-full">Let's Chat</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => (
  <footer className="border-t border-zinc-200 dark:border-white/5 bg-surface/30 backdrop-blur-md py-12 mt-20 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="col-span-1 md:col-span-2 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary" />
          <span className="font-bold text-lg text-zinc-900 dark:text-white">Shubhojit.io</span>
        </div>
        <p className="text-zinc-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
          Bridging the gap between technical excellence and semantic understanding. 
          Building the future of search through data-driven research and holistic strategies.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-zinc-400 dark:text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-4 text-zinc-900 dark:text-white">Explore</h4>
        <ul className="space-y-2 text-sm text-zinc-500 dark:text-gray-400">
          <li><Link to="/articles" className="hover:text-primary transition-colors">Articles</Link></li>
          <li><Link to="/about" className="hover:text-primary transition-colors">About Me</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-200 dark:border-white/5 text-center text-zinc-400 dark:text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} Shubhojit.io. All rights reserved.
    </div>
  </footer>
);

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-background text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-primary/30 selection:text-white relative transition-colors duration-300">
    {/* Global Background Grid */}
    <div className="fixed inset-0 z-0 bg-grid pointer-events-none" />
    
    <Navbar />
    <main className="flex-grow pt-20 relative z-10">
      {children}
    </main>
    <Footer />
  </div>
);

// --- Section Header ---
export const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 relative">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight relative z-10 text-zinc-900 dark:text-white">{title}</h2>
    {subtitle && <p className="text-zinc-500 dark:text-gray-400 max-w-2xl text-lg relative z-10">{subtitle}</p>}
    <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mt-6 rounded-full" />
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
  </div>
);