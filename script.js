document.querySelectorAll('.guide-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.guide-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.guide-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      openItem.querySelector('.guide-toggle').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const watermarkLayer = document.querySelector('.watermark-layer');
if (watermarkLayer) {
  const watermarkText = watermarkLayer.querySelector('span');
  while (watermarkLayer.children.length < 120) {
    watermarkLayer.append(watermarkText.cloneNode(true));
  }
}

lucide.createIcons();
