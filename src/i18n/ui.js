export const languages = {
    es: 'Español',
    en: 'Inglés',
}

export const defaultLang = 'es';

export const ui = {
    es: {
        // Titulo web
        'website.title': 'Iván Sevilla, estudiante de ingeniería',
        //Hero
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'Estudiante de ingeniería en telecomunicaciones en la UPV',
        'hero.scroll': 'DESLIZA',
        //Nav
        'nav.start': 'Inicio',
        'nav.about': 'Sobre mi',
        'nav.projects': 'Mis proyectos',
        'nav.contact': 'Contacto',
        //About
        'about.title1': 'Desarrollo y Experimentación',
        'about.subtitle1': 'Lógica de Software e IA',
        'about.description1': 'Resuelvo problemas con Python y C, explorando desde el frontend hasta la Inteligencia Artificial. Mi objetivo ahora es profundizar en el backend para obtener una visión integral del desarrollo de software. No tengo prisa por especializarme; busco entender el sistema completo.',

        'about.title2': 'Ingeniería y Fundamentos',
        'about.subtitle2': 'Telecomunicaciones en la UPV',
        'about.description2': 'Estudio 1º de Telecomunicaciones para forjar una base matemática y física inquebrantable. Me interesa el software que exige capacidad mental: algoritmos complejos y proyectos donde la física y el cálculo sean el motor. Si entiendo la ciencia detrás del código, no hay límite en lo que puedo construir.',

        'about.title3': 'Cultura y Enfoque',
        'about.subtitle3': 'Idiomas y Tiempo Libre',
        'about.description3': 'Fuera del código, busco el mismo nivel de mejora. Entreno en el gimnasio, domino el Inglés (B2), aprendo Neerlandés y piano. Para desconectar, nada como los videojuegos y la discografía de Queen a todo volumen. Es mi combustible para mantener la concentración.',
    },
    en: {
        //Titulo web
        'website.title': 'Iván Sevilla, engineering student',
        //Hero
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'Telecommunications Engineering student at UPV',
        'hero.scroll': 'SCROLL',
        //Nav
        'nav.start': 'Home',
        'nav.about': 'About me',
        'nav.projects': 'My projects',
        'nav.contact': 'Contact me',
        //About
        'about.title1': 'Development & Experimentation',
        'about.subtitle1': 'Software Logic & AI',
        'about.description1': 'I solve problems with Python and C, exploring everything from frontend to Artificial Intelligence. My current goal is to dive into the backend to gain a holistic view of software development. I\'m in no rush to specialize; I want to understand the entire system first.',

        'about.title2': 'Engineering & Foundations',
        'about.subtitle2': 'Telecommunications at UPV',
        'about.description2': 'Currently in my 1st year of Telecommunications Engineering to build an unbreakable mathematical and physical foundation. I\'m drawn to software that demands mental heavy lifting: complex algorithms and projects driven by physics and calculus. Understanding the science behind the code is my edge.',

        'about.title3': 'Culture & Focus',
        'about.subtitle3': 'Languages & Free Time',
        'about.description3': 'Beyond code, I pursue the same level of growth. I train at the gym, speak English (B2), and I am currently learning Dutch and piano. To disconnect: gaming and Queen\'s discography at full volume. It\'s what keeps my focus sharp.',
    },
    zh: {
        // 网站标题 (Web Title)
        'website.title': 'Iván Sevilla, 工程系学生',
        // 英雄版块 (Hero)
        'hero.title': 'Iván Sevilla',
        'hero.subtitle': 'UPV（瓦伦西亚理工大学）电信工程专业学生',
        'hero.scroll': '向下滚动',
        // 导航栏 (Nav)
        'nav.start': '首页',
        'nav.about': '关于我',
        'nav.projects': '我的项目',
        'nav.contact': '联系方式',
        // 关于 (About)
        'about.title1': '开发与实验',
        'about.subtitle1': '软件逻辑与人工智能',
        'about.description1': '我使用 Python 和 C 解决问题，探索从前端到人工智能的各个领域。目前的重点是深入研究后端，以获得对软件开发的全面了解。我不急于寻找特定细分领域；我旨在理解整个系统的底层架构。',

        'about.title2': '工程与基础',
        'about.subtitle2': 'UPV 电信工程',
        'about.description2': '我目前就读电信工程一年级，旨在打下坚不可摧的数学和物理基础。我对需要高强度脑力的软件很感兴趣：复杂的算法以及以物理和微积分为核心驱动的项目。只要掌握了代码背后的科学，我的创造就永无止境。',

        'about.title3': '文化与专注',
        'about.subtitle3': '语言与业余时间',
        'about.description3': '在代码之外，我也追求同等水平的自我提升。我在健身房锻炼，掌握英语（B2），目前正在学习荷兰语和钢琴。至于放松，没有什么比打游戏和把 Queen（皇后乐队）的专辑音量开到最大更棒的了。这是我保持专注的核心燃料。',
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