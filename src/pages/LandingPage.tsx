import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    FileText,
    Download,
    Palette,
    Shield,
    Zap,
    Globe,
    ArrowRight,
    Github,
    CheckCircle2
} from 'lucide-react';

const features = [
    {
        icon: <Shield className="h-6 w-6" />,
        title: '100% Privé',
        description: 'Vos données restent sur votre appareil. Aucun serveur, aucun tracking.',
    },
    {
        icon: <Palette className="h-6 w-6" />,
        title: 'Thèmes Personnalisables',
        description: 'Mode clair/sombre et plusieurs templates professionnels.',
    },
    {
        icon: <Download className="h-6 w-6" />,
        title: 'Export Multi-Format',
        description: 'Téléchargez en PDF haute qualité, PNG, ou sauvegardez en JSON.',
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: 'Instantané',
        description: 'Pas de compte à créer. Commencez à éditer immédiatement.',
    },
    {
        icon: <Globe className="h-6 w-6" />,
        title: 'Multilingue',
        description: 'Interface disponible en Français, Anglais et Arabe.',
    },
    {
        icon: <FileText className="h-6 w-6" />,
        title: 'ATS-Friendly',
        description: 'Templates optimisés pour les systèmes de suivi des candidatures.',
    },
];

const benefits = [
    'Sauvegarde automatique dans le navigateur',
    'Import/Export de données JSON',
    'Prévisualisation en temps réel',
    'Responsive design',
    'Gratuit et open-source',
];

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
                <div className="relative container mx-auto px-4 py-24 sm:py-32">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Zap className="h-4 w-4" />
                            100% Gratuit • Sans inscription
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Créez votre CV
                            <span className="block text-primary">professionnel en minutes</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            ResumeHub est un générateur de CV moderne, 100% client-side.
                            Vos données ne quittent jamais votre navigateur.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/editor">
                                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                                    Créer mon CV
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <a
                                href="https://github.com/keltoummalouki/ResumeHub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6">
                                    <Github className="h-5 w-5" />
                                    Voir sur GitHub
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Tout ce dont vous avez besoin
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Des fonctionnalités puissantes sans compromis sur la confidentialité
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-card rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Pourquoi choisir ResumeHub ?
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                Contrairement aux autres générateurs de CV, vos données ne sont
                                jamais envoyées à un serveur. Tout fonctionne localement dans
                                votre navigateur.
                            </p>
                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 shadow-xl">
                            <div className="bg-card rounded-lg shadow-lg p-6 border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Mon CV</h4>
                                        <p className="text-sm text-muted-foreground">Modifié il y a 2 minutes</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-muted rounded-full w-full" />
                                    <div className="h-3 bg-muted rounded-full w-3/4" />
                                    <div className="h-3 bg-muted rounded-full w-5/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Prêt à créer votre CV ?
                    </h2>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        Commencez dès maintenant, c'est gratuit et sans inscription.
                    </p>
                    <Link to="/editor">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="gap-2 text-lg px-8 py-6"
                        >
                            Commencer maintenant
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-semibold">ResumeHub</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2026 Keltoum Malouki. Open Source sous licence MIT.
                    </p>
                    <a
                        href="https://github.com/keltoummalouki/ResumeHub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
