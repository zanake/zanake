import { useState, useEffect } from "react";

export type theming = "dark" | "light";

/**
 * Returns the host machine (i.e iPhone, Andriod, windows) preferred color scheme
 * Default to fallback then "light", in case of any error
 * 
 * @param {theming} fallback - default color scheme in case system default is not detected, if none is given it defaults to "light"
 * 
 * @returns {theming}
 */
const usePrefersColorScheme = (fallback: theming) : theming => {
    const [state, setState] = useState(fallback || "light");

    useEffect(() => {
        if (typeof window !== undefined) {
            const listener = ((event: MediaQueryListEvent) => setState(event.matches ? "light" : "dark"));
            const query = window.matchMedia("(prefers-color-scheme: light)");
            setState(query.matches ? "light" : "dark");
            query.addEventListener("change", listener);

            return () => query.removeEventListener("change", listener);
        }
    }, []);

    return state;
}

export default usePrefersColorScheme;