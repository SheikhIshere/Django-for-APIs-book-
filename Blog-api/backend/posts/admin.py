from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'body', 'author__username')
    list_filter = ('created_at', 'updated_at', 'author')

admin.site.register(Post, PostAdmin)
