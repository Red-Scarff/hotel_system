from rest_framework.permissions import BasePermission

class IsCustomerReadOnly(BasePermission):
    """
    Permission to allow Customers to have read-only access.
    Managers can have full access.
    """

    def has_permission(self, request, view):
        # 所有用户可以访问列表视图 (GET 方法)
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # 仅角色为 Manager 的用户可以进行写操作
        return request.user.is_authenticated and request.user.is_manager()
