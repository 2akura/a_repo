const output = document.getElementById("output");
const inputContainer = document.getElementById("input-container"); // Select input container
inputContainer.style.display = "none"; // Hide input container initially

const commands = {
  "?": `show project  = render participated/built project
about me      = my information
contact       = my socials account to reach me
layout info   = website's design description`,
  "show project": "Projects:",
  "about me": "Hello, I'm [Your Name]. I'm a software developer passionate about building interactive web applications.",
  "contact": "Email: yourname@email.com\nPhone: +123456789\nGitHub: https://github.com/yourname\nLinkedIn: https://linkedin.com/in/yourname",
  "layout info": "This website emulates a terminal UI:\n- Minimalistic layout with no borders.\n- Commands and outputs grow infinitely downward.\n- Font size is 24px with a typewriter aesthetic.",
};

// Projects data
const projects = [
  { name: "Project 1", href: "https://www.w3.org/Provider/Style/dummy.html" },
  { name: "Project 2", href: "https://www.w3.org/Provider/Style/dummy.html" },
  { name: "Project 3", href: "https://www.w3.org/Provider/Style/dummy.html" },
];

// Typewriter effect
const typewriter = (text, delay = 50) =>
  new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      output.innerHTML += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        output.innerHTML += "\n"; // Add a newline after the text is completed
        resolve();
      }
    }, delay);
  });

// Print to output
const printOutput = (text, isError = false) => {
  const span = document.createElement("span");
  span.textContent = text + "\n";
  if (isError) span.classList.add("error");
  output.appendChild(span);
  window.scrollTo(0, document.body.scrollHeight);
};

// Handle commands
const handleCommand = (cmd) => {
  const lowerCmd = cmd.toLowerCase();
  if (commands[lowerCmd]) {
    printOutput(`#Router -> ${cmd}`);
    if (lowerCmd === "show project") {
      printOutput("Projects:");
      projects.forEach((project) => {
        const button = document.createElement("button");
        button.textContent = project.name;
        button.onclick = () => window.open(project.href, "_blank");
        output.appendChild(button);
      });
    } else {
      printOutput(commands[lowerCmd]);
    }
  } else {
    printOutput(
      `Error: such command isn't defined. Please use ? for command list.`,
      true
    );
  }
};

// Initialize terminal
const init = async () => {
  // Typewriter animations for initial setup
  await typewriter("Building SSH connection...\n", 100);
  await typewriter("SSH connection successfully created\n", 100);
  await typewriter("Press ? for command list\n", 100);

  // After setup, display the #Router -> prompt and show input container
  await typewriter("#Router -> ", 100); // Dynamic #Router -> with typewriter
  inputContainer.style.display = "flex"; // Reveal input container
};

// Listen for user input
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const command = input.value.trim();
    input.value = "";
    handleCommand(command);
  }
});

init();


