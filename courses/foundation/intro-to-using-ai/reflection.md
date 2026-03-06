<!-- 1. Identify and share 3 new things you learned from AI in the above task.

-I learned about use cases of some syntaxes in HTML and CSS.
-I got a good knowledge of size units, e.g. px, rem, vh, etc.
-I got a good overview of styling in JS, rather than CSS.

2. Where did you have to tweak or correct Copilot’s suggestions to suit your needs?

-I had to be very precise with CSS classes and colors, as AI sometimes missed those instructions. The main fix was guiding it to use the correct Flexbox properties for the precise vertical centering I wanted in the right column. I had to tweak the whole JavaScript, as AI was giving me too much unnecessary code.

3. How would you explain the difference between using Copilot to generate code for you vs. using it as an effective learning partner?

-Generating code is like asking for answer to homework, which skips the learning part, when the code breaks you're stuck. 

Using it as a learning partner means asking for small hints to understand a specific syntax or property, then applying and learning it yourself.

4. Identify 3 risks of relying too much on AI tools when learning at HackYourFuture.

-Three risks are: failing to build muscle memory with basic syntax, developing a false sense of knowledge by not understanding the full context of the code, and losing crucial debugging skills when the generated code has an error. -->

# PART A

# List of Improvements

1. Added a <meta name="description"> tag for better SEO.

2. Wrapped the content inside .content-wrapper with a <main> element to improve semantic structure.

3. Entire script is now executed inside a DOMContentLoaded listener.

4. Added null checks before accessing elements to avoid runtime errors if the DOM structure changes.


# Project Structure:

intro-to-using-ai/
│
├── 📄 index.html          (HTML structure & semantic markup)
│   ├── Portfolio container
│   ├── Left column (sidebar with profile & nav)
│   └── Right column (main content with about section)
│
├── 🎨 styles.css          (Flexbox layout, responsive design)
│   ├── Dark theme styling (#050525, #13133d)
│   ├── Two-column layout (mobile responsive)
│   └── Component styles (buttons, nav, profile picture)
│
├── ⚙️ script.js           (Interactivity & behavior)
│   ├── DOM ready wrapper
│   ├── Fun button click handler
│   ├── Random color generator
│   └── Null safety checks
│
├── 📝 README.md           (Project documentation)
├── 🤔 reflection.md       (Learning reflection)
│
└── 📁 assets/
    └── 🖼️ ARMAN_DP.JPG    (Profile image)


# Reflect on learning

1. Technical Part: I have learned why we use null checks (check if an element exists before using it), how DOMContentLoaded matters, and that using <main> instead of <div> makes the code clearer and better for search engines and screen readers.

2. Working with AI as a Partner: I learned that AI works best when I ask questions and understand the answers. When I say "why does this work?" instead of "write this for me", I understand better. I would anyday prefer the ask model before the agent model.

3. AI Helps With Non-Code Things Too: I learned that AI can help us coders with other things like SEO, design ideas, and writing better text. As a developer, I thought these were not my job. But now I see that AI can help me think about the whole project, not just the technical parts.


# Part B: Ethics and Risks

1. Losing My Coding Skills: If I let AI do all the work, I won't learn the basics. If the AI is down or the code breaks, I won’t know how to fix it.

The Fix:
- Ask "Why?": Use AI to explain how code works, not just to write it.
- Try first: I would try to solve the problem myself before asking the AI for help.

2. Copying Someone Else's Work: AI is trained on other people’s code. I might accidentally use code that belongs to someone else or violates a license.

The Fix:
- Don't just copy: Change and adapt the AI's suggestions to fit my own project.
- Double-check: If the code looks very specific, check if it needs a special credit or license.

3. Safety and Security Bugs: AI code might look perfect but have hidden "backdoors" or bugs that hackers can use to steal data.

The Fix:
- Trust but verify: Never assume AI code is safe. Always test it.
- Check the locks: Specifically look for common security mistakes like "SQL injection" or "XSS" before finishing.