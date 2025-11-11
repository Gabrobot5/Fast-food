
// ===== CARRINHO =====
let cart = [];
let total = 0;

// ===== NAVEGAÇÃO SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== FILTRO DE CATEGORIAS =====
document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', function () {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.product-category').forEach(category => category.classList.remove('active'));
    const categoryId = this.getAttribute('data-category');
    const target = document.getElementById(categoryId);
    if (target) target.classList.add('active');
  });
});

// ===== ADICIONAR AO CARRINHO =====
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const productCard = this.closest('.product-card');
    if (!productCard) return;
    const titleEl = productCard.querySelector('h3');
    const priceEl = productCard.querySelector('.price');
    const name = titleEl ? titleEl.textContent.trim() : 'Item';
    let price = 0;
    if (priceEl) {
      price = parseFloat(priceEl.textContent.replace('R$', '').replace('R$ ', '').replace(',', '.')) || 0;
    }

    cart.push({ name, price });
    total += price;
    updateCart();

    const prevText = this.textContent;
    this.textContent = 'Adicionado!';
    this.style.background = '#BFA307';
    this.style.color = '#1A2522';
    setTimeout(() => {
      this.textContent = prevText || 'Adicionar';
      this.style.background = '';
      this.style.color = '';
    }, 1000);
  });
});

// ===== CONTADOR COM PULINHO =====
function updateCart() {
  const count = document.querySelector('.cart-count');
  if (!count) return;
  count.textContent = cart.length;
  count.style.transform = 'scale(1.5)';
  count.style.background = '#F5E8C7';
  count.style.color = '#1A2522';
  setTimeout(() => {
    count.style.transform = 'scale(1)';
    count.style.background = '#BFA307';
    count.style.color = '#1A2522';
  }, 200);
}

// ===== MODAL DO CARRINHO =====
const cartButton = document.querySelector('.cart');
if (cartButton) {
  cartButton.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;z-index:2000;backdrop-filter:blur(8px);`;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `background:#F5E8C7;padding:2.5rem;border-radius:20px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 20px 50px rgba(0,0,0,0.3);text-align:center;`;

    const closeBtn = `<button style="background:#1A2522;color:#F5E8C7;padding:12px 30px;border:none;border-radius:30px;cursor:pointer;font-weight:600;margin-top:1rem;">Fechar</button>`;

    if (cart.length === 0) {
      modalContent.innerHTML = `<h2 style="color:#1A2522;margin-bottom:1rem;">Seu carrinho está vazio</h2><p>Poxa, cadê os burgers?</p>${closeBtn}`;
    } else {
      const items = cart.map(item => `<li style="text-align:left;padding:0.5rem 0;border-bottom:1px solid #ddd;">${item.name} - R$ ${item.price.toFixed(2).replace('.', ',')}</li>`).join('');
      modalContent.innerHTML = `<h2 style="color:#1A2522;margin-bottom:1rem;">Seu Pedido</h2><ul style="list-style:none;margin:1.5rem 0;padding:0;">${items}</ul><p style="font-size:1.4rem;font-weight:bold;color:#1A2522;">Total: R$ ${total.toFixed(2).replace('.', ',')}</p><p style="margin:1rem 0;color:#555;">Entrega em 35 min</p>${closeBtn}`;
    }

    modalContent.querySelector('button').onclick = () => modal.remove();
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  });
}

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  header.style.background = window.scrollY > 100 ? 'rgba(26, 37, 34, 0.98)' : '#1A2522';
  header.style.padding = window.scrollY > 100 ? '0.7rem 0' : '1.2rem 0';
});

// ===== MENU MOBILE =====
const mobileToggle = document.querySelector('.mobile-toggle');
const navList = document.querySelector('.nav-list');
if (mobileToggle && navList) {
  mobileToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navList) navList.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
  });
});