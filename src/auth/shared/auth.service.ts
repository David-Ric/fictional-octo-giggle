/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/shared/users.service/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
      ) { }

    async validateUser(userEmail: string, userPassword: string){
        const user = await this.usersService.getByEmail(userEmail);
        if(user && user.password === userPassword){
            const {_id, name, email, nivel} = user;
            return { id: _id, name, email, nivel}
        }
        return null;
    }
    async login(user: any) {
        const payload = {name:user.name, email: user.email, nivel: user.nivel, sub: user.id };
        return {name: user.name, email: user.email, nivel: user.nivel,
          access_token: this.jwtService.sign(payload),
        };
      }
}
