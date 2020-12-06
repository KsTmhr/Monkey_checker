from django.urls import path

from . import views


app_name = 'monkey_detect'
urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('index/', views.IndexView.as_view(), name="index"), # トップページ | How to Use
    path('detect/', views.DetectView.as_view(), name="detect"), # 分析ページ | Detect Monkey
    path('start_detect/', views.MonkeyDetect, name="start_detect") # 分析開始
]
