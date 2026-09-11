# Portfolio content — single source of truth

Edit **`src/data/portfolio.json`** to update the website content. The page reads its displayed personal/professional content from this JSON.

## Links

Use an empty string (`""`) when a link is not available. Do not put fake URLs.

- `personal.linkedin`, `personal.github`, `personal.upwork`, etc.
- `social.*`
- `experience[].url`
- `education[].url`
- `certifications[].url`
- `projects[].demoUrl`
- `projects[].githubUrl`
- `personal.resumeUrl` / `resume.url`
- `site.url`

If a URL is blank, the UI hides that link/button.

## Images

Image fields are intentionally editable in JSON:

- `personal.image`
- `hero.image`
- `about.image`
- `experience[].image`
- `education[].image`
- `certifications[].image`
- `projects[].image`
- `site.ogImage`

You can use either a local path such as `/images/profile.jpg` or a full HTTPS image URL. Blank means no image is rendered and the existing visual fallback is used.

## Content

Update these directly in JSON:

- name, title, location, email, phone, summary
- hero headline/chips/quick skills/pipeline
- about summary/focus/signal
- skills and their official links/icons
- experience, company links and images
- projects, descriptions, metrics, dates, links and images
- architecture nodes
- education
- certifications
- contact copy
- navigation
- SEO/site metadata

After editing, restart/reload the dev server if Next.js does not hot-reload the JSON change.
