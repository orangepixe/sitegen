
import { Project } from '@/types/project';

export const generateMinimalTemplate = (project: Project): string => {
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
        background: #fafafa;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: #171717;
      }
      .loader-spinner {
        width: 40px; height: 40px;
        border: 2px solid #e5e5e5;
        border-top-color: #171717;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
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
    <meta name="theme-color" content="#fafafa">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Product","name":"${project.productTitle}","description":"${project.shortDescription}","brand":{"@type":"Brand","name":"${project.websiteName}"},"url":"${mainWebsiteUrl}",${project.productPhotos.length > 0 ? `"image":"${project.productPhotos[0]}",` : ''}"offers":{"@type":"Offer","priceCurrency":"${conversionCurrency}","price":"${project.price.replace(/[^0-9.]/g, '')}","availability":"https://schema.org/InStock","url":"${mainWebsiteUrl}"}}
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    ${baseGtagBlock}
    ${trackingScript}
    ${conversionScriptBlock}
</head>
<body class="bg-white text-neutral-900 antialiased">
    <header class="border-b border-neutral-200">
        <div class="max-w-2xl mx-auto px-6 py-5 flex justify-between items-center">
            ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" class="h-7 w-auto">` : ''}
            <span class="text-sm font-medium text-neutral-600">${project.websiteName}</span>
            <nav class="flex gap-6 text-sm">
                <a href="#" onclick="redirectToMain()" class="text-neutral-500 hover:text-neutral-900">Home</a>
                <a href="#" onclick="redirectToMain()" class="text-neutral-500 hover:text-neutral-900">Contact</a>
            </nav>
        </div>
    </header>

    <main class="max-w-2xl mx-auto px-6 py-20 md:py-28">
        <h1 class="text-3xl md:text-4xl font-semibold tracking-tight mb-4">${project.productTitle}</h1>
        <p class="text-lg text-neutral-600 mb-10 leading-relaxed">${project.shortDescription}</p>

        ${project.productPhotos.length > 0 ? `
        <div class="mb-14">
            <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="w-full aspect-[4/3] object-cover">
        </div>
        ` : ''}

        <div class="prose prose-neutral max-w-none mb-14 text-neutral-600">
            ${project.fullDescription}
        </div>

        <div class="flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-200">
            <button onclick="return gtag_report_conversion('${mainWebsiteUrl}')" class="px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
                ${project.buyButtonText}
            </button>
            <span class="text-xl font-semibold">${project.price}</span>
        </div>
    </main>

    ${project.productPhotos.length > 1 ? `
    <section class="border-t border-neutral-200 py-14">
        <div class="max-w-2xl mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                ${project.productPhotos.slice(1, 4).map(photo => `
                    <img src="${photo}" alt="${project.productTitle}" class="w-full aspect-square object-cover">
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <footer class="border-t border-neutral-200 py-8">
        <div class="max-w-2xl mx-auto px-6 text-center text-sm text-neutral-400">
            <p>&copy; ${project.websiteName}</p>
            <a href="#" onclick="redirectToMain()" class="underline hover:text-neutral-600 mt-2 inline-block">Back to site</a>
        </div>
    </footer>
</body>
</html>`;
};
