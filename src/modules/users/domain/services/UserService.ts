import { ProfessorRestrictedException } from '../exceptions';
import User from '../entities/User';

export const isStudent = (user: User) => user.role.code === 'STUDENT';
export const isProfessor = (user: User) => user.role.code === 'PROFESSOR';

const UserService = (user: User) => ({
  isStudent: user.role.code === 'STUDENT',
  isProfessor: user.role.code === 'PROFESSOR',
  checkProfessor() {
    if (isStudent(user)) {
      throw new ProfessorRestrictedException();
    }
  },
});

export default UserService;

export const checkProfessor = (user: User) => {
  if (isStudent(user)) {
    throw new ProfessorRestrictedException();
  }
};
