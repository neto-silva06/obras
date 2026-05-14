import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import workApi from '../../services/works.api.js';
export function WorkForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [work, setWork] = useState({
        name: '',
        address: '',
        description: '',
        status: 'IN_PROGRESS'
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isEdit && id) {
            const loadWork = async () => {
                try {
                    const data = await workApi.getById(id);
                    setWork(data);
                }
                catch (error) {
                    alert('Erro ao carregar obra');
                }
            };
            loadWork();
        }
    }, [id, isEdit]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEdit && id) {
                await workApi.update(id, work);
            }
            else {
                await workApi.create(work);
            }
            alert(isEdit ? 'Obra atualizada!' : 'Obra criada!');
            navigate('/works');
        }
        catch (error) {
            alert('Erro ao salvar obra');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: isEdit ? 'Editar Obra' : 'Nova Obra' }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate('/dashboard'), title: "Dashboard", children: _jsx(LayoutDashboard, { size: 18 }) }), _jsx(Button, { variant: "ghost", onClick: () => navigate('/works'), children: _jsx(X, { size: 18 }) })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow", children: [_jsx(FormField, { label: "Nome da Obra", name: "name", value: work.name, onChange: (val) => setWork({ ...work, name: val }), required: true }), _jsx(FormField, { label: "Endere\u00E7o", name: "address", value: work.address, onChange: (val) => setWork({ ...work, address: val }), required: true }), _jsx(FormField, { label: "Descri\u00E7\u00E3o", name: "description", type: "textarea", value: work.description, onChange: (val) => setWork({ ...work, description: val }) }), _jsx(FormField, { label: "Status", name: "status", type: "select", options: [
                            { label: 'Em Andamento', value: 'IN_PROGRESS' },
                            { label: 'Concluída', value: 'COMPLETED' },
                            { label: 'Suspensa', value: 'SUSPENDED' },
                        ], value: work.status, onChange: (val) => setWork({ ...work, status: val }) }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(Button, { variant: "secondary", type: "button", onClick: () => navigate('/works'), children: "Cancelar" }), _jsxs(Button, { type: "submit", isLoading: isLoading, children: [_jsx(Save, { size: 18, className: "mr-2" }), " Salvar"] })] })] })] }));
}
//# sourceMappingURL=WorkForm.js.map