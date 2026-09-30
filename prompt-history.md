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
