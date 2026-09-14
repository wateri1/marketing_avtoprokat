import { FAQ_DATA, REVIEWS_DATA } from './fleet-data.js';

export function initFaq() {
  const faqList = document.getElementById('faq-list');
  if (!faqList) return;

  faqList.innerHTML = FAQ_DATA.map((item, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question" aria-expanded="${idx === 0}">
        <span>${item.question}</span>
        <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  faqList.addEventListener('click', (e) => {
    const questionBtn = e.target.closest('.faq-question');
    if (!questionBtn) return;

    const currentItem = questionBtn.closest('.faq-item');
    const wasActive = currentItem.classList.contains('active');

    // Close all
    faqList.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!wasActive) {
      currentItem.classList.add('active');
      questionBtn.setAttribute('aria-expanded', 'true');
    }
  });
}

export function initReviews() {
  const reviewsGrid = document.getElementById('reviews-grid');
  if (!reviewsGrid) return;

  reviewsGrid.innerHTML = REVIEWS_DATA.map(rev => `
    <div class="review-card">
      <div>
        <div class="review-stars">★★★★★</div>
        <p class="review-text">«${rev.text}»</p>
      </div>
      <div class="reviewer-meta">
        <div>
          <div class="reviewer-name">${rev.name}</div>
          <div class="reviewer-city">${rev.city} • ${rev.date}</div>
        </div>
        <span class="review-car-badge">${rev.car}</span>
      </div>
    </div>
  `).join('');
}
