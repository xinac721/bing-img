from django.conf import settings
from django.db import models


# Create your models here.

class Image(models.Model):
    id = models.AutoField(primary_key=True)
    create_time = models.DateTimeField()
    start_date = models.TextField(default='')
    full_start_date = models.TextField(default='')
    end_date = models.TextField(default='')
    format_date = models.DateField(default='')
    url = models.TextField(default='')
    url_base = models.TextField(default='')
    copy_right = models.TextField(default='')
    copy_right_link = models.TextField(default='')
    title = models.TextField(default='')
    quiz = models.TextField(default='')
    hsh = models.TextField(default='')
    wp = models.IntegerField(default=0)
    drk = models.IntegerField(default=0)
    top = models.IntegerField(default=0)
    bot = models.IntegerField(default=0)
    hs = models.TextField(default='')
    local_path = models.TextField(default='')
    local_name = models.TextField(default='')
    local_size = models.IntegerField(default=0)
    cdn_file_name = models.TextField(default='')
    ori_file_name = models.TextField(default='')
    clear_type = models.TextField(default='')
    small_type = models.TextField(default='')
    file_ext = models.TextField(default='')
    down_count = models.IntegerField(default=0)
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
