
import { Project } from '@/types/project';

export const generateClassicTemplate = (project: Project): string => {
  const googleAdsScript = project.googleAdsScript || '';
  const googleTagId = project.googleTagId || '';
  const googleConversionId = project.googleConversionId || '';
  const googleConversionLabel = project.googleConversionLabel || '';
  const mainWebsiteUrl = project.mainWebsiteUrl || '#';

  // Generate enhanced tracking script with console logging and loader
  const trackingScript = `
    <style>
      #fullscreen-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
      }
      
      .loader-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 20px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .loader-text {
        font-size: 18px;
        font-weight: 500;
        text-align: center;
      }
    </style>
    
    <div id="fullscreen-loader">
      <div class="loader-spinner"></div>
      <div class="loader-text">Loading...</div>
    </div>

    <script>
      function showLoader() {
        console.log('🔄 Showing fullscreen loader');
        document.getElementById('fullscreen-loader').style.display = 'flex';
      }
      
      function hideLoader() {
        console.log('✅ Hiding fullscreen loader');
        document.getElementById('fullscreen-loader').style.display = 'none';
      }

      function trackAndRedirect() {
        console.log('🎯 Track and redirect button clicked');
        console.log('📊 Conversion ID:', '${googleConversionId}');
        console.log('🏷️ Conversion Label:', '${googleConversionLabel}');
        console.log('🌐 Redirect URL:', '${mainWebsiteUrl}');
        
        showLoader();
        
        if (typeof gtag !== 'undefined' && '${googleConversionId}' && '${googleConversionLabel}') {
          console.log('📈 Firing Google Ads conversion tracking...');
          gtag('event', 'conversion', {
            'send_to': '${googleConversionId}/${googleConversionLabel}',
            'event_callback': function() {
              console.log('✅ Conversion tracking fired successfully');
              setTimeout(() => {
                console.log('🚀 Redirecting after 3 seconds...');
                window.location.href = '${mainWebsiteUrl}';
              }, 3000);
            }
          });
        } else {
          console.log('⚠️ Google Analytics not loaded or conversion data missing, redirecting without tracking');
          setTimeout(() => {
            console.log('🚀 Redirecting after 3 seconds...');
            window.location.href = '${mainWebsiteUrl}';
          }, 3000);
        }
      }

      function redirectToMain() {
        console.log('🔗 Navigation link clicked');
        console.log('🌐 Redirect URL:', '${mainWebsiteUrl}');
        
        showLoader();
        
        setTimeout(() => {
          console.log('🚀 Redirecting after 3 seconds...');
          window.location.href = '${mainWebsiteUrl}';
        }, 3000);
      }
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.productTitle} - ${project.websiteName}</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="${project.shortDescription}">
    <meta name="keywords" content="${project.productTitle}, ${project.websiteName}">
    <meta name="author" content="${project.websiteName}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${mainWebsiteUrl}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${mainWebsiteUrl}">
    <meta property="og:title" content="${project.productTitle} - ${project.websiteName}">
    <meta property="og:description" content="${project.shortDescription}">
    <meta property="og:site_name" content="${project.websiteName}">
    ${project.productPhotos.length > 0 ? `<meta property="og:image" content="${project.productPhotos[0]}">` : ''}
    ${project.productPhotos.length > 0 ? `<meta property="og:image:alt" content="${project.productTitle}">` : ''}
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${mainWebsiteUrl}">
    <meta property="twitter:title" content="${project.productTitle} - ${project.websiteName}">
    <meta property="twitter:description" content="${project.shortDescription}">
    ${project.productPhotos.length > 0 ? `<meta property="twitter:image" content="${project.productPhotos[0]}">` : ''}
    
    <!-- Additional SEO -->
    <meta name="theme-color" content="#007bff">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="${project.websiteName}">
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${project.productTitle}",
      "description": "${project.shortDescription}",
      "brand": {
        "@type": "Brand",
        "name": "${project.websiteName}"
      },
      "url": "${mainWebsiteUrl}",
      ${project.productPhotos.length > 0 ? `"image": "${project.productPhotos[0]}",` : ''}
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "${project.price.replace(/[^0-9.]/g, '')}",
        "availability": "https://schema.org/InStock",
        "url": "${mainWebsiteUrl}"
      }
    }
    </script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    ${googleTagId ? `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleTagId}');
      console.log('📊 Google Analytics initialized with ID: ${googleTagId}');
    </script>
    ` : ''}
    ${googleAdsScript}
    ${trackingScript}
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#" onclick="redirectToMain()">
                ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" height="40" class="me-2">` : ''}
                ${project.websiteName}
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
                        <a class="nav-link" href="#" onclick="redirectToMain()">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold mb-3">${project.productTitle}</h1>
                    <p class="lead mb-4">${project.shortDescription}</p>
                    <div class="d-flex flex-column flex-sm-row gap-3 align-items-start">
                        <button onclick="trackAndRedirect()" class="btn btn-light btn-lg">
                            ${project.buyButtonText}
                        </button>
                        <span class="h3 mb-0 text-warning">${project.price}</span>
                    </div>
                </div>
                ${project.productPhotos.length > 0 ? `
                <div class="col-lg-6">
                    <img src="${project.productPhotos[0]}" alt="${project.productTitle}" class="img-fluid rounded shadow">
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <!-- Product Gallery -->
    ${project.productPhotos.length > 1 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Gallery</h2>
            <div class="row g-4">
                ${project.productPhotos.slice(1).map(photo => `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${photo}" alt="${project.productTitle}" class="card-img-top" style="height: 250px; object-fit: cover;">
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Description Section -->
    <section class="py-5 bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <h2 class="text-center mb-4">Product Details</h2>
                    <div class="text-center">
                        ${project.fullDescription}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Why Choose Us?</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 text-center">
                        <div class="card-body">
                            <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                                <i class="fas fa-check"></i>
                            </div>
                            <h5 class="card-title">Quality Guaranteed</h5>
                            <p class="card-text">We ensure the highest quality in every product we deliver.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 text-center">
                        <div class="card-body">
                            <div class="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h5 class="card-title">Fast Delivery</h5>
                            <p class="card-text">Quick and reliable delivery to your doorstep.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 text-center">
                        <div class="card-body">
                            <div class="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 60px; height: 60px;">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h5 class="card-title">Customer Support</h5>
                            <p class="card-text">24/7 customer support for all your needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white">
        <div class="container text-center">
            <h2 class="mb-3">Ready to Get Started?</h2>
            <p class="lead mb-4">Don't miss out on this amazing opportunity!</p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                <button onclick="trackAndRedirect()" class="btn btn-light btn-lg">
                    ${project.buyButtonText}
                </button>
                <span class="h3 mb-0 text-warning">${project.price}</span>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <p>&copy; 2024 ${project.websiteName}. All rights reserved.</p>
                    <div class="mt-3">
                        <a href="#" onclick="redirectToMain()" class="text-white-50 text-decoration-none me-3">Privacy Policy</a>
                        <a href="#" onclick="redirectToMain()" class="text-white-50 text-decoration-none me-3">Terms of Service</a>
                        <a href="#" onclick="redirectToMain()" class="text-white-50 text-decoration-none">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Font Awesome for icons -->
    <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>
</body>
</html>`;
};
