// Filter past releases from the upcoming widget, show next 8 from today onward
(function () {
  const container = document.getElementById('upcoming-releases');
  if (!container) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  let shown = 0;
  container.querySelectorAll('.upcoming-item').forEach(function (item) {
    const dateEl = item.querySelector('.upcoming-date');
    const raw = dateEl ? dateEl.textContent.trim() : '';
    let d = new Date(raw + ' ' + year);
    // Handle year rollover: "1 Jan" in December belongs to next year
    if (!isNaN(d) && d.getMonth() < 3 && today.getMonth() > 8) d.setFullYear(year + 1);
    const future = !isNaN(d) && d >= today;
    item.style.display = (future && shown < 8) ? '' : 'none';
    if (future && shown < 8) shown++;
  });
  if (shown === 0) container.innerHTML = '<p>Check back soon.</p>';
})();

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
