import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Link } from 'react-router-dom';
export function Dashboard() {
    const [metrics, setMetrics] = useState({
        works: 0,
        materials: 0,
        warehouses: 0
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadMetrics() {
            try {
                const [worksRes, materialsRes, warehousesRes] = await Promise.all([
                    api.get('/works'),
                    api.get('/materials'),
                    api.get('/warehouses')
                ]);
                setMetrics({
                    works: worksRes.data.length,
                    materials: materialsRes.data.length,
                    warehouses: warehousesRes.data.length
                });
            }
            catch (error) {
                console.error('Erro ao carregar métricas', error);
            }
            finally {
                setLoading(false);
            }
        }
        loadMetrics();
    }, []);
    if (loading)
        return _jsx("div", { className: "p-8", children: "Carregando Dashboard..." });
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Painel de Controle" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12", children: [_jsxs("div", { className: "bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100", children: [_jsx("p", { className: "text-blue-600 font-medium", children: "Total de Obras" }), _jsx("p", { className: "text-4xl font-bold", children: metrics.works }), _jsx(Link, { to: "/works", className: "text-sm text-blue-500 hover:underline mt-2 block", children: "Ver todas" })] }), _jsxs("div", { className: "bg-green-50 p-6 rounded-lg shadow-sm border border-green-100", children: [_jsx("p", { className: "text-green-600 font-medium", children: "Materiais Cadastrados" }), _jsx("p", { className: "text-4xl font-bold", children: metrics.materials }), _jsx(Link, { to: "/materials", className: "text-sm text-green-500 hover:underline mt-2 block", children: "Ver todos" })] }), _jsxs("div", { className: "bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100", children: [_jsx("p", { className: "text-purple-600 font-medium", children: "Dep\u00F3sitos Ativos" }), _jsx("p", { className: "text-4xl font-bold", children: metrics.warehouses }), _jsx(Link, { to: "/warehouses", className: "text-sm text-purple-500 hover:underline mt-2 block", children: "Ver todos" })] })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "A\u00E7\u00F5es R\u00E1pidas" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Link, { to: "/works/new", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition", children: "Cadastrar Obra" }), _jsx(Link, { to: "/materials/new", className: "px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition", children: "Cadastrar Material" }), _jsx(Link, { to: "/warehouses/new", className: "px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition", children: "Criar Dep\u00F3sito" }), _jsx(Link, { to: "/stock-movement", className: "px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition", children: "Movimentar Estoque" })] })] })] }));
}
//# sourceMappingURL=Dashboard.js.map