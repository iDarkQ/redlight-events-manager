declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.png";
declare module "*.md";

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
    VITE_MAPBOX_PUBLIC_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}