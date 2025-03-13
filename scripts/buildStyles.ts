const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run tailwind CLI to generate CSS
console.log("Running tailwind build...");
execSync('pnpm exec tailwindcss -i ./src/input.css -o ./src/styles.css --minify --config ./tailwind.config.js --verbose', {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..')  // Ensure we're in the right directory
});

// Read the generated CSS file
console.log("Reading generated CSS...");
const cssContent = fs.readFileSync(path.join(__dirname, '../src/styles.css'), 'utf8');

// Remove the first line (comment) and create the TS string content
const cssWithoutFirstLine = cssContent.split('\n').slice(1).join('\n');
const tsContent = `// Generated file - do not edit directly
export const stylesString = \`${cssWithoutFirstLine}\`;
`;

// Write the TypeScript file
console.log("Writing TypeScript styles file...");
fs.writeFileSync(path.join(__dirname, '../src/stylesString.ts'), tsContent);

// Debug output
console.log("\nGenerated CSS includes these classes:");
const classes = cssContent.match(/\.[a-zA-Z0-9_-]+\s*{/g);
if (classes) {
  classes.forEach(c => console.log(c));
} else {
  console.log("No classes found in generated CSS!");
}

console.log("\nStyle generation complete!"); 