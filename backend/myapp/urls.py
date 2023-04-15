from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, UserProfileView, AzureLoginView
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/azure-login/', AzureLoginView.as_view(), name='azure_login'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/interesting-data/', views.interesting_data, name='interesting-data'),
    path('api/air-quality/', views.air_quality, name='air-quality'),
]
