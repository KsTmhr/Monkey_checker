from django.urls import path

from . import views


app_name = 'monkey_detect'
urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('index/', views.IndexView.as_view(), name="index"),
    path('detect/', views.DetectView.as_view(), name="detect"),
]
