import Email from '../../application/email/Email';
import IEmailService from '../../application/email/IEmalService';

class EmailService implements IEmailService {
  async sendEmail(email: Email) {
    console.group('MAIL');
    console.log('TO: ', email.to);
    console.log('SUBJECT: ', email.subject);
    console.log('CONTENT: ', email.content);
    console.groupEnd();
  }
}

export default EmailService;
