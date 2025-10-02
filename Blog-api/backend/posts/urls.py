from django.urls import path
from .views import PostList, PostDetail

urlpatterns = [
    path('', PostList.as_view(), name='post-list'),           # GET all / POST new
    path('<int:pk>/', PostDetail.as_view(), name='post-detail'),  # GET/PUT/DELETE single
]
