"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { useState } from "react";

const Switcher = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <ThemeSwitcher defaultValue="system" onChange={setTheme} value={theme} />
  );
};

export default Switcher;
