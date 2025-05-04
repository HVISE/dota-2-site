document.addEventListener('DOMContentLoaded', () => {
    // Плавное изменение прозрачности видео-секции
    document.addEventListener('scroll', () => {
        const videoSection = document.querySelector('.hero-section');
        if (!videoSection) return;
        let isScrolling;
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                const videoHeight = videoSection.offsetHeight;
                videoSection.style.opacity = Math.max(0, 1 - scrollPosition / videoHeight);
            });
        }, 100); // Задержка перед выполнением
    });

    // Плавная прокрутка по ссылкам
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                }
            } else {
                // Переход на другую страницу
                window.location.href = href;
            }
        });
    });

    // Обработка формы
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Сообщение отправлено!');
            e.target.reset();
        });
    }

    // Инициализация героев (только если на странице с героями)
    const heroConveyor = document.getElementById('hero-conveyor');
    if (heroConveyor) {
        const heroes = [
            "Axe", "Juggernaut", "Lina", "Mirana", "Lycan", "Naga Siren",
            "Invoker", "Puck", "Ember Spirit", "Abaddon", "Alchemist",
            "Ancient Apparition", "Anti-Mage", "Arc Warden", "Bane",
            "Batrider", "Beastmaster", "Bloodseeker", "Bounty Hunter",
            "Brewmaster", "Bristleback", "Broodmother", "Centaur Warrunner",
            "Chaos Knight", "Chen", "Clinkz", "Clockwerk", "Crystal Maiden",
            "Dark Seer", "Dark Willow", "Dawnbreaker", "Dazzle", "Death Prophet",
            "Disruptor", "Doom", "Dragon Knight", "Drow Ranger", "Earth Spirit",
            "Earthshaker", "Elder Titan", "Enchantress", "Enigma", "Faceless Void",
            "Grimstroke", "Gyrocopter", "Huskar", "Io", "Jakiro", "Keeper of the Light",
            "Kunkka", "Legion Commander", "Leshrac", "Lich", "Lifestealer", "Lion",
            "Lone Druid", "Luna", "Magnus", "Mars", "Medusa", "Meepo", "Necrophos",
            "Nyx Assassin", "Ogre Magi", "Omniknight", "Oracle", "Outworld Destroyer",
            "Phoenix", "Pudge", "Pugna", "Queen of Pain", "Riki", "Rubick", "Sand King",
            "Shadow Demon", "Shadow Fiend", "Shadow Shaman", "Silencer", "Skywrath Mage",
            "Slardar", "Slark", "Sniper", "Spectre", "Spirit Breaker", "Storm Spirit",
            "Sven", "Techies", "Templar Assassin", "Terrorblade", "Tidehunter",
            "Timbersaw", "Tinker", "Tiny", "Treant Protector", "Troll Warlord",
            "Tusk", "Underlord", "Undying", "Ursa", "Vengeful Spirit", "Venomancer",
            "Viper", "Visage", "Warlock", "Weaver", "Windrunner", "Wisp", "Witch Doctor",
            "Wraith King", "Zeus",
            "Antimage", "Bloodseeker", "Crystal Maiden", "Drow Ranger", "Earthshaker",
            "Shadow Fiend", "Puck", "Pudge", "Razor", "Storm Spirit", "Sven", "Tiny",
            "Vengeful Spirit", "Zuus", "Kunkka", "Windrunner", "Sand King", "Lina",
            "Lion", "Shadow Shaman", "Slardar", "Tidehunter", "Witch Doctor", "Lich",
            "Riki", "Enigma", "Necrophos", "Sniper", "Warlock", "Beastmaster",
            "Queen of Pain", "Venomancer", "Faceless Void", "Wraith King", "Death Prophet",
            "Phantom Assassin", "Pugna", "Templar Assassin", "Viper", "Luna", "Dragon Knight",
            "Clockwerk", "Leshrac", "Nature's Prophet", "Lifestealer", "Dark Seer", "Clinkz",
            "Omniknight", "Enchantress", "Huskar", "Night Stalker", "Broodmother",
            "Bounty Hunter", "Weaver", "Jakiro", "Batrider", "Chen", "Ancient Apparition",
            "Doom", "Ursa", "Spirit Breaker", "Gyrocopter", "Alchemist", "Invoker",
            "Silencer", "Obsidian Destroyer", "Outworld Destroyer", "Lycan", "Brewmaster",
            "Shadow Demon", "Lone Druid", "Chaos Knight", "Meepo", "Treant Protector",
            "Ogre Magi", "Undying", "Rubick", "Disruptor", "Nyx Assassin", "Naga Siren",
            "Keeper of the Light", "Io", "Visage", "Slark", "Skywrath Mage", "Centaur",
            "Magnus", "Timbersaw", "Bristleback", "Tusk", "Abaddon", "Troll Warlord",
            "Techies", "Terrorblade", "Phoenix", "Oracle", "Winter Wyvern", "Arc Warden",
            "Legion Commander", "Elder Titan", "Underlord", "Earth Spirit", "Monkey King",
            "Dark Willow", "Pangolier", "Grimstroke", "Hoodwink", "Void Spirit", "Snapfire",
            "Mars", "Ringmaster", "Dawnbreaker", "Marci", "Primal Beast", "Muerta",
            "Medusa", "Ember Spirit", "Morphling", "Phantom Lancer", "Tinker", "Dazzle",
            "Spectre"
        ];

        // Создаем карточки героев
        const heroConveyorScroll = document.createElement('div');
        heroConveyorScroll.className = 'hero-conveyor-scroll';
        heroes.forEach(hero => {
            const heroIcon = document.createElement('div');
            heroIcon.className = 'hero-icon';
            const heroName = hero.toLowerCase().replace(/ /g, '_');
            heroIcon.innerHTML = `
                <img src="img/${heroName}.png" alt="Герой ${hero}" onerror="this.onerror=null; this.src='img/default.png';">
                <span onclick="showHeroGuide('${hero}')">${hero}</span>
            `;
            heroConveyorScroll.appendChild(heroIcon);
        });

        // Дублируем карточки для бесконечной прокрутки
        const clonedConveyorScroll = heroConveyorScroll.cloneNode(true);
        heroConveyor.appendChild(heroConveyorScroll);
        heroConveyor.appendChild(clonedConveyorScroll);

        // Анимация при наведении
        heroConveyor.addEventListener('mouseover', (e) => {
            if (e.target.closest('.hero-icon')) {
                e.target.closest('.hero-icon').style.transform = 'scale(1.1)';
            }
        });

        heroConveyor.addEventListener('mouseout', (e) => {
            if (e.target.closest('.hero-icon')) {
                e.target.closest('.hero-icon').style.transform = 'scale(1)';
            }
        });
    }

    // Функция для открытия гайда Anti-Mage
    function showAntiMageGuide() {
        document.getElementById('antiMageGuideModal').style.display = 'flex';
    }

    // Функция для закрытия гайда Anti-Mage
    function closeHeroGuide() {
        document.getElementById('antiMageGuideModal').style.display = 'none';
    }

    // Добавляем обработчик события клика на иконку Anti-Mage
    const antiMageIcon = document.querySelector('.hero-icon span[onclick="showHeroGuide(\'Anti-Mage\')"]');
    if (antiMageIcon) {
        antiMageIcon.parentElement.addEventListener('click', showAntiMageGuide);
    }

    // Добавляем обработчик события клика на кнопку закрытия модального окна
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', closeHeroGuide);
    }

    // Добавляем обработчик события клика вне модального окна для его закрытия
    const modal = document.getElementById('antiMageGuideModal');
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeHeroGuide();
            }
        });
    }
        // Функция для открытия модального окна
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
});
