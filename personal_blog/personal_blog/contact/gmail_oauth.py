# gmail_oauth.py
import base64
import json
from email.mime.text import MIMEText
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import requests

def send_email_oauth2(client_id, client_secret, refresh_token, sender_email, to_email, subject, body, html=False):
    
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token"
    }
    token_response = requests.post(token_url, data=data)
    token_response.raise_for_status()
    access_token = token_response.json()["access_token"]

    
    if html:
        message = MIMEText(body, "html")
    else:
        message = MIMEText(body, "plain")
        
    if isinstance(to_email, list):
        to_header = ", ".join(to_email)
    else:
        to_header = to_email

    message["to"] = to_header
    message["from"] = sender_email
    message["subject"] = subject

    
    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    
    send_url = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send"
    headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}
    send_data = {"raw": encoded_message}
    response = requests.post(send_url, headers=headers, data=json.dumps(send_data))
    response.raise_for_status()
