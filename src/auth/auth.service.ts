import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { JwtPayload } from './jwt-payload.interface';
import { UsuarioDto } from '../dtos/usuario.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async criarUsuario(usuario: UsuarioDto) {
        const usuarioExiste = await this.prismaService.usuario.findFirst({
            where: {
                email: usuario.email,
            },
        });

        if (usuarioExiste) {
            throw new BadRequestException('Usuário já registrado.');
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(usuario.senha, salt);

        usuario.senha = senhaHash;

        const createdUser = await this.prismaService.usuario.create({
            data: usuario.toPrismaCreate(),
        });
        return UsuarioDto.fromPrisma(createdUser);
    }

    async efetuarLogin(email: string, senha: string) {
        const usuario = await this.prismaService.usuario.findUnique({
            where: {
                email: email,
            },
        });

        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new BadRequestException('Senha inválida');
        }

        const payload: JwtPayload & { sub: string } = {
            sub: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        } as JwtPayload & { sub: string };

        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
        };
    }
}
