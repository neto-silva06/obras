import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Save } from 'lucide-react';
import { Button } from '../components/common/Button.js';
import { FormField } from '../components/common/FormField.js';
import { stockApi } from '../services/stock.service.js';
import materialApi from '../services/materials.api.js';
import warehouseApi from '../services/warehouses.api.js';
export function StockMovement() {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        warehouseId: '',
        materialId: '',
        quantity: 0,
        operation: 'add'
    });
    useEffect(() => {
        async function loadData() {
            try {
                const [wRes, mRes] = await Promise.all([
                    warehouseApi.getAll(),
                    materialApi.getAll()
                ]);
                setWarehouses(wRes);
                setMaterials(mRes);
            }
            catch (error) {
                alert('Erro ao carregar dados para movimentação');
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.warehouseId || !formData.materialId || formData.quantity <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        setSubmitting(true);
        try {
            await stockApi.adjust(formData);
            alert('Movimentação realizada com sucesso!');
            navigate('/dashboard');
        }
        catch (error) {
            alert(error.response?.data?.message || 'Erro ao realizar movimentação');
        }
        finally {
            setSubmitting(false);
        }
    };
    if (loading)
        return _jsx("div", { className: "p-8 text-center text-gray-600", children: "Carregando..." });
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Movimenta\u00E7\u00E3o de Estoque" }), _jsxs(Button, { variant: "ghost", onClick: () => navigate('/dashboard'), title: "Voltar ao Dashboard", children: [_jsx(LayoutDashboard, { size: 20, className: "mr-2" }), " Dashboard"] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Dep\u00F3sito" }), _jsxs("select", { className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none", value: formData.warehouseId, onChange: (e) => setFormData({ ...formData, warehouseId: e.target.value }), required: true, children: [_jsx("option", { value: "", children: "Selecione o dep\u00F3sito" }), warehouses.map(w => _jsx("option", { value: w.id, children: w.name }, w.id))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Material" }), _jsxs("select", { className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none", value: formData.materialId, onChange: (e) => setFormData({ ...formData, materialId: e.target.value }), required: true, children: [_jsx("option", { value: "", children: "Selecione o material" }), materials.map(m => (_jsxs("option", { value: m.id, children: [m.name, " (", m.unit, ")"] }, m.id)))] })] }), _jsx(FormField, { label: "Quantidade", name: "quantity", type: "number", value: formData.quantity, onChange: (val) => setFormData({ ...formData, quantity: Number(val) }), required: true }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Tipo de Opera\u00E7\u00E3o" }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("label", { className: "flex items-center cursor-pointer", children: [_jsx("input", { type: "radio", className: "mr-2", name: "operation", checked: formData.operation === 'add', onChange: () => setFormData({ ...formData, operation: 'add' }) }), "Entrada (+)"] }), _jsxs("label", { className: "flex items-center cursor-pointer", children: [_jsx("input", { type: "radio", className: "mr-2", name: "operation", checked: formData.operation === 'remove', onChange: () => setFormData({ ...formData, operation: 'remove' }) }), "Sa\u00EDda (-)"] }), _jsxs("label", { className: "flex items-center cursor-pointer", children: [_jsx("input", { type: "radio", className: "mr-2", name: "operation", checked: formData.operation === 'set', onChange: () => setFormData({ ...formData, operation: 'set' }) }), "Ajuste (Fixo)"] })] })] }), _jsx("div", { className: "flex justify-end pt-4 border-t", children: _jsxs(Button, { type: "submit", isLoading: submitting, className: "w-full sm:w-auto", children: [_jsx(Save, { size: 18, className: "mr-2" }), " Confirmar Movimenta\u00E7\u00E3o"] }) })] })] }));
}
//# sourceMappingURL=StockMovement.js.map