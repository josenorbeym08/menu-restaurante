// Configuración del número de WhatsApp para Colombia
// Formato: código de país + número sin espacios ni caracteres especiales
const PHONE_NUMBER = '573005979838'; // Número de Colombia

// Mensaje predefinido que se enviará por WhatsApp
const DEFAULT_MESSAGE = '¡Hola! Me interesa hacer un pedido del menú. ¿Podrían ayudarme?';

// Función para abrir WhatsApp con el mensaje
function openWhatsApp() {
    // Detectar si es móvil o escritorio
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Formatear el mensaje para URL
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    
    let whatsappUrl;
    
    if (isMobile) {
        // Para móviles usar la app
        whatsappUrl = `whatsapp://send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    } else {
        // Para escritorio usar WhatsApp Web
        whatsappUrl = `https://web.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    }
    
    // Intentar abrir WhatsApp
    try {
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        // Si falla, intentar redirección directa
        window.location.href = whatsappUrl;
    }
}

// Función adicional para permitir pedir un plato específico
function pedirPlato(nombrePlato, precio) {
    const mensaje = `¡Hola! Me gustaría pedir: ${nombrePlato} (${precio}). ¿Está disponible?`;
    const encodedMessage = encodeURIComponent(mensaje);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
        whatsappUrl = `whatsapp://send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    } else {
        whatsappUrl = `https://web.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    }
    
    try {
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        window.location.href = whatsappUrl;
    }
}

// Agregar evento al botón cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        // Evento de clic
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openWhatsApp();
        });
        
        // También permitir acceso directo vía Enter o espacio si tiene foco
        whatsappBtn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWhatsApp();
            }
        });
        
        console.log('Botón de WhatsApp configurado correctamente');
    } else {
        console.error('No se encontró el botón de WhatsApp con ID: whatsappBtn');
    }
    
    // Agregar funcionalidad opcional: clic en items del menú para pedir directamente
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const itemName = item.querySelector('.item-name')?.textContent;
            const itemPrice = item.querySelector('.item-price')?.textContent;
            
            if (itemName && itemPrice) {
                // Crear un pequeño botón o confirmar antes de enviar
                if (confirm(`¿Deseas pedir "${itemName}" por WhatsApp?`)) {
                    pedirPlato(itemName, itemPrice);
                }
            }
        });
        
        // Agregar cursor pointer para indicar que es clickeable
        item.style.cursor = 'pointer';
    });
});

// Fallback: Si el DOM ya está cargado cuando se ejecuta el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Ya está manejado arriba
    });
} else {
    // El DOM ya está cargado
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openWhatsApp();
        });
    }
}




