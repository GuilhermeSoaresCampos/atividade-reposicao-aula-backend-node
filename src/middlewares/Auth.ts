import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export class Auth {
    static generateToken(id: number, nome: string, email: string) {
        const secret = process.env.JWT_SECRET ?? 'secret';
        return jwt.sign({ id, nome, email }, secret, { expiresIn: '1h' });
    }

    static validacaoUsuario(req: Request, res: Response): Response {
        const { email, senha } = req.body as { email?: string; senha?: string };

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Informe email e senha.' });
        }

        return res.status(200).json({
            auth: true,
            token: this.generateToken(1, 'Usuario', email),
            usuario: { id: 1, nome: 'Usuario', email }
        });
    }

    static verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ mensagem: 'Token nao informado.' });
        }

        const secret = process.env.JWT_SECRET ?? 'secret';

        try {
            jwt.verify(token, secret);
            next();
            return;
        } catch (error) {
            return res.status(401).json({ mensagem: 'Token invalido.' });
        }
    }
}
