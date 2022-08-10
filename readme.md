# 必应每日一图


## 项目简介
- https://blog.xinac.cn/archives/bing-image.html
- 演示网址：[https://bing.xinac.net](https://bing.xinac.net)

---


## 关注博客：[https://blog.xinac.cn](https://blog.xinac.cn)


---

## 更新记录
1. 完成基本功能，基于SQLite3数据库
2. 提供16条演示数据

## 安装步骤
1. `git clone https://github.com/xinac721/bing-img`
2. `sudo apt install uwsgi`
3. `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`
4. `./start_uwsgi.sh`，可以直接 `python3 manage.py runserver 0.0.0.0:8000` 运行，也可以用`uwsgi`运行，还可以`uwsgi`结合`nginx`运行
5. settings.py文件中，DEBUG = True，非调试状态改为 False

## 开发计划
- [ ] 定时每日更新图片
- [ ] 图片本地保存
- [ ] 图片保存到云存储

---

## Notice
- 此项目后端业务用Flask重写了，逻辑基本相似，后续整理完10年到16年的图片后再重新上传并开放api --22.08.10
