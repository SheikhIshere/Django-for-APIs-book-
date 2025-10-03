# from rest_framework.generics import (
#     ListCreateAPIView, 
#     RetrieveUpdateDestroyAPIView,
# )
# from django.contrib.auth import get_user_model
# from rest_framework.permissions import IsAuthenticated

# from .permissions import IsAuthorOrReadOnly
# from .models import Post
# from .serializers import PostSerializer, UserSerializer

# User = get_user_model()  # reuse for clarity


# class PostList(ListCreateAPIView):
#     """List all posts or create a new one"""
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     # Uncomment if you want to restrict to logged-in users only:
#     # permission_classes = [IsAuthenticated]


# class PostDetail(RetrieveUpdateDestroyAPIView):
#     """Retrieve, update or delete a post"""
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthorOrReadOnly]


# class UserList(ListCreateAPIView):
#     """List all users or create a new one"""
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(RetrieveUpdateDestroyAPIView):
#     """Retrieve, update or delete a user"""
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# upper code is for customization but bellow code is for shotcut approch where we do jsutt ccrud with less code

# posts/views.py
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .models import Post
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    """Handle all CRUD operations for Post"""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrReadOnly]


class UserViewSet(viewsets.ModelViewSet):
    """Handle all CRUD operations for User"""
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
