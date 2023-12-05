import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable} from '@nestjs/common'
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService : AuthService
    ) {
        super({
            usernameField : 'email',
        })
    }

    async validate(email:string, password:string) : Promise<User> {
        return this.authService.loginU({email,password})
    }
}