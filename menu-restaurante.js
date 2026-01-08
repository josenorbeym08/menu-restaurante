// Número de WhatsApp (cambiar por el número real del restaurante)
const WHATSAPP_NUMBER = '573005979838'; // Formato: código de país + número sin espacios ni símbolos

// Estado del carrito
let cart = [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    initializeCart();
    showCategory('all');
});

// Filtros de categorías
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar active al botón clickeado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            showCategory(filter);
        });
    });
}

function showCategory(category) {
    const sections = document.querySelectorAll('.menu-section');
    
    sections.forEach(section => {
        if (category === 'all') {
            section.classList.add('active');
        } else {
            const sectionCategory = section.getAttribute('data-category');
            if (sectionCategory === category) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        }
    });
}

// Funcionalidad del carrito
function initializeCart() {
    // Botones de agregar al carrito
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const item = btn.getAttribute('data-item');
            const price = parseFloat(btn.getAttribute('data-price'));
            addToCart(item, price);
        });
    });
    
    // Botón flotante del carrito
    const cartButton = document.getElementById('whatsappCart');
    cartButton.addEventListener('click', () => {
        openCart();
    });
    
    // Cerrar carrito
    const closeCartBtn = document.getElementById('closeCart');
    closeCartBtn.addEventListener('click', () => {
        closeCart();
    });
    
    // Enviar pedido por WhatsApp
    const sendWhatsAppBtn = document.getElementById('sendWhatsApp');
    sendWhatsAppBtn.addEventListener('click', () => {
        sendOrderToWhatsApp();
    });
    
    // Cerrar al hacer click fuera del modal
    const cartModal = document.getElementById('cartModal');
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });
    
    updateCartUI();
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${itemName} agregado al carrito`);
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartUI();
    showNotification('Item removido del carrito');
}

function updateQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCartUI();
        }
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
    }
    
    // Actualizar lista de items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Actualizar total
    cartTotal.textContent = calculateTotal().toFixed(2);
    
    // Habilitar/deshabilitar botón de enviar
    const sendBtn = document.getElementById('sendWhatsApp');
    sendBtn.disabled = cart.length === 0;
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Enviar pedido por WhatsApp
function sendOrderToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    // Construir mensaje
    let message = '🍽️ *NUEVO PEDIDO*\n\n';
    message += '📋 *Detalle del pedido:*\n\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        message += `   Precio: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `💰 *Total: $${calculateTotal().toFixed(2)}*\n\n`;
    message += 'Gracias por tu pedido! 🎉';
    
    // Crear URL de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpiar carrito después de enviar
    setTimeout(() => {
        cart = [];
        updateCartUI();
        closeCart();
        showNotification('Pedido enviado por WhatsApp', 'success');
    }, 500);
}

// Notificaciones
function showNotification(message, type = 'success') {
    // Remover notificación existente
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#ff4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        font-size: 14px;
        max-width: 300px;
    `;
    
    // Agregar animación
    if (!document.querySelector('#notification-animation')) {
        const style = document.createElement('style');
        style.id = 'notification-animation';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Hacer funciones disponibles globalmente para onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

