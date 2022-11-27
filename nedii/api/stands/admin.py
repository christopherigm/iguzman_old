from django.contrib import admin
from stands.models import (
    Expo,
    Group,
    StandPhones,
    StandRating,
    StandPictures,
    SurveyQuestions,
    VideoLink,
    StandBookingQuestion,
    StandBookingQuestionOptions,
    StandNews,
    StandPictures,
    StandPromotion,
    Stand
)

# Register your models here.

class ExpoAdmin(admin.ModelAdmin):
	list_display = [
		"name",
		"slug",
		"enabled",
		"version"
	]
	search_fields = ("slug", "name")
	list_filter = ("enabled",)
	readonly_fields=(
        "version",
        "href"
	)
admin.site.register(Expo, ExpoAdmin)


class GroupAdmin(admin.ModelAdmin):
	list_display = [
		"name",
		"slug",
		"enabled",
	]
	search_fields = ("slug", "name", "description" )
	list_filter = ("enabled",)
	readonly_fields=(
        "version",
        "href"
	)
admin.site.register(Group, GroupAdmin)


class StandPhonesAdmin(admin.ModelAdmin):
	list_display = [
		"phone",
		"stand"
	]
	search_fields = ("phone", )
	list_filter = ("enabled", "stand", )
	readonly_fields=(
        "version",
	)
admin.site.register(StandPhones, StandPhonesAdmin)


class StandPicturesAdmin(admin.ModelAdmin):
	list_display = [
		"name",
		"stand",
	]
	search_fields = ("name", "description")
	list_filter = ("enabled", "stand", )
	readonly_fields=(
        "version",
	)
admin.site.register(StandPictures, StandPicturesAdmin)


class StandBookingQuestionAdmin(admin.ModelAdmin):
	list_display = [
		"name",
		"open_answer",
	]
	search_fields = ("name", )
	list_filter = ("enabled", )
	readonly_fields=(
        "version",
        "order"
	)
admin.site.register(StandBookingQuestion, StandBookingQuestionAdmin)


class StandBookingQuestionOptionsAdmin(admin.ModelAdmin):
	list_display = [
		"value",
	]
	search_fields = ("value",)
	list_filter = ("enabled",)
	readonly_fields=(
        "version",
        "order"
	)
admin.site.register(StandBookingQuestionOptions, StandBookingQuestionOptionsAdmin)


class StandNewsAdmin(admin.ModelAdmin):
	list_display = [
		"slug",
		"name",
		"stand",
	]
	search_fields = ("slug", "name", "description")
	list_filter = ("enabled", "stand", )
	readonly_fields=(
        "version",
	)
admin.site.register(StandNews, StandNewsAdmin)


class StandPromotionsAdmin(admin.ModelAdmin):
	list_display = [
		"slug",
		"name",
		# "product",
		# "real_estate",
		# "vehicle",
		# "service",
		"stand",
	]
	search_fields = ("slug", "name",)
	list_filter = ("enabled", "stand")
	readonly_fields=(
        "version",
	)
admin.site.register(StandPromotion, StandPromotionsAdmin)


class VideoLinkAdmin(admin.ModelAdmin):
	list_display = [
		"link",
		"name",
		"stand",
	]
	search_fields = ("name",)
	list_filter = ("enabled", "stand", )
	readonly_fields=(
        "version",
	)
admin.site.register(VideoLink, VideoLinkAdmin)


class SurveyQuestionsAdmin(admin.ModelAdmin):
	list_display = [
		"name",
	]
	search_fields = ("name",)
	list_filter = ("enabled", )
	readonly_fields=(
        "version",
	)
admin.site.register(SurveyQuestions, SurveyQuestionsAdmin)


class StandRatingAdmin(admin.ModelAdmin):
	list_display = [
		"author",
		"stand",
		"rating"
	]
	list_filter = ("stand","author")
	readonly_fields=(
        "version",
	)
admin.site.register(StandRating, StandRatingAdmin)


class StandAdmin(admin.ModelAdmin):
	list_display = [
		"slug",
		"name",
        "group",
        "expo"
	]
	search_fields = ("name", )
	list_filter = ("slug", "enabled", "owner", "group", "expo")
	readonly_fields=(
		"version",
	)
admin.site.register(Stand, StandAdmin)

