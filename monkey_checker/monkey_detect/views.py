from django.views import generic
from django.http import HttpResponse

from monkey_detect.detect.detect import detect # manage.pyからの相対パスで指定しないと読まない


class IndexView(generic.TemplateView): #トップページ | How to Use
    template_name = "index.html"


class DetectView(generic.TemplateView): # 分析ページ | Detect Monkey
    template_name = "detect.html"


def MonkeyDetect(request): # 分析開始

     img = request.POST['detect_img'] # 写真のURLを受け取って、
     detect("monkey.JPG") # detect.pyで分析してもらう

     return HttpResponse("hello") # 成功したデータを送り返す
