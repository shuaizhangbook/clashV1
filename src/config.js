// Animation and Visual Configuration
// Easy to adjust parameters for 3D effects, meteors, and stars

export const CONFIG = {
    // 3D Panel Settings
    panel: {
        desktop: {
            baseRotateX: 15,        // Base X rotation in degrees
            baseRotateY: -18,       // Base Y rotation in degrees
            mouseOffsetRange: 3,    // Mouse tracking offset range (±deg)
            hoverRotateXOffset: -3, // X rotation change on hover
            hoverRotateYOffset: 3,  // Y rotation change on hover
            hoverScale: 1.02,       // Scale on hover
        },
        mobile: {
            rotateX: 0,             // No tilt on mobile
            rotateY: 0,
        },
        floatDuration: 5,         // Floating animation duration (seconds)
        floatDistance: 15,        // Floating distance (pixels)
    },

    // Star Settings
    stars: {
        desktop: {
            count: 200,             // Number of stars
            maxTop: 60,             // Stars in upper 60% of screen
            minSize: 1,             // Minimum star size (px)
            maxSize: 3,             // Maximum star size (px)
            minDuration: 1.5,       // Minimum twinkle duration (seconds)
            maxDuration: 3,         // Maximum twinkle duration (seconds)
        },
        mobile: {
            count: 80,              // Reduced stars for mobile
            maxTop: 50,
            minSize: 1,
            maxSize: 2,
            minDuration: 2,
            maxDuration: 4,
        },
    },

    // Meteor Settings
    meteors: {
        desktop: {
            enabled: true,
            maxVisible: 2,          // Max simultaneous meteors
            minSpawnInterval: 4000, // Min time between spawns (ms)
            maxSpawnInterval: 9000, // Max time between spawns (ms)
            minDuration: 1.8,       // Min animation duration (seconds)
            maxDuration: 2.5,       // Max animation duration (seconds)
            minTailLength: 80,      // Min tail length (px)
            maxTailLength: 140,     // Max tail length (px)
            minWidth: 2,            // Min meteor width (px)
            maxWidth: 3,            // Max meteor width (px)
            foregroundOpacity: 1,   // Bright meteor opacity
            backgroundOpacity: 0.5, // Dim meteor opacity
        },
        mobile: {
            enabled: false,         // Disable meteors on mobile for performance
            maxVisible: 1,
            minSpawnInterval: 8000,
            maxSpawnInterval: 15000,
            minDuration: 2,
            maxDuration: 3,
            minTailLength: 60,
            maxTailLength: 100,
            minWidth: 2,
            maxWidth: 2.5,
            foregroundOpacity: 0.8,
            backgroundOpacity: 0.4,
        },
    },

    // Login Card Settings
    card: {
        hoverTranslateY: -2,      // Upward movement on hover (px)
        hoverTiltRange: 1,        // Tilt range on hover (deg)
        transitionDuration: 500,  // Transition duration (ms)
    },

    // Color Palette (easy to customize)
    colors: {
        electricBlue: '#00f3ff',
        neonPurple: '#bc13fe',
        starColor: '#ffffff',
        meteorBright: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(180,220,255,0.6) 40%, transparent 100%)',
        meteorDim: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(180,220,255,0.3) 40%, transparent 100%)',
        // Enhanced background gradients
        deepSpace: {
            top: '#000510',
            mid: '#001428',
            bottom: '#002855',
        },
        shimmer: 'rgba(100, 200, 255, 0.03)',
    },

    // Dashboard specific settings
    dashboard: {
        sidebar: {
            width: 280,
            floatDistance: 8,      // Floating animation distance (px)
            floatDuration: 4,      // Floating animation duration (s)
            parallaxStrength: 15,  // Mouse parallax effect strength
        },
        mainPanel: {
            floatDistance: 12,
            floatDuration: 5,
            parallaxStrength: 20,
        },
    },
};

// Utility function to detect mobile devices
export const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768; // Tailwind's 'md' breakpoint
};

// Get configuration based on device type
export const getConfig = (configKey) => {
    const mobile = isMobile();
    const config = CONFIG[configKey];

    if (!config) return null;

    if (config.desktop && config.mobile) {
        return mobile ? config.mobile : config.desktop;
    }

    return config;
};
