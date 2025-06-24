declare module "*.css";
declare module "*.png";

declare module "*.svg?react" {
    import React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

// /// <reference types="vite/client" />

// interface ImportMetaEnv {

// }

// interface ImportMeta {
//     readonly env: ImportMetaEnv;
// }