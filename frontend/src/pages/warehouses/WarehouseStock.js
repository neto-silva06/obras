import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stockApi } from '../../services/stock.service.js';
import materialApi from '../../services/materials.api.js';
import warehouseApi from '../../services/warehouses.api.js';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
export function WarehouseStock() {
    const { id } = useParams();
    const [stocks, setStocks] = useState([]);
    const [warehouse, setWarehouse] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [adjustment, setAdjustment] = useState({ materialId: '', quantity: 0, operation: 'add' });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadData();
    }, [id]);
    async function loadData() {
        setLoading(true);
        try {
            const [stockRes, warehouseRes, materialRes] = await Promise.all([
                stockApi.getByWarehouse(id),
                warehouseApi.getById(id),
                materialApi.getAll()
            ]);
            setStocks(stockRes.data);
            setWarehouse(warehouseRes.data);
            setMaterials(materialRes);
        }
        catch (error) {
            alert('Erro ao carregar dados de estoque');
        }
        finally {
            setLoading(false);
        }
    }
    async function handleAdjust() {
        if (!adjustment.materialId || adjustment.quantity <= 0)
            return;
        try {
            await stockApi.adjust({
                warehouseId: id,
                ...adjustment
            });
            alert('Estoque atualizado com sucesso!');
            await loadData();
        }
        catch (error) {
            alert(error.response?.data?.message || 'Erro ao ajustar estoque');
        }
    }
    if (loading)
        return _jsx("div", { className: "p-8", children: "Carregando..." });
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h1", { className: "text-2xl font-bold", children: ["Estoque: ", warehouse?.name] }), _jsx(Link, { to: "/warehouses", className: "text-blue-500", children: "Voltar aos Dep\u00F3sitos" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Materiais em Estoque" }), _jsx(DataTable, { data: stocks, columns: [
                                    { header: 'Material', accessor: (row) => row.material.name },
                                    {
                                        header: 'Quantidade',
                                        accessor: (row) => (_jsxs("span", { className: `font-bold ${row.quantity < 10 ? 'text-red-500' : ''}`, children: [row.quantity, " ", row.material.unit] }))
                                    },
                                ] })] }), _jsxs("div", { className: "bg-gray-100 p-6 rounded-lg h-fit", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Movimenta\u00E7\u00E3o de Estoque" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "material-select", className: "block text-sm font-medium text-gray-700", children: "Material" }), _jsxs("select", { id: "material-select", className: "w-full p-2 border rounded", value: adjustment.materialId, onChange: (e) => setAdjustment({ ...adjustment, materialId: e.target.value }), children: [_jsx("option", { value: "", children: "Selecione o material" }), materials.map(m => _jsx("option", { value: m.id, children: m.name }, m.id))] })] }), _jsx(FormField, { name: "quantity", label: "Quantidade", type: "number", value: adjustment.quantity, onChange: (val) => setAdjustment({ ...adjustment, quantity: Number(val) }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: () => setAdjustment({ ...adjustment, operation: 'add' }), className: adjustment.operation === 'add' ? 'bg-blue-600' : 'bg-gray-400', children: "Entrada" }), _jsx(Button, { onClick: () => setAdjustment({ ...adjustment, operation: 'remove' }), className: adjustment.operation === 'remove' ? 'bg-blue-600' : 'bg-gray-400', children: "Sa\u00EDda" }), _jsx(Button, { onClick: () => setAdjustment({ ...adjustment, operation: 'set' }), className: adjustment.operation === 'set' ? 'bg-blue-600' : 'bg-gray-400', children: "Ajuste" })] }), _jsx(Button, { className: "w-full mt-4 bg-green-600 text-white", onClick: handleAdjust, children: "Confirmar Opera\u00E7\u00E3o" })] })] })] })] }));
}
//# sourceMappingURL=WarehouseStock.js.map