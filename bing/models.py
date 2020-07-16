from django.conf import settings
from django.db import models


# Create your models here.

class Image(models.Model):
    # ID
    id = models.AutoField(primary_key=True)
    # 创建时间
    create_time = models.DateTimeField()
    # 日期
    end_date = models.TextField(default='')
    format_date = models.DateField(default='')
    # base url
    url_base = models.TextField(default='')
    # 版权
    copy_right = models.TextField(default='')
    # 标题
    title = models.TextField(default='')
    # 文件CDN名称
    cdn_file_name = models.TextField(default='')
    # 清晰度大小
    clear_type = models.TextField(default='')
    # 小图清晰度大小
    small_type = models.TextField(default='')
    # 文件后缀名
    file_ext = models.TextField(default='')
    # 点击次数
    click_count = models.IntegerField(default=0)

    def __str__(self):
        return str(self.format_date) + '-' + str(self.title)

    # 1. '' 使用数据库url，不使用cdn url
    # 2. 'now' or '-' 全部使用cdn url
    # 3. '2020-01-01' 指定日期之前的记录使用cdn url
    @property
    def is_less_than_date(self):
        if settings.IMAGE_CDN_END_DATE == '':
            return False
        elif settings.IMAGE_CDN_END_DATE == 'now' or settings.IMAGE_CDN_END_DATE == '-':
            return True
        else:
            return str(self.format_date) < settings.IMAGE_CDN_END_DATE

    class Meta:
        db_table = "images"
        # 按指定字段排序
        # ordering = ['-format_date']
