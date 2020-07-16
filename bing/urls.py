from django.urls import path, include

import bing.views

urlpatterns = [
    path('', bing.views.index),
    path('detail/<str:end_date>', bing.views.detail),
    path('preview', bing.views.preview),
    # path('^download/', bing.views.download),
]
