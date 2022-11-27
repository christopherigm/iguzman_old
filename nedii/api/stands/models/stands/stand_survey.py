from django.db import models
from common.models import CommonFields

class SurveyQuestions(CommonFields):
    name = models.CharField(
        verbose_name="Pregunta de encuesta",
        max_length=128,
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Pregunta de encuesta"
        verbose_name_plural = "Preguntas de encuestas"

    class JSONAPIMeta:
        resource_name = "SurveyQuestion"

