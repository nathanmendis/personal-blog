from .forms import ContactForm
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from .gmail_oauth import send_email_oauth2
from .models import ContactMessage

class ContactFormView(APIView):
    def post(self, request):
        form = ContactForm(request.data)
        if form.is_valid():
            data = form.cleaned_data
            ContactMessage.objects.create(
                name=data['name'],
                email=data['email'],
                message=data['message']
            )        
            try:
                
                send_email_oauth2(
                    client_id=settings.GMAIL_CLIENT_ID,
                    client_secret=settings.GMAIL_CLIENT_SECRET,
                    refresh_token=settings.GMAIL_REFRESH_TOKEN,
                    sender_email=settings.GMAIL_SENDER_EMAIL,
                    to_email=settings.GMAIL_RECEIVER_EMAIL, 
                    subject=f"{data['name']} Has Dropped a message on your blog",
                    body=f"""
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0e0f1c; font-family: 'Orbitron', sans-serif; color: #00e6e6; padding: 20px;">
                      <tr>
                        <td align="center">
                          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #16182b; border: 2px solid #ff0055; border-radius: 12px; box-shadow: 0 0 20px rgba(255, 0, 85, 0.4); padding: 30px;">
                            <tr>
                              <td>
                                <h2 style="color: #ff3399; text-align: center;">🚀 New Contact Message</h2>
                                <p><strong style="color: #ff3399;">Name:</strong> {data['name']}</p>
                                <p><strong style="color: #ff3399;">Email:</strong> {data['email']}</p>
                                <p><strong style="color: #ff3399;">Message:</strong></p>
                                <div style="background-color: #0e0f1c; border-left: 4px solid #ff0055; padding: 12px; margin-top: 10px; line-height: 1.5;">
                                  {data['message'].replace('\n', '<br>')}
                                </div>
                                <div style="text-align: center; margin-top: 30px;">
                                  <a href="mailto:{data['email']}" style="
                                    background: linear-gradient(45deg, #ff0055, #ff3399);
                                    color: #ffffff;
                                    padding: 12px 24px;
                                    border-radius: 10px;
                                    text-decoration: none;
                                    font-weight: bold;
                                    box-shadow: 0 0 12px #ff0055;
                                    display: inline-block;
                                  ">Reply to {data['name']}</a>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    """,
                    html=True
                )

                
                if data.get('sendToSelf'):
                    send_email_oauth2(
                        client_id=settings.GMAIL_CLIENT_ID,
                        client_secret=settings.GMAIL_CLIENT_SECRET,
                        refresh_token=settings.GMAIL_REFRESH_TOKEN,
                        sender_email=settings.GMAIL_SENDER_EMAIL,
                        to_email=data['email'], 
                        subject="Copy of your message submitted to Nathan's Personal-Blog",
                        body=f"""
                         <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; color: #333; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 12px rgba(0,0,0,0.05); padding: 30px;">
        <h2 style="color: #2c3e50;">👋 Hello {data['name']},</h2>
        <p style="font-size: 16px;">Thank you for reaching out! Here’s a copy of your message submitted to <strong>Nathan Mendis's Portfolio</strong>:</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

        <p><strong>Name:</strong> {data['name']}</p>
        <p><strong>Email:</strong> {data['email']}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f1f3f5; padding: 15px; border-left: 4px solid #3498db; margin-top: 10px; font-size: 15px;">
          {data['message'].replace('\n', '<br>')}
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <h3 style="color: #2c3e50;">📬 Contact Info</h3>
       <div style="margin-top: 20px;">
  

  <a href="mailto:nathanmendis17@gmail.com" style="
    display: inline-block;
    margin: 5px 5px 10px 0;
    padding: 10px 18px;
    background-color: #2ecc71;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
  "> Send Email</a>

  <a href="https://github.com/nathanmendis" target="_blank" style="
    display: inline-block;
    margin: 5px 5px 10px 0;
    padding: 10px 18px;
    background-color: #333333;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
  ">GitHub</a>

  <a href="https://www.linkedin.com/in/nathan-mendis-a2318122a/" target="_blank" style="
    display: inline-block;
    margin: 5px 5px 10px 0;
    padding: 10px 18px;
    background-color: #0077b5;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
  "> LinkedIn</a>
</div>

        <p style="margin-top: 30px; font-size: 15px;">Feel free to get in touch anytime. I’ll get back to you soon.</p>
        <p style="margin-top: 10px;">Best regards,<br><strong>Nathan Mendis</strong></p>
        <a href="tel:+919607402686" >
        <p style="margin-top: 5px;">
  <a href="tel:+919607402686" style="color: #3498db; text-decoration: none;">+91 9607402686</a>
        </p>
      </div>

                        """,
                        html=True
                    )
            except Exception as e:
                return Response({'status': 'error', 'errors': f"Email sending failed: {str(e)}"}, status=500)

            return Response({'status': 'sent'})

        return Response({'status': 'error', 'errors': form.errors}, status=400)
