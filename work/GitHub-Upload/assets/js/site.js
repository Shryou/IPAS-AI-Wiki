(() => {
  for (const demo of document.querySelectorAll('figure[data-model-demo]')) {
    const controls = demo.querySelector('[data-model-controls]');
    const buttons = [...controls.querySelectorAll('[data-model-select]')];
    const panels = [...demo.querySelectorAll('[data-model-state]')];

    function select(state) {
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.modelSelect === state));
      }
      for (const panel of panels) panel.hidden = panel.dataset.modelState !== state;
    }

    for (const button of buttons) {
      button.addEventListener('click', () => select(button.dataset.modelSelect));
    }
    select(buttons[0].dataset.modelSelect);
    demo.setAttribute('data-model-ready', '');
    controls.hidden = false;
  }

  for (const preview of document.querySelectorAll('details[data-preview]')) {
    const trigger = preview.querySelector('summary');
    let hovered = false;
    let focused = false;
    let pinned = false;
    let dismissed = false;

    function sync() {
      if (!hovered && !focused) dismissed = false;
      preview.open = pinned || (!dismissed && (hovered || focused));
    }

    preview.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = true;
      sync();
    });
    preview.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'mouse') return;
      hovered = false;
      sync();
    });
    trigger.addEventListener('focus', () => {
      focused = trigger.matches(':focus-visible');
      sync();
    });
    trigger.addEventListener('blur', () => {
      focused = false;
      sync();
    });
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      pinned = !pinned;
      dismissed = !pinned;
      sync();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !preview.open) return;
      pinned = false;
      dismissed = true;
      sync();
    });
  }

  const controls = document.querySelector('[data-answer-controls]');
  if (!controls) return;
  const answers = document.querySelectorAll('#answers details');
  for (const button of controls.querySelectorAll('button')) {
    button.addEventListener('click', () => {
      for (const answer of answers) answer.open = button.value === 'open';
    });
  }
  controls.hidden = false;
})();
