from django.urls import path

from . import views


app_name = 'monkey_detect'
urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
]
