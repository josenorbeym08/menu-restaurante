/// Configuración del número de WhatsApp para Colombia
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
    
    // Agregar funcionalidad a los botones individuales de WhatsApp en cada producto
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp-item');
    whatsappButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el evento se propague al item
            
            const itemName = button.getAttribute('data-name');
            const itemPrice = button.getAttribute('data-price');
            
            if (itemName && itemPrice) {
                pedirPlato(itemName, itemPrice);
            }
        });
    });

    // Agregar imágenes y botones automáticamente a productos que no los tengan
    agregarImagenesYBotones();
});

// Función para agregar automáticamente imágenes y botones a productos que no los tengan
function agregarImagenesYBotones() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Imágenes de ejemplo (puedes cambiar estas URLs por las reales)
    const imagenesPorCategoria = {
        'Entrada': 'https://images.unsplash.com/photo-1619535860434?w=150&h=150&fit=crop',
        'Principal': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop',
        'Postre': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=150&h=150&fit=crop',
        'Bebida': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&h=150&fit=crop'
    };

    menuItems.forEach(function(item) {
        // Verificar si ya tiene imagen
        if (!item.querySelector('.item-image')) {
            const itemName = item.querySelector('.item-name')?.textContent || '';
            const itemPrice = item.querySelector('.item-price')?.textContent || '';
            const sectionTitle = item.closest('.menu-section')?.querySelector('.section-title')?.textContent || '';
            
            // Determinar categoría
            let categoriaImagen = 'Principal';
            if (sectionTitle.includes('Entrada')) categoriaImagen = 'Entrada';
            else if (sectionTitle.includes('Postre')) categoriaImagen = 'Postre';
            else if (sectionTitle.includes('Bebida')) categoriaImagen = 'Bebida';
            
            // Crear imagen
            const imageDiv = document.createElement('div');
            imageDiv.className = 'item-image';
            const img = document.createElement('img');
            img.src = imagenesPorCategoria[categoriaImagen];
            img.alt = itemName;
            img.loading = 'lazy';
            imageDiv.appendChild(img);
            
            // Crear contenedor derecho si no existe
            let rightDiv = item.querySelector('.item-right');
            if (!rightDiv) {
                rightDiv = document.createElement('div');
                rightDiv.className = 'item-right';
                
                // Mover el precio al contenedor derecho
                const priceDiv = item.querySelector('.item-price');
                if (priceDiv) {
                    priceDiv.remove();
                    rightDiv.appendChild(priceDiv);
                } else {
                    const newPriceDiv = document.createElement('div');
                    newPriceDiv.className = 'item-price';
                    newPriceDiv.textContent = itemPrice;
                    rightDiv.appendChild(newPriceDiv);
                }
                
                item.appendChild(rightDiv);
            }
            
            // Crear botón de WhatsApp si no existe
            if (!item.querySelector('.btn-whatsapp-item')) {
                const button = document.createElement('button');
                button.className = 'btn-whatsapp-item';
                button.setAttribute('data-name', itemName);
                button.setAttribute('data-price', itemPrice);
                button.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Pedir
                `;
                
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    pedirPlato(itemName, itemPrice);
                });
                
                rightDiv.appendChild(button);
            }
            
            // Insertar imagen al inicio del item
            const itemInfo = item.querySelector('.item-info');
            if (itemInfo) {
                item.insertBefore(imageDiv, itemInfo);
            } else {
                item.insertBefore(imageDiv, item.firstChild);
            }
        }
    });
    
    // Re-aplicar eventos a los botones recién creados
    const newWhatsappButtons = document.querySelectorAll('.btn-whatsapp-item');
    newWhatsappButtons.forEach(function(button) {
        if (!button.hasAttribute('data-listener')) {
            button.setAttribute('data-listener', 'true');
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemName = button.getAttribute('data-name');
                const itemPrice = button.getAttribute('data-price');
                if (itemName && itemPrice) {
                    pedirPlato(itemName, itemPrice);
                }
            });
        }
    });
}

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





