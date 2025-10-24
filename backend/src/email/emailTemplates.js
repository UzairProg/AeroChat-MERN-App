export function createWelcomeEmailTemplate(name, clientURL) {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to AeroChat - Preview</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Main Wrapper -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; text-align: center;">
              <h1 style="margin: 0 0 8px; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Welcome to AeroChat</h1>
              <p style="margin: 0; font-size: 16px; color: #ffffff; opacity: 0.95;">Your conversations, elevated</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 50px;">
              <p style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1a1a1a;">Hey ${name} 👋</p>
              
              <p style="margin: 0 0 24px; font-size: 16px; color: #4a5568; line-height: 1.7;">
                We're excited to have you here! AeroChat is designed to make your conversations 
                seamless, secure, and enjoyable. Whether you're chatting with friends or collaborating 
                with your team, we've built something special for you.
              </p>

              <!-- Features Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 40px 0; background-color: #f7fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 32px;">
                    
                    <!-- Feature 1 -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td width="44" style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center; line-height: 44px; font-size: 20px;">⚡</div>
                        </td>
                        <td style="vertical-align: top; padding-top: 2px;">
                          <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #1a1a1a;">Real-time Messaging</p>
                          <p style="margin: 0; font-size: 14px; color: #718096; line-height: 1.5;">Experience instant conversations with lightning-fast delivery</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Feature 2 -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td width="44" style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center; line-height: 44px; font-size: 20px;">🎨</div>
                        </td>
                        <td style="vertical-align: top; padding-top: 2px;">
                          <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #1a1a1a;">Beautiful Design</p>
                          <p style="margin: 0; font-size: 14px; color: #718096; line-height: 1.5;">A clean, modern interface that makes chatting a joy</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Feature 3 -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                      <tr>
                        <td width="44" style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center; line-height: 44px; font-size: 20px;">🔒</div>
                        </td>
                        <td style="vertical-align: top; padding-top: 2px;">
                          <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #1a1a1a;">Secure & Private</p>
                          <p style="margin: 0; font-size: 14px; color: #718096; line-height: 1.5;">Your messages are protected with end-to-end encryption</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Feature 4 -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="44" style="vertical-align: top; padding-right: 16px;">
                          <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center; line-height: 44px; font-size: 20px;">🌐</div>
                        </td>
                        <td style="vertical-align: top; padding-top: 2px;">
                          <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #1a1a1a;">Cross-Platform</p>
                          <p style="margin: 0; font-size: 14px; color: #718096; line-height: 1.5;">Access your chats anywhere, on any device</p>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 40px 0 32px;">
                <tr>
                  <td align="center">
                    <a href=${clientURL} target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 44px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);">Get Started →</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td style="border-top: 1px solid #e2e8f0;"></td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; font-size: 16px; color: #4a5568; line-height: 1.7;">
                Have questions or need help getting started? We're here for you. Just reply to 
                this email and our support team will be happy to assist.
              </p>
              
              <p style="margin: 0; font-size: 16px; color: #1a1a1a; line-height: 1.7;">
                Welcome aboard,<br>
                <strong>The AeroChat Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; text-align: center; background-color: #f7fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px; font-size: 13px; color: #718096;">© 2025 AeroChat. All rights reserved.</p>
              <a href="https://www.linkedin.com/in/uzair-md-4507892ba/" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 40px; height: 40px; background-color: #667eea; color: #ffffff; border-radius: 8px; text-decoration: none; font-size: 18px; line-height: 40px; font-weight: 600;">in</a>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}