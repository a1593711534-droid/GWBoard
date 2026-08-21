export function createToastRegion() {
  const region = document.createElement('div');
  region.className = 'toast-region';
  region.setAttribute('aria-live', 'polite');
  region.setAttribute('aria-atomic', 'true');
  let timer = null;

  function show(message) {
    window.clearTimeout(timer);
    region.textContent = message;
    region.classList.add('is-visible');
    timer = window.setTimeout(() => {
      region.classList.remove('is-visible');
    }, 2200);
  }

  return { element: region, show };
}
