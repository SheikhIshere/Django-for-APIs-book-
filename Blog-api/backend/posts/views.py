# posts/views.py
from rest_framework.generics import (
    ListCreateAPIView, 
    RetrieveUpdateDestroyAPIView,
)

from rest_framework.permissions import (
    IsAuthenticated,
)

from .permissions import IsAuthorOrReadOnly

from .models import Post
from .serializers import PostSerializer

class PostList(ListCreateAPIView):
    """ permission_classes = [IsAuthenticated] """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthorOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer