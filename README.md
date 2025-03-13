# This is a basic Plasmo project with a src directory and Tailwind 4 support

So it turns out that if you create a simple Plasmo project following the instructions straight from the [Plasmo](https://docs.plasmo.com/framework/customization/src#--with-src) [docs](https://docs.plasmo.com/quickstarts/with-tailwindcss#create-a-plasmo-project-with-tailwindcss), your build will fail:

```bash
pnpm create plasmo --with-src
cd myextension
pnpm install
pnpm build
# Build will fail with error:  ELIFECYCLE  Command failed with exit code 139.
```

or

```bash
pnpm create plasmo --with-tailwindcss
cd myextension
pnpm install
pnpm build
# Build will fail with error:  ELIFECYCLE  Command failed with exit code 139.
```

So here are the steps you can use to create a Plasmo project with a src directory and using Tailwind, from scratch:

## Project Initialization Steps

This project was created with the following sequence of commands, using pnpm

```bash
pnpm create plasmo
cd plasmo-template
mkdir src
mv popup.tsx ./src
pnpm install
pnpm build
# Above build works.  Now set up Tailwind 4 support with workaround for build failures:
pnpm i -D tailwindcss @tailwindcss/cli postcss autoprefixer ts-node
mkdir scripts
touch scripts/buildStyles.ts
touch scripts/tsconfig.json
# Now populate the above two files with their content (copy from this project)
# These files are used to generate a CSS string in order to work around the build crash issue
# This string is then imported into popup - see the code in popup for further info
```

I then added the following to the auto-generated popup.tsx to make sure Tailwind classes were being applied:

```typescript
import { stylesString } from "./stylesString"

if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = stylesString
    document.head.appendChild(style)
}

// And I added this <div> in the TSX markup with some Tailwind classes:
<div className="bg-gray-800 text-red-500 p-4">
    This is content styled with Tailwind with gray background and red text
</div>
```

I also added a content (CSUI) file, content.tsx, and in that file I was able to actually use the getStyle() function mechanism.

Next I added an input.css file:

```bash
touch src/input.css
```

Then I populated src/input.css with *only* this content (the correct way for Tailwind 4):

```css
@import "tailwindcss";
```


Next I added a custom build step to package.json's scripts section, and made the default build and run commands call it first.  Note that with this custom build step for the CSS string, we aren't actually using postcss.config.js or een tailwind.config.js.  Version 4 of the tailwind CLI (I believe) ignores that tailwind.config.js parameter.  And tailwind CLI has built-in postcss and autoprefixer so it doesn't actually reference the postcss.config.js file.  But, I included it in the project in case they fix this Plasmo build issue so that it'll be easier for you to stop using this custom "build:styles" build step.

```json
  "scripts": {
    "build:styles": "ts-node --compilerOptions '{\"module\":\"commonjs\"}' scripts/buildStyles.ts",
    "dev": "pnpm build:styles && plasmo dev",
    "build": "pnpm build:styles && plasmo build",
    "package": "plasmo package"
  },
```

Finally, I built the project:

```bash
pnpm build
```

For reasons unknown to me, the PlasmoGetStyle() type of function in the popup does not work (the Tailwind classes will have no effect in popup.tsx using that method), and so I have a simple workaround for that as well, in popup.tsx, which does work with Tailwind.

