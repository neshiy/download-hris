// Configuration: Set your actual download links or app store URLs here
const APP_DOWNLOAD_CONFIG = {
  ios: {
    title: "iOS Application",
    url: "#", // Replace with your TestFlight, App Store, or direct IPA link
    message: "Redirecting to Apple App Store..."
  },
  android: {
    title: "Android Application",
    url: "#", // Replace with your APK download link or Google Play Store URL
    message: "Starting Android APK download..."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const btnIos = document.getElementById('btnIos');
  const btnAndroid = document.getElementById('btnAndroid');
  const logoWrapper = document.querySelector('.logo-wrapper');

  // 1. Subtle 3D Card Tilt Effect on Mouse Move
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

  // 2. Ripple Effect on Button Press
  function createRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${(event.clientX || (event.touches && event.touches[0].clientX) || rect.left + radius) - rect.left - radius}px`;
    circle.style.top = `${(event.clientY || (event.touches && event.touches[0].touches) || rect.top + radius) - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  // 3. Handle Button Clicks with Micro-interactions & Toast
  function handleDownloadClick(e, platform, button) {
    createRipple(e, button);
    triggerSparkles(button);

    const config = APP_DOWNLOAD_CONFIG[platform];
    if (config.url && config.url !== '#') {
      return; // Allow native navigation if a real URL is set
    }
    
    e.preventDefault();
    showFeedbackToast(`🚀 ${config.title}: Ready for download! Connect your link in script.js.`);
  }

  if (btnIos) {
    btnIos.addEventListener('click', (e) => handleDownloadClick(e, 'ios', btnIos));
  }

  if (btnAndroid) {
    btnAndroid.addEventListener('click', (e) => handleDownloadClick(e, 'android', btnAndroid));
  }

  // 4. Interactive Logo Pop
  if (logoWrapper) {
    logoWrapper.addEventListener('click', (e) => {
      createRipple(e, logoWrapper);
      logoWrapper.style.transform = 'scale(1.15) rotate(-5deg)';
      setTimeout(() => {
        logoWrapper.style.transform = '';
      }, 300);
    });
  }

  // 5. Particle Sparkle Bursts
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

  // 6. Aesthetic Toast Notification
  function showFeedbackToast(message) {
    let existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

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
      boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)',
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
    }, 3800);
  }
});
