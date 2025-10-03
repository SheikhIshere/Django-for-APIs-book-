from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("posts.urls")),

    # DRF auth
    path("api-auth/", include("rest_framework.urls")),

    # dj-rest-auth login/logout/signup
    path("api/v1/rest-auth/", include("dj_rest_auth.urls")),
    path("api/v1/rest-auth/registration/", include("dj_rest_auth.registration.urls")),

    # OpenAPI schema (JSON)
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),

    # Swagger UI
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),

    # ReDoc UI
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
