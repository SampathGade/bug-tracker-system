package com.example.bugtrackersystem.services.EmailSender;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmailSenderImplTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailSenderImpl emailSender;

    @Test
    public void testSendOtpEmail() {
        // Arrange
        String to = "test@example.com";
        String otp = "123456";

        doNothing().when(mailSender).send(any(SimpleMailMessage.class));

        // Act
        emailSender.sendOtpEmail(to, otp);

        // Assert
        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(messageCaptor.capture());

        SimpleMailMessage capturedMessage = messageCaptor.getValue();
        assertEquals("drakedraganeel@gmail.com", capturedMessage.getFrom());
        assertEquals(to, capturedMessage.getTo()[0]);
        assertEquals("Otp for bug tracker", capturedMessage.getSubject());
        assertEquals("Here is your OTP for login/Sign up :" + otp, capturedMessage.getText());

        // Verify that System.out.println was called
        // This part is tricky to verify directly. Usually, you'd avoid testing standard output.
        // However, you could capture it using a custom PrintStream if needed.
    }
}
