#django-rest-framework의 JSON 직렬화를 위한 파일
from dataclasses import field
from rest_framework import serializers
from .models import UserData, File

from rest_framework.serializers import Serializer, FileField

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'writer',
            'created',
            'title',
            'content',
        )
        # fields = '__all__'
        model = UserData

# class FileSerializer(serializers.Serializer):
#     file = serializers.FileField(max_length=None, allow_empty_file=True, use_url=False)
#     # 업로드할 특정 디렉토리 위치를 지정할 경우 upload_to= 경로를 수정
#     # file = serializers.FileField(upload_to='your directory name/') 

class FileSerializer(serializers.ModelSerializer):
    class Meta():
        model = File
        fields =  "__all__"

    def save(self, *args, **kwargs):
        if self.instance:
            self.instance.delete()
        return super().save(*args, **kwargs)


# class UploadSerializer(Serializer):
#     file_uploaded = FileField()
#     class Meta:
#         fields = ['file_uploaded']


class uploadFileData(serializers.ModelSerializer):
     class Meta:
        fields = (
            'content'
        )
        