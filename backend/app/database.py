from supabase import create_client, Client
from app.core.config import settings

# config.py의 settings를 사용하여 Supabase 클라이언트 생성
supabase: Client = create_client(
    supabase_url=settings.SUPABASE_URL,
    supabase_key=settings.SUPABASE_KEY
)