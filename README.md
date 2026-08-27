# RunWield.dev

Static Astro site for [runwield.dev](https://runwield.dev), driven by Deno and ready for GitHub Pages.

## Local development

```sh
deno task dev
```

Build and preview the static output:

```sh
deno task build
deno task preview
```

## Beta form

The default static-site fallback opens a prefilled email to `beta@runwield.dev`. To post submissions to a form service
or API instead, set `PUBLIC_BETA_FORM_ACTION` to the form endpoint during the build.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds with Deno and publishes `dist/`. In the repository settings, set
Pages → Source to **GitHub Actions**. The `public/CNAME` file configures the custom domain.
