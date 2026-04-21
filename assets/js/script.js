document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
      });
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

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      payload.pageUrl = window.location.href;
      payload.submittedAt = new Date().toISOString();

      const endpoint = form.dataset.endpoint;

      if (!endpoint || endpoint.includes('PASTE_YOUR')) {
        statusBox.classList.add('error');
        statusBox.textContent = 'Please add your Google Apps Script Web App URL in the form data-endpoint before going live.';
        if (submitButton) {
          submitButton.disabled = false;
        }
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.result === 'success') {
          statusBox.classList.add('success');
          statusBox.textContent = 'Thank you. Your message has been submitted successfully.';
          form.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        statusBox.classList.add('error');
        statusBox.textContent = 'Submission failed. Please try again or contact us directly.';
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  }
});
