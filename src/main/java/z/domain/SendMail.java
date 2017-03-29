package z.domain;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMail {

  public void mailSend() {

    try {
      // 메일 관련 정보
      String host = "smtp.naver.com";
      final String username = "jned0317";
      final String password = "1qaz2wsx";
      int port = 465;

      // 메일 내용
      String recipient = "jned0317@naver.com";
      String subject = "네이버를 사용한 발송 테스트입니다.";
      String body = "내용 무";

      Properties props = System.getProperties();

      props.put("mail.smtp.host", host);
      props.put("mail.smtp.port", port);
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.ssl.enable", "true");
      props.put("mail.smtp.ssl.trust", host);

      Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
        String un = username;
        String pw = password;

        protected PasswordAuthentication getPasswordAuthentication() {
          return new PasswordAuthentication(un, pw);
        }
      });
      
      session.setDebug(true); // for debug
      Message mimeMessage = new MimeMessage(session);
      mimeMessage.setFrom(new InternetAddress("jned0317@naver.com"));
      mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
      mimeMessage.setSubject("Yes OK");
      mimeMessage.setText("test Message Text");
      Transport.send(mimeMessage);
    } catch (Exception e) {
      return;
    }
  }

}
