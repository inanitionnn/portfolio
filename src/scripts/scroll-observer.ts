const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.transitionDelay =
          (entry.target as HTMLElement).style.transitionDelay || '0ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll<HTMLElement>('.fade-in').forEach((el) => {
  // Stagger siblings that share the same direct parent
  const siblings = el.parentElement
    ? [...el.parentElement.querySelectorAll<HTMLElement>('.fade-in')]
    : [];
  const idx = siblings.indexOf(el);
  if (idx > 0) {
    el.style.transitionDelay = `${idx * 80}ms`;
  }

  observer.observe(el);
});
