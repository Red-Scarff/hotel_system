- 数据库设置

在my_hotel文件中新建local_setting.py

在这里将参数改为你的数据库设置

记得先去数据库建立一个名为my_hotel的库

```
  # my_hotel/local_setting.py

  Local_DATABASES = {
      "default": {
          "ENGINE": "django.db.backends.postgresql",
          "NAME": "my_hotel",
          "USER": "postgres", # 你的用户名
          "PASSWORD": "", # 你的密码
          "HOST": "127.0.0.1",
          "PORT": "5432",
      }
  }
```

- 数据库迁移

`python manage.py makemigrations` or `python manage.py makemigrations hotel`

`python manage.py migrate`

- 启动后端

`python manage.py runserver`
