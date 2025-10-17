    document.addEventListener('DOMContentLoaded', function() {
            
            document.body.classList.remove('is-preload');

            // --- MENU AÇILIR/KAPANIR (SIDEBAR İÇİ) ---
            const openers = document.querySelectorAll('#menu .opener');
            openers.forEach(opener => {
                opener.addEventListener('click', function(event) {
                    event.preventDefault();
                    this.classList.toggle('active');
                    const submenu = this.nextElementSibling;
                    if (submenu && submenu.tagName === 'UL') {
                        if (submenu.style.display === 'block') {
                            submenu.style.display = 'none';
                        } else {
                            submenu.style.display = 'block';
                        }
                    }
                });
            });

            // --- MOBİL MENU TOGGLE ---
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.getElementById('sidebar');
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    sidebar.classList.toggle('is-visible');
                });

                document.addEventListener('click', function(event) {
                    const isClickInsideSidebar = sidebar.contains(event.target);
                    const isClickOnToggle = menuToggle.contains(event.target);

                    if (sidebar.classList.contains('is-visible') && !isClickInsideSidebar && !isClickOnToggle) {
                        sidebar.classList.remove('is-visible');
                    }
                });
            }

            // --- YAZIM ANİMASYONU ---
            const typingElement = document.getElementById('typing');
            const textToType = "Nusret Alataş.";
            let index = 0;
            function type() {
                if (index < textToType.length) {
                    typingElement.textContent += textToType.charAt(index);
                    index++;
                    setTimeout(type, 150);
                } else {
                    typingElement.style.borderRight = '3px solid var(--accent-color)';
                    typingElement.style.animation = 'blink-caret .75s step-end infinite';
                }
            }
             typingElement.textContent = '';
             typingElement.style.borderRight = '3px solid var(--accent-color)';
             typingElement.style.animation = 'blink-caret .75s step-end infinite';

            setTimeout(() => {
                typingElement.style.animation = 'none';
                type();
            }, 1000);
            

            // --- SCROLL ANİMASYONLARI ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });

            // --- PARTICLE.JS ARKA PLAN ---
            if(document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    "particles": {
                        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#ffffff" },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.3, "random": false },
                        "size": { "value": 3, "random": true },
                        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
                        "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out", "bounce": false }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                        "modes": {
                            "repulse": { "distance": 100, "duration": 0.4 },
                            "push": { "particles_nb": 4 }
                        }
                    },
                    "retina_detect": true
                });
            }

        });