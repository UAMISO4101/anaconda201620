from django.apps import AppConfig


class ComercialAgentConfig(AppConfig):
    name = 'comercial_agent'

    def ready(self):
        from . import signals