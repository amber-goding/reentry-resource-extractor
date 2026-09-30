# Project Prompt History

Every project-related prompt must be appended here before carrying out its requested task. Entries must stay in chronological numerical order, preserve full prompt wording, redact secrets as `[REDACTED]`, and exclude casual conversation unrelated to building, testing, reviewing, or documenting the project.

### Prompt 1 — Reestablish Prompt History

**Context:** The project needs a fresh permanent prompt log after the previous one was removed.

**Task:** Create `prompt-history.md` and record this prompt as the first entry.

**Format:** Use numbered entries with short inferred Context, Task, Format, Constraints summaries, and the exact full prompt.

**Constraints:** Log future project-related prompts automatically, do not require structured prompts, preserve prior entries, redact secrets, and modify no other project files for this task.

**Full Prompt:**\
# Context from my IDE setup:

## Open tabs:
- index.html: index.html
- prompt-history.md: prompt-history.md
- style.css: src/style.css
- main.js: src/main.js
- counter.js: src/counter.js

## My request:
Create a `prompt-history.md` file in the root of this project.

From this point forward, automatically record every project-related prompt I send you before completing the requested task. This is a standing instruction for the entire project, and I should not need to remind you in future prompts.

My future prompts may be written naturally in a few sentences and may not explicitly label Context, Task, Format, or Constraints. You must infer those elements from the prompt and summarize them in the log.

Record each prompt in chronological numerical order using this format:

### Prompt [Number] — [Short Title]

**Context:** Briefly infer and summarize the background or purpose of the prompt.

**Task:** Briefly summarize what I asked you to do.

**Format:** Briefly summarize any requested output, file structure, response style, or implementation format. If no specific format is requested, write `Not specifically stated`.

**Constraints:** Briefly summarize any limitations, boundaries, exclusions, or requirements. If none are stated, write `None specifically stated`.

**Full Prompt:**\
Copy my complete original prompt exactly as written.

Keep the Context, Task, Format, and Constraints summaries very short.

Do not require me to structure future prompts in any particular way.

Never delete, overwrite, or renumber previous entries unless I explicitly ask you to do so. Do not log casual conversation unrelated to building, testing, reviewing, or documenting the project. Never store passwords, API keys, tokens, or other secrets; replace them with `[REDACTED]`.

For this task, create `prompt-history.md`, record this prompt as Prompt 1, and do not modify any other project files.

### Prompt 2 — Clean Vite Starter

**Context:** The project needs a minimal blank foundation for the Reentry Resource Extractor.

**Task:** Remove default Vite demo files, assets, markup, styling, and counter functionality while keeping the app runnable.

**Format:** Leave a nearly blank page showing only `Reentry Resource Extractor`.

**Constraints:** Do not install anything, add features, or build the app yet; verify imports/references and `npm run dev`.

**Full Prompt:**\
# Context from my IDE setup:

## Active file: prompt-history.md

## Open tabs:
- prompt-history.md: prompt-history.md
- index.html: index.html
- style.css: src/style.css
- main.js: src/main.js
- counter.js: src/counter.js

## My request:
Clean out the default Vite starter project so I have a minimal, blank foundation for the Reentry Resource Extractor.
Remove all demo files, images, logos, counter functionality, starter markup, and starter styling that are not needed. This includes files such as `counter.js`, default assets, and unused files in `public`.
Keep the files required for the Vite project to run, including `package.json`, `package-lock.json`, `.gitignore`, `index.html`, and the main JavaScript/CSS entry files if they are still needed. If `main.js` or the CSS file contains starter demo code, clear that code instead of deleting the file.
Leave the page nearly blank, with only the text `Reentry Resource Extractor` so we can confirm the app still loads.
Do not install anything, add new features, or begin building the application yet. After cleanup, verify there are no broken imports or references to deleted files and confirm that `npm run dev` still works.

### Prompt 3 — Fix CSS Module Reference

**Context:** The cleaned Vite project is showing a browser console MIME type error.

**Task:** Inspect `index.html`, `src/main.js`, and `src/style.css` and fix the incorrect reference causing CSS to load as a JavaScript module.

**Format:** Keep the project minimal and verify with the dev server and browser console.

**Constraints:** Do not add features or begin building the application yet; confirm no console errors.

**Full Prompt:**\
# Context from my IDE setup:

## Active file: index.html

## Active selection of the file:
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reentry Resource Extractor</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>

## Open tabs:
- index.html: index.html
- prompt-history.md: prompt-history.md
- style.css: src/style.css
- main.js: src/main.js
- counter.js: src/counter.js

## My request:
The cleaned Vite project currently produces this browser console error:
`Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/css".`
Inspect `index.html`, `src/main.js`, and `src/style.css` and fix the incorrect file reference causing CSS to be loaded as a JavaScript module.
Keep the project minimal. Do not add new features or begin building the Reentry Resource Extractor yet.
After fixing it, verify that `npm run dev` works, the page loads successfully, and there are no browser console errors.

### Prompt 4 — Create Project Plan

**Context:** The project needs a concise source-of-truth plan before new application code is written.

**Task:** Create `project-plan.md` defining the Reentry Resource Extractor scope, workflow, AI role, risks, review, and MVP exclusions.

**Format:** A short, practical, beginner-friendly Markdown plan.

**Constraints:** Do not add undescribed features or build the interface, scraper, backend, database, authentication, or AI integration yet.

**Full Prompt:**\
# Context from my IDE setup:

## Active file: prompt-history.md

## Open tabs:
- prompt-history.md: prompt-history.md
- project-plan.md: project-plan.md
- index.html: index.html
- main.js: src/main.js
- style.css: src/style.css

## My request:
Create a concise `project-plan.md` file for the Reentry Resource Extractor before writing any new application code.

The Reentry Resource Extractor is a web application designed to help transitional housing, halfway house, and reentry program managers create structured program listings from information already available on their public websites.

The first version should follow this workflow:

1. A program manager enters the URL of their public website.
2. The application retrieves accessible website content.
3. AI analyzes that content and extracts specific reentry-program information.
4. Any information that cannot be found must be marked as `Not Found` rather than guessed or inferred.
5. The manager reviews and edits the extracted information before it is considered complete.

In `project-plan.md`, define:

- the problem this application solves
- the primary user
- the MVP user flow
- the information the application should eventually extract
- the role of AI in the workflow
- what the AI is not allowed to do
- the primary failure mode
- how human review reduces that risk
- the features that are intentionally out of scope for this first version

Keep the plan short, practical, and beginner-friendly. Do not add features that I have not described.

Treat `project-plan.md` as the source of truth for future implementation decisions unless I explicitly revise the project scope later.

Do not build the interface, scraper, backend, database, authentication, or AI integration yet. This step is only to establish the project scope and development direction.

### Prompt 5 — Define Extraction Fields

**Context:** The project needs a simple field structure for the information the extractor will eventually collect from program websites.

**Task:** Create a beginner-friendly JavaScript module defining extraction fields with value, found status, and source evidence slots.

**Format:** A simple data structure with brief explanatory comments, easy to display later and populate with AI results.

**Constraints:** Do not add scraping, AI, backend functionality, mock results, or interface elements; avoid changing `project-plan.md` unless necessary.

**Full Prompt:**\
# Context from my IDE setup:

## Active file: prompt-history.md

## Open tabs:
- prompt-history.md: prompt-history.md
- project-plan.md: project-plan.md
- index.html: index.html
- main.js: src/main.js
- style.css: src/style.css

## My request:
Define the structured information that the Reentry Resource Extractor will eventually extract from a program website.
Create a beginner-friendly JavaScript module for these fields: program name, website, address, phone, email, population served, gender eligibility, age requirements, housing type, cost, length of stay, employment requirement, substance-use policy, MAT policy, probation/parole eligibility, transportation, employment assistance, counseling, education support, application process, and waitlist or availability.
Each field should be able to eventually store three pieces of information: the extracted value, whether the information was found, and the source evidence from the website that supports the value.
Use a simple structure that will be easy to display in the interface and later populate with AI-generated results. Do not add scraping, AI, backend functionality, mock results, or interface elements yet.
Add brief comments explaining the structure, verify that the existing application still runs, and do not modify `project-plan.md` unless a change is necessary to remain consistent with the established project scope.
