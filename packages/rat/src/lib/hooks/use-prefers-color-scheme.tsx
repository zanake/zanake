import { useState, useEffect } from "react";

/**
 * Checks if the host machine has the light theme toggled
 * 
 * @returns {boolean}
 */
const usePrefersColorScheme = () : boolean => {
    const currentColorScheme = () => window.matchMedia("(prefers-color-scheme: light)").matches;

    const [lightThemed, setLightThemed] = useState(currentColorScheme());

    const mediaQueryListener = ((event: MediaQueryListEvent) => setLightThemed(event.matches));

    useEffect(() => {
        if (window !== undefined) {
            const lightThemeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
            lightThemeMediaQuery.addEventListener("change", mediaQueryListener);

            return () => lightThemeMediaQuery.removeEventListener("change", mediaQueryListener);
        }

        return;
    }, []);

    return lightThemed;
}

export default usePrefersColorScheme;