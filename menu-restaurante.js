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
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
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
    
    window.open(whatsappUrl, '_blank');
}

// Agregar evento al botón cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }
});


// Hacer funciones disponibles globalmente para onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;


