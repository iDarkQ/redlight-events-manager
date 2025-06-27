declare module "*.css";
declare module "*.png";

declare module "*.svg?react" {
    import React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_DEBUG: string;
    VITE_LOCAL_BACKEND_URL: string;
    VITE_BACKEND_URL: string;
    VITE_MAPBOX_SECRET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}