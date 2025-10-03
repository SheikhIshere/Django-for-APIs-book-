# from django.urls import path
# from .views import PostList, PostDetail, UserList, UserDetail

# urlpatterns = [
#     path('users/', UserList.as_view()),
#     path('users/<int:pk>/', UserDetail.as_view()),
#     path('', PostList.as_view(), name='post-list'),           # GET all / POST new
#     path('<int:pk>/', PostDetail.as_view(), name='post-detail'),  # GET/PUT/DELETE single
# ]



# great for custom urlspattarn not for one line all 

# posts/urls.py
from rest_framework.routers import SimpleRouter
from .views import UserViewSet, PostViewSet

router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('posts', PostViewSet, basename='posts')

urlpatterns = router.urls


# this for one line all api
