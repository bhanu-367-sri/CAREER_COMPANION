CareerAI updated project
========================

FILES
- app.py: Flask server and existing AI API endpoints
- login.html: new demo sign-in page
- dashboard.html: project introduction and 3 navigation cards
- resume.html: resume analyzer page
- career.html: career guidance page
- interview.html: company interview preparation page
- bhanu.css / bhanu.js: shared styles and existing front-end API logic
- requirements.txt: Python dependencies
- .env.example: environment variable template

RUN IN VS CODE (Windows)
1. Extract this ZIP to a folder.
2. Open the folder in VS Code.
3. Open the terminal in that folder.
4. Create a virtual environment (recommended):
   py -m venv .venv
   .venv\Scripts\activate
5. Install dependencies:
   pip install -r requirements.txt
6. Copy .env.example to a file named exactly .env.
7. In .env, set GEMINI_API_KEY to your own Gemini API key.
   Set FLASK_SECRET_KEY to a long random string.
8. Run:
   python app.py
9. Open http://127.0.0.1:5000 in your browser.

The existing API routes for resume analysis, career guidance, and interview preparation
are retained. Use the sidebar to move between pages.

IMPORTANT LOGIN NOTE
The login page is a demo gateway only. It checks that the name, email and password fields
are filled in, and uses a Flask session to keep the demo signed in. It does NOT validate
registered accounts or store passwords. Do not use a real/reused password. Add a proper
user database and password hashing before deploying publicly.
