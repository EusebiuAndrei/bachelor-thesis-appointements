import Email from './Email';

interface IEmailService {
  sendEmail(email: Email): Promise<any>;
}

export default IEmailService;
