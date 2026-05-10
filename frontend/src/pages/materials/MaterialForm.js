import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import materialApi from '../../services/materials.api.js';
export function MaterialForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [material, setMaterial] = useState({
        name: '',
        unit: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isEdit && id) {
            const loadMaterial = async () => {
                try {
                    const data = await materialApi.getById(id);
                    setMaterial(data);
                }
                catch (error) {
                    alert('Erro ao carregar material');
                }
            };
            loadMaterial();
        }
    }, [id, isEdit]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEdit && id) {
                await materialApi.update(id, material);
            }
            else {
                await materialApi.create(material);
            }
            alert(isEdit ? 'Material atualizado!' : 'Material criado!');
            navigate('/materials');
        }
        catch (error) {
            alert('Erro ao salvar material');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: isEdit ? 'Editar Material' : 'Novo Material' }), _jsx(Button, { variant: "ghost", onClick: () => navigate('/materials'), children: _jsx(X, { size: 18 }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow", children: [_jsx(FormField, { label: "Nome do Material", name: "name", value: material.name, onChange: (val) => setMaterial({ ...material, name: val }), required: true }), _jsx(FormField, { label: "Unidade de Medida (ex: UN, KG, M)", name: "unit", value: material.unit, onChange: (val) => setMaterial({ ...material, unit: val }), required: true }), _jsx(FormField, { label: "Descri\u00E7\u00E3o", name: "description", type: "textarea", value: material.description, onChange: (val) => setMaterial({ ...material, description: val }) }), _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx(Button, { variant: "secondary", type: "button", onClick: () => navigate('/materials'), children: "Cancelar" }), _jsxs(Button, { type: "submit", isLoading: isLoading, children: [_jsx(Save, { size: 18, className: "mr-2" }), " Salvar"] })] })] })] }));
}
//# sourceMappingURL=MaterialForm.js.map