import Link from 'next/link';
import { Bot, LineChart, BookOpen, Clock, Vote } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <Vote className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden sm:inline-block">ElectionGuide AI</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/chat" className="transition-colors hover:text-primary flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline-block">Ask AI</span>
          </Link>
          <Link href="/timeline" className="transition-colors hover:text-primary flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline-block">Timeline</span>
          </Link>
          <Link href="/guide" className="transition-colors hover:text-primary flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline-block">Guide</span>
          </Link>
          <Link href="/analytics" className="transition-colors hover:text-primary flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline-block">Analytics</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
