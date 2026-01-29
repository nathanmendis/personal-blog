from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Blog
from .serializers import BlogSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-published_at')  # keep ordering
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # read allowed for everyone, write only for authenticated
    lookup_field = 'id'
