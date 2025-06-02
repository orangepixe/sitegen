
import { Project } from '@/types/project';

export const generateModernTemplate = (project: Project): string => {
  const trackingScript = project.googleAdsScript ? project.googleAdsScript : '';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.productTitle} - ${project.websiteName}</title>
    <meta name="description" content="${project.shortDescription}">
    <meta property="og:title" content="${project.productTitle}">
    <meta property="og:description" content="${project.shortDescription}">
    <meta property="og:image" content="${project.productPhotos[0] || ''}">
    <meta property="og:type" content="product">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css">
    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
    ${trackingScript}
</head>
<body class="bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" class="h-10 mr-3">` : ''}
                    <span class="text-xl font-bold text-gray-800">${project.websiteName}</span>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#" onclick="redirectToMain()" class="text-gray-600 hover:text-blue-600 transition cursor-pointer">Home</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-600 hover:text-blue-600 transition cursor-pointer">About</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-600 hover:text-blue-600 transition cursor-pointer">Products</a>
                    <a href="#" onclick="redirectToMain()" class="text-gray-600 hover:text-blue-600 transition cursor-pointer">Contact</a>
                </div>
                <button onclick="trackAndRedirect()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="max-w-6xl mx-auto px-4">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 class="text-5xl font-bold mb-6 leading-tight">${project.productTitle}</h1>
                    <p class="text-xl mb-8 text-blue-100">${project.shortDescription}</p>
                    <div class="space-y-4">
                        <div class="text-3xl font-bold">$${project.price}</div>
                        <button onclick="trackAndRedirect()" class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 cursor-pointer">
                            ${project.buyButtonText}
                        </button>
                    </div>
                </div>
                ${project.productPhotos.length > 0 ? `
                <div class="hidden md:block">
                    <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="w-full h-96 object-cover rounded-lg shadow-2xl">
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <!-- Product Gallery -->
    ${project.productPhotos.length > 0 ? `
    <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Product Gallery</h2>
            <div class="swiper productSwiper">
                <div class="swiper-wrapper">
                    ${project.productPhotos.map(photo => `
                        <div class="swiper-slide">
                            <img src="${photo}" alt="${project.productTitle}" class="w-full h-96 object-cover rounded-lg shadow-lg">
                        </div>
                    `).join('')}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Description Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-3xl font-bold mb-8 text-gray-800 text-center">Product Details</h2>
                <div class="prose max-w-none text-gray-600">
                    ${project.fullDescription}
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose ${project.productTitle}?</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-6 border rounded-lg shadow-sm">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Premium Quality</h3>
                    <p class="text-gray-600">High-quality materials and craftsmanship ensure lasting value.</p>
                </div>
                <div class="text-center p-6 border rounded-lg shadow-sm">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Fast Delivery</h3>
                    <p class="text-gray-600">Quick and reliable shipping to get your order to you fast.</p>
                </div>
                <div class="text-center p-6 border rounded-lg shadow-sm">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">100% Satisfaction</h3>
                    <p class="text-gray-600">Money-back guarantee if you're not completely satisfied.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p class="text-xl mb-8 text-blue-100">Join thousands of satisfied customers who love ${project.productTitle}</p>
            <div class="space-y-4">
                <div class="text-4xl font-bold">$${project.price}</div>
                <button onclick="trackAndRedirect()" class="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg cursor-pointer">
                    ${project.buyButtonText}
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-6xl mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">${project.websiteName}</h3>
                    <p class="text-gray-400">Your trusted partner for quality products.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">Home</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">About</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">Products</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">FAQ</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">Shipping</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">Returns</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="hover:text-white transition cursor-pointer">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Connect</h4>
                    <div class="flex space-x-4">
                        <a href="#" onclick="redirectToMain()" class="text-gray-400 hover:text-white transition cursor-pointer">Facebook</a>
                        <a href="#" onclick="redirectToMain()" class="text-gray-400 hover:text-white transition cursor-pointer">Twitter</a>
                        <a href="#" onclick="redirectToMain()" class="text-gray-400 hover:text-white transition cursor-pointer">Instagram</a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 ${project.websiteName}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        const swiper = new Swiper('.productSwiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });

        function trackAndRedirect() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/label',
                    'event_callback': function() {
                        window.location.href = '${project.mainWebsiteUrl}';
                    }
                });
            } else {
                window.location.href = '${project.mainWebsiteUrl}';
            }
        }

        function redirectToMain() {
            window.location.href = '${project.mainWebsiteUrl}';
        }
    </script>
</body>
</html>`;
};
