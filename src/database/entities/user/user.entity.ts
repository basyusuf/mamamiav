import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserStatus } from '../../../enum/UserStatus.enum';
import config from '../../../config';
const SECRET_KEY = config.SECRET_KEY;

export interface UserTokenPayload {
    id: number;
    email: string;
}
@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    username: string;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column({ unique: true, length: 60 })
    email: string;

    @Column({
        nullable: true,
    })
    lastActionToken: string;

    @Column({ default: UserStatus.ACTIVATION_WAITING })
    status: UserStatus;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    public updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        try {
            console.info('Password hash started');
            let hashedPass = await bcrypt.hash(this.password, 10);
            console.info('Hashed pass:', hashedPass);
            this.password = hashedPass;
        } catch (err) {
            console.info('Hash error:', err);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        console.info('Compare password started!');
        try {
            let user_hashed_pass = this.password;
            let result = await bcrypt.compare(attempt, user_hashed_pass);
            return result;
        } catch (err) {
            console.info('Compare error:', err);
            return false;
        }
    }

    generateToken() {
        const payload: UserTokenPayload = {
            id: this.id,
            email: this.email,
        };
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '12h',
        });
        this.lastActionToken = token;
        return token;
    }
}
