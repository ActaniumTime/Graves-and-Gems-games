// theme-toggle.js

document.getElementById('theme-toggle').addEventListener('change', function() {
    const currentTheme = document.getElementById('themeStylesheet').getAttribute('href');
    const newTheme = currentTheme === 'DescriptionPage.css' ? 'DescriptionPageDark.css' : 'DescriptionPage.css';
    document.getElementById('themeStylesheet').setAttribute('href', newTheme);
  });
  