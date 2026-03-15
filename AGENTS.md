# Agent memory

## Learned User Preferences

- For Google tracking in the generator: let the user choose either GA4/conversion inputs or a pasted script (show/hide); inputs are the default.
- Provide both preview and download for generated templates; preview opens the generated HTML in a new tab.

## Learned Workspace Facts

- This app is a product/landing page generator: each project is one website or product; the output is the generated HTML file (landing page) for that product/site.
- Google tracking (gtag, GA4, Ads conversion, pasted script) is only injected into the generated HTML output; never add Google scripts or tags to the admin dashboard or generator UI.
- Admin authentication uses Supabase Auth (email/password); the same session is used for the dashboard and for saving projects.
