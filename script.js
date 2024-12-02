const output = document.getElementById("output");
const inputContainer = document.getElementById("input-container"); // Select input container
inputContainer.style.display = "none"; // Hide input container initially

const commands = {
  "?": `show project  = render participated/built project
about me      = my information
contact       = my socials account to reach me
layout info   = website's design description`,
  "show project": "Projects:",
  "about me": "\nHello, I'm Muhammad Azahari Saiful Bahri.\n\nRelevant Coursework:\nComputer Networking\nData Engineering\nStatistical Analyst\n\nSkills:\nRouting protocols and Switching protocols Management:\nARP, OSPFv2, GRE Tunelling, PIM, HSRP, VRRP, IP sla\nVLAN, STP, EtherChannel, Switch Stacking\n\nProgramming and tools:\nRust, Haskell, Python, NumPy, Pandas, PostgreSQL, Cassandra\n\nSoft skills:\nFast Learner & Analytical Skill\n\nLanguages:\nMalay, Arabic, Standard Mandarin, English ",
  "contact": "Email: azahari.saiful@gmail.com\nPhone: +60 14 305 0657\nGitHub: https://github.com/2akura",
  "layout info": "\nThis website is inspired by a terminal-based UI. The design reflects the following principles:\n\n-Focused on simplicity, this design steers clear of the confusion flashy interfaces can create.\n-An aesthetic that evokes the charm of vintage terminal UIs, paired with an SSH-inspired tunneling vibe and typewriter-style animations during initialization.",
};

// Projects data
const projects = [
  { name: "Project 1", href: "https://www.w3.org/Provider/Style/dummy.html" },
  { name: "Project 2", href: "https://www.w3.org/Provider/Style/dummy.html" },
  { name: "Project 3", href: "https://www.w3.org/Provider/Style/dummy.html" },
];

// Typewriter effect without adding unnecessary blank lines
const typewriter = (text, delay = 50) =>
  new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      output.innerHTML += text[i]; // Append one character at a time
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve(); // Resolve the promise when done
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
  await typewriter("encryption:aes256-ctr mac:hmac-sha2-256\n", 150);
  await typewriter("Elliptic Curve Diffie-Hellman Key Exchange Reply(31)\n", 50);
  await typewriter("ECDSA Key fingerprints is SHA256:DKLQ4bZMd\n", 50);
  await typewriter("[ ██████", 280);
  await typewriter("█████████████████████████████████ ]  100%\n", 50);
  await typewriter("SSH connection successfully created\n", 80);
  await typewriter("Press ? for command list\n", 100);

  // After all typewriter animations, add #Router -> and show input container
  const promptSpan = document.createElement("span");
  
  output.appendChild(promptSpan); // Add the #Router -> prompt

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


