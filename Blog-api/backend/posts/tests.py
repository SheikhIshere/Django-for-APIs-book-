from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post


class PostTest(TestCase):
    # setting up the user and post
    @classmethod
    def setUpTestData(cls):
        # creating user
        testuser1 = User.objects.create_user(
            username='testuser1',
            password='abc123',
        )
        testuser1.save() # saving the user

        # creating post with the user 
        test_post1 = Post.objects.create(
            author = testuser1,
            title = 'testing_blog1',
            body = 'this_is_body_1'
        )
        test_post1.save() # saving the blogpost
    
    # this is testing main section
    def test_blog_content(self):
        post = Post.objects.get(id=1)
        author = f'{post.author}'
        title = f'{post.title}'
        body = f'{post.body}'

        # testing
        self.assertEqual(author, 'testuser1')
        self.assertEqual(title, 'testing_blog1')
        self.assertEqual(body, 'this_is_body_1')