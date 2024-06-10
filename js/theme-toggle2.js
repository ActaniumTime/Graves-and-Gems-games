// theme-toggle.js

document.getElementById('theme-toggle').addEventListener('change', function() {
    const currentTheme = document.getElementById('themeStylesheet').getAttribute('href');
    const newTheme = currentTheme === 'MainPage.css' ? 'MainPageDark.css' : 'MainPage.css';
    document.getElementById('themeStylesheet').setAttribute('href', newTheme);
  });
  