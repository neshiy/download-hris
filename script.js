// Seven Shine HRIS Target URL & Config
const TARGET_APP_URL = "https://sevenshine-pharmaceuticals-hris.onrender.com";
const IOS_PROFILE_URL = "sevenshine-hris.mobileconfig";

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const btnIos = document.getElementById('btnIos');
  const btnAndroid = document.getElementById('btnAndroid');
  const mainLogo = document.getElementById('mainLogo');

  // Modal Elements
  const installModal = document.getElementById('installModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalPlatformBadge = document.getElementById('modalPlatformBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalInstructions = document.getElementById('modalInstructions');
  const modalPrimaryBtn = document.getElementById('modalPrimaryBtn');
  const modalPrimaryBtnText = document.getElementById('modalPrimaryBtnText');

  let currentPlatform = 'android';

  // 1. Subtle 3D Card Tilt Effect on Mouse Move (Desktop)
  if (cardContainer && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const rect = cardContainer.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      const rotateX = (mouseY / (window.innerHeight / 2)) * -6;
      const rotateY = (mouseX / (window.innerWidth / 2)) * 6;
      
      cardContainer.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    document.addEventListener('mouseleave', () => {
      cardContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 2. Button Ripple Effect
  function createRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const clientX = event.clientX || (event.touches && event.touches[0].clientX) || (rect.left + radius);
    const clientY = event.clientY || (event.touches && event.touches[0].clientY) || (rect.top + radius);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${clientX - rect.left - radius}px`;
    circle.style.top = `${clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  // 3. Sparkle Particle Bursts
  function triggerSparkles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#00b359', '#34d399', '#ffffff', '#6ee7b7'];

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 4;
      
      Object.assign(particle.style, {
        position: 'fixed',
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top + rect.height / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      });

      document.body.appendChild(particle);

      const angle = (i / 8) * 2 * Math.PI + Math.random() * 0.4;
      const distance = Math.random() * 60 + 35;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), 600);
    }
  }

  // 4. Open Modal with Platform-Specific Content
  function openInstallModal(platform, event, button) {
    if (event && button) {
      createRipple(event, button);
      triggerSparkles(button);
    }

    currentPlatform = platform;

    if (platform === 'ios') {
      modalPlatformBadge.textContent = "APPLE IOS APP INSTALL";
      modalPlatformBadge.style.color = "#0f172a";
      modalPlatformBadge.style.background = "rgba(15, 23, 42, 0.08)";
      
      modalTitle.textContent = "Install Seven Shine HRIS";
      modalSubtitle.textContent = "Install Seven Shine HRIS onto your iPhone Home Screen:";

      modalInstructions.innerHTML = `
        <div class="instruction-step">
          <span class="step-num">1</span>
          <span class="step-text">Click <strong>Install Application Now</strong> to download and launch the app.</span>
        </div>
        <div class="instruction-step">
          <span class="step-num">2</span>
          <span class="step-text">In Safari, tap <strong>Share [↑]</strong> and select <strong>Add to Home Screen [+]</strong>.</span>
        </div>
        <div class="instruction-step">
          <span class="step-num">3</span>
          <span class="step-text">The app will be installed directly on your Home Screen with the official logo!</span>
        </div>
      `;

      modalPrimaryBtnText.textContent = "Install Application Now";
    } else {
      modalPlatformBadge.textContent = "ANDROID MOBILE APP INSTALL";
      modalPlatformBadge.style.color = "#008f47";
      modalPlatformBadge.style.background = "rgba(0, 179, 89, 0.1)";

      modalTitle.textContent = "Install Seven Shine HRIS";
      modalSubtitle.textContent = "Install this application to your Home Screen for full-screen access and native performance:";

      modalInstructions.innerHTML = `
        <div class="instruction-step">
          <span class="step-num">1</span>
          <span class="step-text">Click <strong>Install Application Now</strong> below.</span>
        </div>
        <div class="instruction-step">
          <span class="step-num">2</span>
          <span class="step-text">In Chrome, tap <strong>Install App</strong> or <strong>Add to Home screen</strong> in the prompt.</span>
        </div>
        <div class="instruction-step">
          <span class="step-num">3</span>
          <span class="step-text">Seven Shine HRIS is saved directly to your phone's Home Screen with the app logo.</span>
        </div>
      `;

      modalPrimaryBtnText.textContent = "Install Application Now";
    }

    installModal.classList.add('active');
    installModal.setAttribute('aria-hidden', 'false');
  }

  // 5. Close Modal
  function closeModal() {
    installModal.classList.remove('active');
    installModal.setAttribute('aria-hidden', 'true');
  }

  // 6. Handle Primary Modal Action Click (Install & Redirect to https://sevenshine-pharmaceuticals-hris.onrender.com)
  function handlePrimaryAction(e) {
    createRipple(e, modalPrimaryBtn);
    triggerSparkles(modalPrimaryBtn);

    if (currentPlatform === 'ios') {
      showToast("Downloading iOS App Profile & opening Seven Shine HRIS...");
      
      // Download the WebClip profile configured with https://sevenshine-pharmaceuticals-hris.onrender.com
      const link = document.createElement('a');
      link.href = IOS_PROFILE_URL;
      link.download = 'SevenShine-HRIS.mobileconfig';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      closeModal();
      
      // Immediately open target HRIS app URL
      setTimeout(() => {
        window.location.href = TARGET_APP_URL;
      }, 700);
    } else {
      // Android: Immediately redirect to https://sevenshine-pharmaceuticals-hris.onrender.com to install that app
      closeModal();
      showToast("Opening Seven Shine HRIS - saving to Home Screen...");
      setTimeout(() => {
        window.location.href = TARGET_APP_URL;
      }, 400);
    }
  }

  // Event Listeners for Main Buttons
  if (btnIos) {
    btnIos.addEventListener('click', (e) => openInstallModal('ios', e, btnIos));
  }

  if (btnAndroid) {
    btnAndroid.addEventListener('click', (e) => openInstallModal('android', e, btnAndroid));
  }

  // Modal Control Event Listeners
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (modalPrimaryBtn) modalPrimaryBtn.addEventListener('click', handlePrimaryAction);

  // Logo Bounce Interaction
  if (mainLogo) {
    mainLogo.addEventListener('click', (e) => {
      createRipple(e, mainLogo);
      triggerSparkles(mainLogo);
      mainLogo.style.transform = 'scale(1.15) rotate(-5deg)';
      setTimeout(() => {
        mainLogo.style.transform = '';
      }, 300);
    });
  }

  // Toast Notification
  function showToast(message) {
    let existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '28px',
      left: '50%',
      transform: 'translateX(-50%) translateY(30px) scale(0.95)',
      background: 'rgba(15, 23, 42, 0.94)',
      color: '#ffffff',
      padding: '13px 22px',
      borderRadius: '16px',
      fontSize: '0.88rem',
      fontWeight: '600',
      textAlign: 'center',
      zIndex: '10000',
      boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.35)',
      opacity: '0',
      transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      maxWidth: '90%',
      backdropFilter: 'blur(12px)',
      webkitBackdropFilter: 'blur(12px)'
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0) scale(1)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px) scale(0.95)';
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }
});
