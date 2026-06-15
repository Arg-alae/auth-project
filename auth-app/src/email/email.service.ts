import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendVerificationEmail(to: string, name: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    console.log('Verification URL:', verificationUrl);

    try {
      const response = await sgMail.send({
        from: process.env.SENDGRID_FROM_EMAIL!,
        to,
        subject: 'Verify your Morazon account',
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
            <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 8px;">Welcome to Morazon, ${name}.</h1>
            <p style="color: #666; font-size: 14px; margin-bottom: 32px;">
              Thank you for creating an account. Please verify your email address to activate your account.
            </p>
            <a href="${verificationUrl}"
               style="display: inline-block; background-color: #8B2635; color: white; padding: 12px 32px; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">
              Verify Email Address
            </a>
            <p style="color: #999; font-size: 12px; margin-top: 32px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        `,
        trackingSettings: {
          clickTracking: {
            enable: false,
            enableText: false,
          },
        },
      });
      console.log('Email sent successfully:', response[0].statusCode);
    } catch (error: any) {
      console.error('SendGrid error:', JSON.stringify(error.response?.body || error.message));
    }
  }

  async sendResetPasswordEmail(to: string, name: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    console.log('Reset URL:', resetUrl);

    try {
      const response = await sgMail.send({
        from: process.env.SENDGRID_FROM_EMAIL!,
        to,
        subject: 'Reset your Morazon password',
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
            <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 8px;">Reset your password, ${name}.</h1>
            <p style="color: #666; font-size: 14px; margin-bottom: 32px;">
              We received a request to reset your password. Click the button below to create a new password.
              This link will expire in <strong>1 hour</strong>.
            </p>
            <a href="${resetUrl}"
               style="display: inline-block; background-color: #8B2635; color: white; padding: 12px 32px; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">
              Reset Password
            </a>
            <p style="color: #999; font-size: 12px; margin-top: 32px;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
          </div>
        `,
        trackingSettings: {
          clickTracking: {
            enable: false,
            enableText: false,
          },
        },
      });
      console.log('Email sent successfully:', response[0].statusCode);
    } catch (error: any) {
      console.error('SendGrid error:', JSON.stringify(error.response?.body || error.message));
    }
  }
}