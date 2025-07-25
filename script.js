// Animaciones y interactividad
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observar elementos animables
    document.querySelectorAll('.service-card, .problem, .solution, .urgency').forEach(el => {
        observer.observe(el);
    });

    // Efecto parallax suave en el header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header::before');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animación de números (stats)
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Activar animación de números cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                const targetValue = numberElement.textContent;
                if (!isNaN(targetValue)) {
                    animateNumber(numberElement, parseInt(targetValue));
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Funciones para los botones CTA
function handleCotizar() {
    // Aquí puedes agregar tu lógica de WhatsApp
    const mensaje = encodeURIComponent("¡Hola! Me interesa cotizar un sitio web profesional para mi negocio.");
    const whatsappUrl = `https://wa.me/52XXXXXXXXXX?text=${mensaje}`;
    
    // Efecto visual del botón
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
        // window.open(whatsappUrl, '_blank');
        alert('¡Perfecto! Te contactaremos por WhatsApp para cotizar tu sitio web.');
    }, 150);
}

function handleConsulta() {
    // Efecto visual del botón
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
        alert('¡Excelente! Agenda tu consulta gratuita y descubre cómo podemos ayudarte.');
    }, 150);
}

// Efecto de hover mejorado para las tarjetas de servicio
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll para mejor experiencia
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});