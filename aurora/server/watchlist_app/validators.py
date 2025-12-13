from django.core.exceptions import ValidationError
import re

def validate_name(name):
    error_message = "Please input a 'Titled' name."
    regex = r'^[A-Z][a-z]*$'
    good_name = re.match(regex, name)
    if good_name:
        return name
    else:
        raise ValidationError(error_message, params={ 'name' : name })