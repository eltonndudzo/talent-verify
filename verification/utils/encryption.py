from cryptography.fernet import Fernet
from django.conf import settings

# Use your generated key securely
ENCRYPTION_KEY = b'PDnpIVgLS4yXCnn8iEXAmwGILWmbCaX2nHjA9MnzCaE='  # replace with yours if needed
fernet = Fernet(ENCRYPTION_KEY)

def encrypt_data(data):
    if data is None:
        return None
    return fernet.encrypt(data.encode()).decode()

def decrypt_data(data):
    if data is None:
        return None
    return fernet.decrypt(data.encode()).decode()
