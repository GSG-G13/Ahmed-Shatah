// @DESC - This is CSS-Create-Dark-Light-Mode  issue code
const toggleButton = document.querySelector('#dark-mode-toggle');
const body = document.querySelector('body');

toggleButton.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
});
