import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Users, Search, LayoutDashboard, DollarSign } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/ui/Button.js';
import employeeApi from '../../services/employees.api.js';
import type { Employee } from '../../services/employees.service.js';
import { useAuth } from '../../hooks/useAuth.js';
import toast from 'react-hot-toast';

export function EmployeeList() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (error) {
      toast.error('Erro ao carregar funcionários');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        await employeeApi.delete(id);
        setEmployees(employees.filter(e => e.id !== id));
        toast.success('Funcionário excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir funcionário');
      }
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Funcionário',
      accessor: (employee: Employee) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
            <Users size={16} />
          </div>
          <span className="font-semibold text-secondary-900">{employee.name}</span>
        </div>
      )
    },
    { header: 'Cargo', accessor: 'jobTitle' as keyof Employee },
    {
      header: 'Valor Diária',
      accessor: (employee: Employee) => (
        <div className="flex items-center text-secondary-600">
          <DollarSign size={14} className="mr-1 text-green-600" />
          {employee.dailyRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      )
    },
    {
      header: 'Ações',
      accessor: (employee: Employee) => (
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <Button
                variant="outline"
                onClick={() => navigate(`/employees/${employee.id}/edit`)}
                className="p-2 h-auto border-secondary-200"
                title="Editar"
              >
                <Pencil size={14} />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(employee.id)}
                className="p-2 h-auto text-red-600 hover:bg-red-50 hover:text-red-700 border-secondary-200"
                title="Excluir"
              >
                <Trash2 size={14} />
              </Button>
            </>
          )}
          {!isAdmin && <span className="text-xs text-secondary-400 italic">Somente Leitura</span>}
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gestão de Funcionários</h1>
          <p className="text-secondary-500 text-sm">Gerencie os trabalhadores das obras e seus custos diários.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard size={18} className="mr-2" /> Dashboard
          </Button>
          {isAdmin && (
            <Button onClick={() => navigate('/employees/new')}>
              <Plus size={18} className="mr-2" /> Novo Funcionário
            </Button>
          )}
        </div>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-secondary-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
          placeholder="Buscar funcionários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        isLoading={isLoading}
        emptyMessage="Nenhum funcionário encontrado."
      />
    </div>
  );
}
