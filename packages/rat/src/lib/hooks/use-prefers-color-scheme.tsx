import { useState, useEffect } from "react";

export type theming = "dark" | "light";

/**
 * Returns the host machine (i.e iPhone, Andriod, windows) preferred color scheme
 * 
 * @param {theming} fallback - default color scheme in case system default is not detected, if none is given it defaults to "light"
 * 
 * @returns {theming}
 */
const usePrefersColorScheme = (fallback: theming) : theming => {
    const [state, setState] = useState(fallback || "light");

    const listener = ((event: MediaQueryListEvent) => setState(event.matches ? "light" : "dark"));

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const query = window.matchMedia("(prefers-color-scheme: light)");
                query.addEventListener("change", listener);

                return () => query.removeEventListener("change", listener);
            }

            return;
        } catch (error) {
            console.error(error);
            return;
        }
    }, []);

    return state;
}

export default usePrefersColorScheme;