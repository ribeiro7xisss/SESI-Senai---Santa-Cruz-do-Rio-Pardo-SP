(() => {
  const panel = document.querySelector('.search-panel');
  const input = document.querySelector('#siteSearch');
  const nav = document.querySelector('.main-nav');
  const countEl = document.querySelector('.bag-count');
  const CART_KEY = 'academyshop_cart';
  const FAV_KEY = 'academyshop_favorites';

  const read = (key) => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const updateCount = () => { if (countEl) countEl.textContent = read(CART_KEY).length; };

  document.querySelector('.search-toggle')?.addEventListener('click', () => {
    panel?.classList.add('open'); input?.focus();
  });
  document.querySelector('.search-close')?.addEventListener('click', () => panel?.classList.remove('open'));
  document.querySelector('.mobile-toggle')?.addEventListener('click', () => nav?.classList.toggle('open'));

  document.querySelectorAll('.buy-btn').forEach((button) => button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const item = {
      name: card?.querySelector('h3')?.textContent?.trim() || 'Produto',
      price: card?.querySelector('strong')?.textContent?.trim() || '',
      image: card?.querySelector('img')?.getAttribute('src') || ''
    };
    const cart = read(CART_KEY); cart.push(item); write(CART_KEY, cart); updateCount();
    const old = button.innerHTML;
    button.innerHTML = 'Adicionado <i class="fa-solid fa-check"></i>';
    button.classList.add('added');
    setTimeout(() => { button.innerHTML = old; button.classList.remove('added'); }, 1200);
  }));

  document.querySelectorAll('.heart').forEach((button) => {
    const card = button.closest('.product-card');
    const name = card?.querySelector('h3')?.textContent?.trim() || '';
    const icon = button.querySelector('i');
    if (read(FAV_KEY).includes(name)) { icon?.classList.replace('fa-regular','fa-solid'); }
    button.addEventListener('click', () => {
      let favs = read(FAV_KEY);
      if (favs.includes(name)) { favs = favs.filter(x => x !== name); icon?.classList.replace('fa-solid','fa-regular'); }
      else { favs.push(name); icon?.classList.replace('fa-regular','fa-solid'); }
      write(FAV_KEY, favs);
    });
  });

  input?.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.product-card').forEach((card) => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  document.querySelector('.newsletter form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input')?.value?.trim();
    if (email) localStorage.setItem('academyshop_newsletter_email', email);
    e.target.reset();
  });

  updateCount();
})();
