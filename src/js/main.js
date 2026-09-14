import '../css/variables.css';
import '../css/base.css';
import '../css/components.css';
import '../css/calculator.css';
import '../css/responsive.css';

import { initCatalog } from './catalog.js';
import { RentalCalculator } from './calculator.js';
import { BookingModal } from './modal.js';
import { initFaq, initReviews } from './faq.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize modal
  const modal = new BookingModal();

  // 2. Initialize calculator
  const calculator = new RentalCalculator({
    onOpenModal: (calcData) => {
      modal.open(calcData);
    }
  });

  // 3. Initialize fleet catalog
  initCatalog(
    // onSelectCarForCalc
    (carId) => {
      calculator.selectCarById(carId);
    },
    // onBookCarDirect
    (car) => {
      modal.open({
        car,
        days: 3,
        totalPrice: car.pricing.tier3_7 * 3,
        deposit: car.deposit,
        optionsList: []
      });
    }
  );

  // 4. Initialize FAQ and Reviews
  initFaq();
  initReviews();

  // 5. Header / Hero direct modal trigger
  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.open({
        car: calculator.selectedCar,
        days: calculator.days,
        totalPrice: calculator.lastCalculation?.totalPrice || 0,
        deposit: calculator.lastCalculation?.deposit || 0,
        optionsList: calculator.lastCalculation?.activeOptionsLabels || []
      });
    });
  });

  // 6. Mobile sticky action button
  const mobileBarBtn = document.getElementById('mobile-bar-btn');
  mobileBarBtn?.addEventListener('click', () => {
    modal.open({
      car: calculator.selectedCar,
      days: calculator.days,
      totalPrice: calculator.lastCalculation?.totalPrice || 0,
      deposit: calculator.lastCalculation?.deposit || 0,
      optionsList: calculator.lastCalculation?.activeOptionsLabels || []
    });
  });

  console.log('🚗 Avtoprokat application initialized successfully.');
});
