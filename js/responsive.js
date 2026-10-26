/* Little Universe responsive behavior.
   Uses live viewport measurements instead of user-agent sniffing, so it adapts
   to resizes, rotation, split-screen, and browser chrome changes. */
(() => {
  const root = document.documentElement;
  let frame = 0;

  function updateViewportState() {
    frame = 0;
    const width = Math.round(window.visualViewport?.width || window.innerWidth);
    const height = Math.round(window.visualViewport?.height || window.innerHeight);
    const isMobileWidth = width <= 760;
    const isLandscape = width > height;
    const layout = isMobileWidth
      ? (isLandscape ? "mobile-landscape" : "mobile-portrait")
      : (isLandscape ? "desktop-landscape" : "desktop-portrait");

    root.dataset.layout = layout;
    root.dataset.orientation = isLandscape ? "landscape" : "portrait";
    root.dataset.input = window.matchMedia("(pointer: coarse)").matches ? "touch" : "precise";
    root.style.setProperty("--live-vh", `${height * 0.01}px`);
    root.style.setProperty("--live-vw", `${width * 0.01}px`);
    root.classList.toggle("is-short-viewport", height < 520);

    // Expose a small event for other interactive modules, such as game canvases.
    window.dispatchEvent(new CustomEvent("littleuniverse:viewportchange", {
      detail: { width, height, layout, orientation: root.dataset.orientation, input: root.dataset.input }
    }));
  }

  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateViewportState);
  }

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("orientationchange", scheduleUpdate, { passive: true });
  window.visualViewport?.addEventListener("resize", scheduleUpdate, { passive: true });
  window.matchMedia("(pointer: coarse)").addEventListener?.("change", scheduleUpdate);
  updateViewportState();
})();
