from django.db import models
from .encryption import encrypt_data, decrypt_data

class EncryptedCharField(models.CharField):
    def get_prep_value(self, value):
        if value is not None:
            return encrypt_data(value)
        return value

    def from_db_value(self, value, expression, connection):
        if value is not None:
            return decrypt_data(value)
        return value

    def to_python(self, value):
        if value is not None and isinstance(value, str):
            try:
                return decrypt_data(value)
            except Exception:
                return value
        return value
