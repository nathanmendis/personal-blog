import os
import sys
import re
from pathlib import Path

# Try to import google-auth-oauthlib, give instructions if missing
try:
    from google_auth_oauthlib.flow import InstalledAppFlow
except ImportError:
    print("❌ Error: 'google-auth-oauthlib' is not installed.")
    print("Please run: pip install google-auth-oauthlib")
    sys.exit(1)

# Base Directory
BASE_DIR = Path(__file__).resolve().parent

def read_env_file(env_path):
    """Manually parses the .env file to avoid 'django-environ' dependency."""
    env_vars = {}
    if not os.path.exists(env_path):
        print(f"⚠️ Warning: .env file not found at {env_path}")
        return env_vars
    
    with open(env_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            # Basic parsing: KEY=VALUE or KEY="VALUE"
            match = re.match(r'^([^=]+)=(.*)$', line)
            if match:
                key = match.group(1).strip()
                value = match.group(2).strip()
                # Remove surrounding quotes if present
                if (value.startswith('"') and value.endswith('"')) or \
                   (value.startswith("'") and value.endswith("'")):
                    value = value[1:-1]
                env_vars[key] = value
    return env_vars

def update_env_file(file_path, key, new_value):
    """Updates a specific key in the .env file preserving structure."""
    try:
        lines = []
        with open(file_path, 'r') as f:
            lines = f.readlines()
        
        key_found = False
        new_lines = []
        
        for line in lines:
            # Check for existing key (ignoring comments)
            if re.match(f'^{key}=', line):
                new_lines.append(f"{key}='{new_value}'\n")
                key_found = True
            else:
                new_lines.append(line)
        
        if not key_found:
            # Append if not found
            if new_lines and not new_lines[-1].endswith('\n'):
                 new_lines.append('\n')
            new_lines.append(f"{key}='{new_value}'\n")
            
        with open(file_path, 'w') as f:
            f.writelines(new_lines)
            
        print(f"💾 Updated {key} in .env")
        
    except Exception as e:
        print(f"⚠️ Could not update .env file automatically: {e}")
        print(f"Please manually update {key} with the token below.")

def get_new_refresh_token():
    print("🚀 Starting OAuth Flow...")
    
    env_path = os.path.join(BASE_DIR, '.env')
    env_vars = read_env_file(env_path)
    
    client_id = env_vars.get('GMAIL_CLIENT_ID')
    client_secret = env_vars.get('GMAIL_CLIENT_SECRET')
    
    if not client_id or not client_secret:
        print("❌ Error: GMAIL_CLIENT_ID or GMAIL_CLIENT_SECRET missing in .env")
        return

    # Define Scopes
    SCOPES = ['https://www.googleapis.com/auth/gmail.send']

    # Configuration for the flow
    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost:8080/"]
        }
    }

    print("\nℹ️  If the browser opens and you see 'Redirect URI mismatch' or Error 400:")
    print("   1. Go to Google Cloud Console > APIs & Services > Credentials")
    print("   2. Edit your OAuth 2.0 Client ID")
    print("   3. Add 'http://localhost:8080/' to Authorized Redirect URIs")
    print("   4. Save and try again.\n")

    try:
        flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
        # Using a fixed port 8080 to match the recommendation
        creds = flow.run_local_server(port=8080, prompt='consent')
        
        print("\n✅ Authentication Successful!")
        print(f"New Refresh Token: {creds.refresh_token}")
        
        if creds.refresh_token:
            update_env_file(env_path, 'GMAIL_REFRESH_TOKEN', creds.refresh_token)
        else:
            print("⚠️ No refresh token returned. Revoke access in your Google Account and try again to force consent.")
        
    except Exception as e:
        print(f"\n❌ Authentication failed: {e}")

if __name__ == '__main__':
    get_new_refresh_token()
