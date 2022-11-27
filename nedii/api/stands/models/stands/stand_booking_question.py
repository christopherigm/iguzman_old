from django.db import models
from common.models import CommonFields

class StandBookingQuestion(CommonFields):
    name = models.CharField(
        verbose_name="Pregunta de reservación",
        max_length=128,
        null=False,
        blank=False
    )
    open_answer = models.BooleanField(
        verbose_name="Es pregunta abierta",
        blank=False,
        default=True
    )
    options = models.ManyToManyField(
        "stands.StandBookingQuestionOptions",
        related_name="question_options",
        verbose_name="Respuestas",
        blank=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Pregunta de reservación"
        verbose_name_plural = "Preguntas de reservaciones"

    class JSONAPIMeta:
        resource_name = "StandBookingQuestion"


class StandBookingQuestionOptions(CommonFields):
    value = models.CharField(
        verbose_name="Opcion a pregunta de reservacion",
        max_length=128,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = "Respuesta de pregunta de reservación"
        verbose_name_plural = "Respuestas de preguntas de reservaciones"

    class JSONAPIMeta:
        resource_name = "StandBookingQuestionOption"
