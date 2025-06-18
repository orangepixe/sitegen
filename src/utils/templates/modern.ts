
import { Project } from '@/types/project';

export const generateModernTemplate = (project: Project): string => {
  const googleAdsScript = project.googleAdsScript || '';
  const googleTagId = project.googleTagId || '';
  const googleConversionId = project.googleConversionId || '';
  const googleConversionLabel = project.googleConversionLabel || '';
  const mainWebsiteUrl = project.mainWebsiteUrl || '#';

  // Generate tracking script
  const trackingScript = `
    <script>
      function trackAndRedirect() {
        if (typeof gtag !== 'undefined' && '${googleConversionId}' && '${googleConversionLabel}') {
          gtag('event', 'conversion', {
            'send_to': '${googleConversionId}/${googleConversionLabel}',
            'event_callback': function() {
              window.location.href = '${mainWebsiteUrl}';
            }
          });
        } else {
          window.location.href = '${mainWebsiteUrl}';
        }
      }

      function redirectToMain() {
        window.location.href = '${mainWebsiteUrl}';
      }
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.websiteName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    ${googleTagId ? `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleTagId}');
    </script>
    ` : ''}
    ${googleAdsScript}
    ${trackingScript}
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" class="h-8 w-auto mr-3">` : ''}
                    <span class="text-xl font-bold text-gray-900">${project.websiteName}</span>
                </div>
                <div class="flex space-x-4">
                    <a href="#" onclick="redirectToMain()" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">${project.productTitle}</h1>
                <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">${project.shortDescription}</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button onclick="trackAndRedirect()" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
                        ${project.buyButtonText}
                    </button>
                    <span class="text-2xl font-bold">${project.price}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Product Gallery -->
    ${project.productPhotos.length > 0 ? `
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${project.productPhotos.map(photo => `
                    <div class="rounded-lg overflow-hidden shadow-lg">
                        <img src="${photo}" alt="${project.productTitle}" class="w-full h-64 object-cover">
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Description Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Product Details</h2>
                <div class="prose prose-lg mx-auto text-gray-700">
                    ${project.fullDescription}
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                    <p class="text-gray-600">We ensure the highest quality in every product we deliver.</p>
                </div>
                <div class="text-center">
                    <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Fast Delivery</h3>
                    <p class="text-gray-600">Quick and reliable delivery to your doorstep.</p>
                </div>
                <div class="text-center">
                    <div class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Customer Support</h3>
                    <p class="text-gray-600">24/7 customer support for all your needs.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-xl mb-8">Don't miss out on this amazing opportunity!</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onclick="trackAndRedirect()" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
                    ${project.buyButtonText}
                </button>
                <span class="text-2xl font-bold">${project.price}</span>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p>&copy; 2024 ${project.websiteName}. All rights reserved.</p>
                <div class="mt-4 space-x-4">
                    <a href="#" onclick="redirectToMain()" class="text-gray-400 hover:text-white">Privacy Policy</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-400 hover:text-white">Terms of Service</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-400 hover:text-white">Contact</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;
};
