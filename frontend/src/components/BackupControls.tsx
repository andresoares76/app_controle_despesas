
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudOff, Download, Upload } from 'lucide-react';
import { Expense } from '@/types/expense';
import { toast } from 'sonner';

interface BackupControlsProps {
  expenses: Expense[];
}

const BackupControls = ({ expenses }: BackupControlsProps) => {
  const handleBackup = () => {
    try {
      // Create backup data
      const backupData = {
        expenses,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      };
      
      // Convert to JSON string
      const jsonString = JSON.stringify(backupData, null, 2);
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `despesas_backup_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Backup criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      toast.error('Erro ao criar backup. Tente novamente.');
    }
  };
  
  const handleRestore = () => {
    toast.info('Funcionalidade de restauração será implementada em breve!');
  };
  
  const handleCloudBackup = () => {
    toast.info('Funcionalidade de backup na nuvem será implementada em breve!');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup e Restauração</CardTitle>
        <CardDescription>
          Faça backup dos seus dados ou restaure a partir de um arquivo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Backup Local</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Baixe um arquivo JSON com todas as suas despesas
              </p>
              <Button 
                onClick={handleBackup} 
                variant="outline" 
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Fazer Backup
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Restaurar Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Restaure seus dados a partir de um arquivo de backup
              </p>
              <Button 
                onClick={handleRestore} 
                variant="outline" 
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Restaurar Backup
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-expense-purple/5 dark:bg-expense-purple/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Backup na Nuvem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Faça login para ativar o backup automático na nuvem e sincronize seus dados em todos os dispositivos
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <Button 
                onClick={handleCloudBackup} 
                className="w-full bg-expense-purple hover:bg-expense-purple/90"
              >
                <Cloud className="mr-2 h-4 w-4" />
                Ativar Backup na Nuvem
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                disabled
              >
                <CloudOff className="mr-2 h-4 w-4" />
                Desativar Backup na Nuvem
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default BackupControls;
