import { en } from './en';
import { fr } from './fr';
import { ar } from './ar';

export const locales = { en, fr, ar };
export const localeList = [
    { code: 'en', name: 'English', flag: '/flags/en.svg' },
];

export function detectLocale() {
    return 'en';
}

export function getTranslation(locale, key) {
    const keys = key.split('.');
    let value = locales['en'];
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key;
        }
    }
    return value;
}