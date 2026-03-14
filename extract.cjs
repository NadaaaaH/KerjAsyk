const fs = require('fs');
const html = fs.readFileSync('iniya.html', 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const style = styleMatch ? styleMatch[1].trim() : '';
const finalCss = `@import "tailwindcss";\n@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&display=swap");\n\n${style}`;
fs.writeFileSync('resources/css/app.css', finalCss);
