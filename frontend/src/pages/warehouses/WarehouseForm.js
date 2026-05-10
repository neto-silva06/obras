import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import warehouseApi from '../../services/warehouses.api.js';
import workApi from '../../services/works.api.js';
export function WarehouseForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = !!id;
    const queryParams = new URLSearchParams(location.search);
    const initialWorkId = queryParams.get('workId');
    const [warehouse, setWarehouse] = useState({
        name: '',
        workId: initialWorkId || ''
    });
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingWorks, setLoadingWorks] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingWorks(true);
                const worksData = await workApi.getAll();
                setWorks(worksData);
                if (isEdit && id) {
                    const warehouseData = await warehouseApi.getById(id);
                    setWarehouse(warehouseData);
                }
            }
            catch (error) {
                alert('Erro ao carregar dados');
            }
            finally {
                setLoadingWorks(false);
            }
        };
        loadData();
    }, [id, isEdit]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!warehouse.workId) {
            alert('Por favor, selecione uma obra');
            return;
        }
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
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: isEdit ? 'Editar Depósito' : 'Novo Depósito' }), _jsx(Button, { variant: "ghost", onClick: () => navigate('/warehouses'), children: _jsx(X, { size: 18 }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow", children: [_jsx(FormField, { label: "Nome do Dep\u00F3sito", name: "name", value: warehouse.name, onChange: (val) => setWarehouse({ ...warehouse, name: val }), required: true }), _jsx(FormField, { label: "Obra Vinculada", name: "workId", type: "select", options: works.map(w => ({ label: w.name, value: w.id })), value: warehouse.workId, onChange: (val) => setWarehouse({ ...warehouse, workId: val }), required: true }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(Button, { variant: "secondary", type: "button", onClick: () => navigate('/warehouses'), children: "Cancelar" }), _jsxs(Button, { type: "submit", isLoading: isLoading, disabled: loadingWorks, children: [_jsx(Save, { size: 18, className: "mr-2" }), " Salvar"] })] })] })] }));
}
//# sourceMappingURL=WarehouseForm.js.map