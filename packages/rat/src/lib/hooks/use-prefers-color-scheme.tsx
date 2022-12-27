import { useState, useEffect } from "react";

/**
 * Checks if the host machine has the light theme activated
 * 
 * @param {'dark'|'light'} fallback - default theme in case system default is not detected
 * 
 * @returns {boolean}
 */
const usePrefersColorScheme = (fallback: 'dark'|'light') : boolean => {
    const currentColorScheme = () => {
        let lightThemed = fallback === 'light';

        try {
            if (typeof window !== "undefined") lightThemed = window.matchMedia("(prefers-color-scheme: light)").matches;
        } catch (error) {
            console.debug(error);
        }

        return lightThemed;
    }

    const [lightThemed, setLightThemed] = useState(currentColorScheme());

    const mediaQueryListener = ((event: MediaQueryListEvent) => setLightThemed(event.matches));

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const lightThemeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
                lightThemeMediaQuery.addEventListener("change", mediaQueryListener);

                return () => lightThemeMediaQuery.removeEventListener("change", mediaQueryListener);
            }

            return;
        } catch (error) {
            console.debug(error);
            return;
        }
    }, []);

    return lightThemed;
}

export default usePrefersColorScheme;