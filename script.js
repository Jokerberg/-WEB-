const accessKey = 'huaide-guide-access';
const accessPassword = 'hd520';
const accessModal = document.querySelector('#access-modal');
const accessForm = document.querySelector('#access-modal-form');
const passwordInput = document.querySelector('#access-password');
const accessError = document.querySelector('#access-modal-error');
const accessModalClose = document.querySelector('#access-modal-close');
let pendingButton = null;
let hasAccess = localStorage.getItem(accessKey) === 'granted';

function closeAllGuides() {
  document.querySelectorAll('.guide-item.open').forEach((openItem) => {
    openItem.classList.remove('open');
    openItem.querySelector('.guide-toggle').setAttribute('aria-expanded', 'false');
  });
}

function toggleGuide(button) {
  const item = button.closest('.guide-item');
  const isOpen = item.classList.contains('open');
  closeAllGuides();
  if (!isOpen) {
    item.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
}

function showAccessModal(button) {
  pendingButton = button;
  accessError.textContent = '';
  passwordInput.value = '';
  accessModal.hidden = false;
  passwordInput.focus();
}

function closeAccessModal() {
  accessModal.hidden = true;
  pendingButton = null;
}

if (!hasAccess) {
  closeAllGuides();
}

document.querySelectorAll('.guide-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    if (!hasAccess) {
      showAccessModal(button);
      return;
    }
    toggleGuide(button);
  });
});

accessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (passwordInput.value !== accessPassword) {
    accessError.textContent = '密码不正确，请重新输入。';
    passwordInput.select();
    return;
  }

  localStorage.setItem(accessKey, 'granted');
  hasAccess = true;
  accessModal.hidden = true;
  if (pendingButton) {
    toggleGuide(pendingButton);
    pendingButton = null;
  }
});

accessModalClose.addEventListener('click', closeAccessModal);

const watermarkLayer = document.querySelector('.watermark-layer');
if (watermarkLayer) {
  const watermarkText = watermarkLayer.querySelector('span');
  while (watermarkLayer.children.length < 120) {
    watermarkLayer.append(watermarkText.cloneNode(true));
  }
}

lucide.createIcons();
