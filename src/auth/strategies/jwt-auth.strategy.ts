import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { TokenPayloadInterface } from "src/interfaces/tokenPayload.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService : ConfigService,
        private readonly userService : UserService
    ) {

        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('JWT_ACCESS_TOKEN_SECRET')

        })
    }

    async validate(payload : TokenPayloadInterface) {
        return await this.userService.findUserById(payload.userId)
    }

}