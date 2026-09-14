export class BookingModal {
  constructor() {
    this.overlay = document.getElementById('booking-modal');
    this.closeBtn = document.getElementById('modal-close-btn');
    this.form = document.getElementById('modal-booking-form');
    this.summaryBox = document.getElementById('modal-summary-content');
    this.successBox = document.getElementById('modal-success-state');
    this.phoneInput = document.getElementById('modal-phone-input');

    this.currentData = null;
    this.init();
  }

  init() {
    if (!this.overlay) return;

    this.closeBtn?.addEventListener('click', () => this.close());

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });

    this.initPhoneMask();
    this.initFormSubmit();
  }

  open(data) {
    this.currentData = data;
    if (this.successBox) this.successBox.style.display = 'none';
    if (this.form) this.form.style.display = 'block';

    if (this.summaryBox && data) {
      this.summaryBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong>${data.car.name} (${data.car.year})</strong>
          <span style="color:var(--accent-primary); font-weight:700;">${data.totalPrice.toLocaleString('ru-RU')} ₸</span>
        </div>
        <div style="font-size:0.8rem; color:var(--text-muted);">
          Срок: ${data.days} суток • Залог: ${data.deposit.toLocaleString('ru-RU')} ₸
        </div>
      `;
    }

    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  initPhoneMask() {
    if (!this.phoneInput) return;

    this.phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.startsWith('7') || val.startsWith('8')) {
        val = val.substring(1);
      }

      let formatted = '+7 ';
      if (val.length > 0) {
        formatted += '(' + val.substring(0, 3);
      }
      if (val.length >= 3) {
        formatted += ') ' + val.substring(3, 6);
      }
      if (val.length >= 6) {
        formatted += '-' + val.substring(6, 8);
      }
      if (val.length >= 8) {
        formatted += '-' + val.substring(8, 10);
      }

      e.target.value = formatted;
    });
  }

  initFormSubmit() {
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show success message
      if (this.form) this.form.style.display = 'none';
      if (this.successBox) {
        this.successBox.style.display = 'block';
        this.successBox.innerHTML = `
          <div style="text-align:center; padding: 20px 0;">
            <div style="font-size:3rem; margin-bottom:12px;">🎉</div>
            <h3 style="margin-bottom:8px; color:var(--accent-green);">Заявка успешно принята!</h3>
            <p style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:24px;">
              Менеджер свяжется с вами по указанному телефону в течение 5 минут для подтверждения бронирования <strong>${this.currentData?.car?.name || ''}</strong>.
            </p>
            <button class="btn btn-secondary btn-sm" id="modal-success-close">Закрыть</button>
          </div>
        `;

        document.getElementById('modal-success-close')?.addEventListener('click', () => {
          this.close();
        });
      }
    });
  }
}
