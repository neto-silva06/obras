import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/common/Button.js';
import materialApi from '../../services/materials.api.js';
export function MaterialsList() {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchMaterials = async () => {
        try {
            setIsLoading(true);
            const data = await materialApi.getAll();
            setMaterials(data);
        }
        catch (error) {
            alert('Erro ao carregar materiais');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchMaterials();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este material?')) {
            try {
                await materialApi.delete(id);
                await fetchMaterials();
                alert('Material excluído com sucesso');
            }
            catch (error) {
                alert('Erro ao excluir material');
            }
        }
    };
    const columns = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Unidade', accessor: 'unit' },
        { header: 'Descrição', accessor: 'description' },
        {
            header: 'Ações',
            accessor: (material) => (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate(`/materials/${material.id}/stock`), className: "p-1 text-blue-600 hover:text-blue-700", title: "Ver Distribui\u00E7\u00E3o", children: _jsx(Package, { size: 16 }) }), _jsx(Button, { variant: "ghost", onClick: () => navigate(`/materials/${material.id}/edit`), className: "p-1", children: _jsx(Pencil, { size: 16 }) }), _jsx(Button, { variant: "ghost", onClick: () => handleDelete(material.id), className: "p-1 text-red-600 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }))
        },
    ];
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Cat\u00E1logo de Materiais" }), _jsxs(Button, { onClick: () => navigate('/materials/new'), children: [_jsx(Plus, { size: 18, className: "mr-2" }), " Novo Material"] })] }), _jsx(DataTable, { columns: columns, data: materials, isLoading: isLoading, emptyMessage: "Nenhum material cadastrado." })] }));
}
//# sourceMappingURL=MaterialsList.js.map