import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'uma-secret-boa',
        });
    }

    async validate(payload: { sub: string; nome: string; email: string }) {
        return {
            id: payload.sub,
            nome: payload.nome,
            email: payload.email,
        } as JwtPayload;
    }
}
