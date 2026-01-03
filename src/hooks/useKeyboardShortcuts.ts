import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShortcutConfig {
    key: string;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    action: () => void;
    description: string;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        // Ignore if typing in input/textarea
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            return;
        }

        for (const shortcut of shortcuts) {
            const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
            const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : true;
            const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;

            if (keyMatch && ctrlMatch && shiftMatch) {
                event.preventDefault();
                shortcut.action();
                return;
            }
        }
    }, [shortcuts]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
};

// Global shortcuts for the app
export const useGlobalShortcuts = () => {
    const navigate = useNavigate();

    const shortcuts: ShortcutConfig[] = [
        {
            key: 'd',
            ctrl: true,
            action: () => navigate('/dashboard'),
            description: 'Go to Dashboard',
        },
        {
            key: 'p',
            ctrl: true,
            action: () => navigate('/preview'),
            description: 'Preview CV',
        },
        {
            key: 's',
            ctrl: true,
            shift: true,
            action: () => navigate('/share'),
            description: 'Share & Export',
        },
        {
            key: 'a',
            ctrl: true,
            action: () => navigate('/dashboard/analyze'),
            description: 'CV Analyzer',
        },
        {
            key: 'n',
            ctrl: true,
            action: () => navigate('/dashboard/cvs'),
            description: 'New CV',
        },
        {
            key: '/',
            action: () => {
                // Show keyboard shortcuts help
                const event = new CustomEvent('show-shortcuts-help');
                window.dispatchEvent(event);
            },
            description: 'Show shortcuts',
        },
    ];

    useKeyboardShortcuts(shortcuts);

    return shortcuts;
};

export default useKeyboardShortcuts;
