import { FLEET_DATA, EXTRA_OPTIONS } from './fleet-data.js';

export class RentalCalculator {
  constructor(options = {}) {
    this.customSelect = document.getElementById('calc-custom-select');
    this.customTrigger = document.getElementById('custom-select-trigger');
    this.customDropdown = document.getElementById('custom-select-dropdown');
    this.customImg = document.getElementById('custom-select-img');
    this.customName = document.getElementById('custom-select-name');
    this.customPrice = document.getElementById('custom-select-price');
    
    this.daysSlider = document.getElementById('calc-days-slider');
    this.daysNumber = document.getElementById('calc-days-number');
    this.btnMinus = document.getElementById('calc-days-minus');
    this.btnPlus = document.getElementById('calc-days-plus');
    this.quickDaysWrap = document.getElementById('calc-quick-days');
    this.optionsWrap = document.getElementById('calc-options-wrap');
    this.tierBadge = document.getElementById('calc-tier-badge');

    // Receipt elements
    this.receiptThumb = document.getElementById('receipt-car-thumb');
    this.receiptTitle = document.getElementById('receipt-car-title');
    this.receiptClass = document.getElementById('receipt-car-class');
    
    this.receiptDaysVal = document.getElementById('receipt-days-val');
    this.receiptRate = document.getElementById('receipt-daily-rate');
    
    this.receiptOptionsRow = document.getElementById('receipt-options-row');
    this.receiptOptionsVal = document.getElementById('receipt-options-val');
    
    this.receiptStrikePrice = document.getElementById('receipt-strike-price');
    this.receiptTotalPrice = document.getElementById('receipt-total-price');
    
    this.receiptDeposit = document.getElementById('receipt-deposit-val');

    // Action buttons
    this.btnWhatsApp = document.getElementById('calc-btn-whatsapp');
    this.btnTelegram = document.getElementById('calc-btn-telegram');
    this.btnModal = document.getElementById('calc-btn-modal');

    // Mobile sticky bar elements
    this.mobileBarPrice = document.getElementById('mobile-bar-price');
    this.mobileBarCar = document.getElementById('mobile-bar-car');

    // State
    this.selectedCar = FLEET_DATA[0];
    this.days = 3;
    this.selectedOptions = new Set();
    this.onOpenModal = options.onOpenModal;

    this.init();
  }

  init() {
    this.renderCarSelect();
    this.renderOptions();
    if (this.customTrigger) {
      this.customTrigger.setAttribute('tabindex', '0');
      this.customTrigger.setAttribute('role', 'combobox');
      this.customTrigger.setAttribute('aria-haspopup', 'listbox');
    }
    this.updateCustomSelectUI();
    this.attachEventListeners();
    this.calculate();
  }

  renderCarSelect() {
    if (!this.customDropdown) return;
    this.customDropdown.innerHTML = FLEET_DATA.map(car => `
      <div class="custom-option" data-value="${car.id}" tabindex="0" role="option">
        <img src="${car.image}" class="custom-select-img" alt="${car.name}" />
        <div class="custom-select-text">
          <span class="custom-select-name">${car.name} (${car.classTitle})</span>
          <span class="custom-select-price">от ${car.pricing.tier15_plus.toLocaleString('ru-RU')} ₸/сут</span>
        </div>
      </div>
    `).join('');
  }

  updateCustomSelectUI() {
    if (!this.selectedCar || !this.customImg) return;
    this.customImg.src = this.selectedCar.image;
    this.customName.textContent = `${this.selectedCar.name} (${this.selectedCar.classTitle})`;
    this.customPrice.textContent = `от ${this.selectedCar.pricing.tier15_plus.toLocaleString('ru-RU')} ₸/сут`;
    
    if (this.customDropdown) {
      this.customDropdown.querySelectorAll('.custom-option').forEach(opt => {
        opt.classList.toggle('selected', opt.getAttribute('data-value') === this.selectedCar.id);
      });
    }
  }

  renderOptions() {
    if (!this.optionsWrap) return;
    this.optionsWrap.innerHTML = EXTRA_OPTIONS.map(opt => `
      <label class="option-checkbox-label" data-opt-id="${opt.id}">
        <input type="checkbox" class="option-input" value="${opt.id}" />
        <div class="option-details">
          <div class="option-header">
            <span class="option-name">${opt.label}</span>
            <span class="option-price-tag">+${opt.price.toLocaleString('ru-RU')} ₸${opt.type === 'per_day' ? '/сут' : ''}</span>
          </div>
          <p class="option-desc">${opt.description}</p>
        </div>
      </label>
    `).join('');
  }

  attachEventListeners() {
    // Custom select toggle
    this.customTrigger?.addEventListener('click', () => {
      this.customSelect?.classList.toggle('open');
    });

    this.customTrigger?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.customSelect?.classList.toggle('open');
      }
    });

    // Custom select option click
    this.customDropdown?.addEventListener('click', (e) => {
      const option = e.target.closest('.custom-option');
      if (!option) return;
      
      const carId = option.getAttribute('data-value');
      const car = FLEET_DATA.find(c => c.id === carId);
      if (car) {
        this.selectedCar = car;
        this.updateCustomSelectUI();
        this.calculate();
      }
      this.customSelect?.classList.remove('open');
    });

    this.customDropdown?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.closest('.custom-option')?.click();
      }
    });

    // Close select on outside click
    document.addEventListener('click', (e) => {
      if (this.customSelect && !this.customSelect.contains(e.target)) {
        this.customSelect.classList.remove('open');
      }
    });

    // Slider
    this.daysSlider?.addEventListener('input', (e) => {
      this.days = parseInt(e.target.value, 10);
      this.syncDaysInput();
      this.calculate();
    });

    // Plus / Minus buttons
    this.btnMinus?.addEventListener('click', () => {
      if (this.days > 1) {
        this.days--;
        this.syncDaysInput();
        this.calculate();
      }
    });

    this.btnPlus?.addEventListener('click', () => {
      if (this.days < 60) {
        this.days++;
        this.syncDaysInput();
        this.calculate();
      }
    });

    // Quick day buttons
    this.quickDaysWrap?.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-day-btn');
      if (!btn) return;
      const d = parseInt(btn.getAttribute('data-days'), 10);
      if (d) {
        this.days = d;
        this.syncDaysInput();
        this.calculate();
      }
    });

    // Options checkboxes
    this.optionsWrap?.addEventListener('change', (e) => {
      if (e.target.classList.contains('option-input')) {
        const optId = e.target.value;
        const parentLabel = e.target.closest('.option-checkbox-label');

        if (e.target.checked) {
          this.selectedOptions.add(optId);
          parentLabel?.classList.add('selected');
        } else {
          this.selectedOptions.delete(optId);
          parentLabel?.classList.remove('selected');
        }
        this.calculate();
      }
    });

    // Modal button
    this.btnModal?.addEventListener('click', () => {
      if (this.onOpenModal) {
        this.onOpenModal({
          car: this.selectedCar,
          days: this.days,
          totalPrice: this.lastCalculation?.totalPrice || 0,
          deposit: this.lastCalculation?.deposit || 0,
          optionsList: this.lastCalculation?.activeOptionsLabels || []
        });
      }
    });
  }

  syncDaysInput() {
    if (this.daysSlider) this.daysSlider.value = this.days;
    if (this.daysNumber) this.daysNumber.textContent = this.days;

    // Sync quick pills
    this.quickDaysWrap?.querySelectorAll('.quick-day-btn').forEach(btn => {
      const d = parseInt(btn.getAttribute('data-days'), 10);
      btn.classList.toggle('active', d === this.days);
    });
  }

  selectCarById(carId) {
    const car = FLEET_DATA.find(c => c.id === carId);
    if (car) {
      this.selectedCar = car;
      this.updateCustomSelectUI();
      this.calculate();

      // Smooth scroll to calculator
      const calcSection = document.getElementById('calculator');
      if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  calculate() {
    const car = this.selectedCar;
    const days = this.days;

    // 1. Determine daily tier
    let dailyRate = car.pricing.tier1_2;
    let tierName = '1-2 дня (базовый тариф)';
    let discountPercent = 0;

    if (days >= 15) {
      dailyRate = car.pricing.tier15_plus;
      tierName = 'Скидка 25% (от 15 суток)';
      discountPercent = Math.round((1 - dailyRate / car.pricing.tier1_2) * 100);
    } else if (days >= 8) {
      dailyRate = car.pricing.tier8_14;
      tierName = 'Скидка 18% (8-14 суток)';
      discountPercent = Math.round((1 - dailyRate / car.pricing.tier1_2) * 100);
    } else if (days >= 3) {
      dailyRate = car.pricing.tier3_7;
      tierName = 'Скидка 11% (3-7 суток)';
      discountPercent = Math.round((1 - dailyRate / car.pricing.tier1_2) * 100);
    }

    // Update tier badge in builder
    if (this.tierBadge) {
      this.tierBadge.textContent = discountPercent > 0
        ? `🔥 Экономия ${discountPercent}% за срок`
        : 'Базовый тариф';
    }

    // 2. Base rental price and saved amount
    const standardCost = car.pricing.tier1_2 * days;
    const actualBaseCost = dailyRate * days;
    const savedAmount = standardCost - actualBaseCost;

    // 3. Options cost
    let optionsCost = 0;
    let hasFullCasco = false;
    const activeOptionsLabels = [];

    this.selectedOptions.forEach(optId => {
      const opt = EXTRA_OPTIONS.find(o => o.id === optId);
      if (!opt) return;

      activeOptionsLabels.push(opt.label);

      if (opt.id === 'full_casco') {
        hasFullCasco = true;
      }

      if (opt.type === 'fixed') {
        optionsCost += opt.price;
      } else if (opt.type === 'per_day') {
        let optSum = opt.price * days;
        if (opt.maxPrice && optSum > opt.maxPrice) {
          optSum = opt.maxPrice;
        }
        optionsCost += optSum;
      }
    });

    // 4. Deposit
    const finalDeposit = hasFullCasco ? 0 : car.deposit;

    // 5. Total
    const totalPrice = actualBaseCost + optionsCost;

    this.lastCalculation = {
      car,
      days,
      dailyRate,
      standardCost,
      actualBaseCost,
      savedAmount,
      optionsCost,
      totalPrice,
      deposit: finalDeposit,
      hasFullCasco,
      activeOptionsLabels
    };

    this.updateReceiptView();
    this.updateMessengerLinks();
  }

  updateReceiptView() {
    const calc = this.lastCalculation;
    if (!calc) return;

    if (this.receiptThumb) this.receiptThumb.src = calc.car.image;
    if (this.receiptTitle) this.receiptTitle.textContent = `${calc.car.name} (${calc.car.year})`;
    if (this.receiptClass) this.receiptClass.textContent = calc.car.classTitle;

    if (this.receiptDaysVal) {
      this.receiptDaysVal.textContent = `${calc.days} сут`;
    }

    if (this.receiptRate) {
      this.receiptRate.textContent = `${calc.dailyRate.toLocaleString('ru-RU')} ₸/сут`;
    }

    if (this.receiptOptionsRow && this.receiptOptionsVal) {
      if (calc.optionsCost > 0) {
        this.receiptOptionsRow.style.display = 'flex';
        this.receiptOptionsVal.textContent = `+${calc.optionsCost.toLocaleString('ru-RU')} ₸`;
      } else {
        this.receiptOptionsRow.style.display = 'none';
      }
    }
    
    if (this.receiptStrikePrice) {
      if (calc.savedAmount > 0) {
        this.receiptStrikePrice.style.display = 'inline-block';
        // The crossed out price is standardCost + optionsCost
        const oldTotal = calc.standardCost + calc.optionsCost;
        this.receiptStrikePrice.textContent = `${oldTotal.toLocaleString('ru-RU')} ₸`;
      } else {
        this.receiptStrikePrice.style.display = 'none';
      }
    }

    if (this.receiptTotalPrice) {
      this.receiptTotalPrice.textContent = `${calc.totalPrice.toLocaleString('ru-RU')} ₸`;
    }

    if (this.receiptDeposit) {
      this.receiptDeposit.textContent = calc.hasFullCasco
        ? '0 ₸ (КАСКО без франшизы)'
        : `${calc.deposit.toLocaleString('ru-RU')} ₸`;
    }

    // Mobile sticky bar
    if (this.mobileBarPrice) {
      this.mobileBarPrice.textContent = `${calc.totalPrice.toLocaleString('ru-RU')} ₸`;
    }
    if (this.mobileBarCar) {
      this.mobileBarCar.textContent = `${calc.car.name} • ${calc.days} дн.`;
    }
  }

  updateMessengerLinks() {
    const calc = this.lastCalculation;
    if (!calc) return;

    const optionsText = calc.activeOptionsLabels.length > 0
      ? calc.activeOptionsLabels.join(', ')
      : 'Без доп. опций';

    const message = [
      `Здравствуйте! Хочу забронировать автомобиль в автопрокате:`,
      `🚗 Автомобиль: ${calc.car.name} (${calc.car.year}, ${calc.car.classTitle})`,
      `📅 Срок аренды: ${calc.days} суток`,
      `💰 Тариф: ${calc.dailyRate.toLocaleString('ru-RU')} ₸/сут`,
      calc.savedAmount > 0 ? `🎁 Скидка за срок: -${calc.savedAmount.toLocaleString('ru-RU')} ₸` : null,
      `✨ Доп. опции: ${optionsText} (+${calc.optionsCost.toLocaleString('ru-RU')} ₸)`,
      `💵 ИТОГО К ОПЛАТЕ: ${calc.totalPrice.toLocaleString('ru-RU')} ₸`,
      `🛡️ Возвратный залог: ${calc.hasFullCasco ? '0 ₸ (КАСКО)' : calc.deposit.toLocaleString('ru-RU') + ' ₸'}`,
      ``,
      `Подскажите, свободен ли авто на ближайшие даты?`
    ].filter(Boolean).join('\n');

    const encodedMsg = encodeURIComponent(message);

    // WhatsApp link (standard car rental business number format)
    if (this.btnWhatsApp) {
      this.btnWhatsApp.href = `https://wa.me/77011234567?text=${encodedMsg}`;
    }

    // Telegram link
    if (this.btnTelegram) {
      this.btnTelegram.href = `https://t.me/avtoprokat_booking?text=${encodedMsg}`;
    }
  }
}
