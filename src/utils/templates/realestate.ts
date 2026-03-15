
import { Project } from '@/types/project';

function buildTrackingBlocks(project: Project) {
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
      #fullscreen-loader { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0f766e; display: none; flex-direction: column; justify-content: center; align-items: center; z-index: 9999; color: white; }
      .loader-spinner { width: 44px; height: 44px; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
    <div id="fullscreen-loader"><div class="loader-spinner"></div></div>
    <script>
      function showLoader() { document.getElementById('fullscreen-loader').style.display = 'flex'; }
      function trackAndRedirect() {
        showLoader();
        if (typeof gtag !== 'undefined' && '${googleConversionId}' && '${googleConversionLabel}') {
          gtag('event', 'conversion', { 'send_to': '${googleConversionId}/${googleConversionLabel}', 'value': ${conversionValue}, 'currency': '${conversionCurrency}', 'event_callback': function() { setTimeout(function() { window.location.href = '${mainWebsiteUrl}'; }, 2000); } });
        } else { setTimeout(function() { window.location.href = '${mainWebsiteUrl}'; }, 2000); }
      }
      function redirectToMain() { showLoader(); setTimeout(function() { window.location.href = '${mainWebsiteUrl}'; }, 2000); }
    <\/script>
  `;

  const hasConversion = !!(googleConversionId && googleConversionLabel);
  const conversionScriptBlock = hasConversion
    ? `
    <script>
      function gtag_report_conversion(url) {
        var callback = function () { if (typeof url !== 'undefined') { window.location = url; } };
        gtag('event', 'conversion', { 'send_to': '${googleConversionId}/${googleConversionLabel}', 'value': ${conversionValue}, 'currency': '${conversionCurrency}', 'transaction_id': '', 'event_callback': callback });
        return false;
      }
    <\/script>
  `
    : '';

  return { baseGtagBlock, trackingScript, conversionScriptBlock, mainWebsiteUrl, conversionCurrency };
}

export const generateRealestateTemplate = (project: Project): string => {
  const { baseGtagBlock, trackingScript, conversionScriptBlock, mainWebsiteUrl, conversionCurrency } = buildTrackingBlocks(project);

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
    <meta name="theme-color" content="#0f766e">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Product","name":"${project.productTitle}","description":"${project.shortDescription}","brand":{"@type":"Brand","name":"${project.websiteName}"},"url":"${mainWebsiteUrl}",${project.productPhotos.length > 0 ? `"image":"${project.productPhotos[0]}",` : ''}"offers":{"@type":"Offer","priceCurrency":"${conversionCurrency}","price":"${project.price.replace(/[^0-9.]/g, '')}","availability":"https://schema.org/InStock","url":"${mainWebsiteUrl}"}}
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    ${baseGtagBlock}
    ${trackingScript}
    ${conversionScriptBlock}
</head>
<body class="bg-stone-50 text-stone-900 antialiased">
    <header class="bg-white border-b border-stone-200">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" class="h-8 w-auto">` : ''}
            <span class="text-lg font-semibold text-stone-800">${project.websiteName}</span>
            <nav class="flex gap-6 text-sm font-medium text-stone-600">
                <a href="#" onclick="redirectToMain()" class="hover:text-teal-700">Listings</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-teal-700">Contact</a>
            </nav>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
            ${project.productPhotos.length > 0 ? `
            <div class="relative aspect-[21/9] md:aspect-[3/1]">
                <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="w-full h-full object-cover">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h1 class="text-2xl md:text-3xl font-bold text-white">${project.productTitle}</h1>
                    <p class="text-white/90 text-sm md:text-base mt-1">${project.shortDescription}</p>
                </div>
            </div>
            ` : `
            <div class="p-8 border-b border-stone-200">
                <h1 class="text-2xl md:text-3xl font-bold text-stone-900">${project.productTitle}</h1>
                <p class="text-stone-600 mt-2">${project.shortDescription}</p>
            </div>
            `}

            <div class="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-stone-200">
                <div>
                    <p class="text-2xl md:text-3xl font-bold text-teal-700">${project.price}</p>
                    <p class="text-sm text-stone-500 mt-1">${project.websiteName}</p>
                </div>
                <button onclick="trackAndRedirect()" class="w-full md:w-auto px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                    ${project.buyButtonText}
                </button>
            </div>

            <div class="p-6 md:p-8">
                <h2 class="text-lg font-semibold text-stone-900 mb-4">Property details</h2>
                <div class="prose prose-stone max-w-none text-stone-600">
                    ${project.fullDescription}
                </div>
            </div>

            ${project.productPhotos.length > 1 ? `
            <div class="p-6 md:p-8 border-t border-stone-200">
                <h2 class="text-lg font-semibold text-stone-900 mb-4">Gallery</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    ${project.productPhotos.slice(1, 5).map(photo => `
                        <img src="${photo}" alt="${project.productTitle}" class="w-full aspect-[4/3] object-cover rounded-lg">
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    </main>

    <footer class="bg-stone-800 text-stone-300 py-8 mt-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; ${project.websiteName}. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="#" onclick="redirectToMain()" class="hover:text-white">Listings</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-white">Contact</a>
            </div>
        </div>
    </footer>
</body>
</html>`;
};
