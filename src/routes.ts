import { Router } from 'express';
import AlunoController from './controller/AlunoController.js';
import EmprestimoController from './controller/EmprestimoController.js';
import EquipamentoController from './controller/EquipamentoController.js';

const router = Router();

router.get('/api/aluno', AlunoController.todos);
router.post('/api/alunos', AlunoController.cadastrar);
router.post('/api/aluno', AlunoController.cadastrar);
router.put('/api/alunos/:id', AlunoController.atualizar);
router.put('/api/aluno/:id', AlunoController.atualizar);
router.delete('/api/alunos/:id', AlunoController.remover);
router.delete('/api/aluno/:id', AlunoController.remover);

router.get('/api/equipamento', EquipamentoController.todos);
router.post('/api/equipamentos', EquipamentoController.cadastrar);
router.post('/api/equipamento', EquipamentoController.cadastrar);
router.put('/api/equipamentos/:id', EquipamentoController.atualizar);
router.put('/api/equipamento/:id', EquipamentoController.atualizar);
router.delete('/api/equipamentos/:id', EquipamentoController.remover);
router.delete('/api/equipamento/:id', EquipamentoController.remover);

router.get('/api/emprestimo', EmprestimoController.todos);
router.post('/api/emprestimo', EmprestimoController.cadastrar);
router.put('/api/emprestimos/:id/devolucao', EmprestimoController.devolver);
router.put('/api/emprestimo/:id/devolucao', EmprestimoController.devolver);
router.delete('/api/emprestimos/:id', EmprestimoController.remover);
router.delete('/api/emprestimo/:id', EmprestimoController.remover);

export { router };

