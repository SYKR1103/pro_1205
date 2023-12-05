import { BaseEntity } from "src/common/base.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { Role } from "./role.enum";
import * as bcrypt from 'bcryptjs'
import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";



@Entity()


export class User extends BaseEntity {


    @Column()
    public nickname : string

    @Column({default:true})
    public email : string

    @Column()
    public password : string


    @Column({

        type: 'enum',
        enum : Role,
        array : true,
        default : [Role.USER]
    }) public roles: Role[]

    @BeforeInsert()
    async hashedPassword(): Promise<void> {

        try {
        const saltValue = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,saltValue)
        } catch(e) {
            console.log(e)
            throw new InternalServerErrorException()
        }
    }

    async checkPassword(aPassword : string) : Promise<boolean> {

            const isMatched = await bcrypt.compare(aPassword, this.password)
            if (!isMatched) throw new InternalServerErrorException()
            return isMatched
    }


}
