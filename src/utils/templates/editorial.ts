
import { Project } from '@/types/project';

export const generateEditorialTemplate = (project: Project): string => {
  const googleAdsScript = project.googleAdsScript || '';
  const googleTagId = project.googleTagId || '';
  const googleConversionId = project.googleConversionId || '';
  const googleConversionLabel = project.googleConversionLabel || '';
  const conversionValue = project.conversionValue || '1.0';
  const conversionCurrency = project.conversionCurrency || 'AUD';
  const mainWebsiteUrl = project.mainWebsiteUrl || '#';

  const baseGtagBlock = googleTagId
    ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"><\/script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleTagId}');
      ${googleConversionId ? `gtag('config', '${googleConversionId}');` : ''}
    <\/script>`
    : googleAdsScript.trim()
      ? `\n    ${googleAdsScript.trim()}`
      : googleConversionId
        ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleConversionId}"><\/script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleConversionId}');
    <\/script>`
        : '';

  const trackingScript = `
    <style>
      #fullscreen-loader {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: #0c0c0c;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: #fafafa;
      }
      .loader-spinner {
        width: 48px; height: 48px;
        border: 3px solid rgba(255,255,255,0.2);
        border-top-color: #fafafa;
        border-radius: 50%;
        animation: spin 0.9s ease-in-out infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
    <div id="fullscreen-loader"><div class="loader-spinner"></div></div>
    <script>
      function showLoader() { document.getElementById('fullscreen-loader').style.display = 'flex'; }
      function trackAndRedirect() {
        showLoader();
        if (typeof gtag !== 'undefined' && '${googleConversionId}' && '${googleConversionLabel}') {
          gtag('event', 'conversion', {
            'send_to': '${googleConversionId}/${googleConversionLabel}',
            'value': ${conversionValue},
            'currency': '${conversionCurrency}',
            'event_callback': function() { setTimeout(function() { window.location.href = '${mainWebsiteUrl}'; }, 2000); }
          });
        } else {
          setTimeout(function() { window.location.href = '${mainWebsiteUrl}'; }, 2000);
        }
      }
      function redirectToMain() {
        showLoader();
        setTimeout(function() { window.location.href = '${mainWebsiteUrl}'; }, 2000);
      }
    <\/script>
  `;

  const hasConversion = !!(googleConversionId && googleConversionLabel);
  const conversionScriptBlock = hasConversion
    ? `
    <script>
      function gtag_report_conversion(url) {
        var callback = function () {
          if (typeof url !== 'undefined') { window.location = url; }
        };
        gtag('event', 'conversion', {
          'send_to': '${googleConversionId}/${googleConversionLabel}',
          'value': ${conversionValue},
          'currency': '${conversionCurrency}',
          'transaction_id': '',
          'event_callback': callback
        });
        return false;
      }
    <\/script>
  `
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.productTitle} - ${project.websiteName}</title>
    <meta name="description" content="${project.shortDescription}">
    <meta name="keywords" content="${project.productTitle}, ${project.websiteName}">
    <meta name="author" content="${project.websiteName}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${mainWebsiteUrl}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${mainWebsiteUrl}">
    <meta property="og:title" content="${project.productTitle} - ${project.websiteName}">
    <meta property="og:description" content="${project.shortDescription}">
    <meta property="og:site_name" content="${project.websiteName}">
    ${project.productPhotos.length > 0 ? `<meta property="og:image" content="${project.productPhotos[0]}">` : ''}
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${project.productTitle} - ${project.websiteName}">
    <meta property="twitter:description" content="${project.shortDescription}">
    ${project.productPhotos.length > 0 ? `<meta property="twitter:image" content="${project.productPhotos[0]}">` : ''}
    <meta name="theme-color" content="#0c0c0c">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Product","name":"${project.productTitle}","description":"${project.shortDescription}","brand":{"@type":"Brand","name":"${project.websiteName}"},"url":"${mainWebsiteUrl}",${project.productPhotos.length > 0 ? `"image":"${project.productPhotos[0]}",` : ''}"offers":{"@type":"Offer","priceCurrency":"${conversionCurrency}","price":"${project.price.replace(/[^0-9.]/g, '')}","availability":"https://schema.org/InStock","url":"${mainWebsiteUrl}"}}
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              serif: ['Cormorant Garamond', 'Georgia', 'serif'],
              sans: ['Inter', 'system-ui', 'sans-serif'],
            },
          },
        },
      };
    </script>
    ${baseGtagBlock}
    ${trackingScript}
    ${conversionScriptBlock}
</head>
<body class="bg-neutral-50 text-neutral-900 font-sans">
    <header class="bg-neutral-900 text-white">
        <div class="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
            <span class="font-serif text-xl font-semibold">${project.websiteName}</span>
            <nav class="flex gap-8 text-sm font-medium text-neutral-300">
                <a href="#" onclick="redirectToMain()" class="hover:text-white transition-colors">Home</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-white transition-colors">About</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-white transition-colors">Contact</a>
            </nav>
        </div>
    </header>

    <article class="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div class="grid md:grid-cols-12 gap-12 items-start">
            <div class="md:col-span-7">
                <p class="text-sm uppercase tracking-widest text-neutral-500 mb-3">${project.websiteName}</p>
                <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">${project.productTitle}</h1>
                <p class="text-lg text-neutral-600 leading-relaxed mb-8">${project.shortDescription}</p>
                <div class="flex flex-wrap items-center gap-6">
                    <button onclick="return gtag_report_conversion('${mainWebsiteUrl}')" class="bg-neutral-900 text-white px-8 py-3 font-medium hover:bg-neutral-800 transition-colors">
                        ${project.buyButtonText}
                    </button>
                    <span class="font-serif text-2xl font-semibold">${project.price}</span>
                </div>
            </div>
            ${project.productPhotos.length > 0 ? `
            <div class="md:col-span-5">
                <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="w-full aspect-[3/4] object-cover shadow-lg">
            </div>
            ` : ''}
        </div>

        <div class="mt-20 pt-16 border-t border-neutral-200">
            <div class="prose prose-lg max-w-none font-sans text-neutral-600">
                ${project.fullDescription}
            </div>
        </div>

        ${project.productPhotos.length > 1 ? `
        <section class="mt-20">
            <h2 class="font-serif text-2xl font-semibold mb-8">Gallery</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${project.productPhotos.slice(1, 5).map(photo => `
                    <img src="${photo}" alt="${project.productTitle}" class="w-full aspect-[3/4] object-cover">
                `).join('')}
            </div>
        </section>
        ` : ''}
    </article>

    <section class="bg-neutral-900 text-white py-16">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <h2 class="font-serif text-3xl font-semibold mb-4">Ready to get started?</h2>
            <p class="text-neutral-400 mb-8 max-w-xl mx-auto">${project.shortDescription}</p>
            <button onclick="return gtag_report_conversion('${mainWebsiteUrl}')" class="bg-white text-neutral-900 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">
                ${project.buyButtonText}
            <span class="block mt-4 font-serif text-xl">${project.price}</span>
        </div>
    </section>

    <footer class="bg-neutral-900 text-neutral-500 py-8 border-t border-neutral-800">
        <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; ${project.websiteName}. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="#" onclick="redirectToMain()" class="hover:text-white transition-colors">Privacy</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-white transition-colors">Terms</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-white transition-colors">Contact</a>
            </div>
        </div>
    </footer>
</body>
</html>`;
};
