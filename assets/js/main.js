// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Dropdown: close on outside click (desktop)
document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
  dd.addEventListener('mouseleave', function() { dd.classList.remove('open'); });
});
document.addEventListener('click', function(e) {
  document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
    if (!dd.contains(e.target)) dd.classList.remove('open');
  });
});
