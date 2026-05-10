import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export function Button({ variant = 'primary', isLoading = false, children, className = '', ...props }) {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    };
    return (_jsx("button", { className: `px-4 py-2 rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`, disabled: isLoading || props.disabled, ...props, children: isLoading ? (_jsxs("span", { className: "flex items-center justify-center", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" }), "Processando..."] })) : (children) }));
}
//# sourceMappingURL=Button.js.map