# Updating the portfolio

The portfolio is JSON-driven. For normal content changes, edit only:

`src/data/portfolio.json`

### Add a profile image

Set:

```json
"personal": {
  "image": "/images/profile.jpg"
}
```

Put the file at `public/images/profile.jpg`.

### Add a project image

```json
"image": "/projects/my-project.webp"
```

Put the file at `public/projects/my-project.webp`.

### Add links

Replace an empty string:

```json
"githubUrl": ""
```

with the real URL:

```json
"githubUrl": "https://github.com/your-name/project"
```

The UI automatically shows the button when the value is non-empty.

### Important

Do not add placeholder/fake URLs. Empty strings are supported intentionally.
