from django.db import models
from markdownx.models import MarkdownxField
from django.contrib.auth.models import User

# Create your models here.
class UserData(models.Model):
    #사용자 정보 기록
    writer = models.CharField(max_length=100,help_text="작성자 입력") #작성자 입력 → 추후에 로그인 기능 도입 시 User와 연결
    created = models.DateTimeField(auto_now_add=True) #작성 시간 → 저장버튼을 누를 시점을 기록

    #검색 정보 기록
    title = MarkdownxField(help_text="제목 입력") #제목
    content = MarkdownxField(help_text="검색할 내용 입력") #검색할 주 내용

    def __str__(self):
        """모델을 대표하는 str → writer(작성자)로 지정"""
        return self.writer

class File(models.Model):
    file = models.FileField(blank=True, null=False)
    # remark = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)