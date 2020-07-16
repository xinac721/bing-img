import datetime
import json

from django.conf import settings
from django.core.paginator import Paginator
from django.http import FileResponse, HttpResponse
from django.shortcuts import render, redirect

from bing.models import Image


# 全局设置
def global_setting(request):
    return {
        'SITE_NAME': settings.SITE_NAME,
        'IMAGE_CDN_URL': settings.IMAGE_CDN_URL,
        'STATIC_CDN_URL': settings.STATIC_CDN_URL,
        'IMAGE_CDN_STYLE': settings.IMAGE_CDN_STYLE,
        'IMAGE_CDN_END_DATE': settings.IMAGE_CDN_END_DATE,
        'IMAGE_PAGE_COUNT': settings.IMAGE_PAGE_COUNT,
    }


# 首页
def index(request):
    page = request.GET.get('page')
    if page and page.isdigit():
        page = int(page)
    else:
        page = 1
    # print('page param: ', page)

    objects = Image.objects.all().order_by('-end_date')
    paginator = Paginator(objects, settings.IMAGE_PAGE_COUNT)
    page_num = paginator.num_pages
    # print('page num:', page_num)
    if page_num < page:
        page = 1
    if page < 1:
        page = 1
    page_list = paginator.page(page)

    return render(request, 'index.html',
                  {
                      'page_list': page_list,
                      'curr_page': page,
                      'total_num': len(objects),
                  }
                  )


# 图片详情页
def detail(request, end_date):
    image = None
    if end_date:
        images = Image.objects.filter(end_date=end_date)
        if images and len(images) != 0:
            image = images[0]

    if not image:
        image = Image.objects.order_by('-end_date').first()
    if image:
        click_count = image.click_count
        image.click_count = click_count + 1
        image.save()
        return render(request, 'detail.html', {'object': image})
    else:
        return redirect('/')


def preview(request):
    msg = 'ok'
    code = 1
    date = request.GET.get('date')
    image = None
    if date:
        images = Image.objects.filter(end_date=date)
        if images and len(images) != 0:
            image = images[0]
    else:
        msg = 'Illegal parameter of : ' + date

    if not image:
        image = Image.objects.order_by('-end_date').first()
    if image:
        click_count = image.click_count
        image.click_count = click_count + 1
        image.save()
    else:
        code = 0
        msg += ' | Query size 0 of : ' + date

    # print('---> ', msg)
    data = {
        'msg': msg,
        'code': code
    }
    return HttpResponse(json.dumps(data))


# 下载功能，未启用
def download(request):
    date = request.GET.get('date')
    if date and len(str(date).replace('-', '')) == 8:
        date = str(date).replace('-', '')
        images = Image.objects.filter(end_date=date)
        if images and len(images) != 0:
            image = images[0]
            url = image.url_base + '_' + image.clear_type + '.' + image.file_ext
            file = open(url, 'rb')
            response = FileResponse(file)
            response['Content-Type'] = 'application/octet-stream'
            response['Content-Disposition'] = 'attachment;filename=' + date + '.' + image.file_ext
            return response
        else:
            return HttpResponse('Query size 0 of date.')
    else:
        return HttpResponse('Illegal parameter of date.')
