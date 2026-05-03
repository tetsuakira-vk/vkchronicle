// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Dropdown — open on button click, close on outside click (no stopPropagation needed)
document.addEventListener('click', function(e) {
  document.querySelectorAll('.nav-dropdown.open').forEach(function(dd) {
    if (!dd.contains(e.target)) dd.classList.remove('open');
  });
});
document.querySelectorAll('.nav-dropdown-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const dd = btn.closest('.nav-dropdown');
    const wasOpen = dd.classList.contains('open');
    document.querySelectorAll('.nav-dropdown.open').forEach(function(d) { d.classList.remove('open'); });
    if (!wasOpen) dd.classList.add('open');
  });
});
