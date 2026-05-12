import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Save, X, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import warehouseApi from '../../services/warehouses.api.js';
import workApi from '../../services/works.api.js';
export function WarehouseForm() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const workIdFromQuery = searchParams.get('workId');
    const navigate = useNavigate();
    const isEdit = !!id;
    const [warehouse, setWarehouse] = useState({
        name: '',
        workId: workIdFromQuery || ''
    });
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const loadWorks = async () => {
            try {
                const data = await workApi.getAll();
                setWorks(data);
            }
            catch (error) {
                alert('Erro ao carregar obras');
            }
        };
        loadWorks();
        if (isEdit && id) {
            const loadWarehouse = async () => {
                try {
                    const data = await warehouseApi.getById(id);
                    setWarehouse(data);
                }
                catch (error) {
                    alert('Erro ao carregar depósito');
                }
            };
            loadWarehouse();
        }
    }, [id, isEdit]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEdit && id) {
                await warehouseApi.update(id, warehouse);
            }
            else {
                await warehouseApi.create(warehouse);
            }
            alert(isEdit ? 'Depósito atualizado!' : 'Depósito criado!');
            navigate('/warehouses');
        }
        catch (error) {
            alert('Erro ao salvar depósito');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: isEdit ? 'Editar Depósito' : 'Novo Depósito' }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate('/dashboard'), title: "Dashboard", children: _jsx(LayoutDashboard, { size: 18 }) }), _jsx(Button, { variant: "ghost", onClick: () => navigate('/warehouses'), children: _jsx(X, { size: 18 }) })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow space-y-4", children: [_jsx(FormField, { label: "Nome do Dep\u00F3sito", name: "name", value: warehouse.name, onChange: (val) => setWarehouse({ ...warehouse, name: val }), required: true }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Obra Associada" }), _jsxs("select", { className: "w-full p-2 border rounded-md", value: warehouse.workId, onChange: (e) => setWarehouse({ ...warehouse, workId: e.target.value }), required: true, disabled: !!workIdFromQuery && !isEdit, children: [_jsx("option", { value: "", children: "Selecione a obra" }), works.map(w => _jsx("option", { value: w.id, children: w.name }, w.id))] })] }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(Button, { variant: "secondary", type: "button", onClick: () => navigate('/warehouses'), children: "Cancelar" }), _jsxs(Button, { type: "submit", isLoading: isLoading, children: [_jsx(Save, { size: 18, className: "mr-2" }), " Salvar"] })] })] })] }));
}
//# sourceMappingURL=WarehouseForm.js.map