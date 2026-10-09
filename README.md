# Athithya T — Personal Developer Portfolio

A modern, high-performance, responsive portfolio website built with clean vanilla HTML5, CSS3, and JavaScript featuring glassmorphism aesthetics, dynamic canvas particle animations, and rich interactive components.

---

## 🌟 Key Highlights & Features

- **Cyber-Slate Glassmorphic Theme**: Deep obsidian background with electric cyan, violet, and emerald accent gradients.
- **Dark & Light Mode Switcher**: Seamless toggle with local storage persistence.
- **Dynamic Particle Canvas**: Real-time connected constellation background reacting smoothly to cursor movement.
- **Multi-Line Typewriter Effect**: Dynamic cycling through core competencies and engineering specializations.
- **Scroll-Triggered Animated Counters**: Key metrics highlighting 100+ HackerRank problems solved, 7000 score, 7.5 CGPA, and hackathon milestones.
- **Skill Filtering Engine**: Filter competencies across Languages, AI & Libraries, Web & Cloud, and Professional Soft Skills.
- **Interactive Project Architecture Modals**: Technical breakdowns for both featured projects:
  - *Student Understanding Verification System* (Multimodal AI, Whisper, MediaPipe, OpenCV, Flask, LLM)
  - *AI Meme-Based Concept Explainer* (Java Application, AI Generation, Visual Storytelling)
- **Interactive Formatted Resume Modal**: In-browser preview of Athithya's resume with direct 1-click **Print / Save as PDF** support.
- **One-Click Clipboard Actions & Contact Form**: Quick-copy buttons for email and phone with instant toast feedback.
- **100% Mobile Responsive**: Fluid layouts from mobile phones to 4K displays.

---

## 📁 Project Structure

```text
portfolio fin/
├── index.html       # Semantic HTML5 structure & content from resume
├── style.css        # Modern CSS variables, glassmorphism, animations & print styles
├── script.js        # Canvas particles, typewriter, observers, modals & filters
└── README.md        # Documentation & usage instructions
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern web browser or serve it using Python:

```bash
# In the project directory:
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🖼️ Adding Your Profile Photo (Optional)

In `index.html`, inside `.avatar-photo-box`, you can replace the default initials badge with your photo:
```html
<img src="your-photo.jpg" alt="Athithya T" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-indigo);">
```
