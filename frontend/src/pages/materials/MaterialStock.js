import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { stockApi } from '../../services/stock.service.js';
import materialApi from '../../services/materials.api.js';
import { DataTable } from '../../components/common/DataTable.js';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
export function MaterialStock() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadData() {
            try {
                const [stockRes, materialRes] = await Promise.all([
                    stockApi.getByMaterial(id),
                    materialApi.getById(id)
                ]);
                setStocks(stockRes.data);
                setMaterial(materialRes.data);
            }
            catch (error) {
                alert('Erro ao carregar distribuição de material');
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);
    if (loading)
        return _jsx("div", { className: "p-8", children: "Carregando..." });
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h1", { className: "text-2xl font-bold", children: ["Distribui\u00E7\u00E3o: ", material?.name] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", onClick: () => navigate('/dashboard'), title: "Dashboard", children: [_jsx(LayoutDashboard, { size: 20, className: "mr-2" }), " Dashboard"] }), _jsx(Link, { to: "/materials", className: "text-blue-500 hover:underline", children: "Voltar aos Materiais" })] })] }), _jsx(DataTable, { data: stocks, columns: [
                    { header: 'Depósito', accessor: (row) => row.warehouse.name },
                    {
                        header: 'Quantidade',
                        accessor: (row) => (_jsxs("span", { className: `font-bold ${row.quantity < 10 ? 'text-red-500' : ''}`, children: [row.quantity, " ", material?.unit] }))
                    }
                ] })] }));
}
//# sourceMappingURL=MaterialStock.js.map