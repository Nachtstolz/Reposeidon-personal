from django.urls import path, include
from .views import *
from . import views
from django.conf.urls import url
from markdownx import urls as markdownx
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

from rest_framework import routers


app_name='reposeidon_app'


# # file 라우터 설정
# router = routers.DefaultRouter()
# router.register(r'file', views.FileUploadViewSet, basename='file')

# router = routers.DefaultRouter()
# router.register(r'file', views.UploadViewSet, basename="upload")


urlpatterns = [

    path("", views.front, name="front"),
    # path('showOutput/', views.showOutput, name='showOutput'),

    #rest-framework 테스트
    path("data/", views.listUserData, name="note"),
    path("data/<int:pk>/", views.userDataDetail, name="detail"),
    # path('upload/', include(router.urls)),

    url(r'^upload/$', FileView.as_view(), name='file-upload'),


    # 정적파일처리
    # url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    # url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
]



# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)