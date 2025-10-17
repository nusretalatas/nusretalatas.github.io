   document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.remove('is-preload');
            const openers = document.querySelectorAll('#menu .opener');
            openers.forEach(opener => {
                opener.addEventListener('click', function(event) {
                    event.preventDefault(); this.classList.toggle('active');
                    const submenu = this.nextElementSibling;
                    if (submenu && submenu.tagName === 'UL') { submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; }
                });
            });
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.getElementById('sidebar');
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', function(e) { e.stopPropagation(); sidebar.classList.toggle('is-visible'); });
                document.addEventListener('click', function(event) {
                    if (sidebar.classList.contains('is-visible') && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                        sidebar.classList.remove('is-visible');
                    }
                });
            }
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });
        });