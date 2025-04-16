import { basics } from "@cv";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [renderHint, setRenderHint] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const { email, github, linkedin } = basics;

  const handleOpenLink = React.useCallback((url: string) => {
    window.open(url, "_blank");
    setOpen(false);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.classList[
        newTheme === "dark" ? "add" : "remove"
      ]("dark");

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }

      return newTheme;
    });

    setOpen(false);
  }, []);

  const keyActionMap = React.useMemo(
    () => ({
      k: () => setOpen((prev) => !prev),
      o: () => handleOpenLink(email),
      x: () => handleOpenLink(github),
      g: () => handleOpenLink(linkedin),
      m: () => toggleTheme(),
    }),
    [email, github, linkedin, handleOpenLink, toggleTheme],
  );

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const key = e.key as string;
      if ((e.metaKey || e.ctrlKey) && key in keyActionMap) {
        e.preventDefault();
        keyActionMap[key as keyof typeof keyActionMap]();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [keyActionMap]);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setShowHint(true);
      } else {
        setShowHint(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (showHint) {
      setRenderHint(true);
    } else {
      const timeout = setTimeout(() => {
        setRenderHint(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showHint]);

  return (
    <>
      {renderHint && (
        <div
          className={`fixed bottom-0 bg-main border-t-2 min-h-10 w-full z-10 hidden lg:grid place-content-center ${
            showHint ? "animate-fade-in" : "animate-fade-out"
          }`}
        >
          <p className="text-sm">
            Press <kbd className="px-1 py-0.5 border rounded">Cmd</kbd> +{" "}
            <kbd className="px-1 py-0.5 border rounded">K</kbd> to open the
            command palette
          </p>
        </div>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem className="cursor-pointer" onSelect={toggleTheme}>
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-sun-icon lucide-sun"
                >
                  <title>Sun Icon</title>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-moon-icon lucide-moon"
                >
                  <title>Moon Icon</title>
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}

              <span>Toggle Theme</span>
              <CommandShortcut>
                <kbd className="px-1 py-0.5 border rounded">Cmd</kbd> +{" "}
                <kbd className="px-1 py-0.5 border rounded">M</kbd>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Social Media">
            <CommandItem
              className="cursor-pointer"
              onSelect={() => handleOpenLink(email)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-mail-icon lucide-mail"
              >
                <title>Mail Icon</title>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="ml-2">Email</span>
              <CommandShortcut>
                <kbd className="px-1 py-0.5 border rounded">Cmd</kbd> +{" "}
                <kbd className="px-1 py-0.5 border rounded">O</kbd>
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              className="cursor-pointer"
              onSelect={() => handleOpenLink(github)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github-icon lucide-github"
              >
                <title>GitHub Icon</title>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="ml-2">Github</span>
              <CommandShortcut>
                <kbd className="px-1 py-0.5 border rounded">Cmd</kbd> +{" "}
                <kbd className="px-1 py-0.5 border rounded">X</kbd>
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              className="cursor-pointer"
              onSelect={() => handleOpenLink(linkedin)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin"
              >
                <title>Linkedin Icon</title>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="ml-2">Linkedin</span>
              <CommandShortcut>
                <kbd className="px-1 py-0.5 border rounded">Cmd</kbd> +{" "}
                <kbd className="px-1 py-0.5 border rounded">G</kbd>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
