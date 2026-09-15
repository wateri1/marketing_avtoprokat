import { FLEET_DATA, CATEGORIES, getDailyRate } from './fleet-data.js';

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
        <div class="car-card-top btn-open-details" data-id="${car.id}" role="button" tabindex="0">
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
                <span class="price-strike" style="display:none;"></span><span class="price-current">${getDailyRate(car, 3).toLocaleString('ru-RU')} ₸</span>
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

    // Attach listeners to details buttons
    fleetGrid.querySelectorAll('.btn-open-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const carId = e.currentTarget.getAttribute('data-id');
        const car = FLEET_DATA.find(c => c.id === carId);
        if (window.carDetailsModal && car) {
          window.carDetailsModal.open(car);
        }
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.currentTarget.click();
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
        let rate = getDailyRate(car, val);

        const priceCurrent = cardBody.querySelector('.price-current');
        const priceStrike = cardBody.querySelector('.price-strike');

        if (priceCurrent) priceCurrent.textContent = `${rate.toLocaleString('ru-RU')} ₸`;

        if (priceStrike) {
          const baseRate = car.pricing.tier1_2 || 0;
          if (rate < baseRate) {
            priceStrike.style.display = 'inline';
            priceStrike.textContent = `${baseRate.toLocaleString('ru-RU')} ₸`;
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
