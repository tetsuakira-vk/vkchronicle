// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Dropdown: click to open/close, click outside to close
document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
  const btn = dd.querySelector('.nav-dropdown-btn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      dd.classList.toggle('open');
    });
  }
});
document.addEventListener('click', function() {
  document.querySelectorAll('.nav-dropdown.open').forEach(function(dd) {
    dd.classList.remove('open');
  });
});
