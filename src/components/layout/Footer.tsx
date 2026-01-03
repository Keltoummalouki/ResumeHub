import { Github, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Créé avec <Heart className="inline-block h-4 w-4 text-red-500 fill-red-500" /> par{' '}
                    <a
                        href="https://www.keltoummalouki.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                        Keltoum Malouki
                    </a>
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/keltoummalouki/ResumeHub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <span className="text-xs text-muted-foreground">
                        v1.0.0 • 100% Client-Side
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
