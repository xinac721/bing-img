import datetime

from django.conf import settings
from django.core.paginator import Paginator
from django.http import FileResponse, HttpResponse
from django.shortcuts import render

from bing.models import Image


def global_setting(request):
    return {
        'SITE_NAME': settings.SITE_NAME,
        'IMAGE_CDN_URL': settings.IMAGE_CDN_URL,
        'STATIC_CDN_URL': settings.STATIC_CDN_URL,
        'IMAGE_CDN_STYLE': settings.IMAGE_CDN_STYLE,
        'IMAGE_CDN_END_DATE': settings.IMAGE_CDN_END_DATE,
        'IMAGE_PAGE_COUNT': settings.IMAGE_PAGE_COUNT,
    }


def index(request):
    page = request.GET.get('page')
    if page and page.isdigit():
        page = int(page)
    else:
        page = 1
    print('page param: ', page)

    objects = Image.objects.all().order_by('-end_date')
    paginator = Paginator(objects, settings.IMAGE_PAGE_COUNT)
    page_num = paginator.num_pages
    print('page num:', page_num)
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


def detail(request, end_date):
    date = datetime.datetime.now().strftime("%Y%m%d")
    today = date
    if end_date:
        date = end_date

    images = Image.objects.filter(end_date=date)
    if len(images) == 0:
        images = Image.objects.filter(end_date=today)

    # print(images)
    print(len(images))
    image = images[0]
    click_count = image.click_count
    image.click_count = click_count + 1
    image.save()
    return render(request, 'detail.html',
                  {
                      'object': image
                  }
                  )


def download(request):
    date = request.GET.get('date')
    if date and len(date) == 10:
        images = Image.objects.filter(format_date=date)
        if len(images) == 0:
            pass
        image = images[0]
        url = settings.IMAGE_CDN_URL + '/' + image.cdn_file_name
        file = open(url, 'rb')
        response = FileResponse(file)
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = 'attachment;filename=' + image.local_name
        return response
    else:
        return HttpResponse('')
