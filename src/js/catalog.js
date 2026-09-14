import { FLEET_DATA, CATEGORIES } from './fleet-data.js';

export function initCatalog(onSelectCarForCalc, onBookCarDirect) {
  const filterContainer = document.getElementById('catalog-filters');
  const fleetGrid = document.getElementById('fleet-grid');

  if (!filterContainer || !fleetGrid) return;

  let activeCategory = 'all';

  // Render category buttons
  filterContainer.innerHTML = CATEGORIES.map(cat => `
    <button class="filter-btn ${cat.id === activeCategory ? 'active' : ''}" data-category="${cat.id}">
      <span>${cat.label}</span>
      <span class="filter-count">${cat.id === 'all' ? FLEET_DATA.length : FLEET_DATA.filter(c => c.category === cat.id).length}</span>
    </button>
  `).join('');

  // Render car cards
  function renderCars() {
    const filtered = activeCategory === 'all'
      ? FLEET_DATA
      : FLEET_DATA.filter(car => car.category === activeCategory);

    fleetGrid.innerHTML = filtered.map(car => `
      <div class="car-card" data-id="${car.id}">
        <div class="car-card-top">
          <img src="${car.image}" alt="${car.name}" class="car-card-img" loading="lazy" />
          <span class="badge badge-${car.badgeType} car-card-badge">${car.badge}</span>
          <span class="car-card-class">${car.classTitle}</span>
        </div>

        <div class="car-card-body">
          <div class="car-title-wrap">
            <div>
              <h3 class="car-name">${car.name}</h3>
              <span class="car-year">${car.year} г.в. • ${car.specs.drive}</span>
            </div>
          </div>

          <div class="specs-grid">
            <div class="spec-item">
              <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>${car.specs.transmission}</span>
            </div>
            <div class="spec-item">
              <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              <span>${car.specs.seats}</span>
            </div>
            <div class="spec-item">
              <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>${car.specs.consumption}</span>
            </div>
            <div class="spec-item">
              <svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/>
              </svg>
              <span>${car.specs.climate}</span>
            </div>
          </div>

          <div class="card-days-slider-wrap">
            <div class="card-days-header">
              <span class="card-days-label">Срок аренды</span>
              <span class="card-days-value"><span class="day-val">3</span> суток</span>
            </div>
            <input type="range" class="card-range-slider" min="1" max="30" value="3" step="1" data-car-id="${car.id}" />
          </div>

          <div class="card-footer">
            <div class="price-display">
              <span class="price-caption">Тариф за сутки</span>
              <div class="price-main">
                <span class="price-strike" style="display:none;"></span><span class="price-current">${car.pricing.tier3_7.toLocaleString('ru-RU')} ₸</span><span class="price-unit">/сут</span>
              </div>
              <span class="deposit-info">Залог: ${car.deposit.toLocaleString('ru-RU')} ₸</span>
            </div>
            <button class="btn btn-primary btn-sm btn-calc-car" data-id="${car.id}">
              Рассчитать
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners to Calculate buttons
    fleetGrid.querySelectorAll('.btn-calc-car').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const carId = e.currentTarget.getAttribute('data-id');
        if (onSelectCarForCalc) {
          onSelectCarForCalc(carId);
        }
      });
    });

    // Attach listeners to range sliders
    fleetGrid.querySelectorAll('.card-range-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        const carId = e.target.getAttribute('data-car-id');
        const car = FLEET_DATA.find(c => c.id === carId);
        if (!car) return;

        // Update day text
        const cardBody = e.target.closest('.car-card-body');
        const dayVal = cardBody.querySelector('.day-val');
        if (dayVal) dayVal.textContent = val;

        // Determine price
        let rate = car.pricing.tier1_2;
        if (val >= 15) rate = car.pricing.tier15_plus;
        else if (val >= 8) rate = car.pricing.tier8_14;
        else if (val >= 3) rate = car.pricing.tier3_7;

        const priceCurrent = cardBody.querySelector('.price-current');
        const priceStrike = cardBody.querySelector('.price-strike');

        if (priceCurrent) priceCurrent.textContent = `${rate.toLocaleString('ru-RU')} ₸`;

        if (priceStrike) {
          if (rate < car.pricing.tier1_2) {
            priceStrike.style.display = 'inline';
            priceStrike.textContent = `${car.pricing.tier1_2.toLocaleString('ru-RU')} ₸`;
          } else {
            priceStrike.style.display = 'none';
          }
        }
      });
      // Fire once to initialize strike logic
      slider.dispatchEvent(new Event('input'));
    });
  }

  // Filter click event
  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    activeCategory = btn.getAttribute('data-category');
    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderCars();
  });

  renderCars();
}
