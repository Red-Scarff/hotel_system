from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if response.status_code == 401 and "detail" in response.data and response.data["detail"] == "Authentication credentials were not provided.":
            response.data["detail"] = "请提供有效的身份认证信息。"

    return response
