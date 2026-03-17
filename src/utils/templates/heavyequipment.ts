
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
      #fullscreen-loader { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #1e293b; display: none; flex-direction: column; justify-content: center; align-items: center; z-index: 9999; color: white; }
      .loader-spinner { width: 48px; height: 48px; border: 3px solid rgba(251,146,60,0.3); border-top-color: #fb923c; border-radius: 50%; animation: spin 0.8s linear infinite; }
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

export const generateHeavyequipmentTemplate = (project: Project): string => {
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
    <meta name="theme-color" content="#1e293b">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Product","name":"${project.productTitle}","description":"${project.shortDescription}","brand":{"@type":"Brand","name":"${project.websiteName}"},"url":"${mainWebsiteUrl}",${project.productPhotos.length > 0 ? `"image":"${project.productPhotos[0]}",` : ''}"offers":{"@type":"Offer","priceCurrency":"${conversionCurrency}","price":"${project.price.replace(/[^0-9.]/g, '')}","availability":"https://schema.org/InStock","url":"${mainWebsiteUrl}"}}
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    ${baseGtagBlock}
    ${trackingScript}
    ${conversionScriptBlock}
</head>
<body class="bg-slate-100 text-slate-900 antialiased">
    <header class="bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" class="h-9 w-auto">` : ''}
            <span class="text-lg font-bold tracking-tight">${project.websiteName}</span>
            <nav class="flex gap-6 text-sm font-medium text-slate-300">
                <a href="#" onclick="redirectToMain()" class="hover:text-orange-400 transition-colors">Equipment</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-orange-400 transition-colors">Contact</a>
            </nav>
        </div>
    </header>

    <section class="bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div class="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <p class="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-2">${project.websiteName}</p>
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">${project.productTitle}</h1>
                    <p class="text-slate-400 mt-4 text-lg">${project.shortDescription}</p>
                    <div class="mt-8 flex flex-wrap items-center gap-4">
                        <button onclick="return gtag_report_conversion('${mainWebsiteUrl}')" class="px-8 py-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors">
                            ${project.buyButtonText}
                        </button>
                        <span class="text-2xl font-bold text-orange-400">${project.price}</span>
                    </div>
                </div>
                ${project.productPhotos.length > 0 ? `
                <div class="relative">
                    <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="w-full rounded-lg shadow-2xl border-2 border-slate-700">
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white rounded-lg shadow-md border border-slate-200 p-8">
            <h2 class="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">Specifications & details</h2>
            <div class="prose prose-slate max-w-none text-slate-600">
                ${project.fullDescription}
            </div>
        </div>
    </section>

    ${project.productPhotos.length > 1 ? `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-xl font-bold text-slate-900 mb-6">More views</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${project.productPhotos.slice(1, 5).map(photo => `
                <img src="${photo}" alt="${project.productTitle}" class="w-full aspect-[4/3] object-cover rounded-lg border-2 border-slate-200">
            `).join('')}
        </div>
    </section>
    ` : ''}

    <section class="bg-slate-800 text-white py-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-2xl font-bold mb-2">Ready to get a quote?</h2>
            <p class="text-slate-400 mb-6">${project.shortDescription}</p>
            <button onclick="return gtag_report_conversion('${mainWebsiteUrl}')" class="px-10 py-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors">
                ${project.buyButtonText}
            <span class="block mt-3 text-orange-400 font-semibold">${project.price}</span>
        </div>
    </section>

    <footer class="bg-slate-900 text-slate-400 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; ${project.websiteName}. All rights reserved.</p>
            <div class="flex gap-6">
                <a href="#" onclick="redirectToMain()" class="hover:text-orange-400 transition-colors">Equipment</a>
                <a href="#" onclick="redirectToMain()" class="hover:text-orange-400 transition-colors">Contact</a>
            </div>
        </div>
    </footer>
</body>
</html>`;
};
