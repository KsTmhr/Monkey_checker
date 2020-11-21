from django.views import generic


class IndexView(generic.TemplateView):
    template_name = "index.html"

class DetectView(generic.TemplateView):
    template_name = "detect.html"
