export class InfiniteCanvasShell {
  #canvas;
  #context;
  #resizeObserver;
  #viewport;

  constructor(host) {
    this.#viewport = document.createElement('section');
    this.#viewport.className = 'board-viewport';
    this.#viewport.dataset.background = 'plain';
    this.#viewport.dataset.engineStatus = 'shell';
    this.#viewport.setAttribute('aria-label', '無限白板畫布，第一階段介面骨架');
    this.#viewport.tabIndex = 0;

    this.#canvas = document.createElement('canvas');
    this.#canvas.className = 'ink-canvas';
    this.#canvas.setAttribute('aria-hidden', 'true');
    this.#viewport.append(this.#canvas);
    host.append(this.#viewport);

    this.#context = this.#canvas.getContext('2d', { alpha: true });
    this.#resizeObserver = new ResizeObserver(() => this.resize());
    this.#resizeObserver.observe(this.#viewport);
    this.resize();
  }

  get element() {
    return this.#viewport;
  }

  setBackground(background) {
    this.#viewport.dataset.background = background;
  }

  resize() {
    const { width, height } = this.#viewport.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
    const nextWidth = Math.max(1, Math.round(width * pixelRatio));
    const nextHeight = Math.max(1, Math.round(height * pixelRatio));

    if (this.#canvas.width === nextWidth && this.#canvas.height === nextHeight) {
      return;
    }

    this.#canvas.width = nextWidth;
    this.#canvas.height = nextHeight;
    this.#canvas.style.width = `${width}px`;
    this.#canvas.style.height = `${height}px`;
    this.#context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    this.#context.clearRect(0, 0, width, height);
  }

  destroy() {
    this.#resizeObserver.disconnect();
  }
}
