
import { Project, Template } from '@/types/project';

const generateModernTemplate = (project: Project): string => {
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
                    <a href="${project.mainWebsiteUrl}" class="text-gray-600 hover:text-blue-600 transition">Home</a>
                    <a href="${project.mainWebsiteUrl}" class="text-gray-600 hover:text-blue-600 transition">About</a>
                    <a href="${project.mainWebsiteUrl}" class="text-gray-600 hover:text-blue-600 transition">Products</a>
                    <a href="${project.mainWebsiteUrl}" class="text-gray-600 hover:text-blue-600 transition">Contact</a>
                </div>
                <a href="${project.mainWebsiteUrl}" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </a>
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
                        <a href="${project.mainWebsiteUrl}" class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
                            ${project.buyButtonText}
                        </a>
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
                <a href="${project.mainWebsiteUrl}" class="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
                    ${project.buyButtonText}
                </a>
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
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">Home</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">About</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">Products</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Support</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">FAQ</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">Shipping</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">Returns</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="hover:text-white transition">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Connect</h4>
                    <div class="flex space-x-4">
                        <a href="${project.mainWebsiteUrl}" class="text-gray-400 hover:text-white transition">Facebook</a>
                        <a href="${project.mainWebsiteUrl}" class="text-gray-400 hover:text-white transition">Twitter</a>
                        <a href="${project.mainWebsiteUrl}" class="text-gray-400 hover:text-white transition">Instagram</a>
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
    </script>
</body>
</html>`;
};

const generateClassicTemplate = (project: Project): string => {
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="${project.mainWebsiteUrl}">
                ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" height="40" class="me-2">` : ''}
                <span class="fw-bold">${project.websiteName}</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="${project.mainWebsiteUrl}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${project.mainWebsiteUrl}">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${project.mainWebsiteUrl}">Products</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${project.mainWebsiteUrl}">Contact</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-light ms-2" href="${project.mainWebsiteUrl}">Get Started</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center py-5">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold mb-4">${project.productTitle}</h1>
                    <p class="lead mb-4">${project.shortDescription}</p>
                    <div class="mb-4">
                        <span class="h2 fw-bold text-warning">$${project.price}</span>
                    </div>
                    <a href="${project.mainWebsiteUrl}" class="btn btn-warning btn-lg px-5 py-3">
                        <i class="fas fa-shopping-cart me-2"></i>${project.buyButtonText}
                    </a>
                </div>
                ${project.productPhotos.length > 0 ? `
                <div class="col-lg-6 text-center">
                    <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="img-fluid rounded shadow-lg" style="max-height: 400px;">
                </div>
                ` : ''}
            </div>
        </div>
    </div>

    <!-- Features Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Why Choose ${project.productTitle}?</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card h-100 text-center border-0 shadow-sm">
                        <div class="card-body">
                            <div class="text-primary mb-3">
                                <i class="fas fa-star fa-3x"></i>
                            </div>
                            <h5 class="card-title">Premium Quality</h5>
                            <p class="card-text">High-quality materials and craftsmanship ensure lasting value and satisfaction.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100 text-center border-0 shadow-sm">
                        <div class="card-body">
                            <div class="text-success mb-3">
                                <i class="fas fa-shipping-fast fa-3x"></i>
                            </div>
                            <h5 class="card-title">Fast Delivery</h5>
                            <p class="card-text">Quick and reliable shipping to get your order to you as fast as possible.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100 text-center border-0 shadow-sm">
                        <div class="card-body">
                            <div class="text-warning mb-3">
                                <i class="fas fa-heart fa-3x"></i>
                            </div>
                            <h5 class="card-title">100% Satisfaction</h5>
                            <p class="card-text">Money-back guarantee if you're not completely satisfied with your purchase.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Product Gallery -->
    ${project.productPhotos.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Product Gallery</h2>
            <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${project.productPhotos.map((photo, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${photo}" class="d-block w-100 rounded" alt="${project.productTitle}" style="height: 500px; object-fit: cover;">
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Product Description -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="card border-0 shadow">
                        <div class="card-body p-5">
                            <h2 class="text-center mb-4">Product Details</h2>
                            <div class="text-muted">
                                ${project.fullDescription}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-5 bg-primary text-white">
        <div class="container text-center">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <h2 class="display-5 mb-4">Ready to Order?</h2>
                    <p class="lead mb-4">Join thousands of satisfied customers who love ${project.productTitle}</p>
                    <div class="mb-4">
                        <span class="h1 fw-bold text-warning">$${project.price}</span>
                    </div>
                    <a href="${project.mainWebsiteUrl}" class="btn btn-warning btn-lg px-5 py-3">
                        <i class="fas fa-shopping-cart me-2"></i>${project.buyButtonText}
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 mb-4">
                    <h5>${project.websiteName}</h5>
                    <p class="text-muted">Your trusted partner for quality products and exceptional service.</p>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">Home</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">About</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">Products</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Support</h5>
                    <ul class="list-unstyled">
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">FAQ</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">Shipping Info</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">Returns</a></li>
                        <li><a href="${project.mainWebsiteUrl}" class="text-muted text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Follow Us</h5>
                    <div class="d-flex">
                        <a href="${project.mainWebsiteUrl}" class="text-muted me-3"><i class="fab fa-facebook fa-2x"></i></a>
                        <a href="${project.mainWebsiteUrl}" class="text-muted me-3"><i class="fab fa-twitter fa-2x"></i></a>
                        <a href="${project.mainWebsiteUrl}" class="text-muted me-3"><i class="fab fa-instagram fa-2x"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <div class="text-center">
                <p class="mb-0">&copy; 2024 ${project.websiteName}. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
};

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern (Tailwind)',
    preview: 'Modern design with gradient hero, navigation, features section, and enhanced layout',
    generate: generateModernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic (Bootstrap)',
    preview: 'Classic design with Bootstrap styling, cards, carousel, and professional layout',
    generate: generateClassicTemplate,
  },
];

export const generateHTML = (project: Project): string => {
  const template = templates.find(t => t.id === project.template);
  if (!template) {
    throw new Error('Template not found');
  }
  return template.generate(project);
};
