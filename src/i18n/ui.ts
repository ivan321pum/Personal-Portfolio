export const languages = {
    es: 'Español',
    en: 'Inglés',
}

export const defaultLang = 'es';

export const ui = {
    es:{
        'website.title': 'Iván Sevilla, estudiante de ingenieria',
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'Estudiante de ingeniería en telecomunicaciones en la UPV',
        'nav.start': 'Inicio',
        'nav.about': 'Sobre mi',
        'nav.contact': 'Contacto',
    },
    en:{
        'website.title': 'Iván Sevilla, engineering student',
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'Telecommunications Engineering student at UPV',
        'nav.start': 'Start',
        'nav.about': 'About me',
        'nav.contact': 'Contact me',
    }
}

export function useTranslations(lang) {
    return function t(key) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}