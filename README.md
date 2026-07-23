# Alangir Sk — Developer Portfolio

A clean, professional portfolio website built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools, just fast and elegant code.

## ✨ Features

- **Sticky glass navbar** with active-section highlighting and smooth scroll
- **Animated hero** with a typewriter role-cycling effect
- **About section** with profile photo and GitHub stats
- **Skills grid** covering Languages, Backend, Frontend, AI/ML, Databases, and CS Fundamentals
- **Projects showcase** with hover animations, tech tags, GitHub and live-demo links
- **Working contact form** powered by [EmailJS](https://www.emailjs.com/) (no backend required)
- **Scroll-reveal animations** via `IntersectionObserver`
- Fully **responsive** — mobile, tablet, and desktop
- **SEO-ready** — meta tags, Open Graph, semantic HTML5

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5 (semantic elements)           |
| Styles     | Vanilla CSS (custom properties, glassmorphism, keyframe animations) |
| Scripts    | Vanilla JavaScript (ES2020+)        |
| Icons      | Font Awesome 6                      |
| Fonts      | Google Fonts — Inter                |
| Email      | EmailJS (client-side SMTP)          |
| Hosting    | GitHub Pages / Netlify              |

## 🚀 Getting Started

No build step required — just open `index.html` in your browser.

```bash
git clone https://github.com/ALANSK123/Simple-web-portfolio.git
cd Simple-web-portfolio
# open index.html in your browser (or use a local server)
npx serve .
```

## 📧 Setting Up the Contact Form

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** using these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{subject}}` — message subject
   - `{{message}}` — message body
4. Copy your **Service ID**, **Template ID**, and **Public Key**
5. Open `script.js` and replace the three constants at the top:

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

Until these are configured the form runs in **demo mode** and no emails are sent.

## 📁 Project Structure

```
Simple-web-portfolio/
├── index.html      # Full portfolio markup
├── style.css       # Design system & all styles
├── script.js       # Animations, typewriter, contact form
├── public/
│   ├── profile-pic-crop.JPG
│   └── goole-front-page.png
└── README.md
```

## 🤝 Connect

- **GitHub** — [github.com/ALANSK123](https://github.com/ALANSK123)
- **LinkedIn** — [linkedin.com/in/alangir-sk](https://www.linkedin.com/in/alangir-sk/)
- **Email** — alangirskgo@gmail.com

---

© 2025 Alangir Sk — Built with ♥ and vanilla code.
