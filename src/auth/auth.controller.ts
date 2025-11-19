import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiExtraModels,
    ApiOperation,
    ApiProperty,
    ApiResponse,
    ApiTags,
    OmitType,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsuarioDto } from 'src/dtos/usuario.dto';

class LoginForm {
    @ApiProperty({ name: 'email', type: 'string' })
    email: string;
    @ApiProperty({ name: 'senha', type: 'string' })
    senha: string;
}

class RegisterDTO extends OmitType(UsuarioDto, ['id']) {}

@Controller('auth')
@ApiTags('auth')
@ApiExtraModels(OmitType)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Realiza Login' })
    @ApiBody({ type: LoginForm })
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso' })
    @ApiResponse({
        status: 400,
        description: 'Registro Academico ou Senha inválidos',
    })
    async login(@Body() { email, senha }: LoginForm) {
        return this.authService.efetuarLogin(email, senha);
    }

    @Post('register')
    @ApiOperation({ summary: 'Criar Usuário' })
    @ApiBody({ type: RegisterDTO })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso!' })
    @HttpCode(201)
    async criarUsuario(@Body() usuario: UsuarioDto): Promise<UsuarioDto> {
        return this.authService.criarUsuario(usuario);
    }
}
