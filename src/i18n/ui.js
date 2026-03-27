export const languages = {
    es: 'Español',
    en: 'Inglés',
}

export const defaultLang = 'es';

export const ui = {
    es:{
        // Titulo web
        'website.title': 'Iván Sevilla, estudiante de ingeniería',
        //Hero
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'Estudiante de ingeniería en telecomunicaciones en la UPV',
        //Nav
        'nav.start': 'Inicio',
        'nav.about': 'Sobre mi',
        'nav.contact': 'Contacto',
        //About
        'about.title': 'Ingeniería y Disciplina',
        'about.facets.telecom.title': 'Telecomunicaciones y Hardware',
        'about.facets.telecom.desc': 'Estudiante de 1º en la UPV. No solo pico código; entiendo la capa física, los sistemas de comunicación y la gestión de redes Linux. Visión holística del sistema.',
        'about.facets.software.title': 'Software Architecture',
        'about.facets.software.desc': 'Mi pasión real. Navego entre el bajo nivel de C/C++, la versatilidad de Python y el desarrollo de lógicas interactivas en Unity. Optimización y limpieza.',
        'about.facets.discipline.title': 'La Mentalidad',
        'about.facets.discipline.desc': 'Aplico la disciplina del gimnasio al código. Sin excusas, solo iteraciones constantes. Entiendo el crecimiento como un proceso de optimización continua.',
    },
    en:{
        //Titulo web
        'website.title': 'Iván Sevilla, engineering student',
        //Hero
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'Telecommunications Engineering student at UPV',
        //Nav
        'nav.start': 'Home',
        'nav.about': 'About me',
        'nav.contact': 'Contact me',
        //About
        'about.title': 'Engineering and Discipline',
        'about.facets.telecom.title': 'Telecoms and Hardware',
        'about.facets.telecom.desc': '1st year student at UPV. I don\'t just write code; I understand the physical layer, communication systems, and Linux network management. Holistic system view.',
        'about.facets.software.title': 'Software Architecture',
        'about.facets.software.desc': 'My real passion. I navigate from low-level C/C++, to Python\'s versatility, and building interactive logics in Unity. Optimization and cleanliness.',
        'about.facets.discipline.title': 'The Mindset',
        'about.facets.discipline.desc': 'I apply gym discipline to code. No excuses, just constant iterations. I view growth as a process of continuous optimization.',
    }
}


/**
 * Inyecta el diccionario de traducciones según el idioma seleccionado.
 * @param {string} lang - El código del idioma actual (ej: 'es', 'en').
 * @returns {Function} Una función 't(key)' que recibe la clave y devuelve el texto traducido.
 */

export function useTranslations(lang) {
    return function t(key) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}