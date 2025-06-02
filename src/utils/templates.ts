
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
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" class="h-10">` : `<h1 class="text-xl font-bold">${project.websiteName}</h1>`}
        </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h1 class="text-5xl font-bold mb-6">${project.productTitle}</h1>
            <p class="text-xl mb-8">${project.shortDescription}</p>
            <button onclick="document.querySelector('#purchase').scrollIntoView()" class="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
                ${project.buyButtonText}
            </button>
        </div>
    </section>

    <!-- Product Images -->
    ${project.productPhotos.length > 0 ? `
    <section class="py-16">
        <div class="max-w-4xl mx-auto px-4">
            <div class="swiper productSwiper">
                <div class="swiper-wrapper">
                    ${project.productPhotos.map(photo => `
                        <div class="swiper-slide">
                            <img src="${photo}" alt="${project.productTitle}" class="w-full h-96 object-cover rounded-lg">
                        </div>
                    `).join('')}
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Description -->
    <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4">
            <div class="prose max-w-none">
                ${project.fullDescription}
            </div>
        </div>
    </section>

    <!-- Purchase Section -->
    <section id="purchase" class="py-20 bg-gray-100">
        <div class="max-w-md mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">${project.productTitle}</h2>
            <p class="text-2xl font-bold text-blue-600 mb-8">$${project.price}</p>
            <button class="w-full bg-blue-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                ${project.buyButtonText}
            </button>
        </div>
    </section>

    <script>
        const swiper = new Swiper('.productSwiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 3000,
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
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            ${project.logo ? `<img src="${project.logo}" alt="${project.websiteName}" height="40">` : `<span class="navbar-brand">${project.websiteName}</span>`}
        </div>
    </nav>

    <!-- Hero -->
    <div class="container-fluid bg-primary text-white py-5">
        <div class="container text-center py-5">
            <h1 class="display-4 fw-bold">${project.productTitle}</h1>
            <p class="lead">${project.shortDescription}</p>
            <a href="#purchase" class="btn btn-light btn-lg">${project.buyButtonText}</a>
        </div>
    </div>

    <!-- Images Carousel -->
    ${project.productPhotos.length > 0 ? `
    <div class="container my-5">
        <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${project.productPhotos.map((photo, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${photo}" class="d-block w-100" alt="${project.productTitle}" style="height: 400px; object-fit: cover;">
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
    ` : ''}

    <!-- Description -->
    <div class="container my-5">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                ${project.fullDescription}
            </div>
        </div>
    </div>

    <!-- Purchase -->
    <div id="purchase" class="container-fluid bg-light py-5">
        <div class="container text-center">
            <div class="col-md-6 mx-auto">
                <h2>${project.productTitle}</h2>
                <h3 class="text-primary">$${project.price}</h3>
                <button class="btn btn-primary btn-lg w-100">${project.buyButtonText}</button>
            </div>
        </div>
    </div>
</body>
</html>`;
};

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern (Tailwind)',
    preview: 'Modern design with gradient hero section and Swiper carousel',
    generate: generateModernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic (Bootstrap)',
    preview: 'Classic design with Bootstrap components and carousel',
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
