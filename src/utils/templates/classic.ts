
import { Project } from '@/types/project';

export const generateClassicTemplate = (project: Project): string => {
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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    ${trackingScript}
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#" onclick="redirectToMain()">
                ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" height="40" class="me-2">` : ''}
                <span class="fw-bold">${project.websiteName}</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="redirectToMain()">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="redirectToMain()">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="redirectToMain()">Products</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="redirectToMain()">Contact</a>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-light ms-2" onclick="trackAndRedirect()">Get Started</button>
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
                        <span class="h2 fw-bold text-warning">${project.price}</span>
                    </div>
                    <button onclick="trackAndRedirect()" class="btn btn-warning btn-lg px-5 py-3">
                        <i class="fas fa-shopping-cart me-2"></i>${project.buyButtonText}
                    </button>
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
            <h2 class="text-center mb-5">Gallery</h2>
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
                <div class="col-12">
                    <h2 class="text-center mb-4">Detailed Description</h2>
                    <div class="card border-0 shadow">
                        <div class="card-body p-4">
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
                        <span class="h1 fw-bold text-warning">${project.price}</span>
                    </div>
                    <button onclick="trackAndRedirect()" class="btn btn-warning btn-lg px-5 py-3">
                        <i class="fas fa-shopping-cart me-2"></i>${project.buyButtonText}
                    </button>
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
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">Home</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">About</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">Products</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">Contact</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Support</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">FAQ</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">Shipping Info</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">Returns</a></li>
                        <li><a href="#" onclick="redirectToMain()" class="text-muted text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 mb-4">
                    <h5>Follow Us</h5>
                    <div class="d-flex">
                        <a href="#" onclick="redirectToMain()" class="text-muted me-3"><i class="fab fa-facebook fa-2x"></i></a>
                        <a href="#" onclick="redirectToMain()" class="text-muted me-3"><i class="fab fa-twitter fa-2x"></i></a>
                        <a href="#" onclick="redirectToMain()" class="text-muted me-3"><i class="fab fa-instagram fa-2x"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-4">
            <div class="text-center">
                <p class="mb-0">&copy; 2024 ${project.websiteName}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
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
