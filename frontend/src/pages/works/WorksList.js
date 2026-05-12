import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, LayoutDashboard } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/common/Button.js';
import workApi from '../../services/works.api.js';
export function WorksList() {
    const navigate = useNavigate();
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchWorks = async () => {
        try {
            setIsLoading(true);
            const data = await workApi.getAll();
            setWorks(data);
        }
        catch (error) {
            alert('Erro ao carregar obras');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchWorks();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
            try {
                await workApi.delete(id);
                await fetchWorks();
                alert('Obra excluída com sucesso');
            }
            catch (error) {
                alert('Erro ao excluir obra');
            }
        }
    };
    const columns = [
        { header: 'Nome', accessor: 'name' },
        { header: 'Endereço', accessor: 'address' },
        { header: 'Status', accessor: 'status' },
        {
            header: 'Ações',
            accessor: (work) => (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate(`/works/${work.id}/edit`), className: "p-1", children: _jsx(Pencil, { size: 16 }) }), _jsx(Button, { variant: "ghost", onClick: () => handleDelete(work.id), className: "p-1 text-red-600 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }))
        },
    ];
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Gest\u00E3o de Obras" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "secondary", onClick: () => navigate('/dashboard'), children: [_jsx(LayoutDashboard, { size: 18, className: "mr-2" }), " Dashboard"] }), _jsxs(Button, { onClick: () => navigate('/works/new'), children: [_jsx(Plus, { size: 18, className: "mr-2" }), " Nova Obra"] })] })] }), _jsx(DataTable, { columns: columns, data: works, isLoading: isLoading, emptyMessage: "Nenhuma obra cadastrada." })] }));
}
//# sourceMappingURL=WorksList.js.map