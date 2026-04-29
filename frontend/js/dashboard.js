// Na razie dane są wpisane na sztywno w HTML
// W Commicie 2 będziemy pobierać je z backendu przez API
window.addEventListener('load', function() {
  const fills = document.querySelectorAll('.progress-fill');
  fills.forEach(function(fill) {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    setTimeout(function() {
      fill.style.width = targetWidth;
    }, 300);
  });
});
