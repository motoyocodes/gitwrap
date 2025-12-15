export function generateRoast(data: any) {
  const { topLanguages } = data;
  const topLang = topLanguages[0]?.name || "None";

  //  Language Specific Roasts
  if (topLang === "JavaScript") {
    return "You are one 'undefined is not a function' away from a breakdown.";
  }
  if (topLang === "TypeScript") {
    return "You spend 90% of your time defining interfaces and 10% actually coding.";
  }
  if (topLang === "Python") {
    return "I bet you think indentation is a personality trait.";
  }
  if (topLang === "Java") {
    return "You write 50 lines of boilerplate just to print 'Hello World'.";
  }
  if (topLang === "Rust") {
    return "We get it, you use Rust. You can stop telling everyone now.";
  }
  if (topLang === "PHP") {
    return "Are you okay? Do you need a hug? Or just a modern framework?";
  }
  if (topLang === "CSS") {
    return "Centering a div is not 'Software Engineering'.";
  }
  if (topLang === "Go") {
    return "Your codebase is just 1% logic hidden inside 99% 'if err != nil'.";
  }
  if (topLang === "C++") {
    return "You enjoy managing memory manually because you have deep-seated control issues.";
  }
  if (topLang === "C") {
    return "You probably think 'Segfault' is a valid debugging strategy.";
  }
  if (topLang === "C#") {
    return "Tell me you work in a corporate cubicle without telling me you work in a corporate cubicle.";
  }
  if (topLang === "HTML") {
    return "I said 'programming languages', not markup tags. Sit down.";
  }
  if (topLang === "Ruby") {
    return "Building a startup in 2013 called, they want their tech stack back.";
  }
  if (topLang === "Swift") {
    return "You definitely paid $3,000 for a laptop just to center a button on an iPhone.";
  }
  if (topLang === "Kotlin") {
    return "You're just a Java developer who finally discovered syntax sugar.";
  }
  if (topLang === "Shell") {
    return "Your ideal Friday night is rewriting your dotfiles for the 50th time.";
  }
  if (topLang === "Dart") {
    return "Google is going to kill your framework in 2 years. Just give up now.";
  }
  if (topLang === "Solidity") {
    return "How's that rug pull coming along? To the moon?";
  }
  if (topLang === "Elixir") {
    return "You spend more time explaining the Actor Model than actually building apps.";
  }
  if (topLang === "Haskell") {
    return "You're too smart to build anything actually useful.";
  }
  if (topLang === "Lua") {
    return "You are either a Roblox kid or a Neovim addict. There is no in-between.";
  }

  // 5. Default  Roasts
  const genericRoasts = [
    "Your commit history has more gaps than your resume.",
    "You write code like you're paid by the bug.",
    "I've seen AI generate better variable names than you.",
    "Your git commit messages are probably just 'fix', 'fix', 'fix again'.",
  ];

  return genericRoasts[Math.floor(Math.random() * genericRoasts.length)];
}
