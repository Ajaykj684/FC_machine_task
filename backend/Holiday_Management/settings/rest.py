


REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}



SPECTACULAR_SETTINGS = {
    'TITLE': 'Holiday Management',
    'DESCRIPTION': 'Holidays API',
    'SERVE_AUTHENTICATION': None,
    'COMPONENT_SPLIT_REQUEST': True
}