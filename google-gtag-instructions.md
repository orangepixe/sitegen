# How to use the tag

For conversion tracking to work, you'll need to install the conversion tracking tag, which consists of a Google tag and an event snippet.

You'll also need to add code so Google Ads records a conversion only when a customer clicks on a chosen link, button, or image.

If installing the tag with Google Tag Manager, follow the official instructions.

If any of your web pages are built using AMP, you'll need to add tags to both the AMP and HTML versions.

---

## HTML Pages

### 1. Install the Google tag on every page

- Open the HTML for each page.
- Choose one of the following:

#### If you haven't installed the Google tag:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17957937645"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17957937645');
</script>
```

#### If already installed via another product:

```html
gtag('config', 'AW-17957937645');
```

- Save changes.

---

### 2. Install the event snippet

```html
<script>
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-17957937645/Uw8ICOjHyYkcEO3DgfNC',
    'value': 1.0,
    'currency': 'AUD',
    'event_callback': callback
  });
  return false;
}
</script>
```

---

### 3. Add onclick tracking

#### Text link

```html
<a onclick="return gtag_report_conversion('http://example.com/your-link');"
   href="http://example.com/your-link">
   Download now!
</a>
```

#### Button

```html
<button onclick="return gtag_report_conversion('http://example.com/your-link')">
  Submit
</button>
```

#### Button image

```html
<img src="download_button.gif"
     alt="Download Whitepaper"
     width="32"
     height="32"
     onclick="return gtag_report_conversion('http://example.com/your-link')" />
```

---

### 4. Save your webpage

Ensure all changes are saved and deployed.
