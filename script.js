const output = document.getElementById("output");
const inputContainer = document.getElementById("input-container"); // Select input container
inputContainer.style.display = "none"; // Hide input container initially

const commands = {
  "?": `show project  = render participated/built project
about me      = my information
contact       = my socials account to reach me
layout info   = website's design description`,
  "show project": "Projects:",
  "about me": " \n> Hello, I'm Muhammad Azahari Saiful Bahri.\n \n. Relevant Coursework:\n├ Computer Networking\n├ Data Engineering\n└ Statistical Analyst\n \n. Skills:\n├ Routing protocols and Switching protocols Management:\n├─ ARP, OSPFv2, GRE Tunelling, PIM, HSRP, VRRP, IP sla\n└─ VLAN, STP, EtherChannel, Switch Stacking\n \n├ Programming and tools:\n└─ Rust, Haskell, Python, NumPy, Pandas, PostgreSQL, Cassandra\n \n├ Soft skills:\n└─ Fast Learner & Analytical Skill\n \n├ Languages:\n└─ Malay, Arabic, Standard Mandarin, English\n ",
  "contact": " \nEmail: azahari.saiful@gmail.com\nPhone: +60 14 305 0657\nGitHub: https://github.com/2akura\n ",
  "layout info": " \nThis website is inspired by a terminal-based UI. The design reflects the following principles:\n \n- Focused on simplicity, this design steers clear of the confusion flashy interfaces can create.\n \n- An aesthetic that evokes the charm of vintage terminal UIs, paired with an SSH-inspired tunneling vibe and typewriter-style animations.",
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
// Typing animation for multiline outputs
const printOutput = async (text, isError = false) => {
  const lines = text.split("\n"); // Split the text into lines
  for (const line of lines) {
    const div = document.createElement("div");
    if (isError) div.classList.add("error"); // Add error styling if needed
    output.appendChild(div); // Append the div to the output container
    await typewriter(line, 50); // Animate typing for each line
    div.textContent = line; // Set the text content after typing
    div.style.whiteSpace = "pre-wrap"; // Preserve formatting
    window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom
  }
};

// Handle commands
const handleCommand = async (cmd) => {
  const lowerCmd = cmd.toLowerCase();

  // Print the command the user typed
  if (commands[lowerCmd]) {
    await printOutput(`#Router 1> ${cmd}`); // Animate the command echo
    if (lowerCmd === "show project") {
      await printOutput("Projects:"); // Animate the Projects header
      projects.forEach((project) => {
        const button = document.createElement("button");
        button.textContent = project.name;
        button.onclick = () => window.open(project.href, "_blank");
        output.appendChild(button);
        window.scrollTo(0, document.body.scrollHeight); // Scroll to show button
      });
    } else {
      await printOutput(commands[lowerCmd]); // Animate command output
    }
  } else {
    await printOutput(
      `Error: such command isn't defined. Please use ? for command list.`,
      true
    );
  }
};

// Initialize terminal
const init = async () => {
  // Typewriter animations for initial setup
  await typewriter("Building SSH connection...\n", 100);
  await typewriter("encryption:aes256-ctr mac:hmac-sha2-256\n", 100);
  await typewriter("Elliptic Curve Diffie-Hellman Key Exchange Reply(31)\n", 50);
  await typewriter("ECDSA Key fingerprints is SHA256:DKLQ4bZMd\n", 50);
  await typewriter("[ ██████", 280);
  await typewriter("█████████████████████████████████ ]  100%\n", 50);
  await typewriter("SSH connection successfully created\n", 80);
  await typewriter("Press ? for command list\n", 70);

  // After all typewriter animations, add #Router -> and show input container
  const promptSpan = document.createElement("span");
  
  output.appendChild(promptSpan); // Add the #Router -> prompt

  inputContainer.style.display = "flex"; // Reveal input container
};

// Listen for user input
const input = document.getElementById("input"); // Ensure you select the input element
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const command = input.value.trim();
    input.value = "";
    handleCommand(command);
  }
});

init();
