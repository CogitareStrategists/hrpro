document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('show'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('show'));
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('formStatus');
  if (form && statusBox) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      statusBox.className = 'form-status';
      statusBox.textContent = 'Submitting your enquiry...';

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      payload.submittedAt = new Date().toISOString();

      const endpoint = form.dataset.endpoint;
      if (!endpoint || endpoint.includes('PASTE_YOUR')) {
        statusBox.classList.add('error');
        statusBox.textContent = 'Add your Google Apps Script Web App URL in contact.html and assets/js/script.js configuration before going live.';
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        statusBox.classList.add('success');
        statusBox.textContent = 'Thank you. Your message has been submitted successfully.';
        form.reset();
      } catch (error) {
        statusBox.classList.add('error');
        statusBox.textContent = 'Submission failed. Please try again or contact us directly.';
      }
    });
  }
});
