from django import forms
from .models import UserData

class UserDataForm(forms.ModelForm):
    class Meta:
        model = UserData
        fields = '__all__'
        # labels = {
        #     'writer': '작성자 명 입력',
        #     'title': '제목 입력',
        #     'content': '본문 입력'
        # }