import Email from '../../application/email/Email';
import IEmailService from '../../application/email/IEmalService';

class EmailService implements IEmailService {
  sendEmail(email: Email) {
    return Promise.resolve({});
  }
}

export default EmailService;
