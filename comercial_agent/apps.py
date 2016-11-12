from django.apps import AppConfig


class ComercialAgentConfig(AppConfig):
    name = 'comercial_agent'

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        from . import signals
