interface Email {
  from: string;
  to: string;
  cc: string[];
  subject: string;
  content: string[];
}

export default Email;
