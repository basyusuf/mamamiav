import { EntityRepository, Repository } from 'typeorm';
import { Database } from '../../Database';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}

export const getUserRepository = async (): Promise<UserRepository> => {
    let connection = await Database.getInstance();
    let repositoryClone = connection.getCustomRepository(UserRepository);
    return repositoryClone;
};
