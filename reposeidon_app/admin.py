from django.contrib import admin
#사용자 DB값 admin에서 파일로 반환
from import_export.admin import ExportActionModelAdmin, ImportExportMixin, ImportMixin

from .models import *

# Register your models here.
class UserDataAdmin(ImportExportMixin, admin.ModelAdmin):
    pass
admin.site.register(UserData, UserDataAdmin)