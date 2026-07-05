const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.sheet-nav');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Contact form submitted');

    const data = new FormData(contactForm);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const fullMessage = `${message}\n\n— ${name} (${email})`;

    if (formStatus) {
      formStatus.innerHTML = `
        <strong style="color:var(--text);">Message ready to send.</strong><br>
        Copy it below and email it to
        <a href="mailto:yasirjumani9@gmail.com">yasirjumani9@gmail.com</a>:
        <textarea readonly style="width:100%; margin-top:0.6rem; padding:0.6rem; background:var(--panel); border:1px solid var(--line-dim); color:var(--text); font-family:var(--font-mono); font-size:0.8rem;" rows="3">${fullMessage}</textarea>
        <button type="button" id="copyMsgBtn" class="btn btn-line" style="margin-top:0.6rem;">Copy message</button>
      `;
      const copyBtn = document.getElementById('copyMsgBtn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(fullMessage).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2000);
        });
      });
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(fullMessage);
    window.location.href = `mailto:yasirjumani9@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.querySelectorAll('.sheet-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});
