import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Pencil, Trash2, ArrowLeft, Package } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/common/Button.js';
import warehouseApi from '../../services/warehouses.api.js';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
export function WarehousesList() {
    const { workId } = useParams();
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchWarehouses = async () => {
        try {
            setIsLoading(true);
            const data = workId
                ? await warehouseApi.getByWorkId(workId)
                : await warehouseApi.getAll();
            setWarehouses(data);
        }
        catch (error) {
            alert('Erro ao carregar depósitos');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchWarehouses();
    }, [workId]);
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este depósito?')) {
            try {
                await warehouseApi.delete(id);
                await fetchWarehouses();
                alert('Depósito excluído com sucesso');
            }
            catch (error) {
                alert('Erro ao excluir depósito');
            }
        }
    };
    const columns = [
        { header: 'Nome', accessor: 'name' },
        {
            header: 'Ações',
            accessor: (warehouse) => (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate(`/warehouses/${warehouse.id}/stock`), className: "p-1 text-blue-600 hover:text-blue-700", title: "Ver Estoque", children: _jsx(Package, { size: 16 }) }), _jsx(Button, { variant: "ghost", onClick: () => navigate(`/warehouses/${warehouse.id}/edit`), className: "p-1", children: _jsx(Pencil, { size: 16 }) }), _jsx(Button, { variant: "ghost", onClick: () => handleDelete(warehouse.id), className: "p-1 text-red-600 hover:text-red-700", children: _jsx(Trash2, { size: 16 }) })] }))
        },
    ];
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [workId && (_jsxs(Button, { variant: "ghost", onClick: () => navigate('/warehouses'), children: [_jsx(ArrowLeft, { size: 18, className: "mr-2" }), " Voltar"] })), _jsx("h1", { className: "text-2xl font-bold text-gray-800", children: workId ? 'Depósitos da Obra' : 'Gestão de Depósitos' })] }), _jsxs(Button, { onClick: () => navigate(workId ? `/warehouses/new?workId=${workId}` : '/warehouses/new'), children: [_jsx(Plus, { size: 18, className: "mr-2" }), " Novo Dep\u00F3sito"] })] }), _jsx(DataTable, { columns: columns, data: warehouses, isLoading: isLoading, emptyMessage: "Nenhum dep\u00F3sito encontrado." })] }));
}
//# sourceMappingURL=WarehousesList.js.map