from django.views import generic
from django.http import HttpResponse
from PIL import Image, ImageFilter, ImageFile #テストに使用
import io
import base64

from monkey_detect.detect.detect import detect # manage.pyからの相対パスで指定しないと読まない

from django.conf import settings

base_dir = str(settings.BASE_DIR) # base_dir + 〜　の形でPathを指定する

class IndexView(generic.TemplateView): #トップページ | How to Use
    template_name = "index.html"


class DetectView(generic.TemplateView): # 分析ページ | Detect Monkey
    template_name = "detect.html"


def MonkeyDetect(request): # 分析開始

     img = request.POST['detect_img'] # 写真のURLを受け取って、
     """
     pic = io.StringIO()
     image_string = io.BytesIO(img)
     image = Image.open(image_string)
     image.save(pic, image.format, quality = 100)
     pic.seek(0)
     """
     image_decoded = base64.b64decode(img.split(",")[1])
     image = Image.open(io.BytesIO(image_decoded))
     image.save(base_dir+"/static/js/image.jpg")
     detect()

     return HttpResponse("hello") # 成功したデータを送り返す
