import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Prisma, Usuario } from '@prisma/client';
import { BaseDto } from '../dtos/base.dto';

export class UsuarioDto extends BaseDto {
    @IsString()
    @ApiProperty({
        name: 'nome',
        description: 'Nome do usuário',
        example: 'Joãozinho Silva',
        type: 'string',
    })
    nome: string;

    @IsString()
    @ApiProperty({
        name: 'email',
        description: 'Email do usuário',
        example: 'jaosilva@email.com',
        type: 'string',
    })
    email: string;

    @IsString()
    @ApiProperty({
        name: 'senha',
        description: 'senha do usuário',
        example: '123456',
        type: 'string',
        minLength: 6,
        maxLength: 12,
    })
    senha: string;

    @IsNumberString()
    @ApiProperty({
        name: 'telefone',
        description: 'Telefone do Usuário',
        example: '11996699669',
        type: 'string',
        minLength: 11,
        maxLength: 11,
    })
    telefone: string;

    constructor(partial: Partial<UsuarioDto>) {
        super();
        Object.assign(this, partial);
    }

    public static fromPrisma(prismaObj: Usuario) {
        return new UsuarioDto({
            id: prismaObj.id,
            nome: prismaObj.nome,
            email: prismaObj.email,
            telefone: prismaObj.telefone,
        });
    }

    public toPrismaCreate(): Prisma.UsuarioCreateInput {
        return {
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            telefone: this.telefone,
        };
    }

    public toPrismaUpdate(): Prisma.UsuarioUpdateInput {
        return {
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            telefone: this.telefone,
        };
    }
}
