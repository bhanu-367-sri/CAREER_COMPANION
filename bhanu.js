function showResult(element, message, type = "normal") {
  element.className = "result visible" + (type === "loading" ? " loading" : type === "error" ? " error" : "");
  element.textContent = message;
}
function setBusy(button, busy, label) {
  if (!button.dataset.originalText) button.dataset.originalText = button.innerHTML;
  button.disabled = busy;
  button.innerHTML = busy ? `<span>${label}</span><span class="spinner">…</span>` : button.dataset.originalText;
}
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("resume");
  if (fileInput) fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    document.getElementById("fileName").textContent = file ? file.name : "Choose a PDF, DOCX or TXT file";
  });
});

async function analyzeResume() {
  const file = document.getElementById("resume").files[0];
  const job = document.getElementById("job").value;
  const result = document.getElementById("resumeResult");
  const button = document.querySelector("#resume-card .btn");
  if (!file) { showResult(result, "Please upload your resume first.", "error"); return; }
  if (file.size > 5 * 1024 * 1024) { showResult(result, "This file is larger than 5 MB. Please choose a smaller file.", "error"); return; }
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job", job);
  showResult(result, "✦  Reading your resume and preparing personalized feedback…", "loading");
  setBusy(button, true, "Analyzing your resume…");
  try {
    const response = await fetch("/api/analyze-resume", { method: "POST", body: formData });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Analysis failed.");
    showResult(result, data.result || "No analysis was returned.");
  } catch (error) {
    showResult(result, "Error: " + error.message, "error");
  } finally { setBusy(button, false); }
}

async function suggestCareer() {
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;
  const interests = document.getElementById("interests").value;
  const result = document.getElementById("careerResult");
  const button = document.querySelector("#career-card .btn");
  if (!education.trim() || !skills.trim() || !interests.trim()) {
    showResult(result, "Please enter your education, skills, and interests.", "error"); return;
  }
  showResult(result, "✦  Matching your skills and interests with possible career paths…", "loading");
  setBusy(button, true, "Finding your career path…");
  try {
    const response = await fetch("/api/career", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ education, skills, interests })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Career search failed.");
    showResult(result, data.result || "No recommendations were returned.");
  } catch (error) {
    showResult(result, "Error: " + error.message, "error");
  } finally { setBusy(button, false); }
}

async function prepareInterview() {
  const company = document.getElementById("company").value.trim();
  const role = document.getElementById("interviewRole").value.trim();
  const level = document.getElementById("experienceLevel").value;
  const focus = document.getElementById("prepFocus").value;
  const skills = document.getElementById("interviewSkills").value.trim();
  const result = document.getElementById("interviewResult");
  const button = document.querySelector("#interview-card .btn");
  if (!company || !role) {
    showResult(result, "Please enter the target company and the role you want to prepare for.", "error"); return;
  }
  showResult(result, "✦  Building your company-focused preparation plan and practice questions…", "loading");
  setBusy(button, true, "Creating your interview plan…");
  try {
    const response = await fetch("/api/interview-prep", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, level, focus, skills })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Interview preparation failed.");
    showResult(result, data.result || "No interview plan was returned.");
  } catch (error) {
    showResult(result, "Error: " + error.message, "error");
  } finally { setBusy(button, false); }
}
